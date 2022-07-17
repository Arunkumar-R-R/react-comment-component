import { forwardRef } from "react";
import "./Button.scss";

const Button = forwardRef(
  ({ children, type, onClick, leftIcon, rightIcon }, ref) => {
    return (
      <button ref={ref} className={`button ${type}`} onClick={onClick}>
        {leftIcon && (
          <span className="icon left-icon-spacing-small">{leftIcon}</span>
        )}
        {children}
        {rightIcon && (
          <span className="icon right-icon-spacing-small">{rightIcon}</span>
        )}
      </button>
    );
  }
);

export default Button;
