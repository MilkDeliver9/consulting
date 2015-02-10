var express = require('express');
var router = express.Router();
var getBusTable = require('../controllers/getBusTable');
var getStaticByTime = require('../controllers/getStaticByTime');
var getStaticByShel = require('../controllers/getStaticByShel');

// check DB
var getDBConnection = require('../controllers/dbConnection');
var getCustomDate = require('../controllers/getCustomDate');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('present');
});

router.get('/data/bustable', function(req, res, next){
	getBusTable.get(res);
});

router.post('/data/staticByShel', function(req, res, next){
	getStaticByShel.get(req.body.from, req.body.to, res);
});

router.post('/data/staticByTime', function(req, res, next){
	getStaticByTime.get(req.body.from, req.body.to, res);
});

// check DB
router.get('/check', function(req, res, next) {
  	getDBConnection(function(err, db){
		var consultingDB = db.db("consulting");
		var accumCol = consultingDB.collection("accumData");
		accumCol.findOne({date : getCustomDate.get(new Date())},function(err, item){
			res.send(item);
		});
	});
});

// error Page
router.get('*', function(req, res, next){
	res.render('notfound');
});


module.exports = router;