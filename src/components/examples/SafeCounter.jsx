import { useState } from "react";
import CustomCard from "../ui/CustomCard";
import CustomButton from "../ui/CustomButton";

function SafeCounter() {
  const [count, setCount] = useState(0);

  const incrementByOne = () => {
    // الطريقة الأكثر أمانًا لتحديث الحالة بناءً على القيمة السابقة
    setCount((prevCount) => prevCount + 1);
  };

  const incrementByFive = () => {
    // إذا استدعيت setCount عدة مرات في نفس التنفيذ،
    // فإن استخدام الدالة يضمن أن كل استدعاء يعمل على القيمة الصحيحة السابقة.
    setCount((prevCount) => prevCount + 1); // prevCount سيكون 0
    setCount((prevCount) => prevCount + 1); // prevCount سيكون 1
    setCount((prevCount) => prevCount + 1); // prevCount سيكون 2
    setCount((prevCount) => prevCount + 1); // prevCount سيكون 3
    setCount((prevCount) => prevCount + 1); // prevCount سيكون 4
    // النتيجة النهائية ستكون 5 (وهو الصحيح)
    // لو استخدمت setCount(count + 1) 5 مرات، النتيجة ستكون 1 فقط
    // لأن كل استدعاء سيرى قيمة 'count' الأولية قبل التحديث الأول.
  };

  return (
    <CustomCard title={`العداد الآمن: ${count}`}>
      <div className="flex items-center justify-center gap-2">
        <CustomButton text="زيادة بـ 1" onClick={incrementByOne} className="text-gray-100 dark:text-gray-400e" />
        <CustomButton text="زيادة بـ 5 (بشكل آمن)" onClick={incrementByFive} className="text-gray-100 dark:text-gray-400e" />
      </div>
    </CustomCard>
  );
}

export default SafeCounter;
