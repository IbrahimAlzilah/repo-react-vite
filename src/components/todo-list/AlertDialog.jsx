import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function AlertDialog({ title, content, onClose, onConfirm }) {
  const handleConfirm = () => {
    onConfirm?.(); // Safe call
    onClose?.(); 
  };

  return (
    <>
      {title && <DialogTitle className="text-center">{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText className="text-center">{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>إغلاق</Button>
        <Button onClick={handleConfirm} variant="contained" color="error">
          تاكيد الحذف
        </Button>
      </DialogActions>
    </>
  );
}

AlertDialog.propTypes = {
  title: PropTypes.node,
  content: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default AlertDialog;
