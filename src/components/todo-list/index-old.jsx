// React Imports
import { useState, useContext, useEffect } from "react";

// Mui Components
import { Typography, Button } from "@mui/material";

// Components
import CustomCard from "../ui/CustomCard";
import TooltipIconButton from "../ui/TooltipIconButton";
import { LanguageContext } from "../../contexts/LanguageContext";
import CustomSnackbar, { initSnackbar } from "../CustomSnackbar";

// Components
import Todo from "./Todo";
import EditTodo from "./EditTodo";
import CustomDialog from "../mui/dialogs/CustomDialog";

const initialTodos = [
  {
    id: 1,
    text: "مهمة تجريبية 1",
    details: "تفاصيل المهمة 1",
    completed: false,
  },
  {
    id: 2,
    text: "مهمة تجريبية 2",
    details: "تفاصيل المهمة 2",
    completed: true,
  },
  {
    id: 3,
    text: "مهمة تجريبية 3",
    details: "تفاصيل المهمة 3",
    completed: false,
  },
];

function TodoList() {
  // States
  const [open, setOpen] = useState(false);
  const [todos, setTodos] = useState(initialTodos);
  const [newTodoText, setNewTodoText] = useState("");
  const [snackbar, setSnackbar] = useState(initSnackbar);
  const [editingTodo, setEditingTodo] = useState(null); // New state to hold the todo being edited

  // Hooks
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    const storedTodos = localStorage.getItem("todos");
    setTodos(JSON.parse(storedTodos) || []);
  };

  // Save todos to localStorage
  const setLocalStorage = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  // Functions
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
    setSnackbar({
      open: true,
      message: "تمت إضافة المهمة بنجاح!",
      severity: "success",
    });
    setLocalStorage([...todos, newTodo]);
  };

  const toggleTodoComplete = (id) => {
    // Create a new array with the updated todo
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
    setLocalStorage(newTodos);
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditingTodo(todoToEdit); // Set the todo to be edited
    handleOpen();
  };

  // Handle edit todo [After click on edit button]
  const updateTodo = (updatedTodo) => {
    const newTodos = todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    setTodos(newTodos);
    setLocalStorage(newTodos);
    handleClose();
    setSnackbar({
      open: true,
      message: "تم تعديل المهمة بنجاح!",
      severity: "success",
    });
  };

  // Handle remove todo
  const deleteTodo = (id) => {
    // if (!window.confirm("هل أنت متأكد من رغبتك في حذف هذه المهمة؟")) return;
    // Filter todos to remove the one with the given id
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    setLocalStorage(newTodos);
    setSnackbar({
      open: true,
      message: "تم الحذف بنجاح!",
      severity: "success",
    });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditingTodo(null); // Clear the editing todo when dialog closes
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
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                addTodo();
              }
            }}
            placeholder={t.addNewTodo + "..."}
            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          {todos.length === 0 ? (
            <Typography
              variant="body1"
              className="text-gray dark:text-gray-200 text-center mt-4"
            >
              {t.noTodos}
            </Typography>
          ) : (
            todos.map((todo) => (
              <li
                key={todo.id}
                className={`todo-item rounded-md shadow-sm ${
                  todo.completed && "is-completed"
                }`}
              >
                <Todo
                  todo={todo}
                  onToggleComplete={toggleTodoComplete}
                  onEdit={editTodo}
                  onDelete={deleteTodo}
                />
              </li>
            ))
          )}
        </ul>
      </CustomCard>
      <CustomDialog maxWidth="sm" open={open} onClose={handleClose}>
        {/* Pass the editingTodo to EditTodo component and an update function */}
        <EditTodo
          todo={editingTodo}
          onClose={handleClose}
          onUpdate={updateTodo}
        />
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
