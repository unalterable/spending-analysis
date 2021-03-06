import express from 'express' ;
import bodyParser from 'body-parser';
import initStore from './store';
import indexController from './controllers/index';
import initTransactionController from './controllers/transaction';
import initRentStringController from './controllers/rent-string';
import { validateUserRoles } from '../server/middleware/index';

const initRoutes = () => {
  const store = initStore();
  store.getConnection();
  const transactionController = initTransactionController(store);
  const rentStringController = initRentStringController(store);

  const app = express();
  app.use(bodyParser.json({ limit: '10mb' }));

  app.use('/spending-analysis/assets', validateUserRoles(['user']), express.static('assets'));

  app.get('/spending-analysis/api/data', validateUserRoles(['user']), transactionController.data);
  app.put('/spending-analysis/api/rent-string', validateUserRoles(['user']), rentStringController.save);
  app.post('/spending-analysis/api/save-transactions', validateUserRoles(['user']), transactionController.saveTransactions);

  app.get('/spending-analysis/*', validateUserRoles(['user']), indexController.showIndex);

  return app;
};

module.exports = initRoutes;

