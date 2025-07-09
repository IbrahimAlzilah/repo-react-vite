import { useState, useContext, useMemo } from "react";
import PropTypes from "prop-types"; // Keep PropTypes for good practice
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import { LanguageContext } from "../contexts/LanguageContext";
import {
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuList,
  MenuItem,
  Divider,
  Typography,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import Logout from "@mui/icons-material/Logout";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"; // For My Profile
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"; // For My Account

const UserDropdown = () => {
  // State
  const [anchorEl, setAnchorEl] = useState(null); // Controlling the Menu's anchor element

  // Hooks
  const { language } = useContext(LanguageContext);
  const { getCurrentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Determine if the menu is open
  const open = Boolean(anchorEl);

  // Get current user details using useMemo for performance
  const currentUser = useMemo(() => getCurrentUser(), [getCurrentUser]);

  // Handle opening the menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing the menu and optional navigation
  const handleClose = (url = null) => {
    setAnchorEl(null);
    if (url) {
      navigate(url);
    }
  };

  // Handle user logout
  const handleLogout = () => {
    logout(); // Clear user session and local storage
    navigate("/login"); // Redirect to login page
  };

  // Get the first letter of the user's name or a default character
  const getFirstLetter = useMemo(() => {
    return currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : "?";
  }, [currentUser]);

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          data-testid="user-dropdown-button" // Added for testing
        >
          <Avatar
            sx={{
              bgcolor: deepOrange[500],
              width: 32,
              height: 32,
              fontSize: "1rem",
              fontWeight: "normal",
            }}
            alt={currentUser?.name || "User"}
          >
            {getFirstLetter}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()} // Call with no URL to just close
        // slotProps={{
        //   list: {
        //     "aria-labelledby": "basic-button",
        //   },
        // }}
        slotProps={{
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
        <MenuList>
          {/* {currentUser?.email && ( // Conditionally render user's email if available
            <MenuItem disabled>
              <Typography variant="body2" color="text.secondary" noWrap>
                {currentUser.email}
              </Typography>
            </MenuItem>
          )} */}
          <div className="flex items-center ps-3 pe-3 gap-2" tabIndex={-1}>
            <Avatar alt="Profile" src="/images/avatars/1.png" />
            <div className="flex items-start flex-col">
              <Typography className="font-medium" color="text.primary">
                {currentUser.name}
              </Typography>
              <Typography variant="caption">
                {(currentUser?.email && currentUser.email) || "admin@smart.com"}
              </Typography>
            </div>
          </div>
          {(currentUser || currentUser?.email) && <Divider sx={{ my: 0.5 }} />}
          {/* Add divider if user info is present */}
          <MenuItem onClick={() => handleClose("user-profile")}>
            <AccountCircleOutlinedIcon color="string" className="me-1" /> My Profile
          </MenuItem>
          <MenuItem onClick={() => handleClose("account-settings")}>
            <SettingsOutlinedIcon className="me-1" /> My Account
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <Logout className="me-1" /> Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

// PropTypes for the component (even though it doesn't take props, good for consistency)
UserDropdown.propTypes = {
  loading: PropTypes.bool,
};

export default UserDropdown;
