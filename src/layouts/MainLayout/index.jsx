import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { LanguageContext } from "../../contexts/LanguageContext";

// import UI components
import CustomDivider from "../../components/ui/CustomDivider";

// Import layout parts
import Header from "./Header";
import Footer from "./Footer";

function MainLayout() {
  const { theme } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);

  const contentStyle = {
    backgroundColor: theme === "dark" ? "#1e1e1e" : "white",
  };

  return (
    <div className="App min-h-screen flex flex-col">
      {/* Header will contain the Navigation links */}
      <Header />
      {/* Main content area where different pages will be rendered based on routes */}
      <main className="main-content" style={contentStyle}>
        <div className="mt-3 mb-4">
          <h2 className="text-xl">{t.welcomeMessage}</h2>
          <CustomDivider />
        </div>
        <Outlet />
      </main>
      {/* Footer, if it doesn't need routing, can remain outside the Routes block */}
      <Footer />
    </div>
  );
}

export default MainLayout;
