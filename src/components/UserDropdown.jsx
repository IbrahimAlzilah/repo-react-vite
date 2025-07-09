import { useRef, useState, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

// MUI Imports
import {
  Tooltip,
  IconButton,
  Avatar,
  Popper,
  Fade,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Divider,
  Typography,
  Paper, // Import Paper for the Popper content
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import Logout from "@mui/icons-material/Logout";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

// Hook Imports
import { useAuth } from "../contexts/auth";
import { LanguageContext } from "../contexts/LanguageContext";

const UserDropdown = () => {
  // State
  const [open, setOpen] = useState(false); // control the Popper's open/close state
  const [tooltipOpen, setTooltipOpen] = useState(false);

  // Ref to anchor the Popper to the IconButton
  const anchorRef = useRef(null);

  // Hooks
  const { language } = useContext(LanguageContext);
  const { getCurrentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Get current user details using useMemo for performance
  const currentUser = useMemo(() => getCurrentUser(), [getCurrentUser]);

  // Handle closing the Popper. It can be triggered by a click away or a menu item selection.
  const handleClose = (event, url = null) => {
    if (url) {
      navigate(url);
    }

    // Prevent closing if the click is on the anchor element itself
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    
    setOpen(false);
    setTooltipOpen(false);
  };

  // Handle toggling the Popper's open state
  const handleToggle = () => {
    // !open ? setOpen(true) : setOpen(false)
    setOpen((prevOpen) => !prevOpen);
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
      <Tooltip
        title="Account settings"
        onOpen={() => setTooltipOpen(true)}
        onClose={() => setTooltipOpen(false)}
        open={open ? false : tooltipOpen ? true : false}
        slotProps={{ popper: { className: "capitalize" } }}
      >
        <IconButton ref={anchorRef} onClick={handleToggle} size="small">
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
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
        placement={language === "ar" ? "bottom-start" : "bottom-end"}
        className="min-is-[240px] !mt-3 z-[1]" // Consider using sx prop for Material-UI styles
        // sx={{ minWidth: 240, mt: 1.5, zIndex: 1 }} // Equivalent using sx
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Paper
              elevation={0}
              sx={{
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open} // Focus the first item when opened
                  onKeyDown={handleClose}
                >
                  {currentUser && (
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
                  )}
                  {(currentUser || currentUser?.email) && <Divider sx={{ my: 0.5 }} />}
                  {/* Add divider if user info is present */}
                  <MenuItem onClick={(e) => handleClose(e, "user-profile")}>
                    <AccountCircleOutlinedIcon className="me-1" /> My Profile
                  </MenuItem>
                  <MenuItem onClick={(e) => handleClose(e, "account-settings")}>
                    <SettingsOutlinedIcon className="me-1" /> My Account
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <Logout className="me-1" /> Logout
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

UserDropdown.propTypes = {
  loading: PropTypes.bool,
};

export default UserDropdown;
