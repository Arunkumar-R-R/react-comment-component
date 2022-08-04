import { createPortal } from "react-dom";
import "./Modal.scss";
const Modal = (prop) => {
  const { children, onClose } = prop;
  const modalRoot = document.getElementById("modal-root");

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
