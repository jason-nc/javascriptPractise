var init = function() {
	var carousel = document.getElementById('carousel'),
        navButtons = document.querySelectorAll('#navigation button'),
        panelCount = carousel.children.length,
        transformProp = Modernizr.prefixed('transform'),
        theta = 0,

        onNavButtonClick = function( event ){
        	var increment = parseInt( event.target.getAttribute('data-increment') );
            	theta += ( 360 / panelCount ) * increment * -1;
            	carousel.style[ transformProp ] = 'translateZ( -288px ) rotateY(' + theta + 'deg)';
        };

      	for (var i=0; i < 2; i++) {
        	navButtons[i].addEventListener( 'click', onNavButtonClick, false);
      	}

};

window.addEventListener( 'DOMContentLoaded', init, false);
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
var joker = jQuery.noConflict();

joker(function(){	
	//joker('#mainHeader').load('header.html');
	var prevButton = joker('#prevButton');
	var prevOffSet = prevButton.offset();

	var nextButton = joker('#nextButton');
	var nextOffSet = nextButton.offset();

	var slideContainer = joker('#sliderContainer');
	var slideContainerOffset = slideContainer.offset();
	var halfHeight = slideContainer.height() /2;

	var slider = joker('#mainSlider');
	var allSlides = joker('.slideHome');
	var currentIndex = 1;
	var stop = allSlides.length;
	var width = slideContainer.width();
	var animationSpeed = 1000;

	slider.width(stop * width);
	prevButton.offset({'top': prevOffSet.top + halfHeight});
	var nextTop = nextOffSet.top - halfHeight - 10;
	nextButton.offset({'top': nextTop});
	nextButton.offset({'left': slideContainerOffset.left + width - 21});
	joker( window ).resize(function() {
		var slideContainerOffset = slideContainer.offset();
		var width = slideContainer.width();
		var halfHeight = slideContainer.height() /2;
		var nextTop = nextOffSet.top - halfHeight - 10;
		nextButton.offset({'top': nextTop});
		nextButton.offset({'left': slideContainerOffset.left + width - 21});
	});
	nextButton.click(function(){
		currentIndex++;
		if(currentIndex <= stop){
			if(currentIndex < 5){
				slider.animate({'margin-left':'-='+width},1000,'swing');
				//slider.slideUp(1000,'swing');
			}else if(currentIndex == 9){
				slider.css({'margin-left':'-='+width,'opacity':'0'});
				slider.animate({'opacity':'+=' + 1},animationSpeed);
			}else{
				slider.slideUp(1000,'swing',function(){
					slider.css({'margin-left':'-='+width});
				});
				slider.slideDown(1000,'swing');
			}				
		}else{
			slider.slideUp(1000,'swing',function(){
				slider.css({'margin-left':'0'});
			});
			slider.slideDown(1000,'swing');
			currentIndex = 1;
		}
	});

	prevButton.click(function(){
		currentIndex--;
		if(currentIndex > 0){
			slider.fadeOut(1500,'swing',function(){
				slider.css({'margin-left':'+='+width,'display':'none'});
			});
			slider.fadeIn(1500,'swing');
		}else{
			slider.fadeOut(1500,'swing',function(){
				slider.css({'margin-left':width * (stop - 1) * -1});
			});
			slider.fadeIn(1500,'swing');
			currentIndex = stop;
		}
	});
});
var degree = 0;
var joker = jQuery.noConflict();
joker(document).ready(function(){
	joker('#spinner').mouseover(function(){
		joker('#spinner').css({'transform' : 'rotateX(' + degree + 'deg) rotateY(' + degree + 'deg)'});
		degree = degree + 5;
		if(degree > 360){
			degree = 0;
		}
	});
/*
	var interval;
	function startSpinner(){
		interval = setInterval(function(){
			joker('#spinner').css({'transform' : 'rotateX(' + degree + 'deg) rotateY(' + degree + 'deg)'});
			var x = 0;
			joker('#spinner').find('figure').each(function(){
				$(this).css({'transform' : 'rotateY(' + x + 'deg)'});
				x = x + 10;
			});
			degree = degree + 5;
			if(degree > 360){
				degree = 0;
			}
		}, 1000);
	}
	startSpinner();
*/
});
var init = function() {
	var carousel = document.getElementById('spinner'),
        navButtons = document.querySelectorAll('#navigation button'),
        panelCount = carousel.children.length,
        transformProp = Modernizr.prefixed('transform'),
        theta = 0,

        onNavButtonClick = function( event ){
        	var increment = parseInt( event.target.getAttribute('data-increment') );
            	theta += ( 360 / panelCount ) * increment * -1;
            	carousel.style[ transformProp ] = 'translateZ(-228px) rotateY(' + theta + 'deg)'; // rotateX(' + theta + 'deg)';
        };

      	for (var i=0; i < 2; i++) {
        	navButtons[i].addEventListener( 'click', onNavButtonClick, false);
      	}

};

window.addEventListener( 'DOMContentLoaded', init, false);
function addCommas(num){
	strNum = '';
	var tmpNum = 0;
	var aNum = num.toString().split('.');
	if(aNum.length == 1){
		aNum[1] = '';
	}
	if(aNum[0].length < 4){
		strNum = aNum[0] + '.' + aNum[1];
	}else{
		if(aNum[1] === ''){
			tmpNum = aNum[0].substr(aNum[0].length - 3, 3);
		}else{
			tmpNum = aNum[0].substr(aNum[0].length - 3, 3) + '.' +  aNum[1];
		}
		aNum[0] = aNum[0].substr(0, aNum[0].length - 3);
		while(aNum[0].length > 3){
		//	aNum[0].substr(aNum[0].length - 3, 3) + ',' + tmpNum;
			aNum[0] = aNum[0].substr(0, aNum[0].length - 3);
		}
		if(aNum[0].length > 0){
			strNum = aNum[0] + ',' + tmpNum;
		}
	}
	return strNum;
}

function formatDollar(num){
	var strNum = addCommas(num.toFixed(2));
	return '$' + strNum;
}