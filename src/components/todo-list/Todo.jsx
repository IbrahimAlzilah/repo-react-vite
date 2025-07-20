// React Imports
import { useState, useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";

// Mui Imports
import { Typography } from "@mui/material";

// Ui Imports
import TooltipIconButton from "../ui/TooltipIconButton";

// Components Imports
import AlertDialog from "./AlertDialog";
import CustomDialog from "../mui/dialogs/CustomDialog";

const Todo = ({ todo, handleTodoComplete, removeTodo, editTodo }) => {
  // States
  const [deleteAlert, setDeleteAlert] = useState(false);

  // Hooks
  const { t } = useContext(LanguageContext);

  // Var
  const isComplete = todo.completed;

  // Functions
  const handleDeleteAlert = () => setDeleteAlert(true);
  const handleClose = () => setDeleteAlert(false);

  return (
    <>
      <Typography
        variant="body1"
        className={`${
          isComplete ? "text-gray-600 dark:text-gray-400 line-through" : ""
        }`}
        // className={isComplete && "text-gray-500 dark:text-gray-400 line-through"}
      >
        {todo.text}
      </Typography>
      <div className="flex items-center gap-2">
        <TooltipIconButton
          title={isComplete ? t.completed : t.incomplete}
          iconClass={`sm-check-circle-${isComplete ? "filled" : "line"}`}
          color="success"
          size="small"
          onClick={() => handleTodoComplete(todo.id)}
          className={`btn-icon ${isComplete ? "success" : ""}`}
        />
        <TooltipIconButton
          title={isComplete ? "" : t.edit}
          iconClass="sm-edit-line"
          color="primary"
          size="small"
          // disabled={isComplete}
          onClick={() => editTodo(todo.id)}
        />
        <TooltipIconButton
          title={t.delete}
          iconClass="sm-trash-line"
          color="error"
          size="small"
          onClick={() => handleDeleteAlert()}
        />
      </div>
      <CustomDialog maxWidth="xs" open={deleteAlert} onClose={handleClose}>
        <AlertDialog
          onConfirm={() => removeTodo(todo.id)}
          onClose={() => setDeleteAlert(false)}
          title={"هل انت متاكد من رغبتك في حذف المهمة؟"}
          content={"لا يمكنك التراجع عن الحذف بعد اتمامه"}
        />
      </CustomDialog>
    </>
  );
};

export default Todo;
