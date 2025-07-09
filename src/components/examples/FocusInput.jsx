import { useRef } from "react";
import CustomCard from "../ui/CustomCard";
import CustomButton from "../ui/CustomButton";

function FocusInput() {
  const inputRef = useRef(null); // 1. إنشاء Ref باستخدام useRef

  const handleClick = () => {
    // 2. الوصول إلى عنصر DOM عبر .current
    inputRef.current.focus(); // تركيز على حقل الإدخال
    inputRef.current.style.backgroundColor = "yellow !important"; // تغيير الخلفية
  };

  return (
    <CustomCard title="تركيز على حقل الإدخال" className="text-center">
      {/* 3. ربط الـ ref بالعنصر */}
      <div className="form-group">
        <input type="text" ref={inputRef} />
      </div>
      <CustomButton text="تركيز على حقل الإدخال وتغيير لونه" onClick={handleClick} />
    </CustomCard>
  );
}

export default FocusInput;
