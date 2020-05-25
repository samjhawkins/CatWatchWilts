const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const path = require('path');
const fs = require('fs');
const dbNode = require('./db');

require('dotenv').config();

console.log('starting server');
const app = express();

app.use('/', express.static(path.join(__dirname, '../dist')));
app.use(bodyParser.json({ type: '*/*' }));
app.use('/db', dbNode);

app.get('/**', function (req, res) {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

const options = {
  key: fs.readFileSync(process.env.KEY_PATH),
  cert: fs.readFileSync(process.env.CERT_PATH),
};

const httpsPort = 40000;
const secureServer = https.createServer(options, app);
secureServer.listen(httpsPort);
console.log('Secure server listening on:', httpsPort);
