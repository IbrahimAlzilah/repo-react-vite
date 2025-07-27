import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { LanguageContext } from "../../contexts/LanguageContext";
// import UI components
import CustomDivider from "../../components/ui/CustomDivider";
import LanguageDropdown from "../../components/LanguageDropdown";

function AuthLayout() {
  const { mode } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);

  const contentStyle = {
    background: mode === "dark" ? "#1e1e1e" : "#fff",
  };

  return (
    <div className="App min-h-screen flex flex-col justify-center text-center max-w-md mx-auto">
      <main className="auth-content rounded-lg p-5 shadow-md" style={contentStyle}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl">{t?.welcomeAuth || "Welcome"}</h2>
          <LanguageDropdown />
        </div>
        <CustomDivider />
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;
