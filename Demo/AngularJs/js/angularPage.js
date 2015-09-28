var joker = jQuery.noConflict();
var MarkitApp = angular.module("MarkitApp", ['ngRoute']);
MarkitApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when('/getChart', {
			templateUrl: 'getChart.htm',
			controller: 'markitGetChartController'
		}).
		when('/getLookup', {
			templateUrl: 'getLookup.htm', 
			controller: 'markitLookupController'
		}).
		when('/getQuote', {
			templateUrl: 'getQuote.htm', 
			controller: 'markitGetQuoteController'
		}).
		when('/askForName', {
			templateUrl: 'askForName.htm',
			controller: 'markitGetNameController'
		}).
		otherwise({
			redirectTo: '/askForName'
		});
}]);
MarkitApp.controller('markitGetChartController', function($scope){
	$scope.types = [
		{type : 'area'},
		{type : 'areaspline'},
		{type : 'candlestick'},
		{type : 'column'},
		{type : 'flags'},
		{type : 'line'},
		{type : 'ohlc'},
		{type : 'scatter'},
		{type : 'spline'}
	];
	$scope.chartTypes = $scope.types[8];
	$scope.numberOfDays = 120;
	$scope.getChart = {
		strSearchTerm: readCookie("lastTicker"),
		params: function(){ 
				return {
					"parameters" : JSON.stringify({									
					"Normalized": "false",
					"NumberOfDays": $scope.numberOfDays,
					"DataPeriod": "Day",
					"Elements": [
							{
								"Symbol": readCookie("lastTicker"),
								"Type": "price",
								"Params": ["ohlc"]
							},
							{
								"Symbol": readCookie("lastTicker"),
								"Type": "volume"
							}
						]
					})
				};
		},
		submitChart: function(){
					ajaxMarkitQuote("http://dev.markitondemand.com/Api/v2/InteractiveChart/jsonp", $scope.getChart.params(), $scope.getChart.successCallBack);
		},
		successCallBack: function(data){
					var oData = [];
					var oVolume = [];
					var parsedData = JSON.parse(JSON.stringify(data));
					//joker('#divChartData').append(JSON.stringify(data));
					joker.each(parsedData.Elements, function(key, value){
						if(value.DataSeries.volume == null){
							var i;
							for(i = 0; i < value.DataSeries.close.values.length; i++){
								oData[i] = [new Date(parsedData.Dates[i]).getTime(), value.DataSeries.open.values[i], value.DataSeries.high.values[i], value.DataSeries.low.values[i], value.DataSeries.close.values[i]]; 
							}		
						}else{
							var i;
							for(i = 0; i < value.DataSeries.volume.values.length; i++){
								oVolume[i] = [new Date(parsedData.Dates[i]).getTime(), value.DataSeries.volume.values[i]]; 
							}		
						}
					});				
					joker('#divChart').highcharts('StockChart', {
						chart:{
							type: $scope.chartTypes.type
						},
            					rangeSelector : {
                					selected : 1
            					},
            					title : {
                					text : readCookie("lastTicker")
            					},
	            				yAxis: [{
                					labels: {
                    						align: 'right',
                    						x: -3
                					},
                					title: {
                    						text: 'Price'
                					},
                					height: '60%',
                					lineWidth: 2
            					},{
                					labels: {
                    						align: 'right',
                    						x: -3
                					},
                					title: {
                    						text: 'Volume'
                					},
                					top: '65%',
                					height: '15%',
                					offset: 0,
                					lineWidth: 2
            					}],
            					series : [{
								type: $scope.chartTypes.type,
                						name : readCookie("lastTicker"),
                						data : oData,
                						tooltip: {
                							valueDecimals: 2
                						}
							},{
								type: 'column',
                						name : 'Volume',
                						data : oVolume,
								yAxis: 1,
                						tooltip: {
                							valueDecimals: 2
                						}
            					}]
       				});
		}
	}
	$scope.getChart.submitChart();
});
MarkitApp.controller('markitLookupController', function($scope){
	$scope.lookup = {
			strSearchTerm: readCookie("lastLookup"),
			params: function(){ 
					return {
						"input" : $scope.lookup.strSearchTerm
					};
			},
			submitTicker: function(){
					ajaxMarkitQuote("http://dev.markitondemand.com/Api/v2/Lookup/jsonp", $scope.lookup.params(), $scope.lookup.successCallBack);
					createCookie("lastLookup",$scope.lookup.strSearchTerm,5);
			},
			successCallBack: function(data){
					joker("p").remove(".pLookup");
					joker("table").remove("#lookUpTable");
					var parsedData = JSON.parse(JSON.stringify(data));
					if(parsedData.Message != 'undefined'){
						var strResult = '<table id="lookUpTable"><tr><td>Symbol</td><td>Name</td><td>Exchange</td></tr>';
						joker.each(parsedData, function(key, value){
							strResult += "<tr><td>" + value.Symbol + "</td><td>" + value.Name + "</td><td>" + value.Exchange + "</td></tr>";
						});							
					}else{
						strResult += '<p class="pLookup">Message: ' + parsedData.Message + '</p>';
					}
					joker("#divLookup").append(strResult);
			}
	}
	$scope.messageLookup = "It worked.";
});
MarkitApp.controller('markitGetQuoteController', function($scope){
	$scope.getQuote = {
			strTickerSymbol: readCookie("lastTicker"),
			params: function(){ 
					return {
						"Symbol" : $scope.getQuote.strTickerSymbol
					};
			},	
			chartParams: function(){ 
				return {
					"parameters" : JSON.stringify({									
					"Normalized": "false",
					"NumberOfDays": 5,
					"EndOffsetDays" : 5,
					"DataInterval" : 5,
					"DataPeriod": "Minute",
					"LabelPeriod" : "Minute",
					"LabelInterval" : 1,
					"Elements": [
							{
								"Symbol": readCookie("lastTicker"),
								"Type": "price",
								"Params": ["ohlc"]
							}
						]
					})
				};
			},			
			submitTicker: function(){
					ajaxMarkitQuote("http://dev.markitondemand.com/Api/v2/Quote/jsonp", $scope.getQuote.params(), $scope.getQuote.successCallBack);
					createCookie("lastTicker",$scope.getQuote.strTickerSymbol,5);
					ajaxMarkitQuote("http://dev.markitondemand.com/Api/v2/InteractiveChart/jsonp", $scope.getQuote.chartParams(), $scope.getQuote.successChartCallBack);
			},
			successCallBack: function(data){
						var strResult = '';
						joker("div").remove(".pQuote");
						joker("p").remove(".pQuote");
						joker("label").remove(".pQuote");
						var parsedData = JSON.parse(JSON.stringify(data));
						if(parsedData.Status == 'SUCCESS'){							
							joker("#quoteName").append('<p id="quoteNameP" class="pQuote">' + parsedData.Name + ' - ' + parsedData.Symbol + '</p>');
							strResult += '<div class="container pQuote">';
							strResult += '<div class="row">';
							joker("#quoteLastPriceContainer").append('<div class="col-lg-4 pQuote"><label class="pQuote">Last Price: <p id="quoteLastPrice" class="pQuote">' + formatDollar(parsedData.LastPrice) + '</p></label></div>');
							createCookie("lastPrice",parsedData.LastPrice,5);
							strResult += '<div class="col-lg-4">';
							strResult += '<div class="row quoteInfoRow">';
							strResult += '<div class="pQuote col-lg-4 quoteInfo quoteLeft"><span class="makeBold">Open:</span></div><div class="pQuote col-lg-2 quoteInfo">&nbsp;</div><div class="pQuote col-lg-6 quoteInfo quoteRight">' + formatDollar(parsedData.Open) + '</div>';
							strResult += '</div>';
							strResult += '<div class="row quoteInfoRow">';
							strResult += '<div class="pQuote col-lg-4 quoteInfo quoteLeft"><span class="makeBold">Range:</span></div><div class="pQuote col-lg-2 quoteInfo">&nbsp;</div><div class="pQuote col-lg-6 quoteInfo quoteRight">' + formatDollar(parsedData.Low) + ' - ' + formatDollar(parsedData.High) + '</div>';
							strResult += '</div>';
							strResult += '<div class="row quoteInfoRow">';
							strResult += '<div class="pQuote col-lg-4 quoteInfo quoteLeft"><span class="makeBold">Change:</span></div><div class="pQuote col-lg-2 quoteInfo">&nbsp;</div><div class="pQuote col-lg-6 quoteInfo quoteRight">' + formatDollar(parsedData.Change) + ' | ' + parsedData.ChangePercent.toFixed(2) + '%</div>';
							strResult += '</div>';
							strResult += '<div class="row quoteInfoRow">';
							strResult += '<div class="pQuote col-lg-4 quoteInfo quoteLeft"><span class="makeBold">Market Cap:</span></div><div class="pQuote col-lg-2 quoteInfo">&nbsp;</div><div class="pQuote col-lg-6 quoteInfo quoteRight">' + formatDollar(parsedData.MarketCap) + '</div>';
							strResult += '</div>';
							strResult += '<div class="row quoteInfoRow">';
							strResult += '<div class="pQuote col-lg-4 quoteInfo quoteLeft"><span class="makeBold">Volume:</span></div><div class="pQuote col-lg-2 quoteInfo">&nbsp;</div><div class="pQuote col-lg-6 quoteInfo quoteRight">' + addCommas(parsedData.Volume) + '</div>';
							strResult += '</div>';
							strResult += '<div class="row quoteInfoRow">';
							strResult += '<div class="pQuote col-lg-4 quoteInfo quoteLeft"><span class="makeBold">Year Start:</span></div><div class="pQuote col-lg-2 quoteInfo">&nbsp;</div><div class="pQuote col-lg-6 quoteInfo quoteRight">' + formatDollar(parsedData.ChangeYTD) + '%</div>';
							strResult += '</div>';
							strResult += '<div class="row quoteInfoRow">';
							strResult += '<div class="pQuote col-lg-4 quoteInfo quoteLeft"><span class="makeBold">Change YTD:</span></div><div class="pQuote col-lg-2 quoteInfo">&nbsp;</div><div class="pQuote col-lg-6 quoteInfo quoteRight">' + parsedData.ChangePercentYTD.toFixed(2) + '%</div>';
							strResult += '</div>';
							strResult += '</div>';
							strResult += '</div>';
							strResult += '</div>';
							joker("#divQuote").append(strResult);
						}else{
							joker('#quoteError').css({"display" : "block"});
							joker('#quoteContainer').css({"display" : "none"});
							joker("#quoteName").append('<div class="pQuote"><p id="quoteError" class="pQuote">No information for ticker symbol ' + $scope.getQuote.strTickerSymbol + ' was found.</p></div>');
							joker("#quoteError").append('<div class="pQuote"><p id="quoteError" class="pQuote">No information for ticker symbol ' + $scope.getQuote.strTickerSymbol + ' was found.</p></div>');
						}
			},
			successChartCallBack:  function(data){
//alert(JSON.stringify(data));
					joker("p").remove('#quoteChartErrorMessage');
					var oData = [];
					var oVolume = [];
					var parsedData = JSON.parse(JSON.stringify(data));
					joker.each(parsedData.Elements, function(key, value){
						if(value.DataSeries.volume == null){
							var i;
							for(i = 0; i < value.DataSeries.close.values.length; i++){
								oData[i] = [new Date(parsedData.Dates[i]).getTime(), value.DataSeries.open.values[i], value.DataSeries.high.values[i], value.DataSeries.low.values[i], value.DataSeries.close.values[i]]; 
							}		
						}else{
							var i;
							for(i = 0; i < value.DataSeries.volume.values.length; i++){
								oVolume[i] = [new Date(parsedData.Dates[i]).getTime(), value.DataSeries.volume.values[i]]; 
							}		
						}
					});
					if(oData.length > 0){
						joker('#divQuoteChart').highcharts('StockChart', {
							chart:{
								type: 'line'
							},
            						rangeSelector : {
                						selected : 1
            						},
            						title : {
                						text : readCookie("lastTicker")
            						},
	            					yAxis: [{
                						labels: {
                    							align: 'right',
                    							x: -3
                						},
                						title: {
                    							text: 'Price'
                						},
                						height: '60%',
                						lineWidth: 2
            						}],
            						series : [{
								type: 'line',
                						name : readCookie("lastTicker"),
                						data : oData,
                						tooltip: {
                							valueDecimals: 2
                						}
            						}]
       					});
				}else{
					joker('#divQuoteChart').append('<p id="quoteChartErrorMessage">Was not able to retrieve any stock information, the market maybe closed.</p>');
				}
			}
	}
	$scope.getQuote.submitTicker();
});
MarkitApp.controller('markitGetNameController', function($scope){
	$scope.markit = {
			yourName: '',
			getName: function(){
					return $scope.markit.yourName;
			}
	}
});
				
function ajaxMarkitQuote(url, field, callback){
	var strResult = "";
	joker.ajax({
			url: url,
			method: "POST",
			data: field,
			dataType : "jsonp",
                	beforeSend: function ( xhr ) {
                    		var loading = '<img src ="../images/loader.gif"/>';
                    		var urlImage = '../images/bg4.png';
                    		var opacity = "0.7";
                    		joker('#loading').html(loading);
                    		joker('#wrapper').attr('style','position: fixed;top: 0%; z-index:99999; left: 0%; opacity:'+opacity+'; width:100%;height: 100%; background:url('+urlImage+')');
                	},
			error: function( jqXHR, textStatus, errorThrown){
					alert("failed");
					strResult = "Failed";
			},
			success: function(data, textStatus, jqXHR){
                        		joker('#loading').html('');                        
                        		joker('#wrapper').removeAttr('style');
					callback(data);			
			}
	});	
}
joker(document).ready(function() {
	joker(".menuItem").click(function(){
					joker(this).siblings().removeClass('active');
					joker(this).addClass('active');
	});	
});