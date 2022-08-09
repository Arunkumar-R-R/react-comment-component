import { useEffect, useState } from "react";
import Button from "../Button/Button";
import CommentForm from "../CommentForm/CommentForm";
import "./CommentBoxContainer.scss";

const CommentBoxContainer = (props) => {
  const { onCancel, id } = props;
  const [reset, setReset] = useState(false);
  const [currentComment, SetCurrentComment] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleClick = () => {
    console.log("clicked");
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
      <div className="col-1">
        <div className="divider">
          <div className="threadline"></div>
        </div>
      </div>

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
