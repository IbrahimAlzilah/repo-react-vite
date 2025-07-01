import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

// components
import Navigation from "../../components/Navigation"; // This will now use the Router from MainLayout
import LanguageDropdown from "../../components/LanguageDropdown";
import ModeDropdown from "../../components/ModeDropdown";
import UserDropdown from "../../components/UserDropdown";

function Header() {
  const { theme } = useContext(ThemeContext);

  const headerStyle = {
    background: theme === "dark" ? "#222" : "#f9f9f9",
    color: theme === "dark" ? "#eee" : "#333",
    borderColor: theme === "dark" ? "#444" : "#ccc",
  };

  return (
    <header className="header shadow-md rounded-b-lg" style={headerStyle}>
      <Navigation /> {/* Navigation component lives here */}
      <div className="flex items-center gap-2.5">
        <ModeDropdown />
        <LanguageDropdown />
        <UserDropdown />
      </div>
    </header>
  );
}

export default Header;
