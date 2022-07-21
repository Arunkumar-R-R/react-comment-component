import { useRef} from "react";
import "./CommentBoxStyle.scss";

const CommentBox = (props) => {
  const { placeholder } = props;

  let textAreaRef = useRef(null);

  const handleData = (e) => {
    let element = e.target;
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  };

  return (
    <>
      <textarea
        ref={textAreaRef}
        onChange={handleData}
        placeholder={placeholder}
      ></textarea>
    </>
  );
};

export default CommentBox;
