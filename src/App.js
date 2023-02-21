import Button from "./components/Button/Button";
import Comment from "./components/Comment/Comment";
import { getComments as getCommentsApi } from "./utils/api";
import "./sass/style.scss";
import React,{ useEffect, useState } from "react";
import CommentForm from "./components/CommentForm/CommentForm";
import { createContext } from "react";
import Loading from "./components/Loading/Loading";

export const commentContext = createContext();

function App() {
  const [comments, setComments] = useState([]);
  const [currentComment, SetCurrentComment] = useState("");
  const [reset, setReset] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const currentUserId = "currentUser";

  const handleClick = () => {
    const data = {
      text: currentComment,
      username: "current user",
      userId: currentUserId,
      commentId: comments.length + 1,
      upVoteCount: 0,
    };
    setComments([data, ...comments]);
    setReset(true);
  };

  const deleteComment = (id) => {
    let duplicateCommentArray = [...comments];
    let matchedComment = duplicateCommentArray.filter((comment) => {
      return comment.commentId === id ? comment : "";
    });
    let index = duplicateCommentArray.indexOf(matchedComment[0]);
    duplicateCommentArray.splice(index, 1);
    setComments(duplicateCommentArray);
  };

  const updateComment = (id, updatedComment) => {
    let duplicateCommentArray = [...comments];
    duplicateCommentArray.map((comment) => {
      if (comment.commentId === id) {
        comment.text = updatedComment;
      }
      return comment;
    });
  };

  const updateReplyComment = (id, childCommentId, updatedComment) => {
    let duplicateCommentArray = [...comments];
    duplicateCommentArray.filter((comment) => {
      if (comment.commentId === id) {
        comment.replyComments.map((replyComment) => {
          if (replyComment.commentId === childCommentId) {
            replyComment.text = updatedComment;
          }
        });
        return comment;
      }
    });
  };

  const deleteReplyComment = (parentCommentId, childCommentId) => {
    let duplicateCommentArray = [...comments];
    duplicateCommentArray.filter((comment) => {
      if (comment.commentId === parentCommentId) {
        let replyCommentsArray = [...comment.replyComments];
        comment.replyComments.map((replyComment, index) => {
          if (replyComment.commentId === childCommentId) {
            replyCommentsArray.splice(index, 1);
            comment.replyComments = [...replyCommentsArray];
          }
        });
      }
    });
    setComments(duplicateCommentArray);
  };

  const deleteThreadComment = (parentCommentId, childCommentId) => {
    let duplicateCommentArray = [...comments];
    duplicateCommentArray.map((comment) => {
      comment.replyComments?.map((replyComment) => {
        if (replyComment.commentId === parentCommentId) {
          let threadCommentsArray = [...replyComment.replyCommentsThread];
          replyComment.replyCommentsThread.map((replyCommentThread, index) => {
            if (replyCommentThread.commentId === childCommentId) {
              threadCommentsArray.splice(index, 1);
              replyComment.replyCommentsThread = [...threadCommentsArray];
            }
          });
        }
      });
    });
    setComments(duplicateCommentArray);
  };

  const updateThreadComment = (
    parentCommentId,
    childCommentId,
    updatedComment
  ) => {
    let duplicateCommentArray = [...comments];

    duplicateCommentArray.map((comment) => {
      comment.replyComments?.map((replyComment) => {
        if (replyComment.commentId === parentCommentId) {
          replyComment.replyCommentsThread.map((replyCommentThread) => {
            if (replyCommentThread.commentId === childCommentId) {
              replyCommentThread.text = updatedComment;
            }
          });
        }
      });
    });
    setComments(duplicateCommentArray);
  };

  const setCommentData = (data) => {
    setComments(data);
    setLoading(false);
  };

  useEffect(() => {
    getCommentsApi().then((data) => {
      setLoading(true);
      setTimeout(setCommentData, 2000, data);
    });
  }, []);

  useEffect(() => {
    let currentDataLength = currentComment.length;
    if (currentDataLength > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [currentComment]);

  return (
    <div className="app">
      <div className="comment-area">
        <h1 className="title"> what is your comment on react library ?</h1>
        <div className="initial-comment">
          <div className="comment-label">Comment as Current User</div>
          <CommentForm
            id={"currentUser"}
            getData={SetCurrentComment}
            isReset={reset}
            setReset={setReset}
            placeholder={"what are your thought ?"}
          />
          <div className="commentbox-footer">
            <Button
              type="primary"
              onClick={() => handleClick()}
              {...(isDisabled ? { disabled: "disabled" } : "")}
            >
              comment
            </Button>
          </div>
          <div className="horizontal_line"></div>
        </div>
        <div className="comment-section">
          {loading ? (
            <Loading></Loading>
          ) : (
            <commentContext.Provider value={currentUserId}>

              {comments.map((comment, index) => {
                return (
                  <Comment
                    key={index}
                    onDelete={deleteComment}
                    id={index}
                    data={comment}
                    commentsArray={comments}
                    onAddComment={setComments}
                    onUpdateComment={updateComment}
                    onUpdateReplyComment={updateReplyComment}
                    onDelteReplyComment={deleteReplyComment}
                    onDeleteThreadComment={deleteThreadComment}
                    onUpdateThreadComment={updateThreadComment}
                  />
                );
              })}
            </commentContext.Provider>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
