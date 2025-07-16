
import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// Export the initial state for reuse
// eslint-disable-next-line react-refresh/only-export-components
export const initSnackbar = {
  open: false,
  message: "",
  severity: "success",
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomSnackbar = ({
  open,
  message,
  severity = "success",
  autoHideDuration = 4000,
  onClose,
  anchorOrigin = { vertical: "bottom", horizontal: "right" },
  dir = "ltr",
}) => (
  <Snackbar
    dir={dir}
    open={open}
    autoHideDuration={autoHideDuration}
    onClose={onClose}
    anchorOrigin={anchorOrigin}
  >
    <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
      {message}
    </Alert>
  </Snackbar>
);

export default CustomSnackbar;
