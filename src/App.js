import Button from "./components/Button/Button";
import "./sass/style.scss";
import { ReplyIcon } from "./utils/icon";

function App() {
  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <div className="App">
      <Button
        type="primary"
        leftIcon={<ReplyIcon />}
        onClick={() => handleClick()}
      >
        Reply
      </Button>
    </div>
  );
}

export default App;
