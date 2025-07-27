// src/theme/index.js
import { createTheme } from "@mui/material/styles";
import overrides from './overrides';

const colorSchemes = {
  light: {
    palette: {
      mode: "light",
      primary: { main: "#1976d2" },
      background: {
        default: "#f5f5f5",
        paper: "#ffffff",
      },
      text: {
        primary: '#333',
      },
    },
  },
  dark: {
    palette: {
      mode: "dark",
      primary: { main: "#90caf9" },
      background: {
        default: "#121212",
        paper: "#1e1e1e",
      },
      text: {
        primary: '#fff',
      },
    },
  },
}

export const theme = createTheme({
  colorSchemes,
  components: overrides('light'),
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: '#333',
    },
  },
  components: overrides('light'),
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: '#fff',
    },
  },
  components: overrides('dark'),
});
