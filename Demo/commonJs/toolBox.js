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