import PropTypes from "prop-types";
// MUI Imports
import { Tooltip, IconButton } from "@mui/material";

function TooltipIconButton({
  title,
  iconClass,
  onClick,
  color = "default",
  disabled = false,
  size = "small",
  className = "",
  offset = [0, -8], // [horizontal, vertical] = [x, y] Default vertical distance (-8px)
}) {
  const button = (
    <IconButton
      size={size}
      color={color}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      <i className={`sma-icon ${iconClass}`} />
    </IconButton>
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
      {disabled ? <span>{button}</span> : button}
    </Tooltip>
  );
}

TooltipIconButton.propTypes = {
  title: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  className: PropTypes.string,
};

export default TooltipIconButton;
