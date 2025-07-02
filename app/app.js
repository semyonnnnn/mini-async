import { renderer } from "./renderer.js";
import { CMS_BLOCK_ID } from "./utils/key.js";

const cms_block = document.getElementById(CMS_BLOCK_ID).parentElement;

const div = document.createElement("div");
div.textContent = "firstborn";
cms_block.appendChild(div);

renderer.log();
