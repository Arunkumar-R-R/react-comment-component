import { DeleteIcon, EditIcon, ReplyIcon } from "../../utils/icon/icon";
import Button from "../Button/Button";
import "./Comment.scss";
import { useEffect, useState } from "react";
import CommentBoxContainer from "../CommentBoxContainer/CommentBoxContainer";
import Avatar from "../Avatar/Avatar";
import Modal from "../Modal/Modal";
import DeleteModal from "../Modal/DeleteModal/DeleteModal";

const Comment = (prop) => {
  const { data, currentUser, onDelete } = prop;
  const [showReply, setShowReply] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const showCommentBox = () => {
    setShowReply(!showReply);
  };

  const closeCommentBox = () => {
    setShowReply(false);
  };
  const onCancel = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setShowReply(false);
  }, [data]);

  return (
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
                className={"margin-left-4"}
                leftIcon={<EditIcon color={"gost"} />}
              >
                Edit
              </Button>
            </>
          )}
        </div>
        {showReply && (
          <CommentBoxContainer id={data.userId} onCancel={closeCommentBox} />
        )}
      </div>
      {isOpen ? (
        <Modal>
          <DeleteModal
            onCancel={onCancel}
            onDelete={() => {
              onDelete(data.commentId);
              setIsOpen(false);
            }}
          ></DeleteModal>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
};

export default Comment;
