import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useMetadata from "../../hooks/useMetadata";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/auth";

import Card from "../../components/ui/Card";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import axios from "axios";
import CustomSnackbar, { initSnackbar } from "../../components/CustomSnackbar";

const initialForm = { name: "", username: "", password: "" };

const RegisterPage = () => {
  const { t } = useContext(LanguageContext);
  const { login } = useAuth();
  useMetadata(`إنشاء حساب | ${t?.appName || "App"}`);

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(initSnackbar);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.username.trim() || !form.password.trim()) {
      setError("جميع الحقول مطلوبة");
      return;
    }
    if (form.password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }
    await registerUser();
  };

  // Register user with API
  const registerUser = async () => {
    const baseUrl = "https://tarmeezAcademy.com/api/v1";
    const url = `${baseUrl}/register`;
    setLoading(true);
    try {
      const response = await axios.post(url, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Use auth context to login the user after successful registration
      const loginSuccess = login(response.data);

      if (loginSuccess) {
        setSnackbar({
          open: true,
          message: "تم إنشاء الحساب بنجاح!",
          severity: "success",
        });
        setForm(initialForm); // Reset form
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setSnackbar({
          open: true,
          message: "تم إنشاء الحساب ولكن حدث خطأ في تسجيل الدخول التلقائي",
          severity: "warning",
        });
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      const message = error?.response?.data?.message || "حدث خطأ أثناء التسجيل";
      setSnackbar({ open: true, message, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Card title="إنشاء حساب" className="text-center">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          name="name"
          placeholder={t.auth.name}
          value={form.name}
          onChange={handleChange}
          autoComplete="name"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="username"
          placeholder={t.auth.username}
          value={form.username}
          onChange={handleChange}
          autoComplete="username"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder={t.auth.password}
          value={form.password}
          onChange={handleChange}
          autoComplete="new-password"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <small className="text-red-500 text-sm">{error}</small>}
        <Button
          type="submit"
          className="w-full"
          fullWidth
          variant="contained"
          disabled={loading}
        >
          {loading ? "جاري الإنشاء..." : "إنشاء حساب"}
        </Button>
      </form>
      <Divider />
      <NavLink
        to="/login"
        className="text-blue-600 text-sm hover:underline transition-colors"
      >
        لديك حساب بالفعل؟ تسجيل الدخول
      </NavLink>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
    </Card>
  );
};

export default RegisterPage;
