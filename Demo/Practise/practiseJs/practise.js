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