import { createPortal } from "react-dom";
import "./Modal.scss";
const Modal = (prop) => {
  const { children } = prop;
  const modalRoot = document.getElementById("modal-root");

  return createPortal(
    <div className="modal">
      <div className="modal-body">{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;
