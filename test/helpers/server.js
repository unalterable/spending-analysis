const initRoutes = require('../../src/server/routes');

const initServer = async (serverApp) => {
  let runningServer;

  return {
    start: async () => {
      await new Promise((res) => {
        runningServer = serverApp.listen(res);
      });
    },
    stop: async () => {
      await runningServer.close();
      runningServer = null;
    },
    getDomain: () => `http://localhost:${runningServer.address().port}`,
  };
};

module.exports = async () => {
  const app = await initRoutes();
  return initServer(app);
};
