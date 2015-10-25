function Asteriods(elementId){
	var canvas = document.getElementById(elementId);
	var ctx = canvas.getContext('2d');
	var running = false;
	var raf;
	var laserBeams = new Array();
	var numOfAsteriods = 7;
	var largeAsteriods = 0;
	var mediumAsteriods = 1;
	var smallAsteriods = 2;
	var asteriods = new Array(3);
	asteriods[largeAsteriods] = new Array();
	asteriods[mediumAsteriods] = new Array();
	asteriods[smallAsteriods] = new Array();	
	var Left = canvas.offsetLeft;
	var Top = canvas.offsetTop;
	var spaceShip;
	var stars = new Array(25);
	var gameOver = true;
	
	function init(){
		gameOver = false;
  		ctx.clearRect(0,0, canvas.width, canvas.height);
		ctx.fillStyle = 'rgba(0,0,0,255)';
		ctx.fillRect(0,0,canvas.width,canvas.height);
		asteriods[largeAsteriods] = new Array();
		asteriods[mediumAsteriods] = new Array();
		asteriods[smallAsteriods] = new Array();
		spaceShip = new SpaceShip(canvas.width  / 2, canvas.height / 2, 10, 5, ctx);
		spaceShip.draw(300);

		for(var i = 0; i < stars.length; i++){
			stars[i] = new Star(Math.floor(Math.random() * canvas.width) + 1, Math.floor(Math.random() * canvas.height) + 1, 5, 7, .5, 1, ctx);
			stars[i].draw(Math.floor(Math.floor(Math.random() * 90) + 1));	
		}
		for(i = 0; i < numOfAsteriods; i++){
			var notFound = true;
			var tmp = {};
			while(notFound){
				notFound = false;
				tmp = new LargeAsteriod(Math.floor(Math.random() * canvas.width) + 1, Math.floor(Math.random() * canvas.height) + 1, Math.floor(Math.floor(Math.random() * 360) + 1), ctx);
				for(var index = 0; index < asteriods[largeAsteriods].length; index++){
					if(tmp.detectAsteriodCollision(asteriods[largeAsteriods][index]) || tmp.detectSpaceShipCollision(spaceShip.getHitBox())){
						notFound = true;
						break;
					}
				}
				asteriods[largeAsteriods][i] = tmp;
				asteriods[largeAsteriods][i].name = i;
			}
			asteriods[largeAsteriods][i].draw();
		}
	}
	init();

	////////////////
	// Draw frame //
	////////////////
	function asteriodAnimation(){
  		ctx.clearRect(0,0, canvas.width, canvas.height);
		ctx.fillStyle = 'rgba(0,0,0,255)';
		ctx.fillRect(0,0,canvas.width,canvas.height);
		spaceShip.reDraw();
		for(var i = 0; i < stars.length; i++){
			stars[i].reDraw();
		}
		for(i = 0; i < laserBeams.length; i++){
			if(laserBeams[i].getTimeOut() > 0){
				laserBeams[i].moveForward();
				laserBeams[i].draw();
			}else{
				laserBeams.splice(i, 1);
			}
		}

		for(var currentArray = 0; currentArray < asteriods.length; currentArray++){
			for(i = 0; i < asteriods[currentArray].length; i++){
				asteriods[currentArray][i].draw();
			}
		}
		//////////////////////////
		// Check for collisions //
		//////////////////////////
		for(var currentArray = 0; currentArray < asteriods.length; currentArray++){
			for(i = 0; i < asteriods[currentArray].length; i++){
				if(asteriods[currentArray][i].detectSpaceShipCollision(spaceShip.getHitBox())){
					ctx.font = "48px serif";
					ctx.textBaseline = "hanging";
      					ctx.strokeStyle = 'red';
					ctx.strokeText("You Ran Into An Asteriod", canvas.width / 4, canvas.height / 2);
					running = false;
					gameOver = true;
				}
				if(asteriods[currentArray][i].x + asteriods[currentArray][i].radius < 0){
					asteriods[currentArray][i].x = canvas.width + asteriods[currentArray][i].radius;
				}else if(asteriods[currentArray][i].x - asteriods[currentArray][i].radius > canvas.width){
					asteriods[currentArray][i].x =  -asteriods[currentArray][i].radius;
				}
				if(asteriods[currentArray][i].y + asteriods[currentArray][i].radius < 0){
					asteriods[currentArray][i].y = canvas.height + asteriods[currentArray][i].radius;
				}else if(asteriods[currentArray][i].y - asteriods[currentArray][i].radius > canvas.height){
					asteriods[currentArray][i].y = -asteriods[currentArray][i].radius;
				}
				for(var index = 0; index < asteriods.length; index++){
					for(var subArray = 0; subArray < asteriods[index].length; subArray++){
						if(!(currentArray == index && i == subArray)){
							asteriods[currentArray][i].detectAsteriodCollision(asteriods[index][subArray]);
						}
					}
				}
			}
		}
		if(spaceShip.getX() < 0){
			spaceShip.setX(canvas.width);
		}else if(spaceShip.getX() > canvas.width){
			spaceShip.setX(0);
		}
		if(spaceShip.getY() < 0){
			spaceShip.setY(canvas.height);
		}else if(spaceShip.getY() > canvas.height){
			spaceShip.setY(0);
		}
		for(i = 0; i < laserBeams.length; i++){
			if(laserBeams[i].getX() < 0){
				laserBeams[i].setX(canvas.width);
			}else if(laserBeams[i].getX() > canvas.width){
				laserBeams[i].setX(0);
			}
			if(laserBeams[i].getY() < 0){
				laserBeams[i].setY(canvas.height);
			}else if(laserBeams[i].getY() > canvas.height){
				laserBeams[i].setY(0);
			}
			if(laserBeams[i].detectCollisionWithSpaceShip(spaceShip.getHitBox())){
				ctx.font = "48px serif";
				ctx.textBaseline = "hanging";
      				ctx.strokeStyle = 'red';
				ctx.strokeText("You Shot Yourself", canvas.width / 4, canvas.height / 2);
				running = false;
				gameOver = true;
			}
			var noHit = true;
			var index = 0;
			while(noHit && index < asteriods.length){
				var asteriodIndex = 0;
				while(noHit && asteriodIndex < asteriods[index].length){
					if(laserBeams[i].detectCollisionWithAsteriod(asteriods[index][asteriodIndex])){
						noHit = false;
						if(index == largeAsteriods){
							asteriods[mediumAsteriods].push(new MediumAsteriod(asteriods[index][asteriodIndex].x + asteriods[index][asteriodIndex].radius / 2, asteriods[index][asteriodIndex].y + asteriods[index][asteriodIndex].radius / 2, Math.floor(Math.floor(Math.random() * 360) + 1), ctx));
							asteriods[mediumAsteriods].push(new MediumAsteriod(asteriods[index][asteriodIndex].x - asteriods[index][asteriodIndex].radius / 2, asteriods[index][asteriodIndex].y - asteriods[index][asteriodIndex].radius / 2, Math.floor(Math.floor(Math.random() * 360) + 1), ctx));
							asteriods[index].splice(asteriodIndex, 1);
						}else if(index == mediumAsteriods){
							asteriods[smallAsteriods].push(new SmallAsteriod(asteriods[index][asteriodIndex].x + asteriods[index][asteriodIndex].radius / 2, asteriods[index][asteriodIndex].y + asteriods[index][asteriodIndex].radius / 2, Math.floor(Math.floor(Math.random() * 360) + 1), ctx));
							asteriods[smallAsteriods].push(new SmallAsteriod(asteriods[index][asteriodIndex].x - asteriods[index][asteriodIndex].radius / 2, asteriods[index][asteriodIndex].y - asteriods[index][asteriodIndex].radius / 2, Math.floor(Math.floor(Math.random() * 360) + 1), ctx));
							asteriods[index].splice(asteriodIndex, 1);
						}else if(index == smallAsteriods){
							asteriods[index].splice(asteriodIndex, 1);
						}
						laserBeams.splice(i, 1);
					}
					asteriodIndex++
				}
				index++;
			}
			///////////////////////////////////////////
			// Check if there are any asteriods left //
			///////////////////////////////////////////
			if(asteriods[largeAsteriods].length == 0 && asteriods[mediumAsteriods].length == 0 && asteriods[smallAsteriods].length == 0){
				ctx.font = "48px serif";
				ctx.textBaseline = "hanging";
      				ctx.fillstroke = 'red';
				ctx.strokeText("You Did It", canvas.width / 4, canvas.height / 2);
				running = false;
				gameOver = true;
			}
		}
		/////////////////////////////////////
		// Either continue running or stop //
		/////////////////////////////////////
		if(running){
  			raf = window.requestAnimationFrame(function(){asteriodAnimation();});
		}else{
  			window.cancelAnimationFrame(raf);
		}
	}

	canvas.addEventListener("dblclick",function(e){
  		if (!running) {
			if(gameOver){
				init();
			}else{
				for(var i = 0; i < stars; i++){
					stars[i].reDraw();
				}
    				raf = window.requestAnimationFrame(function(){asteriodAnimation();});
			}
    			running = true;
		}else{
  			window.cancelAnimationFrame(raf);
			running = false;
		}
	});

	canvas.addEventListener("click", function(e){
  		if (running) {
			laserBeams.push(new LaserBeam(spaceShip.getX(), spaceShip.getY(), spaceShip.getWidth(), spaceShip.getLength(), spaceShip.getDirectionAngle(), 5, .5, ctx));
			laserBeams[laserBeams.length - 1].draw();
		}
	});

	canvas.addEventListener("keypress", function(e){
		alert('hi');
	});

	canvas.addEventListener("contextmenu", function(e){
		e.preventDefault();
    		spaceShip.moveForward();
    		spaceShip.reDraw();
    		return false;
	}, false);

	canvas.addEventListener('mousemove', function(e){
  		if (running) {
  			ctx.clearRect(0,0, canvas.width, canvas.height);
			ctx.fillStyle = 'rgba(0,0,0,255)';
			for(var i = 0; i < stars.length; i++){
				stars[i].reDraw();
			}
			for(var i = 0; i < asteriods.length; i++){
				for(var index = 0; index < asteriods[i].length; index++){
					//asteriods[i][index].draw();
				}
			}
			var adjacentSide = e.pageY - Top - spaceShip.getY();
			var oppositeSide = e.pageX - Left - spaceShip.getX();
			var hypnoteuse = Math.sqrt(adjacentSide * adjacentSide + oppositeSide * oppositeSide);
			var degree = Math.abs(Math.atan(oppositeSide / adjacentSide) * (180 / Math.PI));
			if(adjacentSide > 0 && oppositeSide >= 0){
				degree = 180 - degree;
			}else if(adjacentSide > 0 && oppositeSide < 0){
				degree += 180;
			}else if(adjacentSide <= 0 && oppositeSide < 0){
				degree = 360 - degree;
			}
			spaceShip.draw(degree);
  		}
	});
}
function LaserBeam(passX, passY, passSpaceShipWidth, passSpaceShipLength, passDirectionAngle, passWidth, passHeight, passCtx){
	var timeOut = 70;
	var ctx = passCtx;
	var width = passWidth;
	var height = passHeight;
	var directionAngle = passDirectionAngle;
	var hyptoneuse = passSpaceShipLength;
	var oppositeSide = Math.sin(directionAngle * (Math.PI / 180)) * hyptoneuse;
	var adjacentSide = Math.sqrt(hyptoneuse * hyptoneuse - oppositeSide * oppositeSide);

	if(directionAngle > 45 && directionAngle <= 135){
		passY -= passSpaceShipWidth * 2;
		passX += passSpaceShipLength;
	}else if(directionAngle > 135 && directionAngle <= 215){
		passX -= passSpaceShipWidth * 2;
	}else if(directionAngle > 215 && directionAngle <= 305){		
		passY += passSpaceShipWidth * 2;
	}else{
		passX += passSpaceShipWidth * 2;
	}
	if((directionAngle >= 0 && directionAngle <= 90) || (directionAngle > 270 && directionAngle <= 360)){
		adjacentSide *= -1;
	}
	var x = passX + adjacentSide;
	var y = passY + oppositeSide;
	var frontX = x + adjacentSide;
	var frontY = y + oppositeSide;
	
	this.detectCollisionWithAsteriod = function(asteriod){
		var xDiff = x - asteriod.x;
		var yDiff = y - asteriod.y;
		var distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
		if(distance < asteriod.radius){
			return true;
		}
		return false;
	}
	this.detectCollisionWithSpaceShip = function(hitBox){
		var degreeBox = document.getElementById("degree");
		var opSide;
		var adjSide;
		var angle;
		for(var i = 0; i < hitBox.length; i++){
			opSide = Math.abs(x - hitBox[i].x);
			adjSide = Math.abs(y - hitBox[i].y);
			angle = Math.atan(opSide / adjSide)  * (180 / Math.PI);
			if(x > hitBox[i].x && y > hitBox[i].y){
				angle = 180 - angle;
			}else if(x <= hitBox[i].x && y > hitBox[i].y){
				angle += 180;
			}else if(x <= hitBox[i].x && y <= hitBox[i].y){
				angle = 360 - angle;
			}else{
				//angle = 90 - angle;
			}

			if(hitBox[i].greaterAngle >= 270){
				if(angle >= 270){
					if(hitBox[i].greaterAngle > angle){
						return false;
					}
				}else if(angle <= 90){
					if(hitBox[i].lesserAngle < angle){
						return false;
					}
				}else{
					return false;
				}
			}else if(hitBox[i].greaterAngle > angle || hitBox[i].lesserAngle < angle){
				return false;
			}
		}
		return true;
	}
	this.getX = function(){
		return x;
	}
	this.getY = function(){
		return y;
	}
	this.setX = function(newX){
		x = newX;
	}
	this.setY = function(newY){
		y = newY;
	}
	this.getTimeOut = function(){
		return timeOut;
	}
	this.moveForward = function(){
		timeOut--;
		x += oppositeSide;
		y += adjacentSide;
	}
	this.draw = function(){
		///////////////////
		// Rotate canvas //
		///////////////////
		ctx.save();
		ctx.translate(x, y);
		ctx.rotate(Math.PI/180 * directionAngle);
		ctx.translate(-x, -y);

		ctx.fillStyle = 'rgba(255,255,255,0.9)';
		ctx.fillRect(x - height / 2, y, height, width);
		ctx.fill();
		/////////////////////////
		// Rotate canvase back //
		/////////////////////////
		ctx.restore();
	}

}
function Star(passX, passY, passShortRayLength, passLongRayLength, passShortRayWidth, passLongRayWidth, passCtx){
	var x = passX;
	var y = passY;
	var ctx = passCtx;
	var shortRayLength = passShortRayLength;
	var longRayLength = passLongRayLength;
	var shortRayWidth = passShortRayWidth;
	var longRayWidth = passLongRayWidth;
	var currentDirectionAngle;

	this.reDraw = function(){
		this.draw(currentDirectionAngle);
	};
	this.draw = function(directionAngle){
		currentDirectionAngle = directionAngle;
		///////////////////
		// Rotate canvas //
		///////////////////
		ctx.save();
		ctx.translate(x, y);
		ctx.rotate(Math.PI/180 * directionAngle);
		ctx.translate(-x, -y);

		//////////////
		// Big rays //
		//////////////
		ctx.fillStyle = 'rgba(255,255,255,0.9)';
		ctx.fillRect(x + longRayWidth / 2, y, longRayLength, longRayWidth);
		ctx.fillRect(x - longRayLength + longRayWidth / 2, y, longRayLength, longRayWidth);
		ctx.fillRect(x, y - longRayLength, longRayWidth, longRayLength);
		ctx.fillRect(x, y + longRayWidth, longRayWidth, longRayLength);

		/////////////////
		// Little rays //
		/////////////////
		ctx.beginPath();
		ctx.moveTo(x + longRayWidth / 2, y + longRayWidth);
		var longSide = Math.sin(Math.PI/180*45) * shortRayLength;
		var shortSide = Math.sin(Math.PI/180*45) * shortRayWidth;
		var a = x + longRayWidth / 2 + longSide;
		var b = y + longRayWidth + longSide;
		ctx.lineTo(a, b);
		a = a + shortSide;
		b = b - shortSide;
		ctx.lineTo(a, b);
		a = a - longSide;
		b = b - longSide;
		ctx.lineTo(a, b);
		ctx.lineTo(x + longRayWidth / 2, y + longRayWidth);
		ctx.fill();
		ctx.closePath();

		ctx.beginPath();
		ctx.moveTo(x + longRayWidth / 2, y + longRayWidth);
		a = x + longRayWidth / 2 - longSide;
		b = y + longRayWidth + longSide;
		ctx.lineTo(a, b);
		a = a - shortSide;
		b = b - shortSide;
		ctx.lineTo(a, b);
		a = a + longSide;
		b = b - longSide;
		ctx.lineTo(a, b);
		ctx.lineTo(x + longRayWidth / 2, y + longRayWidth);
		ctx.fill();
		ctx.closePath();

		ctx.beginPath();
		ctx.moveTo(x + longRayWidth / 2 - shortSide, y + longRayWidth - shortSide);
		a = x + longRayWidth / 2 - shortSide - longSide;
		b = y + longRayWidth - shortSide - longSide;
		ctx.lineTo(a, b);
		a = a + shortSide;
		b = b - shortSide;
		ctx.lineTo(a, b);
		a = a + longSide;
		b = b + longSide;
		ctx.lineTo(a, b);
		ctx.lineTo(x + longRayWidth / 2 - shortSide, y + longRayWidth - shortSide);
		ctx.fill();
		ctx.closePath();

		ctx.beginPath();
		ctx.moveTo(x + longRayWidth / 2 + shortSide, y + longRayWidth - shortSide);
		a = x + longRayWidth / 2 + shortSide + longSide;
		b = y + longRayWidth - shortSide - longSide;
		ctx.lineTo(a, b);
		a = a - shortSide;
		b = b - shortSide;
		ctx.lineTo(a, b);
		a = a - longSide;
		b = b + longSide;
		ctx.lineTo(a, b);
		ctx.lineTo(x + longRayWidth / 2 + shortSide, y + longRayWidth - shortSide);
		ctx.fill();
		ctx.closePath();

		/////////////////////////
		// Rotate canvase back //
		/////////////////////////
		ctx.restore();
	};
}
function SpaceShip(passX, passY, passShipLength, passShipWidth, passCtx){
	var x = passX;
	var y = passY;
	var ctx = passCtx;
	var shipLength = passShipLength;
	var shipWidth = passShipWidth;
	var currentDirectionAngle;
	var frontX;
	var frontY;
	var vx = 0;
	var vy = 0;
	var hitPionts = new Array();

	function updateHitBox(){
		hitPionts = new Array();
		var frontHypotenuse = Math.sqrt(shipLength * .66 * shipLength * .66 + shipWidth / 2 * shipWidth / 2);
		var backHypotenuse = Math.sqrt(shipLength * .34 * shipLength * .34 + shipWidth / 2 * shipWidth / 2);

		var frontLeftMinorAngle = Math.atan((shipWidth / 2) / (shipLength * .66)) * (180 / Math.PI);
		var backLeftMinorAngle = Math.atan((shipWidth / 2) / (shipLength * .34)) * (180 / Math.PI);

		var frontLeftOppositeSide = Math.abs(Math.sin((90 - currentDirectionAngle + frontLeftMinorAngle) * (Math.PI / 180)) * frontHypotenuse);
		var frontLeftAdjacentSide = Math.abs(Math.cos((90 - currentDirectionAngle + frontLeftMinorAngle) * (Math.PI / 180)) * frontHypotenuse);
		var frontRightOppositeSide = Math.abs(Math.sin((90 - (currentDirectionAngle + frontLeftMinorAngle)) * (Math.PI / 180)) * frontHypotenuse);
		var frontRightAdjacentSide = Math.abs(Math.cos((90 - (currentDirectionAngle + frontLeftMinorAngle)) * (Math.PI / 180)) * frontHypotenuse);

		var backLeftOppositeSide = Math.abs(Math.sin((90 - currentDirectionAngle - backLeftMinorAngle) * (Math.PI / 180)) * backHypotenuse);
		var backLeftAdjacentSide = Math.abs(Math.cos((90 - currentDirectionAngle - backLeftMinorAngle) * (Math.PI / 180)) * backHypotenuse);
		var backRightOppositeSide = Math.abs(Math.sin((90 - currentDirectionAngle + backLeftMinorAngle) * (Math.PI / 180)) * backHypotenuse);
		var backRightAdjacentSide = Math.abs(Math.cos((90 - currentDirectionAngle + backLeftMinorAngle) * (Math.PI / 180)) * backHypotenuse);

		var leftFront = new HitPoint();
		var rightFront = new HitPoint();
		var rightBack = new HitPoint();
		var leftBack = new HitPoint();
		leftFront.position = "Left Front";
		rightFront.position = "Right Front";
		rightBack.position = "Right Back";
		leftBack.position = "Left Back";

		if(currentDirectionAngle >= 0 && currentDirectionAngle <= 90){
			leftFront.y = y - frontLeftOppositeSide;
			leftFront.lesserAngle = currentDirectionAngle + 180;
			leftFront.greaterAngle = currentDirectionAngle + 90;
			if(currentDirectionAngle - frontLeftMinorAngle >= 0){
				leftFront.x = x + frontLeftAdjacentSide;
			}else{
				leftFront.x = x - frontLeftAdjacentSide;
			}

			rightFront.x = x + frontRightAdjacentSide;
			rightFront.lesserAngle = currentDirectionAngle + 270;
			rightFront.greaterAngle = currentDirectionAngle + 180;
			if(currentDirectionAngle + frontLeftMinorAngle <= 90){
				rightFront.y = y - frontRightOppositeSide;
			}else{
				rightFront.y = y + frontRightOppositeSide;
			}

			rightBack.y = y + backRightOppositeSide;
			rightBack.lesserAngle = currentDirectionAngle;
			rightBack.greaterAngle = currentDirectionAngle + 270;
			if(currentDirectionAngle - backLeftMinorAngle >= 0){
				rightBack.x = x - backRightAdjacentSide;
			}else{
				rightBack.x = x + backRightAdjacentSide;
			}

			leftBack.x = x - backLeftAdjacentSide;
			leftBack.lesserAngle = currentDirectionAngle + 90;
			leftBack.greaterAngle = currentDirectionAngle;
			if(currentDirectionAngle + backLeftMinorAngle <= 90){
				leftBack.y = y + backLeftOppositeSide;
			}else{
				leftBack.y = y - backLeftOppositeSide;
			}
		}else if(currentDirectionAngle > 90 && currentDirectionAngle <= 180){
			leftFront.x = x + frontLeftAdjacentSide;
			leftFront.lesserAngle = currentDirectionAngle + 180;
			leftFront.greaterAngle = currentDirectionAngle + 90;
			if(currentDirectionAngle - frontLeftMinorAngle <= 90){
				leftFront.y = y - frontLeftOppositeSide;
			}else{
				leftFront.y = y + frontLeftOppositeSide;
			}
			rightFront.y = y + frontRightOppositeSide;
			rightFront.lesserAngle = currentDirectionAngle - 90;
			rightFront.greaterAngle = currentDirectionAngle + 180;
			if(currentDirectionAngle + frontLeftMinorAngle <= 180){
				rightFront.x = x + frontRightAdjacentSide;
			}else{
				rightFront.x = x - frontRightAdjacentSide;
			}

			rightBack.x = x - backRightAdjacentSide;
			rightBack.lesserAngle = currentDirectionAngle;
			rightBack.greaterAngle = currentDirectionAngle - 90;
			if(currentDirectionAngle - backLeftMinorAngle <= 90){
				rightBack.y = y + backRightOppositeSide;
			}else{
				rightBack.y = y - backRightOppositeSide;
			}

			leftBack.y = y - backLeftOppositeSide;
			leftBack.lesserAngle = currentDirectionAngle + 90;
			leftBack.greaterAngle = currentDirectionAngle;
			if(currentDirectionAngle + backLeftMinorAngle <= 180){
				leftBack.x = x - backLeftAdjacentSide;
			}else{
				leftBack.x = x + backLeftAdjacentSide;
			}
		}else if(currentDirectionAngle > 180 && currentDirectionAngle <= 270){
			leftFront.y = y + frontLeftOppositeSide;
			leftFront.lesserAngle = currentDirectionAngle - 180;
			leftFront.greaterAngle = currentDirectionAngle + 90;
			if(currentDirectionAngle - frontLeftMinorAngle <= 180){
				leftFront.x = x + frontLeftAdjacentSide;
			}else{
				leftFront.x = x - frontLeftAdjacentSide;
			}

			rightFront.x = x - frontRightAdjacentSide;
			rightFront.lesserAngle = currentDirectionAngle - 90;
			rightFront.greaterAngle = currentDirectionAngle - 180;
			if(currentDirectionAngle + frontLeftMinorAngle <= 270){
				rightFront.y = y + frontRightOppositeSide;
			}else{
				rightFront.y = y - frontRightOppositeSide;
			}

			rightBack.y = y - backRightOppositeSide;
			rightBack.lesserAngle = currentDirectionAngle;
			rightBack.greaterAngle = currentDirectionAngle - 90;
			if(currentDirectionAngle + backLeftMinorAngle <= 270){
				rightBack.x = x - backRightAdjacentSide;
			}else{
				rightBack.x = x + backRightAdjacentSide;
			}

			leftBack.x = x + backLeftAdjacentSide;
			leftBack.lesserAngle = currentDirectionAngle + 90;
			leftBack.greaterAngle = currentDirectionAngle;
			if(currentDirectionAngle + backLeftMinorAngle <= 270){
				leftBack.y = y - backLeftOppositeSide;
			}else{
				leftBack.y = y + backLeftOppositeSide;
			}
		}else{
			leftFront.x = x - frontLeftAdjacentSide;
			leftFront.lesserAngle = currentDirectionAngle - 180;
			leftFront.greaterAngle = currentDirectionAngle - 270;
			if(currentDirectionAngle - frontLeftMinorAngle <= 270){
				leftFront.y = y + frontLeftOppositeSide;
			}else{
				leftFront.y = y - frontLeftOppositeSide;
			}

			rightFront.y = y - frontRightOppositeSide;
			rightFront.lesserAngle = currentDirectionAngle - 90;
			rightFront.greaterAngle = currentDirectionAngle - 180;
			if(currentDirectionAngle + frontLeftMinorAngle <= 360){
				rightFront.x = x - frontRightAdjacentSide;
			}else{
				rightFront.x = x + frontRightAdjacentSide;
			}

			rightBack.x = x + backRightAdjacentSide;
			rightBack.lesserAngle = currentDirectionAngle;
			rightBack.greaterAngle = currentDirectionAngle - 90;
			if(currentDirectionAngle - frontLeftMinorAngle <= 270){
				rightBack.y = y - backRightOppositeSide;
			}else{
				rightBack.y = y + backRightOppositeSide;
			}

			leftBack.y = y + backLeftOppositeSide;
			leftBack.lesserAngle = currentDirectionAngle - 270;
			leftBack.greaterAngle = currentDirectionAngle;
			if(currentDirectionAngle + backLeftMinorAngle <= 360){
				leftBack.x = x + backLeftAdjacentSide;
			}else{
				leftBack.x = x - backLeftAdjacentSide;
			}
		}
		hitPionts.push(leftFront);
		hitPionts.push(rightFront);
		hitPionts.push(rightBack);
		hitPionts.push(leftBack);
	}
	this.getHitBox = function(){
		return hitPionts;
	}
	this.moveForward = function(){
		var radians = Math.PI/180 * currentDirectionAngle;
		vy -= Math.cos(radians);
		vx += Math.sin(radians);
		return false;
	}
	this.getWidth = function(){
		return shipWidth;
	}
	this.getLength = function(){
		return shipLength;
	}
	this.getDirectionAngle = function(){
		return currentDirectionAngle;
	}
	this.getFrontX = function(){
		return frontX;
	}
	this.getFrontY = function(){
		return frontY;
	}
	this.getX = function(){
		return x;
	}
	this.getY = function(){
		return y;
	}
	this.setX = function(newX){
		x = newX;
	}
	this.setY = function(newY){
		y = newY;
	}
	this.reDraw = function(){
		x += vx;
		y += vy;
		this.draw(currentDirectionAngle);
	};
	this.draw = function(directionAngle){
		currentDirectionAngle = directionAngle;
		var radians = Math.PI/180 * directionAngle;
		ctx.save();
		ctx.translate(x, y);
		ctx.rotate(radians);
		ctx.translate(-x, -y);

		var currentX;
		var currentY;
		frontX = x;
		frontY = y - shipLength * .66;

		ctx.fillStyle = 'rgba(255,255,255,0.9)';
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(frontX, frontY);

		currentX = frontX + shipWidth / 2;
		currentY = frontY + shipLength;
		ctx.lineTo(currentX, currentY);
		currentX = currentX - shipWidth;
		ctx.lineTo(currentX, currentY);
		ctx.lineTo(frontX, frontY);

      		ctx.lineWidth = 1;
      		ctx.strokeStyle = '#ff0000';
      		ctx.stroke();
		ctx.closePath();

		ctx.fill();
		ctx.restore();
		updateHitBox();
	};
}
function HitPoint(){
	this.x;
	this.y;
	this.greaterAngle;
	this.lesserAngle;
	this.position;
}
function extend(Parent, Child){
	Child.prototype = Parent.prototype;
	Child.prototype.constructor = Child;
}
function MediumAsteriod(passX, passY, directionAngle, passCtx){
	this.x = passX;
	this.y = passY;
	this.radius = 35;
	this.currentDirectionAngle = directionAngle;
	this.ctx = passCtx;
	this.vx = Math.sin(Math.PI/180 * this.currentDirectionAngle);
	this.vy = Math.cos(Math.PI/180 * this.currentDirectionAngle);
	this.color = 'yellow';
}
function SmallAsteriod(passX, passY, directionAngle, passCtx){
	this.x = passX;
	this.y = passY;
	this.radius = 20;
	this.currentDirectionAngle = directionAngle;
	this.ctx = passCtx;
	this.vx = Math.sin(Math.PI/180 * this.currentDirectionAngle);
	this.vy = Math.cos(Math.PI/180 * this.currentDirectionAngle);
	this.color = 'green';
}
function LargeAsteriod(passX, passY, directionAngle, passCtx){
	this.x = passX;
	this.y = passY;
	this.radius = 50;
	this.currentDirectionAngle = directionAngle;
	this.ctx = passCtx;
	this.vx = Math.sin(Math.PI/180 * this.currentDirectionAngle);
	this.vy = Math.cos(Math.PI/180 * this.currentDirectionAngle);
	this.color = 'blue';
}
LargeAsteriod.prototype.draw = function(){
	var oneDegreeInRadians = 0.0174533;
	var numberOfDegrees = 1;
	this.name;
	this.x += this.vx;
	this.y += this.vy;
	this.ctx.beginPath();
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 2,0,numberOfDegrees * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 4,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 4,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 5,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 5,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 6,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 5,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 6,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 5,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 4,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 5,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 7,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 6,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 7,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 4,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 5,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 4,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius ,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 4,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 4,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 5,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 4,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 5,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 4,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 5,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 7,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 5,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 8,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 6,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 4,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 4,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 4,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 5,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 5,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 5,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 4,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 5,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 4,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 4,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 4,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 4,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 5,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 4,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 4,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 5,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 5,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 4,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 5,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 4,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 6,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 5,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 6,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 4,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 4,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 4,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 4,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(this.x, this.y, this.radius,numberOfDegrees * oneDegreeInRadians,2*Math.PI);
	this.ctx.fillStyle = this.color;
	this.ctx.fill(); 
	this.ctx.closePath();
	this.drawCrater(this.radius / 2, this.radius / 2, 5);
	this.drawCrater(-this.radius / 2, -this.radius / 2, 7);
}
LargeAsteriod.prototype.drawCrater = function(x, y, a){
	var oneDegreeInRadians = 0.0174533;
	var numberOfDegrees = 1;
	var subX = this.x - x;
	var subY = this.y - y;
	var r = a;
	this.ctx.beginPath();
	this.ctx.moveTo(subX, subY);
	numberOfDegrees += 1;
	this.ctx.arc(subX, subY, 5,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 4,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 4,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 5,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 4,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 5,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 6,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 4,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 5,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 4,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 5,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, 5,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 4,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 5,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 4,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 5,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 3,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 2,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r - 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r + 1,numberOfDegrees * oneDegreeInRadians,(numberOfDegrees + 2) * oneDegreeInRadians);
	numberOfDegrees += 2;
	this.ctx.arc(subX, subY, r,numberOfDegrees * oneDegreeInRadians,2*Math.PI);
	this.ctx.lineWidth = 1;
	this.ctx.strokeStyle = 'black';
	this.ctx.stroke(); 
	this.ctx.closePath();
}
LargeAsteriod.prototype.moveForward = function(){
	var radians = Math.PI/180 * this.currentDirectionAngle;
	this.vy -= Math.cos(radians);
	this.vx += Math.sin(radians);
}
LargeAsteriod.prototype.changeDirection = function(newAngle){
	this.currentDirectionAngle = newAngle;
	var radians = Math.PI/180 * this.currentDirectionAngle;
	this.vy = -(Math.cos(radians));
	this.vx = Math.sin(radians);
}
LargeAsteriod.prototype.detectAsteriodCollision = function(asteriod){
	var xDiff = this.x - asteriod.x;
	var yDiff = this.y - asteriod.y;
	var distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
	if(distance < this.radius + asteriod.radius){
		var radians = Math.atan(Math.abs(xDiff) / Math.abs(xDiff));
		if(this.x <= asteriod.x && this.y <= asteriod.y){
			this.vy = -(Math.cos(radians));
			this.vx = -(Math.sin(radians));
			asteriod.vy = Math.cos(radians);
			asteriod.vx = Math.sin(radians);
		}else if(this.x <= asteriod.x && this.y > asteriod.y){
			this.vy = Math.cos(radians);
			this.vx = -(Math.sin(radians));
			asteriod.vy = -(Math.cos(radians));
			asteriod.vx = Math.sin(radians);
		}else if(this.x > asteriod.x && this.y > asteriod.y){
			this.vy = Math.cos(radians);
			this.vx = Math.sin(radians);
			asteriod.vy = -(Math.cos(radians));
			asteriod.vx = -(Math.sin(radians));
		}else{
			this.vy = -(Math.cos(radians));
			this.vx = Math.sin(radians);
			asteriod.vy = Math.cos(radians);
			asteriod.vx = -(Math.sin(radians));
		}
		return true;
	}
	return false;
}
LargeAsteriod.prototype.detectSpaceShipCollision = function(hitBox){
	var xDiff = 0;
	var yDiff = 0;
	for(var i = 0; i < hitBox.length; i++){
		var xDiff = this.x - hitBox[i].x;
		var yDiff = this.y - hitBox[i].y;
		var distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
		if(distance < this.radius){
			return true;
		}
	}
	return false;
}
extend(LargeAsteriod, MediumAsteriod);
extend(LargeAsteriod, SmallAsteriod)