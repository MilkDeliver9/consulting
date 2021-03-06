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
									// reduce null shelter error
									var tempPass = 0;
									
									for(var i = 1; i < item.bus[busIdx].shelterArray.length ; i++){
										if(item.bus[busIdx].shelterArray[i]){
											tempPass = item.bus[busIdx].shelterArray[i].passenger;
										}

										passData.shelterArray[i-1].totalPass += tempPass;
										passData.shelterArray[i-1].busAccount ++;
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