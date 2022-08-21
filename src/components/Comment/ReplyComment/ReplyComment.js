import { useContext } from "react";
import { useEffect, useState } from "react";
import { commentContext } from "../../../App";
import Avatar from "../../Avatar/Avatar";
import Button from "../../Button/Button";
import CommentBoxContainer from "../../CommentBoxContainer/CommentBoxContainer";
import CommentForm from "../../CommentForm/CommentForm";
import DeleteModal from "../../Modal/DeleteModal/DeleteModal";
import Modal from "../../Modal/Modal";
import { Tag } from "../../Tag/Tag";
import { editCommentstyle } from "../Comment";
import ThreadComment from "../ThreadComment/ThreadComment";

export const ReplyComment = (props) => {
  let {
    replyCommentData,
    parentCommentId,
    onReplyUpdate,
    onReplyDelete,
    commentsArray,
    onRespond,
    onUpdateThreadComment,
    onDeleteThreadComment,
  } = props;
  let replyCommentId = replyCommentData.commentId;
  let replyUserName = replyCommentData.username;
  let replyCommentText = replyCommentData.text;
  let replyUserId = replyCommentData.userId;
  let replyCommentsThread = replyCommentData?.replyCommentsThread;

  let replyCommentsThreadLength = replyCommentsThread?.length
    ? replyCommentsThread.length
    : `0${replyCommentId}`;

  const currentUser = useContext(commentContext);

  const [showReplyEditComment, setShowReplyEditComment] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [reset, setReset] = useState(false);
  const [editedReplyComment, SetEditedReplyComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showReply, setShowReply] = useState(false);

  const handleReplyEdit = () => {
    onReplyUpdate(parentCommentId, replyCommentId, editedReplyComment);
    setReset(true);
    setShowReplyEditComment(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    onReplyDelete(parentCommentId, replyCommentId);
    setIsOpen(false);
  };

  const showCommentBox = () => {
    setShowReply(!showReply);
  };

  const closeCommentBox = () => {
    setShowReply(false);
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
          size={30}
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
                onClick={handleReplyEdit}
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
              <Button type="gost" size="sm" onClick={showCommentBox}>
                Reply
              </Button>
              {currentUser === replyUserId && (
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
                      setShowReplyEditComment(!showReplyEditComment)
                    }
                    className={"margin-left-4"}
                  >
                    Edit
                  </Button>
                </>
              )}
              {replyCommentsThread?.length > 0 && (
                <Tag text={"Thread"} color={"lightGrey"}></Tag>
              )}
            </div>
          </>
        )}{" "}
        {showReply && (
          <CommentBoxContainer
            id={replyUserId}
            replyCommentsLength={replyCommentsThreadLength}
            commentId={replyCommentId}
            userId={currentUser}
            onCancel={closeCommentBox}
            commentsArray={commentsArray}
            onRespond={onRespond}
          />
        )}
        {replyCommentsThread?.length > 0
          ? replyCommentsThread.map((replyCommentThread, index) => {
              return (
                <ThreadComment
                  key={index}
                  threadData={replyCommentThread}
                  parentCommentId={replyCommentId}
                  onUpdateThreadComment={onUpdateThreadComment}
                  onDeleteThreadComment={onDeleteThreadComment}
                >
                  <>
                    {showReply && (
                      <CommentBoxContainer
                        id={replyUserId}
                        replyCommentsLength={replyCommentsThreadLength}
                        commentId={replyCommentId}
                        userId={currentUser}
                        onCancel={closeCommentBox}
                        commentsArray={commentsArray}
                        onRespond={onRespond}
                      />
                    )}
                  </>
                </ThreadComment>
              );
            })
          : ""}
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
