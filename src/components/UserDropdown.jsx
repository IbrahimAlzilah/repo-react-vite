import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import { LanguageContext } from "../contexts/LanguageContext";
import {
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import Logout from "@mui/icons-material/Logout";

const UserDropdown = () => {
  // States
  // const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // Refs
  // const anchorRef = useRef(null);

  // Hooks
  const { language } = useContext(LanguageContext);
  const { getCurrentUser } = useAuth();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event, url) => {
    if (url) {
      navigate(url);
    }
    // if (anchorRef.current && anchorRef.current.contains(event?.target)) {
    //   return;
    // }
    setAnchorEl(null);
  };

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear user and localStorage
    navigate("/login"); // Redirect to login page
  };

  // Get first letter of user's name
  const getFirstLetter = () => {
    const userName = getCurrentUser()?.name || "";
    return userName.charAt(0).toUpperCase();
  };

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            sx={{
              bgcolor: deepOrange[500],
              width: 32,
              height: 32,
              fontSize: "1rem",
            }}
          >
            {getFirstLetter()}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        // slotProps={{
        //   list: {
        //     "aria-labelledby": "basic-button",
        //   },
        // }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: 1,
                mr: -0.5,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                insetInlineEnd: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{
          horizontal: language === "ar" ? "left" : "right",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: language === "ar" ? "left" : "right",
          vertical: "bottom",
        }}
      >
        <MenuItem onClick={(e) => handleClose(e, "user-profile")}>
          <Avatar /> My Profile
        </MenuItem>
        <MenuItem onClick={(e) => handleClose(e)}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <Logout fontSize="small" sx={{ ml: 1 }} /> Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserDropdown;
