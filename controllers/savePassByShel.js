var getDBConnection = require('./dbConnection');
var datas = require('../models/passengerByShelter');

var savePassByShel = function(today){
	var passData;

	getDBConnection(function(err, db){
		var consultingDB = db.db("consulting");
		consultingDB.collection("passByShelData", function(err, passByShelCol){
			passByShelCol.findOne({date : today}, function(err, item){
				if(!item){
					consultingDB.collection("accumData", function(err, accumCol){
						accumCol.findOne({date : today}, function(err, item){
							if(item){
								passData = new datas.passByShel(today, item.day , item.registered);

								//init passData
								for(var i = 0; i < 27 ; i++){
									passData.shelterArray.push(new datas.shelData());
								}

								for(var busIdx in item.bus){

									for(var shelIdx in item.bus[busIdx].shelterArray){
										if(item.bus[busIdx].shelterArray[shelIdx]){
											passData.shelterArray[Number(item.bus[busIdx].shelterArray[shelIdx].shelterNo)-1].totalPass += item.bus[busIdx].shelterArray[shelIdx].passenger;
											passData.shelterArray[Number(item.bus[busIdx].shelterArray[shelIdx].shelterNo)-1].busAccount ++;
										}
									}
								}

								// cal average
								for(var i = 0; i < 27 ; i++){
									passData.shelterArray[i].average = Math.round(passData.shelterArray[i].totalPass / passData.shelterArray[i].busAccount);
								}

								passByShelCol.insert(passData, function(err, result){});
							}
						});
					});
				}
			});
		});
	});
}

exports.save = savePassByShel;