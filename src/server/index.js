require('../../babel');
const setupRoutes = require('./routes.js');

const port = 3000;

setupRoutes().then(app => {
  app.listen(port, () => console.log(`App listening on port ${port}`));
});
