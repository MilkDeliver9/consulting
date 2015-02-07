function BusData(startTime, carNo){
	this.startTime = startTime;
	this.carNo = carNo;
	this.shelterArray = new Array();
}

function ShelterData(carNo, shelterName, shelterNo, passenger, timeStamp) {
	this.carNo = carNo;
	this.shelterName = shelterName;
	this.shelterNo = shelterNo;
	this.passenger = passenger;
	this.timeStamp = timeStamp;
}

exports.busData = BusData;
exports.shelterData = ShelterData;