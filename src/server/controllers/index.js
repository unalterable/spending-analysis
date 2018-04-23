import { renderToString } from 'react-dom/server';
import App from '../../ui/components/Application.jsx';
import html from '../../ui/layout/basic.js';

module.exports = {
  async showIndex(req, res, next) {
    const title = 'Hello World Title';
    const initialState = { text: 'alice' };
    const body = renderToString(App(initialState))
    res.send(html({ title, body, initialState }));
  },
  async showData(req, res, next) {
    res.json({ hello: 'world' })
  }
}
