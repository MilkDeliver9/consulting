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
		socket.setTimeout(3000);
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
				var shelterCount;
				
				try {
					//delete error bus data
					for(var busIdx in item.bus){
						busTimeValue = Number(item.bus[busIdx].startTime.split(':',2)[0])*60 + Number(item.bus[busIdx].startTime.split(':',2)[1]);
						curTimeValue = Number(time.split(':',2)[0])*60 + Number(time.split(':',2)[1]);
						shelterCount = 0;

						if(((busTimeValue + 90) < curTimeValue && item.bus[busIdx].shelterArray.length < 3) || item.bus[busIdx].carNo.match(/00[0-9][0-9]/)){
							item.bus.splice(item.bus.indexOf(item.bus[busIdx]),1);
						}

						for(var shelIdx in item.bus[busIdx].shelterArray){
							if(item.bus[busIdx].shelterArray[shelIdx]){
								shelterCount++;
							}
						}

						if((busTimeValue + 20) < curTimeValue && shelterCount <=2){
							item.bus.splice(item.bus.indexOf(item.bus[busIdx]),1);
						}
						
					}
				} catch(e){
					console.log(e);
					console.log(item.bus);
					console.log('//////');
					for(var busIdx in item.bus){
						console.log(item.bus[busIdx]);
						console.log('//////');
					}
				}

				// update bus
				for(var shelterIdx in newShelterArr){
					var shelNum = Number(newShelterArr[shelterIdx].shelterNo);
					var isNewBus = true;
					var index = -1;

					for(var busIdx in item.bus){
						if(newShelterArr[shelterIdx].carNo == item.bus[busIdx].carNo){
							index = item.bus.indexOf(item.bus[busIdx]);
						}
					}

					if(index >= 0){
						if(shelNum >= (item.bus[index].shelterArray.length-2)){
							// don't reset 0 when bus arrived at shelNo 13 or 27
							if(!((newShelterArr[shelterIdx].shelterNo =="13" || newShelterArr[shelterIdx].shelterNo =="27") && newShelterArr[shelterIdx].passenger == 0)){
								item.bus[index].shelterArray[shelNum] = newShelterArr[shelterIdx];
							}
						} else {
							item.bus.push(new datas.busData(newShelterArr[shelterIdx].timeStamp, newShelterArr[shelterIdx].carNo));
						}
					} else {
						item.bus.push(new datas.busData(newShelterArr[shelterIdx].timeStamp, newShelterArr[shelterIdx].carNo));
					}

				}

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

