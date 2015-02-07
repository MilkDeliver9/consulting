var getDBConnection = require('./dbConnection');
var datas = require('../models/passengerByTime');

var savePassByTime = function(today){
	var passData;

	getDBConnection(function(err, db){
		var consultingDB = db.db("consulting");
		consultingDB.collection("passByTimeData", function(err, passByTimeCol){
			passByTimeCol.findOne({date : today}, function(err, item){
				if(!item){
					consultingDB.collection("accumData", function(err, accumCol){
						accumCol.findOne({date : today}, function(err, item){
							if(item){
								passData = new datas.passByTime(today, item.day, item.registered);

								//init passData
								for(var i = 0; i < 22 ; i++){
									passData.timeArray.push(new datas.timeData());
								}

								for(var busIdx in item.bus){
									var maxPass = new Array();

									// init pass
									for(var i = 0; i < 22 ; i++){
										maxPass[i] = 0;
									}

									for(var shelIdx in item.bus[busIdx].shelterArray){

										if(item.bus[busIdx].shelterArray[shelIdx]){
											switch(Number(item.bus[busIdx].shelterArray[shelIdx].timeStamp.split(':',2)[0])){
												case 6:
												case 7:
												case 8:
												case 9:
												case 10:
												case 11:
												case 12:
												case 13:
												case 14:
												case 15:
												case 16:
												case 17:
												case 18:
												case 19:
												case 20:
												case 21:
												case 22:
												case 23:
													if(item.bus[busIdx].shelterArray[shelIdx].passenger > maxPass[Number(item.bus[busIdx].shelterArray[shelIdx].timeStamp.split(':',2)[0])-6]){
														maxPass[Number(item.bus[busIdx].shelterArray[shelIdx].timeStamp.split(':',2)[0])-6] = item.bus[busIdx].shelterArray[shelIdx].passenger;
													}
													break;
												case 0:
												case 1:
												case 2:
												case 3:
													if(item.bus[busIdx].shelterArray[shelIdx].passenger > maxPass[Number(item.bus[busIdx].shelterArray[shelIdx].timeStamp.split(':',2)[0])+18]){
														maxPass[Number(item.bus[busIdx].shelterArray[shelIdx].timeStamp.split(':',2)[0])+18] = item.bus[busIdx].shelterArray[shelIdx].passenger;
													}
													break;
											}
										}
									}

									// sum pass
									for(var i = 0; i < 22 ; i++){
										passData.timeArray[i].totalPass += maxPass[i];
									}
								}

								passByTimeCol.insert(passData, function(err, result){});
							}
						});
					});
				}
			})
		});
	});
}

exports.save = savePassByTime;