import { useState, useEffect } from "react";
import CustomCard from "./ui/CustomCard";

function metadata(title) {
  document.title = title;
}

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // هذا الـ effect سيُنفذ عند تغيير userId
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true); // ابدأ التحميل
      setError(null); // امسح أي أخطاء سابقة
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err); // تخزين الخطأ
      } finally {
        setLoading(false); // انتهاء التحميل
      }
    };

    fetchUser();
    metadata(`معلومات المستخدم ${userId}`);
  }, [userId]); // يُنفذ هذا الـ effect عندما يتغير 'userId'

  if (loading) {
    return <div>جاري تحميل بيانات المستخدم...</div>;
  }

  if (error) {
    return <div>حدث خطأ: {error.message}</div>;
  }

  if (!user) {
    // في حالة عدم وجود مستخدم بعد التحميل (مثلاً userId غير موجود)
    return <div>لم يتم العثور على المستخدم.</div>;
  }

  return (
    <CustomCard title={`معلومات المستخدم ${userId}`}>
      <p>الاسم: {user.name}</p>
      <p>البريد الإلكتروني: {user.email}</p>
      <p>الهاتف: {user.phone}</p>
    </CustomCard>
  );
}

export default UserProfile;
