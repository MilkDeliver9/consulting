function PassengerByShelterData(date, day, registered){
	this.date = date;
	this.day = day;
	this.registered = registered;
	this.shelterArray = new Array();
}

function ShelterData(){
	this.totalPass = 0;
	this.busAccount = 0;
	this.average = 0;
}

exports.passByShel = PassengerByShelterData;
exports.shelData = ShelterData;