import { useState, useContext } from "react";
import useMetadata from "../hooks/useMetadata"; // استيراد الـ Custom Hook
import { LanguageContext } from "../contexts/LanguageContext";
import UserProfile from "../components/UserProfile";
import MouseTracker from "../components/examples/MouseTracker"; // استيراد مكون MouseTracker
import Timer from "../components/Timer";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Divider from "../components/ui/Divider";

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
      <Divider title={t.using + " useEffect"} />
      <Card title="المؤقت">
        <Timer />
      </Card>
      <Card title="متتبع حركة الفأرة" className={"text-center"}>
        <Button
          text={showTracker ? "إخفاء متتبع الفأرة" : "إظهار متتبع الفأرة"}
          className="text-sm"
          onClick={() => setShowTracker(!showTracker)}
        />

        {showTracker && <MouseTracker />}
      </Card>

      <Card title="تطبيق جلب المستخدمين">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Button
            text={`التالي (${currentUserId + 1})`}
            onClick={() => setCurrentUserId((prevId) => prevId + 1)}
          />

          <Button
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
      </Card>
    </>
  );
}

export default UseEffect;
