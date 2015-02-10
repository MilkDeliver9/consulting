var http = require('http');
var getDBConnection = require('./dbConnection');
var datas = require('../models/busStatus');
var getCustomDate = require('./getCustomDate');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
	
var saveBusData = function(){
	var request = http.request({host:'118.41.84.132', path:'/bis/mobilegw/appAllBusPosition.php'}, function(res){
		var data = '';

		res.on('data', function(chunk){
			data += chunk;
		});

		res.on('end', function(){
			parser.parseString(data, function(err, result){
				getDBConnection(function(err, db){
					// save BIS Data
					var consultingDB = db.db("consulting");
					var bisCol = consultingDB.collection("bisData");

					bisCol.insert(result, function(err, results){
						if(err){
							console.log(err);
						}
					});

					// save cumulative Data
					var newShelterArr = new Array();

					var date = new Date();
					var time = date.getHours() + ':' + date.getMinutes();

					//if bus not exist
					if(result.PositionInfo && result.PositionInfo.items){
						for(var bus in result.PositionInfo.items){
							var data = new datas.shelterData(
								result.PositionInfo.items[bus].CarNo.toString(),
								result.PositionInfo.items[bus].Sname.toString(),
								result.PositionInfo.items[bus].ShelterNo.toString(),
								Number(result.PositionInfo.items[bus].Passenger.toString()),
								time);
							newShelterArr.push(data);
						}
	
						accumDBUpdate(date, time, consultingDB, newShelterArr);
					}
					
				});
			});
		});
	});

	request.on('error', function(err){
		console.log(err.message);
	});

	request.on('socket', function(socket){
		socket.setTimeout(1000);
		socket.on('timeout', function(){
			request.abort();
		});
	});

	request.end();
}

var accumDBUpdate = function(date, time, consultingDB, newShelterArr){
	var today = getCustomDate.get(date);
	// check DB
	consultingDB.collection("accumData", function(err, accumCol){
		accumCol.findOne({date : today}, function(err, item){
			if(item){
				var busTimeValue;
				var shelterTimeValue;
				var curTimeValue;

				//delete error bus data
				for(var busIdx in item.bus){
					busTimeValue = Number(item.bus[busIdx].startTime.split(':',2)[0])*60 + Number(item.bus[busIdx].startTime.split(':',2)[1]);
					curTimeValue = Number(time.split(':',2)[0])*60 + Number(time.split(':',2)[1]);

					if(((busTimeValue + 90) < curTimeValue && item.bus[busIdx].shelterArray.length < 28) || item.bus[busIdx].carNo.match(/00[0-9][0-9]/)){
						item.bus.splice(item.bus.indexOf(item.bus[busIdx]),1);
					}
				}

				// update bus
				for(var shelterIdx in newShelterArr){
					var shelNum = Number(newShelterArr[shelterIdx].shelterNo);
					var isNewBus = true;


					for(var busIdx in item.bus){
						// if there are some errors : shelter length error // dup check throu time
						busTimeValue = Number(item.bus[busIdx].startTime.split(':',2)[0])*60 + Number(item.bus[busIdx].startTime.split(':',2)[1]);
						shelterTimeValue = Number(newShelterArr[shelterIdx].timeStamp.split(':',2)[0])*60 + Number(newShelterArr[shelterIdx].timeStamp.split(':',2)[1]);

						// console.log(item.bus[busIdx].carNo + ' // ' + item.bus[busIdx].startTime + ' // ' + item.bus[busIdx].shelterArray.length);
						// console.log(busTimeValue+80);
						// console.log(shelterTimeValue);

						if ((newShelterArr[shelterIdx].carNo == item.bus[busIdx].carNo) && (busTimeValue + 90) > shelterTimeValue) {
							isNewBus = false;
							// if this bus is already exist
							// don't reset 0 when bus arrived at shelNo 13
							if((shelNum >= (item.bus[busIdx].shelterArray.length-1)) && !(newShelterArr[shelterIdx].shelterNo =="13" && newShelterArr[shelterIdx].passenger == 0)){
								item.bus[busIdx].shelterArray[shelNum] = newShelterArr[shelterIdx];
								break;
							} else if(shelNum < (item.bus[busIdx].shelterArray.length-1)){
								isNewBus = true;
								break;
							}
						}
					}

					if(isNewBus) item.bus.push(new datas.busData(newShelterArr[shelterIdx].timeStamp, newShelterArr[shelterIdx].carNo));
				}

				// console.log('===========================');
				// for(var idx in item.bus){
				// 	console.log('bus Start : ' + item.bus[idx].startTime);
				// 	console.log('bus carNo : ' + item.bus[idx].carNo);

				// 	for(var bidx in item.bus[idx].shelterArray){
				// 		if(item.bus[idx].shelterArray[bidx]){
				// 			console.log('shelter Num : ' + item.bus[idx].shelterArray[bidx].shelterNo + ' // ' + item.bus[idx].shelterArray[bidx].timeStamp);
				// 		}
						
				// 	}

				// }
				// console.log('===========================');

				accumCol.save(item, {w:1}, function(err, savedItem){});

			}else {
				var busArr = new Array();
				for(var shelterIdx in newShelterArr){
					busArr.push(new datas.busData(newShelterArr[shelterIdx].timeStamp, newShelterArr[shelterIdx].carNo));
				}

				accumCol.insert({'date' : today, 'day' : date.getDay(), 'registered' : date, 'bus' : busArr}, function(err, items){});
			}
		});
	});
}

exports.saveBusData = saveBusData;

