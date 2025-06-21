import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { LanguageContext } from "../../contexts/LanguageContext";

function Footer() {
  const { theme } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);

  const footerStyle = {
    padding: "15px",
    textAlign: "center",
    background: "#444",
    color: "white",
    borderInline: `1px solid ${theme === "dark" ? "#444" : "#ccc"}`,
    // marginTop: "20px",
  };

  return (
    <footer style={footerStyle}>
      <p>{t.footerText}</p>
    </footer>
  );
}

export default Footer;
