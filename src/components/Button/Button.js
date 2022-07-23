import { forwardRef } from "react";
import "./Button.scss";

const Button = forwardRef((props, ref) => {
  const { className, children, type, onClick, leftIcon, rightIcon } = props;

  return (
    <button
      ref={ref}
      className={`button ${type} ${className}`}
      onClick={onClick}
    >
      {leftIcon && (
        <span className="icon left-icon-spacing-small">{leftIcon}</span>
      )}
      {children}
      {rightIcon && (
        <span className="icon right-icon-spacing-small">{rightIcon}</span>
      )}
    </button>
  );
});

export default Button;
