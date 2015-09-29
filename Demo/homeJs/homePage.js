var joker = jQuery.noConflict();
joker(function(){
	joker("#ajaxMarkit").click(function(){
		joker.ajax({
			url: "http://dev.markitondemand.com/Api/v2/Quote/jsonp",
			method: "GET",
			data: {
				"symbol" : joker("#txtTickerMarkit").val()
			},
			dataType : "jsonp",
                	beforeSend: function ( xhr ) {
                    		var loading = '<img src ="Demo/images/loader.gif"/>';
                    		var urlImage = 'Demo/images/bg4.png';
                    		var opacity = "0.7";
                    		joker('#loading').html(loading);
                    		joker('#wrapper').attr('style','position: fixed;top: 0%; z-index:99999; left: 0%; opacity:'+opacity+'; width:100%;height: 100%; background:url('+urlImage+')');
			},
			error: function( jqXHR, textStatus, errorThrown){
				joker("p").remove(".pMarkit");
				var txtError = '<p class="pMarkit">jqXHR: ' + jqXHR + " Status: " + textStatus + " Error Thrown: " + errorThrown + "</p>";
				joker("#markitResult").append(txtError);
			},
			success: function(data, textStatus, jqXHR){
                        	joker('#loading').html('');                        
                        	joker('#wrapper').removeAttr('style');
				joker("p").remove(".pMarkit");
				var parsedData = JSON.parse(JSON.stringify(data));
				var strResult = '<p class="pMarkit">' + parsedData.Symbol + ': ' + parsedData.Name + '<br/>';
				strResult += 'Open: ' + formatDollar(parsedData.Open) + '<br/>';
				strResult += 'Last Price: ' + formatDollar(parsedData.LastPrice) + '<br/>';
				strResult += 'Range: ' + formatDollar(parsedData.Low) + ' - ' + formatDollar(parsedData.High) + '<br/>';
				strResult += formatDollar(parsedData.Change) + ' | ' + parsedData.ChangePercent.toFixed(2) + '%<br/>';
				strResult += 'Market Cap: ' + formatDollar(parsedData.MarketCap) + '<br/>';
				strResult += 'Volume: ' + addCommas(parsedData.Volume) + '<br/>';
				strResult += 'Change YTD: ' + formatDollar(parsedData.ChangeYTD) + ' | ' + parsedData.ChangePercentYTD.toFixed(2) + '%<p/>';
				joker("#markitResult").append(strResult);
			}
		});
	});
	joker("#ajaxButton").click(function(){
		joker.ajax({
			url: "https://www.google.com/finance/info",
			method: "GET",
			data: {
				"q" : "NYSE:" + joker("#txtTicker").val(),
				"client" : "ig"							
			},
			dataType:"jsonp",
                	beforeSend: function ( xhr ) {
                    		var loading = '<img src ="Demo/images/loader.gif"/>';
                    		var urlImage = 'Demo/images/bg4.png';
                    		var opacity = "0.7";
                    		joker('#loading').html(loading);
                    		joker('#wrapper').attr('style','position: fixed;top: 0%; z-index:99999; left: 0%; opacity:'+opacity+'; width:100%;height: 100%; background:url('+urlImage+')');
			},
			error: function( jqXHR, textStatus, errorThrown){
				joker("p").remove(".pGoogle");
				var txtError = '<p class="pGoogle">Inforamation for ' + joker("#txtTicker").val() + " was not found</p>";
				txtError += '<p class="pGoogle">Error Infomation : ' + jqXHR.status + "</p>";
				txtError += '<p class="pGoogle">Status: ' + textStatus + "</p>";
				txtError += '<p class="pGoogle">Error Thrown: ' + errorThrown + "</p>";
				joker("#ajaxResult").append(txtError);
			},
			success: function(data, textStatus, jqXHR){
                        	joker('#loading').html('');                        
                        	joker('#wrapper').removeAttr('style');
				var parsedData = JSON.stringify(data).replace("[", "");
				parsedData = parsedData.replace("]", "");
				joker("p").remove(".pGoogle");
				var x = JSON.parse(parsedData);
				var strResult = '<p class="pGoogle">Date: ' + x.lt + '<br/>' + 
						'Ticker: ' + x.t + '<br/>' +
						'Exchange: ' + x.e + '<br/>' +
						'Last price: $' + x.l + '<br/>' + 
						'Price change: $' + x.c + '<br/>' +
						'Percent change: ' + x.cp + '%</p>';
				joker("#ajaxResult").append(strResult);
			}
		});
	});
});