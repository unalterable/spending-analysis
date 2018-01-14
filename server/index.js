const express = require('express');
const bodyParser = require('body-parser')
const store = require('./store');
const controller = require('./controller');
const app = express();


const port = 3000;
const base = `<html><head><script src="https://cdn.plot.ly/plotly-latest.min.js"></script></head><body><div id="app"></div><script src="./assets/bundle.js"></script></body></html>`;

app.use('/assets', express.static('assets'));

app.get('/', (req, res) => res.send(base))
app.get('/data', controller.data)

app.use(bodyParser.json());
app.post('/transactions', controller.saveTransactions)

app.listen(port, () => console.log(`App listening on port ${port}`));
