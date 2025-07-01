import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}));

export default function CustomDialog({
  open,
  onClose,
  title,
  children,
  actions,
}) {
  return (
    <>
      <StyledDialog
        open={open}
        onClose={onClose}
        aria-labelledby="custom-dialog-title"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="custom-dialog-title">
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: "absolute",
            top: 12,
            insetInlineEnd: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>{children}</DialogContent>
        {actions && <DialogActions>{actions}</DialogActions>}
      </StyledDialog>

      {/* <StyledDialog
        open={open}
        onClose={onClose}
        aria-labelledby="custom-dialog-title"
      >
        <DialogTitle variant="h6" sx={{ m: 0, p: 2 }} id="custom-dialog-title">
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: "absolute",
            top: 12,
            insetInlineEnd: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <Divider />
        {children}
      </StyledDialog> */}
    </>
  );
}
