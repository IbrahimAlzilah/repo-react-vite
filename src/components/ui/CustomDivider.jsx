import PropTypes from "prop-types";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

function CustomDivider({ title, color }) {
  const { theme } = useContext(ThemeContext);

  const styles = {
    background: theme === "dark" ? "white" : "#1e1e1e",
    color: color || (theme === "dark" ? "red" : "yellow"),
  };

  return (
    <div className={`divider-root relative ${title ? "my-6" : "my-4"}`}>
      {title && (
        <h3
          className="truncated-text text-lg font-semibold absolute -top-4 left-1/2 -translate-x-1/2 px-3"
          style={styles}
        >
          {title}
        </h3>
      )}
    </div>
  );
}

CustomDivider.propTypes = {
  title: PropTypes.string,
};

export default CustomDivider;
