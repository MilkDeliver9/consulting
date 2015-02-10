var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

// node schedule
var schedule = require('node-schedule');
// process
var getCustomDate = require('./controllers/getCustomDate');
var saveBus = require('./controllers/saveBUSdata');
var saveWeather = require('./controllers/saveWeatherData');
var savePassByShel = require('./controllers/savePassByShel');
var savePassByTime = require('./controllers/savePassByTime');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// background saving (bus data, weather data, passBySehl)
setInterval(saveBus.saveBusData, 5000);

var ruleOfWeather = new schedule.RecurrenceRule();
ruleOfWeather.minute = 30;
 
var weather = schedule.scheduleJob(ruleOfWeather, function(){
    saveWeather.saveWeatherData();
});

var ruleOfPassBy = new schedule.RecurrenceRule();
ruleOfPassBy.dayOfWeek = [new schedule.Range(0, 6)];
ruleOfPassBy.hour = 4;
ruleOfPassBy.minute = 30;
 
var passBy = schedule.scheduleJob(ruleOfPassBy, function(){
    console.log('saved statistic');
    savePassByShel.save(getCustomDate.get(new Date()));
    savePassByTime.save(getCustomDate.get(new Date()));
});

module.exports = app;
