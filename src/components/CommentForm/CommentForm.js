import { forwardRef, useRef, useState } from "react";
import "./CommentForm.scss";

const CommentForm = forwardRef((props, ref) => {
  const { placeholder, getData } = props;

  const [currentValue, setCurrentValue] = useState();

  const handleData = (e) => {
    let element = e.target;
    getData(element.value);
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
    setCurrentValue(element.value);
  };

  return (
    <>
      <div className="comment-box-wrapper">
        <textarea
          ref={ref}
          onChange={handleData}
          placeholder={placeholder}
          value={currentValue}
        ></textarea>
      </div>
    </>
  );
});

export default CommentForm;
