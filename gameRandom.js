console.clear();
// select all the zone divs
const zones = $(".zone");
let bomb_location = document.querySelectorAll(".zone");

function setLevel(level) {
  $("span.level_now").text(level);
}

function setScore(score) {
  $("span.Score").text(score);
}

let speed = 1000;
let lastDiv = 1;
let locatoin = 0;
let level = 1;
let score = 0;
let bomb = 0;
let i = 0;
let appers = 0;
let high_score = 0;
let new_bomb_div_index = 5;
let number_of_bomb = 3;
let timer = setInterval(function () {
  ra();
}, speed);

setLevel(level);

function ra() {
  locatoin = Math.round(Math.random() * number_of_bomb);
  do {
    i = Math.round(Math.random() * number_of_bomb);
  } while (lastDiv == i);

  lastDiv = i;

  var images = document.querySelectorAll("img").forEach((e) => {
    e.parentNode.removeChild(e);
  });

  bomb = bomb_location[i];
  if (i === locatoin) {
    set_img("./Imge/good_boomb.png");
    appers++;
  } else {
    set_img("./Imge/bad_boomb.png");
  }
}

function set_img(src) {
  let image_div = document.createElement("img");
  image_div.setAttribute("src", src);
  document.getElementById(bomb.id).appendChild(image_div);
}

$(".btn").click(function () {
  if (level === 5) changeCSS_level_1();
  if (i === locatoin) {
    score = Math.round(1000 / appers + score);
    appers = 0;
    //alert("Good Job, continue");
    if (speed < 500) {
      speed -= 10;
    } else {
      speed -= 100;
    }
    level += 1;
    setLevel(level);
    setScore(score);
    clearInterval(timer);
    timer = setInterval(function () {
      ra();
    }, speed);
  } else {
    if (score >= high_score) high_score = score;
    score = 0;
    alert("ops try again ");
    speed = 1000;
    level = 1;
    setLevel(level);
    setScore(score);
    $("span.high_score").text(high_score);
    //location.reload();
    clearInterval(timer);
    play_again();
  }
});

function changeCSS_level_1() {
  $(".background_img").css("backgroundSize", "100%");
  $(".high_score_div").css("left", "80%");
  let new_div = document.createElement("div");

  for (let i = 0; i < 5; i++) {
    let new_div = document.createElement("div");
    $(new_div).addClass("zone");
    $(new_div).attr("id", "zone-" + new_bomb_div_index);
    document.querySelector(".container").appendChild(new_div);
    new_bomb_div_index++;
    number_of_bomb++;
  }
  $("#zone-1").css("left", "25%");

  $("#zone-2").css("left", "45%");
  $("#zone-2").css("top", "6%");

  $("#zone-3").css("left", "65%");
  $("#zone-3").css("top", "6%");

  $("#zone-4").css("left", "25%");
  $("#zone-4").css("top", "25%");

  $("#zone-5").css("left", "45%");
  $("#zone-5").css("top", "25%");

  $("#zone-6").css("left", "65%");
  $("#zone-6").css("top", "25%");

  $("#zone-7").css("left", "25%");
  $("#zone-7").css("top", "45%");

  $("#zone-8").css("left", "45%");
  $("#zone-8").css("top", "45%");

  $("#zone-9").css("left", "65%");
  $("#zone-9").css("top", "45%");

  speed = 1000;
  bomb_location = document.querySelectorAll(".zone");
}

function play_again() {
  const playAgain_div = document.createElement("div");
  const playAgain_button = document.createElement("button");
  $(playAgain_div).addClass("play_again_div");
  $(playAgain_button).addClass("play_again");
  playAgain_div.appendChild(playAgain_button);
  document.querySelector(".all_buttons").appendChild(playAgain_div);
  const button_span = document.createElement("span");
  $(button_span).addClass("buttonSpan");
  playAgain_button.appendChild(button_span);
  play_again_CSS();
  $(button_span).text("Play again!");
}

function play_again_CSS() {
  play_again_div();
  play_again_button();
}

function play_again_div() {
  $(".play_again_div").css({
    margin: "0 0",
    "margin-top": "10%",
    width: "10%",
    height: "43%",
    "justify-content": "center",
    position: "fixed",
    top: "66%",
    left: "43%",
    "border-style": "solid black",
    "border-width": "2px",
  });
}

function play_again_button() {
  $(".play_again").css({
    width: "100%",
    height: "10%",
    "background-color": "darkgreen",
    color: "white",
    "font-size": "18px",
  });

  $(".play_again_div").click(function () {
    location.reload();
  });
}
