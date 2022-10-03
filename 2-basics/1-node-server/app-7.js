// ******************************************************
// Créer un serveur Node
// ******************************************************
// ROUTING : parsing request body
// ******************************************************

const http = require('http');
const fs = require('fs');

const server = http.createServer(
  (req, res) => {
    const {url, method} = req;

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
      return res.end();
    }

    // ROUTING
    // => en fonction de l'url, on éxécute un certain code
    // On passe ici lorsque le formulaire est soumis par un E.T.
    // On va enregistrer ce que saisit le user dans un file
    // Et on va rediriger le user vers "/"
    if (url === '/register' && method === 'POST') {
      const fullData = [];
      // le data event sera émis à chaque fois qu'un chunk de data sera disponible à la lecture
      // La function passée en second paramètre sera donc éxécutée à chaque fois que le data event sera émis
      // JavaScript nous passera en premier argument le chunk de data correspondant
      req.on('data', (chunk) => {
        console.log(chunk);
        fullData.push(chunk);
      });
      // le end event sera émis lorsque le stream de data aura été parsé entièrement => lorsqu'il n'y aura plus de chunk
      req.on('end', () => {
        const parsedFullData = Buffer.concat(fullData).toString();
        const extraterrestrials = parsedFullData.split('=')[1];
        fs.writeFileSync('extraterrestrials.txt', extraterrestrials);
      });
      // Si notre réponse dépend des datas reçues, il faut alors mettre le code ci dessous dans le handler de l'end event (cf app-8.js)
      res.statusCode = 302;
      res.setHeader('Location', '/');
      return res.end();
    }
    // le code ci dessous n'est PAS éxécuté ( sauf si on rentre une URL random) OU sauf si on met lignes 58 à 62 dans le handler de du end event !
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

// la methode 'on' permet d'écouter certains events en lien avec la request
// ici on écoute l'event 'data' et l'event 'end' sur la request
// l'event 'data' est émis à chaque fois qu'un nouveau morceau de data (data chunk) est prêt à être lu
// on définit un callback qui sera exécuté à chaque fois qu'un event data sera émis
// Ce callback prend en paramètre le chunk de data reçu et est passé par Node.js automatiquement
// On peut donc manipuler ensuite ce data chunk
// l'event 'end' est émis lorsque les data (data chunk) ont été tous lus.

// IMPORTANT : L'ordre d'éxécution du code n'est pas forcément l'ordre dans lequel il est écrit dans ce fichier
// l'utilisation massive de l'event driven architecture dans Node.Js implique cela :
// des functions sont passées à des functions afin d'être éxécutées lorsque certains events sont émis
// Ces functions, appelées aussi callback, handler, ou encore listener, ne s'éxécuteront que plus tard dans le temps
// => ce que l'on appelle du code asynchrone

// Pourquoi fait on cela?
// Si on ne faisait pas cela, Node.js ferait une pause le temps d'écrire le fichier dans cet
// et donc cela ralentirait le serveur et l'émission de la réponse
// Cela empêcherait également de traiter d'autres request entrantes
// Ce n'est pas ce que l'on souhaite
// On veut un serveur réactif, qui délègue les actions et qui soit rapide.
// On ne veut pas être bloqué
// Avec cette architecture, on ne bloque jamais l'event loop très longtemps
// Notre serveur reste "en éveil" en permanence
