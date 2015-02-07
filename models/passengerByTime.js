function PassengerByTimeData(date, day, registered){
	this.date = date;
	this.day = day;
	this.registered = registered;
	this.timeArray = new Array();
}

function TimeData(){
	this.totalPass = 0;
}

exports.passByTime = PassengerByTimeData;
exports.timeData = TimeData;
