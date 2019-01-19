import express from 'express' ;
import bodyParser from 'body-parser';
import initStore from './store';
import indexController from './controllers/index';
import initTransactionController from './controllers/transaction';

const initRoutes = () => {
  const store = initStore();
  store.getConnection();
  const transactionController = initTransactionController(store);

  const app = express();
  app.use(bodyParser.json());

  app.use('/assets', express.static('assets'));

  app.get('/api/data', transactionController.data);
  app.post('/api/save-transactions', transactionController.saveTransactions);

  app.get('/*', indexController.showIndex);

  return app;
};

module.exports = initRoutes;

