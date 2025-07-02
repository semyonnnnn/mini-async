import { read, utils } from "xlsx";

export async function loadExcelData() {
  const res = await fetch(
    "https://raw.githubusercontent.com/Kanoe99/files/main/stat_calendar_2025.xlsx"
  );
  const buffer = await res.arrayBuffer();
  const workbook = read(buffer, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const csv = utils.sheet_to_csv(workbook.Sheets[sheetName]);
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
}
