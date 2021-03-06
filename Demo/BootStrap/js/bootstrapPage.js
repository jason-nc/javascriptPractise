var joker = jQuery.noConflict();

joker(function(){
	var imgBox = joker('.img-box');
	imgBox.mouseenter(function(){
		var zoomBox = joker(this).find('.zoom-box');
		var zoomImage = joker(this).find('.img-zoom'); 				
		var zoomBoxImage = joker(this).find('.img-zoom-box');			
		zoomImage.mouseenter(function(){
			zoomBox.css({'display' : 'block', 'z-index' : '999'});
			var currentOffset = joker(this).offset();
			zoomImage.mousemove(function(pointer){
				var guageWidth = (currentOffset.left - pointer.pageX) * 5.2;
				var guageHeight = (currentOffset.top - pointer.pageY) * 5.2;
				zoomBoxImage.css({'object-position' : guageWidth + 'px ' + guageHeight + 'px'});
				joker('#offsetTop').val(guageHeight);
				joker('#offsetRight').val(guageWidth);
			});
		});
		zoomImage.mouseleave(function(){
			zoomBox.css({'display' : 'none', 'z-index' : '-10'});
			zoomBoxImage.css({'object-position' : '0px 0px'});
		});
	});
});