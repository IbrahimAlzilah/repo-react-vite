// React Imports
import { useState, useContext, useEffect } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";

// MUI Imports
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";

// Component Imports
import DialogHeader from "../../components/mui/dialogs/DialogHeader";

const initialData = {
  id: null,
  text: "",
  details: "",
  completed: false,
  createdAt: "",
};

// const status = ["Status", "Active", "Inactive", "Suspended"];
// const languages = ["English", "Spanish", "French", "German", "Hindi"];
// const countries = ["Select Country", "France", "Russia", "China", "UK", "US"];

const EditUserInfo = ({ open, setOpen, data }) => {
  // States
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState(data || initialData);
  const [error, setError] = useState("");

  // Hooks
  const { t } = useContext(LanguageContext);

  // Update postData state when the 'todo' prop changes (e.g., when a new todo is selected for editing)
  useEffect(() => {
    data && setPostData({ ...data });
  }, [data]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPostData({
      ...postData,
      [name]: type === "checkbox" ? checked : value,
    });
    setError("");
  };

  const handleClose = () => {
    setOpen(false);
    setPostData(data || initialData);
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postData.text.trim()) {
      setError(t.enterTodoText);
      return;
    }
    setLoading(true);
    try {
      // Simulate an asynchronous operation (e.g., saving to a local storage or a mock API)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // onAdding(postData); // Call the onAdding function passed from TodoList
      // onClose();
    } catch (error) {
      // showSnackbar("حدث خطأ أثناء تعديل المهمة" + { error }, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      scroll="body"
      closeAfterTransition={false}
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
    >
      <DialogHeader
        title={data ? "Edit Post" : "Add New Post"}
        onClose={() => setOpen(false)}
      />
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Grid container spacing={0}>
            <Grid size={{ xs: 12, sm: 12 }}>
              <div className="form-group">
                <label htmlFor="text">{t.todoTitle}</label>
                <input
                  type="text"
                  id="text"
                  name="text"
                  placeholder={t.addNewTodo}
                  value={postData.text}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </Grid>
            <Grid size={{ xs: 12, sm: 12 }}>
              <div className="form-group">
                <label htmlFor="completed">{t.todoStatus}</label>
                <select
                  id="completed"
                  name="completed"
                  value={postData.completed}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="true">{t.completed}</option>
                  <option value="false">{t.incomplete}</option>
                </select>
              </div>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <div className="form-group">
                <label htmlFor="details">{t.details}</label>
                <textarea
                  id="details"
                  name="details"
                  rows={5}
                  value={postData.details}
                  onChange={handleChange}
                  className="form-control"
                ></textarea>
              </div>
            </Grid>
          </Grid>
          {error && <small className="text-red-500 text-sm">{error}</small>}
        </DialogContent>
        <DialogActions className="justify-center pbs-0 sm:pbe-16 sm:pli-16">
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            disableElevation
            // onClick={handleClose}
          >
            {loading ? "جاري الحفظ..." : t.edit}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditUserInfo;
