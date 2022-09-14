// ******************************************************
// Créer un serveur Node
// ******************************************************
// Parsing request data
// ******************************************************

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write(`
        <html>
          <head>
            <link rel="icon" href="data:,">
            <title>
              Homo Sapiens
            </title>
            <link rel="icon" href="data:,">
          </head>
          <body>
            <p>Formulaire d'enregistrement pour E.T.</p>
            <form action="/register" method="POST">
              <label for="type">E.T. type:</label>
              <input type="text" name="type">
              <button type="submit">
                Register Me
              </button>
            </form>
          </body>
        </html>
      `);
    return res.end();
  }
  if (url === '/register' && method === 'POST') {
    const fullData = [];
    req.on('data', (chunk) => {
      fullData.push(chunk);
    });

    // On a ajouté un return
    // on invoque on() ET on quitte Handler 1.
    // le return permet de quitter Handler 1
    return req.on('end', () => {
      const parsedFullData = Buffer.concat(fullData).toString();
      const extraterrestrials = parsedFullData.split('=')[1];
      fs.writeFileSync('extraterrestrials.txt', extraterrestrials);
      res.statusCode = 302;
      res.setHeader('Location', '/'); // la réponse n'est pas encore partie => on n'a plus d'erreur :)
      return res.end();
    });
  }
  // ce code n'est à nouveau PAS éxécuté ( sauf si on rentre une URL random)
  res.setHeader('Content-Type', 'text/html');
  res.write(`
      <html>
        <head>
          <title>My First Page</title>
        <head>'
        <body>
          <h1>Bonjour Je suis Node.js un serveur de la planete Terre</h1>
        </body>'
      </html>`);
  res.end();
});

server.listen(3000);
