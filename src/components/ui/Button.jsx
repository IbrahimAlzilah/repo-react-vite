function Button({
  text,
  className,
  color = "#1a1a1a",
  onClick,
  children,
}) {
  const buttonStyle = {
    backgroundColor: color,
    fontSize: ".75em",
    cursor: "pointer",
  };

  return (
    <button
      className={`text-xs ${className}`}
      style={buttonStyle}
      onClick={onClick}
    >
      {text || children}
    </button>
  );
}

export default Button;
