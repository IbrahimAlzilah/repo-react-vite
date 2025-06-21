import { Link } from "react-router-dom";
import useMetadata from "../hooks/useMetadata"; // استيراد الـ Custom Hook
import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

import Card from "../components/ui/Card";

function NotFoundPage() {
  const { t } = useContext(LanguageContext);
  useMetadata(`404 - Page Not Found | ${t.appName}`); // تعيين عنوان الصفحة

  return (
    <Card className="text-center page-content">
      <h2 className="text-4xl font-bold mb-4 text-gray-800">
        404 - لم يتم العثور على الصفحة
      </h2>
      <p className="text-gray-600">عذرًا، الصفحة التي تبحث عنها غير موجودة.</p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:underline mt-4 inline-block"
      >
        العودة إلى الرئيسية
      </Link>
    </Card>
  );
}
export default NotFoundPage;
