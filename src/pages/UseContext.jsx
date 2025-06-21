import { useContext } from "react";
import useMetadata from "../hooks/useMetadata"; // استيراد الـ Custom Hook
import { LanguageContext } from "../contexts/LanguageContext";
import FocusInput from "../components/examples/FocusInput"; // استيراد مكون FocusInput
import Divider from "../components/ui/Divider";

function UseContextPage() {
  const { t } = useContext(LanguageContext);
  // استخدام useMetadata لتعيين عنوان الصفحة
  useMetadata(`${t.using} useContext | ${t.appName}`); // تعيين عنوان الصفحة

  return (
    <>
      <Divider title={t.using + " useContext"} />
      <FocusInput />
    </>
  );
}
export default UseContextPage;
