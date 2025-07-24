// import { ThemeProvider } from "../contexts/ThemeContext";
import ThemeContextProvider from '../contexts/ThemeContext';
import { LanguageProvider } from "../contexts/LanguageContext";

const Providers = (props) => {
  // Props
  const { children, direction } = props;

  return (
    <ThemeContextProvider direction={direction}>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeContextProvider>
  );
};

export default Providers;
