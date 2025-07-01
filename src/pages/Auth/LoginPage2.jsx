import { useState, useContext } from "react";
import { useAuth } from "../../contexts/auth";
import { NavLink, useNavigate } from "react-router-dom";
import useMetadata from "../../hooks/useMetadata";
import { LanguageContext } from "../../contexts/LanguageContext";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Divider from "../../components/ui/Divider";

import axios from "axios";
import CustomSnackbar, { initSnackbar } from "../../components/CustomSnackbar";

const getCurrentUser = () => {
  const storageUser = localStorage.getItem("user");
  return storageUser ? JSON.parse(storageUser) : null;
};

const LoginPage = () => {
  const { t } = useContext(LanguageContext);
  useMetadata(`تسجيل الدخول | ${t?.appName || "App"}`);
  // State
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(initSnackbar);
  // State for form fields
  const [username, setUsername] = useState(
    (getCurrentUser() && getCurrentUser().username) || ""
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Satrt Test Sates Auth
  const { login } = useAuth();
  const navigate = useNavigate();

  const loginUser = async () => {
    const baseUrl = "https://tarmeezAcademy.com/api/v1";
    const url = `${baseUrl}/login`;
    const params = {
      username: username,
      password: password,
    };
    setLoading(true);
    try {
      const response = await axios.post(url, params, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSnackbar({
        open: true,
        message: "تم تسجيل الدخول بنجاح!",
        severity: "success",
      });
      // console.log(response.data);
      login(response.data); // Save to context + localStorage
      navigate("/"); // Redirect to Home/dashboard
    } catch (error) {
      const message =
        error?.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول";
      setSnackbar({ open: true, message, severity: "error" });
    } finally {
      setLoading(false);
    }
  };
  // End Test Sates Auth

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // Simple validation
    if (!username || !password) {
      setError("يرجى إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }
    await loginUser();
  };

  return (
    <>
      <Card title="تسجيل الدخول" className="text-center">
        {(getCurrentUser() && getCurrentUser().name) || "NotFound"}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="اسم المستخدم"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <Button
            type="submit"
            className="w-full"
            fullWidth
            variant="contained"
            disabled={loading}
          >
            {loading ? "جاري التسجيل..." : "تسجيل الدخول"}
          </Button>
        </form>
        <Divider />
        <NavLink
          to="/register"
          className="text-blue-600 text-sm hover:underline"
        >
          ليس لديك حساب؟ سجل الآن
        </NavLink>
        <CustomSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        />
      </Card>
    </>
  );
};

export default LoginPage;
