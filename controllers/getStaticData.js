var getDBConnection = require('./dbConnection');

var getStaticData = function(res){
	var data = new Array();

	getDBConnection(function(err, db){
		// save BIS Data
		var consultingDB = db.db("consulting");
		var passByTimeCol = consultingDB.collection("passByTimeData");
		var passByShelCol = consultingDB.collection("passByShelData");

		passByTimeCol.findOne({date:'2015/2/6'}, function(err, item){
			data.push({'byTime' : item.timeArray});

			passByShelCol.findOne({date:'2015/2/6'}, function(err, item){
				data.push({'byShel' : item.shelterArray});
				res.send(data);
			});
		});
	});
}

exports.get = getStaticData;