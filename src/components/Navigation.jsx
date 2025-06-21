import { useState } from "react";
import { NavLink } from "react-router-dom";

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
  { name: "useState", path: "/useState" },
  { name: "useEffect", path: "/useEffect" },
  { name: "useRef", path: "/useRef" },
  { name: "useContext", path: "/useContext" },
];

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu visibility

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
        <ul className="flex justify-center space-x-3 text-lg font-medium">
          {links.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                // Dynamically apply Tailwind classes based on active state
                className={({ isActive }) =>
                  `block p-2 rounded-md text-sm transition-colors duration-200 ${
                    isActive ? "active" : "text-blue-100"
                  }`
                }
                // Use 'end' for exact matching, especially for the root path '/'
                end={link.path === "/"}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu Overlay (conditionally rendered) */}
      {isMenuOpen && (
        <div className="absolute top-[80px] left-0 right-0 bg-blue-800 md:hidden z-10 shadow-lg rounded-b-lg py-4">
          <ul className="flex flex-col items-center space-y-3">
            {links.map((link) => (
              <li key={link.name} className="w-full text-center">
                <NavLink
                  to={link.path}
                  onClick={toggleMenu} // Close menu when a link is clicked
                  className={({ isActive }) =>
                    `block w-full px-4 py-2 text-lg rounded-md transition-colors duration-200 ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-blue-100 hover:bg-blue-700"
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
