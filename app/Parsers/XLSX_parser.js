export class XLSX_parser {
  constructor() {
    this.getRawJSON();
    this.JSON_modifier();
    this.log();
  }

  isDev =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    (typeof process !== "undefined" && process.env?.NODE_ENV === "development");

  async CDN_or_Local() {
    if (this.isDev) {
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

  async getRawJSON() {
    const XLSX = await this.CDN_or_Local();
    const url =
      "https://raw.githubusercontent.com/Kanoe99/files/main/stat_calendar_2025.xlsx";
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const headers = json[0];

    function normalize(el) {
      return el.toLowerCase().replace(/ё/g, "е");
    }

    const report_date_index = headers.findIndex((el) =>
      normalize(el).includes("отчетная дата")
    );
    const short_name_index = headers.findIndex((el) =>
      normalize(el).includes("краткое наименование")
    );
    const report_range_index = headers.findIndex((el) =>
      normalize(el).includes("отчетный период")
    );

    const indices_needed = [
      short_name_index,
      report_range_index,
      report_date_index,
    ];

    const min_json = json.map((row) => {
      return row.filter((cell, index) => indices_needed.includes(index));
    });

    const fixed_json = min_json.map((row) => {
      return row.map((cell, index) => {
        if (typeof cell === "string") {
          return cell;
        } else if (index !== 2) {
          return cell.toString();
        } else {
          const excelEpoch = new Date(Date.UTC(1899, 11, 30));
          const msPerDay = 24 * 60 * 60 * 1000;
          const raw_date = new Date(excelEpoch.getTime() + cell * msPerDay);
          return new Intl.DateTimeFormat("ru-RU").format(raw_date);
        }
      });
    });

    return json;
  }

  async JSON_modifier() {
    const raw_json = await this.getRawJSON();
    const raw_content = raw_json.slice(1, raw_json.length - 1);

    const months = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];

    const byMonth = raw_content.map((row) => {
      const dateStr = row[2];
      if (typeof dateStr === "string" && dateStr.includes(".")) {
        return dateStr.split(".")[1];
      } else {
        return "??"; // fallback
      }
    });

    const byMonthCheck = byMonth
      .map((el, index) => ({ el, index }))
      .filter(({ el }) => {
        return el.includes("??");
      })
      .map(({ index }) => "index " + index + " contains `??`");

    return raw_json;
  }

  async log() {
    const result = await this.getRawJSON();
    console.log(result);
  }
}

// function getRussianMonth(dateStr) {
//   const [day, month, year] = dateStr.split(".");
//   const date = new Date(`${year}-${month}-${day}`);
//   const monthName = new Intl.DateTimeFormat("ru-RU", { month: "long" }).format(date);
//   return monthName.charAt(0).toUpperCase() + monthName.slice(1);
// }

// console.log(getRussianMonth("01.07.2025")); // "Июль"
