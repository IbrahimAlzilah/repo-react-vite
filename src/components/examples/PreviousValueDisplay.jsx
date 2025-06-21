import { useState, useEffect, useRef } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";

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
    <Card title={`العداد: ${count}`} className="text-center">
      <Button onClick={() => setCount(count + 1)}>زيادة العداد</Button>
      <p className="mt-3">القيمة السابقة (المُخزنة): {prevCountRef.current}</p>
    </Card>
  );
}

export default PreviousValueDisplay;
