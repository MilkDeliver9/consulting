var getBusTable = function(res){
	var date = new Date();
	var data = new Array();
	var busTable;

	if(date.getDay()== 0 || date.getDay() == 6){
		busTable = [{
				timezone : 7,
				colSpan : 0,
				timedata : ['-', '-', '7:40', '7:55', '8:15']
			},{
				timezone : 7,
				colSpan : 3,
				timedata : ['환호동 정차지점(계절학기만 운행)', '7:55', '8:15']
			},{
				timezone : 7,
				colSpan : 0,
				timedata : ['7:35', '7:55', '8:10', '8:25', '8:45']
			},{
				timezone : 8,
				colSpan : 3,
				timedata : ['환호동 정차지점(계절학기만 운행)', '8:25', '8:45']
			},{
				timezone : 8,
				colSpan : 3,
				timedata : ['바로크가구점 앞 출발', '8:25', '8:45']
			},{
				timezone : 8,
				colSpan : 0,
				timedata : ['8:35', '8:55', '9:10', '9:25', '9:45']
			},{
				timezone : 9,
				colSpan : 3,
				timedata : ['환호동 정차지점(계절학기만 운행)', '9:25', '9:45']
			},{
				timezone : 9,
				colSpan : 0,
				timedata : ['9:35', '9:55', '10:10', '10:25', '10:45']
			},{
				timezone : 10,
				colSpan : 3,
				timedata : ['환호동 정차지점(계절학기만 운행)', '10:25', '10:45']
			},{
				timezone : 10,
				colSpan : 0,
				timedata : ['10:30', '10:50', '11:05', '11:20', '11:40']
			},{
				timezone : 11,
				colSpan : 0,
				timedata : ['11:30', '11:50', '12:05', '12:20', '12:40']
			},{
				timezone : 12,
				colSpan : 0,
				timedata : ['12:30', '12:50', '13:05', '13:20', '13:40']
			},{
				timezone : 13,
				colSpan : 0,
				timedata : ['13:30', '13:50', '14:05', '14:20', '14:40']
			},{
				timezone : 14,
				colSpan : 0,
				timedata : ['14:20', '14:40', '14:55', '15:10', '15:30']
			},{
				timezone : 15,
				colSpan : 0,
				timedata : ['15:10', '15:30', '15:45', '16:00', '16:20']
			},{
				timezone : 16,
				colSpan : 0,
				timedata : ['16:00', '16:20', '16:35', '16:50', '17:10']
			},{
				timezone : 16,
				colSpan : 0,
				timedata : ['16:30', '16:50', '17:05', '17:20', '17:40']
			},{
				timezone : 17,
				colSpan : 0,
				timedata : ['17:00', '17:20', '17:35', '17:50', '18:10']
			},{
				timezone : 17,
				colSpan : 0,
				timedata : ['17:40', '18:00', '18:15', '18:30', '18:50']
			},{
				timezone : 18,
				colSpan : 0,
				timedata : ['18:30', '18:50', '19:05', '19:20', '19:40']
			},{
				timezone : 19,
				colSpan : 0,
				timedata : ['19:00', '19:20', '19:35', '19:50', '20:10']
			},{
				timezone : 19,
				colSpan : 0,
				timedata : ['19:50', '20:10', '20:25', '20:40', '21:00']
			},{
				timezone : 20,
				colSpan : 0,
				timedata : ['20:20', '20:40', '20:55', '21:10', '21:30']
			},{
				timezone : 21,
				colSpan : 0,
				timedata : ['21:10', '21:30', '21:45', '22:00', '22:20']
			},{
				timezone : 21,
				colSpan : 0,
				timedata : ['21:50', '22:10', '22:25', '22:40', '23:00']
			},{
				timezone : 22,
				colSpan : 0,
				timedata : ['22:40', '23:00', '23:15', '23:30', '23:50']
			},{
				timezone : 23,
				colSpan : 0,
				timedata : ['23:10', '23:30', '-', '23:35', '23:55']
			},{
				timezone : 23,
				colSpan : 0,
				timedata : ['23:40', '00:00', '00:15', '임대버스']
			}];
	} else {
		busTable = [{
				timezone : 7,
				colSpan : 0,
				timedata : ['-', '-', '7:40', '7:55', '8:15']
			},{
				timezone : 7,
				colSpan : 3,
				timedata : ['환호동 정차지점(계절학기만 운행)', '7:55', '8:15']
			},{
				timezone : 7,
				colSpan : 0,
				timedata : ['7:35', '7:55', '8:10', '8:25', '8:45']
			},{
				timezone : 8,
				colSpan : 3,
				timedata : ['환호동 정차지점(계절학기만 운행)', '8:25', '8:45']
			},{
				timezone : 8,
				colSpan : 3,
				timedata : ['바로크가구점 앞 출발', '8:25', '8:45']
			},{
				timezone : 8,
				colSpan : 0,
				timedata : ['8:35', '8:55', '9:10', '9:25', '9:45']
			},{
				timezone : 9,
				colSpan : 3,
				timedata : ['환호동 정차지점(계절학기만 운행)', '9:25', '9:45']
			},{
				timezone : 9,
				colSpan : 0,
				timedata : ['9:35', '9:55', '10:10', '10:25', '10:45']
			},{
				timezone : 10,
				colSpan : 3,
				timedata : ['환호동 정차지점(계절학기만 운행)', '10:25', '10:45']
			},{
				timezone : 10,
				colSpan : 0,
				timedata : ['10:30', '10:50', '11:05', '11:20', '11:40']
			},{
				timezone : 11,
				colSpan : 0,
				timedata : ['11:30', '11:50', '12:05', '12:20', '12:40']
			},{
				timezone : 12,
				colSpan : 0,
				timedata : ['12:30', '12:50', '13:05', '13:20', '13:40']
			},{
				timezone : 13,
				colSpan : 0,
				timedata : ['13:30', '13:50', '14:05', '14:20', '14:40']
			},{
				timezone : 14,
				colSpan : 0,
				timedata : ['14:20', '14:40', '14:55', '15:10', '15:30']
			},{
				timezone : 15,
				colSpan : 0,
				timedata : ['15:10', '15:30', '15:45', '16:00', '16:20']
			},{
				timezone : 16,
				colSpan : 0,
				timedata : ['16:00', '16:20', '16:35', '16:50', '17:10']
			},{
				timezone : 16,
				colSpan : 0,
				timedata : ['16:30', '16:50', '17:05', '17:20', '17:40']
			},{
				timezone : 17,
				colSpan : 0,
				timedata : ['17:00', '17:20', '17:35', '17:50', '18:10']
			},{
				timezone : 17,
				colSpan : 0,
				timedata : ['17:40', '18:00', '18:15', '18:30', '18:50']
			},{
				timezone : 18,
				colSpan : 0,
				timedata : ['18:30', '18:50', '19:05', '19:20', '19:40']
			},{
				timezone : 19,
				colSpan : 0,
				timedata : ['19:00', '19:20', '19:35', '19:50', '20:10']
			},{
				timezone : 19,
				colSpan : 0,
				timedata : ['19:50', '20:10', '20:25', '20:40', '21:00']
			},{
				timezone : 20,
				colSpan : 0,
				timedata : ['20:20', '20:40', '20:55', '21:10', '21:30']
			},{
				timezone : 21,
				colSpan : 0,
				timedata : ['21:10', '21:30', '21:45', '22:00', '22:20']
			},{
				timezone : 21,
				colSpan : 0,
				timedata : ['21:50', '22:10', '22:25', '22:40', '23:00']
			},{
				timezone : 22,
				colSpan : 0,
				timedata : ['22:40', '23:00', '23:15', '23:30', '23:50']
			},{
				timezone : 23,
				colSpan : 0,
				timedata : ['23:10', '23:30', '-', '23:35', '23:55']
			},{
				timezone : 23,
				colSpan : 0,
				timedata : ['23:40', '00:00', '00:15', '임대버스']
			}];
	}

	for(var idx in busTable){
		if(busTable[idx].timezone >= date.getHours()-1 && busTable[idx].timezone <= date.getHours()+2)
			data.push(busTable[idx]);
	}
	
	res.send(data);
}

exports.get = getBusTable;