// ******************************************************
// Créer un serveur Node
// ******************************************************
// Better code
// ******************************************************

const http = require('http');
const routes = require('./routes');

const server = http.createServer(routes);


server.listen(3000);
