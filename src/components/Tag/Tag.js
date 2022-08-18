import "./Tag.scss";

export const Tag = (props) => {
  const { text, color } = props;
  const tagStyle = {
    margin: "0 0 0 16px",
  };
  return (
    <div style={tagStyle} className={`tagContainer ${color}`}>
      {text}
    </div>
  );
};
