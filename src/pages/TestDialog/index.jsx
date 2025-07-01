import { useState } from "react";
import Button from "@mui/material/Button";

import CustomDialog from "../../components/mui/dialogs/CustomDialog";
import ViewApp from "./ViewApp";

function DialogTest() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Open Dialog
      </Button>

      <CustomDialog open={open} onClose={handleClose}>
        <ViewApp onClose={handleClose} />
      </CustomDialog>
    </>
  );
}

export default DialogTest;
