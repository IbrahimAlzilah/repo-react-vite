import { useState, useContext } from "react";
import PropTypes from "prop-types";
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

  // Hooks
  const { language } = useContext(LanguageContext);
  const { getCurrentUser, logout } = useAuth();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  // Refs
  // const anchorRef = useRef(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event, url = null) => {
    setAnchorEl(null);
    if (url) {
      navigate(url);
    }
  };

  const handleLogout = () => {
    logout(); // Clear user and localStorage
    navigate("/login"); // Redirect to login page
  };

  // Get first letter of user's name, fallback to '?'
  const getFirstLetter = () => {
    const userName = getCurrentUser()?.name || "";
    return userName ? userName.charAt(0).toUpperCase() : "?";
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
            alt={getCurrentUser()?.name || "User"}
          >
            {getFirstLetter()}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        id="account-menu"
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
                width: 24,
                height: 24,
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
