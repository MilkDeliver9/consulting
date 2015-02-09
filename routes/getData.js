var express = require('express');
var router = express.Router();
var getBusTable = require('../controllers/getBusTable');
var getStaticByTime = require('../controllers/getStaticByTime');
var getStaticByShel = require('../controllers/getStaticByShel');

router.get('/bustable', function(req, res, next){
	getBusTable.get(res);
});

// router.get('/staticByTime', function(req, res, next){
// 	getStaticByTime.get('2015/2/2', '2015/3/10', res);
// });

router.post('/staticByShel', function(req, res, next){
	getStaticByShel.get(req.body.from, req.body.to, res);
});

router.post('/staticByTime', function(req, res, next){
	getStaticByTime.get(req.body.from, req.body.to, res);
});

module.exports = router;
