export const outerWrapper = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 2fr))",
  gap: "2rem",
  padding: "2rem",
  backgroundColor: "rgb(244, 245, 255)",
};

export const innerWrapper = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
  gap: "1rem",

  minWidth: "10rem",
  width: "100%",
  boxShadow: "0px 0px 7px black",
  // backgroundColor: "rgb(255, 136, 0)",
  padding: "1rem .5rem",
  borderRadius: "10px",

  fontSize: ".8rem",
  fontFamily: "MontserratAlternates",
  fontWeight: 400,
  fontStyle: "normal",
};

export const circleWrapper = {
  boxShadow: "inset 0 -2px 2px rgba(0,0,0,.1)",
  backgroundColor: "white",
  fontSize: "2.9rem",
  width: "4.5rem",
  height: "4.5rem",
  borderRadius: "10px",
  position: "relative",
};

export const circleDigit = {
  position: "absolute",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "rgb(64, 173, 224)",

  fontWeight: 400,
};

export const blueUpper = {
  color: "rgb(112, 64, 224)",
  textWrap: "wrap",

  textAlign: "center",
  fontSize: "1rem",
  fontWeight: 600,
  fontStyle: "normal",
};

export const blackLower = {
  fontWeight: 400,
  color: "rgb(51, 51, 51)",
};

export const list = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
};

export const smallListContainer = {
  boxShadow: "inset 0 -2px 2px rgba(0,0,0,.1)",
  padding: ".4rem 0",
  width: "100%",
  borderRadius: "10px",
  backgroundColor: "rgb(247, 247, 247)",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};
