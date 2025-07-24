import { createContext, useMemo, useState } from 'react';
import { Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from '../theme';

export const ThemeModeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);
  console.log(`theme is: ${mode}`)

  return (
    <ThemeModeContext.Provider value={{ mode, toggleTheme }}>
      <Button variant="contained" onClick={toggleTheme}>
        Toggle {mode === "dark" ? "Light" : "Dark"} Mode
      </Button>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default ThemeContextProvider;
