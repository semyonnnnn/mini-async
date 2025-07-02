import { Renderer } from "./UI/Renderer.js";
import { CMS_BLOCK_ID } from "./utils/key.js";

import { loadExcelData } from "./async.js";

const cms_block = document.getElementById(CMS_BLOCK_ID).parentElement;

new Renderer(cms_block);

loadExcelData().then((data) => {
  console.log("Parsed Excel data:", data);
});
