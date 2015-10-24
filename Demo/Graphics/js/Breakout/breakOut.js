var BreakOutBlocks = function(startX, startY, startWidth, startHeight, startColor, startCtx){
  	var x = startX;
  	var y = startY;
	var width = startWidth;
	var height = startHeight;
  	var color = startColor;
	var ctx = startCtx;
  	this.draw = function() {
		ctx.fillStyle = color;
    		ctx.fillRect (x, y, width, height);
  	}
	this.checkCollision = function(ball){
		if (ball.getY() + ball.getVY() + ball.getRadius() >= y && ball.getY() + ball.getVY() - ball.getRadius() <= y + height && ball.getX() + ball.getVX() - ball.getRadius() <= x + width && ball.getX() + ball.getVX() + ball.getRadius() >= x){
			if(ball.getVY() >= 0 && ball.getVX() >= 0){
				if(ball.getY() > y){
  					ball.setVX(-ball.getVX());
				}else if(ball.getX() > x){
  					ball.setVY(-ball.getVY());
				}else{
  					ball.setVX(-ball.getVX());
  					ball.setVY(-ball.getVY());
				}
			}else if(ball.getVY() < 0 && ball.getVX() >= 0){
				if(ball.getY() <= y + height){
  					ball.setVX(-ball.getVX());
				}else if(ball.getX() > x){
  					ball.setVY(-ball.getVY());
				}else{
  					ball.setVX(-ball.getVX());
  					ball.setVY(-ball.getVY());
				}
			}else if(ball.getVY() >= 0 && ball.getVX() < 0){
				if(ball.getY() > y){
  					ball.setVX(-ball.getVX());
				}else if(ball.getX() <= x + width){
  					ball.setVY(-ball.getVY());
				}else{
  					ball.setVX(-ball.getVX());
  					ball.setVY(-ball.getVY());
				}
			}else if(ball.getVY() < 0 && ball.getVX() < 0){
				if(ball.getY() <= y + height){
  					ball.setVX(-ball.getVX());
				}else if(ball.getX() <= x + width){
  					ball.setVY(-ball.getVY());
				}else{
  					ball.setVX(-ball.getVX());
  					ball.setVY(-ball.getVY());
				}
			}else{
  				ball.setVX(-ball.getVX());
  				ball.setVY(-ball.getVY());
			}
			return true;
		}
		return false;
	}
}
var UserBlock = function(startX, startY, startWidth, startHeight, startColor, startCtx){
  	var x = startX;
  	var y = startY;
	var width = startWidth;
	var height = startHeight;
  	var color = startColor;
	var ctx = startCtx;
	this.setX = function(newX){
		x = newX;
	}
	this.getX = function(){
		return x;
	}
	this.getWidth = function(){
		return width;
	}
  	this.draw = function() {
		ctx.fillStyle = color;
    		ctx.fillRect (x, y, width, height);
  	}
	this.checkCollision = function(ball){
		if ((ball.getY() + ball.getVY() + ball.getRadius() > y && ball.getY() + ball.getVY() - ball.getRadius() < y + height) && ball.getX() + ball.getVX() - ball.getRadius() < x + width && ball.getX() + ball.getVX() + ball.getRadius() > x){
  			ball.setVY(-ball.getVY());
		}
		if (ball.getY() + ball.getVY() + ball.getRadius() > y && ball.getY() + ball.getVY() - ball.getRadius() < y + height && (ball.getX() + ball.getVX() - ball.getRadius() == x + width || ball.getX() + ball.getVX() + ball.getRadius() == x)) {
  			ball.setVX(-ball.getVX());
		}
	}
}
var Ball = function(startX, startY, startVX, startVY, startRadius, startColor, StartCtx){
	var x = startX;
	var y = startY;
	var vx = startVX;
	var vy = startVY;
	var radius = startRadius;
	var color = startColor;
	var ctx = StartCtx;	
	
	this.getX = function(){
		return x;
	}
	this.getY = function(){
		return y;
	}
	this.getVX = function(){
		return vx;
	}
	this.getVY = function(){
		return vy;
	}
	this.getRadius = function(){
		return radius;
	}
	this.setX = function(newX){
		x = newX;
	}
	this.setY = function(newY){
		y = newY;
	}
	this.setVX = function(newVX){
		vx = newVX;
	}
	this.setVY = function(newVY){
		vy = newVY;
	}
	this.setRadius = function(newRadius){
		radius = newRadius;
	}
	this.draw = function(){
		ctx.beginPath();
    		ctx.arc(x, y, radius, 0, Math.PI*2, true);
    		ctx.closePath();
    		ctx.fillStyle = color;
    		ctx.fill();
	}
}
var BreakOut = function(elementId){
	var canvas = document.getElementById(elementId);
	var running = false;
	var ctx = canvas.getContext('2d');
	var raf;
	var numOfRows = 7;
	var blockWidth = 50;
	var blockHeight = 15;
	var numOfCols = Math.floor(canvas.width / blockWidth);
	var blockColors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
	var offSet = 50;
	var ball = new Ball(100, numOfRows * blockHeight + offSet + 50, 5, 2, 10, 'blue', ctx);
	var userBlock = new UserBlock(1, 375, blockWidth, blockHeight, 'red', ctx);
	var Left = canvas.offsetLeft + userBlock.getWidth() / 2;
	ball.draw();
	userBlock.draw();
	var blocks = new Array(numOfRows);
	for(var i = 0; i < blocks.length; i++){
		blocks[i] = new Array(numOfCols);
		for(var a = 0; a < blocks[i].length; a++){
			blocks[i][a] = new BreakOutBlocks(blockWidth * a,blockHeight * i + offSet, blockWidth, blockHeight, blockColors[i], ctx);
			blocks[i][a].draw();
		}		
	}
	function breakOutAnimation() {
  		ctx.clearRect(0,0, canvas.width, canvas.height);
		for(var i = 0; i < blocks.length; i++){
			for(var a = 0; a < blocks[i].length; a++){
				blocks[i][a].draw();
			}
		}
		userBlock.draw();
  		ball.draw();
	
  		ball.setX(ball.getX() + ball.getVX());
  		ball.setY(ball.getY() + ball.getVY());
		////////////////
		// Boundaries //
		////////////////
		if (ball.getY() + ball.getVY() - ball.getRadius() > canvas.height) {
			ctx.font = "48px serif";
			ctx.textBaseline = "hanging";
			ctx.strokeText("You Failed", canvas.width / 4, canvas.height / 2);
			running = false;
		}
		if(ball.getY() + ball.getVY() - ball.getRadius() < 0){
  			ball.setVY(-ball.getVY());
		}
		if (ball.getX() + ball.getVX() + ball.getRadius() > canvas.width || ball.getX() + ball.getVX() - ball.getRadius() < 0) {
  			ball.setVX(-ball.getVX());
		}
	
		userBlock.checkCollision(ball);
		for(var i = 0; i < blocks.length; i++){
			for(var a = 0; a < blocks[i].length; a++){
				if(blocks[i][a].checkCollision(ball)){
					blocks[i].splice(a, 1);
					if(blocks[i].length == 0){
						blocks.splice(i, 1);
						if(ball.getVX() >= 0){
							ball.setVX(ball.getVX() + .5);
						}else{
							ball.setVX(ball.getVX() - .5);
						}
						if(ball.getVY() >= 0){
							ball.setVY(ball.getVY() + .5);
						}else{
							ball.setVY(ball.getVY() - .5);
						}
						break;
					}
				}
			}
		}
		if(blocks.length == 0){
			ctx.font = "48px serif";
			ctx.textBaseline = "hanging";
			ctx.strokeText("You Won", canvas.width / 4, canvas.height / 2);
			running = false;
		}
		/////////////////////////////////////
		// Either continue running or stop //
		/////////////////////////////////////
		if(running){
  			raf = window.requestAnimationFrame(function(){breakOutAnimation();});
		}else{
  			window.cancelAnimationFrame(raf);
		}
	}
	canvas.addEventListener("mouseout",function(e){
  		window.cancelAnimationFrame(raf);
		running = false;
	});
	canvas.addEventListener("click",function(e){
  		if (!running) {
  			ball.setX(100);
  			ball.setY(numOfRows * blockHeight + offSet + 50);
  			ball.setVX(5);
  			ball.setVY(2);
			blocks = new Array(numOfRows);
			for(var i = 0; i < blocks.length; i++){
				blocks[i] = new Array(numOfCols);
				for(var a = 0; a < blocks[i].length; a++){
					blocks[i][a] = new BreakOutBlocks(blockWidth * a,blockHeight * i + offSet, blockWidth, blockHeight, blockColors[i], ctx);
					blocks[i][a].draw();
				}
			}
    			raf = window.requestAnimationFrame(function(){breakOutAnimation();});
    			running = true;
		}
	});
	canvas.addEventListener('mousemove', function(e){
  		if (running) {
			ctx.fillStyle = 'rgba(255,255,255,0.3)';
			ctx.fillRect(0,0,canvas.width,canvas.height);
    			userBlock.setX(e.clientX - Left);
    			ball.draw();
			userBlock.draw();
  		}
	});
}