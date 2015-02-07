var express = require('express');
var router = express.Router();
var getDBConnection = require('../controllers/dbConnection');
var getCustomDate = require('../controllers/getCustomDate');

/* GET users listing. */
router.get('/', function(req, res, next) {
  	getDBConnection(function(err, db){
		var consultingDB = db.db("consulting");
		var accumCol = consultingDB.collection("accumData");
		accumCol.findOne({date : getCustomDate.get(new Date())},function(err, item){
			res.send(item);
		});
	});
});


module.exports = router;
