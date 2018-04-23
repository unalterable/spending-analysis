import express from 'express' ;
import indexController from './controllers/index.js';

const app = express();
const port = 3000;

app.use('/assets', express.static('assets'));

app.get('/', indexController.showIndex)
app.get('/data', indexController.showData)

app.listen(port, () => console.log(`App listening on port ${port}`));
