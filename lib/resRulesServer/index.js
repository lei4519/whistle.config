const storage = require("../../common/storage");

module.exports = (server/* , options */) => {
  server.on('request', (req, res) => {
    const rules = storage.getTextRules()
    res.end(rules);
  });
};
