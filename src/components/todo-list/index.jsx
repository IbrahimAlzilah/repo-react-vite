// React Imports
import { useState, useContext, useEffect, useMemo } from "react";

// MUI Imports
import { Button } from "@mui/material";

// Context & Hooks
import { LanguageContext } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/auth";

// Components
import CustomCard from "../ui/CustomCard";
import TooltipIconButton from "../ui/TooltipIconButton";
import CustomSnackbar, { initSnackbar } from "../CustomSnackbar";
import CustomDialog from "../mui/dialogs/CustomDialog";
import TodoFilterSelect from "./TodoFilterSelect";
import Todo from "./Todo";
import EditTodo from "./EditTodo";
import NotTodos from "./NotTodos";

// Constants
const LOCAL_STORAGE_KEY = "todos";

// Initial Todos
const initialTodos = [
  {
    id: 1,
    text: "مهمة تجريبية 1",
    details: "تفاصيل المهمة 1",
    completed: false,
    createdAt: new Date().toLocaleString(),
    updatedAt: null,
    createdBy: "User1",
  },
  {
    id: 2,
    text: "مهمة تجريبية 2",
    details: "تفاصيل المهمة 2",
    completed: true,
    createdAt: new Date().toLocaleString(),
    updatedAt: null,
    createdBy: "User1",
  },
  {
    id: 3,
    text: "مهمة تجريبية 3",
    details: "تفاصيل المهمة 3",
    completed: false,
    createdAt: new Date().toLocaleString(),
    updatedAt: null,
    createdBy: "User1",
  },
];

// Utility functions for localStorage
const getStoredTodos = () => {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialTodos;
  } catch {
    return initialTodos;
  }
};

const setStoredTodos = (todos) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
};

// Utility: Filter Todos logic
// function filterTodos(todos, filter) {
//   if (filter === "completed") return todos.filter((todo) => todo.completed);
//   if (filter === "incomplete") return todos.filter((todo) => !todo.completed);
//   return todos; // returen all todos
// }

function filterTodos(todos, filter, user) {
  let result = todos;
  if (user && user !== "All Users") {
    result = result.filter((todo) => todo.createdBy === user);
  }
  if (filter === "completed") return result.filter((todo) => todo.completed);
  if (filter === "incomplete") return result.filter((todo) => !todo.completed);
  return result;
}

function TodoList() {
  // States
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState("");
  const [snackbar, setSnackbar] = useState(initSnackbar);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null); // state to hold the todo being edited
  const [filter, setFilter] = useState("all");
  const [user, setUser] = useState("All Users");
  const [viewMode, setViewMode] = useState('list')

  // Contexts & Hooks
  const { t } = useContext(LanguageContext);
  const { getCurrentUser } = useAuth();

  // Vars
  const currentUser = getCurrentUser() || { name: t.unknownUser };

  // Load todos from localStorage on mount
  useEffect(() => {
    setTodos(getStoredTodos());
  }, []);

  // Memoized filtered todos
  const visibleTodos = useMemo(() => {
    return filterTodos(todos, filter, user);
  }, [todos, filter, user]);

  // Functions
  const saveTodos = (updatedTodos) => {
    setTodos(updatedTodos);
    setStoredTodos(updatedTodos);
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleAddTodo = () => {
    if (newTodoText.trim() === "") {
      showSnackbar(t.enterTodoText, "error");
      return;
    }
    const newTodo = {
      id: todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1,
      text: newTodoText,
      details: "",
      completed: false,
      createdAt: new Date().toLocaleString(), // toLocaleString("ar-EG")
      updatedAt: null,
      createdBy: currentUser?.name,
    };
    const updatedTodos = [...todos, newTodo];
    saveTodos(updatedTodos);
    setNewTodoText("");
    showSnackbar(t.addedSuccess);
  };

  const toggleTodoComplete = (id) => {
    // Create a new array with the updated todo
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos(updatedTodos);
  };

  const handleEditTodo = (id) => {
    const selected = todos.find((todo) => todo.id === id);
    setEditingTodo(selected); // Set the todo to be edited
    setDialogOpen(true);
  };

  // Handle edit todo [After click on edit button]
  const handleUpdateTodo = (updatedTodo) => {
    const updatedAt = new Date().toLocaleString();
    const updatedTodos = todos.map((todo) =>
      todo.id === updatedTodo.id ? { ...updatedTodo, updatedAt } : todo
    );
    saveTodos(updatedTodos);
    showSnackbar(t.updatedSuccess);
    handleClose();
  };

  // Handle remove todo [After click on confirm button]
  const handleDeleteTodo = (id) => {
    // Filter todos to delete the one with the given id
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    saveTodos(updatedTodos);
    showSnackbar(t.deletedSuccess);
  };

  const handleClose = (e, reason) => {
    if (reason !== "backdropClick") {
      setDialogOpen(false);
      // Clear the editing todo when dialog closes
      setEditingTodo(null);
    }
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };

  const handleViewMode = newMode => {
    setViewMode(newMode)
  }

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <CustomCard
        title={t.todoList}
        action={
          <div className="flex items-center gap-2">
            <TodoFilterSelect
              todos={todos}
              filterValue={filter}
              filterUser={user}
              onFilterChange={handleFilterChange}
              onChangeUser={handleUserChange}
              dictionary={t}
            />
            <TooltipIconButton
              title={t[viewMode === 'list' ? 'showGrid' : 'showList']}
              iconClass={viewMode === 'list' ? 'sm-grid-02-line' : 'sm-menu-line'}
              variant="tonal"
              onClick={() => handleViewMode(viewMode === 'list' ? 'grid' : 'list')}
            />
          </div>
        }
      >
        <div className="flex items-center justify-between gap-2 mb-3">
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
            placeholder={`${t.addNewTodo}...`}
            className="flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <TooltipIconButton
            title={t.addTodo}
            iconClass="sm-plus-circle-line text-xl"
            onClick={handleAddTodo}
            color="primary"
            component={Button}
            variant="contained"
            disableElevation
          />
        </div>

        {visibleTodos.length === 0 ? (
          <NotTodos dictionary={t} />
        ) : (
          <ul className={`space-y-2 ${viewMode === 'grid' ? "show-grid" : ""}`}>
            {visibleTodos?.map((todo) => (
              <li
                key={todo.id}
                className={`todo-item shadow-sm ${
                  todo.completed ? "is-completed" : ""
                }`}
              >
                <Todo
                  todo={todo}
                  onToggleComplete={toggleTodoComplete}
                  onEdit={handleEditTodo}
                  onDelete={handleDeleteTodo}
                />
              </li>
            ))}
          </ul>
        )}
      </CustomCard>

      <CustomDialog maxWidth="sm" open={isDialogOpen} onClose={handleClose}>
        {editingTodo && (
          <EditTodo
            disableEscapeKeyDown
            todo={editingTodo}
            onClose={handleClose}
            onUpdate={handleUpdateTodo}
          />
        )}
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
