import Button from "./components/Button/Button";
import CommentBox from "./components/CommentBox/CommentBox";
import CommentBoxContainer from "./components/CommentBoxContainer/CommentBoxContainer";
import "./sass/style.scss";

function App() {
  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <div className="app">
      <div className="comment-area">
        <h1 className="title"> what is your comment on react ?</h1>
        <div className="initial-comment">
          <CommentBox></CommentBox>
          <div className="commentbox-footer">
            <Button type="primary" onClick={() => handleClick()}>
              comment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
