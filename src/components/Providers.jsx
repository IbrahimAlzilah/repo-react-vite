import { ThemeProvider } from "../contexts/ThemeContext";
import { LanguageProvider } from "../contexts/LanguageContext";

const Providers = (props) => {
  // Props
  const { children, direction } = props;

  return (
    <ThemeProvider direction={direction}>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
};

export default Providers;
