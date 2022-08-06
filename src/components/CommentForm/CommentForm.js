import { forwardRef, useEffect, useState } from "react";
import "./CommentForm.scss";

const CommentForm = forwardRef((props, ref) => {
  const { placeholder, getData, setData, isReset, setReset, id, isEdit } =
    props;

  const [currentValue, setCurrentValue] = useState(setData ? setData : "");

  const handleData = (e) => {
    let element = e.target;
    getData(element.value);
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
    setCurrentValue(element.value);
  };

  useEffect(() => {
    const textAreaElement = document.getElementById(id);
    if (!isEdit) {
      textAreaElement.value = "";
      getData("");
      setCurrentValue("");
    } else {
      textAreaElement.focus = true;
    }
    textAreaElement.style.height = "auto";
    textAreaElement.style.height = `${textAreaElement.scrollHeight}px`;

    return () => {
      setReset(false);
    };
  }, [isReset, setReset, id, getData, isEdit]);

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
