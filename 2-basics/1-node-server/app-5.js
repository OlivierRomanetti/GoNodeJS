// ******************************************************
// Créer un serveur Node
// ******************************************************
// L'objet res généré par Node.js
// ******************************************************

const http = require('http');
	
const server = http.createServer((req, res) => {

  res.setHeader('Content-Type', 'text/html');

  const { url } = req;
  let message = 'Bonjour a vous amis extra-terrestres!';

  if (url === '/about') {
		message = 'Nous sommes des Homo Sapiens';
	} else if (url === '/where') {
		message = 'Nous habitons la planete Terre';
	}

  res.write(`
    <html>
      <head>
        <title>
          Homo Sapiens
        </title>
        <link rel="icon" href="data:,">
      </head>
      <body>
        ${message}
      </body>
    </html>
  `);
  res.end();
})

server.listen(3000);


