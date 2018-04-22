
const base = `<html><head></head><body><div id="app"></div><script src="./assets/bundle.js"></script></body></html>`;

module.exports = {
  async showIndex(req, res, next) {
    res.send(base);
  }
  async showData(req, res, next) {
    
  }
}
