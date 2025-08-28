import { useState } from "react";
import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import { NavLink } from "react-router-dom";
import { Menu, MenuItem, ListItemText } from "@mui/material";

// SVG for menu icon
const menuIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M4 6l16 0" />
    <path d="M4 12l16 0" />
    <path d="M4 18l16 0" />
  </svg>
);

// SVG for close icon
const closeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-x"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </svg>
);

const links = [
  { name: "Props", path: "/" },
  {
    name: "Hooks",
    children: [
      [
        { name: "useState", path: "/useState" },
        { name: "useEffect", path: "/useEffect" },
        { name: "useRef", path: "/useRef" },
        { name: "useContext", path: "/useContext" },
        { name: "useMemo", path: "/useMemo" },
        { name: "useReducer", path: "/useReducer" },
        { name: "useParams", path: "/useParams" },
      ],
    ],
  },
  { name: "MUI", path: "/mui" },
  { name: "Todo List", path: "/todoList" },
  { name: "Posts", path: "/posts" },
];

function Navigation() {
  // States
  const { language } = useContext(LanguageContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu visibility
  // Test Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button (visible on small screens) */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 text-blue-500 rounded-md hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? closeIcon : menuIcon}
      </button>

      {/* Desktop Navigation Links (hidden on small screens) */}
      <nav className="hidden md:block">
        <ul className="flex items-center justify-center space-x-1 text-lg font-medium">
          {links.map((link) => (
            <li key={link.name}>
              {link.children ? (
                // Example dropdown for links with children (customize as needed)
                <div className="relative group">
                  {/* <ListItemText
                    to="#"
                    className="text-sm cursor-pointer text-inheri"
                    aria-controls={open ? "basic-menu2" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={(event) => setAnchorEl(event.currentTarget)}
                  >
                    {link.name}
                  </ListItemText> */}
                  <div
                    to="#"
                    className="text-sm cursor-pointer text-inheri"
                    aria-controls={open ? "basic-menu2" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={(event) => setAnchorEl(event.currentTarget)}
                  >
                    {link.name}
                  </div>
                  <Menu
                    id="basic-menu2"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                      list: {
                        "aria-labelledby": "basic-button",
                      },
                    }}
                    transformOrigin={{
                      horizontal: language === "ar" ? "right" : "left",
                      vertical: "top",
                    }}
                    anchorOrigin={{
                      horizontal: language === "ar" ? "right" : "left",
                      vertical: "bottom",
                    }}
                  >
                    {link.children[0].map((child) => (
                      <MenuItem key={child.name} onClick={handleClose}>
                        <NavLink
                          to={child.path}
                          className={({ isActive }) =>
                            `block px-2 py-1 text-sm rounded-md transition-colors duration-200 ${
                              isActive ? "active" : "text-blue-100"
                            }`
                          }
                          end={child.path === "/"}
                        >
                          {child.name}
                        </NavLink>
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              ) : (
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `block p-2 rounded-md text-sm transition-colors duration-200 ${
                      isActive ? "active" : "text-blue-100"
                    }`
                  }
                  end={link.path === "/"}
                >
                  {link.name}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu Overlay (conditionally rendered) */}
      {isMenuOpen && (
        <div className="absolute top-[80px] left-0 right-0 bg-gray-200 md:hidden z-10 shadow-lg rounded-b-lg p-4">
          <ul className="flex flex-col items-center space-y-3">
            {links.map((link) => (
              <li key={link.name} className="w-full text-center">
                <NavLink
                  to={link.path}
                  onClick={toggleMenu} // Close menu when a link is clicked
                  className={({ isActive }) =>
                    `block w-full px-4 py-2 text-lg rounded-md transition-colors duration-200 ${
                      isActive
                        ? "bg-blue-600 text-blue-100"
                        : "text-gray-800 hover:bg-blue-700 hover:text-blue-100"
                    }`
                  }
                  end={link.path === "/"}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Navigation;
