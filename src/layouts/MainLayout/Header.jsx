// Component Imports
import Navigation from "../../components/Navigation"; // This will now use the Router from MainLayout
import LanguageDropdown from "../../components/LanguageDropdown";
import ModeDropdown from "../../components/ModeDropdown";
import UserDropdown from "../../components/UserDropdown";

function Header() {
  return (
    <header className="header shadow-md rounded-b-lg">
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
