import { useEffect, useState } from "react";
import Button from "../Button/Button";
import CommentForm from "../CommentForm/CommentForm";
import "./CommentBoxContainer.scss";

const CommentBoxContainer = (props) => {
  const {
    onCancel,
    id,
    commentId,
    userId,
    onRespond,
    commentsArray,
    replyCommentsLength,
  } = props;
  const [reset, setReset] = useState(false);
  const [currentComment, SetCurrentComment] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleClick = () => {
    const data = {
      text: currentComment,
      username: "current user",
      parentId: commentId,
      userId: userId,
      commentId: replyCommentsLength + commentId,
      upVoteCount: 0,
    };

    //deep copy of commentsArray
    const commentsList = JSON.parse(JSON.stringify(commentsArray));
    commentsList.filter((comment) => {
      if (comment.commentId === commentId) {
        if (comment.replyComments) {
          let replyComments = comment.replyComments;
          comment.replyComments = [...replyComments, data];
        } else {
          comment.replyComments = [data];
        }
        return comment;
      } else {
        comment.replyComments?.filter((replyComments) => {
          if (replyComments.commentId === commentId) {
            if (replyComments.replyCommentsThread) {
              let replyThreadComments = replyComments.replyCommentsThread;
              replyComments.replyCommentsThread = [
                ...replyThreadComments,
                data,
              ];
            } else {
              replyComments.replyCommentsThread = [data];
            }
          }
        });
      }
    });
    onRespond(commentsList);
    onCancel();
  };

  useEffect(() => {
    if (currentComment.length > 0) {
      setIsDisabled(false);
    }
    return () => {
      setIsDisabled(true);
    };
  }, [currentComment, isDisabled]);

  return (
    <div className="wrapper">
      <div className="commentBoxContainer">
        <CommentForm
          getData={SetCurrentComment}
          id={id}
          isReset={reset}
          setReset={setReset}
          placeholder={"What are your thoughts?"}
        />
        <div className="commentbox-footer">
          <Button className={"right-spacing-12"} type="gost" onClick={onCancel}>
            cancel
          </Button>
          <Button
            type="primary"
            onClick={() => handleClick()}
            {...(isDisabled ? { disabled: "disabled" } : "")}
          >
            Respond
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CommentBoxContainer;
