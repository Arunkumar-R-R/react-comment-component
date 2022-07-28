import Button from "../Button/Button";
import CommentForm from "../CommentForm/CommentForm";
import "./CommentBoxContainer.scss";

const CommentBoxContainer = (props) => {
  const { onCancel } = props;

  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <div className="wrapper">
      <div className="col-1">
        <div className="divider">
          <div className="threadline"></div>
        </div>
      </div>

      <div className="commentBoxContainer">
        <CommentForm placeholder={"What are your thoughts?"} />
        <div className="commentbox-footer">
          <Button className={"right-spacing-12"} type="gost" onClick={onCancel}>
            cancel
          </Button>
          <Button type="primary" onClick={() => handleClick()}>
            Reply
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CommentBoxContainer;
