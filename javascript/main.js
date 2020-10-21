//setting up the screen, initialising the canvas context
screen.setup();
// screen.context.translate(0, 50);
//drawing angle
var angle = new Angle(90, (3 / 4) * height, backctx);
angle.draw();
var angleid = setInterval(function () {
  angle.update();
}, 35);

//making hoop
//values defined in background.js
var hoop = new Hoop(x_hoop, y_hoop, 133, x_back, y_back, 200);

//drawing ball
var ball;
var imgball = new Image();
imgball.src = "images/ball.png";
imgball.onload = function () {
  ball = new Ball(imgball, 40, (3 / 4) * height - 100);
  ball.draw();
};

//powerpower
var powerMeter;
var power;
var powerbar = document.getElementById("pbarspan");

function spacePress(event) {
  if (event.keyCode == 32 && keyPressed == false && ball.x == ball.xpos) {
    keyPressed = true;
    power = 35;
    powerMeter = setInterval(function () {
      powerbar.innerHTML = power - 34;
      let percentage = (power - 35) * 10;
      powerbar.style.width = 100 - percentage + "%";
      if (power != 45) power += 1;
    }, 200);
  }
}

var shotid;

function spaceRelease(event) {
  if (event.keyCode == 32 && keyPressed == true) {
    keyPressed = false;
    clearInterval(powerMeter);

    //calculating component x and y velocity
    var tan = (angle.yCenter - angle.y) / (angle.x - angle.xCenter);
    ball.xVel = power * Math.cos(Math.atan(tan));
    ball.yVel = power * Math.sin(Math.atan(tan));

    shotid = setInterval(function () {
      screen.clear();
      if (ball.x > width || ball.y > height) {
        ball.reset();
        clearInterval(shotid);
        if (!ball.scored && lvl == 2) {
          clearScore();
        }
        ball.scored = false;
      } else {
        ball.move();
        var collsionStatus = hoop.collide(ball.x, ball.y);
        //score
        if (collsionStatus == 2) {
          ball.scored = true;
          score += 1;
          updateScore();
          ball.x = hoop.x - hoop.hooplen / 2 - 50;
          ball.scoreAnimation();
        }
        if (collsionStatus == 1) {
          ball.xVel *= -1;
          ball.xVel -= 4;
        }
        if (collsionStatus == 3) {
          ball.xVel *= -1;
          ball.yVel *= -1;
        }
      }
    }, 19);
  }
}

var scoretext = document.getElementById("score");
var message = document.getElementById("text");
var score = 0;

function updateScore() {
  scoretext.innerHTML = "score=" + score;
  if (score == 3) {
    message.style.visibility = "visible";
    message.innerHTML = "Amazing!";
  } else if (score == 5) {
    message.innerHTML = "On fire";
  } else if (score == 8) {
    message.innerHTML = "You are OP";
  } else if (score == 10) {
    message.innerHTML = "GG";
    if (lvl == 1) levelchange();
  }
}

function clearScore() {
  score = 0;
  scoretext.innerHTML = "score=" + score;
}

//changing level to 2
var level = document.getElementById("level");
var lvl = 1;
function levelchange() {
  lvl = 2;
  level.innerHTML = "LEVEL-2";
  level.style.color = "rgb(17, 5, 0)";
  backctx.clearRect(0, 0, width, height);
  backCanvas.style.background = "url(images/tree.jpg)";
  backCanvas.style.backgroundSize = "100% 50%";
  score = 0;
  score.innerHTML = "score";
  backctx.clearRect(0, 0, width, height);
  drawBackground("#00416d", "#393b44");
  clearInterval(angleid);
  angleid = setInterval(function () {
    angle.update2();
  }, 27);
}
