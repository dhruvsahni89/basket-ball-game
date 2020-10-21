var width = window.innerWidth;
var height = window.innerHeight;
var keyPressed = false;

//setting up the screen
var screen = {
  canvas: document.getElementById("mainCanvas"),
  setup: function () {
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = this.canvas.getContext("2d");
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

// var ctx = screen.context;

//setting up the basketball
//x=40
//y=3/4*height
function Ball(ballimg, x, y) {
  this.ballimg = ballimg;
  this.x = x;
  this.y = y;
  this.xVel = 0;
  this.yVel = 0;
  this.yAcc = 1;
  this.xpos = x;
  this.ypos = y;
  this.scored = false;
}

Ball.prototype.draw = function () {
  screen.context.drawImage(this.ballimg, this.x, this.y, 100, 100);
};

Ball.prototype.move = function () {
  this.draw();
  this.x += this.xVel;
  this.y -= this.yVel;
  this.yVel -= this.yAcc;
};

Ball.prototype.reset = function () {
  this.x = this.xpos;
  this.y = this.ypos;
  this.draw();
};

Ball.prototype.scoreAnimation = function () {
  this.xVel = 0;
};

//setting up the angle pointer
//x=90
//y=3/4 * canvas.height
function Angle(x, y, context) {
  this.x = x;
  this.y = y;
  this.context = context;
  this.xCenter = 90;
  this.yCenter = (3 / 4) * height + 70;
  this.direction = 1;
}

Angle.prototype.draw = function () {
  ctx = screen.context;
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2.5;
  ctx.moveTo(this.x, this.y + 10);
  ctx.lineTo(90, (6 * height) / 8 + 70);
  ctx.stroke();
};

Angle.prototype.update = function () {
  this.clear();
  this.draw();
  this.x += this.direction;
  this.y += this.direction;
  if (this.y > (3 / 4) * height + 40) {
    this.direction = -1;
  } else if (this.x < 110) {
    this.direction = 1;
  }
};

Angle.prototype.update2 = function () {
  this.clear();
  this.draw();
  this.x += this.direction;
  this.y += this.direction;
  if (this.y > (3 / 4) * height + 40) {
    this.direction = -1;
  } else if (this.x < 100) {
    this.direction = 1;
  }
};

Angle.prototype.clear = function () {
  screen.context.clearRect(20, (3 / 4) * height, 160, (3 / 4) * height + 70);
};

function angleBackgroundDraw(context) {
  context.beginPath();
  context.arc(90, (6 * height) / 8 + 70, 70, 0, Math.PI, true);
  context.closePath();
  var grd = context.createLinearGradient(0, 0, 200, 0);
  grd.addColorStop(0.3, "orange");
  grd.addColorStop(1, "yellow");
  context.lineWidth = 5;
  context.fillStyle = grd;
  context.fill();
  context.strokeStyle = "black";
  context.stroke();
}

function Hoop(x, y, hooplen, backx, backy, backheight) {
  this.x = x;
  this.y = y;
  this.hooplen = hooplen;
  this.backx = backx;
  this.backy = backy;
  this.backheight = backheight;
}

Hoop.prototype.collide = function (x, y) {
  var btx = x + 50;
  var bty = y + 50;
  //backboard collision
  if (
    x + 100 > this.backx &&
    y + 50 > this.backy &&
    y + 50 < this.backy + this.backheight
  ) {
    return 1;
  }
  //hoop front collision
  if (
    x + 75 > this.x - this.hooplen - 10 &&
    x + 75 < this.x - this.hooplen + 10 &&
    y + 80 > this.y - 15 &&
    y + 80 < this.y + 40
  ) {
    return 1;
  }
  //score
  if (
    btx > this.x - this.hooplen &&
    btx < this.x + 27 &&
    bty > this.y - 10 &&
    bty < this.y + 10
  ) {
    return 2;
  }
  if (
    x + 88 > this.x - 15 &&
    x + 88 < this.x + 30 &&
    y + 88 > this.y - 30 &&
    y + 88 < this.y + 30
  ) {
    return 3;
  } else return 0;
};
