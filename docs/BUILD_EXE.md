# 🔨 BUILD EXE - CREATE DISTRIBUTABLE

**How to compile your Node.js app into a Windows EXE**

---

## 🎯 WHY EXE?

**Benefits:**
1. **Protect Source Code** - Users can't see your code
2. **Easy Distribution** - One file to download
3. **Professional** - Looks like real software
4. **License Control** - Bake your token in

---

## 🛠️ METHOD 1: PKG (Recommended)

**PKG** packages your Node.js app into a single executable.

### Step 1: Install PKG

```bash
npm install -g pkg
```

### Step 2: Create package.json Build Config

Add this to your `package.json`:

```json
{
  "bin": "server.js",
  "pkg": {
    "targets": [ "node18-win-x64" ],
    "assets": [
      "public/**/*",
      "modules/**/*",
      "config.json"
    ],
    "outputPath": "dist"
  }
}
```

### Step 3: Build

```bash
# Build Windows EXE
pkg . --targets node18-win-x64 --output dist/asx-doom-server.exe
```

**Output:**
- `dist/asx-doom-server.exe` (~50 MB)

### Step 4: Test

```bash
cd dist
./asx-doom-server.exe
```

Open: http://localhost:3000

---

## 🛠️ METHOD 2: NEXE (Alternative)

**Nexe** creates standalone executables.

### Step 1: Install

```bash
npm install -g nexe
```

### Step 2: Build

```bash
nexe server.js --target windows-x64-18.0.0 --output asx-doom-server.exe
```

---

## 🛠️ METHOD 3: ELECTRON (Desktop App)

Turn it into a full desktop app with UI.

### Create electron-main.js:

```javascript
const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const path = require('path');

let mainWindow;
let serverProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false
    },
    icon: path.join(__dirname, 'icon.png')
  });

  // Start Node server
  serverProcess = spawn('node', ['server.js'], {
    cwd: __dirname
  });

  // Wait for server to start
  setTimeout(() => {
    mainWindow.loadURL('http://localhost:3000');
  }, 2000);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (serverProcess) {
    serverProcess.kill();
  }
  app.quit();
});
```

### Build with Electron Builder:

```bash
npm install electron electron-builder --save-dev

# Build
npm run build
```

**Result:** Professional installer EXE

---

## 📦 WHAT TO DISTRIBUTE

### Free GitHub Release

```
asx-doom-server-v1.0.0-win.zip
├── asx-doom-server.exe    ← 50MB compiled exe
├── config.json            ← Editable config
├── USER_SETUP.md          ← Setup guide
└── games/                 ← Empty folder (user fills)
```

**Users download:**
1. Extract ZIP
2. Add Zandronum to games/
3. Run EXE
4. Done!

---

## 🔐 PROTECTING YOUR CODE

### What Users CAN'T See:

- ✅ Your source code
- ✅ Business logic
- ✅ Token integration details
- ✅ API endpoints implementation

### What Users CAN See:

- ⚠️ config.json (intentional - they need to configure)
- ⚠️ Network traffic (can't hide API calls)
- ⚠️ Public HTML/CSS (it's in browser)

### Extra Protection:

**1. Obfuscate JavaScript:**
```bash
npm install -g javascript-obfuscator

# Obfuscate before building
javascript-obfuscator server.js --output server.obfuscated.js
```

**2. Encrypt config.json:**
- Encrypt sensitive parts
- Decrypt at runtime

**3. License Key System:**
- Add activation system
- Phone-home validation
- Block on piracy

---

## 💰 LICENSE ENFORCEMENT

### In server.js, add:

```javascript
// At startup
function validateLicense() {
  const license = config.licensing;
  
  // Free version restrictions
  if (license.license_type === 'free') {
    if (!config.token.enabled || config.token.name !== 'ASX') {
      console.error('❌ FREE VERSION: Must use ASX token');
      process.exit(1);
    }
    
    if (!config.branding.show_asx_branding) {
      console.error('❌ FREE VERSION: Cannot remove branding');
      process.exit(1);
    }
  }
  
  // Paid version validation
  if (license.license_type === 'commercial') {
    if (!license.license_key) {
      console.error('❌ License key required');
      process.exit(1);
    }
    
    // Validate key with your server
    validateKeyOnline(license.license_key);
  }
}
```

---

## 🎯 BUILD SCRIPT

Create `build.js`:

```javascript
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔨 Building ASX DOOM Server...\n');

// 1. Clean dist folder
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true });
}
fs.mkdirSync('dist');

// 2. Build EXE
console.log('📦 Creating executable...');
execSync('pkg . --targets node18-win-x64 --output dist/asx-doom-server.exe');

// 3. Copy config
console.log('📄 Copying config...');
fs.copyFileSync('config.json', 'dist/config.json');

// 4. Copy docs
console.log('📖 Copying documentation...');
fs.copyFileSync('USER_SETUP.md', 'dist/README.md');

// 5. Create games folder
console.log('📁 Creating games folder...');
fs.mkdirSync('dist/games/zandronum/wads', { recursive: true });

// 6. Create README
const readme = `
# ASX DOOM Server

1. Extract Zandronum to: games/zandronum/
2. Put DOOM.WAD in: games/zandronum/wads/
3. Run: asx-doom-server.exe
4. Open: http://localhost:3000

See README.md for full instructions.
`;
fs.writeFileSync('dist/QUICK_START.txt', readme);

console.log('\n✅ Build complete! Check dist/ folder');
console.log('📦 Ready to distribute!\n');
```

Run:
```bash
node build.js
```

---

## 📤 GITHUB RELEASE

### Step 1: Create ZIP

```bash
cd dist
zip -r asx-doom-server-v1.0.0-win.zip *
```

### Step 2: Create GitHub Release

1. Go to: https://github.com/YOUR_USER/asx-doom-server/releases
2. Click "Create new release"
3. Tag: `v1.0.0`
4. Title: "ASX DOOM Server v1.0.0"
5. Upload: `asx-doom-server-v1.0.0-win.zip`
6. Description:

```markdown
# ASX DOOM Server v1.0.0

Run your own DOOM tournament server in 5 minutes!

## Features
- 🎮 DOOM multiplayer servers
- 🏆 Tournament management
- 💰 ASX token integration
- 🌐 Web-based control panel

## Download
- Windows: asx-doom-server-v1.0.0-win.zip (50 MB)

## Setup
1. Extract ZIP
2. Follow README.md
3. Run asx-doom-server.exe

## Upgrade
Want your own token? Buy source code: $500
Enterprise support? Contact us: $10,000

## Links
- Setup Guide: [link]
- Discord: [link]
- Website: [link]
```

---

## 🎯 DISTRIBUTION CHECKLIST

- [ ] Build EXE with pkg
- [ ] Test EXE runs on clean Windows
- [ ] Include config.json
- [ ] Include USER_SETUP.md
- [ ] Create games/ folder structure
- [ ] Create ZIP file
- [ ] Upload to GitHub Releases
- [ ] Create awesome README
- [ ] Post on Reddit
- [ ] Share on Discord
- [ ] Tweet about it

---

## 💡 PRO TIPS

### Make It Professional

1. **Add Icon**
   - Create 256x256 PNG
   - Use rcedit to add icon:
   ```bash
   npm install -g rcedit
   rcedit dist/asx-doom-server.exe --set-icon icon.ico
   ```

2. **Code Signing**
   - Buy certificate ($100/year)
   - Sign EXE with signtool
   - Removes "Unknown Publisher" warning

3. **Installer**
   - Use Inno Setup (free)
   - Creates professional installer
   - Adds to Start Menu

4. **Auto-Updates**
   - Check for updates at startup
   - Download new version
   - Prompt user to upgrade

---

## 🚀 NEXT STEPS

1. **Build EXE** (today)
2. **Test thoroughly** (this week)
3. **Create GitHub Release** (next week)
4. **Market like crazy** (ongoing)
5. **Collect $$$** (soon!)

---

## ✅ YOU'RE READY TO SHIP!

Once you build the EXE:
- ✅ Users can't see source code
- ✅ Professional distribution
- ✅ Your token is baked in
- ✅ Ready to sell upgrades

**BUILD IT AND THEY WILL COME!** 💰🚀
