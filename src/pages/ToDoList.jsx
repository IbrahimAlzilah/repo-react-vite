import React from "react";
import CustomDivider from "../components/ui/CustomDivider";
import TodoList from "../components/todo-list";

const ToDoList = () => {
  return (
    <>
      <CustomDivider title={"تطبيق قائمة المهام"} />
      <TodoList />
    </>
  );
};

export default ToDoList;
