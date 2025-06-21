import { Routes, Route } from "react-router-dom";

// project imports
import MainLayout from "../layouts/MainLayout";

// Import all page components
import PropsPage from "../pages/PropsPage";
import UseStatePage from "../pages/UseState";
import UseEffectPage from "../pages/UseEffect";
import UseRefPage from "../pages/UseRef";
import UseContextPage from "../pages/UseContext";
import NotFoundPage from "../pages/NotFound"; // Don't forget 404 page!

const MainRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<PropsPage />} />
        <Route path="/useState" element={<UseStatePage />} />
        <Route path="/useEffect" element={<UseEffectPage />} />
        <Route path="/useRef" element={<UseRefPage />} />
        <Route path="/useContext" element={<UseContextPage />} />
        {/* Catch-all route for any undefined paths (404 Not Found) */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  );
};

export default MainRoutes;
