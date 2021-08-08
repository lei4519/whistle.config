const storage = require("../storage");

module.exports = (server/* , options */) => {
  server.on('request', (req, res) => {
    res.end(storage.get());
  });
};