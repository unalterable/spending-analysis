const express = require('express');
const app = express();
const port = 3000;
const base = `<html><head></head><body><div id="canvass"></div><script src="./build/bundle.js"></script></body></html>`;

app.use('/build', express.static('build'));

app.get('/', (req, res) => res.send(base))
app.get('/data', (req, res) => res.json({new: 'data'}))

app.listen(port);
