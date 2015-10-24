var sun = new Image();
var moon = new Image();
var earth = new Image();

function init(){
	draw();
  	sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
  	moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
  	earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';
	window.requestAnimationFrame(drawA);
	var breakOut = new BreakOut('breakOut');
	var asteriods = new Asteriods('asteriods');
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