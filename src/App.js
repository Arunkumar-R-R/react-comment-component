import Button from "./components/Button/Button";
import Comment from "./components/Comment/Comment";
import CommentBox from "./components/CommentBox/CommentForm";
import { getComments as getCommentsApi } from "./utils/api";
import "./sass/style.scss";
import { useEffect, useState } from "react";

function App() {
  const [comments, setComments] = useState([]);

  const handleClick = () => {
    console.log("clicked");
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
          <CommentBox></CommentBox>
          <div className="commentbox-footer">
            <Button type="primary" onClick={() => handleClick()}>
              comment
            </Button>
          </div>
        </div>
        <div>
          {comments.map((comment) => {
            return <Comment data={comment} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
