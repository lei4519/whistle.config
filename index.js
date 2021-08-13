exports.uiServer = require('./dist/lib/uiServer').default;
exports.rulesServer = require('./dist/lib/rulesServer').default;
require('./dist/common/storage/check').checkProcessAlive()