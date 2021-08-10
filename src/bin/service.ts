const axios = require("axios");
const { serverURL } = require("./const");

export const ruleService = {
  put(id: string, rules: string) {
    axios.put(serverURL, {
      body: {
        id,
        rules,
      },
    });
  },
  delete(id: string) {
    axios.delete(serverURL, {
      params: {
        id,
      },
    });
  },
};
