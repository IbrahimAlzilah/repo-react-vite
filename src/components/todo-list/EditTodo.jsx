import { useState, useContext, useEffect } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";

// MUI Import
import DialogHeader from "../mui/dialogs/DialogHeader";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CustomSnackbar, { initSnackbar } from "../CustomSnackbar";

function EditTodo({ onClose, todo, onUpdate }) {
  // States
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(initSnackbar);
  const [form, setForm] = useState({
    // Initialize with null or empty if todo is not yet available
    id: todo?.id || null,
    text: todo?.text || "",
    completed: todo?.completed || false,
  });
  const [error, setError] = useState("");

  // State
  const { t } = useContext(LanguageContext);

  // Update form state when the 'todo' prop changes (e.g., when a new todo is selected for editing)
  useEffect(() => {
    if (todo) {
      setForm({ id: todo.id, text: todo.text, completed: todo.completed });
    }
  }, [todo]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
    setError("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.text.trim()) {
      setError("نص المهمة مطلوب");
      return;
    }
    setLoading(true);
    try {
      // Simulate an asynchronous operation (e.g., saving to a local storage or a mock API)
      await new Promise((resolve) => setTimeout(resolve, 500));
      onUpdate(form); // Call the onUpdate function passed from TodoList
      setSnackbar({
        open: true,
        message: "تم تعديل المهمة بنجاح!",
        severity: "success",
      });
      onClose(); // Close the dialog on success
    } catch (error) {
      setSnackbar({
        open: true,
        message: "حدث خطأ أثناء تعديل المهمة" + { error },
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (!todo) {
    return null; // Don't render if no todo is being edited
  }

  return (
    <>
      <DialogHeader title={t.editTodo} onClose={onClose} />
      <form onSubmit={handleSubmit} className="flex flex-col space-y-0">
        <DialogContent dividers>
          <div className="form-group">
            <label htmlFor="text">نص المهمة</label>
            <input
              type="text"
              id="text"
              name="text"
              placeholder={t.addNewTodo}
              value={form.text}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="completed">حالة المهمة</label>
            <select
              id="completed"
              name="completed"
              value={form.completed}
              onChange={handleChange}
              className="form-control"
            >
              <option value={true}>مكتملة</option>
              <option value={false}>غير مكتملة</option>
            </select>
          </div>
          {error && <small className="text-red-500 text-sm">{error}</small>}
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" disabled={loading}>
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

export default EditTodo;
