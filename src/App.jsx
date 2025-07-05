import Providers from "./components/Providers";

// routing
import AppRoutes from "./routes";

const direction = "rtl";

function App() {
  return (
    <Providers direction={direction}>
      <AppRoutes />
    </Providers>
  );
}

export default App;
