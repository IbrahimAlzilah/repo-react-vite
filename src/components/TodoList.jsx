import { useState } from "react";
import CustomCard from "./ui/CustomCard";
import CustomButton from "./ui/CustomButton";

const plus = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
    <path d="M9 12h6" />
    <path d="M12 9v6" />
  </svg>
);

const trash = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M4 7l16 0" />
    <path d="M10 11l0 6" />
    <path d="M14 11l0 6" />
    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
  </svg>
);

const todosData = [
  { id: 1, text: "شراء الخبز", completed: false },
  { id: 2, text: "مراجعة الدروس", completed: true },
  { id: 3, text: "الذهاب إلى النادي", completed: false },
];

function TodoList() {
  // State with Arrays
  const [todos, setTodos] = useState(todosData);
  const [newTodoText, setNewTodoText] = useState("");

  const addTodo = () => {
    if (newTodoText.trim() === "") {
      alert("الرجاء إدخال نص المهمة");
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

  const removeTodo = (id) => {
    // إنشاء مصفوفة جديدة باستثناء العنصر المطلوب
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <CustomCard title="قائمة المهام">
      <div className="flex items-center justify-between gap-2 mb-3">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="أضف مهمة جديدة..."
        />
        <CustomButton text={plus} onClick={addTodo} />
      </div>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between gap-2 mb-2 todo-item"
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text}
            <div className="flex items-center gap-2">
              <CustomButton
                text={todo.completed ? "إلغاء" : "إكمال"}
                onClick={() => toggleTodoComplete(todo.id)}
              />
              <CustomButton
                text={trash}
                className="text-red-500"
                color="var(--color-red-200)"
                onClick={() => removeTodo(todo.id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </CustomCard>
  );
}

export default TodoList;
