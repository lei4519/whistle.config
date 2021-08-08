const storage = require("./lib/storage")

module.exports = (options) => {
  storage.setPort(options.config.port)
}