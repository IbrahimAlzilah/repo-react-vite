import { useState } from "react";
import { NavLink } from "react-router-dom";
import useMetadata from "../../hooks/useMetadata";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Divider from "../../components/ui/Divider";

const LoginPage = () => {
  // State for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  useMetadata("تسجيل الدخول | ${t.appName}");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    // Simple validation
    if (!email || !password) {
      setError("يرجى إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }
    // TODO: Add authentication logic here
    alert("تم تسجيل الدخول بنجاح!");
  };

  return (
    <>
      <Card title="تسجيل الدخول" className="text-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded px-3 py-2"
            autoFocus
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded px-3 py-2"
          />
          {error && <small className="text-red-500">{error}</small>}
          <Button type="submit">تسجيل الدخول</Button>
        </form>
        <Divider />
        <NavLink
          to="/register"
          className="text-blue-600 text-sm hover:underline"
        >
          ليس لديك حساب؟ سجل الآن
        </NavLink>
      </Card>
    </>
  );
};

export default LoginPage;
