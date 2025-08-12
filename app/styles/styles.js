export * from "./date-styles.js";
export * from "./info-styles.js";

const fontFaces = [
  {
    name: "MontserratAlternates",
    file: "Montserrat_Alternates/MontserratAlternates-Regular.ttf",
    weight: 400,
    style: "normal",
  },
  {
    name: "MontserratAlternates",
    file: "Montserrat_Alternates/MontserratAlternates-Bold.ttf",
    weight: 700,
    style: "normal",
  },
  {
    name: "MontserratAlternates",
    file: "Montserrat_Alternates/MontserratAlternates-Black.ttf",
    weight: 900,
    style: "normal",
  },
  {
    name: "MontserratAlternates",
    file: "Montserrat_Alternates/MontserratAlternates-Italic.ttf",
    weight: 400,
    style: "italic",
  },
  {
    name: "MontserratAlternates",
    file: "Montserrat_Alternates/MontserratAlternates-BoldItalic.ttf",
    weight: 700,
    style: "italic",
  },
  {
    name: "MontserratAlternates",
    file: "Montserrat_Alternates/MontserratAlternates-ExtraBold.ttf",
    weight: 800,
    style: "normal",
  },
  {
    name: "MontserratAlternates",
    file: "Montserrat_Alternates/MontserratAlternates-ExtraBoldItalic.ttf",
    weight: 800,
    style: "italic",
  },
  {
    name: "MontserratAlternates",
    file: "Montserrat_Alternates/MontserratAlternates-Thin.ttf",
    weight: 100,
    style: "normal",
  },
  {
    name: "MontserratAlternates",
    file: "Montserrat_Alternates/MontserratAlternates-ThinItalic.ttf",
    weight: 100,
    style: "italic",
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
