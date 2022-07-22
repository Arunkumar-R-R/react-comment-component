import Button from "../Button/Button";
import CommentBox from "../CommentBox/CommentBox";
import "./CommentBoxContainer.scss";

const CommentBoxContainer = (props) => {
  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <div className="wrapper">
      <div className="divider">
        <div className="threadline"></div>
      </div>
      <div className="commentBoxContainer">
        <div className="commentbox-body">
          <CommentBox placeholder={"What are your thoughts?"} />
        </div>
        <div className="commentbox-footer">
          <Button
            classname={"right-spacing-12"}
            type="gost"
            onClick={() => handleClick()}
          >
            cancel
          </Button>
          <Button type="primary" onClick={() => handleClick()}>
            Reply
          </Button>
        </div>{" "}
      </div>
    </div>
  );
};
export default CommentBoxContainer;
