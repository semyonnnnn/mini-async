import { config } from "./config.js";

export const renderer = {
  log() {
    console.log("im in renderer.js:", config);
  },
};
