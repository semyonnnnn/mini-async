import { Renderer } from "./UI/Renderer.js";
import { CMS_BLOCK_ID } from "./utils/key.js";

// Browser-safe environment detection
const isDev =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1" ||
  (typeof process !== "undefined" && process.env?.NODE_ENV === "development");

// Dynamic import handling for xlsx
async function getXLSX() {
  if (isDev) {
    // Check if CDN is loaded, load if not
    if (!window.XLSX) {
      await new Promise((resolve) => {
        const script = document.createElement("script");
        script.src =
          "https://cdn.sheetjs.com/xlsx-0.18.5/package/dist/xlsx.full.min.js";
        script.onload = resolve;
        document.head.appendChild(script);
      });
    }
    return window.XLSX;
  } else {
    return (await import("xlsx")).default;
  }
}

// Modified loadExcelData using dynamic import
export async function loadExcelData() {
  try {
    const XLSX = await getXLSX();

    const res = await fetch(
      "https://raw.githubusercontent.com/Kanoe99/files/main/stat_calendar_2025.xlsx"
    );
    const buffer = await res.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const csv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
    const rows = csv.trim().split("\n");
    const headers = rows.shift().split(",");
    const data = rows.map((row) => {
      const cells = row.split(",");
      return headers.reduce((acc, h, i) => {
        acc[h] = cells[i];
        return acc;
      }, {});
    });
    return data;
  } catch (error) {
    console.error("Error in loadExcelData:", error);
    throw error;
  }
}

// Main application code
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
