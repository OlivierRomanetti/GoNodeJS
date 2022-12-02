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

    // WARNING::::::: On ajoute un return DEVANT req.on
    // on invoque on() ET on quitte Handler 1.
    // le return permet de quitter Handler 1
    return req.on('end', () => {
      const parsedFullData = Buffer.concat(fullData).toString();
      const extraterrestrials = parsedFullData.split('=')[1];
      // WARNING:::::::  ICI on est SYNCHRONE, le code est bloqué jusqu'à la fin de l'écriture du file
      // pas un problème pour notre exemple, mais dans le cas de gros file cela peut devenir problématique!
      fs.writeFileSync('extraterrestrials-9.txt', extraterrestrials); 
      res.statusCode = 302;
      res.setHeader('Location', '/'); // la réponse n'est pas encore partie => on n'a plus d'erreur :)
      return res.end();
    });
  }
  // WARNING::::::: ce code n'est à nouveau PAS EXECUTE ( sauf si on rentre une URL random)
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
