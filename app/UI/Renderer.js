// Renderer.js
import * as styles from "../styles/styles.js";
import { XLSX_parser } from "../Parsers/XLSX_parser.js";

export class Renderer {
  constructor(cms_block) {
    this.cms_block = cms_block;

    this.requestedYear = new URLSearchParams(window.location.search).get("y");
    this.requestedMonth =
      new URLSearchParams(window.location.search).get("m") - 1;
    this.nowYear = new Date().getFullYear();
    this.nowMonth = new Date().getMonth();

    const defaultState = {
      currentMonth: this.requestedMonth ?? this.nowMonth,
      displayedYear: this.requestedYear ?? this.nowYear,
      hiddenYear:
        this.requestedYear != this.nowYear
          ? this.nowYear + 1
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

    this.data = null;
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
    this.create_DOM(this.cms_block);
    this.assignStyles();
  };

  create_DOM(parent) {
    const outerWrapper = document.createElement("div");
    outerWrapper.classList = "outerWrapper";

    this.data.forEach((date, index) => {
      const innerWrapper = document.createElement("div");
      const circleDigit = document.createElement("div");
      const list = document.createElement("div");
      const circleWrapper = document.createElement("div");

      circleDigit.classList = "circleDigit";
      circleDigit.textContent = index + 1;
      circleWrapper.classList = "circleWrapper";

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

    this.createPicker(parent);
    parent.appendChild(outerWrapper);
  }

  getMonthNames(monthIndex) {
    const date = new Date(this.state.displayedYear, monthIndex);
    const raw_month = new Intl.DateTimeFormat("ru-RU", {
      month: "long",
    }).format(date);

    const month = raw_month[0].toUpperCase() + raw_month.slice(1);
    return month;
  }

  createPicker(parent) {
    const dateWrapper = document.createElement("div");

    const yearWrapper = document.createElement("div");
    const displayedYear = document.createElement("div");
    const hiddenYear = document.createElement("div");

    const monthsOuterWrapper = document.createElement("div");
    const currentMonth = document.createElement("div");
    const monthsInnerWrapper = document.createElement("div");

    dateWrapper.classList = "dateWrapper";

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
    parent.appendChild(yearWrapper);
    parent.appendChild(dateWrapper);
  }

  assignStyles = () => {
    for (const className in styles) {
      const baseStyle = styles[className];
      const hoverStyle = baseStyle.hover;

      const { hover, ...staticStyle } = baseStyle;

      const elements = document.querySelectorAll(`.${className}`);
      elements.forEach((element) => {
        Object.assign(element.style, staticStyle);

        if (hoverStyle) {
          element.addEventListener("mouseenter", () => {
            Object.assign(element.style, hoverStyle);
          });

          element.addEventListener("mouseleave", () => {
            for (const prop in hoverStyle) {
              element.style[prop] = "";
            }
            Object.assign(element.style, staticStyle);
          });
        }
      });
    }
  };
}
