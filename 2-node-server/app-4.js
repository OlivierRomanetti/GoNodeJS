// ******************************************************
// Créer un serveur Node
// ******************************************************
// L'objet res généré par Node.js
// ******************************************************

const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.write(`
    <html>
      <head>
        <title>
          Node Server
        </title>
        <link rel="icon" href="data:,">
      </head>
      <body>
        Hello les amis, c'est le serveur node.js qui vous parle :)
      </body>
    </html>
  `);
  res.end();
});

server.listen(3000);

// NOTE
// On a ajouté <link rel="icon" href="data:,"> dans le <head></head>
// afin d'empêcher la request automatique du browser pour un favicon ce qui perturberait notre exemple
// https://webdesign.tutsplus.com/tutorials/prevent-automatic-favicon-requests--cms-34762

// On peut aller voir le body dans la tab Network du dev tool
