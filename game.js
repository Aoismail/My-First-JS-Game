// map
let gameObj = {
  gameMap: [0, 0, 0, 0, 0, 0],
  winIndex: 0,
  prePosition: -1,
  currentPosition: 0,
  level: 1,
};

//     score and sound
let d = new Date();
let startTime = d.getSeconds();
let score = 0;

//     sound
var mySound;
var mySound1;
mySound = new sound("./sound/OPS.mp3", true);
mySound1 = new sound("./sound/لoingBad.wav", false);
let isplaying = true;

function sound(src, boolean) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  this.sound.volume = 0.05;
  this.sound.playbackRate = 1;
  if (boolean) this.sound.setAttribute("loop", "true");
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
  this.restart = function (incre) {
    let currentTime = this.sound.currentTime;
    this.sound.playbackRate += incre;
    this.sound.pause();
    if (isplaying) {
      this.sound.play();
    }
  };
}

// generate target in divs randomly.
const generateTargets = () => {
let winIndex = Math.floor(Math.random() * gameObj.gameMap.length);
  gameObj.gameMap[winIndex] = 1;
  gameObj.winIndex = winIndex;
  $(".Layers").each((i, e) => {
    var debomb = "./img/rszdebomb.png";
    let color = i == winIndex ? "green" : "none";
    let graphic = $(`<div class='graphic' id='${i}${i}'></div>`);
    graphic.css("left", `${Math.random() * 75}%`);
    graphic.css("background-image", `url(${debomb})`);
    // $(`#${e.id}`).css("border", `3px solid ${color}`);
    $(`#${e.id}`).append(graphic);
  });
  // gameObj.gameMap = [0, 0, 0, 0, 0, 0];
  $(`#${winIndex}${winIndex}`).css("border", `3px solid ${"green"}`);
};

const undogenerateTargets = () => {
  $(".Layers").each((i, e) => {
    $(`#${e.id}`).empty();
  });
};

let imgback = true;
var backimgp1 = "./img/3.png";
var backimgp2 = "./img/4.png";

const correctTarget = () => {
  if (imgback) {
    $(`body`).css("background-image", `url(${backimgp1})`);
    imgback = false;
  } else {
    imgback = true;
    $(`body`).css("background-image", `url(${backimgp2})`);
  }
  if (gameObj.currentPosition == 0) {
    gameObj.prePosition = 0;
    gameObj.currentPosition = 1;
  } else if (gameObj.currentPosition == 5) {
    gameObj.prePosition = 5;
    gameObj.currentPosition = 4;
  } else if (gameObj.currentPosition > gameObj.prePosition) {
    gameObj.prePosition = gameObj.currentPosition;
    gameObj.currentPosition++;
  } else if (gameObj.currentPosition < gameObj.prePosition) {
    gameObj.prePosition = gameObj.currentPosition;
    gameObj.currentPosition--;
  }

  var debomb = "./img/rszdebomb.png";
  var activebomb = "./img/rszactivebomb.png";

  $(".Layers").each((i, e) => {
    if (i == gameObj.prePosition) {
      $(`#${i}${i}`).css("background-image", `url(${debomb})`);
    }
    if (i == gameObj.currentPosition) {
      $(`#${i}${i}`).css("background-image", `url(${activebomb})`);
    }
  });
};

const drawFirstTarget = () => {
  var debomb = "./img/rszdebomb.png";
  gameObj.currentPosition = Math.floor(Math.random() * gameObj.gameMap.length);
  gameObj.prePosition = gameObj.currentPosition - 1;
  $(`#${gameObj.currentPosition}${gameObj.currentPosition}`).css(
    "background-image",
    `url(${debomb})`
  );
};

//  rest the inerval
function clearTimer() {
  clearInterval(test);
}
// this is the defuse button.
$(".gameButton").on("click", () => {
  d = new Date(); // date for the score
  let endTime = d.getSeconds();
  if (gameObj.currentPosition == gameObj.winIndex) {
    //gameobh is the active bomb postion winindex is
    d = new Date();
    endTime = d.getSeconds();
    console.log(endTime);
    score += Math.round(1000 / Math.abs(startTime - endTime));
    gameObj.level++;
    mySound.restart(0.03);
    console.log(mySound.playbackRate);
    $("#result").text(gameObj.level);
    $("span.Score").text(score);
    console.log("Won!");
    clearTimer();
    if (gameObj.level <= 9) {
      console.log(gameObj.level);
      test = setInterval(correctTarget, 1000 - gameObj.level * 100);
    } else {
      test = setInterval(correctTarget, 1000 - 9 * 100);
    }
  } else {
    console.log("Lost!");
    mySound.stop();
    mySound1.play();
    $("#result").text("Lost!");
    clearTimer();
  }

  score += Math.round(1000 / Math.abs(startTime - endTime));

});

$(".restartButton").on("click", () => {
  gameObj = {
    gameMap: [0, 0, 0, 0, 0, 0],
    winIndex: 0,
    prePosition: -1,
    currentPosition: 0,
    level: 1,
  };
  $("#result").text(gameObj.level);
  score = 0;
  $("span.Score").text(score);
  undogenerateTargets();
  generateTargets();
  drawFirstTarget();
  Clearinterval(test)
  test = setInterval(correctTarget, 1000);
});

$(".muteButton").on("click", () => {
  if (isplaying) {
    mySound.stop();
    isplaying = false;
  } else {
    mySound.play();
    isplaying = true;
  }
  console.log(mySound);
});

generateTargets();
drawFirstTarget();
let test = setInterval(correctTarget, 1000);
mySound.play();
