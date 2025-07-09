import PropTypes from "prop-types";

function CustomButton({
  text,
  className = "",
  color = "#1a1a1a",
  onClick,
  type = "button",
  disabled = false,
  "aria-label": ariaLabel,
  children,
  // props,
  ...rest
}) {
  const buttonStyle = {
    backgroundColor: color,
  };

  return (
    <button
      type={type}
      className={`text-xs ${className}`}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || text}
      // {...props}
      {...rest}
    >
      {children || text}
    </button>
  );
}

CustomButton.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
  "aria-label": PropTypes.string,
  children: PropTypes.node,
};

export default CustomButton;

// How to Use the Enhanced CustomButton
// Summary Table
// Prop	Example Value	Purpose
// text	"Save"	Button label (if no children)
// children	<span>⭐</span> Star	Custom content (overrides text)
// className	"rounded px-4 py-2"	Custom CSS classes
// color	"#007bff"	Background color
// style	{ border: '1px solid red'}	Inline styles (merged with defaults)
// type	"button", "submit", "reset"	Button type
// disabled	true	Disables the button
// aria-label	"Search"	Accessibility label
// onClick	() => ...	Click handler
// ...rest	id, data-testid, etc.	Any other valid button prop