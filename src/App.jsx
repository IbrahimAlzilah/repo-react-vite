import Providers from "./components/Providers";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";

// routing
import AppRoutes from "./routes";

const direction = "rtl";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Providers direction={direction}>
        <AppRoutes />
      </Providers>
    </ThemeProvider>
  );
}

export default App;
