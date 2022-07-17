import Button from "./components/Button/Button";
import "./sass/style.scss";
import { ReplyIcon } from "./utils/icon/icon";

function App() {
  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <div className="App">
      <Button
        type="gost"
        leftIcon={<ReplyIcon color={'secondary'} />}
        onClick={() => handleClick()}
      >
        Reply
      </Button>
    </div>
  );
}

export default App;
