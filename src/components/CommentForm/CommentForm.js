import { forwardRef, useEffect, useState } from "react";
import "./CommentForm.scss";

const CommentForm = forwardRef((props, ref) => {
  const { placeholder, getData, isReset, setReset, id } = props;

  const [currentValue, setCurrentValue] = useState();

  const handleData = (e) => {
    let element = e.target;
    getData(element.value);
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
    setCurrentValue(element.value);
  };

  useEffect(() => {
    const textAreaElement = document.getElementById(id);
    textAreaElement.value = "";
    return () => {
      setReset(false);
    };
  }, [isReset, setReset, id]);

  return (
    <>
      <div className="comment-box-wrapper">
        <textarea
          id={id}
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
