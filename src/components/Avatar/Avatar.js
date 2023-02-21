import React,{ useEffect } from "react";

const Avatar = (prop) => {
  const { username, className, id, size } = prop;

  let name = username;
  let nameSplit = name.split(" ");
  let firstLetter = nameSplit[0].charAt(0).toUpperCase();
  let secondLetter;
  let initials;
  if (nameSplit[1]) {
    secondLetter = nameSplit[1].charAt(0).toUpperCase();
    initials = firstLetter + secondLetter;
  } else {
    initials = firstLetter;
  }

  const canvasCreater = (canvas) => {
    canvas.style.borderRadius = "5px";
    let context = canvas.getContext("2d");
    let canvasWidth = canvas.getAttribute("width");
    let canvasHeight = canvas.getAttribute("height");
    context.fillStyle = "lightgrey";
    context.fillRect(0, 0, canvas.width, canvas.height);
    if (size < 30) {
      context.font = "12px Inter";
    } else {
      context.font = "14px Inter";
    }
    context.textAlign = "center";
    context.fillStyle = "#000";
    context.fillText(initials, canvasWidth / 2, canvasHeight / 1.5);
  };

  useEffect(() => {
    let canvas = document.getElementById(`${id}`);
    canvasCreater(canvas);
  });

  return (
    <canvas
      className={` avatar ${className}`}
      id={id}
      width={`${size}`}
      height={`${size}`}
    ></canvas>
  );
};
export default Avatar;
