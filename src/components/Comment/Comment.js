import { ReplyIcon } from "../../utils/icon/icon";
import Button from "../Button/Button";
import LikeButton from "./../LikeButton/LikeButton";
import "./Comment.scss";
import { useEffect, useState } from "react";
import CommentBoxContainer from "../CommentBoxContainer/CommentBoxContainer";
import Avatar from "../Avatar/Avatar";

const Comment = (prop) => {
  const { data } = prop;
  const [showReply, setShowReply] = useState(false);

  const showCommentBox = () => {
    setShowReply(!showReply);
  };

  const closeCommentBox = () => {
    setShowReply(false);
  };

  useEffect(() => {
    setShowReply(false);
  }, [data]);

  return (
    <div className="comment">
      <div className="comment-col1">
        <Avatar
          className={"mb-6"}
          id={data.userId}
          username={data.username}
        ></Avatar>
        <div className="divider">
          <div className="threadline"></div>
        </div>
      </div>
      <div className="comment-col2">
        <h6>{data?.username}</h6>
        <p>{data?.text}</p>
        <div className="comment-footer">
          <Button
            type="gost"
            size="sm"
            onClick={showCommentBox}
            leftIcon={<ReplyIcon color={"gost"} />}
          >
            Reply
          </Button>
        </div>
        {showReply && (
          <CommentBoxContainer id={data.userId} onCancel={closeCommentBox} />
        )}
      </div>
    </div>
  );
};

export default Comment;
