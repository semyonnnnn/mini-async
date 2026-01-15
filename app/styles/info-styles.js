export const grandWrapper = {
  padding: "0rem",
  // backgroundColor: "rgba(255, 245, 255, .1)",
  backgroundImage:
    "url('https://66.rosstat.gov.ru/storage/mediabank/tile.png')",
  backgroundRepeat: "repeat",

  borderRadius: "2rem",
};

export const outerWrapper = {
  display: "flex",
  // gridTemplateColumns: "repeat(auto-fit, minmax(12rem, 2fr))",
  flexWrap: 'wrap',
  gap: "1rem",
  justifyContent: 'center',
  padding: "2rem 1rem",
  overflow: "hidden",
};

export const innerWrapper = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
  gap: "1rem",

  minWidth: "10rem",
  width: "fit-content",
  padding: "1rem .5rem",
  borderRadius: "10px",

  fontSize: ".8rem",
  fontFamily: "Open Sans",
  fontWeight: 400,
  fontStyle: "normal",
  position: "relative",
  justifyItems: 'stretch'
};

export const blueUpper = {
  color: "#0f81a3",
  textWrap: "wrap",
  fontSize: "1.1rem",
  fontWeight: 400,
  fontStyle: "normal",
  textAlign: 'center',
  width: '12rem',
  maxWidth: 'fit-content'
};

export const blackLower = {
  fontWeight: 400,
  fontSize: "1.2rem",
  color: "rgb(51, 51, 51)",
};

export const list = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "top",
  alignItems: "center",
  gap: ".3rem",
  backgroundColor: "white",
  padding: ".5rem",
  boxShadow: "3px 7px 7px rgba(0,0,0,.5)",
  zIndex: "3",
  maxHeight: "33rem",
  flexWrap: 'wrap',
};

export const smallListContainer = {
  padding: ".4rem 0",
  width: "fit-content",
  borderRadius: "10px",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

export const info = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "2rem 5rem",
};
export const link = {
  color: "white",
  backgroundColor: "#22608a",
  fontFamily: "Open Sans",
  width: "17rem",
  padding: "2rem",
  fontWeight: 600,
  display: "grid",
  placeItems: "center",
  textDecoration: 'none',
};
export const qr = {
  width: "10rem",
  height: "10rem",
};
