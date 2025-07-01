import { useState, useContext } from "react";
import useMetadata from "../hooks/useMetadata";
import { LanguageContext } from "../contexts/LanguageContext";
import {Box, IconButton, Tooltip } from "@mui/material";
import Divider from "../components/ui/Divider";
import Card from "../components/ui/Card";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TestSkeleton from "../components/mui/TestSkeleton";

import MUI from "../components/mui/MUI";
import DialogTest from "./TestDialog";

import CustomDialog from "../components/mui/dialogs/CustomDialog";
import AddEditApp from "./Add";

const MuiPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useContext(LanguageContext);
  useMetadata(`${t.using} MUI | ${t.appName}`);

  return (
    <>
      <Divider title={t.using + " skeleton"} />
      <Card title={t.using + " Skeleton"}>
        <Box className="flex items-center justify-center text-center gap-4 mb-5">
          <MUI />
          <DialogTest />
          <Tooltip title="Add New App">
            <IconButton variant="contained" onClick={handleOpen}>
              <AddCircleOutlineIcon />
            </IconButton>
          </Tooltip>
          <CustomDialog open={open} onClose={handleClose}>
            <AddEditApp onClose={handleClose} />
          </CustomDialog>
        </Box>
        <TestSkeleton />
      </Card>
    </>
  );
};

export default MuiPage;
