var express = require('express');
var router = express.Router();
var getBusTable = require('../controllers/getBusTable');
var getStaticData = require('../controllers/getStaticData');

router.get('/bustable', function(req, res, next){
	getBusTable.get(res);
});

router.get('/staticdata', function(req, res, next){
	getStaticData.get(res);
});

module.exports = router;
