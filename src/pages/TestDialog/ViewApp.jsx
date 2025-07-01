import DialogHeader from "../../components/mui/dialogs/DialogHeader";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function ViewApp({ onClose }) {
  return (
    <>
      <DialogHeader title="Modal Title" onClose={onClose} />
      <DialogContent dividers>
        <Typography gutterBottom>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam.
        </Typography>
        <Typography gutterBottom>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Vivamus sagittis lacus vel augue laoreet rutrum.
        </Typography>
        <Typography gutterBottom>
          Aenean lacinia bibendum nulla sed consectetur. Donec ullamcorper nulla
          non metus auctor fringilla.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Save
        </Button>
      </DialogActions>
    </>
  );
}
