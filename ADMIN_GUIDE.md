# ASX Model Builder - Complete Admin System

🎮 **Production-Ready E-Commerce Platform for Three.js Game Assets**

## 🚀 Quick Start

1. **[Open Main Site](main-index.html)** - Landing page with gallery & cart
2. **[Launch AI Builder](chat.html)** - Chat interface with admin panel
3. **[Test WebGL](simple-threejs-demo.html)** - Verify 3D graphics support
4. **[Debug Console](debug-threejs-asx.html)** - Diagnostic tools

## 🔐 Admin System

### First User = Admin
The **first person to log in becomes the admin** with full access to:
- API configuration
- Payment settings
- LLM provider management
- User management

### Google OAuth Login
1. Click **"🔐 Google Login"** button in chat interface
2. First user gets **ADMIN** role automatically
3. Subsequent users get **USER** role
4. Admin sees **⚙️ ADMIN** button in header

## ⚙️ Admin Control Panel

Access via **⚙️ ADMIN** button (visible only to admins)

### 🤖 AI/LLM Configuration

#### OpenAI GPT-4
```
API Key: sk-...
Endpoint: https://api.openai.com/v1/chat/completions
Model: gpt-4
```

#### Anthropic Claude
```
API Key: sk-ant-...
Endpoint: https://api.anthropic.com/v1/messages  
Model: claude-sonnet-4-20250514
```

#### Ollama (Local LLM)
```
Base URL: http://localhost:11434
Supported Models:
- llama2
- llama3
- codellama
- mistral
- mixtral
- phi-2
```

**Installation:**
```bash
# Install Ollama
curl https://ollama.ai/install.sh | sh

# Pull a model
ollama pull llama2

# Run Ollama server
ollama serve
```

#### ChatGPT Token API
Use OpenAI configuration with appropriate model selection

### 💳 Payment Integration

#### Stripe
```
Secret Key: sk_test_...
Publishable Key: pk_test_...
Webhook Secret: whsec_...
```

**Test Cards:**
- Success: 4242 4242 4242 4242
- Decline: 4000 0000 0000 0002
- Auth Required: 4000 0025 0000 3155

**Integration:**
```javascript
// Client-side
<script src="https://js.stripe.com/v3/"></script>
const stripe = Stripe('pk_test_...');

// Server-side payment intent
const paymentIntent = await stripe.paymentIntents.create({
    amount: 2999, // $29.99
    currency: 'usd'
});
```

#### Coinbase Commerce (Crypto)
```
API Key: Your coinbase commerce key
Webhook Secret: Your webhook secret
```

**Supported Cryptocurrencies:**
- Bitcoin (BTC)
- Ethereum (ETH)
- Litecoin (LTC)
- Bitcoin Cash (BCH)
- USDC
- DAI

**Integration:**
```javascript
// Create charge
const charge = await coinbase.charges.create({
    name: 'Fantasy Knight Pack',
    description: '3D game asset bundle',
    pricing_type: 'fixed_price',
    local_price: {
        amount: '29.99',
        currency: 'USD'
    }
});
```

### 📚 ASX Language Learning

Enable **ASX Learning Mode** to train LLMs on the ASX specification:

**Training Sources:**
- https://github.com/mpickettpayments-hue/JSON-ASX
- https://github.com/mpickettpayments-hue/json-asx-cdn

**How it works:**
1. LLM reads ASX spec from GitHub
2. Learns geometry types, material properties
3. Studies example implementations
4. Generates ASX-compliant code

**System Prompt Enhancement:**
```javascript
const ASX_TRAINING = `
Study the ASX JSON format from:
1. Core Specification: github.com/mpickettpayments-hue/JSON-ASX
2. Gaming Engine: github.com/mpickettpayments-hue/json-asx-cdn

Learn:
- Geometry definitions (box, sphere, cylinder, etc.)
- Material types (Standard, Phong, Basic)
- Object hierarchies and groups
- Animation systems with keyframes
- Interaction patterns (click, hover, physics)
`;
```

## 📁 File Structure

```
asx-builder/
├── main-index.html              # Main e-commerce site
├── chat.html                    # AI Builder with admin panel
├── simple-threejs-demo.html     # WebGL test
├── debug-threejs-asx.html       # Diagnostic console
├── threejs-asx-fantasy-scene.html # Demo scene
├── README.md                    # This file
└── ADMIN_GUIDE.md              # Admin documentation
```

## 🎯 Features

### Main Site (main-index.html)
- ✅ Hero section with animated CTAs
- ✅ 9 purchaseable asset packs
- ✅ Shopping cart with LocalStorage
- ✅ Add/remove/update quantities
- ✅ Checkout integration ready
- ✅ Matrix CRT theme

### AI Builder (chat.html)
- ✅ Conversational asset generation
- ✅ Admin control panel
- ✅ Multi-LLM support (OpenAI, Claude, Ollama)
- ✅ Payment provider configuration
- ✅ Google OAuth simulation
- ✅ ASX learning mode
- ✅ Code generation with copy buttons
- ✅ User guide & documentation

### Admin Features
- ✅ First user = admin
- ✅ Role-based access control
- ✅ API key management
- ✅ Payment provider switching
- ✅ LLM provider selection
- ✅ Real-time status indicators
- ✅ Settings persistence

## 💻 Technical Implementation

### LocalStorage Keys
```javascript
{
    "asx_user": {              // Current user
        "id": "user_123",
        "email": "admin@example.com",
        "role": "admin",
        "created_at": "2025-01-01T00:00:00Z"
    },
    "asx_admin_settings": {    // Admin configuration
        "openai_key": "sk-...",
        "claude_key": "sk-ant-...",
        "ollama_url": "http://localhost:11434",
        "ollama_model": "llama2",
        "active_llm": "openai",
        "stripe_key": "sk_test_...",
        "stripe_pub_key": "pk_test_...",
        "coinbase_key": "...",
        "active_payment": "stripe",
        "enable_asx_learning": true,
        "training_sources": "..."
    },
    "cart": [                  // Shopping cart
        {
            "id": 1,
            "name": "Fantasy Knight Pack",
            "price": 29.99,
            "quantity": 2
        }
    ]
}
```

### API Routing Logic
```javascript
async function routeToLLM(message) {
    const settings = getAdminSettings();
    
    switch(settings.active_llm) {
        case 'openai':
            if (!settings.openai_key) {
                showError('OpenAI key required');
                return;
            }
            return await callOpenAI(message, settings.openai_key);
            
        case 'claude':
            if (!settings.claude_key) {
                showError('Claude key required');
                return;
            }
            return await callClaude(message, settings.claude_key);
            
        case 'ollama':
            return await callOllama(message, settings.ollama_url, settings.ollama_model);
            
        default:
            return await simulateResponse(message);
    }
}
```

### Payment Flow
```javascript
async function checkout() {
    const cart = getCart();
    const total = calculateTotal(cart);
    const settings = getAdminSettings();
    
    switch(settings.active_payment) {
        case 'stripe':
            await processStripePayment(total, settings.stripe_key);
            break;
            
        case 'coinbase':
            await processCoinbasePayment(cart, settings.coinbase_key);
            break;
            
        case 'both':
            // Show payment method selector
            await showPaymentMethodSelector();
            break;
    }
}
```

## 🔧 Setup Instructions

### 1. Configure Google OAuth (Production)

**Get Credentials:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized origins: `https://yourdomain.com`

**Add to Admin Panel:**
```
Google Client ID: xxx.apps.googleusercontent.com
Google Client Secret: GOCSPX-xxx
```

**Implement:**
```html
<script src="https://accounts.google.com/gsi/client" async defer></script>
<script>
function handleCredentialResponse(response) {
    const user = parseJwt(response.credential);
    // Create or retrieve user from database
    // Assign role (admin if first user)
}
</script>
```

### 2. Configure Stripe

**Get Keys:**
1. Sign up at [stripe.com](https://stripe.com)
2. Get test keys from Dashboard
3. Add webhook endpoint

**Server Setup:**
```javascript
// server.js (Node.js example)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
    });
    
    res.json({ clientSecret: paymentIntent.client_secret });
});
```

### 3. Configure Coinbase Commerce

**Get API Key:**
1. Sign up at [commerce.coinbase.com](https://commerce.coinbase.com)
2. Generate API key
3. Set up webhooks

**Integration:**
```javascript
const coinbase = require('coinbase-commerce-node');
const Client = coinbase.Client;

Client.init(process.env.COINBASE_API_KEY);

const charge = await coinbase.resources.Charge.create({
    name: 'Asset Purchase',
    description: 'Game asset bundle',
    local_price: {
        amount: '29.99',
        currency: 'USD'
    },
    pricing_type: 'fixed_price'
});
```

### 4. Configure Ollama (Local LLM)

**Installation:**
```bash
# macOS/Linux
curl https://ollama.ai/install.sh | sh

# Windows
# Download from ollama.ai

# Pull a model
ollama pull llama2

# Run server
ollama serve
```

**Available Models:**
- `llama2` - Meta's Llama 2 (7B, 13B, 70B)
- `llama3` - Meta's Llama 3
- `codellama` - Code-specialized Llama
- `mistral` - Mistral AI's model
- `mixtral` - Mixtral 8x7B
- `phi` - Microsoft's Phi-2

**Usage in Admin:**
```
Ollama URL: http://localhost:11434
Model: llama2
```

### 5. Configure OpenAI

**Get API Key:**
1. Sign up at [platform.openai.com](https://platform.openai.com)
2. Go to API keys
3. Create new secret key

**Add to Admin:**
```
OpenAI API Key: sk-...
Active LLM: openai
```

### 6. Configure Claude

**Get API Key:**
1. Sign up at [console.anthropic.com](https://console.anthropic.com)
2. Go to API keys
3. Create new key

**Add to Admin:**
```
Claude API Key: sk-ant-...
Active LLM: claude
```

## 📖 ASX JSON Specification

### Core Structure
```json
{
    "version": "1.0",
    "scene": {
        "background": "#000000",
        "fog": {
            "type": "fog",
            "color": "#001100",
            "near": 10,
            "far": 50
        }
    },
    "geometries": [...],
    "materials": [...],
    "objects": [...],
    "animations": [...]
}
```

### Geometry Types
```json
{
    "geometries": [
        {
            "id": "box1",
            "type": "box",
            "parameters": {
                "width": 2,
                "height": 2,
                "depth": 2
            }
        },
        {
            "id": "sphere1",
            "type": "sphere",
            "parameters": {
                "radius": 1.5,
                "widthSegments": 32,
                "heightSegments": 32
            }
        },
        {
            "id": "cylinder1",
            "type": "cylinder",
            "parameters": {
                "radiusTop": 1,
                "radiusBottom": 1,
                "height": 2,
                "radialSegments": 32
            }
        }
    ]
}
```

### Material Types
```json
{
    "materials": [
        {
            "id": "pbr_material",
            "type": "MeshStandardMaterial",
            "properties": {
                "color": "#00ff00",
                "metalness": 0.7,
                "roughness": 0.3,
                "emissive": "#004400",
                "emissiveIntensity": 0.5
            }
        },
        {
            "id": "basic_material",
            "type": "MeshBasicMaterial",
            "properties": {
                "color": "#ff0000",
                "wireframe": true
            }
        }
    ]
}
```

### Object Hierarchy
```json
{
    "objects": [
        {
            "id": "character",
            "type": "group",
            "position": [0, 0, 0],
            "children": [
                {
                    "id": "body",
                    "geometry": "box1",
                    "material": "pbr_material",
                    "position": [0, 1, 0]
                },
                {
                    "id": "head",
                    "geometry": "sphere1",
                    "material": "pbr_material",
                    "position": [0, 2.5, 0]
                }
            ]
        }
    ]
}
```

## 🎮 Gaming Engine Integration

### From json-asx-cdn Repository

The ASX format is designed to work with the gaming engine at:
https://github.com/mpickettpayments-hue/json-asx-cdn

**Features:**
- Asset loading pipeline
- Scene management
- Animation systems
- Physics integration
- Input handling
- Audio management

**Example Usage:**
```javascript
// Load ASX asset
const assetLoader = new ASXLoader();
const gameAsset = await assetLoader.load('knight.asx.json');

// Add to game scene
game.scene.add(gameAsset);

// Play animation
gameAsset.playAnimation('idle');

// Add physics
physics.addRigidBody(gameAsset, {
    mass: 10,
    friction: 0.5
});
```

## 🔐 Security Considerations

### API Keys
- **Never commit keys to Git**
- Use environment variables in production
- Rotate keys regularly
- Implement rate limiting

### Payment Security
- PCI compliance for credit cards
- Use Stripe/Coinbase hosted checkout
- Validate all transactions server-side
- Implement webhook signature verification

### User Authentication
- Use HTTPS in production
- Implement CSRF protection
- Session management
- Password hashing (bcrypt)

### Admin Protection
```javascript
// Server-side middleware
function requireAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Admin access required' });
    }
}

app.post('/api/settings', requireAdmin, updateSettings);
```

## 📊 Monitoring & Analytics

### Recommended Tools
- **Error Tracking**: Sentry
- **Analytics**: Google Analytics 4
- **Uptime**: Pingdom
- **Performance**: New Relic

### Key Metrics
- Asset generation success rate
- Payment conversion rate
- Average cart value
- LLM response time
- User retention

## 🚀 Deployment

### Static Hosting
```bash
# Netlify
netlify deploy --prod

# Vercel
vercel --prod

# AWS S3 + CloudFront
aws s3 sync . s3://your-bucket
```

### Server Requirements (for APIs)
```
Node.js >= 18
MongoDB or PostgreSQL
Redis (for sessions)
SSL certificate
```

### Environment Variables
```env
# LLM Providers
OPENAI_API_KEY=sk-...
CLAUDE_API_KEY=sk-ant-...
OLLAMA_URL=http://localhost:11434

# Payments
STRIPE_SECRET_KEY=sk_...
STRIPE_PUBLISHABLE_KEY=pk_...
COINBASE_API_KEY=...

# OAuth
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Database
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
```

## 📞 Support & Resources

### Documentation
- [ASX Specification](https://github.com/mpickettpayments-hue/JSON-ASX)
- [Gaming Engine](https://github.com/mpickettpayments-hue/json-asx-cdn)
- [Three.js Docs](https://threejs.org/docs)

### Community
- GitHub Issues
- Discord Server
- Stack Overflow

### Commercial Support
- Email: support@asxbuilder.com
- Enterprise plans available
- Custom development

## 📄 License

MIT License - Free to use and modify

---

**Built with ⚡ by ASX Model Builder Team**

**Powered by Three.js, OpenAI, Claude, Ollama, Stripe, and Coinbase**
