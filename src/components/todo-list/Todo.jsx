// React Imports
import { useState, useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";

// Mui Imports
import { Typography } from "@mui/material";

// Ui Imports
import TooltipIconButton from "../ui/TooltipIconButton";

// Components Imports
import CustomDialog from "../mui/dialogs/CustomDialog";
import AlertDialog from "./AlertDialog";
import ViewTodo from "./ViewTodo";

const Todo = ({ todo, onToggleComplete, onEdit, onDelete }) => {
  // State Hooks
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteAlert, setIsDeleteAlert] = useState(false);

  // Hooks
  const { t } = useContext(LanguageContext);

  // Var
  const isComplete = todo.completed;

  // Functions
  const handleDeleteAlert = () => setIsDeleteAlert(true);
  const handleClose = () => setIsDeleteAlert(false);

  const handleShowTodo = () => {
    setIsViewOpen(true);
  };

  const handleCloseView = () => {
    setIsViewOpen(false);
  };

  return (
    <>
      <Typography
        variant="body1"
        className={`cursor-pointer hover:text-blue-900 ${
          isComplete ? "text-gray-500 dark:text-gray-400 line-through" : ""
        }`}
        onClick={() => handleShowTodo(todo.id)}
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
          onClick={() => onToggleComplete(todo.id)}
          className={`btn-icon ${isComplete ? "success" : ""}`}
        />
        <TooltipIconButton
          title={isComplete ? "" : t.edit}
          iconClass="sm-edit-line"
          color="primary"
          size="small"
          onClick={() => onEdit(todo.id)}
        />
        <TooltipIconButton
          title={t.delete}
          iconClass="sm-trash-line"
          color="error"
          size="small"
          onClick={() => handleDeleteAlert()}
        />
      </div>
      <CustomDialog maxWidth="xs" open={isDeleteAlert} onClose={handleClose}>
        <AlertDialog
          onConfirm={() => onDelete(todo.id)}
          onClose={() => setIsDeleteAlert(false)}
          title={t.deleteConfirmText}
          content={t.deleteUndoText}
          translation={t}
        />
      </CustomDialog>

      {isViewOpen && (
        <CustomDialog maxWidth="sm" open={isViewOpen} onClose={handleCloseView}>
          <ViewTodo todo={todo} onClose={handleCloseView} t={t} />
        </CustomDialog>
      )}
    </>
  );
};

export default Todo;
