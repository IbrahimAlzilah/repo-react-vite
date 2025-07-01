import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useMetadata from "../../hooks/useMetadata";
import Card from "../../components/ui/Card";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { LanguageContext } from "../../contexts/LanguageContext";
import axios from "axios";

// Snackbar Alert Component
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
// const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const initialFormState = { name: "", username: "", password: "" };
const initialSnackbarState = { open: false, message: "", severity: "success" };

const RegisterPage = () => {
  // State
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(initialSnackbarState);
  const [form, setForm] = useState(initialFormState);
  const [error, setError] = useState("");
  const { t } = useContext(LanguageContext);

  const navigate = useNavigate();
  useMetadata(`إنشاء حساب | ${t?.appName || "App"}`);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.username || !form.password) {
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
  // const registerUser = async () => {
  //   const baseUrl = "https://tarmeezAcademy.com/api/v1";
  //   const url = `${baseUrl}/register`;
  //   setLoading(true);
  //   axios.post(url, form, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     })
  //     .then((response) => {
  //       setSnackbar({
  //         open: true,
  //         message: "تم إنشاء الحساب بنجاح!",
  //         severity: "success",
  //       });
  //       localStorage.setItem("token", response.data.token);
  //       localStorage.setItem("user", JSON.stringify(response.data.user));
  //     })
  //     .catch((error) => {
  //       const message = error?.response?.data?.message || "Registration failed";
  //       setSnackbar({ open: true, message, severity: "error" });
  //     })
  //     .finally(() => setLoading(false));
  // };

  const registerUser = async () => {
    const baseUrl = "https://tarmeezAcademy.com/api/v1";
    const url = `${baseUrl}/register`;
    setLoading(true);
    try {
      const response = await axios.post(url, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSnackbar({
        open: true,
        message: "تم إنشاء الحساب بنجاح!",
        severity: "success",
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setForm(initialFormState); // Optionally reset form
      // Delay to show success message before redirect
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      const message = err?.response?.data?.message || "حدث خطأ أثناء التسجيل";
      setSnackbar({ open: true, message, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="إنشاء حساب" className="text-center">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          name="name"
          placeholder="الاسم"
          value={form.name}
          onChange={handleChange}
          autoComplete="name"
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="text"
          name="username"
          placeholder="اسم المستخدم"
          value={form.username}
          onChange={handleChange}
          autoComplete="off"
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="كلمة المرور"
          value={form.password}
          onChange={handleChange}
          autoComplete="off"
          className="w-full px-3 py-2 border rounded"
        />
        {error && <small className="text-red-500">{error}</small>}
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
      <NavLink to="/login" className="text-blue-600 text-sm hover:underline">
        لديك حساب بالفعل؟ تسجيل الدخول
      </NavLink>
      <Snackbar
        dir="ltr"
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default RegisterPage;
