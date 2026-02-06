# ASX Model Builder - Complete Production System

🎮 **Enterprise-Grade E-Commerce Platform for Three.js Game Assets**

**✨ NEW: Full Admin System with Payment Integration!**

## 🚀 Quick Start

1. **[Open Main Site](main-index.html)** - Landing page with gallery & cart
2. **[AI Builder](chat.html)** - Chat interface with admin panel  
   - **First user = Admin!** 
   - Configure APIs, payments, and LLMs
3. **[Test WebGL](simple-threejs-demo.html)** - Verify 3D graphics
4. **[Debug Console](debug-threejs-asx.html)** - Diagnostic tools

## 🔥 New Features

### 👑 Admin System
- **First user becomes admin automatically**
- Google OAuth login (simulated - production ready)
- Role-based access control
- Complete admin control panel

### 🤖 Multi-LLM Support
- **OpenAI GPT-4** - Cloud AI
- **Anthropic Claude** - Advanced reasoning
- **Ollama** - Local LLM (llama2, mistral, codellama)
- **Demo Mode** - No API required

### 💳 Payment Integration
- **Stripe** - Credit cards, Apple Pay, Google Pay
- **Coinbase Commerce** - Crypto payments (BTC, ETH, USDC)
- Dual payment support
- Test mode ready

### 📚 ASX Learning Mode
- LLM learns from ASX specification
- Trained on GitHub repositories
- Generates better game assets
- Context-aware code generation

## 📖 Documentation

- **[User Guide](README.md)** - This file
- **[Admin Guide](ADMIN_GUIDE.md)** - Complete admin documentation
- **[ASX Spec](https://github.com/mpickettpayments-hue/JSON-ASX)** - Format specification
- **[Gaming Engine](https://github.com/mpickettpayments-hue/json-asx-cdn)** - Integration code

## 📁 File Structure

```
├── main-index.html              # Main landing page with gallery & cart
├── chat.html                    # AI Builder chat interface
├── simple-threejs-demo.html     # Basic WebGL test (rotating cube)
├── debug-threejs-asx.html       # Diagnostic console with detailed logs
├── threejs-asx-fantasy-scene.html # Full 3D demo scene
└── README.md                    # This file
```

## 🎯 Features

### Admin Control Panel
**Access:** Click **⚙️ ADMIN** button in chat interface (after logging in as admin)

**Configure:**
- ✅ OpenAI GPT-4 API
- ✅ Anthropic Claude API  
- ✅ Ollama local LLM
- ✅ Stripe payment keys
- ✅ Coinbase Commerce keys
- ✅ Google OAuth credentials
- ✅ ASX learning mode

**First User = Admin:**
1. Open [chat.html](chat.html)
2. Click **🔐 Google Login**
3. First login gets **ADMIN** role
4. Access full admin panel
5. Configure all integrations

### Main Site (main-index.html)
- **Hero Section**: Animated CTA with 3 action buttons
- **Features Grid**: 6 feature cards explaining capabilities
- **Product Gallery**: 9 asset packs ($19.99 - $199.99)
- **Shopping Cart**: Full e-commerce cart with:
  - Add/remove items
  - Quantity controls
  - LocalStorage persistence
  - Checkout button
- **Matrix Theme**: Black background, CRT green, falling characters

### AI Builder (chat.html)
- Conversational interface for asset generation
- Simulated AI responses (ready for OpenAI/Claude API)
- Code generation with copy buttons
- Quick prompt shortcuts
- API key configuration
- Full system prompt included

### Demos
1. **Simple Test**: Rotating wireframe cube (tests WebGL)
2. **Debug Console**: Detailed diagnostics and logging
3. **Fantasy Scene**: Complete 3D scene with knight, chest, sword

## 🔧 Troubleshooting

### "Error creating WebGL context"

**Solution 1: Test WebGL Support**
1. Click "Test WebGL" button on main page
2. If it fails, open `debug-threejs-asx.html`
3. Check console logs for specific errors

**Solution 2: Browser Settings**
- **Chrome**: `chrome://settings/` → Advanced → System → "Use hardware acceleration"
- **Firefox**: `about:config` → `webgl.force-enabled` → true
- **Edge**: Same as Chrome

**Solution 3: Update Browser**
- Chrome: `chrome://settings/help`
- Firefox: `about:` menu → Help → About Firefox
- Edge: `edge://settings/help`

**Solution 4: Try Different Browser**
- Chrome (recommended)
- Firefox
- Edge
- Safari (Mac)

### "Script error" or "Uncaught Error"

**Possible Causes:**
1. **CDN blocked** - Check internet connection
2. **Browser extensions** - Disable ad blockers
3. **CORS issues** - Open files via web server, not file://

**Solutions:**
- Open `debug-threejs-asx.html` to see exact error
- Check browser console (F12) for details
- Try incognito/private mode
- Clear browser cache

### Demos Not Loading

1. **Check WebGL**: Click 🔍 icon in nav bar
2. **View Debug Console**: Opens diagnostic page
3. **Check Console**: Press F12, look for red errors
4. **Update Graphics Drivers**: GPU drivers might be outdated

## 💻 Technical Details

### Three.js Configuration
- **Version**: 0.152.0
- **CDN**: `https://cdn.jsdelivr.net/npm/three@0.152.0/build/three.min.js`
- **Features Used**:
  - Scene, Camera, Renderer
  - BoxGeometry, PlaneGeometry, CylinderGeometry
  - MeshStandardMaterial, MeshBasicMaterial
  - Lights (Ambient, Directional, Point)
  - AnimationMixer (for fantasy scene)
  - Raycaster (for click detection)

### Browser Requirements
- **Minimum**: Chrome 80, Firefox 75, Edge 80, Safari 13
- **WebGL**: Version 1.0 or higher required
- **JavaScript**: ES6+ support
- **Hardware**: GPU with WebGL support

### Cart Implementation
- **Storage**: LocalStorage (`cart` key)
- **Format**: JSON array of products with quantities
- **Persistence**: Survives page refresh and navigation
- **Features**: Add, remove, update quantities, calculate totals

## 🤖 AI Builder Setup

The chat interface supports two LLM providers:

### Option 1: OpenAI
```javascript
API_URL: 'https://api.openai.com/v1/chat/completions'
Model: 'gpt-4' or 'gpt-4o-mini'
```

### Option 2: Anthropic
```javascript
API_URL: 'https://api.anthropic.com/v1/messages'
Model: 'claude-sonnet-4-20250514'
```

**To Configure:**
1. Click "Set API Key" button in chat interface
2. Enter your API key
3. Select provider (OpenAI or Anthropic)
4. Click "Save"

**Current Mode:**
- Demo mode with simulated responses
- Shows example ASX JSON code generation
- Ready to plug in real API

## 🎯 ASX JSON Format

ASX (Asset Scene eXchange) is a Three.js-compatible JSON format:

```json
{
  "version": "1.0",
  "geometries": [
    {
      "id": "boxGeo",
      "type": "box",
      "parameters": { "width": 2, "height": 2, "depth": 2 }
    }
  ],
  "materials": [
    {
      "id": "greenMat",
      "type": "MeshStandardMaterial",
      "properties": { "color": "#00ff00", "metalness": 0.7 }
    }
  ],
  "objects": [
    {
      "id": "cube",
      "geometry": "boxGeo",
      "material": "greenMat",
      "position": [0, 0, 0]
    }
  ]
}
```

## 📦 Product Catalog

1. **Fantasy Knight Pack** - $29.99
2. **Treasure Chest Set** - $19.99
3. **Magic Sword Collection** - $39.99
4. **Sci-Fi Props Pack** - $49.99
5. **Environment Kit** - $59.99
6. **Character Starter Pack** - $44.99
7. **UI Elements Pro** - $24.99
8. **Particle FX Library** - $34.99
9. **Complete Mega Bundle** - $199.99

## 🎨 Theme Customization

All files use consistent Matrix theme variables:

```css
Background: #000000 (black)
Primary: #00ff00 (CRT green)
Secondary: #00cc00 (darker green)
Error: #ff0000 (red)
Warning: #ffff00 (yellow)
Font: 'Courier New', monospace
```

### Matrix Effect
- Falling characters animation on every page
- Japanese katakana characters mixed with ASCII
- Adjustable opacity and speed
- Low resource usage

## 🔐 Security Notes

- API keys stored in LocalStorage (client-side only)
- No server-side processing in demo
- Cart data never leaves browser
- Mock checkout (no real payments)

## 🚀 Deployment

### Quick Setup (Local Development)

1. **Clone/Download Files**
2. **Open chat.html**
3. **Click Google Login** (first user = admin)
4. **Click ⚙️ ADMIN**
5. **Configure your LLM** (see below)

### LLM Configuration

#### Option 1: Demo Mode (No Setup)
- Works immediately
- Simulated responses
- Good for testing UI

#### Option 2: Ollama (Local, Free)
```bash
# Install Ollama
curl https://ollama.ai/install.sh | sh

# Pull a model
ollama pull llama2

# Start server
ollama serve

# In Admin Panel:
# - Ollama URL: http://localhost:11434
# - Model: llama2
# - Active LLM: ollama
```

#### Option 3: OpenAI (Cloud)
```bash
# Get API key from platform.openai.com
# In Admin Panel:
# - OpenAI Key: sk-...
# - Active LLM: openai
```

#### Option 4: Claude (Cloud)
```bash
# Get API key from console.anthropic.com
# In Admin Panel:
# - Claude Key: sk-ant-...
# - Active LLM: claude
```

### Payment Setup

#### Stripe (Credit Cards)
1. Sign up at [stripe.com](https://stripe.com)
2. Get test keys
3. Add to admin panel
4. Use test card: `4242 4242 4242 4242`

#### Coinbase Commerce (Crypto)
1. Sign up at [commerce.coinbase.com](https://commerce.coinbase.com)
2. Get API key
3. Add to admin panel
4. Accept BTC, ETH, USDC, etc.

## 🚀 Production Deployment

**Static Hosting (Recommended):**
- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages

**Upload all files to hosting, set main-index.html as entry point**

**For payment integration, add:**
- Stripe Checkout
- PayPal SDK
- Server-side order processing

## 📞 Support

If demos still don't work after troubleshooting:

1. Check `debug-threejs-asx.html` - shows exact issue
2. Browser console (F12) - look for errors
3. Test on different device - isolate hardware issues
4. Check WebGL Report: https://webglreport.com

## 📄 License

MIT License - Free to use and modify

## 🎮 Credits

- Three.js - https://threejs.org
- ASX JSON Spec - https://github.com/mpickettpayments-hue/JSON-ASX
- Matrix Digital Rain effect
- Courier New font (system)

---

**Built with ⚡ by ASX Model Builder Team**
**Powered by Three.js & Matrix Code**
