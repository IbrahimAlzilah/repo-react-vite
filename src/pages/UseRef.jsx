import useMetadata from "../hooks/useMetadata"; // استيراد الـ Custom Hook
import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import PreviousValueDisplay from "../components/examples/PreviousValueDisplay"; // استيراد مكون PreviousValueDisplay
import TimerControl from "../components/examples/TimerControl"; // استيراد مكون TimerControl
import CustomDivider from "../components/ui/CustomDivider";

function UseRefPage() {
  const { t } = useContext(LanguageContext);
  useMetadata(`${t.using} useRef | ${t.appName}`); // تعيين عنوان الصفحة

  return (
    <>
      <CustomDivider title={t.using + " useRef"} />
      <PreviousValueDisplay />
      <TimerControl />
    </>
  );
}
export default UseRefPage;
