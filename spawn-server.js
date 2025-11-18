// spawn-server.js - Creates individual JSON server instances
const jsonServer = require('json-server');
const path = require('path');

const port = process.argv[2] || 3001;
const dbPath = process.argv[3] || path.join(__dirname, 'data', `db-${port}.json`);

const server = jsonServer.create();
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server running on http://localhost:${port}`);
  console.log(`Database: ${dbPath}`);
});
