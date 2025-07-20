// React Imports
import { useMemo } from "react";

// Mui Imports
import { DialogContent, Typography, Divider } from "@mui/material";
import DialogHeader from "../mui/dialogs/DialogHeader";

// Hook Imports
import { useAuth } from "../../contexts/auth";

const ViewTodo = ({ todo, translation, onClose }) => {
  // Hooks
  const { getCurrentUser } = useAuth();
  // Var
  const t = translation || {};
  // Get current user details using useMemo for performance
  const currentUser = useMemo(() => getCurrentUser(), [getCurrentUser]);

  return (
    <>
      <DialogHeader title={t.viewTodo} onClose={onClose} />
      <DialogContent dividers className="flex flex-col gap-2">
        <Typography>
          {t.todoTitle + " : "} <b className="text-gray-700">{todo.text}</b>
        </Typography>
        <Divider className="my-2" />
        <Typography>
          {t.details + " : "} <b className="text-gray-700">{todo.details}</b>
        </Typography>
        <Divider className="my-2" />
        <Typography>
          {t.todoStatus + " : "}
          <b className="text-gray-700">
            {todo.completed ? t.completed : t.incomplete}
          </b>
        </Typography>
        <Divider className="my-2" />
        <Typography>
          {t.todoCreatedAt + " : "}
          <b className="text-gray-700">{todo.createdAt}</b>
        </Typography>
        {todo.updatedAt && (
          <Typography>
            {t.todoUpdatedAt + " : "}
            <b className="text-gray-700">{todo.updatedAt}</b>
          </Typography>
        )}
        <Typography>
          {t.todoCreatedBy + " : "}
          <b className="text-gray-700">{currentUser.name}</b>
        </Typography>
      </DialogContent>
    </>
  );
};

export default ViewTodo;
