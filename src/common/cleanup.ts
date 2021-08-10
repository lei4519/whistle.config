import { noOp } from "./utils";

export function Cleanup(callback: Function) {
  function exitHandler(options: { exit: boolean }) {
    try {
      (callback || noOp)();
    } catch (e) {
      console.log("exitHandler", e);
    }
    if (options.exit) {
      process.exit();
    }
  }

  process.on("cleanup", exitHandler.bind(null));
  //do something when app is closing
  process.on("exit", exitHandler.bind(null));

  //catches ctrl+c event
  process.on("SIGINT", exitHandler.bind(null, { exit: true }));

  // catches "kill pid" (for example: nodemon restart)
  process.on("SIGUSR1", exitHandler.bind(null, { exit: true }));
  process.on("SIGUSR2", exitHandler.bind(null, { exit: true }));
  process.on("SIGTERM", exitHandler.bind(null, { exit: true }));

  //catches uncaught exceptions
  process.on("uncaughtException", exitHandler.bind(null, { exit: true }));
}
