const fs = require('fs');

const requestHandler = (req, res) => {
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

    return req.on('end', () => {
      const parsedFullData = Buffer.concat(fullData).toString();
      const extraterrestrials = parsedFullData.split('=')[1];
      // ICI on est asynchrone, le code n'est pas bloqué
      // On passe alors un callback
      fs.writeFile('extraterrestrials.txt', extraterrestrials, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
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
};

module.exports = requestHandler;
// on peut aussi 
// - exporter un object avec properties ou bien
// - enlever le mot clé module
// - utiliser la syntaxe module.exports.property = value qui est équivalente à exporter un object
