# ASX Builder - Quick Reference

## 🎯 One-Minute Setup

1. Open **chat.html**
2. Click **🔐 Google Login** (first user = **ADMIN**)
3. Click **⚙️ ADMIN** button
4. Choose your setup:

### Option A: Free & Local (Ollama)
```bash
curl https://ollama.ai/install.sh | sh
ollama pull llama2
ollama serve
```
Then in admin: **Active LLM** → **Ollama**

### Option B: Cloud AI (OpenAI/Claude)
Get API key → Add to admin → **Active LLM** → **OpenAI** or **Claude**

### Option C: Demo Mode
Just use it! No setup needed (simulated responses)

## 🛒 E-Commerce Setup

### Quick Test
1. Browse **main-index.html**
2. Add items to cart
3. Click checkout
4. Uses demo mode

### Real Payments
**Admin Panel:**
- Add **Stripe** keys for credit cards
- Add **Coinbase** keys for crypto
- Choose **Active Payment** provider

## 🎮 Create Assets

**In Chat:**
```
"Create a glowing magic sword that rotates"
```

**AI Will Ask:**
- Size/dimensions
- Colors/materials
- Animations
- Interactions

**You Get:**
- Complete HTML file
- ASX JSON included
- Ready to run
- Copy button included

## 🔑 Admin Quick Access

| Feature | How to Access |
|---------|--------------|
| Admin Panel | Click **⚙️ ADMIN** (after login) |
| User Login | Click **🔐 Google Login** |
| API Keys | Admin → AI/LLM Providers |
| Payments | Admin → Payment Integration |
| Learning Mode | Admin → ASX Learning (checkbox) |

## 📊 API Status Indicators

🟢 **Active** - Configured and ready
⚫ **Inactive** - Not configured

Check status in admin panel under "API Status"

## 🤖 Supported LLMs

| Provider | Setup | Cost | Best For |
|----------|-------|------|----------|
| Ollama | 5 min | Free | Privacy, Local |
| OpenAI | 1 min | Pay | Quality, Speed |
| Claude | 1 min | Pay | Reasoning, Long |
| Demo | 0 min | Free | Testing UI |

## 💳 Payment Providers

| Provider | Accepts | Setup | Fees |
|----------|---------|-------|------|
| Stripe | Cards, Apple Pay, Google Pay | 2 min | 2.9% + 30¢ |
| Coinbase | BTC, ETH, USDC, etc. | 2 min | 1% |
| Demo | Nothing (test mode) | 0 min | Free |

## 📦 Asset Packs

| Pack | Price | What's Included |
|------|-------|-----------------|
| Fantasy Knight | $29.99 | Armor, weapons, 5 colors |
| Treasure Chest | $19.99 | Opening animation, particles |
| Magic Swords | $39.99 | 10 swords, glow effects |
| Sci-Fi Props | $49.99 | 50+ futuristic items |
| Environment Kit | $59.99 | Terrain, vegetation, atmosphere |
| Character Pack | $44.99 | Rigging, animations, customization |
| UI Elements | $24.99 | Game UI, hover effects |
| Particle FX | $34.99 | 200+ effects |
| Mega Bundle | $199.99 | Everything (50% off) |

## 🔧 Troubleshooting

### Chat Not Working
1. Check admin panel → API Status
2. Verify API keys are correct
3. Check console (F12) for errors
4. Try demo mode first

### Ollama Connection Failed
```bash
# Check if running
curl http://localhost:11434

# Restart if needed
ollama serve
```

### Stripe Test Cards
- **Success:** 4242 4242 4242 4242
- **Decline:** 4000 0000 0000 0002
- **Auth Required:** 4000 0025 0000 3155

### WebGL Not Working
1. Click **Test WebGL** on main page
2. Try **Debug Console** for details
3. Enable hardware acceleration
4. Update browser/GPU drivers

## 📚 Learn More

- **Full Docs:** [README.md](README.md)
- **Admin Guide:** [ADMIN_GUIDE.md](ADMIN_GUIDE.md)
- **ASX Spec:** [GitHub](https://github.com/mpickettpayments-hue/JSON-ASX)
- **Gaming Engine:** [GitHub](https://github.com/mpickettpayments-hue/json-asx-cdn)

## 🆘 Quick Commands

### Test Everything
```bash
# 1. Open main-index.html (test e-commerce)
# 2. Open chat.html (test AI)
# 3. Open simple-threejs-demo.html (test WebGL)
# 4. Open debug-threejs-asx.html (if issues)
```

### Install Ollama (All Models)
```bash
ollama pull llama2      # General purpose
ollama pull codellama   # Code generation
ollama pull mistral     # Fast & efficient
ollama pull llama3      # Latest from Meta
ollama pull phi         # Small & fast
```

### Check API Keys Work
```bash
# OpenAI
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"

# Claude
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $CLAUDE_API_KEY" \
  -H "anthropic-version: 2023-06-01"

# Ollama
curl http://localhost:11434/api/tags
```

## 🎯 Common Workflows

### Workflow 1: Generate Asset
1. Open chat.html
2. Describe asset
3. Answer questions
4. Copy generated code
5. Save as .html
6. Open in browser

### Workflow 2: Sell Asset
1. Add to products array in main-index.html
2. Set price
3. Add demo link
4. Test checkout
5. Configure real payments in admin

### Workflow 3: Setup Production
1. Get domain name
2. Enable HTTPS
3. Configure Google OAuth
4. Add real API keys
5. Setup payment webhooks
6. Deploy to hosting

## ⚡ Power Tips

1. **ASX Learning Mode** makes better assets
2. **Ollama** keeps your data private
3. **First user = Admin** (only once!)
4. Test cards work in Stripe test mode
5. Cart persists in LocalStorage
6. F12 console shows all errors
7. Mobile responsive everywhere
8. All Matrix CRT themed 🟢

---

**Need Help?** Check [ADMIN_GUIDE.md](ADMIN_GUIDE.md) for detailed docs
