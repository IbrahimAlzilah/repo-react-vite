import { useState, useContext } from "react";
import useMetadata from "../hooks/useMetadata"; // استيراد الـ Custom Hook
import { LanguageContext } from "../contexts/LanguageContext";
import UserProfile from "../components/UserProfile";
import MouseTracker from "../components/examples/MouseTracker"; // استيراد مكون MouseTracker
import Timer from "../components/Timer";
import CustomCard from "../components/ui/CustomCard";
import CustomButton from "../components/ui/CustomButton";
import CustomDivider from "../components/ui/CustomDivider";

function UseEffect() {
  // Sate
  const [currentUserId, setCurrentUserId] = useState(1);
  const [showTracker, setShowTracker] = useState(false);
  // Context
  const { t } = useContext(LanguageContext);
  // استخدام الـ Custom Hook
  useMetadata(`${t.using} useEffect | ${t.appName}`); // تعيين عنوان الصفحة

  return (
    <>
      <CustomDivider title={t.using + " useEffect"} />
      <CustomCard title="المؤقت">
        <Timer />
      </CustomCard>
      <CustomCard title="متتبع حركة الفأرة" className={"text-center"}>
        <CustomButton
          text={showTracker ? "إخفاء متتبع الفأرة" : "إظهار متتبع الفأرة"}
          className="text-sm"
          onClick={() => setShowTracker(!showTracker)}
        />

        {showTracker && <MouseTracker />}
      </CustomCard>

      <CustomCard title="تطبيق جلب المستخدمين">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CustomButton
            text={`التالي (${currentUserId + 1})`}
            onClick={() => setCurrentUserId((prevId) => prevId + 1)}
          />

          <CustomButton
            text={`السابق (${currentUserId - 1})`}
            className={`${
              currentUserId === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() =>
              setCurrentUserId((prevId) => Math.max(1, prevId - 1))
            }
          />
        </div>
        <UserProfile userId={currentUserId} />
      </CustomCard>
    </>
  );
}

export default UseEffect;
