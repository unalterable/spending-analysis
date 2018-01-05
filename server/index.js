const express = require('express');
const bodyParser = require('body-parser')
const store = require('./store');
const controller = require('./controller');
const app = express();


const port = 3000;
const base = `<html><head></head><body><div id="app"></div><script src="./build/bundle.js"></script></body></html>`;

app.use('/build', express.static('build'));

app.get('/', (req, res) => res.send(base))
app.get('/data', controller.data)

app.use(bodyParser.json());
app.post('/transactions', controller.saveTransactions)

app.listen(port);
