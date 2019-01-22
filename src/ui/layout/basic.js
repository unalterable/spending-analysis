const html = ({ body, title, initialState, css }) => `
<!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
      <style id="jss-server-side">${css}</style>
      <link rel="stylesheet" href="https://unpkg.com/react-vis/dist/style.css">
    </head>
    <body style="margin:0">
      <div id="main-content">${body}</div>
      <script> window.__initialState__ = ${JSON.stringify(initialState)}</script>
      <script src="/assets/bundle.js"></script>
    </body>
  </html>
`;

export default html;
