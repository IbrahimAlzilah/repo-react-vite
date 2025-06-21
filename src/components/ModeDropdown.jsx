import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import Button from "./ui/Button";

const ModeDropdown = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Button
      text={theme === "dark" ? "Dark" : "Light"}
      onClick={toggleTheme}
      className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
    />
  );
};

export default ModeDropdown;
