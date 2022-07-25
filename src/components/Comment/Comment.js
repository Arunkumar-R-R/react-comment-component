import { ReplyIcon } from "../../utils/icon/icon";
import Button from "../Button/Button";
import LikeButton from "./../LikeButton/LikeButton";
import "./Comment.scss";
import user1 from "./../../utils/avatar/user1.png";
import { useState } from "react";
import CommentBoxContainer from "../CommentBoxContainer/CommentBoxContainer";

const Comment = () => {
  const [showReply, setShowReply] = useState(false);

  const showCommentBox = () => {
    setShowReply(!showReply);
  };

  const closeCommentBox = () => {
    setShowReply(false);
  };

  return (
    <div className="comment">
      <div className="comment-col1">
        <img className="" src={user1} alt="user1"></img>
        <div className="divider">
          <div className="threadline"></div>
        </div>
      </div>
      <div className="comment-col2">
        <h6>Isha</h6>
        <p>Yeah, it is a great work. must appreciate your work Yeah</p>
        <div className="comment-footer">
          <LikeButton></LikeButton>
          <Button
            type="gost"
            onClick={showCommentBox}
            className={"margin-left-4"}
            leftIcon={<ReplyIcon color={"gost"} />}
          >
            Reply
          </Button>
        </div>
        {showReply && <CommentBoxContainer onCancel={closeCommentBox} />}
      </div>
    </div>
  );
};

export default Comment;
