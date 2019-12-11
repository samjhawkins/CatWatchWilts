const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');

console.log('starting server');
const app = express();

app.use("/", express.static(path.join(__dirname, '../dist')));
app.use(bodyParser.json({type: '*/*'}));

app.get('/**', function(req, res) {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

const port = 3334;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:',port);