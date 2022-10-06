// ******************************************************
// Créer un serveur Node
// ******************************************************
// Comment quitter l'application (hard exit) : process.exit
// ******************************************************
const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req);
  console.log("the server has started and listen on port 3000");
  process.exit();
})

server.listen(3000);

// process.exit() kill l'event loop, on reprend la main dans le terminal
// l'application est terminée
// En pratique on ne fait pas cela biensur, 
// car sinon notre serveur ne tourne plus et on ne peut plus traiter de requête entrante
