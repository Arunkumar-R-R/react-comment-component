import { DeleteIcon, EditIcon, ReplyIcon } from "../../utils/icon/icon";
import Button from "../Button/Button";
import "./Comment.scss";
import { useEffect, useState } from "react";
import CommentBoxContainer from "../CommentBoxContainer/CommentBoxContainer";
import Avatar from "../Avatar/Avatar";
import Modal from "../Modal/Modal";
import DeleteModal from "../Modal/DeleteModal/DeleteModal";
import CommentForm from "../CommentForm/CommentForm";

const Comment = (prop) => {
  const { data, currentUser, onDelete, onUpdateComment } = prop;

  const [showReply, setShowReply] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showEditComment, setShowEditComment] = useState(false);
  const [editedComment, SetEditedComment] = useState("");
  const [reset, setReset] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const editCommentstyle = {
    margin: "8px 0 0 0",
  };

  const showCommentBox = () => {
    setShowReply(!showReply);
  };

  const closeCommentBox = () => {
    setShowReply(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    onDelete(data.commentId);
    setIsOpen(false);
  };

  const handleEdit = () => {
    onUpdateComment(data.commentId, editedComment);
    setReset(true);
    setShowEditComment(false);
  };

  useEffect(() => {
    setShowReply(false);
  }, [data]);

  useEffect(() => {
    if (currentUser === data.userId) {
      if (editedComment.length > 0 && editedComment !== data.text) {
        setIsDisabled(false);
      }
    }
    return () => {
      setIsDisabled(true);
    };
  }, [editedComment, currentUser, data.userId, data.text, isDisabled]);

  return (
    <>
      <div className="comment">
        <div className="comment-col1">
          <Avatar
            className={"mb-6"}
            id={data.commentId}
            username={data.username}
          ></Avatar>
          <div className="divider">
            <div className="threadline"></div>
          </div>
        </div>
        <div className="comment-col2">
          <h6>{data?.username}</h6>
          {showEditComment ? (
            <div style={editCommentstyle}>
              <CommentForm
                id={data?.commentId}
                getData={SetEditedComment}
                isEdit={true}
                setData={data.text}
                isReset={reset}
                setReset={setReset}
                setShowEditComment={setShowEditComment}
              ></CommentForm>
              <div className="edit-comment-footer">
                <Button
                  type="gost"
                  className={"margin-left-4"}
                  onClick={() => setShowEditComment(!showEditComment)}
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  className={"margin-left-4"}
                  onClick={handleEdit}
                  {...(isDisabled ? { disabled: "disabled" } : "")}
                >
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <>
              <p>{data?.text}</p>
              <div className="comment-footer">
                <Button
                  type="gost"
                  size="sm"
                  onClick={showCommentBox}
                  leftIcon={<ReplyIcon color={"gost"} />}
                >
                  Reply
                </Button>
                {currentUser === data.userId && (
                  <>
                    <Button
                      type="gost"
                      size="sm"
                      className={"margin-left-4"}
                      onClick={() => setIsOpen(true)}
                      leftIcon={<DeleteIcon color={"gost"} />}
                    >
                      Delete
                    </Button>
                    <Button
                      type="gost"
                      size="sm"
                      onClick={() => setShowEditComment(!showEditComment)}
                      className={"margin-left-4"}
                      leftIcon={<EditIcon color={"gost"} />}
                    >
                      Edit
                    </Button>
                  </>
                )}
              </div>
            </>
          )}
          {showReply && (
            <CommentBoxContainer id={data.userId} onCancel={closeCommentBox} />
          )}
        </div>
      </div>
      {isOpen ? (
        <Modal onClose={handleClose}>
          <DeleteModal
            onCancel={handleClose}
            onDelete={handleDelete}
          ></DeleteModal>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};

export default Comment;
