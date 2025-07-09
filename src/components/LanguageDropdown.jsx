import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import CustomButton from "./ui/CustomButton";

const LanguageDropdown = () => {
  const { language, changeLanguage } = useContext(LanguageContext);

  return (
    <>
      <CustomButton
        text={language === "en" ? "EN" : "AR"}
        onClick={() => changeLanguage(language === "en" ? "ar" : "en")}
        className="px-3 py-1 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors"
      />
    </>
  );
};

export default LanguageDropdown;
