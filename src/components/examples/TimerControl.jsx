import { useState, useEffect, useRef } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";

function TimerControl() {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null); // لتخزين معرف الـ interval

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      // دالة التنظيف: التأكد من مسح المؤقت عند إزالة المكون أو تغيير isRunning
      clearInterval(intervalRef.current);
    };
  }, [isRunning]); // يُنفذ عندما تتغير قيمة isRunning

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setSeconds(0);
    setIsRunning(false); // سيؤدي إلى مسح المؤقت الحالي
  };

  return (
    <Card title={`العداد: ${seconds} ثانية`} className="text-center">
      <div className="flex items-center justify-center gap-2">
        <Button text="بدء" onClick={startTimer} disabled={isRunning} />
        <Button text="إيقاف" onClick={stopTimer} disabled={!isRunning} />
        <Button text="إعادة تعيين" onClick={resetTimer} />
      </div>
    </Card>
  );
}

export default TimerControl;
