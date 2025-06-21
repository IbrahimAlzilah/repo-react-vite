import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { LanguageContext } from "../../contexts/LanguageContext";
// import UI components
import Divider from "../../components/ui/Divider";

// Import all page components
import PropsPage from "../../pages/PropsPage";
import UseStatePage from "../../pages/UseState";
import UseEffectPage from "../../pages/UseEffect";
import UseRefPage from "../../pages/UseRef";
import UseContextPage from "../../pages/UseContext";
import NotFoundPage from "../../pages/NotFound"; // Don't forget 404 page!

function Content() {
  const { theme } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext); // Content لا تحتاج لتغيير اللغة، فقط الترجمة

  const contentStyle = {
    background: theme === "dark" ? "#1e1e1e" : "white",
    color: theme === "dark" ? "#eee" : "#333",
    borderInline: `1px solid ${theme === "dark" ? "#444" : "#ccc"}`,
  };

  return (
    <main className="main-content" style={contentStyle}>
      <div className="mt-3 mb-4">
        <h2 className="text-xl">{t.welcomeMessage}</h2>
        <Divider />
      </div>
      {/* Routes defines the mapping between paths and components */}
      <Routes>
        <Route path="/" element={<PropsPage />} />
        <Route path="/useState" element={<UseStatePage />} />
        <Route path="/useEffect" element={<UseEffectPage />} />
        <Route path="/useRef" element={<UseRefPage />} />
        <Route path="/useContext" element={<UseContextPage />} />
        {/* Catch-all route for any undefined paths (404 Not Found) */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
}

export default Content;

// import { useContext } from "react";
// import { ThemeContext } from "../../contexts/ThemeContext";
// import { LanguageContext } from "../../contexts/LanguageContext";
// // import UI components
// import Divider from "../../components/ui/Divider";

// function Content() {
//   const { theme } = useContext(ThemeContext);
//   const { t } = useContext(LanguageContext); // Content لا تحتاج لتغيير اللغة، فقط الترجمة

//   const contentStyle = {
//     padding: "20px",
//     minHeight: "200px",
//     background: theme === "dark" ? "#1e1e1e" : "white",
//     color: theme === "dark" ? "#eee" : "#333",
//     borderInline: `1px solid ${theme === "dark" ? "#444" : "#ccc"}`,
//     transition: "background-color 0.3s, color 0.3s",
//   };

//   return (
//     <main style={contentStyle}>
//       <div className="mb-4">
//         <h2 className="text-xl">{t.welcomeMessage}</h2>
//         <Divider />
//       </div>
//     </main>
//   );
// }

// export default Content;
