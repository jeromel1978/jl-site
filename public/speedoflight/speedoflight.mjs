class Target {
  static on = false;
  static Timer;
  getOn = () => this.on;
  setOn = (seconds) => {
    if (seconds === 0) {
      this.on = false;
      clearTimeout(this.Timer);
    } else {
      this.on = true;
      this.Timer = setTimeout(() => {
        this.on = false;
      }, seconds * 1000);
    }
  };
  hit() {
    return this.on;
  }
}

// 5 Rs of 6 columns
let Rs = 5;
let Cs = 6;
let ActiveButtons = 6;
let Time = 5;
let Rounds = [];

const RandButton = () => {
  const Row = Math.round(Math.random() * (Rs - 1));
  const Col = Math.round(Math.random() * (Cs - 1));
  return { x: Col, y: Row };
};

const RandomButtons = (Count) => {
  let Buttons = [];
  for (let index = 0; index < Count; index++) {
    Buttons.push(RandButton());
  }
  return Buttons;
};
const AllButtons = () => {
  let Buttons = [];
  for (let Row = 0; Row < Rs; Row++) {
    for (let Col = 0; Col < Cs; Col++) {
      Buttons.push({ x: Col, y: Row });
    }
  }
  return Buttons;
};

const SetRounds = () => {
  Rounds = [
    {
      time: Time,
      on: [
        { x: 2, y: 1 },
        { x: 2, y: 2 },
        { x: 2, y: 3 },
        { x: 3, y: 1 },
        { x: 3, y: 2 },
        { x: 3, y: 3 },
      ],
    },
    {
      time: Time,
      on: RandomButtons(ActiveButtons),
    },
    {
      time: Time,
      on: RandomButtons(ActiveButtons),
    },
    {
      time: Time,
      on: RandomButtons(ActiveButtons),
    },
    {
      time: Time,
      on: RandomButtons(ActiveButtons),
    },
    {
      time: Time,
      on: RandomButtons(ActiveButtons),
    },
    {
      time: Time,
      on: RandomButtons(ActiveButtons),
    },
    {
      time: Time,
      on: RandomButtons(ActiveButtons),
    },
    {
      time: Time,
      on: RandomButtons(ActiveButtons),
    },
    {
      time: Time,
      on: RandomButtons(ActiveButtons),
    },
    {
      time: Time,
      on: [],
      message: "Get Ready for bonus round!!!",
    },
    {
      time: Time,
      on: AllButtons(),
    },
  ];
};

export let Message = "";
export let currentRound = 0;

export let Targets = [];

export const SpeedOfLight = (Rows, Cols, Seconds, Actives) => {
  Rs = Rows;
  Cs = Cols;
  Time = Seconds;
  ActiveButtons = Actives;
  for (let Row = 0; Row < Rs; Row++) {
    let CurrentRow = [];
    for (let Col = 0; Col < Cs; Col++) {
      CurrentRow.push(new Target());
    }
    Targets.push(CurrentRow);
  }
};

const ExecuteRound = (Round) => {
  Rounds[Round].on.forEach((o) => {
    Targets[o.y][o.x].setOn(Rounds[Round].time);
  });
  Message = Rounds[Round].message;
  if (Round + 1 < Rounds.length)
    setTimeout(() => {
      ExecuteRound(Round + 1);
    }, Rounds[Round].time * 1000);
};

export const Start = () => {
  SetRounds();
  ExecuteRound(0);
};
