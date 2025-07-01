import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
// import MainLayout from "./layouts/MainLayout";

// test Router
// routing
import AppRoutes from "./routes";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        {/* MainLayout will now handle routing */}
        {/* <MainLayout /> */}
        <AppRoutes />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
