import Button from "../Button/Button";
import "./Comment.scss";
import { useContext, useEffect, useState } from "react";
import CommentBoxContainer from "../CommentBoxContainer/CommentBoxContainer";
import Avatar from "../Avatar/Avatar";
import Modal from "../Modal/Modal";
import DeleteModal from "../Modal/DeleteModal/DeleteModal";
import CommentForm from "../CommentForm/CommentForm";
import { ReplyComment } from "./ReplyComment/ReplyComment";
import { commentContext } from "../../App";

export const editCommentstyle = {
  margin: "8px 0 0 0",
};

const Comment = (prop) => {
  const {
    data,
    onDelete,
    onUpdateComment,
    onAddComment,
    commentsArray,
    onUpdateReplyComment,
    onDelteReplyComment,
    onDeleteThreadComment,
    onUpdateThreadComment,
  } = prop;

  let userId = data.userId;
  let commentText = data.text;
  let userName = data?.username;
  let commentId = data?.commentId;
  let replyComments = data?.replyComments;

  let replyCommentsLength = replyComments?.length
    ? replyComments.length
    : `0${commentId}`;

  const currentUser = useContext(commentContext);

  const [showReply, setShowReply] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showEditComment, setShowEditComment] = useState(false);
  const [editedComment, SetEditedComment] = useState("");
  const [reset, setReset] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [showReplies, setShowReplies] = useState(false);

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
    onDelete(commentId);
    setIsOpen(false);
  };

  const handleEdit = () => {
    onUpdateComment(commentId, editedComment);
    setReset(true);
    setShowEditComment(false);
  };

  const handleRepliesBtn = () => {
    setShowReplies((showReplies) => !showReplies);
  };

  useEffect(() => {
    setShowReply(false);
  }, [data]);

  useEffect(() => {
    if (currentUser === userId) {
      if (editedComment.length > 0 && editedComment !== commentText) {
        setIsDisabled(false);
      }
    }
    return () => {
      setIsDisabled(true);
    };
  }, [editedComment, currentUser, userId, commentText, isDisabled]);

  return (
    <>
      <div className="comment">
        <div className="comment-col1">
          <Avatar
            size={30}
            className={"mb-6"}
            id={commentId}
            username={userName}
          ></Avatar>
          <div className="divider">
            <div className="threadline"></div>
          </div>
        </div>
        <div className="comment-col2">
          <h6>{userName}</h6>
          {showEditComment ? (
            <div style={editCommentstyle}>
              <CommentForm
                id={commentId}
                getData={SetEditedComment}
                isEdit={true}
                setData={commentText}
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
              <p>{commentText}</p>
              <div className="comment-footer">
                <Button
                  type="gost"
                  size="sm"
                  onClick={showCommentBox}
                  // leftIcon={<ReplyIcon color={"gost"} />}
                >
                  Reply
                </Button>
                {currentUser === userId && (
                  <>
                    <Button
                      type="gost"
                      size="sm"
                      className={"margin-left-4"}
                      onClick={() => setIsOpen(true)}
                      // leftIcon={<DeleteIcon color={"gost"} />}
                    >
                      Delete
                    </Button>
                    <Button
                      type="gost"
                      size="sm"
                      onClick={() => setShowEditComment(!showEditComment)}
                      className={"margin-left-4"}
                    >
                      Edit
                    </Button>
                  </>
                )}
              </div>
            </>
          )}
          {showReply && (
            <CommentBoxContainer
              id={userId}
              replyCommentsLength={replyCommentsLength}
              commentId={commentId}
              userId={currentUser}
              onCancel={closeCommentBox}
              commentsArray={commentsArray}
              onRespond={onAddComment}
            />
          )}
          <div className="replies_btn_container">
            {replyComments?.length > 0 ? (
              <Button
                type="gost"
                className="replies_btn"
                onClick={handleRepliesBtn}
              >
                {showReplies ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    height="16"
                    width="16"
                    className="up_arrow"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 15.75l7.5-7.5 7.5 7.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    height="16"
                    width="16"
                    className="down_arrow"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                )}
                {replyComments?.length} Replies
              </Button>
            ) : (
              ""
            )}
          </div>
          {showReplies
            ? replyComments.map((replyComment, index) => {
                return (
                  <ReplyComment
                    key={index}
                    commentsArray={commentsArray}
                    parentCommentId={commentId}
                    onReplyUpdate={onUpdateReplyComment}
                    onReplyDelete={onDelteReplyComment}
                    replyCommentData={replyComment}
                    onRespond={onAddComment}
                    onUpdateThreadComment={onUpdateThreadComment}
                    onDeleteThreadComment={onDeleteThreadComment}
                  ></ReplyComment>
                );
              })
            : ""}
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
    </>
  );
};

export default Comment;
