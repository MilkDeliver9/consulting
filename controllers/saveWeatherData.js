var http = require('http');
var getDBConnection = require('./dbConnection');
var datas = require('../models/weatherData');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

var saveWeatherData = function(){
	var request = http.request({host:'www.kma.go.kr', path:'/wid/queryDFSRSS.jsp?zone=4711325000'}, function(res){
		var data = '';

		res.on('data', function(chunk){
			data += chunk;
		});

		res.on('end', function(){
			parser.parseString(data, function(err, result){
				try {
					var curWeather = result.rss.channel[0].item[0].description[0].body[0].data[0];

					var date = new Date();
					var curTime = date.getHours() + ':' + date.getMinutes();
					var today = date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate();

					var weatherData = new datas.weatherData(curTime,
															curWeather.wfKor.toString(),
															curWeather.temp.toString(),
															curWeather.reh.toString(),
															curWeather.ws.toString(),
															curWeather.sky.toString(),
															curWeather.pty.toString());

					getDBConnection(function(err, db){
						var consultingDB = db.db("consulting");
						consultingDB.collection("weatherData", function(err, weatherCol){
							weatherCol.findOne({date : today}, function(err, item){
								if(item){
									item.weather.push(weatherData);
									weatherCol.save(item, {w:1}, function(err, savedItem){});
								}else {
									weatherCol.insert({'date' : today, 'registered' : date , 'day' : date.getDay(), 'weather' : [weatherData]}, function(err, items){});
								}
							});
						});
					});
				} catch(e) {
					console.log(e);
				}
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

exports.saveWeatherData = saveWeatherData;
