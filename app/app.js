import { Renderer } from "./UI/Renderer.js";
import { CMS_BLOCK_ID } from "./utils/key.js";

document.addEventListener("DOMContentLoaded", async () => {
  const cms_block = document.getElementById(CMS_BLOCK_ID)?.parentElement;

  const head = document.head;

  // 1st link
  const preconnect1 = document.createElement("link");
  preconnect1.rel = "preconnect";
  preconnect1.href = "https://fonts.googleapis.com";
  head.appendChild(preconnect1);

  // 2nd link
  const preconnect2 = document.createElement("link");
  preconnect2.rel = "preconnect";
  preconnect2.href = "https://fonts.gstatic.com";
  preconnect2.crossOrigin = ""; // same as crossorigin attribute
  head.appendChild(preconnect2);

  // 3rd link
  const fontStyles = document.createElement("link");
  fontStyles.rel = "stylesheet";
  fontStyles.href =
    "https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap";
  head.appendChild(fontStyles);

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
