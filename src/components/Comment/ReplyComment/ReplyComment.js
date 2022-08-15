import { useEffect, useState } from "react";
import { DeleteIcon, EditIcon } from "../../../utils/icon/icon";
import Avatar from "../../Avatar/Avatar";
import Button from "../../Button/Button";
import CommentForm from "../../CommentForm/CommentForm";
import DeleteModal from "../../Modal/DeleteModal/DeleteModal";
import Modal from "../../Modal/Modal";
import { editCommentstyle } from "../Comment";
import "./../Comment.scss";

export const ReplyComment = (props) => {
  let {
    replyCommentData,
    parentCommentId,
    onReplyUpdate,
    currentUser,
    onReplyDelete,
  } = props;
  let replyCommentId = replyCommentData.commentId;
  let replyUserName = replyCommentData.username;
  let replyCommentText = replyCommentData.text;
  let replyUserId = replyCommentData.userId;

  const [showReplyEditComment, setShowReplyEditComment] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [reset, setReset] = useState(false);
  const [editedReplyComment, SetEditedReplyComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleReplyEdit = (id, commentId) => {
    onReplyUpdate(id, commentId, editedReplyComment);
    setReset(true);
    setShowReplyEditComment(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    onReplyDelete(replyCommentId);
    setIsOpen(false);
  };

  useEffect(() => {
    if (
      editedReplyComment.length > 0 &&
      editedReplyComment !== replyCommentText
    ) {
      setIsDisabled(false);
    }
    return () => {
      setIsDisabled(true);
    };
  }, [editedReplyComment, replyCommentText, isDisabled]);

  return (
    <div className="replyComments">
      <div className="comment-col1">
        <Avatar
          className={"mb-6"}
          id={replyCommentId}
          username={replyUserName}
        ></Avatar>
        <div className="divider">
          <div className="threadline"></div>
        </div>
      </div>
      <div className="comment-col2">
        <h6>{replyUserName}</h6>
        {showReplyEditComment ? (
          <div style={editCommentstyle}>
            <CommentForm
              id={replyCommentId}
              getData={SetEditedReplyComment}
              isEdit={true}
              setData={replyCommentText}
              isReset={reset}
              setReset={setReset}
              setShowEditComment={setShowReplyEditComment}
            ></CommentForm>
            <div className="edit-comment-footer">
              <Button
                type="gost"
                className={"margin-left-4"}
                onClick={() => setShowReplyEditComment(!showReplyEditComment)}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                className={"margin-left-4"}
                onClick={() => handleReplyEdit(parentCommentId, replyCommentId)}
                {...(isDisabled ? { disabled: "disabled" } : "")}
              >
                Save
              </Button>
            </div>
          </div>
        ) : (
          <>
            <p>{replyCommentText}</p>
            <div className="comment-footer">
              {currentUser === replyUserId && (
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
                    onClick={() =>
                      setShowReplyEditComment(!showReplyEditComment)
                    }
                    className={"margin-left-4"}
                    leftIcon={<EditIcon color={"gost"} />}
                  >
                    Edit
                  </Button>
                </>
              )}
            </div>
          </>
        )}{" "}
      </div>
      {isOpen && (
        <Modal onClose={handleClose}>
          <DeleteModal
            onCancel={handleClose}
            onDelete={handleDelete}
          ></DeleteModal>
        </Modal>
      )}
    </div>
  );
};
