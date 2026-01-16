import { CMS_BLOCK_ID } from "./key.js";
export const cms_block = document.getElementById(CMS_BLOCK_ID)?.parentElement;
export const cms_styling = () => {
    Object.assign(cms_block.style, {
        padding: "2rem",
        margin: 0,
        backgroundColor: "#238ca6",
    });
}
