import { useRef } from "react";
import "./CommentForm.scss";

const CommentForm = (props) => {
  const { placeholder } = props;

  let textAreaRef = useRef(null);

  const handleData = (e) => {
    let element = e.target;
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  };

  return (
    <>
      <div className="comment-box-wrapper">
        <textarea
          ref={textAreaRef}
          onChange={handleData}
          placeholder={placeholder}
        ></textarea>
      </div>
    </>
  );
};

export default CommentForm;
