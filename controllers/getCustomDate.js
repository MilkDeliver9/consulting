var getCustomDate = function(date){
	if(date.getHours() <= 5){
		switch(date.getMonth()+1){
			case 1:
				if(date.getDate() == 1){
					return (date.getFullYear()-1) + '/' + 12 + '/' + 31;
				}else {
					return date.getFullYear() + '/' + (date.getMonth()+1) + '/' + (date.getDate()-1);
				}
				break;
			case 2:
			case 4:
			case 6:
			case 8:
			case 9:
			case 11:
				if(date.getDate() == 1){
					return date.getFullYear() + '/' + date.getMonth() + '/' + 31;
				}else {
					return date.getFullYear() + '/' + (date.getMonth()+1) + '/' + (date.getDate()-1);
				}
				break;
			case 3:
				if(date.getDate() == 1){
					if((date.getFullYear()-2012)%4 == 0){
						return date.getFullYear() + '/' + date.getMonth() + '/' + 29;
					} else{
						return date.getFullYear() + '/' + date.getMonth() + '/' + 28;
					}
				}else {
					return date.getFullYear() + '/' + (date.getMonth()+1) + '/' + (date.getDate()-1);
				}
				break;
			case 5:
			case 7:
			case 9:
			case 10:
				if(date.getDate() == 1){
					return date.getFullYear() + '/' + date.getMonth() + '/' + 30;
				}else {
					return date.getFullYear() + '/' + (date.getMonth()+1) + '/' + (date.getDate()-1);
				}
				break;
		}

	}else {
		return date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate();
	}
}

exports.get = getCustomDate;