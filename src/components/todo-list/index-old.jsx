// React Imports
import { useState, useContext } from "react";

// Mui Components
import { Typography, Button } from "@mui/material";

// Custom Components
import CustomCard from "./ui/CustomCard";
import TooltipIconButton from "./ui/TooltipIconButton";
import { LanguageContext } from "../contexts/LanguageContext";
import CustomSnackbar, { initSnackbar } from "./CustomSnackbar";

// Components
import ViewApp from "../pages/TestDialog/ViewApp";
import CustomDialog from "../components/mui/dialogs/CustomDialog";

const todosData = [
  { id: 1, text: "شراء الخبز", completed: false },
  { id: 2, text: "مراجعة الدروس", completed: true },
  { id: 3, text: "الذهاب إلى النادي", completed: false },
];

function TodoList() {
  // State with Arrays
  const [open, setOpen] = useState(false);
  const [todos, setTodos] = useState(todosData);
  const [newTodoText, setNewTodoText] = useState("");
  const [snackbar, setSnackbar] = useState(initSnackbar);

  // Hooks
  const { t } = useContext(LanguageContext);

  // Functions
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addTodo = () => {
    if (newTodoText.trim() === "") {
      setSnackbar({
        open: true,
        message: "الرجاء إدخال نص المهمة",
        severity: "error",
      });
      return;
    }
    const newTodo = {
      id: todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1, // توليد ID فريد
      text: newTodoText,
      completed: false,
    };
    // إنشاء مصفوفة جديدة بإضافة العنصر الجديد
    setTodos([...todos, newTodo]);
    setNewTodoText(""); // مسح حقل الإدخال
  };

  const toggleTodoComplete = (id) => {
    // إنشاء مصفوفة جديدة بتعديل العنصر المطلوب
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id) => {
    console.log("Edit Todo with ID:", id);
    handleOpen();
  };

  const removeTodo = (id) => {
    // إنشاء مصفوفة جديدة باستثناء العنصر المطلوب
    setTodos(todos.filter((todo) => todo.id !== id));
    setSnackbar({
      open: true,
      message: "تم الحذف بنجاح!",
      severity: "success",
    });
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <CustomCard title={t.todoList}>
        <div className="flex items-center justify-between gap-2 mb-3">
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="أضف مهمة جديدة..."
          />
          <TooltipIconButton
            title={t.addTodo}
            iconClass="sm-plus-circle-line text-xl"
            onClick={addTodo}
            color="primary"
            component={Button}
            variant="contained"
            disableElevation
          />
        </div>
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between gap-2 mb-2 todo-item"
            >
              <Typography
                variant="body1"
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.text}
              </Typography>
              <div className="flex items-center gap-2">
                <TooltipIconButton
                  title={todo.completed ? t.incomplete : t.completed}
                  iconClass={`sm-check-circle-${
                    todo.completed ? "filled" : "line"
                  }`}
                  color="success"
                  size="small"
                  onClick={() => toggleTodoComplete(todo.id)}
                  className={`btn-icon ${todo.completed ? "success" : ""}`}
                />
                <TooltipIconButton
                  title={todo.completed ? "" : t.edit}
                  iconClass="sm-edit-line"
                  color="primary"
                  size="small"
                  disabled={todo.completed}
                  onClick={() => editTodo(todo.id)}
                />
                <TooltipIconButton
                  title={t.delete}
                  iconClass="sm-trash-line"
                  color="error"
                  size="small"
                  onClick={() => removeTodo(todo.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      </CustomCard>
      <CustomDialog open={open} onClose={handleClose}>
        <ViewApp onClose={handleClose} />
      </CustomDialog>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
    </>
  );
}

export default TodoList;