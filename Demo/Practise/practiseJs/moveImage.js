var x1,y1,x2,y2,distX,distY;
var joker = jQuery.noConflict();
joker(document).ready(function(){

	joker('#moveOne p').mouseover(function(){
          	joker(this).css("cursor","pointer");
        });

        joker('#moveOne').mousedown(function(event){
		moveAround(event, joker('#moveOne'));
	});
        joker('#moveOne').mouseup(function() {
          	joker(this).unbind('mousemove');
		joker(this).css({'z-index' : '2'});
		joker(this).siblings().css({'z-index' : '1'});
        });
	
	joker('#moveTwo p').mouseover(function(){
          	joker(this).css("cursor","pointer");
        });

        joker('#moveTwo').bind('mousedown', function(event){
		moveAround(event, joker('#moveTwo'));
	});
        joker('#moveTwo').mouseup(function() {
          	joker(this).unbind('mousemove');
		joker(this).css({'z-index' : '2'});
		joker(this).siblings().css({'z-index' : '1'});
        });
	joker('#moveThree p').mouseover(function(){
          	joker(this).css("cursor","pointer");
        });

        joker('#moveThree').bind('mousedown', function(event){
		moveAround(event, joker('#moveThree'));
	});
        joker('#moveThree').mouseup(function() {
          	joker(this).unbind('mousemove');
		joker(this).css({'z-index' : '2'});
		joker(this).siblings().css({'z-index' : '1'});
        });
	joker('#moveFour p').mouseover(function(){
          	joker(this).css("cursor","pointer");
        });

        joker('#moveFour').bind('mousedown', function(event){
		moveAround(event, joker('#moveFour'));
	});
        joker('#moveFour').mouseup(function() {
          	joker(this).unbind('mousemove');
		joker(this).css({'z-index' : '2'});
		joker(this).siblings().css({'z-index' : '1'});
        });
	joker('#moveFive p').mouseover(function(){
          	joker(this).css("cursor","pointer");
        });

        joker('#moveFive').bind('mousedown', function(event){
		moveAround(event, joker('#moveFive'));
	});
        joker('#moveFive').mouseup(function() {
          	joker(this).unbind('mousemove');
		joker(this).css({'z-index' : '2'});
		joker(this).siblings().css({'z-index' : '1'});
        });
	joker('#moveSix p').mouseover(function(){
          	joker(this).css("cursor","pointer");
        });

        joker('#moveSix').bind('mousedown', function(event){
		moveAround(event, joker('#moveSix'));
	});
        joker('#moveSix').mouseup(function() {
          	joker(this).unbind('mousemove');
		joker(this).css({'z-index' : '2'});
		joker(this).siblings().css({'z-index' : '1'});
        });
	function moveAround(event, currentElement){
          	x1 = event.clientX;
          	y1 = event.clientY;
		currentElement.css({'z-index' : '99'});
          	var x3 = parseInt(currentElement.css('left'));
          	var y3 = parseInt(currentElement.css('top'));
          	currentElement.mousemove(function(event1) {
            		x2 = event1.clientX;
            		y2 = event1.clientY;

            		distX = x2 - x1;
            		distY = y2 - y1;

            		var newX = x3 + distX;
            		var newY = y3 + distY;

            		currentElement.css('left', newX);
            		currentElement.css('top', newY);
          	});

	}
      });