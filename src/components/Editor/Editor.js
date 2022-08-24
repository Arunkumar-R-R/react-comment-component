import { useEffect, useState } from "react";

const Editor = () => {
  const [comments, setComments] = useState([
    {
      value: ``,
    },
  ]);

  useEffect(() => {
    const element = document.getElementById("textArea");
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(element);
    range.collapse();
    selection.removeAllRanges();
    selection.addRange(range);
    element.focus();

    element.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        let newNode = {
          value: "",
        };
        setComments([...comments, newNode]);
      }
    });
    return () => {
      element.removeEventListener("keypress", (event) => {
        console.log(event);
      });
    };
  }, []);

  return (
    <div
      id="textArea"
      contentEditable="true"
      tabIndex={0}
      suppressContentEditableWarning={true}
    >
      {comments.map((index) => {
        return <p key={index}></p>;
      })}
    </div>
  );
};

export default Editor;
