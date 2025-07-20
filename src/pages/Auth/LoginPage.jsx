import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { LanguageContext } from "../../contexts/LanguageContext";
import useMetadata from "../../hooks/useMetadata";

import CustomCard from "../../components/ui/CustomCard";
import CustomButton from "../../components/ui/CustomButton";
import CustomDivider from "../../components/ui/CustomDivider";
import CustomSnackbar, { initSnackbar } from "../../components/CustomSnackbar";

import axios from "axios";

// Initial form state
const initialForm = { username: "", password: "" };

const LoginPage = () => {
  // Context and hooks
  const { t } = useContext(LanguageContext);
  const { login, getCurrentUser } = useAuth();
  const navigate = useNavigate();

  // Metadata
  useMetadata(`تسجيل الدخول | ${t?.appName || "App"}`);

  // State management
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(initSnackbar);
  const [form, setForm] = useState({
    ...initialForm,
    username: getCurrentUser()?.username || "",
  });
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear error when user starts typing
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!form.username.trim() || !form.password.trim()) {
      setError("يرجى إدخال اسم المستخدم وكلمة المرور");
      return;
    }

    if (form.password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    await loginUser();
  };

  // Login user with API
  const loginUser = async () => {
    const baseUrl = "https://tarmeezAcademy.com/api/v1";
    const url = `${baseUrl}/login`;

    setLoading(true);

    try {
      const response = await axios.post(url, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Show success message
      setSnackbar({
        open: true,
        message: "تم تسجيل الدخول بنجاح!",
        severity: "success",
      });

      // Save to context and localStorage
      const loginSuccess = login(response.data);

      if (loginSuccess) {
        // Reset form
        setForm(initialForm);

        // Redirect to home page after a short delay
        setTimeout(() => navigate("/"), 1500);
      } else {
        setSnackbar({
          open: true,
          message: "حدث خطأ أثناء حفظ بيانات تسجيل الدخول",
          severity: "error",
        });
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول";
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
    <CustomCard title="تسجيل الدخول" className="text-center">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          name="username"
          placeholder={t.auth.username}
          value={form.username}
          onChange={handleChange}
          autoComplete="username"
          className="form-control"
          autoFocus
        />
        <input
          type="password"
          name="password"
          placeholder={t.auth.password}
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
          className="form-control"
        />
        {error && <small className="text-red-500 text-sm">{error}</small>}
        <CustomButton
          type="submit"
          className="w-full"
          variant="contained"
          disabled={loading}
        >
          {loading ? "جاري التسجيل..." : "تسجيل الدخول"}
        </CustomButton>
      </form>
      <CustomDivider />
      <NavLink
        to="/register"
        className="text-blue-600 text-sm hover:underline transition-colors"
      >
        ليس لديك حساب؟ سجل الآن
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

export default LoginPage;
