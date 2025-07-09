import { useState, useContext } from "react";
import useMetadata from "../hooks/useMetadata"; // استيراد الـ Custom Hook
import { LanguageContext } from "../contexts/LanguageContext";
import DisplayInfo from "../components/examples/DisplayInfo"; // استيراد مكون DisplayInfo
import CustomCard from "../components/ui/CustomCard";
import CustomButton from "../components/ui/CustomButton";
import CustomDivider from "../components/ui/CustomDivider";

function Props() {
  const [active, setActive] = useState(true);
  const [count, setCount] = useState(0);
  const { t } = useContext(LanguageContext);
  useMetadata(`${t.using} Props | ${t.appName}`); // تعيين عنوان الصفحة
  // حالة لتخزين النص الحالي
  const [message, setMessage] = useState("مرحباً بك في تطبيقنا!");

  // دالة لتغيير النص إلى نص جديد
  const changeToGreeting = () => {
    setMessage("أهلاً وسهلاً!");
  };

  // دالة لتغيير النص إلى نص آخر
  const changeToFarewell = () => {
    setMessage("إلى اللقاء قريبًا!");
  };

  const handleResetClick = () => {
    setActive((active) => !active); // عكس الحالة النشطة
    alert("تم استدعاء وظيفة إعادة التعيين من المكون الأب!");
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const itemDetails = {
    description: "مجموعة من العناصر",
    code: "XYZ789",
  };

  return (
    <>
      <CustomDivider title={t.using + " props"} />
      <CustomCard title={message} className="text-center">
        <div className="flex items-center justify-center gap-2">
          <CustomButton text="تحية" onClick={changeToGreeting} />
          <CustomButton text="وداع" onClick={changeToFarewell} />
          <CustomButton
            text="إعادة تعيين" color="var(--danger-color)"
            onClick={() => setMessage("الوضع الافتراضي")}
          />
        </div>
      </CustomCard>

      <CustomCard title="بطاقة المنتج" className="text-center">
        <img className="product-image" src="./cole.webp" alt="منتج" />
        <p className="py-2">
          وصف المنتج هنا. سعر: <b>$29.99</b>
        </p>
        <div className="flex items-center justify-center gap-2">
          <CustomButton text="أضف إلى السلة" color="var(--primary-color)" />
          <CustomButton
            text={`(+) : ${count}`}
            onClick={() => setCount((count) => count + 1)}
          />
          <CustomButton text={`(-) : ${count}`} onClick={decrement} />
        </div>
      </CustomCard>

      <CustomCard className="text-center">
        <h3>بطاقة بدون عنوان</h3>
        <p>هذا مجرد نص.</p>
        <ul>
          <li>عنصر 1</li>
          <li>عنصر 2</li>
        </ul>
      </CustomCard>

      <DisplayInfo
        title="معلومات المنتج"
        value={150} // رقم
        unit="قطعة" // سلسلة نصية
        isActive={active} // منطقي
        details={itemDetails} // كائن
        onReset={handleResetClick} // دالة
      />

      <DisplayInfo
        title="معلومات المستخدم"
        value="غير متاح"
        isActive={active} // منطقي
        // لم يتم تمرير 'details' و 'onReset' هنا، وهما اختياريان
      />
      {/* <Greeting user={userData} onCustomCustomButtonClick={handleShowDetails} /> */}
    </>
  );
}

export default Props;
