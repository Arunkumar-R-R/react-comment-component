import Button from "./components/Button/Button";
import Comment from "./components/Comment/Comment";
import { getComments as getCommentsApi } from "./utils/api";
import "./sass/style.scss";
import { useEffect, useState } from "react";
import CommentForm from "./components/CommentForm/CommentForm";

function App() {
  const [comments, setComments] = useState([]);
  const [currentComment, SetCurrentComment] = useState("");
  const [reset, setReset] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const currentUserId = "currentUser";

  const handleClick = () => {
    const data = {
      text: currentComment,
      username: "current user",
      userId: currentUserId,
      commentId: comments.length + 1,
    };
    setComments([data, ...comments]);
    setReset(true);
  };

  useEffect(() => {
    getCommentsApi().then((data) => {
      setComments(data);
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
        </div>
        <div className="comment-section">
          {comments.map((comment, index) => {
            return (
              <Comment
                key={index}
                currentUser={currentUserId}
                id={index}
                data={comment}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
