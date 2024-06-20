import { SpeedOfLight, Start, Targets, Message, Running } from "./speedoflight.mjs";

const Green = "rgba(0, 255, 0, 1)";
const Gray = "rgba(20, 20, 20, 1)";
const LSHighScore = "HighScore";
const MaxRows = 5;
const MaxCols = 6;
const StartButtonText = "Start";

let canvas;
let ctx;
let TextSize = 30;
let ButtonW = 200;
let ButtonH = 40;
let playAreaX = 0;
let playAreaY = TextSize * 2;
let playAreaW = document.body.clientWidth;
let playAreaH = document.body.clientHeight - TextSize * 2;
let Points = 0;
let HighScore = parseInt(localStorage.getItem(LSHighScore) ?? "0");

let Rad = playAreaW < playAreaH ? (playAreaW / (MaxCols + 1)) * 0.4 : (playAreaH / (MaxRows + 1)) * 0.4;

let TargetCenters = [];

const isIntersect = (point, circle) => {
  const hit = Math.sqrt((point.x - circle.x) ** 2 + (point.y - circle.y) ** 2);
  return Math.sqrt((point.x - circle.x) ** 2 + (point.y - circle.y) ** 2) < Rad;
};

const ProcessPoint = (point) => {
  if (Running)
    TargetCenters.forEach((Row, RowI) => {
      Row.forEach((Col, ColI) => {
        const x = (playAreaW / (Row.length + 1)) * (ColI + 1);
        const y = (playAreaH / (Targets.length + 1)) * (RowI + 1);
        if (isIntersect(point, Col)) {
          if (Targets[RowI][ColI].getOn()) {
            Points += 10;
            Targets[RowI][ColI].setOn(0);
          } else {
            Points -= 10;
          }
        }
      });
    });
  if (
    !Running &&
    (canvas.width - ButtonW) / 2 < point.x &&
    point.x < (canvas.width - ButtonW) / 2 + ButtonW &&
    TextSize * 0.75 < point.y &&
    point.y < TextSize * 0.75 + ButtonH
  ) {
    Points = 0;
    Start();
  }
};
const Pointer = (e) => {
  ProcessPoint({
    x: e.layerX,
    y: e.layerY,
  });
};
const Touch = (e) => {
  e.touches.forEach((touch) => {
    ProcessPoint({ x: touch.clientX, y: clientY });
  });
};

const RedefineLayout = () => {
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  TextSize = canvas.width > 600 ? canvas.width / 50 : 12;
  playAreaW = canvas.width;
  playAreaH = canvas.height - TextSize * 2;
  Rad = playAreaW < playAreaH ? (playAreaW / (MaxCols + 1)) * 0.4 : (playAreaH / (MaxRows + 1)) * 0.4;
};
const Game = () => {
  canvas = document.createElement("canvas");
  canvas.addEventListener("pointerdown", Pointer);
  canvas.addEventListener("touchstart", Touch);
  canvas.id = "GameLayer";
  canvas.width = canvas.width;
  canvas.height = canvas.height;
  playAreaW = canvas.width;
  playAreaH = canvas.height - TextSize * 2;
  canvas.style.position = "absolute";
  document.body.appendChild(canvas);
  // document.body.addEventListener("resize", RedefineLayout);
  // document.addEventListener("orientationchange", RedefineLayout);
  window.addEventListener("resize", console.log("Resized"));
  window.addEventListener("orientationchange", console.log("Orientation"));
  RedefineLayout();
};

const BlackOutScoreLine = () => {
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, TextSize / 2, canvas.width, TextSize * 2);
};

const MakeHighScore = () => {
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "gold";
  ctx.font = `bold ${TextSize}px Arial`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(HighScore, 3 * TextSize, TextSize * 1.5);
};

const MakePoints = () => {
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "blue";
  ctx.font = `bold ${TextSize}px Arial`;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.fillText(Points, canvas.width - 3 * TextSize, TextSize * 1.5);
};

const BlackOutMessage = () => {
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, canvas.height / 2 - TextSize, canvas.width, TextSize * 2);
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
      const y = (playAreaH / (Targets.length + 1)) * (RowI + 1) + TextSize * 2;
      if (TargetCenters[RowI].length < ColI + 1) TargetCenters[RowI].push({ x: x, y: y });
      MakeButton({ x: x, y: y, target: Col });
    });
  });
};

const MakeStartButton = () => {
  ButtonH = TextSize * 1.5;
  ButtonW = StartButtonText.length * TextSize;
  ctx = canvas.getContext("2d");
  ctx.fillStyle = Green;
  ctx.fillRect((canvas.width - ButtonW) / 2, TextSize * 0.75, ButtonW, ButtonH);
  ctx.fillStyle = "black";
  ctx.font = `bold ${TextSize}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(StartButtonText, canvas.width / 2, TextSize * 0.75 + ButtonH * 0.5);
};

const Animate = () => {
  RedefineLayout();
  BlackOutScoreLine();
  BlackOutMessage();
  MakeHighScore();
  MakePoints();
  if (!Running) MakeStartButton();
  if (Points > HighScore) {
    localStorage.setItem(LSHighScore, Points.toString());
    HighScore = Points;
  }
  MakeButtons();
  if (!!Message) MakeMessage();
  window.requestAnimationFrame(Animate);
};

Game();
SpeedOfLight(5, 6, 3, 10);
Animate();
