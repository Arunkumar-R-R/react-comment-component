import { useContext, useEffect, useState } from "react";
import { commentContext } from "../../../App";
import Avatar from "../../Avatar/Avatar";
import Button from "../../Button/Button";
import CommentBoxContainer from "../../CommentBoxContainer/CommentBoxContainer";
import CommentForm from "../../CommentForm/CommentForm";
import DeleteModal from "../../Modal/DeleteModal/DeleteModal";
import Modal from "../../Modal/Modal";
import { editCommentstyle } from "../Comment";

const ThreadComment = (props) => {
  const {
    threadData,
    onUpdateThreadComment,
    onDeleteThreadComment,
    onRespond,
    commentsArray,
    parentData,
  } = props;

  const currentUser = useContext(commentContext);

  const { parentCommentId, parentCommentUserId, parentCommentLength } =
    parentData;
  const {
    commentId: threadCommentId,
    username: threadCommentUserName,
    text: threadCommentText,
    userId: threadUserId,
    isThreadCommentReply: isCommentReply,
  } = threadData;

  const [isOpen, setIsOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [reset, setReset] = useState(false);

  const [showThreadEditComment, setShowThreadEditComment] = useState(false);
  const [editedThreadComment, SetEditedThreadComment] = useState("");
  const [showThreadReply, setShowThreadReply] = useState(false);

  const [showUserName, setShowUserName] = useState(false);
  const [threadText, setThreadText] = useState("");
  const [replyToUserName, setReplyToUserName] = useState("");

  const handleThreadCommentEdit = () => {
    onUpdateThreadComment(
      parentCommentId,
      threadCommentId,
      editedThreadComment
    );
    setReset(true);
    setShowThreadEditComment(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    onDeleteThreadComment(parentCommentId, threadCommentId);
    setIsOpen(false);
  };

  const showThreadReplyForm = () => {
    setShowThreadReply(!showThreadReply);
  };

  const closeCommentBox = () => {
    setShowThreadReply(false);
  };

  useEffect(() => {
    const userName = threadCommentText.split(" ")[0];
    setReplyToUserName(userName);
    const text = threadCommentText.split(" ").slice(1).join(" ");
    setThreadText(text);
    if (isCommentReply) {
      setShowUserName(true);
    }
  }, [threadCommentText, threadCommentUserName, isCommentReply]);

  useEffect(() => {
    if (
      editedThreadComment.length > 0 &&
      editedThreadComment !== threadCommentText
    ) {
      setIsDisabled(false);
    }
    return () => {
      setIsDisabled(true);
    };
  }, [editedThreadComment, threadCommentText, isDisabled]);

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
          {showThreadEditComment ? (
            <div style={editCommentstyle}>
              <CommentForm
                id={threadCommentId}
                getData={SetEditedThreadComment}
                isEdit={true}
                setData={threadCommentText}
                isReset={reset}
                setReset={setReset}
                setShowEditComment={setShowThreadEditComment}
              ></CommentForm>
              <div className="edit-comment-footer">
                <Button
                  type="gost"
                  className={"margin-left-4"}
                  onClick={() =>
                    setShowThreadEditComment(!showThreadEditComment)
                  }
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  className={"margin-left-4"}
                  onClick={handleThreadCommentEdit}
                  {...(isDisabled ? { disabled: "disabled" } : "")}
                >
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <>
              <p>
                {showUserName ? (
                  <>
                    <a className="reply-to-user-tag" href="/">
                      {replyToUserName}
                    </a>
                    {threadText}
                  </>
                ) : (
                  threadCommentText
                )}
              </p>
              <div className="comment-footer">
                <Button type="gost" size="sm" onClick={showThreadReplyForm}>
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
            </>
          )}
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
      {showThreadReply && (
        <CommentBoxContainer
          id={parentCommentUserId}
          replyTo={threadCommentUserName}
          replyCommentsLength={parentCommentLength}
          commentId={parentCommentId}
          userId={currentUser}
          onCancel={closeCommentBox}
          commentsArray={commentsArray}
          onRespond={onRespond}
          isThreadCommentReply={true}
        />
      )}
    </>
  );
};
export default ThreadComment;
