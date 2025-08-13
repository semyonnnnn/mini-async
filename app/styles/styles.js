export * from "./date-styles.js";
export * from "./info-styles.js";

const fontFaces = [
  {
    name: "OpenSans",
    file: "Open_Sans/OpenSans-Regular.ttf",
    weight: 400,
    style: "normal",
  },
  {
    name: "OpenSans",
    file: "Open_Sans/OpenSans-Bold.ttf",
    weight: 700,
    style: "normal",
  },
  {
    name: "OpenSans",
    file: "Open_Sans/OpenSans-Black.ttf",
    weight: 900,
    style: "normal",
  },
  {
    name: "OpenSans",
    file: "Open_Sans/OpenSans-Italic.ttf",
    weight: 400,
    style: "italic",
  },
  {
    name: "OpenSans",
    file: "Open_Sans/OpenSans-BoldItalic.ttf",
    weight: 700,
    style: "italic",
  },
  {
    name: "OpenSans",
    file: "Open_Sans/OpenSans-ExtraBold.ttf",
    weight: 800,
    style: "normal",
  },
  {
    name: "OpenSans",
    file: "Open_Sans/OpenSans-SemiBold.ttf",
    weight: 600,
    style: "normal",
  },
  {
    name: "OpenSans",
    file: "Open_Sans/OpenSans-ExtraBoldItalic.ttf",
    weight: 800,
    style: "italic",
  },
  {
    name: "OpenSans",
    file: "Open_Sans/OpenSans-Thin.ttf",
    weight: 100,
    style: "normal",
  },
  {
    name: "OpenSans",
    file: "Open_Sans/OpenSans-ThinItalic.ttf",
    weight: 100,
    style: "italic",
  },
  {
    name: "DelaGothicOne",
    file: "Dela_Gothic_One/DelaGothicOne-Regular.ttf",
    weight: 900,
    style: "normal",
  },
];

const styleTag = document.createElement("style");

styleTag.textContent = fontFaces
  .map(
    ({ name, file, weight, style }) => `
    @font-face {
      font-family: '${name}';
      src: url('/fonts/${file}');
      font-weight: ${weight};
      font-style: ${style};
    }
  `
  )
  .join("\n");

document.head.appendChild(styleTag);
