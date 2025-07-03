const isDev =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1" ||
  (typeof process !== "undefined" && process.env?.NODE_ENV === "development");

async function CDN_or_Local() {
  if (isDev) {
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

export async function loadExcelData() {
  const XLSX = await CDN_or_Local();
  const url =
    "https://raw.githubusercontent.com/Kanoe99/files/main/stat_calendar_2025.xlsx";
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });

  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const json = XLSX.utils.sheet_to_json(worksheet);

  return json;
}
