import { useRef } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";

function FocusInput() {
  const inputRef = useRef(null); // 1. إنشاء Ref باستخدام useRef

  const handleClick = () => {
    // 2. الوصول إلى عنصر DOM عبر .current
    inputRef.current.focus(); // تركيز على حقل الإدخال
    inputRef.current.style.backgroundColor = "yellow !important"; // تغيير الخلفية
  };

  return (
    <Card title="تركيز على حقل الإدخال" className="text-center">
      {/* 3. ربط الـ ref بالعنصر */}
      <div className="form-group">
        <input type="text" ref={inputRef} />
      </div>
      <Button text="تركيز على حقل الإدخال وتغيير لونه" onClick={handleClick} />
    </Card>
  );
}

export default FocusInput;
