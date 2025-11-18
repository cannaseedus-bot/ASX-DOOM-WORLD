// build.js - Automated build script for ASX DOOM Server
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔨 ASX DOOM SERVER - BUILD SCRIPT\n');
console.log('================================\n');

// 1. Clean dist folder
console.log('🧹 Cleaning dist folder...');
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true });
}
fs.mkdirSync('dist');
console.log('✅ Cleaned\n');

// 2. Install pkg if not present
console.log('📦 Checking for pkg...');
try {
  execSync('pkg --version', { stdio: 'ignore' });
  console.log('✅ pkg found\n');
} catch (e) {
  console.log('⚠️  pkg not found, installing...');
  execSync('npm install -g pkg', { stdio: 'inherit' });
  console.log('✅ pkg installed\n');
}

// 3. Build executable
console.log('🔨 Building executable...');
console.log('   Target: Windows x64');
console.log('   Node: 18');
console.log('   Size: ~50 MB\n');

try {
  execSync('pkg . --targets node18-win-x64 --output dist/asx-doom-server.exe', {
    stdio: 'inherit'
  });
  console.log('✅ Executable built!\n');
} catch (e) {
  console.error('❌ Build failed:', e.message);
  process.exit(1);
}

// 4. Copy configuration
console.log('📄 Copying configuration files...');
fs.copyFileSync('config.json', 'dist/config.json');
console.log('✅ config.json copied\n');

// 5. Copy documentation
console.log('📖 Copying documentation...');
fs.copyFileSync('USER_SETUP.md', 'dist/README.md');
fs.copyFileSync('DOOM_QUICK_CHECKLIST.md', 'dist/DOOM_SETUP.md');
console.log('✅ Documentation copied\n');

// 6. Create folder structure
console.log('📁 Creating folder structure...');
fs.mkdirSync('dist/games/zandronum/wads', { recursive: true });
fs.mkdirSync('dist/games/zandronum/config', { recursive: true });
console.log('✅ Folders created\n');

// 7. Create QUICK_START.txt
console.log('📝 Creating QUICK_START.txt...');
const quickStart = `
╔════════════════════════════════════════════╗
║   ASX DOOM TOURNAMENT SERVER - v1.0.0      ║
╚════════════════════════════════════════════╝

🚀 QUICK START (5 Minutes):

1. Download Zandronum
   https://zandronum.com/download
   → Get Windows 3.1 version

2. Extract to folder
   → games/zandronum/

3. Get DOOM.WAD
   FREE: https://freedoom.github.io
   OR Buy: Steam/GOG
   → Put in games/zandronum/wads/DOOM.WAD

4. Run server
   → Double-click: asx-doom-server.exe

5. Open browser
   → http://localhost:3000

📖 Full instructions: README.md

💰 UPGRADE OPTIONS:
   Source Code: $500 (use your own token)
   Enterprise: $10,000 (custom features + support)
   
   Visit: https://asx-gaming.com/purchase
   Email: sales@asx-gaming.com

🎮 READY TO BUILD YOUR GAMING EMPIRE!
`;

fs.writeFileSync('dist/QUICK_START.txt', quickStart.trim());
console.log('✅ QUICK_START.txt created\n');

// 8. Create LICENSE
console.log('📜 Creating LICENSE...');
const license = `
ASX DOOM Server - Free Edition
Copyright (c) 2025 ASX Gaming

FREE EDITION LICENSE

PERMITTED:
✅ Personal use
✅ Run tournaments
✅ Host servers
✅ Use all features
✅ Share with friends

NOT PERMITTED:
❌ Decompile or reverse engineer
❌ Remove ASX branding
❌ Use different token than ASX
❌ Resell or redistribute
❌ Commercial hosting services
❌ Claim as your creation

UPGRADE OPTIONS:

Source Code License ($500):
- Modify source code
- Use your own token
- Remove branding
- Commercial use

Enterprise License ($10,000):
- Everything in Source Code
- Custom features built
- Deployment assistance
- 1 year support

For upgrades: https://asx-gaming.com/purchase
Questions: sales@asx-gaming.com

THIS SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY.
`;

fs.writeFileSync('dist/LICENSE.txt', license.trim());
console.log('✅ LICENSE.txt created\n');

// 9. Get file sizes
console.log('📊 Build Summary:');
const exeSize = fs.statSync('dist/asx-doom-server.exe').size;
console.log(`   EXE Size: ${(exeSize / 1024 / 1024).toFixed(2)} MB`);

let totalSize = exeSize;
const files = ['config.json', 'README.md', 'DOOM_SETUP.md', 'QUICK_START.txt', 'LICENSE.txt'];
files.forEach(file => {
  const size = fs.statSync(path.join('dist', file)).size;
  totalSize += size;
  console.log(`   ${file}: ${(size / 1024).toFixed(2)} KB`);
});

console.log(`   Total: ${(totalSize / 1024 / 1024).toFixed(2)} MB\n`);

// 10. Success!
console.log('╔════════════════════════════════════════════╗');
console.log('║         ✅ BUILD SUCCESSFUL! ✅             ║');
console.log('╚════════════════════════════════════════════╝\n');

console.log('📦 Distribution Package Ready:');
console.log('   Location: dist/\n');

console.log('📤 Next Steps:');
console.log('   1. Test: cd dist && asx-doom-server.exe');
console.log('   2. Zip: Create asx-doom-server-v1.0.0-win.zip');
console.log('   3. Upload: GitHub Releases');
console.log('   4. Market: Reddit, Discord, YouTube');
console.log('   5. Profit: $$$\n');

console.log('💰 Revenue Potential:');
console.log('   1,000 downloads → $19K/mo token revenue');
console.log('   20 source sales → $10K one-time');
console.log('   2 enterprise → $20K one-time');
console.log('   Total Year 1: $139K - $421K\n');

console.log('🚀 BUILD YOUR EMPIRE!\n');
