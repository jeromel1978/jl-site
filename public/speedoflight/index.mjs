import { SpeedOfLight, Start, Targets, Message } from "./speedoflight.mjs";

let canvas;
let ctx;
let playAreaW = document.body.clientWidth;
let playAreaH = document.body.clientHeight;
let Points = 0;

const Green = "rgba(0, 255, 0, 1)";
const Gray = "rgba(20, 20, 20, 1)";

const MaxRows = 5;
const MaxCols = 6;
let Rad = playAreaW < playAreaH ? (playAreaW / (MaxCols + 1)) * 0.4 : (playAreaH / (MaxRows + 1)) * 0.4;

const ButtonW = 200;
const ButtonH = 40;
const TextSize = 30;

let TargetCenters = [];

const isIntersect = (point, circle) => {
  const hit = Math.sqrt((point.x - circle.x) ** 2 + (point.y - circle.y) ** 2);
  // console.log(hit);
  return Math.sqrt((point.x - circle.x) ** 2 + (point.y - circle.y) ** 2) < Rad;
};

const Pressed = (e) => {
  // console.log("Pressed", e);
  const point = {
    x: e.layerX,
    y: e.layerY,
  };

  TargetCenters.forEach((Row, RowI) => {
    Row.forEach((Col, ColI) => {
      const x = (playAreaW / (Row.length + 1)) * (ColI + 1);
      const y = (playAreaH / (Targets.length + 1)) * (RowI + 1);
      // console.log(point, Col);
      // MakeButton({ x: x, y: y, target: Col });
      if (isIntersect(point, Col)) {
        console.log(`click on circle: ${RowI} ${ColI}`);
        if (Targets[RowI][ColI].getOn()) {
          console.log("good");
          Points += 10;
          Targets[RowI][ColI].setOn(0);
        } else {
          Points -= 10;
          console.log("bad");
        }
      }
    });
  });
  //(playAreaW - ButtonW) / 2, (playAreaH - ButtonH) / 2, ButtonW, ButtonH
  if (
    (canvas.width - ButtonW) / 2 < point.x &&
    point.x < (canvas.width - ButtonW) / 2 + ButtonW &&
    canvas.height - ButtonH * 1.5 < point.y &&
    point.y < canvas.height - ButtonH * 1.5 + ButtonH
  ) {
    Points = 0;
    Start();
  }
};

const Game = () => {
  canvas = document.createElement("canvas");
  canvas.addEventListener("pointerdown", Pressed);
  canvas.addEventListener("touchstart", Pressed);
  canvas.id = "GameLayer";
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  playAreaW = document.body.clientWidth;
  playAreaH = document.body.clientHeight;
  canvas.style.position = "absolute";
  document.body.appendChild(canvas);
  document.addEventListener("resize", (event) => {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    playAreaW = document.body.clientWidth;
    playAreaH = document.body.clientHeight;
    Rad = playAreaW < playAreaH ? (playAreaW / (MaxCols + 1)) * 0.75 : (playAreaH / (MaxRows + 1)) * 0.75;
  });
};

const MakeBox = () => {
  ctx = canvas.getContext("2d");
  // console.log("ctx", ctx);
  // ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
  // ctx.fillRect(100, 100, 200, 200);
  // ctx.fillStyle = "rgba(0, 255, 0, 0.2)";
  // ctx.fillRect(150, 150, 200, 200);
  // ctx.fillStyle = "rgba(0, 0, 255, 0.2)";
  // ctx.fillRect(200, 50, 200, 200);
};

const FillBackground = () => {
  ctx.FillBackground("black");
};

const MakePoints = () => {
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, TextSize, canvas.width, TextSize * 2);
  ctx.fillStyle = "blue";
  ctx.font = `bold ${TextSize}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(Points, canvas.width / 2, TextSize * 1.5);
};
const BlankMessage = () => {
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, canvas.height / 2 - TextSize, canvas.width, canvas.height / 2 + TextSize);
};
const MakeMessage = () => {
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "red";
  ctx.font = `bold ${TextSize * 2}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(Message, canvas.width / 2, canvas.height / 2);
};

const MakeButton = ({ x, y, target }) => {
  ctx = canvas.getContext("2d");
  // console.log(target);
  // if (!target.getOn) console.log(x, y, target);
  ctx.fillStyle = target.getOn() ? Green : Gray;
  ctx.beginPath();
  ctx.arc(x, y, Rad, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
};

const MakeButtons = () => {
  Targets.forEach((Row, RowI) => {
    if (TargetCenters.length < RowI + 1) TargetCenters.push([]);
    Row.forEach((Col, ColI) => {
      const x = (playAreaW / (Row.length + 1)) * (ColI + 1);
      const y = (playAreaH / (Targets.length + 1)) * (RowI + 1);
      if (TargetCenters[RowI].length < ColI + 1) TargetCenters[RowI].push({ x: x, y: y });
      // console.log(ColI, RowI, x, y);
      MakeButton({ x: x, y: y, target: Col });
    });
  });
};

const MakeStartButton = () => {
  ctx = canvas.getContext("2d");
  ctx.fillStyle = Green;
  ctx.fillRect((canvas.width - ButtonW) / 2, canvas.height - ButtonH * 1.5, ButtonW, ButtonH);
  ctx.fillStyle = "black";
  ctx.font = `bold ${TextSize}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Start", canvas.width / 2, canvas.height - ButtonH * 1.5 + ButtonH * 0.5);
};

const Animate = () => {
  // FillBackground();
  BlankMessage();
  MakePoints();
  MakeStartButton();
  MakeButtons();
  if (!!Message) MakeMessage();
  // MakeBox();
  // Start();
  window.requestAnimationFrame(Animate);
};

Game();
SpeedOfLight(5, 6, 3, 10);
Animate();
