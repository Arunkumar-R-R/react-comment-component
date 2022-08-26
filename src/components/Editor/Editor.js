import { createElement, useCallback, useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import "./../CommentBoxContainer/CommentBoxContainer.scss";
import "./Editor.scss";

const Editor = (props) => {
  const {
    onCancel,
    id,
    commentId,
    userId,
    onRespond,
    commentsArray,
    replyCommentsLength,
    replyTo,
  } = props;

  const [currentComment, SetCurrentComment] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const editorRef = useRef();

  const getElement = useCallback(() => {
    const element = document.getElementById(id);
    return element;
  }, [id]);

  const focusElement = (editableElement) => {
    editableElement.focus();
  };

  const htmlParser = (nodeList) => {
    let element = Array.from(nodeList).map((node) => {
      const elementType =
        node?.localName || "p" || (node?.localName === "div" && "p");
      const anchorTagAttribute = {};
      const attrMap = node.attributes;
      if (
        attrMap !== undefined &&
        attrMap["class"]?.nodeValue !== undefined &&
        attrMap["href"]?.nodeValue !== undefined &&
        attrMap["class"]?.nodeValue !== "" &&
        attrMap["href"]?.nodeValue !== ""
      ) {
        anchorTagAttribute.className = attrMap["class"]?.nodeValue;
        anchorTagAttribute.href = attrMap["href"]?.nodeValue;
      }
      return createElement(
        elementType,
        anchorTagAttribute,
        node?.outerText || node.wholeText
      );
    });
    return element;
  };

  const handleClick = () => {
    const value = editorRef.current.innerHTML;
    let parser = new DOMParser();
    let htmlValue = parser.parseFromString(value, "text/html").body.childNodes;
    let newValue = htmlParser(htmlValue);
    console.log(newValue, "newvalue");
    SetCurrentComment(newValue);
    const data = {
      text: <div dangerouslySetInnerHTML={{ __html: currentComment }} />,
      username: "current user",
      parentId: commentId,
      userId: userId,
      commentId: replyCommentsLength + commentId,
      upVoteCount: 0,
    };
    console.log(data, "data");
    //deep copy of commentsArray
    const commentsList = JSON.parse(JSON.stringify(commentsArray));
    commentsList.filter((comment) => {
      if (comment.commentId === commentId) {
        if (comment.replyComments) {
          let replyComments = comment.replyComments;
          comment.replyComments = [...replyComments, data];
        } else {
          comment.replyComments = [data];
        }
        return comment;
      } else {
        comment.replyComments?.filter((replyComments) => {
          if (replyComments.commentId === commentId) {
            if (replyComments.replyCommentsThread) {
              let replyThreadComments = replyComments.replyCommentsThread;
              replyComments.replyCommentsThread = [
                ...replyThreadComments,
                data,
              ];
            } else {
              replyComments.replyCommentsThread = [data];
            }
          }
        });
      }
    });
    onRespond(commentsList);
    onCancel();
  };

  const placeCursorAtEnd = (element) => {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(element);
    range.collapse();
    selection.removeAllRanges();
    selection.addRange(range);
  };

  useEffect(() => {
    const editableElement = getElement();
    focusElement(editableElement);
    placeCursorAtEnd(editableElement);
  }, [getElement]);

  useEffect(() => {
    const editableElement = getElement();
    editableElement.addEventListener("paste", (e) => {
      var clipboardData, pastedData;
      e.stopPropagation();
      e.preventDefault();
      clipboardData = e.clipboardData || window.clipboardData;
      pastedData = clipboardData.getData("text/html");
      const existingValue = editorRef.current.innerHTML;
      editorRef.current.innerHTML = existingValue + pastedData;
      placeCursorAtEnd(editableElement);
    });
  }, [getElement]);

  useEffect(() => {
    const editableElement = editorRef.current.childNodes.length;
    if (editableElement > 1) {
      setIsDisabled(false);
    }
    return () => {
      setIsDisabled(true);
    };
  }, [currentComment, isDisabled]);

  useEffect(() => {
    const editableElement = getElement();
    editableElement.addEventListener("keypress", () => {
      console.log(editorRef);
      SetCurrentComment(editorRef.current.innerHTML);
    });
  }, [getElement]);

  return (
    <div className="wrapper">
      <div className="commentBoxContainer">
        <div
          className="editableDiv"
          id={id}
          contentEditable="true"
          tabIndex={0}
          suppressContentEditableWarning={true}
          ref={editorRef}
        >
          <a className="reply-to-user-tag" href="/">
            @{replyTo}{" "}
          </a>
        </div>
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

export default Editor;
