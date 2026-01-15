import { XLSX_parser } from "../Parsers/XLSX_parser.js";
import { assignStyles } from "./assignStyles.js";

export class Renderer {
  constructor(cms_block) {
    this.assignStyles = assignStyles;
    this.cms_block = cms_block;
    this.grandWrapper = document.createElement("div");
    this.grandWrapper.classList.add("print-page");
    this.dateCalendrier = document.createElement("div");

    this.requestedYear = new URLSearchParams(window.location.search).get("y");
    this.requestedMonth = (() => {
      const m = new URLSearchParams(window.location.search).get("m");
      return m !== null && !isNaN(m) ? Number(m) - 1 : null;
    })();

    this.nowYear = new Date().getFullYear();
    this.nowMonth = new Date().getMonth();

    const defaultState = {
      currentMonth: this.requestedMonth ?? this.nowMonth,
      displayedYear: this.requestedYear ?? this.nowYear,
      hiddenYear:
        this.requestedYear !== null
          ? this.requestedYear !== this.nowYear
            ? this.requestedYear + 1
            : this.nowYear - 1
          : this.nowYear - 1,
    };

    this.currentMonthEl = null;
    this.displayedYearEl = null;

    this.state = new Proxy(defaultState, {
      set: async (target, prop, value, receiver) => {
        const updated = Reflect.set(target, prop, value, receiver);

        if (prop === "currentMonth") {
          if (this.parser?.sorted) {
            this.data = this.parser.sorted[value];
          }

          if (this.currentMonthEl) {
            this.currentMonthEl.textContent = this.getMonthNames(value);
          }

          this.build();
        }

        if (prop === "displayedYear") {
          this.parser = new XLSX_parser(value);
          await this.parser.init();
          this.data = this.parser.sorted[this.state.currentMonth];

          if (this.displayedYearEl) {
            this.displayedYearEl.textContent = value;
          }

          this.build();
        }

        return updated;
      },
    });
  }

  async init() {
    this.parser = new XLSX_parser(this.state.displayedYear);
    await this.parser.init();

    this.data = this.parser.sorted[this.state.currentMonth];

    this.build();
    return this;
  }

  build = async () => {
    this.cms_block.innerHTML = "";
    this.grandWrapper.innerHTML = "";
    this.dateCalendrier.innerHTML = "";
    this.create_DOM(this.cms_block);
    this.assignStyles();
  };

  create_DOM(parent) {
    const outerWrapper = document.createElement("div");
    outerWrapper.classList = "outerWrapper";
    if (!Array.isArray(this.data)) {
      console.error(`this.data: ${this.data}`);
      return;
    }
    // this.createPicker(parent);


    const dateCalendrier = document.createElement("div");
    const statCalendrier = document.createElement("div");
    const dateWrapper = document.createElement("div");

    const yearWrapper = document.createElement("div");
    const displayedYear = document.createElement("div");
    const hiddenYear = document.createElement("div");

    const monthsOuterWrapper = document.createElement("div");
    const currentMonth = document.createElement("div");
    const monthsInnerWrapper = document.createElement("div");

    dateWrapper.classList = "dateWrapper";
    statCalendrier.innerText = "СТАТКАЛЕНДАРЬ".toUpperCase();
    this.dateCalendrier.appendChild(dateWrapper);
    this.dateCalendrier.appendChild(statCalendrier);
    dateCalendrier.appendChild(this.dateCalendrier);
    dateCalendrier.appendChild(dateWrapper);
    statCalendrier.classList = "statCalendrier";
    this.dateCalendrier.classList = "dateCalendrier";

    yearWrapper.classList = "yearWrapper";

    monthsOuterWrapper.classList = "monthsOuterWrapper";

    hiddenYear.classList = "hiddenYear";
    this.hiddenYear = hiddenYear;
    hiddenYear.textContent = this.state.hiddenYear;
    displayedYear.classList = "displayedYear";
    this.displayedYearEl = displayedYear;
    displayedYear.textContent = this.state.displayedYear;

    yearWrapper.appendChild(displayedYear);
    yearWrapper.appendChild(hiddenYear);

    displayedYear.addEventListener("click", async () => {
      const newYear = this.state.hiddenYear;
      const temp = this.state.displayedYear;
      this.state.displayedYear = newYear;
      this.state.hiddenYear = temp;
      this.hiddenYear.textContent = temp;
    });

    currentMonth.classList = "currentMonth";
    this.currentMonthEl = currentMonth;

    monthsInnerWrapper.classList = "monthsInnerWrapper";

    for (let i = 0; i < 12; i++) {
      const month = document.createElement("div");
      month.textContent = this.getMonthNames(i);
      month.className = "month";
      monthsInnerWrapper.appendChild(month);

      month.addEventListener("click", () => {
        monthsInnerWrapper.style.display = "none";
        this.state.currentMonth = i;
      });
    }

    currentMonth.textContent = this.getMonthNames(this.state.currentMonth);

    currentMonth.addEventListener("click", () => {
      const style = monthsInnerWrapper.style;
      style.display = style.display === "none" ? "block" : "none";
    });

    monthsOuterWrapper.appendChild(currentMonth);
    monthsOuterWrapper.appendChild(monthsInnerWrapper);
    dateWrapper.appendChild(monthsOuterWrapper);
    dateWrapper.appendChild(yearWrapper);
    this.dateCalendrier.appendChild(dateWrapper);

    this.grandWrapper.appendChild(this.dateCalendrier);


    this.data.forEach((date, index) => {
      const innerWrapper = document.createElement("div");
      const circleDigit = document.createElement("div");
      const list = document.createElement("div");
      const circleWrapper = document.createElement("div");
      const horizontalLine = document.createElement("div");
      const verticalLine = document.createElement("div");

      this.grandWrapper.classList = "grandWrapper";

      circleDigit.classList = "circleDigit";
      circleDigit.textContent = index + 1;
      circleWrapper.classList = "circleWrapper";

      horizontalLine.classList = "horizontalLine";
      innerWrapper.appendChild(horizontalLine);
      verticalLine.classList = "verticalLine";
      innerWrapper.appendChild(verticalLine);

      list.classList = "list";

      innerWrapper.classList = "innerWrapper";

      date.forEach((item) => {
        const blueUpper = document.createElement("div");
        const blackLower = document.createElement("div");

        const smallListContainer = document.createElement("div");

        blueUpper.textContent = item[0];
        blackLower.textContent = item[1];

        blueUpper.classList = "blueUpper";
        blackLower.classList = "blackLower";

        smallListContainer.classList = "smallListContainer";
        smallListContainer.appendChild(blueUpper);
        smallListContainer.appendChild(blackLower);

        list.appendChild(smallListContainer);
      });

      circleWrapper.appendChild(circleDigit);
      innerWrapper.appendChild(circleWrapper);
      innerWrapper.appendChild(list);
      outerWrapper.appendChild(innerWrapper);
    });

    this.grandWrapper.appendChild(outerWrapper);
    const info = document.createElement("div");
    info.classList = "info";

    const qr = document.createElement("img");
    qr.src = "https://66.rosstat.gov.ru/storage/mediabank/qr-code.svg";
    qr.classList = "qr";

    const link = document.createElement("a");
    link.href = 'https://websbor.rosstat.gov.ru/online/info';
    link.classList = "link";
    link.textContent = "получить индивидуальный перечень форм".toUpperCase();

    info.appendChild(link);
    info.appendChild(qr);
    this.grandWrapper.prepend(info);

    parent.appendChild(this.grandWrapper);
  }

  getMonthNames(monthIndex) {
    const date = new Date(this.state.displayedYear, monthIndex);
    const raw_month = new Intl.DateTimeFormat("ru-RU", {
      month: "long",
    }).format(date);

    const month = raw_month[0].toUpperCase() + raw_month.slice(1);
    return month;
  }



  autoFitA4() {
    const page = this.grandWrapper;
    const A4_HEIGHT = 1122; // px @96dpi minus margins
    const scale = Math.min(A4_HEIGHT / page.scrollHeight, 1);
    page.style.zoom = scale;
  }

}
