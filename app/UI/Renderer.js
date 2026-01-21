import { XLSX_parser } from "../Parsers/XLSX_parser.js";
import { assignStyles } from "./assignStyles.js";

export class Renderer {
  constructor(cms_block) {
    this.assignStyles = assignStyles;
    this.cms_block = cms_block;
    this.grandWrapper = this.create.div(['grandWrapper', 'print-page']);
    this.dateCalendrier = this.create.div('dateCalendrier');

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
    const outerWrapper = this.create.div('outerWrapper');
    if (!Array.isArray(this.data)) {
      console.error(`this.data: ${this.data}`);
      return;
    }

    const statCalendrier = this.create.div('statCalendrier');
    statCalendrier.innerText = "СТАТКАЛЕНДАРЬ".toUpperCase();

    const dateWrapper = this.create.div('dateWrapper');

    const yearWrapper = this.create.div('yearWrapper');
    const displayedYear = this.create.div('displayedYear');
    const hiddenYear = this.create.div('hiddenYear')

    const monthsOuterWrapper = this.create.div('monthsOuterWrapper');

    const currentMonth = this.create.div('currentMonth');
    const monthsInnerWrapper = this.create.div('monthsInnerWrapper');

    this.dateCalendrier.appendChild(dateWrapper);
    this.dateCalendrier.appendChild(statCalendrier);


    hiddenYear.textContent = this.state.hiddenYear;
    this.displayedYearEl = displayedYear;
    displayedYear.textContent = this.state.displayedYear;

    yearWrapper.appendChild(displayedYear);
    yearWrapper.appendChild(hiddenYear);

    displayedYear.addEventListener("click", async () => {
      const newYear = this.state.hiddenYear;
      const temp = this.state.displayedYear;
      this.state.displayedYear = newYear;
      this.state.hiddenYear = temp;
      hiddenYear.textContent = temp;
    });

    this.currentMonthEl = currentMonth;

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
      const innerWrapper = this.create.div('innerWrapper');
      const circleDigit = this.create.div('circleDigit');
      const list = this.create.div('list');
      const circleWrapper = this.create.div('circleWrapper');
      const horizontalLine = this.create.div('horizontalLine');
      const verticalLine = this.create.div('verticalLine')



      circleDigit.textContent = index + 1;
      innerWrapper.appendChild(horizontalLine);
      innerWrapper.appendChild(verticalLine);



      date.forEach((item) => {
        const blueUpper = this.create.div('blueUpper', {
          textContent: item[0]
        });
        const blackLower = this.create.div('blackLower', {
          textContent: item[1]
        });
        const smallListContainer = this.create.div('smallListContainer');

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
    const info = this.create.div('info');

    const qr = this.create.img('qr', { src: "https://66.rosstat.gov.ru/storage/mediabank/qr-code.svg" });

    const link = this.create.link('link', {
      href: 'https://websbor.rosstat.gov.ru/online/info',
      textContent: "получить индивидуальный перечень форм".toUpperCase()
    });

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

  #create_with_class = (html, classes) => {
    const el = document.createElement(html);
    if (Array.isArray(classes)) el.classList.add(...classes);
    else el.classList.add(classes);
    return el;
  };

  create = Object.freeze({
    div: (classes, attrs) => Object.assign(this.#create_with_class('div', classes), attrs),
    img: (classes, attrs) => Object.assign(this.#create_with_class('img', classes), attrs),
    span: (classes, attrs) => Object.assign(this.#create_with_class('span', classes), attrs),
    link: (classes, attrs) => Object.assign(this.#create_with_class('a', classes), attrs),
  });






  autoFitA4() {
    const page = this.grandWrapper;
    const A4_HEIGHT = 1122; // px @96dpi minus margins
    const scale = Math.min(A4_HEIGHT / page.scrollHeight, 1);
    page.style.zoom = scale;
  }

}
