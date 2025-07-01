import { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CustomDialog from "./CustomDialog";

function DialogTest() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <Button onClick={() => setOpenDialog(true)} variant="contained">
        Open dialog
      </Button>

      <CustomDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        title="Modal title"
        actions={
          <Button onClick={() => setOpenDialog(false)} variant="contained">
            Save
          </Button>
        }
      >
        <Typography gutterBottom>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </Typography>
        <Typography gutterBottom>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
        </Typography>
        <Typography gutterBottom>
          Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
          magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
          ullamcorper nulla non metus auctor fringilla.
        </Typography>
      </CustomDialog>
    </>
  );
}

export default DialogTest;
