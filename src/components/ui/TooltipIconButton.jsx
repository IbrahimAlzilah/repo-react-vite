import PropTypes from "prop-types";
import { Tooltip, IconButton } from "@mui/material";

/**
 * A reusable tooltip-wrapped button, supporting both IconButton and Button.
 */
function TooltipIconButton({
  title,
  iconClass,
  children,
  onClick,
  color = "default",
  disabled = false,
  size = "medium",
  className = "",
  offset = [0, -10], // [horizontal, vertical] = [x, y] Default vertical distance (-10px)
  // eslint-disable-next-line no-unused-vars
  component: Component = IconButton, // Can be Button or IconButton
  ...props
}) {
  const button = (
    <Component
      size={size}
      color={color}
      onClick={onClick}
      disabled={disabled}
      className={className}
      {...props}
    >
      {iconClass ? <i className={`sma-icon ${iconClass}`} /> : children}
    </Component>
  );

  return (
    <Tooltip
      title={title}
      slotProps={{
        popper: {
          modifiers: [{ name: "offset", options: { offset } }],
        },
      }}
    >
      <span className="TooltipSpan">{button}</span>
    </Tooltip>
  );
}

TooltipIconButton.propTypes = {
  title: PropTypes.string.isRequired,
  iconClass: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  //size: PropTypes.oneOf(["small", "medium", "large"]),
  size: PropTypes.string,
  className: PropTypes.string,
  offset: PropTypes.arrayOf(PropTypes.number),
  component: PropTypes.elementType,
};

export default TooltipIconButton;
