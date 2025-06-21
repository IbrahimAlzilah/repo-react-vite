import PropTypes from "prop-types";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

function Divider({ title, color }) {
  const { theme } = useContext(ThemeContext);

  const styles = {
    background: theme === "dark" ? "white" : "#1e1e1e",
    borderColor: theme === "dark" ? "#444" : "#ccc",
    color: color || (theme === "dark" ? "red" : "yellow"),
  };

  return (
    <div className={`divider relative border-b ${title ? "my-6" : "my-4"}`}>
      {title && (
        <h3
          className="text-lg font-semibold truncated-text absolute -top-4 left-1/2 -translate-x-1/2 px-3"
          style={styles}
        >
          {title}
        </h3>
      )}
    </div>
  );
}

Divider.propTypes = {
  title: PropTypes.string,
};

export default Divider;
