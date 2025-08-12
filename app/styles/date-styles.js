export const monthsOuterWrapper = {
  display: "flex",
  gap: "1rem",
};

export const currentMonth = {
  backgroundColor: "rgb(174, 145, 255)",
  height: "3rem",
  padding: "0 1rem",
  width: "fit-content",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "10px",
  color: "white",
  boxShadow: "inset 0px -4px 4px rgba(100, 44, 255, 0.2)",
  userSelect: "none",
  cursor: "pointer",

  fontSize: ".8rem",
  fontFamily: "MontserratAlternates",
  fontWeight: 600,
  fontStyle: "black",
};

export const monthsInnerWrapper = {
  userSelect: "none",
  display: "flex",
  flexDirection: "column",
  color: "white",
  backgroundColor: "rgb(79, 56, 145)",
  padding: ".5rem 0",
  borderRadius: "10px",

  fontSize: ".8rem",
  fontFamily: "MontserratAlternates",
  fontWeight: 600,
  fontStyle: "black",
  display: "none",
  position: "absolute",
  left: "6rem",
  zIndex: "99",
};

export const month = {
  padding: ".5rem 2rem",
  cursor: "pointer",
  hover: {
    backgroundColor: "red",
  },
};

const year = {
  padding: "2rem 5rem",
  border: "1px solid black",
  color: "#82ffc3",
  width: "fit-content",
  userSelect: "none",
  cursor: "pointer",
  fontSize: "7rem",
  fontWeight: "900",
  transform: "rotate(5deg)",
  position: "absolute",
  backgroundColor: "rgb(255,255,245)",
};
export const yearWrapper = {
  height: "10rem",
  display: "flex",
  gap: "1rem",
  marginBottom: "1rem",
  fontFamily: "MontserratAlternates",
  position: "relative",
};
export const hiddenYear = {
  ...year,
  zIndex: "2",
};

export const displayedYear = {
  ...year,
  zIndex: "3",
};

export const circleWrapper = {
  backgroundColor: "white",
  fontSize: "4rem",
  width: "7rem",
  height: "7rem",
  borderRadius: "1000px",
  position: "relative",
  boxShadow: "0px 7px 10px rgba(0,0,0,.3)",
  zIndex: "3",
};

export const circleDigit = {
  position: "absolute",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#0f81a3",
  fontStyle: "normal",
  fontWeight: 600,
  zIndex: "3",
};
export const horizontalLine = {
  position: "absolute",
  backgroundColor: "white",
  width: "100%",
  height: ".7rem",
  zIndex: "2",
  top: "6rem",
  boxShadow: "0px 5px 5px rgb(50,50,50)",
};
export const verticalLine = {
  position: "absolute",
  backgroundColor: "white",
  width: ".7rem",
  height: "3rem",
  zIndex: "2",
  top: "6rem",
  boxShadow: "0 3px 5px rgb(50,50,50)",
};
