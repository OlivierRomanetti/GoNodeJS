// ******************************************************
// Créer un serveur Node
// ******************************************************
// L'objet res généré par Node.js
// ******************************************************

const http = require('http');

const server = http.createServer((req, res) => {
  //console.log("::: res :::  ", res);

  res.setHeader('Content-Type', 'text/html');
  res.write(`
    <html>
      <head>
        <title>
          Node Server
        </title>
      </head>
      <body>
        Hello les amis, c'est le serveur node.js qui vous parle :)
      </body>
    </html>
  `);
  res.end();
})

server.listen(3000);

// url peut n'être que '/' si rien après localhost:3000
