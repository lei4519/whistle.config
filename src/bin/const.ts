import storage from "../common/storage";

export const serverURL = `http://127.0.0.1:${storage.port()}/plugin.config/rules`;
export const watchFiles = ["whistle.conf" /*, 'whistle.local.conf'*/];
