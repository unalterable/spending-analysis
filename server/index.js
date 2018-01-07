const express = require('express');
const app = express();
const port = 3000;
const base = `<html><head></head><body><div id="app"></div><script src="./assets/bundle.js"></script></body></html>`;

app.use('/assets', express.static('assets'));

app.get('/', (req, res) => res.send(base))
app.get('/data', (req, res) => res.json({new: 'data'}))

app.listen(port, () => console.log(`App listening on port ${port}`));
