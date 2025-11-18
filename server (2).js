const express = require('express');
const jsonServer = require('json-server');
const { OAuth2Client } = require('google-auth-library');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

class ASXServer {
  constructor(config = {}) {
    this.app = express();
    this.port = config.port || 3333;
    this.dataDir = config.dataDir || path.join(__dirname, 'data');
    this.uploadDir = path.join(this.dataDir, 'uploads');
    
    // Ensure directories exist
    this.initDirectories();

    // OAuth setup
    this.oauth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'http://localhost:3333/oauth/callback'
    );

    // Middleware
    this.setupMiddleware();
    
    // Routes
    this.setupRoutes();
  }

  initDirectories() {
    [this.dataDir, this.uploadDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });

    // Initialize databases
    const defaultDbs = {
      users: [],
      files: [],
      services: [],
      marketplace: []
    };

    Object.keys(defaultDbs).forEach(dbName => {
      const dbPath = path.join(this.dataDir, `${dbName}.json`);
      if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify(defaultDbs[dbName], null, 2));
      }
    });
  }

  setupMiddleware() {
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, 'public')));
    
    // File upload middleware
    this.upload = multer({ 
      dest: this.uploadDir,
      limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
    });
  }

  setupRoutes() {
    // OAuth Routes
    this.app.get('/oauth/login', (req, res) => {
      const url = this.oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['profile', 'email']
      });
      res.redirect(url);
    });

    this.app.get('/oauth/callback', async (req, res) => {
      const { tokens } = await this.oauth2Client.getToken(req.query.code);
      const ticket = await this.oauth2Client.verifyIdToken({
        idToken: tokens.id_token,
        audience: process.env.GOOGLE_CLIENT_ID
      });
      const payload = ticket.getPayload();
      
      // Store or update user
      const usersDb = this.loadDatabase('users');
      const existingUser = usersDb.find(u => u.email === payload.email);
      
      if (!existingUser) {
        usersDb.push({
          id: Date.now(),
          email: payload.email,
          name: payload.name,
          picture: payload.picture,
          roles: usersDb.length === 0 ? ['admin'] : ['user']
        });
        this.saveDatabase('users', usersDb);
      }

      // Redirect to dashboard
      res.redirect('/dashboard.html');
    });

    // File upload route
    this.app.post('/upload', this.upload.single('file'), (req, res) => {
      const filesDb = this.loadDatabase('files');
      filesDb.push({
        id: Date.now(),
        name: req.file.originalname,
        path: req.file.path,
        size: req.file.size,
        type: req.file.mimetype
      });
      this.saveDatabase('files', filesDb);
      res.json({ success: true, file: req.file });
    });

    // Serve uploaded files
    this.app.get('/files/:filename', (req, res) => {
      const filePath = path.join(this.uploadDir, req.params.filename);
      res.download(filePath);
    });

    // JSON Server routes for databases
    const jsonServerRouter = jsonServer.router(path.join(this.dataDir, 'db.json'));
    this.app.use('/api', jsonServerRouter);

    // Fallback for SPA
    this.app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
  }

  loadDatabase(name) {
    const dbPath = path.join(this.dataDir, `${name}.json`);
    return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  }

  saveDatabase(name, data) {
    const dbPath = path.join(this.dataDir, `${dbName}.json`);
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`🚀 ASX Server running on http://localhost:${this.port}`);
      console.log(`📂 Data Directory: ${this.dataDir}`);
      console.log(`📤 Upload Directory: ${this.uploadDir}`);
    });
  }
}

// Run server if directly executed
if (require.main === module) {
  const server = new ASXServer();
  server.start();
}

module.exports = ASXServer;
