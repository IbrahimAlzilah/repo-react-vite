import { useEffect } from "react";

function useMetadata(title) {
  useEffect(() => {
    const previousTitle = document.title; // حفظ العنوان الأصلي قبل التغيير

    // تعيين العنوان الجديد
    document.title = title || "${t.appName}"; // إذا لم يتم تمرير عنوان، استخدم "${t.appName}" كعنوان افتراضي

    // دالة التنظيف: تُنفذ عند إزالة المكون (unmount)
    // أو قبل إعادة تنفيذ الـ effect في حال تغيير التبعيات
    return () => {
      document.title = previousTitle; // إعادة العنوان الأصلي عند مغادرة الصفحة
    };
  }, [title]); // يُنفذ الـ effect فقط عندما تتغير قيمة 'title'
}

export default useMetadata;
