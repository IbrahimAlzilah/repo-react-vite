// import { useState, useEffect } from "react";

// function Timer() {
//   const [seconds, setSeconds] = useState(0);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setSeconds((prevSeconds) => prevSeconds + 1);
//     }, 1000); // زيادة العداد كل ثانية

//     console.log("بدء المؤقت.");

//     // دالة التنظيف: مسح المؤقت لمنع تسرب الذاكرة
//     return () => {
//       clearInterval(intervalId);
//       console.log("إيقاف المؤقت.");
//     };
//   }, []); // مصفوفة تبعيات فارغة: لضمان بدء وإيقاف المؤقت مرة واحدة فقط

//   return (
//     <div className="p-3 m-3 border-dashed border-2 rounded-xl border-orange-500">
//       <h2>المؤقت: {seconds} ثانية</h2>
//     </div>
//   );
// }

// export default Timer;
// ==============================================================================
import { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState("00:00:00");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => {
        const [h, m, s] = prevSeconds.split(":").map(Number);
        let newH = h, newM = m, newS = s;
        if (s < 59) {
          newS = s + 1;
        } else if (m < 59) {
          newM = m + 1;
          newS = 0;
        } else {
          newH = h + 1;
          newM = 0;
          newS = 0;
        }
        const pad = (num) => String(num).padStart(2, "0");
        return `${pad(newH)}:${pad(newM)}:${pad(newS)}`;
      });
    }, 1000); // زيادة العداد كل ثانية

    console.log("بدء المؤقت.");

    // دالة التنظيف: مسح المؤقت لمنع تسرب الذاكرة
    return () => {
      clearInterval(intervalId);
      console.log("إيقاف المؤقت.");
    };
  }, []); // مصفوفة تبعيات فارغة: لضمان بدء وإيقاف المؤقت مرة واحدة فقط

  return (
    <div className="p-3 m-3 border-dashed border-2 text-center font-medium rounded-xl border-orange-500">
      <h2>المؤقت: {seconds}</h2>
    </div>
  );
}

export default Timer;
