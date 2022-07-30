import Button from "./components/Button/Button";
import Comment from "./components/Comment/Comment";
import { getComments as getCommentsApi } from "./utils/api";
import "./sass/style.scss";
import { useEffect, useState } from "react";
import CommentForm from "./components/CommentForm/CommentForm";

function App() {
  const [comments, setComments] = useState([]);
  const [currentComment, SetCurrentComment] = useState([]);
  const [reset, setReset] = useState(false);

  const handleClick = () => {
    const data = {
      text: currentComment,
      username: "current user",
      userId: comments.length + 1,
    };
    setComments([...comments, data]);
    setReset(true);
  };

  useEffect(() => {
    getCommentsApi().then((data) => {
      setComments(data);
    });
  }, []);

  return (
    <div className="app">
      <div className="comment-area">
        <h1 className="title"> what is your comment on react library ?</h1>
        <div className="initial-comment">
          <CommentForm
            getData={SetCurrentComment}
            isReset={reset}
            setReset={setReset}
          />
          <div className="commentbox-footer">
            <Button type="primary" onClick={() => handleClick()}>
              comment
            </Button>
          </div>
        </div>
        <div className="comment-section">
          {comments.map((comment) => {
            return <Comment data={comment} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
