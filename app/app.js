import { Renderer } from "./UI/Renderer.js";
import { CMS_BLOCK_ID } from "./utils/key.js";
import { XLSX_parser } from "./Parsers/XLSX_parser.js";

document.addEventListener("DOMContentLoaded", () => {
  const cms_block = document.getElementById(CMS_BLOCK_ID)?.parentElement;

  if (cms_block) {
    new Renderer(cms_block);
    new XLSX_parser();
  }
});
