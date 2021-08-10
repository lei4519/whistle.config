const storage = require('../common/storage');

const serverURL = `http://127.0.0.1:${storage.port()}/plugin.config/rules`;
const watchFiles = ['whistle.conf'/*, 'whistle.local.conf'*/];

module.exports = {
  serverURL,
  watchFiles
}
