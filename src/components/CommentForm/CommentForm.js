import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "./CommentForm.scss";

const CommentForm = forwardRef((props, ref) => {
  const { placeholder, getData, setData, isReset, setReset, id, isEdit } =
    props;

  const [currentValue, setCurrentValue] = useState(setData ? setData : "");

  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));

  const handleData = (e) => {
    let element = e.target;
    getData(element.value);
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
    setCurrentValue(element.value);
  };

  useEffect(() => {
    if (!isEdit) {
      const textAreaElement = document.getElementById(id);
      textAreaElement.focus();
      textAreaElement.value = "";
      getData("");
      setCurrentValue("");
      textAreaElement.style.height = "auto";
      textAreaElement.style.height = `${textAreaElement.scrollHeight}px`;
    }

    return () => {
      setReset(false);
    };
  }, [isReset, isEdit, setReset, id, getData]);

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.style.height = "auto";
    inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;

    return () => {
      setReset(false);
    };
  }, [isEdit, setReset]);

  return (
    <>
      <div className="comment-box-wrapper">
        <textarea
          id={id}
          ref={inputRef}
          onChange={handleData}
          placeholder={placeholder}
          value={currentValue}
        ></textarea>
      </div>
    </>
  );
});

export default CommentForm;
