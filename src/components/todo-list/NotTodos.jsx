import { Typography } from "@mui/material";

const NotTodos = ({ dictionary }) => {
  return (
    <div className="flex justify-center items-center flex-wrap gap-1">
      <Typography
        variant="body1"
        className="text-center font-bold text-gray-500 dark:text-gray-300 mt-4"
      >
        {dictionary.noTodos + " " + dictionary.addNewTodo}
      </Typography>
      {/* <Typography className="cursor-pointer">{dictionary.addNewTodo}</Typography> */}
    </div>
  );
};

export default NotTodos;
