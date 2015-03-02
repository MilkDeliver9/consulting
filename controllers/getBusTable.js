var getBusTable = function(res){
	var date = new Date();
	var hour = date.getHours();
	var data = new Array();
	var busTable;

	if(date.getDay()== 0 || date.getDay() == 6){
		busTable = [{
				timezone : 7,
				colSpan : 0,
				timedata : ['-', '-', '7:30', '7:45', '8:10']
			},{
				timezone : 7,
				colSpan : 0,
				timedata : ['7:40', '8:00', '8:15', '8:30', '8:55']
			},{
				timezone : 8,
				colSpan : 0,
				timedata : ['8:20', '8:40', '-', '8:40', '9:05']
			},{
				timezone : 9,
				colSpan : 0,
				timedata : ['9:00', '9:20', '9:35', '9:50', '10:15']
			},{
				timezone : 9,
				colSpan : 0,
				timedata : ['9:30', '9:50', '10:05', '10:20', '10:45']
			},{
				timezone : 10,
				colSpan : 0,
				timedata : ['10:00', '10:20', '10:35', '10:50', '11:15']
			},{
				timezone : 10,
				colSpan : 0,
				timedata : ['10:40', '11:00', '-', '11:00', '11:25']
			},{
				timezone : 11,
				colSpan : 0,
				timedata : ['11:00', '11:20', '11:35', '11:50', '12:15']
			},{
				timezone : 11,
				colSpan : 0,
				timedata : ['11:20', '11:40', '-', '11:40', '12:05']
			},{
				timezone : 11,
				colSpan : 0,
				timedata : ['11:40', '12:00', '12:15', '12:30', '12:55']
			},{
				timezone : 12,
				colSpan : 0,
				timedata : ['12:00', '12:20', '-', '12:20', '12:45']
			},{
				timezone : 12,
				colSpan : 0,
				timedata : ['12:20', '12:40', '12:55', '13:10', '13:35']
			},{
				timezone : 12,
				colSpan : 0,
				timedata : ['12:40', '13:00', '13:15', '13:30', '13:55']
			},{
				timezone : 13,
				colSpan : 0,
				timedata : ['13:00', '13:20', '13:35', '13:50', '14:15']
			},{
				timezone : 13,
				colSpan : 0,
				timedata : ['13:20', '13:40', '13:55', '14:10', '14:35']
			},{
				timezone : 13,
				colSpan : 0,
				timedata : ['13:40', '14:00', '14:15', '14:30', '14:55']
			},{
				timezone : 14,
				colSpan : 0,
				timedata : ['14:00', '14:20', '-', '14:20', '14:45']
			},{
				timezone : 14,
				colSpan : 0,
				timedata : ['14:20', '14:40', '14:55', '15:10', '15:35']
			},{
				timezone : 14,
				colSpan : 0,
				timedata : ['14:40', '15:00', '-', '15:00', '15:25']
			},{
				timezone : 15,
				colSpan : 0,
				timedata : ['15:00', '15:20', '15:35', '15:50', '15:15']
			},{
				timezone : 15,
				colSpan : 0,
				timedata : ['15:20', '15:40', '-', '15:40', '16:05']
			},{
				timezone : 15,
				colSpan : 0,
				timedata : ['15:40', '16:00', '16:15', '16:30', '16:55']
			},{
				timezone : 16,
				colSpan : 0,
				timedata : ['16:00', '16:20', '-', '16:20', '16:45']
			},{
				timezone : 16,
				colSpan : 0,
				timedata : ['16:20', '16:40', '16:55', '17:10', '17:35']
			},{
				timezone : 16,
				colSpan : 0,
				timedata : ['16:40', '17:00', '17:15', '17:30', '17:55']
			},{
				timezone : 17,
				colSpan : 0,
				timedata : ['17:00', '17:20', '-', '17:20', '17:45']
			},{
				timezone : 17,
				colSpan : 0,
				timedata : ['17:20', '17:40', '17:55', '18:10', '18:35']
			},{
				timezone : 17,
				colSpan : 0,
				timedata : ['17:40', '18:00', '18:15', '18:30', '18:55']
			},{
				timezone : 18,
				colSpan : 0,
				timedata : ['18:00', '18:20', '18:35', '18:50', '19:15']
			},{
				timezone : 18,
				colSpan : 0,
				timedata : ['18:20', '18:40', '18:55', '19:10', '19:35']
			},{
				timezone : 18,
				colSpan : 0,
				timedata : ['18:40', '19:00', '-', '19:00', '19:25']
			},{
				timezone : 19,
				colSpan : 0,
				timedata : ['19:00', '19:20', '19:35', '19:50', '20:15']
			},{
				timezone : 19,
				colSpan : 0,
				timedata : ['19:20', '19:40', '19:55', '20:10', '20:35']
			},{
				timezone : 19,
				colSpan : 0,
				timedata : ['19:40', '20:00', '20:15', '20:30', '20:55']
			},{
				timezone : 20,
				colSpan : 0,
				timedata : ['20:00', '20:20', '20:35', '20:50', '21:15']
			},{
				timezone : 20,
				colSpan : 0,
				timedata : ['20:20', '20:40', '20:55', '21:10', '21:35']
			},{
				timezone : 20,
				colSpan : 0,
				timedata : ['20:40', '21:00', '-', '21:00', '21:25']
			},{
				timezone : 21,
				colSpan : 0,
				timedata : ['21:00', '21:20', '21:35', '21:50', '22:15']
			},{
				timezone : 21,
				colSpan : 0,
				timedata : ['21:30', '21:50', '22:05', '22:20', '22:45']
			},{
				timezone : 21,
				colSpan : 0,
				timedata : ['21:50', '22:10', '22:25', '22:40', '23:05']
			},{
				timezone : 22,
				colSpan : 0,
				timedata : ['22:20', '22:40', '22:55', '23:10', '23:35']
			},{
				timezone : 22,
				colSpan : 0,
				timedata : ['22:50', '23:10', '23:25', '23:40', '0:05']
			},{
				timezone : 23,
				colSpan : 0,
				timedata : ['23:15', '23:35', '-', '23:35', '0:00']
			},{
				timezone : 24,
				colSpan : 0,
				timedata : ['0:10', '0:20', '0:35', '-', '-']
			},{
				timezone : 24,
				colSpan : 0,
				timedata : ['0:10', '0:20', '정원 초과시 운행']
			}];
	} else {
		busTable = [{
				timezone : 6,
				colSpan : 0,
				timedata : ['-', '-', '6:50', '7:05', '7:30']
			},{
				timezone : 7,
				colSpan : 0,
				timedata : ['-', '-', '-', '7:40', '8:05']
			},{
				timezone : 7,
				colSpan : 0,
				timedata : ['7:00', '7:20', '7:35', '7:50', '8:15']
			},{
				timezone : 7,
				colSpan : 3,
				timedata : ['정원 초과시 운행', '7:50', '8:15']
			},{
				timezone : 7,
				colSpan : 3,
				timedata : ['바로크 가구점 앞(환호동차 동시운행)', '7:50', '8:15']
			},{
				timezone : 7,
				colSpan : 0,
				timedata : ['7:30', '7:50', '8:05', '8:20', '8:45']
			},{
				timezone : 7,
				colSpan : 3,
				timedata : ['바로크 가구점 앞(환호동차 동시운행)', '7:55', '8:15']
			},{
				timezone : 8,
				colSpan : 0,
				timedata : ['8:30', '8:50', '9:05', '9:20', '9:45']
			},{
				timezone : 8,
				colSpan : 0,
				timedata : ['9:00', '9:20', '-', '9:20', '9:45']
			},{
				timezone : 9,
				colSpan : 3,
				timedata : ['바로크 가구점 앞(환호동차 동시운행)', '9:20', '9:45']
			},{
				timezone : 9,
				colSpan : 2,
				timedata : ['정원초과시운행', '-', '9:20', '9:45']
			},{
				timezone : 9,
				colSpan : 0,
				timedata : ['9:00', '9:20', '9:35', '9:50', '10:15']
			},{
				timezone : 9,
				colSpan : 0,
				timedata : ['9:50', '10:10', '-', '10:10', '10:35']
			},{
				timezone : 10,
				colSpan : 0,
				timedata : ['10:00', '10:20', '10:35', '10:50', '11:15']
			},{
				timezone : 10,
				colSpan : 3,
				timedata : ['바로크 가구점 앞(환호동차 동시운행)', '10:50', '11:15']
			},{
				timezone : 11,
				colSpan : 0,
				timedata : ['11:20', '11:40', '-', '11:40', '12:05']
			},{
				timezone : 11,
				colSpan : 0,
				timedata : ['11:30', '11:50', '12:05', '12:20', '12:45']
			},{
				timezone : 12,
				colSpan : 0,
				timedata : ['12:00', '12:20', '-', '12:20', '12:45']
			},{
				timezone : 12,
				colSpan : 0,
				timedata : ['12:40', '13:00', '-', '13:00', '13:25']
			},{
				timezone : 13,
				colSpan : 0,
				timedata : ['13:00', '13:20', '13:35', '13:50', '14:15']
			},{
				timezone : 13,
				colSpan : 0,
				timedata : ['13:30', '13:50', '-', '13:50', '14:15']
			},{
				timezone : 14,
				colSpan : 0,
				timedata : ['14:00', '14:20', '-', '14:20', '14:45']
			},{
				timezone : 14,
				colSpan : 0,
				timedata : ['14:30', '14:50', '15:05', '15:20', '15:45']
			},{
				timezone : 14,
				colSpan : 0,
				timedata : ['14:30', '14:50', '-', '14:50', '15:15']
			},{
				timezone : 14,
				colSpan : 0,
				timedata : ['14:55', '15:15', '-', '15:15', '15:40']
			},{
				timezone : 15,
				colSpan : 0,
				timedata : ['15:10', '15:30', '15:45', '16:00', '16:25']
			},{
				timezone : 15,
				colSpan : 0,
				timedata : ['15:30', '15:50', '-', '15:50', '16:15']
			},{
				timezone : 16,
				colSpan : 0,
				timedata : ['16:00', '16:20', '16:35', '16:50', '17:15']
			},{
				timezone : 16,
				colSpan : 0,
				timedata : ['16:00', '16:20', '-', '-', '-']
			},{
				timezone : 16,
				colSpan : 0,
				timedata : ['16:30', '16:50', '-', '16:50', '17:15']
			},{
				timezone : 16,
				colSpan : 0,
				timedata : ['16:30', '16:50', '17:05', '17:20', '17:45']
			},{
				timezone : 17,
				colSpan : 0,
				timedata : ['17:00', '17:20', '-', '17:20', '17:45']
			},{
				timezone : 17,
				colSpan : 0,
				timedata : ['17:30', '17:50', '18:05', '18:20', '18:45']
			},{
				timezone : 17,
				colSpan : 0,
				timedata : ['17:30', '17:50', '-', '17:50', '18:15']
			},{
				timezone : 17,
				colSpan : 0,
				timedata : ['17:50', '18:10', '18:25', '18:40', '19:05']
			},{
				timezone : 17,
				colSpan : 0,
				timedata : ['17:50', '18:10', '정원 초과시 운행']
			},{
				timezone : 18,
				colSpan : 0,
				timedata : ['18:15', '18:35', '18:50', '19:05', '19:30']
			},{
				timezone : 18,
				colSpan : 0,
				timedata : ['18:15', '18:35', '-', '18:35', '19:00']
			},{
				timezone : 18,
				colSpan : 0,
				timedata : ['18:30', '18:50', '19:05', '19:20', '19:45']
			},{
				timezone : 19,
				colSpan : 0,
				timedata : ['19:00', '19:20', '-', '19:20', '19:45']
			},{
				timezone : 19,
				colSpan : 0,
				timedata : ['19:00', '19:20', '19:35', '19:50', '20:15']
			},{
				timezone : 19,
				colSpan : 0,
				timedata : ['19:20', '19:40', '-', '19:40', '20:05']
			},{
				timezone : 19,
				colSpan : 0,
				timedata : ['19:40', '20:00', '20:15', '20:30', '20:55']
			},{
				timezone : 20,
				colSpan : 0,
				timedata : ['20:00', '20:20', '-', '20:20', '20:45']
			},{
				timezone : 20,
				colSpan : 0,
				timedata : ['20:20', '20:40', '-', '20:40', '21:05']
			},{
				timezone : 20,
				colSpan : 0,
				timedata : ['20:40', '21:00', '21:15', '21:30', '21:55']
			},{
				timezone : 21,
				colSpan : 0,
				timedata : ['21:00', '21:20', '-', '21:20', '21:45']
			},{
				timezone : 21,
				colSpan : 0,
				timedata : ['21:30', '21:50', '-', '21:50', '21:15']
			},{
				timezone : 21,
				colSpan : 0,
				timedata : ['21:30', '21:50', '22:05', '22:20', '22:45']
			},{
				timezone : 22,
				colSpan : 0,
				timedata : ['22:00', '22:20', '-', '22:20', '22:45']
			},{
				timezone : 22,
				colSpan : 0,
				timedata : ['22:20', '22:40', '22:55', '23:10', '23:35']
			},{
				timezone : 22,
				colSpan : 0,
				timedata : ['22:20', '22:40', '-', '22:40', '23:05']
			},{
				timezone : 22,
				colSpan : 0,
				timedata : ['22:50', '23:10', '23:25', '23:40', '24:05']
			},{
				timezone : 22,
				colSpan : 0,
				timedata : ['22:50', '23:10', '-', '23:10', '23:35']
			},{
				timezone : 23,
				colSpan : 0,
				timedata : ['23:10', '23:30', '-', '23:30', '23:55']
			},{
				timezone : 23,
				colSpan : 0,
				timedata : ['23:40', '0:00', '0:15', '0:30', '0:55']
			},{
				timezone : 23,
				colSpan : 0,
				timedata : ['23:40', '0:00', '-', '0:00', '0:25']
			},{
				timezone : 24,
				colSpan : 0,
				timedata : ['0:10', '0:30', '-', '-', '-']
			},{
				timezone : 25,
				colSpan : 0,
				timedata : ['1:00', '1:20', '1:35', '-', '-']
			},{
				timezone : 25,
				colSpan : 0,
				timedata : ['1:00', '1:20', '정원 초과시 운행']
			}];
	}

	if(hour < 4) hour = 24;

	for(var idx in busTable){
		if(busTable[idx].timezone >= hour-1 && busTable[idx].timezone <= hour + 2)
			data.push(busTable[idx]);
	}
	
	res.send(data);
}

exports.get = getBusTable;