var x1,y1,x2,y2,distX,distY;

$(document).ready(function(){

	$('#moveOne p').mouseover(function(){
          	$(this).css("cursor","pointer");
        });

        $('#moveOne').mousedown(function(event){
		moveAround(event, $('#moveOne'));
	});
        $('#moveOne').mouseup(function() {
          	$(this).unbind('mousemove');
		$(this).css({'z-index' : '2'});
		$(this).siblings().css({'z-index' : '1'});
        });
	
	$('#moveTwo p').mouseover(function(){
          	$(this).css("cursor","pointer");
        });

        $('#moveTwo').bind('mousedown', function(event){
		moveAround(event, $('#moveTwo'));
	});
        $('#moveTwo').mouseup(function() {
          	$(this).unbind('mousemove');
		$(this).css({'z-index' : '2'});
		$(this).siblings().css({'z-index' : '1'});
        });
	$('#moveThree p').mouseover(function(){
          	$(this).css("cursor","pointer");
        });

        $('#moveThree').bind('mousedown', function(event){
		moveAround(event, $('#moveThree'));
	});
        $('#moveThree').mouseup(function() {
          	$(this).unbind('mousemove');
		$(this).css({'z-index' : '2'});
		$(this).siblings().css({'z-index' : '1'});
        });
	$('#moveFour p').mouseover(function(){
          	$(this).css("cursor","pointer");
        });

        $('#moveFour').bind('mousedown', function(event){
		moveAround(event, $('#moveFour'));
	});
        $('#moveFour').mouseup(function() {
          	$(this).unbind('mousemove');
		$(this).css({'z-index' : '2'});
		$(this).siblings().css({'z-index' : '1'});
        });
	$('#moveFive p').mouseover(function(){
          	$(this).css("cursor","pointer");
        });

        $('#moveFive').bind('mousedown', function(event){
		moveAround(event, $('#moveFive'));
	});
        $('#moveFive').mouseup(function() {
          	$(this).unbind('mousemove');
		$(this).css({'z-index' : '2'});
		$(this).siblings().css({'z-index' : '1'});
        });
	$('#moveSix p').mouseover(function(){
          	$(this).css("cursor","pointer");
        });

        $('#moveSix').bind('mousedown', function(event){
		moveAround(event, $('#moveSix'));
	});
        $('#moveSix').mouseup(function() {
          	$(this).unbind('mousemove');
		$(this).css({'z-index' : '2'});
		$(this).siblings().css({'z-index' : '1'});
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