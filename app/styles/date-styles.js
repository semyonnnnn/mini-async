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
  backgroundColor: "black",
  color: "white",
  width: "fit-content",
  userSelect: "none",
  cursor: "pointer",
};
export const yearWrapper = {
  display: "flex",
  gap: "1rem",
  marginBottom: "1rem",
};
export const hiddenYear = {
  ...year,
};

export const displayedYear = {
  ...year,
};
