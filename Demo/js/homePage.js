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
			error: function( jqXHR, textStatus, errorThrown){
				joker("p").remove(".pMarkit");
				var txtError = '<p class="pMarkit">jqXHR: ' + jqXHR + " Status: " + textStatus + " Error Thrown: " + errorThrown + "</p>";
				joker("#markitResult").append(txtError);
			},
			success: function(data, textStatus, jqXHR){
				joker("p").remove(".pMarkit");
				var parsedData = JSON.parse(JSON.stringify(data));
				var strResult = '<p class="pMarkit">Status: ' + parsedData.Status + '</p>';
				strResult += '<p class="pMarkit">' + parsedData.Symbol + ': ' + parsedData.Name + '<br/>';
				strResult += 'Open: ' + formatDollar(parsedData.Open) + '</p>';
				strResult += 'Last Price: ' + formatDollar(parsedData.LastPrice) + '<br/>';
				strResult += 'Range: ' + formatDollar(parsedData.Low) + ' - ' + formatDollar(parsedData.High) + '<br/>';
				strResult += formatDollar(parsedData.Change) + ' | ' + parsedData.ChangePercent.toFixed(2) + '%<br/>';
				strResult += 'Market Cap: ' + formatDollar(parsedData.MarketCap) + '<br/>';
				strResult += 'Volume: ' + addCommas(parsedData.Volume) + '<br/>';
				strResult += 'Change YTD: ' + formatDollar(parsedData.ChangeYTD) + ' | ' + parsedData.ChangePercentYTD.toFixed(2) + '%<p/>';
				strResult += 'Change % YTD: ' + 
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
			error: function( jqXHR, textStatus, errorThrown){
				joker("p").remove(".pGoogle");
				var txtError = '<p class="pGoogle">Inforamation for ' + joker("#txtTicker").val() + " was not found</p>";
				txtError += '<p class="pGoogle">Error Infomation : ' + jqXHR.status + "</p>";
				txtError += '<p class="pGoogle">Status: ' + textStatus + "</p>";
				txtError += '<p class="pGoogle">Error Thrown: ' + errorThrown + "</p>";
				joker("#ajaxResult").append(txtError);
			},
			success: function(data, textStatus, jqXHR){
				var parsedData = JSON.stringify(data).replace("[", "");
				parsedData = parsedData.replace("]", "");
				var x = JSON.parse(parsedData);
				joker("p").remove(".pGoogle");
				joker("#ajaxResult").append('<p class="pGoogle">Date: ' + x.lt + "</p>");
				joker("#ajaxResult").append('Ticker: ' + x.t + "<br/>");
				joker("#ajaxResult").append('Exchange: ' + x.e + "</p>");
				joker("#ajaxResult").append('Last price: $' + x.l + "<br/>");
				joker("#ajaxResult").append('Price change: $' + x.c + "<br/>");
				joker("#ajaxResult").append('Percent change: ' + x.cp + "%<br/>");
			}
		});
	});
});