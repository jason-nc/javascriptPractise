var joker = jQuery.noConflict();

joker(function(){
	joker('#selectShowCase ul li img').click(function(){
		joker('#showCase img').attr('src',joker(this).attr('src'));
	});
	joker('#prev').click(function(){
		joker('#showCaseScreen1').animate({'height': '+=' + 200},3000,'swing',function(){
				joker('#showCase img').attr('src',joker('#selectShowCase ul li:last img').attr('src'));
				joker('#selectShowCase ul li:first').before(joker('#selectShowCase ul li:last'));	
		});
		joker('#showCaseScreen1').animate({'height': '-=' + 200},3000,'swing');
		joker('#showCaseScreen2').animate({'height': '+=' + 200, top: '-=' + 200},3000,'swing');	
		joker('#showCaseScreen2').animate({'height': '-=' + 200, top: '+=' + 200},3000,'swing');	
	});
	joker('#next').click(function(){
		joker('#showCaseScreen1').animate({'height': '+=' + 200},3000,'swing',function(){
			joker('#selectShowCase ul li:last').before(joker('#selectShowCase ul li:first'));
			joker('#showCase img').attr('src',joker('#selectShowCase ul li:first img').attr('src'));
		});
		joker('#showCaseScreen1').animate({'height': '-=' + 200},3000,'swing');
		joker('#showCaseScreen2').animate({'height': '+=' + 200, top: '-=' + 200},3000,'swing');	
		joker('#showCaseScreen2').animate({'height': '-=' + 200, top: '+=' + 200},3000,'swing');
	});
});