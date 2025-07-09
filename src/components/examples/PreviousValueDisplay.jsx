import { useState, useEffect, useRef } from "react";
import CustomCard from "../ui/CustomCard";
import CustomButton from "../ui/CustomButton";

function PreviousValueDisplay() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(0); // لتخزين القيمة السابقة للعداد

  useEffect(() => {
    // هذا الـ effect يُنفذ بعد كل عرض
    // هنا، prevCountRef.current يحتوي على قيمة العداد من العرض السابق
    // count يحتوي على قيمة العداد الحالية
    console.log(
      `القيمة السابقة: ${prevCountRef.current}, القيمة الحالية: ${count}`
    );

    // تحديث قيمة useRef لتكون القيمة الحالية، استعدادًا للعرض التالي
    prevCountRef.current = count;
  }); // لا توجد مصفوفة تبعيات: يُنفذ بعد كل عرض

  return (
    <CustomCard title={`العداد: ${count}`} className="text-center">
      <CustomButton onClick={() => setCount(count + 1)}>زيادة العداد</CustomButton>
      <p className="mt-3">القيمة السابقة (المُخزنة): {prevCountRef.current}</p>
    </CustomCard>
  );
}

export default PreviousValueDisplay;
