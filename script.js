const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
let lastHole;
const count = document.getElementById("count");
let score = 0;
count.textContent = score;
const levelButtons = Array.from(document.getElementsByClassName("level"));
let selected;
const startButton = document.querySelector(".start");
let gameRunning = false;
let countdown;
let timeout;

function randTime(min, max) {
  const t = Math.round(Math.random() * (max - min) + min);
  return t;
}

function randHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];

  if (hole === lastHole) {
    randHole(holes);
  }
  lastHole = hole;
  return hole;
}

function raiseMole(hole, time) {
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
  }, time);
}

function addToCount() {
  score++;
  count.textContent = score;
  count.classList.add("grow");
}

function setScoreToZero() {
  score = 0;
  count.textContent = score;
}

function clearStyles() {
  levelButtons.forEach(button => {
    button.classList.remove("clicked");
  });
}

function selectButton(e) {
  e.target.classList.add("clicked");
  selected = e.target;
  startButton.disabled = false;
}

levelButtons.forEach(button => {
  button.addEventListener("click", e => {
    clearStyles();
    count.classList.remove("grow");
    setScoreToZero();
    selectButton(e);
  });
});

function startGame(min, max) {
  clearInterval(countdown);
  clearTimeout(timeout);

  score = 0;
  let durationMilli = 10000;
  startButton.disabled = true;

  gameRunning = true;

  countdown = setInterval(() => {
    raiseMole(randHole(holes), randTime(min, max));
    if (!gameRunning) clearInterval(countdown);
  }, 1000);

  timeout = setTimeout(() => {
    gameRunning = false;
    startButton.disabled = false;
  }, durationMilli);

  moles.forEach(mole => {
    mole.addEventListener("click", addToCount);
  });
}

startButton.addEventListener("click", () => {
  if (selected.classList.contains("beginner")) {
    startGame(500, 2000);
  }

  if (selected.classList.contains("medium")) {
    startGame(300, 1500);
  }

  if (selected.classList.contains("expert")) {
    startGame(30, 1000);
  }
});
