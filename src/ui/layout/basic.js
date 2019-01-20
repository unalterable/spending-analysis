const html = ({ body, title, initialState, css }) => `
<!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
    </head>
    <body style="margin:0">
      <div id="main-content">${body}</div>
    </body>
    <style id="jss-server-side">${css}</style>
    <script> window.__initialState__ = ${JSON.stringify(initialState)}</script>
    <link rel="stylesheet" href="https://unpkg.com/react-vis/dist/style.css">
    <script src="/assets/bundle.js"></script>
  </html>
`;

export default html;
