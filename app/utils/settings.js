const isDev =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1" ||
  (typeof process !== "undefined" && process.env?.NODE_ENV === "development");

const year = new Date().getFullYear();
const url = isDev
  ? `https://raw.githubusercontent.com/Kanoe99/files/main/stat_calendar_${year}.xlsx`
  : `https://66.rosstat.gov.ru/storage/mediabank/stat_calendar_${year}.xlsx`;

const getXLSX = async () => {
  if (isDev) {
    const { read, utils } = window.XLSX;
    return { read, utils };
  } else {
    const module = await import("xlsx");
    const { read, utils } = module.default || module;
    return { read, utils };
  }
};

export { getXLSX, url, isDev };
