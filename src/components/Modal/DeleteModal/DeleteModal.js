import Button from "../../Button/Button";
import "./DeleteModal.scss";

const DeleteModal = (prop) => {
  const { onDelete, onCancel } = prop;
  return (
    <div className="delete-modal-body">
      <p>Do you want to delete your Comment ?</p>
      <div className="delete-modal-body-footer">
        <Button type="gost" className={"margin-left-4"} onClick={onCancel}>
          Cancel
        </Button>
        <Button type="primary" className={"margin-left-4"} onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};
export default DeleteModal;
