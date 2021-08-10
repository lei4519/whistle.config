const axios = require('axios')
const {serverURL} = require('./const')

module.exports = {
  put(id, rules) {
    axios.put(serverURL, {
      body: {
        id,
        rules,
      },
    });
  },
  delete(id) {
    axios.delete(serverURL, {
      params: {
        id,
      },
    });
  }
}
