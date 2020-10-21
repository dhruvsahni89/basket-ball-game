var backCanvas = document.getElementById("backCanvas");
var backctx = backCanvas.getContext("2d");
backCanvas.width = window.innerWidth;
backCanvas.height = window.innerHeight;

// backctx.translate(0, 50);

var transX = window.width / 1.8 - 240;
var transY = (2 / 2.8) * window.height;

function drawBackground(backC, ringC) {
  //draw circle
  backctx.beginPath();
  //backctx.fillStyle='#a4b494';
  //backctx.fill();
  backctx.fillStyle = backC;
  backctx.fillRect(0, innerHeight / 2, innerWidth, innerHeight);

  //anglebackground
  backctx.beginPath();
  angleBackgroundDraw(backctx);

  //drawing the torches
  var fire = new Image();
  fire.src = "images/fire.png";
  backctx.drawImage(fire, 425, 100, 100, 200);
  backctx.drawImage(fire, 765, 100, 100, 200);

  backctx.beginPath();
  backctx.translate(backCanvas.width / 1.8, (2 * backCanvas.height) / 2.8);
  backctx.beginPath();
  backctx.fillStyle = ringC;
  backctx.arc(0, 0, 100, 0, 2 * Math.PI);
  backctx.lineWidth = 4;
  backctx.fill();
  backctx.stroke();

  //draw line through circle
  backctx.moveTo(0, 100);
  backctx.lineTo(0, -100);
  backctx.lineWidth = 4;
  backctx.stroke();

  //draw horizontal lines
  backctx.moveTo(0, 100);
  backctx.lineWidth = 4;
  backctx.lineTo(350, 100);
  backctx.stroke();
  backctx.moveTo(0, -100);
  backctx.lineTo(350, -100);
  backctx.stroke();

  //another symmetrical

  //draw circle
  backctx.beginPath();
  backctx.translate(-240, 0);
  backctx.fillStyle = ringC;
  backctx.arc(0, 0, 100, 0, 2 * Math.PI);
  backctx.lineWidth = 4;
  backctx.fill();
  backctx.stroke();

  //draw line through circle
  backctx.moveTo(0, 100);
  backctx.lineTo(0, -100);
  backctx.stroke();

  //draw horizontal lines
  backctx.moveTo(0, 100);
  backctx.lineTo(-350, 100);
  backctx.stroke();
  backctx.moveTo(0, -100);
  backctx.lineTo(-350, -100);
  backctx.stroke();

  //pole
  backctx.beginPath();
  backctx.fillStyle = "red";
  backctx.fillRect(660, 0, 150, 200);
  backctx.fillStyle = "gray";
  backctx.moveTo(733, 0);
  backctx.lineTo(733, -400);
  backctx.lineWidth = 15;
  backctx.strokeStyle = "#2c003e";
  backctx.stroke();

  backctx.beginPath();
  backctx.moveTo(733, -360);
  backctx.lineTo(690, -360);
  backctx.lineCap = "round";
  backctx.lineWidth = 8;
  backctx.strokeStyle = "#2c003e";
  backctx.stroke();

  backctx.beginPath();
  backctx.moveTo(733, -300);
  backctx.lineTo(690, -300);
  backctx.lineCap = "round";
  backctx.lineWidth = 8;
  backctx.strokeStyle = "#2c003e";
  backctx.stroke();

  backctx.beginPath();
  backctx.moveTo(690, -400);
  backctx.lineTo(690, -250);
  backctx.lineCap = "round";
  backctx.lineWidth = 8;
  backctx.strokeStyle = "#2c003e";
  backctx.stroke();

  backctx.beginPath();
  backctx.moveTo(688, -300);
  backctx.lineTo(555, -300);
  backctx.lineCap = "round";
  backctx.lineWidth = 9;
  backctx.strokeStyle = "orange";
  backctx.stroke();

  //net making
  var x = 557;
  var x1 = 567;
  for (var i = 0; i < 5; i++) {
    backctx.beginPath();
    backctx.lineCap = "round";
    backctx.moveTo(x, -300);
    backctx.lineTo(x1, -200);
    backctx.lineWidth = 3;
    backctx.strokeStyle = "white";
    backctx.stroke();
    x = x + 25;
    x1 = x1 + 25;
  }

  var y = 567;
  var y1 = 577;
  for (var i = 0; i < 5; i++) {
    backctx.beginPath();
    backctx.lineCap = "round";
    backctx.moveTo(y, -200);
    backctx.lineTo(y1, -300);
    backctx.lineWidth = 3;
    backctx.strokeStyle = "white";
    backctx.stroke();
    y = y + 25;
    y1 = y1 + 25;
  }
  backctx.translate(-transX, -transY);
}

drawBackground("#c87941", "#87431d");

var x_back = window.width / 1.8 - 240 + 690;
var y_back = (2 / 2.8) * window.height - 400;
var x_hoop = window.width / 1.8 - 240 + 688;
var y_hoop = (2 / 2.8) * window.height - 300;
