function WeatherData(inputTime, wfKor, temperature, humidity, windspeed, cloud, rainSnow){
	this.inputTime = inputTime;
	this.wfKor = wfKor;
	this.temperature = temperature;
	this.humidity = humidity;
	this.windspeed = windspeed;
	this.cloud = cloud;
	this.rainSnow = rainSnow;
}

exports.weatherData = WeatherData;