var sun = new Image();
var moon = new Image();
var earth = new Image();
var canvasB;
var ctxA;
var raf;
var running = false;

var ball;
var userBlock;
var blocks;
var numOfRows;
var numOfCols;
var blockWidth;
var blockHeight;
var blockColors;
var offSet;
var Left;

function init(){
	draw();
  	sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
  	moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
  	earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';
	window.requestAnimationFrame(drawA);
	canvasB = document.getElementById('breakOut');
	ctxA = canvasB.getContext('2d');
	blockColors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
	offSet = 50;
	numOfRows = 7;
	blockWidth = 50;
	blockHeight = 15;
	numOfCols = Math.floor(canvasB.width / blockWidth);
	blocks = new Array(numOfRows);
	for(var i = 0; i < blocks.length; i++){
		blocks[i] = new Array(numOfCols);
		for(var a = 0; a < blocks[i].length; a++){
			blocks[i][a] = {
  						x: blockWidth * a,
  						y: blockHeight * i + offSet,
						width: blockWidth,
						height: blockHeight,
  						color: blockColors[i],
  						draw: function() {
								ctxA.fillStyle = this.color;
    								ctxA.fillRect (this.x, this.y, this.width, this.height);
  						},
						checkCollision: function(ball){
								if (ball.y + ball.radius > this.y && ball.y + ball.radius < this.y + this.height && ball.x + ball.vx < this.x + this.width && ball.x + ball.vx > this.x){
									if(ball.y + ball.vy > this.y && ball.y + ball.vy < this.y + this.height){
  										ball.vx = -ball.vx;
									}else if(ball.x + ball.vx < this.x + this.width && ball.x + ball.vx > this.x){
  										ball.vy = -ball.vy;
									}else{
  										ball.vx = -ball.vx;
  										ball.vy = -ball.vy;
									}
									return true;
								}
								return false;
						}
			};
			blocks[i][a].draw();
		}
	}
	ball = {
  		x: 100,
  		y: numOfRows * blockHeight + offSet + 50,
  		vx: 5,
  		vy: 2,
  		radius: 10,
  		color: 'blue',
  		draw: function() {
    					ctxA.beginPath();
    					ctxA.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
    					ctxA.closePath();
    					ctxA.fillStyle = this.color;
    					ctxA.fill();
  		}
	};
	userBlock = {
  		x: 1,
  		y: 375,
		width: 50,
		height: 15,
  		color: 'red',
  		draw: function() {
					ctxA.fillStyle = this.color;
    					ctxA.fillRect (this.x, this.y, this.width, this.height);
  		},
		checkCollision: function(ball){
					if ((ball.y + ball.vy + ball.radius > this.y && ball.y + ball.vy - ball.radius < userBlock.y + this.height) && ball.x + ball.vx - ball.radius < this.x + this.width && ball.x + ball.vx + ball.radius > this.x){
  						ball.vy = -ball.vy;
					}
					if (ball.y + ball.vy + ball.radius > this.y && ball.y + ball.vy - ball.radius < userBlock.y + userBlock.height && (ball.x + ball.vx - ball.radius == this.x + this.width || ball.x + ball.vx + ball.radius == this.x)) {
  						ball.vx = -ball.vx;
					}
		}
	};
	Left = canvasB.offsetLeft + userBlock.width / 2;
	canvasB.addEventListener('mouseover', function(e){
  		//raf = window.requestAnimationFrame(breakOutAnimation);
	});

	canvasB.addEventListener("mouseout",function(e){
  		window.cancelAnimationFrame(raf);
		running = false;
	});
	canvasB.addEventListener("click",function(e){
  		if (!running) {
  			ball.x = 100;
  			ball.y = numOfRows * blockHeight + offSet + 50;
  			ball.vx = 5;
  			ball.vy = 2;
			blocks = new Array(numOfRows);
			for(var i = 0; i < blocks.length; i++){
				blocks[i] = new Array(numOfCols);
				for(var a = 0; a < blocks[i].length; a++){
					blocks[i][a] = {
  								x: blockWidth * a,
  								y: blockHeight * i + offSet,
								width: blockWidth,
								height: blockHeight,
  								color: blockColors[i],
  								draw: function() {
										ctxA.fillStyle = this.color;
    										ctxA.fillRect (this.x, this.y, this.width, this.height);
  								},
								checkCollision: function(ball){
										if (ball.y + ball.vy + ball.radius >= this.y && ball.y + ball.vy - ball.radius <= this.y + this.height && ball.x + ball.vx - ball.radius <= this.x + this.width && ball.x + ball.vx + ball.radius >= this.x){
											if(ball.vy >= 0 && ball.vx >= 0){
												if(ball.y > this.y){
  													ball.vx = -ball.vx;
												}else if(ball.x > this.x){
  													ball.vy = -ball.vy;
												}else{
  													ball.vx = -ball.vx;
  													ball.vy = -ball.vy;
												}
											}else if(ball.vy < 0 && ball.vx >= 0){
												if(ball.y <= this.y + this.height){
  													ball.vx = -ball.vx;
												}else if(ball.x > this.x){
  													ball.vy = -ball.vy;
												}else{
  													ball.vx = -ball.vx;
  													ball.vy = -ball.vy;
												}
											}else if(ball.vy >= 0 && ball.vx < 0){
												if(ball.y > this.y){
  													ball.vx = -ball.vx;
												}else if(ball.x <= this.x + this.width){
  													ball.vy = -ball.vy;
												}else{
  													ball.vx = -ball.vx;
  													ball.vy = -ball.vy;
												}
											}else if(ball.vy < 0 && ball.vx < 0){
												if(ball.y <= this.y + this.height){
  													ball.vx = -ball.vx;
												}else if(ball.x <= this.x + this.width){
  													ball.vy = -ball.vy;
												}else{
  													ball.vx = -ball.vx;
  													ball.vy = -ball.vy;
												}
											}else{
  												ball.vx = -ball.vx;
  												ball.vy = -ball.vy;
											}
											return true;
										}
										return false;
								}
					};
					blocks[i][a].draw();
				}
			}
    			raf = window.requestAnimationFrame(breakOutAnimation);
    			running = true;
  		}
	});
	canvasB.addEventListener('mousemove', function(e){
  		if (running) {
    			clear(canvasB);
    			userBlock.x = e.clientX - Left;
    			ball.draw();
			userBlock.draw();
  		}
	});
	ball.draw();
	userBlock.draw();
}

function clear(canvas) {
	ctxA.fillStyle = 'rgba(255,255,255,0.3)';
	ctxA.fillRect(0,0,canvas.width,canvas.height);
}

function breakOutAnimation() {
  	ctxA.clearRect(0,0, canvasB.width, canvasB.height);
	for(var i = 0; i < blocks.length; i++){
		for(var a = 0; a < blocks[i].length; a++){
			blocks[i][a].draw();
		}
	}
	userBlock.draw();
  	ball.draw();
  	ball.x += ball.vx;
  	ball.y += ball.vy;
	////////////////
	// Boundaries //
	////////////////
	if (ball.y + ball.vy - ball.radius > canvasB.height) {
		ctxA.font = "48px serif";
		ctxA.textBaseline = "hanging";
		ctxA.strokeText("You Failed", canvasB.width / 4, canvasB.height / 2);
		running = false;
	}
	if(ball.y + ball.vy - ball.radius < 0){
  		ball.vy = -ball.vy;
	}
	if (ball.x + ball.vx + ball.radius > canvasB.width || ball.x + ball.vx - ball.radius < 0) {
  		ball.vx = -ball.vx;
	}
	
	userBlock.checkCollision(ball);
	for(var i = 0; i < blocks.length; i++){
		for(var a = 0; a < blocks[i].length; a++){
			if(blocks[i][a].checkCollision(ball)){
				blocks[i].splice(a, 1);
				if(blocks[i].length == 0){
					blocks.splice(i, 1);
					break;
				}
			}
		}
	}
	if(blocks.length == 0){
		ctxA.font = "48px serif";
		ctxA.textBaseline = "hanging";
		ctxA.strokeText("You Won", canvasB.width / 4, canvasB.height / 2);
		running = false;
	}
	/////////////////////////////////////
	// Either continue running or stop //
	/////////////////////////////////////
	if(running){
  		raf = window.requestAnimationFrame(breakOutAnimation);
	}else{
  		window.cancelAnimationFrame(raf);
	}
}
///////////////////////////////////////
// Example drawings that do not move //
///////////////////////////////////////
function draw(){
	var canvas = document.getElementById('mainCanvas');
	var ctx = canvas.getContext('2d');
	
	ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect (10, 10, 55, 50);

        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect (30, 30, 55, 50);

        ctx.fillStyle = "rgba(0, 200, 0, 0.5)";
        ctx.fillRect (70, 0, 55, 50);

        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
	ctx.fillRect(125,125,100,100);
    	ctx.clearRect(145,145,60,60);
    	ctx.strokeRect(150,150,50,50);

    	var path=new Path2D();
    	path.moveTo(175,50);
    	path.lineTo(200,75);
    	path.lineTo(200,25);
    	ctx.fill(path);

	var pathA=new Path2D();
	pathA.arc(275,75,50,0,Math.PI*2,true); // Outer circle
    	pathA.moveTo(310,75);
    	pathA.arc(275,75,35,0,Math.PI,false);  // Mouth (clockwise)
    	pathA.moveTo(265,65);
    	pathA.arc(260,65,5,0,Math.PI*2,true);  // Left eye
    	pathA.moveTo(295,65);
    	pathA.arc(290,65,5,0,Math.PI*2,true);  // Right eye
    	ctx.stroke(pathA);

	// Filled triangle
    	var ftriangle=new Path2D();
    	ftriangle.moveTo(25,125);
    	ftriangle.lineTo(105,125);
    	ftriangle.lineTo(25,205);
    	ctx.fill(ftriangle);

    	// Stroked triangle
    	var striangle=new Path2D();
    	striangle.moveTo(125,225);
    	striangle.lineTo(125,145);
    	striangle.lineTo(45,225);
    	striangle.closePath();
    	ctx.stroke(striangle);
}
////////////////////////////////
// Animation for solar system //
////////////////////////////////
function drawA() {
  	var ctx = document.getElementById('solarSystem').getContext('2d');

  	ctx.globalCompositeOperation = 'destination-over';
  	ctx.clearRect(0,0,300,300); // clear canvas

  	ctx.fillStyle = 'rgba(0,0,0,0.4)';
  	ctx.strokeStyle = 'rgba(0,153,255,0.4)';
  	ctx.save();
  	ctx.translate(150,150);

  	// Earth
  	var time = new Date();
  	ctx.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() );
  	ctx.translate(105,0);
  	ctx.fillRect(0,-12,50,24); // Shadow
  	ctx.drawImage(earth,-12,-12);

  	// Moon
  	ctx.save();
  	ctx.rotate( ((2*Math.PI)/6)*time.getSeconds() + ((2*Math.PI)/6000)*time.getMilliseconds() );
  	ctx.translate(0,28.5);
  	ctx.drawImage(moon,-3.5,-3.5);
  	ctx.restore();

  	ctx.restore();
  
  	ctx.beginPath();
  	ctx.arc(150,150,105,0,Math.PI*2,false); // Earth orbit
  	ctx.stroke();
 	
  	ctx.drawImage(sun,0,0,300,300);

  	window.requestAnimationFrame(drawA);
}