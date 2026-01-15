import * as styles from "../styles/styles.js";

export const assignStyles = () => {
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