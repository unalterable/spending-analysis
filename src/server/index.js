require('@babel/register')({
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react',
  ],
});

const setupRoutes = require('./routes.js');

const port = 3000;
setupRoutes().then(app => {
  app.listen(port, () => console.log(`App listening on port ${port}`));
});
