import { useEffect, useState } from "react";

const useWindowSize = () => {
  const currentWidth = window.innerWidth;
  const currentHeight = window.innerHeight;

  const initialState = {
    width: currentWidth,
    height: currentHeight,
  };

  const [windowSize, setWindowSize] = useState(
    typeof window !== "undefined" && initialState
  );

  useEffect(() => {
    const changeWindowSize = () => {
      setWindowSize({ width: currentWidth, height: currentHeight });
    };
    window.addEventListener("resize", changeWindowSize);
    return () => {
      window.removeEventListener("resize", changeWindowSize);
    };
  });

  return windowSize;
};

export default useWindowSize;
