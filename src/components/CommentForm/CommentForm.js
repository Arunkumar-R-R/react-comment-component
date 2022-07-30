import { forwardRef, useEffect, useState } from "react";
import "./CommentForm.scss";

const CommentForm = forwardRef((props, ref) => {
  const { placeholder, getData, isReset, setReset } = props;

  const [currentValue, setCurrentValue] = useState();

  const handleData = (e) => {
    let element = e.target;
    getData(element.value);
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
    setCurrentValue(element.value);
  };

  useEffect(() => {
    const textAreaElement = document.getElementById("textArea");
    textAreaElement.value = "";
    return () => {
      setReset(false);
    };
  }, [isReset, setReset]);

  return (
    <>
      <div className="comment-box-wrapper">
        <textarea
          id="textArea"
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
