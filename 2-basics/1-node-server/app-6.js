// ******************************************************
// Créer un serveur Node
// ******************************************************
// ROUTING
// ******************************************************

const http = require('http');
const fs = require('fs');

const server = http.createServer(
  // Ce  handler est éxécuté chaque fois qu'une request arrive au serveur, appelons le Handler 1
  (req, res) => {
    const url = req.url;
    const method = req.method;

    // ROUTING
    // => en fonction de l'url de la request on éxécute un certain code
    // Ici on affiche une form pour récupérer des datas auprès des E.T.
    if (url === '/') {
      res.write(`
        <html>
          <head>
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
      // on envoie la réponse ET on quitte Handler 1.
      // C'est res.end() qui envoie la réponse et non pas le return
      // le return permet de quitter Handler 1
      return res.end();
    }

    // ROUTING
    // => en fonction de l'url, on éxécute un certain code
    // On passe ici lorsque le formulaire est soumis par un E.T.
    if (url === '/register' && method === 'POST') {
      fs.writeFileSync('extraterrestrials.txt', "TEXTE NON DYNAMIQUE");
      res.statusCode = 302;
      // On redirige le user à l'url "/""
      res.setHeader('Location', '/');
      // on envoie la réponse ET on quitte Handler 1.
      // C'est res.end() qui envoie la réponse et non pas le return
      // le return permet de quitter Handler 1
      return res.end();
    }
    // le code ci dessous n'est PAS éxécuté ( sauf si on rentre une URL random)
    res.setHeader('Content-Type', 'text/html');
    res.write(`
      <html>
        <head>
          <title>
            HAL
          </title>
          <link rel="icon" href="data:,">
        <head>
        <body>
          <h1>Bonjour Je suis Node.js un serveur de la planete Terre</h1>
          <h2>votre URL n'est pas reconnue par mon cerveau</h2>
        </body>
      </html>`);
    res.end();
  }
);

// Notre serveur écoute les request entrante sur le port 3000
server.listen(3000);
