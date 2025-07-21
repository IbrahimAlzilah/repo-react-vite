// React Imports
import { useMemo } from "react";

// MUI Imports
import { DialogContent, Typography, Divider } from "@mui/material";
import DialogHeader from "../mui/dialogs/DialogHeader";

// Hook Imports
import { useAuth } from "../../contexts/auth";

// Reusable field display component
const FieldDisplay = ({ label, value }) => (
  <Typography>
    {label && `${label}: `}
    <b className="text-gray-700">{value}</b>
  </Typography>
);

const ViewTodo = ({ todo, t = {}, onClose }) => {
  // Hooks
  const { getCurrentUser } = useAuth();
  // Get current user details using useMemo for performance
  const currentUser = useMemo(() => getCurrentUser(), [getCurrentUser]);

  return (
    <>
      <DialogHeader title={t.viewTodo} onClose={onClose} />
      <DialogContent dividers className="flex flex-col gap-2">
        <FieldDisplay label={t.todoTitle} value={todo.text} />
        {todo.details && (
          <>
            <Divider className="my-2" />
            <FieldDisplay label={t.details} value={todo.details} />
          </>
        )}
        <Divider className="my-2" />
        <FieldDisplay
          label={t.todoStatus}
          value={todo.completed ? t.completed : t.incomplete}
        />
        <Divider className="my-2" />
        <FieldDisplay label={t.todoCreatedAt} value={todo.createdAt} />
        {todo.updatedAt && (
          <FieldDisplay label={t.todoUpdatedAt} value={todo.updatedAt} />
        )}
        <FieldDisplay label={t.todoCreatedBy} value={todo.createdBy} />
      </DialogContent>
    </>
  );
};

export default ViewTodo;
