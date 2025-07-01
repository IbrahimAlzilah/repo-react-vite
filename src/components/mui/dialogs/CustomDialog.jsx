import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}));

export default function CustomDialog({ open, onClose, children, ...props }) {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      aria-labelledby="custom-dialog-title"
      fullWidth
      maxWidth="md"
      scroll="body"
      closeAfterTransition={false}
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
      {...props}
    >
      {children}
    </StyledDialog>
  );
}
