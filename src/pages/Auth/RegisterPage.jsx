import { useState } from "react";
import { NavLink } from "react-router-dom";
import useMetadata from "../../hooks/useMetadata";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Divider from "../../components/ui/Divider";

const RegisterPage = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  useMetadata("إنشاء حساب | ${t.appName}");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password) {
      setError("جميع الحقول مطلوبة");
      return;
    }
    // Handle registration logic here
    alert("تم إنشاء الحساب بنجاح!");
  };

  return (
    <Card title="إنشاء حساب" className="text-center">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          name="username"
          placeholder="اسم المستخدم"
          value={form.username}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="البريد الإلكتروني"
          value={form.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="كلمة المرور"
          value={form.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
        {error && <small className="text-red-500">{error}</small>}
        <Button type="submit" className="w-full">
          إنشاء حساب
        </Button>
      </form>
      <Divider />
      <NavLink to="/login" className="text-blue-600 text-sm hover:underline">
        لديك حساب بالفعل؟ تسجيل الدخول
      </NavLink>
    </Card>
  );
};

export default RegisterPage;
