const storage = require("./common/storage")

module.exports = (options) => {
  storage.setPort(options.config.port)
}
