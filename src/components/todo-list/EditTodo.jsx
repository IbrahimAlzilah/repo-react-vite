import { useState, useContext, useEffect } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";

// MUI Import
import DialogHeader from "../mui/dialogs/DialogHeader";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

// Components Imports
import CustomSnackbar, { initSnackbar } from "../CustomSnackbar";

// Vars
// Initialize with null or empty if todo is not yet available
const initialData = {
  id: null,
  text: "",
  details: "",
  completed: false,
  createdAt: "",
};

function EditTodo({ todo, onClose, onUpdate }) {
  // States
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(initSnackbar);
  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState("");

  // Hooks
  const { t } = useContext(LanguageContext);

  // Update formData state when the 'todo' prop changes (e.g., when a new todo is selected for editing)
  useEffect(() => {
    todo && setFormData({ ...todo });
  }, [todo]);

  // Functions
  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setError("");
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.text.trim()) {
      setError(t.enterTodoText);
      return;
    }
    setLoading(true);
    try {
      // Simulate an asynchronous operation (e.g., saving to a local storage or a mock API)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onUpdate(formData); // Call the onUpdate function passed from TodoList
      onClose();
    } catch (error) {
      showSnackbar("حدث خطأ أثناء تعديل المهمة" + { error }, "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (!todo) return null; // Don't render if no todo is being edited

  return (
    <>
      <DialogHeader title={t.editTodo} onClose={onClose} />
      <form onSubmit={handleSubmit} className="flex flex-col space-y-0">
        <DialogContent dividers>
          <div className="form-group">
            <label htmlFor="text">{t.todoTitle}</label>
            <input
              type="text"
              id="text"
              name="text"
              placeholder={t.addNewTodo}
              value={formData.text}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="completed">{t.todoStatus}</label>
            <select
              id="completed"
              name="completed"
              value={formData.completed}
              onChange={handleChange}
              className="form-control"
            >
              <option value="true">{t.completed}</option>
              <option value="false">{t.incomplete}</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="details">{t.details}</label>
            <textarea
              id="details"
              name="details"
              rows={4}
              value={formData.details}
              onChange={handleChange}
              className="form-control"
            ></textarea>
          </div>
          {error && <small className="text-red-500 text-sm">{error}</small>}
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
            disabled={loading}
          >
            {loading ? "جاري الحفظ..." : t.edit}
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
