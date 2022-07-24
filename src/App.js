import Button from "./components/Button/Button";
import Comment from "./components/Comment/Comment";
import CommentBox from "./components/CommentBox/CommentBox";
import useWindowSize from "./hooks/useWindowSize";
import "./sass/style.scss";

function App() {
  const handleClick = () => {
    console.log("clicked");
  };
  const { width } = useWindowSize();
  console.log(width, "width");
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
          <Comment></Comment>
          <Comment></Comment>
          <Comment></Comment>
          <Comment></Comment>
          <Comment></Comment>
        </div>
      </div>
    </div>
  );
}

export default App;
