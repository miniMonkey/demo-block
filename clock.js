var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RAIDUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

var curDate = new Date();

var balls = [];
const colors = ["#33b5e5", "#0099cc", "#aa66cc", "#9933cc", "#99cc00", "#669900", "#ffbb33", "#ff8800", "#ff4444", "#cc0000"];

window.onload = function() {
	WINDOW_WIDTH = document.body.clientWidth;
	WINDOW_HEIGHT = document.body.clientHeight;
	RAIDUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1;
	MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);
	MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);

	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;

	setInterval(function() {
		render(context);
		update();
	}, 50);
}

function update() {
	var nextDate = new Date();
	var curHours = curDate.getHours() < 10 ? "0" + curDate.getHours() : curDate.getHours();
	var curMinutes = curDate.getMinutes() < 10 ? "0" + curDate.getMinutes() : curDate.getMinutes();
	var curSeconds = curDate.getSeconds() < 10 ? "0" + curDate.getSeconds() : curDate.getSeconds();

	var nextHours = nextDate.getHours() < 10 ? "0" + nextDate.getHours() : nextDate.getHours();
	var nextMinutes = nextDate.getMinutes() < 10 ? "0" + nextDate.getMinutes() : nextDate.getMinutes();
	var nextSeconds = nextDate.getSeconds() < 10 ? "0" + nextDate.getSeconds() : nextDate.getSeconds();

	if (curSeconds != nextSeconds) {
		if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
			addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(nextHours / 10));
		}

		if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
			addBalls(MARGIN_LEFT + 15 * (RAIDUS + 1), MARGIN_TOP, parseInt(nextHours % 10));
		}

		if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
			addBalls(MARGIN_LEFT + 39 * (RAIDUS + 1), MARGIN_TOP, parseInt(nextMinutes / 10));
		}

		if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
			addBalls(MARGIN_LEFT + 54 * (RAIDUS + 1), MARGIN_TOP, parseInt(nextMinutes % 10));
		}

		if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
			addBalls(MARGIN_LEFT + 78 * (RAIDUS + 1), MARGIN_TOP, parseInt(nextSeconds / 10));
		}

		if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
			addBalls(MARGIN_LEFT + 93 * (RAIDUS + 1), MARGIN_TOP, parseInt(nextSeconds % 10));
		}
		curDate = nextDate;
	}

	updateBalls();
}

function updateBalls() {
	for (var i = 0; i < balls.length; i++) {
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;

		if (balls[i].y >= WINDOW_HEIGHT - RAIDUS) {
			balls[i].y = WINDOW_HEIGHT - RAIDUS;
			balls[i].vy = - balls[i].vy * 0.7;
		}

		if (balls[i].x >= WINDOW_WIDTH - RAIDUS) {
			balls[i].x = WINDOW_WIDTH - RAIDUS;
			balls[i].vx = - balls[i].vx;
		}
 	}

 	var cnt = 0;
 	for(var i = 0; i < balls.length; i++) {
 		if (balls[i].x + RAIDUS > 0 && balls[i].x - RAIDUS < WINDOW_WIDTH) {
 			balls[cnt++] = balls[i];
 		}
 	}

 	while(balls.length > 700) {
 		balls.pop();
 	}
}

function addBalls(x, y, num) {
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if (digit[num][i][j] == 1) {
				var aBall = {
					x: x + j * 2 * (RAIDUS + 1) + (RAIDUS + 1), // 起始X
					y: y + i * 2 * (RAIDUS + 1) + (RAIDUS + 1), // 起始Y
					g: 1.5 + Math.random(), // 加速度
					vx: Math.pow(-1, Math.ceil(Math.random()*1000)) * 5, // 随机正负5
					vy: -5,
					color: colors[Math.floor(Math.random() * colors.length)]
				}

				balls.push(aBall);
			}
		}
	}
}

function render(cxt) {
	cxt.clearRect(0, 0, cxt.canvas.width, cxt.canvas.height);

	var hours = curDate.getHours() < 10 ? "0" + curDate.getHours() : curDate.getHours();
	var minutes = curDate.getMinutes() < 10 ? "0" + curDate.getMinutes() : curDate.getMinutes();
	var seconds = curDate.getSeconds() < 10 ? "0" + curDate.getSeconds() : curDate.getSeconds();

	renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt);
	renderDigit(MARGIN_LEFT + 15 * (RAIDUS + 1), MARGIN_TOP, parseInt(hours % 10), cxt);
	renderDigit(MARGIN_LEFT + 30 * (RAIDUS + 1), MARGIN_TOP, 10, cxt);
	renderDigit(MARGIN_LEFT + 39 * (RAIDUS + 1), MARGIN_TOP, parseInt(minutes / 10), cxt);
	renderDigit(MARGIN_LEFT + 54 * (RAIDUS + 1), MARGIN_TOP, parseInt(minutes % 10), cxt);
	renderDigit(MARGIN_LEFT + 69 * (RAIDUS + 1), MARGIN_TOP, 10, cxt);
	renderDigit(MARGIN_LEFT + 78 * (RAIDUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt);
	renderDigit(MARGIN_LEFT + 93 * (RAIDUS + 1), MARGIN_TOP, parseInt(seconds % 10), cxt);

	for (var i = 0; i < balls.length; i++) {
		cxt.fillStyle = balls[i].color;

		cxt.beginPath();
		cxt.arc(balls[i].x, balls[i].y, RAIDUS, 0, 2 * Math.PI, true);
		cxt.closePath();

		cxt.fill();
	}
}

function renderDigit(x, y, num, cxt) {
	cxt.fillStyle = "rgb(0, 102, 153)";

	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if (digit[num][i][j] == 1) {
				cxt.beginPath();
				cxt.arc(
					x + j * 2 * (RAIDUS + 1) + (RAIDUS + 1), // 起始X
					y + i * 2 * (RAIDUS + 1) + (RAIDUS + 1), // 起始Y
					RAIDUS, // 半径
					0, // 起始圈
					2 * Math.PI // 终止圈
				);
				cxt.closePath();

				cxt.fill()
			}
		}
	}
}
