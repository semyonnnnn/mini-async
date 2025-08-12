import { Renderer } from "./UI/Renderer.js";
import { CMS_BLOCK_ID } from "./utils/key.js";

document.addEventListener("DOMContentLoaded", async () => {
  const cms_block = document.getElementById(CMS_BLOCK_ID)?.parentElement;

  if (cms_block) {
    Object.assign(cms_block.style, {
      padding: "2rem",
      margin: 0,
      backgroundColor: "#238ca6",
    });
    const renderer = new Renderer(cms_block);
    await renderer.init();
  }
});

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
