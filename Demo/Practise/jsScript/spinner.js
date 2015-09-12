var degree = 0;
$(document).ready(function(){
/*
	$('#spinner').mouseover(function(){
		$('#spinner').css({'transform' : 'rotateX(' + degree + 'deg) rotateY(' + degree + 'deg)'});
		degree = degree + 5;
		if(degree > 360){
			degree = 0;
		}
	});
	var interval;
	function startSpinner(){
		interval = setInterval(function(){
			$('#spinner').css({'transform' : 'rotateX(' + degree + 'deg) rotateY(' + degree + 'deg)'});
			var x = 0;
			$('#spinner').find('figure').each(function(){
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