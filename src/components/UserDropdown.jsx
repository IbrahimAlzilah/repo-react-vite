import { useState, useContext } from "react";
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

const UserDropdown = () => {
  // States
  const { language } = useContext(LanguageContext);
  const { getCurrentUser } = useAuth();

  // const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
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
          <Avatar sx={{ bgcolor: deepOrange[500], width: 32, height: 32 }}>
            {getFirstLetter()}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
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
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserDropdown;
