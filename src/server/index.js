const express = require('express');
const indexController = require('./controllers/index.js')

const app = express();
const port = 3000;

app.use('/assets', express.static('assets'));

app.get('/', indexController.showIndex)

app.listen(port, () => console.log(`App listening on port ${port}`));
