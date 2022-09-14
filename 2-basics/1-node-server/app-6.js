// ******************************************************
// Créer un serveur Node
// ******************************************************
// Parsing request data
// ******************************************************

const http = require('http');
const fs = require('fs');

const server = http.createServer(
  // main callback
  // Ce  handler est éxécuté chaque fois qu'une request arrive au serveur
  (req, res) => {
    const url = req.url;
    const method = req.method;

    // ROUTING => en fonction de l'url de la request on éxécute un certain code
    // On affiche une form pour récupérer des datas auprès des E.T.
    if (url === '/') {
      res.write(`
        <html>
          <head>
            <title>
              Homo Sapiens
            </title>
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
      console.log('-----1');
      return res.end();
    }

    // ROUTING => en fonction de l'url, on éxécute un certain code => On passe ici lorsque le formulaire est soumis par un E.T.
    if (url === '/register' && method === 'POST') {
      const fullData = [];

      // ici on écoute l'event 'data'
      req.on(
        'data',
        // ::: data handler part :::
        (chunk) => {
          console.log(chunk);
          fullData.push(chunk);
        }
      );

      req.on('end', () => {
        // ::: end handler part :::
        // TRES IMPORTANT A COMPRENDRE :
        // le code ci dessous est éxécuté APRES qu'on ait envoyé la response
        const parsedBody = Buffer.concat(body).toString();
        const message = parsedBody.split('=')[1];
        fs.writeFileSync('message.txt', message);
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    }
    console.log('ttiti');
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title><head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();
  }
); // fin du main callback

// Notre serveur écoute les request entrante sur le port 3000
server.listen(3000);

// la methode 'on' permet d'écouter certains events en lien avec la request
// ici on écoute l'event 'data'
// l'event 'data' est émis à chaque fois qu'un nouveau morceau de data (data chunk) est prêt à être lu
// on définit un callback qui sera exécuté à chaque fois qu'un event data sera émis
// Ce callback prend en paramètre le chunk de data reçu et est passé par Node.js automatiquement
// On peut donc manipuler ensuite ce data chunk
