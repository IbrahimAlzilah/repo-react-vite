import React from "react";
import Divider from "../components/ui/Divider";
import TodoList from "../components/TodoList";

const ToDoList = () => {
  return (
    <>
    <Divider title={"تطبيق قائمة المهام"} />
      <TodoList />
    </>
  );
};

export default ToDoList;
