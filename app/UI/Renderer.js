import { config } from "../config.js";
import * as styles from "../styles/styles.js";

export class Renderer {
  constructor(cms_block) {
    this.set_variables(cms_block);
    this.build();
  }

  set_variables = (cms_block) => {
    this.cms_block = cms_block;
    this.config = config;
  };

  build = () => {
    this.create_DOM(this.cms_block, this.config);
    this.assignStyles();
  };

  create_DOM(parent, config) {
    for (const DOM_key in config) {
      const value = config[DOM_key];
      try {
        const DOM_element = document.createElement(DOM_key);
        if (DOM_element instanceof HTMLUnknownElement) {
          throw new Error(`${DOM_key} is unknown!`);
        }
        parent.appendChild(DOM_element);

        for (const prop in value) {
          if (prop === "children") continue;
          if (prop in DOM_element) {
            DOM_element[prop] = value[prop];
          } else {
            DOM_element.setAttribute(prop, value[prop]);
          }
        }

        parent.appendChild(DOM_element);

        if (value.hasOwnProperty("children")) {
          this.create_DOM(DOM_element, value.children);
        }
      } catch (e) {
        console.error(e.message);
      }
    }
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
