import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import CustomButton from "./ui/CustomButton";

const ModeDropdown = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <CustomButton
      text={theme}
      onClick={toggleTheme}
      className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
    />
  );
};

export default ModeDropdown;
