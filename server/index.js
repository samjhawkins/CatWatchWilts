const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const https = require('https');
const path = require('path');
const fs = require('fs');
const securePaths = [
    '/admin',
    '/login'
];

console.log('starting server');
const app = express();

app.use("/", express.static(path.join(__dirname, '../dist')));
app.use(bodyParser.json({type: '*/*'}));
// app.use(function (request, response, next) {
//     const isSecurePath = securePaths.find(function(pathName){
//         return pathName === request.url.toLowerCase();
//     });
//     if ( isSecurePath && request.protocol === 'http') {
//         response.redirect("https://" + request.hostname + ':3335' + request.url);
//     } else {
//         next();
//     }
// });

app.get('/**', function (req, res) {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

const httpPort = 3334;
const server = http.createServer(app);
server.listen(httpPort);
console.log('Server listening on:', httpPort);

const options = {
   key: fs.readFileSync('/home/pi/certs/cwwServer.key'),
   cert: fs.readFileSync('/home/pi/certs/cwwServer.cert')
};
const httpsPort = 3335;
const secureServer = https.createServer(options, app);
secureServer.listen(httpsPort);
console.log('Secure server listening on:', httpsPort);

