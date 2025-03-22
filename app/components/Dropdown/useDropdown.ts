import { useContext } from "react";
import { DropdownContext } from "./DropdownRoot";

export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) throw new Error("can't use context outside of Providers");
  return context;
};
