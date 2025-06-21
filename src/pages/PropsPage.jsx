import { useState, useContext } from "react";
import useMetadata from "../hooks/useMetadata"; // استيراد الـ Custom Hook
import { LanguageContext } from "../contexts/LanguageContext";
import DisplayInfo from "../components/examples/DisplayInfo"; // استيراد مكون DisplayInfo
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Divider from "../components/ui/Divider";

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
      <Divider title={t.using + " props"} />
      <Card title={message} className="text-center">
        <div className="flex items-center justify-center gap-2">
          <Button text="تحية" onClick={changeToGreeting} />
          <Button text="وداع" onClick={changeToFarewell} />
          <Button
            text="إعادة تعيين"
            onClick={() => setMessage("الوضع الافتراضي")}
          />
        </div>
      </Card>

      <Card title="بطاقة المنتج" className="text-center">
        <img className="product-image" src="./cole.webp" alt="منتج" />
        <p className="py-2">
          وصف المنتج هنا. سعر: <b>$29.99</b>
        </p>
        <div className="flex items-center justify-center gap-2">
          <Button text="أضف إلى السلة" color="blue" />
          <Button
            text={`(+) : ${count}`}
            onClick={() => setCount((count) => count + 1)}
          />
          <Button text={`(-) : ${count}`} onClick={decrement} />
        </div>
      </Card>

      <Card className="text-center">
        <h3>بطاقة بدون عنوان</h3>
        <p>هذا مجرد نص.</p>
        <ul>
          <li>عنصر 1</li>
          <li>عنصر 2</li>
        </ul>
      </Card>

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
      {/* <Greeting user={userData} onButtonClick={handleShowDetails} /> */}
    </>
  );
}

export default Props;
