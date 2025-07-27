import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../../contexts/LanguageContext";

// MUI Import
import DialogHeader from "../../components/mui/dialogs/DialogHeader";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CustomSnackbar, { initSnackbar } from "../../components/CustomSnackbar";

import axios from "axios";

function EditProfile({ onClose, data }) {
  const { t } = useContext(LanguageContext);
  const initialForm = {
    name: data.name,
    username: data.username,
    email: data.email,
  };

  // State
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
    if (!form.name.trim() || !form.email.trim() || !form.username.trim()) {
      setError("جميع الحقول مطلوبة");
      return;
    }
    await editProfile();
  };

  // Update user profile with API
  const editProfile = async () => {
    const baseUrl = "https://tarmeezAcademy.com/api/v1";
    const url = `${baseUrl}/updatePorfile`;
    setLoading(true);
    try {
      const response = await axios.put(url, form, {
        headers: { "Content-Type": "application/json" },
      });
      // Show success message
      setSnackbar({
        open: true,
        message: "تم تعديل البيانات بنجاح!",
        severity: "success",
      });

      // Save to context and localStorage
      if (response.data) {
        // Reset form
        setForm(initialForm);
        // Redirect to home page after a short delay
        setTimeout(() => navigate("user-profile"), 1500);
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || "حدث خطأ أثناء تعديل البيانات";
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
    <>
      <DialogHeader title={t.editUserProfile} onClose={onClose} />
      <form onSubmit={handleSubmit} className="flex flex-col space-y-0">
        <DialogContent dividers>
          <div className="form-group">
            <label htmlFor="name">{t.auth.name}</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder={t.auth.name}
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">{t.auth.username}</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder={t.auth.username}
              value={form.username}
              onChange={handleChange}
              autoComplete="new-username"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">{t.auth.email}</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder={t.auth.email}
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              className="form-control"
            />
          </div>
          {error && <small className="text-red-500 text-sm">{error}</small>}
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            // loading={loading}
            // onClick={onClose}
            disableElevation
          >
            {loading ? "جاري الحفظ..." : t.save}
          </Button>
        </DialogActions>
      </form>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
    </>
  );
}

export default EditProfile;
