const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controller');
const app = express();

const port = 3000;
const base = '<html><head></script></head><body><div id="app"></div><script src="./assets/bundle.js"></script></body></html>';

app.use('/assets', express.static('assets'));

app.get('/', (req, res) => res.send(base));
app.get('/importer', (req, res) => res.send(base));
app.get('/data', controller.data);

app.use(bodyParser.json());
app.post('/save-transactions', controller.saveTransactions);

app.listen(port, () => console.log(`App listening on port ${port}`)); // eslint-disable-line no-console
