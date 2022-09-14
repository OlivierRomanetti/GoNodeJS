// ******************************************************
// Créer un serveur Node
// ******************************************************
// Quelques properties importantes de l'objet req généré par Node.js
// ******************************************************


const http = require('http');

const server = http.createServer((req, res) => {
  const {url, headers, method} = req;
  console.log("::: url :::  ", url);
  console.log("::: headers :::", headers);
  console.log("::: method :::", method);
})

server.listen(3000);

// url peut n'être que '/' si rien après localhost:3000
// Pour l'instant on ne renvoie aucune response
// C'est pour cela que notre tab dans le browser reste vide