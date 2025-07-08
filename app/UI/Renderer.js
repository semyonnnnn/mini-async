import * as styles from "../styles/styles.js";
import { XLSX_parser } from "../Parsers/XLSX_parser.js";

export class Renderer {
  constructor(cms_block, month) {
    this.cms_block = cms_block;
    this.month = month;
    this.data = null;
  }

  async init() {
    const parser = new XLSX_parser();
    await parser.init();
    this.data = parser.sorted[this.month];

    console.log(this.data);

    this.build();
    return this;
  }

  build = async () => {
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

        blueUpper.textContent = item[0];
        blackLower.textContent = item[1];

        blueUpper.classList = "blueUpper";
        blackLower.classList = "blackLower";

        list.appendChild(blueUpper);
        list.appendChild(blackLower);
      });

      circleWrapper.appendChild(circleDigit);
      innerWrapper.appendChild(circleWrapper);
      innerWrapper.appendChild(list);
      outerWrapper.appendChild(innerWrapper);
    });
    parent.appendChild(outerWrapper);
  }

  assignStyles = () => {
    for (const style in styles) {
      const elements = document.querySelectorAll(`.${style}`);
      elements.forEach((element) => {
        Object.assign(element.style, styles[style]);
      });
    }
  };
}
