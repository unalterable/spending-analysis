const initRoutes = require('../../src/server/routes');

const initServer = () => {
  let runningServer;

  return {
    start: async () => {
      if (!runningServer) {
        const app = await initRoutes();
        await new Promise((res) => {
          runningServer = app.listen(res);
        });
      }
    },
    stop: async () => {
      await runningServer.close();
      runningServer = null;
    },
    getDomain: () => `http://localhost:${runningServer.address().port}`,
  };
};

module.exports = initServer();
