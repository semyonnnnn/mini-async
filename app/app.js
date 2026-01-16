import { Renderer } from "./UI/Renderer.js";
import { cms_block, cms_styling } from "./utils/cms_block.js";
import head_contents from "../app/UI/static_templates/head_contents.html"

document.addEventListener("DOMContentLoaded", async () => {
  document.head.innerHTML = head_contents;

  if (cms_block) {
    cms_styling();
    const renderer = new Renderer(cms_block);
    await renderer.init();
  }
});

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
