import { Renderer } from "./UI/Renderer.js";
import { CMS_BLOCK_ID } from "./utils/key.js";
import { loadExcelData } from "./async.js";

document.addEventListener("DOMContentLoaded", () => {
  const cms_block = document.getElementById(CMS_BLOCK_ID)?.parentElement;

  if (cms_block) {
    new Renderer(cms_block);

    loadExcelData()
      .then((data) => {
        console.log("Parsed Excel data:", data);
      })
      .catch((error) => {
        console.error("Error loading Excel data:", error);
      });
  } else {
    console.warn(`Element with ID ${CMS_BLOCK_ID} not found`);
  }
});
