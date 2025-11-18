// ASX DOOM JSON Server - Main Controller
// Manages multiple JSON servers, WebSockets, Ollama integration, and marketplace

const express = require('express');
const jsonServer = require('json-server');
const WebSocket = require('ws');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const DoomModule = require('./modules/doom-classic');

// Load configuration
const configPath = path.join(__dirname, 'config.json');
const config = fs.existsSync(configPath) 
  ? JSON.parse(fs.readFileSync(configPath, 'utf8'))
  : require('./config.json');

class ASXDoomServer {
  constructor() {
    this.config = config;
    this.port = config.server.port || 3000;
    this.app = express();
    this.servers = new Map(); // Track spawned JSON servers
    this.nextPort = 3001;
    this.wss = null;
    this.ollamaConnected = false;
    
    // Initialize DOOM module with custom paths
    const doomConfig = {
      enginePath: path.join(__dirname, config.games.zandronum.path)
    };
    this.doomModule = new DoomModule(doomConfig);
    
    this.init();
  }

  init() {
    // Serve static files (command center UI)
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(express.json());

    // Setup routes
    this.setupRoutes();
    
    // Setup WebSocket
    this.setupWebSocket();
  }

  setupRoutes() {
    // Health check
    this.app.get('/api/health', (req, res) => {
      res.json({
        status: 'online',
        servers: Array.from(this.servers.values()),
        ollama: this.ollamaConnected
      });
    });

    // List all servers
    this.app.get('/api/servers', (req, res) => {
      res.json({
        servers: Array.from(this.servers.values())
      });
    });

    // Create new JSON server
    this.app.post('/api/servers/create', async (req, res) => {
      try {
        const port = this.nextPort++;
        const serverId = `server-${port}`;
        const dbPath = path.join(__dirname, 'data', `db-${port}.json`);
        
        // Create data directory if needed
        const dataDir = path.join(__dirname, 'data');
        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir);
        }

        // Create initial database
        if (!fs.existsSync(dbPath)) {
          fs.writeFileSync(dbPath, JSON.stringify({
            items: [],
            config: {
              port,
              created: new Date().toISOString()
            }
          }, null, 2));
        }

        // Spawn the server process
        const serverProcess = spawn('node', [
          path.join(__dirname, 'spawn-server.js'),
          port.toString(),
          dbPath
        ]);

        serverProcess.stdout.on('data', (data) => {
          console.log(`[Server ${port}] ${data}`);
        });

        serverProcess.stderr.on('data', (data) => {
          console.error(`[Server ${port} ERROR] ${data}`);
        });

        // Track server
        this.servers.set(serverId, {
          id: serverId,
          port,
          dbPath,
          process: serverProcess,
          created: new Date().toISOString(),
          requestCount: 0,
          status: 'running'
        });

        // Broadcast to WebSocket clients
        this.broadcast({
          type: 'server_created',
          server: this.servers.get(serverId)
        });

        res.json({
          success: true,
          server: {
            id: serverId,
            port,
            url: `http://localhost:${port}`
          }
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: error.message
        });
      }
    });

    // Stop a server
    this.app.post('/api/servers/:id/stop', (req, res) => {
      const { id } = req.params;
      const server = this.servers.get(id);
      
      if (!server) {
        return res.status(404).json({ error: 'Server not found' });
      }

      server.process.kill();
      server.status = 'stopped';
      
      this.broadcast({
        type: 'server_stopped',
        serverId: id
      });

      res.json({ success: true });
    });

    // Connect to Ollama
    this.app.post('/api/ollama/connect', async (req, res) => {
      try {
        // Test Ollama connection
        const response = await fetch('http://localhost:11434/api/tags');
        
        if (response.ok) {
          const data = await response.json();
          this.ollamaConnected = true;
          
          this.broadcast({
            type: 'ollama_connected',
            models: data.models || []
          });

          res.json({
            success: true,
            models: data.models || []
          });
        } else {
          throw new Error('Ollama not responding');
        }
      } catch (error) {
        this.ollamaConnected = false;
        res.status(500).json({
          success: false,
          error: 'Ollama not running. Start it with: ollama serve'
        });
      }
    });

    // Send chat to Ollama
    this.app.post('/api/ollama/chat', async (req, res) => {
      const { model, messages } = req.body;

      try {
        const response = await fetch('http://localhost:11434/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: model || 'llama3',
            messages,
            stream: false
          })
        });

        const data = await response.json();
        res.json(data);
      } catch (error) {
        res.status(500).json({
          error: 'Failed to connect to Ollama',
          message: error.message
        });
      }
    });

    // DOOM Module Routes
    this.app.get('/api/doom/status', (req, res) => {
      res.json(this.doomModule.getInfo());
    });

    this.app.post('/api/doom/install', async (req, res) => {
      try {
        const result = await this.doomModule.install();
        res.json(result);
      } catch (error) {
        res.status(500).json({
          success: false,
          error: error.message
        });
      }
    });

    this.app.post('/api/doom/server/create', async (req, res) => {
      try {
        const config = req.body;
        const result = await this.doomModule.createServer(config);
        
        this.broadcast({
          type: 'doom_server_created',
          server: result.server
        });
        
        res.json(result);
      } catch (error) {
        res.status(500).json({
          success: false,
          error: error.message
        });
      }
    });

    this.app.post('/api/doom/server/quickstart', async (req, res) => {
      try {
        const result = await this.doomModule.quickStart();
        
        this.broadcast({
          type: 'doom_server_created',
          server: result.server
        });
        
        res.json(result);
      } catch (error) {
        res.status(500).json({
          success: false,
          error: error.message
        });
      }
    });

    this.app.get('/api/doom/servers', (req, res) => {
      res.json({
        servers: this.doomModule.listServers()
      });
    });

    this.app.post('/api/doom/server/:id/stop', (req, res) => {
      const { id } = req.params;
      const result = this.doomModule.stopServer(id);
      res.json(result);
    });

    // License & Purchase Info
    this.app.get('/api/license', (req, res) => {
      res.json({
        type: this.config.licensing.license_type,
        features: this.config.licensing.features,
        purchase: {
          source_code: {
            price: this.config.purchase.source_code_price,
            description: 'Full source code + Your own token integration',
            benefits: [
              'Complete source code',
              'Use your own token',
              'Remove ASX branding',
              'Lifetime updates',
              'Full customization'
            ]
          },
          enterprise: {
            price: this.config.purchase.enterprise_price,
            description: 'Enterprise package with support',
            benefits: [
              'Everything in source code package',
              'Custom features built',
              'Deployment assistance',
              '1 year support',
              'Priority updates'
            ]
          }
        },
        contact: this.config.purchase.contact_email
      });
    });

    // Token configuration
    this.app.get('/api/token/config', (req, res) => {
      res.json({
        name: this.config.token.name,
        network: this.config.token.network,
        enabled: this.config.token.enabled,
        pricing: this.config.token.pricing
      });
    });

    // Marketplace API
    this.app.get('/api/marketplace/modules', (req, res) => {
      const modules = [
        {
          id: 'doom-classic',
          name: 'DOOM Classic Server',
          price: 5.00,
          description: 'Classic DOOM game server with multiplayer support',
          category: 'game-servers',
          icon: '🎮'
        },
        {
          id: 'doom-tournament',
          name: 'DOOM Tournament Manager',
          price: 10.00,
          description: 'Full tournament system with brackets and leaderboards',
          category: 'game-servers',
          icon: '🏆'
        },
        {
          id: 'php-server',
          name: 'PHP Server Module',
          price: 3.00,
          description: 'Add PHP support to your JSON server',
          category: 'server-mods',
          icon: '🐘'
        },
        {
          id: 'websocket-upgrade',
          name: 'WebSocket Upgrade',
          price: 2.00,
          description: 'Real-time WebSocket capabilities',
          category: 'server-mods',
          icon: '⚡'
        },
        {
          id: 'database-gui',
          name: 'Database GUI',
          price: 4.00,
          description: 'Visual database management interface',
          category: 'tools',
          icon: '💾'
        }
      ];

      res.json({ modules });
    });

    // Token system (simple in-memory for now)
    this.app.get('/api/tokens/balance', (req, res) => {
      // In production, this would check user's wallet
      res.json({ balance: 100.00 }); // Demo balance
    });

    // SPA fallback
    this.app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
  }

  setupWebSocket() {
    const server = this.app.listen(this.port, () => {
      console.log(`\n🚀 ASX DOOM JSON SERVER`);
      console.log(`================================`);
      console.log(`🌐 Command Center: http://localhost:${this.port}`);
      console.log(`🎮 Ready to spawn game servers`);
      console.log(`💬 WebSocket ready for real-time updates`);
      console.log(`\n💡 TIP: Connect Ollama with: ollama serve\n`);
    });

    this.wss = new WebSocket.Server({ server });

    this.wss.on('connection', (ws) => {
      console.log('🔌 Client connected');

      // Send current status
      ws.send(JSON.stringify({
        type: 'status',
        servers: Array.from(this.servers.values()).map(s => ({
          id: s.id,
          port: s.port,
          status: s.status,
          requestCount: s.requestCount
        })),
        ollama: this.ollamaConnected
      }));

      ws.on('message', (message) => {
        try {
          const data = JSON.parse(message);
          this.handleWSMessage(data, ws);
        } catch (error) {
          console.error('WS Error:', error);
        }
      });

      ws.on('close', () => {
        console.log('🔌 Client disconnected');
      });
    });
  }

  handleWSMessage(data, ws) {
    switch (data.type) {
      case 'create_server':
        // Trigger server creation via REST API internally
        this.createServerViaWS(ws);
        break;
      
      case 'ping':
        ws.send(JSON.stringify({ type: 'pong' }));
        break;
    }
  }

  async createServerViaWS(ws) {
    // Same logic as REST endpoint but responds via WebSocket
    const port = this.nextPort++;
    const serverId = `server-${port}`;
    const dbPath = path.join(__dirname, 'data', `db-${port}.json`);
    
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, JSON.stringify({
        items: [],
        config: { port, created: new Date().toISOString() }
      }, null, 2));
    }

    const serverProcess = spawn('node', [
      path.join(__dirname, 'spawn-server.js'),
      port.toString(),
      dbPath
    ]);

    this.servers.set(serverId, {
      id: serverId,
      port,
      dbPath,
      process: serverProcess,
      created: new Date().toISOString(),
      requestCount: 0,
      status: 'running'
    });

    this.broadcast({
      type: 'server_created',
      port,
      url: `http://localhost:${port}`
    });
  }

  broadcast(data) {
    if (!this.wss) return;
    
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }
}

// Start the server
const server = new ASXDoomServer();
