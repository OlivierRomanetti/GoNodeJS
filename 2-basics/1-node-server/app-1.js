// ******************************************************
// Créer un serveur Node
// ******************************************************
// ******************************************************
// Dans Node.js on utilise "require" pour importer des modules​
// On peut saisir le nom d'un core module, ou bien le path vers un module que l'on a créé
// Si on saisit un path, il doit commencer par / ou ./

// On obtient un http object, avec ses properties et ses methods
const http = require('http');


// On crée un serveur avec la méthode createServer qui nous renvoie un objet server
// Celle ci prend en paramètre un requestListener
// C'est une 'event driven architecture', qui est énormément utilisée par Node.js

// Le request listener est une function (anonyme dans ce cas) qui sera invoquée et exécutée par Node.js 
// à chaque fois qu'une request entrante arrivera
// C'est un callback
// 2 paramètres nous seront passés par Node.js :
// req: un objet représentant la requêtre entrante
// res: un objet représentant la réponse que l'on souhaite renvoyer

const server = http.createServer((req, res) => {
  console.log(req);
  console.log("the server has started and listen on port 3000");
})

// On demande ensuite au serveur d'écouter, ici sur le port 3000
server.listen(3000);

// On lance ensuite l'app en tapant dans notre terminal la commande 
// node app.js
// => le terminal ne nous redonne pas la main et c'est normal!
// un process est maintenant lancé, et ce process écoute sur le port 3000 de notre machine les requests entrantes
// un process est maintenant lancé, un web server, qui écoute continuellement sur le port 3000 de notre machine les requests entrantes

// Ouvrez le browser et aller à l'url localhost:3000