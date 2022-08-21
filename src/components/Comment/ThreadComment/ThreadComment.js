import { useContext, useState } from "react";
import { commentContext } from "../../../App";
import Avatar from "../../Avatar/Avatar";
import Button from "../../Button/Button";
import DeleteModal from "../../Modal/DeleteModal/DeleteModal";
import Modal from "../../Modal/Modal";

const ThreadComment = (props) => {
  const { threadData, commentsArray, Children } = props;
  let threadCommentId = threadData.commentId;
  let threadCommentUserName = threadData.username;
  let threadCommentText = threadData.text;
  let threadUserId = threadData.userId;

  const currentUser = useContext(commentContext);

  const [isOpen, setIsOpen] = useState(false);
  const [showThreadEditComment, setShowThreadEditComment] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    // onReplyDelete(parentCommentId, replyCommentId,children);
    setIsOpen(false);
  };

  return (
    <>
      <div className="threadComments">
        <div className="comment-col1">
          <Avatar
            size={25}
            className={"mb-6"}
            id={threadCommentId}
            username={threadCommentUserName}
          ></Avatar>
          <div className="divider">
            <div className="threadline"></div>
          </div>
        </div>
        <div className="comment-col2">
          <h6>{threadCommentUserName}</h6>
          <p>{threadCommentText}</p>
          <div className="comment-footer">
            <Button type="gost" size="sm">
              Reply
            </Button>
            {currentUser === threadUserId && (
              <>
                <Button
                  type="gost"
                  size="sm"
                  className={"margin-left-4"}
                  onClick={() => setIsOpen(true)}
                >
                  Delete
                </Button>
                <Button
                  type="gost"
                  size="sm"
                  onClick={() =>
                    setShowThreadEditComment(!showThreadEditComment)
                  }
                  className={"margin-left-4"}
                >
                  Edit
                </Button>
              </>
            )}
          </div>
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
      {Children}
    </>
  );
};
export default ThreadComment;
