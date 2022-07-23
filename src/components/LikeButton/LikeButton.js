import { Downvote, Upvote } from "../../utils/icon/icon";
import "./LikeButton.scss";
import Button from "../Button/Button";

const LikeButton = () => {
  return (
    <div className="like-button-container">
      <Button type={"icon"} leftIcon={<Upvote />}></Button>
      <div className="like-button-count">1</div>
      <Button type={"icon"} leftIcon={<Downvote />}></Button>
    </div>
  );
};

export default LikeButton;
