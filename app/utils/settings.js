const isDev =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1" ||
  (typeof process !== "undefined" && process.env?.NODE_ENV === "development");

const year = new Date().getFullYear();
const url = isDev
  ? `https://raw.githubusercontent.com/Kanoe99/files/main/stat_calendar_${year}.xlsx`
  : `https://66.rosstat.gov.ru/storage/mediabank/stat_calendar_${year}.xlsx`;

const XLSX = async () => {
  if (isDev) {
    if (!window.XLSX) {
      await new Promise((resolve) => {
        const script = document.createElement("script");
        script.src =
          "https://cdn.sheetjs.com/xlsx-0.18.5/package/dist/full.min.js";
        script.onload = resolve;
        document.head.appendChild(script);
      });
    }
    return window.XLSX;
  } else {
    const module = await import("xlsx");
    return module.default || module;
  }
};

export { XLSX, url, isDev };
