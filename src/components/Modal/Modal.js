import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./Modal.scss";
const Modal = (prop) => {
  const { children, onClose } = prop;
  const modalRoot = document.getElementById("modal-root");

  useEffect(() => {
    let body = document.querySelector("body");
    body.style.overflow = "hidden";

    return () => {
      body.style.overflow = "auto";
    };
  }, []);

  return createPortal(
    <div className="modal" onClick={onClose}>
      <div className="modal-body" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
