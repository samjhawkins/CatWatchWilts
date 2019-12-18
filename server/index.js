const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const https = require('https');
const path = require('path');
const fs = require('fs');

console.log('starting server');
const app = express();

app.use("/", express.static(path.join(__dirname, '../dist')));
app.use(bodyParser.json({type: '*/*'}));

app.get('/**', function(req, res) {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

const httpPort = 3334;
const server = http.createServer(app);
server.listen(httpPort);
console.log('Server listening on:',httpPort);

const cert = {
//    key: fs.readFileSync('/pi/home/certs/key.pem'),
    cert: fs.readFileSync('/pi/home/certs/LocalCA.pem')
};
const httpsPort = 3335;
const secureServer = https.createServer(cert, app);
secureServer.listen(httpsPort);
console.log('Secure server listening on:',httpsPort);