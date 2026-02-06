# 🚀 ASX JSON Server

A lightweight, extensible server with:
- OAuth integration
- File hosting
- JSON API endpoints
- Simple dashboard

## 🔧 Setup

### Prerequisites
- Node.js (v16+)
- Google OAuth Credentials

### Installation
```bash
git clone https://github.com/yourusername/asx-json-server.git
cd asx-json-server
npm install
```

### Configuration
1. Create a `.env` file
2. Add Google OAuth credentials:
```
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
```

### Run the Server
```bash
# Development
npm run dev

# Production
npm start
```

## 🌟 Features

- 🔐 Google OAuth Login
- 📤 File Upload & Hosting
- 🗃️ JSON API Endpoints
- 💾 Persistent Data Storage
- 🖥️ Simple Dashboard

## 🔗 Endpoints

- `/` - Dashboard
- `/oauth/login` - Start Google OAuth
- `/upload` - File upload
- `/api/*` - JSON Server API routes
- `/files/:filename` - Download uploaded files

## 📦 Deploy

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

## 📝 License

MIT License
