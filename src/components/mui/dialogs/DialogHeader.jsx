import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";

export default function DialogHeader({ title, onClose }) {
  return (
    <>
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
    </>
  );
}
