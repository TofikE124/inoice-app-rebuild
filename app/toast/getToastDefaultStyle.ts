export const getToastDefaultStyle = (theme?: string) => {
  return {
    backgroundColor: theme == "light" ? "white" : "#252945",
    color: theme == "light" ? "black" : "white",
  };
};
