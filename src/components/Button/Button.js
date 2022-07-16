import { forwardRef } from "react";
import "./Button.scss";

const Button = forwardRef(({ children, leftIcon, type, onClick }, ref) => {
  return (
    <button ref={ref} className={`button ${type}`} onClick={onClick}>
      {leftIcon && <span className="icon icon-spacing-small">{leftIcon}</span>}
      {children}
    </button>
  );
});

export default Button;
