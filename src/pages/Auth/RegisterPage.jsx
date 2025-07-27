import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useMetadata from "../../hooks/useMetadata";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/auth";

import CustomCard from "../../components/ui/CustomCard";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import axios from "axios";
import CustomSnackbar, { initSnackbar } from "../../components/CustomSnackbar";

const initialData = { name: "", username: "", email: "", password: "" };

const RegisterPage = () => {
  const { t } = useContext(LanguageContext);
  const { login } = useAuth();
  useMetadata(`${t.register} | ${t?.appName || "App"}`);

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(initSnackbar);
  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.username.trim() || !formData.password.trim()) {
      setError("جميع الحقول مطلوبة");
      return;
    }
    if (formData.password.length < 6) {
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
      const response = await axios.post(url, formData, {
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
        setFormData(initialData); // Reset form
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
    <CustomCard title={t.register} className="text-center">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          name="name"
          placeholder={t.auth.name}
          value={formData.name}
          onChange={handleChange}
          autoComplete="name"
          className="form-control"
        />
        <input
          type="text"
          name="username"
          placeholder={t.auth.username}
          value={formData.username}
          onChange={handleChange}
          autoComplete="username"
          className="form-control"
        />
        <input
          type="email"
          name="email"
          placeholder={t.auth.email}
          value={formData.email}
          onChange={handleChange}
          autoComplete="new-email"
          className="form-control"
        />
        <input
          type="password"
          name="password"
          placeholder={t.auth.password}
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
          className="form-control"
        />
        {error && <small className="text-red-500 text-sm">{error}</small>}
        <Button
          type="submit"
          className="w-full"
          variant="contained"
          disabled={loading}
        >
          {loading ? "جاري الإنشاء..." : t.register}
        </Button>
      </form>
      <Divider sx={{ my: 2 }} />
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
    </CustomCard>
  );
};

export default RegisterPage;
