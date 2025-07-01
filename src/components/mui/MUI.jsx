import React from "react";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { deepOrange, deepPurple } from "@mui/material/colors";

const MUI = () => {
  return (
    <>
      <Stack direction="row" className="gap-3">
        <Avatar>H</Avatar>
        <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
        <Avatar sx={{ bgcolor: deepPurple[500] }}>P</Avatar>
      </Stack>
    </>
  );
};

export default MUI;
