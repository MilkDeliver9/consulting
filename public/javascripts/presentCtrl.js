var app = angular.module('Present',['ngRoute']);

app.filter('timeform',function(){
	return function(input){
		if(input=='---')
			return input;
		
		var hour=input[0]+input[1];
		var min =input[2]+input[3];
	
		return hour+':'+min;
	}

});

app.config(['$routeProvider',function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl: 'present',
			controller: 'presentController'
		})
		.when('/past',{
			templateUrl:'past',
			controller: 'pastController'
		})
		.when('/predict',{
			templateUrl:'predict',
			controller: 'predictController'
		})

}]);


app.controller('pastController',['$scope','$http','$window',function($scope,$http,$window){
//*****************************CHART PAGE*****************************************//
	$scope.chartflag=false;
	$scope.chartd_time=new Array();
	$scope.chartd_shelter=[];
	$scope.timerowdata=[];
	$scope.functionflag=false;
	$scope.dayflag=false;
	$scope.c;
	$scope.d;
	$scope.timedflag=false;

	$scope.paramfrom='';
	$scope.paramto='';

	$scope.dbstartday=new Date(2015,02,02);


	$scope.fromdate=$scope.dbstartday;
	$scope.todate=new Date();

	//*****************GOTO CHARTPAGE BUTTON + SHELTER DATA GET*******************//
	$scope.paramfrom=$scope.fromdate.getFullYear()+'/'+$scope.fromdate.getMonth()+'/'+$scope.fromdate.getDate();
	$scope.paramto=$scope.todate.getFullYear()+'/'+($scope.todate.getMonth()+1)+'/'+$scope.todate.getDate();
		

	$scope.post_shelter=function(){
		$scope.functionflag=true;
		var pass=0;
		param={'from':$scope.paramfrom,'to':$scope.paramto};
			$http.post('data/staticByShel',param)
			.success(function(data,status,headers,config){
				console.log(data);
			  	$scope.chartd_shelter=data;
			  	for(var idx in $scope.chartd_shelter){
			  		pass=$scope.todate.getDate()-$scope.fromdate.getDate();
			  		
			  		$scope.chartd_shelter[idx].totalPass=Math.floor($scope.chartd_shelter[idx].totalPass/pass);
					
			  	}
			  	$scope.post_time();
			  })
			  .error(function(data,status,headers,config){
			  	console.log(status);
			  });
			//Shel data
	};
	//*****************GOTO CHARTPAGE BUTTON + SHELTER DATA GET END***************//

	//***************************** TIME DATA GET ******************************//	
	$scope.post_time=function(){
		$scope.chartd_time = new Array();

		for(var i = 0; i<7;i++){
			$scope.chartd_time.push(new Array);

			for(var idx = 0; idx < 22 ; idx++){
				$scope.chartd_time[i].push({'totalPass':0});
			}
		}

		param={'from':$scope.paramfrom,'to':$scope.paramto};

		$http.post('data/staticByTime',param).
			  success(function(data,status,headers,config){
				$scope.chart_time=new Array();
					for(var idx in data)
				  		{
				  			switch(data[idx].day)
				  			{
				  				case 0:
				  				$scope.chartd_time[6]=data[idx].timeArray;
								$scope.timerowdata[6]=data[idx];
				  				break;
				  				case 1:
				  				case 2:
				  				case 3:
				  				case 4:
				  				case 5:
				  				case 6:
				  				$scope.chartd_time[data[idx].day-1]=data[idx].timeArray;
				  				$scope.timerowdata[data[idx].day-1]=data[idx];
				  			};
				  		}
				  	for(var idx in $scope.chartd_time)
				  	{
				  		$scope.chart_time=$scope.chart_time.concat($scope.chartd_time[idx]);
				  	}

				  	$scope.timedflag=false;

			  		//if(!$scope.chartflag)
			  	$scope.drawchart();
			  		//console.log($scope.chart_time);
			  })
			  .error(function(data,status,headers,config){
			  	console.log(status);
			  });

	};
	//***************************** TIME DATA GET END***************************//	
	//******************************* DRAW CHART *******************************//
	$scope.drawchart = function(){
		var chart=jui.include("chart.builder");
		//console.log($scope.chartd_shelter);
		if($scope.chartflag==false){
				$scope.c = chart("#GraphByTime",{
		            width: 900, height : 400, theme : "jennifer", padding : 50,
		            axis : {
		                x : {
		                    domain : ["07"," "," ","10"," "," ","13"," "," ","16"," "," ","19"," "," ","22"," "," ","01"," "," "," ","07"," "," ","10"," "," ","13"," "," ","16"," "," ","19"," "," ","22"," "," ","01"," "," "," ","07"," "," ","10"," "," ","13"," "," ","16"," "," ","19"," "," ","22"," "," ","01"," "," "," ","07"," "," ","10"," "," ","13"," "," ","16"," "," ","19"," "," ","22"," "," ","01"," "," "," ","07"," "," ","10"," "," ","13"," "," ","16"," "," ","19"," "," ","22"," "," ","01"," "," "," ","07"," "," ","10"," "," ","13"," "," ","16"," "," ","19"," "," ","22"," "," ","01"," "," "," ","07"," "," ","10"," "," ","13"," "," ","16"," "," ","19"," "," ","22"," "," ","01"," "," ","04"],	
		                    line : true, full:true
		                },
		                y :
		                { type :'range',domain : [0, 500],step : 10},

		            },
		            brush : 
		            [   {type:'splitarea',split: 110},
		                {type:'splitline',split: 110},
		                {type:'scatter',colors:['#7af819']},
		                {type:'pin',split:"21"},
		                {type:'pin',split:"44"},
		                {type:'pin',split:"66"},
		                {type:'pin',split:"88"},
		                {type:'pin',split:"110"},
		                {type:'pin',split:"132"}  ],
		            widget : 
		            [   {type : "title",text:"Passenger by time"},
		                {type : "tooltip",orient:'top',brush:2},
		                {type : "title",text : "Mon",dx:-345,dy:40},
		                {type : "title",text : "Tue",dx:-230,dy:40},
		                {type : "title",text : "Wed",dx:-115,dy:40},
		                {type : "title",text : "Thu",dx:0,dy:40},
		                {type : "title",text : "Fri",dx:115,dy:40},
		                {type : "title",text : "Sat",dx:230,dy:40},
		                {type : "title",text : "Sun",dx:345,dy:40}  ],
		            style:{ lineSplitBorderColor:'#e9f819', areaSplitBackgroundColor:'#e9f819'}
		        });
			
		//chart - Passenger with time

			$scope.d = chart("#GraphByShelter",{
	            width: 900, height : 400, theme : "jennifer", padding : {right:120},
	            axis : [{
	                x : {
	                	type:'block',
	                    domain : ["학교","●","●","●","●","●","환호동","●","●","●","●","●","●","육거리","●","●","●","●","●","●","환호동","●","●","●","●","●","학교"],	  
						line : true,
						full: true
	                },
	                y :
	                { type : 'range',domain : [0, 1000],step : 5, color:'#e9f819'},
	                 //data : $scope.chartd_shelter
	             },
	             	{
	                 x : {extend:0,hide:true},
	                 y :{type : 'range',domain : [0, 100],step : 5,orient:'right' },
	                 // data : $scope.chartd_shelter
	             }
	            ],
	            brush : 
	            [	{type:'area',target:'totalPass',colors:['#7af819']},
	                {type:'line',target:'average',axis:1},
	                {type:'line',target:'totalPass',colors:['#7af819']},
	                {type:'scatter',target:'totalPass',colors:['#7af819']},
	                {type:'scatter',target:'average',axis:1},
	                {type:"pin",split:"13"}
	            ],
	            widget : 
	            [	{type : "title",text : "Passenger by Shelter"},
	                {type: "title",text: "학교 >> 목적지(육거리,환호동)",dx: -224,dy: 40},
	                {type:"title",text: " 목적지(육거리,환호동)>>학교",dx: 224,dy: 40},
	                {type:"legend",brush:[0,1],align:'end'},
	                {type:'tooltip',brush:3,all:'true'},
	                {type:'tooltip',brush:4,all:'true'}
	            ]
		    });
		//chart - Passenger with Shelter
			
		}
		else{
			$scope.d.axis(0).update($scope.chartd_shelter);
			$scope.d.axis(1).update($scope.chartd_shelter);
			$scope.c.axis(0).update($scope.chart_time);
			$scope.chart_time=new Array();
			$scope.chartd_time=new Array();
		}
		$scope.chartflag=true;
		$scope.timedflag=true;
		if(!$scope.dayflag)
			$scope.drawdaypicer();
	};
	//******************************* DRAW CHART END****************************//
	//******************************* DRAW DAY PICKER **************************//
 	$scope.drawdaypicer=function(){
 		jui.ready([ "ui.datepicker" ], function(datepicker) {
			datepicker1 = datepicker("#datepicker1", {
			    titleFormat: "yyyy년 MM월",
			    format: "yyyy/MM/dd",
			    date:$scope.paramfrom,
			    event: {
			       select: function(date,e){
			       		$scope.fromdate=new Date(date);
			       		if($scope.fromdate<$scope.todate){
			       			$scope.paramfrom=$scope.fromdate.getFullYear()+'/'+($scope.fromdate.getMonth()+1)+'/'+$scope.fromdate.getDate();
						}
						else{
							window.alert('select error - prev date must before next date')
							$('td.active').removeClass('active');
							$scope.fromdate=$scope.dbstartday;
							$scope.todate=new Date();
							$scope.paramfrom=$scope.fromdate.getFullYear()+'/'+($scope.fromdate.getMonth()+1)+'/'+$scope.fromdate.getDate();
							$scope.paramto=$scope.todate.getFullYear()+'/'+($scope.todate.getMonth()+1)+'/'+$scope.todate.getDate();
						

						}

			       	}
			    }
			});
			datepicker2 = datepicker("#datepicker2", {
			    titleFormat: "yyyy년 MM월",
			    format: "yyyy/MM/dd",
			    date:$scope.todate,
			    event: {
			       select: function(date,e){
			       		$scope.todate=new Date(date);
			       		if($scope.todate>$scope.fromdate){
			       			$scope.paramto=$scope.todate.getFullYear()+'/'+($scope.todate.getMonth()+1)+'/'+$scope.todate.getDate();
						}
						else{
							window.alert('select error - next date must before prev date')
							$('td.active').removeClass('active');
							$scope.fromdate=$scope.dbstartday;
							$scope.todate=new Date();
							$scope.paramfrom=$scope.fromdate.getFullYear()+'/'+($scope.fromdate.getMonth()+1)+'/'+$scope.fromdate.getDate();
							$scope.paramto=$scope.todate.getFullYear()+'/'+($scope.todate.getMonth()+1)+'/'+$scope.todate.getDate();
						}
			       }
			    }
			});
		});
		$scope.dayflag=true;
 	};
	//******************************* DRAW DAY PICKER END **********************//

	$scope.dateset=function(){
		$scope.post_shelter();
	}

//*****************************CHART PAGE END*************************************//

}]);
app.controller('predictController',['$scope','$http',function($scope,$http){
//******************* PREDICT TIME TABLE PAGE**********************************//
	$scope.functionflag=false;
	$scope.measuredata=[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
	$scope.measuredata_H=[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
	$scope.predicttime=
		[
		{'dest':0,'_id':1,'times':{'a':"0705"}},
		{'dest':0,'_id':2,'times':{'a':"0800"}},
		{'dest':0,'_id':3,'times':{'a':"0900"}},
		{'dest':0,'_id':4,'times':{'a':"1000"}},
		{'dest':0,'_id':5,'times':{'a':"1100"}},
		{'dest':0,'_id':6,'times':{'a':"1200"}},
		{'dest':0,'_id':7,'times':{'a':"1300"}},
		{'dest':0,'_id':8,'times':{'a':"1400"}},
		{'dest':0,'_id':9,'times':{'a':"1500"}},
		{'dest':0,'_id':10,'times':{'a':"1600"}},
		{'dest':0,'_id':11,'times':{'a':"1700"}},
		{'dest':0,'_id':12,'times':{'a':"1800"}},
		{'dest':0,'_id':13,'times':{'a':"1900"}},
		{'dest':0,'_id':14,'times':{'a':"2000"}},
		{'dest':0,'_id':15,'times':{'a':"2100"}},
		{'dest':0,'_id':15,'times':{'a':"2140"}},
		{'dest':0,'_id':17,'times':{'a':"2300"}},
		{'dest':0,'_id':17,'times':{'a':"2340"}},
		{'dest':0,'_id':18,'times':{'a':"2420"}},
		];			// Static bus - in precict table
	$scope.predicttime_H=
		[
		{'dest':0,'_id':1,'times':{'a':"0705"}},
		{'dest':0,'_id':2,'times':{'a':"0800"}},
		{'dest':0,'_id':3,'times':{'a':"0900"}},
		{'dest':0,'_id':4,'times':{'a':"1000"}},
		{'dest':0,'_id':5,'times':{'a':"1100"}},
		{'dest':0,'_id':6,'times':{'a':"1200"}},
		{'dest':0,'_id':7,'times':{'a':"1300"}},
		{'dest':0,'_id':8,'times':{'a':"1400"}},
		{'dest':0,'_id':9,'times':{'a':"1500"}},
		{'dest':0,'_id':10,'times':{'a':"1600"}},
		{'dest':0,'_id':11,'times':{'a':"1700"}},
		{'dest':0,'_id':12,'times':{'a':"1800"}},
		{'dest':0,'_id':13,'times':{'a':"1900"}},
		{'dest':0,'_id':14,'times':{'a':"2000"}},
		{'dest':0,'_id':15,'times':{'a':"2100"}},
		{'dest':0,'_id':15,'times':{'a':"2140"}},
		{'dest':0,'_id':17,'times':{'a':"2300"}},
		{'dest':0,'_id':17,'times':{'a':"2340"}},
		{'dest':0,'_id':18,'times':{'a':"2420"}},
		];			// Static bus - in precict table
	$scope.tableflag=false;
	$scope.timerowdata=[];
	//****************** VIEW & MAIN FUNCTION CALL ****************************//

	//****************** VIEW & MAIN FUNCTION CALL END*************************//
	//****************** DATA GET TO MAKE TIME TABLE **************************//
	$scope.post_time=function(){
		$scope.functionflag=true;
		param={'from':"2015/02/02",'to':"2015/03/10"};
		$http.post('data/staticByTime',param).
			  success(function(data,status,headers,config){
				for(var idx in data)
			  		{
			  			switch(data[idx].day)
			  			{
			  				case 0:
							$scope.timerowdata[6]=data[idx];
			  				break;
			  				case 1:
			  				case 2:
			  				case 3:
			  				case 4:
			  				case 5:
			  				case 6:
			  				$scope.timerowdata[data[idx].day-1]=data[idx];
			  			};
			  		}
			  		
					$scope.averPass();
			  })
			  .error(function(data,status,headers,config){
			  	console.log(status);
			  });

	};
	//****************** DATA GET TO MAKE TIME TABLE END**************************//

	//******************* CALCULATE AVERAGE PASS WITH TIME VALUE ***************//
	$scope.averPass=function(){
		var passnum=0;		//total passenger by time data
		for(var idx in $scope.timerowdata)
		{
			if($scope.timerowdata[idx].day>0 && $scope.timerowdata[idx].day<6)
			{  
				for(var time in $scope.timerowdata[idx].timeArray)
				{
					if(idx<1)
						$scope.measuredata[time].passVal=$scope.timerowdata[idx].timeArray[time].totalPass;
					$scope.measuredata[time].passVal+=$scope.timerowdata[idx].timeArray[time].totalPass;
				}
			}
			else
			{
				for(var time in $scope.timerowdata[idx].timeArray)
				{
					if(idx<1)
						$scope.measuredata_H[time].passVal=$scope.timerowdata[idx].timeArray[time].totalPass;
					$scope.measuredata_H[time].passVal+=$scope.timerowdata[idx].timeArray[time].totalPass;
				}
			}
		}
		for(var idx in $scope.measuredata)
				{
					$scope.measuredata[idx].passVal/=5;
					passnum+=$scope.measuredata[idx].passVal;
				}
		for(var idx in $scope.measuredata_H)
			{
				$scope.measuredata_H[idx].passVal/=2;
			}
		//console.log("Total pass with time data: "+passnum);

		$scope.predicttime=$scope.tableAlgo($scope.measuredata,$scope.predicttime);
		$scope.predicttime_H=$scope.tableAlgo($scope.measuredata_H,$scope.predicttime_H);
	};
	// This function will working in Chart page, after passBytime funciton call.
	//******************* CALCULATE AVERAGE PASS WITH TIME VALUE END************//



	//****************** SET & ADD OBJECT TO TIMETABLE DATA *******************//
	$scope.tableAlgo=function(measure,predict){
		for(var idx in measure)
		{
			if(measure[idx].passVal!=0)
				measure[idx].busNeeds=Math.floor(measure[idx].passVal/60+1);
			else
		   		measure[idx].busNeeds=0;
			measure[idx].realBus=0;
		}
		
		//Aver pass calculate
		for(var idx in predict)
		{
			 measure[predict[idx]._id].realBus++;
		}
		//Count real bus number
		for(var idx in measure)
		{	
			var busnum=60/(measure[idx].busNeeds-measure[idx].realBus+1);
			while(true){
			 	var count=0;
				if(measure[idx].busNeeds>measure[idx].realBus)
				{
					var abc=String(Number(idx)+6)+String(busnum);
					busnum+=busnum;
					var obj={'dest':1,'_id':Number(idx),'times':{'a':abc}};
					for(var index in predict){
					 	if(predict[index]._id>idx)
					 	{	
					 		measure[predict[index]._id].busNeeds=(Number(measure[predict[index]._id+1].busNeeds)-1);
					 		predict.splice(count,0,obj);
					 		break;
					 	}
					 	else
					 		count++;
					}
				    measure[idx].realBus++;
				}
				 else
					 break;
			}

		}
		predict=$scope.caltimetable(predict);
		//Add new bus to needs
		return predict;
	}
	//****************** SET & ADD OBJECT TO TIMETABLE DATA END****************//
	//****************** CALCULATE TIME VALUE WITH STRING VALUE ***************//

	$scope.caltime=function(string,num){
		if(string.length<4)
			string='0'+string;
		var hour=Number(string[0]+string[1]);
		var min =Number(string[2]+string[3]);
		min=min+num;
		while(true){
			if(min>59){
				hour+=1;
				min-=60;
			}
			else
				break;
		}
		
		if(hour>23){
			hour=hour-24;   
		} 
		if(hour<10){
			hour='0'+String(hour);
		}
		if(min<10){
			min='0'+String(min);
		}
		return String(hour)+String(min);
	};
	//****************** CALCULATE TIME VALUE WITH STRING VALUE END************//
	
	//****************** CALCULATE REAL BUS TABLE WITH START TIME**************//
	$scope.caltimetable=function(timetable){
		console.log(timetable);
		for(var time in timetable)
		{
			if(timetable[time].dest<1){
				timetable[time].times.a=$scope.caltime(timetable[time].times.a,0);
				timetable[time].times.b=$scope.caltime(timetable[time].times.a,20);
				timetable[time].times.c=$scope.caltime(timetable[time].times.a,35);
				timetable[time].times.d=$scope.caltime(timetable[time].times.a,50);
				timetable[time].times.e=$scope.caltime(timetable[time].times.a,70); 
			}
			// Case 6ways bus
			else{
				timetable[time].times.a=$scope.caltime(timetable[time].times.a,0);
				timetable[time].times.b=$scope.caltime(timetable[time].times.a,20);
				timetable[time].times.c='---'
				timetable[time].times.d=$scope.caltime(timetable[time].times.a,25);
				timetable[time].times.e=$scope.caltime(timetable[time].times.a,45); 
			}
			// Case Hwan bus
	    }
	$scope.tableflag=true;

	return timetable;

	};
	//****************** CALCULATE REAL BUS TABLE WITH START TIME END**********//
//******************* PREDICT TIME TABLE PAGE END ********************************//

}]);
app.controller('presentController',['$scope','$window','$http',function($scope,$window,$http){

//****************************MAIN PAGE PART*********************************//
	// **************************DATA TO MAP*******************************//

	$scope.centerXarea=36.076149;				//google maps center xval
	$scope.centerYarea=129.39200;				//google maps center yval
	$scope.cbus='';
	$scope.rooturl='http://consulting.handong.edu:8080/';
	$scope.busStop=
	 	[
		 {"num":1, "xarea": 36.10363741, "yarea": 129.3907629},
		 {"num":2, "xarea": 36.08201475, "yarea": 129.4055177},
		 {"num":3, "xarea": 36.0818941, "yarea": 129.3984391},
		 {"num":4, "xarea": 36.08193402, "yarea": 129.3927931},
		 {"num":5, "xarea": 36.0779776, "yarea": 129.3923392},
		 {"num":6, "xarea": 36.0763572, "yarea": 129.3959634},
		 {"num":7, "xarea": 36.06978682, "yarea": 129.3973878},
		 {"num":8, "xarea": 36.06876, "yarea": 129.3920045},
		 {"num":9, "xarea": 36.06568746, "yarea": 129.384675},
		 {"num":10, "xarea": 36.06112634, "yarea": 129.3796298},
		 {"num":11, "xarea": 36.05511792, "yarea": 129.376448},
		 {"num":12, "xarea": 36.05103383, "yarea": 129.3722614},
		 {"num":13, "xarea": 36.04615438, "yarea": 129.3713212},
		 {"num":14, "xarea": 36.04083627, "yarea": 129.3668841}
	 	];
	//Static bus Stop information
	$scope.pathinfo=
		[
		{"xarea": 36.10363741, "yarea": 129.3907629},	//1
		{"xarea": 36.105704 ,"yarea": 129.397942}, 		//scool 3
		{"xarea": 36.099619 ,"yarea": 129.410537}, 		//factory enter
		{"xarea": 36.095077 ,"yarea": 129.407662}, 		//factory middle
		{"xarea": 36.090291 ,"yarea": 129.417490}, 		//factory end
		{"xarea": 36.084980,"yarea":129.415863},		//jookchen
		{"xarea": 36.080372 ,"yarea": 129.416438},		//yeonam
		{"xarea": 36.079782 ,"yarea": 129.411567},		//3line
		{"xarea": 36.082560,"yarea": 129.409757},		//pohang uni.
		{"xarea": 36.08201475, "yarea": 129.4055177},	//2
		{"xarea": 36.0818941, "yarea": 129.3984391},	//3
		{"xarea": 36.08193402, "yarea": 129.3927931},	//4
		{"xarea": 36.0779776, "yarea": 129.3923392},	//5
		{"xarea": 36.076149 ,"yarea": 129.392674},
		{"xarea": 36.0763572, "yarea": 129.3959634}, 	//barok 6
		{"xarea": 36.076392 ,"yarea": 129.397094},	
		{"xarea": 36.070027 ,"yarea": 129.399197},
		{"xarea": 36.06978682, "yarea": 129.3973878}, 	//hwan 7
		{"xarea": 36.06876, "yarea": 129.3920045},    	//8
		{"xarea": 36.06568746, "yarea": 129.384675},    //9
		{"xarea": 36.06112634, "yarea": 129.3796298},   //10
		{"xarea": 36.05511792, "yarea": 129.376448},	//11
		{"xarea": 36.05103383, "yarea": 129.3722614},	//12
		{"xarea": 36.04615438, "yarea": 129.3713212},	//13
		{"xarea": 36.04083627, "yarea": 129.3668841},	//14
		];
	//Googlemaps red line path
	

	$scope.markers="icon:"+$scope.rooturl+"public/images/bus_stop.png";
	$scope.yookbus="icon:"+$scope.rooturl+"public/images/bus_icon1.png";
	$scope.hwanbus="icon:"+$scope.rooturl+"public/images/bus_icon2.png";
	$scope.buspath="color:red";
	$scope.buspath_blue1="color:blue";
	$scope.buspath_blue2="color:blue";
	$scope.mapflag=false;

	for(var i in $scope.busStop)
	 {	$scope.markers=$scope.markers+"%7C"+$scope.busStop[i].xarea+","+$scope.busStop[i].yarea;
		}   
		// Set bus Stop marker
	for(var i in $scope.pathinfo)
	  { $scope.buspath = $scope.buspath+"%7C"+$scope.pathinfo[i].xarea+","+$scope.pathinfo[i].yarea;
		}  
		// Set path line 

	$scope.buspath_blue1 = $scope.buspath_blue1+"%7C"+ "36.099619" + "," + "129.410537";
	$scope.buspath_blue1 = $scope.buspath_blue1+"%7C"+ "36.095545" + "," + "129.420172";
	$scope.buspath_blue1 = $scope.buspath_blue1+"%7C"+ "36.090291" + "," + "129.417490";
		//Blue path in Factory

	$scope.buspath_blue2 = $scope.buspath_blue2+"%7C" + "36.05103383" +","+ "129.3722614";
	$scope.buspath_blue2 = $scope.buspath_blue2+"%7C" + "36.04083627" +","+ "129.3668841";
		//Blue path in 6ways

	//*****************************DATA TO MAP END*******************************//

	
	//*****************************SOCKET PART***********************************//
	//$window.socket.disconnect();
	$window.socket = io.connect('consulting.handong.edu:8080');
	$scope.timetable=[];
	$scope.dataflag=false;
	$scope.timeflag=false;
	$scope.busdata=[];   //bus data
	
	//*****************************PART OF WEATHER DATA**************************//
	$scope.weather=[];   //weather data 
	$window.socket.on('weatherData',function(weatherdata){
		$scope.weather=weatherdata;
		$scope.$apply();

	});

	$window.socket.emit('request',{message:'msg'});

	//WEATHER data listener

	//*****************************WEATHER PART END******************************//
	
	//*****************************REALTIME BUS DATA*****************************//
	$window.socket.on('bisData',function(data){
		$scope.busdata=[];
		if(data.PositionInfo && data.PositionInfo.items){
			$scope.dataflag=false;
			$scope.yookbus="icon:"+$scope.rooturl+"public/images/bus_icon1.png";
			$scope.hwanbus="icon:"+$scope.rooturl+"public/images/bus_icon2.png";

			for(var idx in data.PositionInfo.items){
			 	if(data.PositionInfo.items[idx].Endname=='육거리'||data.PositionInfo.items[idx].Startname=='육거리')
					 $scope.yookbus=$scope.yookbus+"%7C"+data.PositionInfo.items[idx].Latitude+","+data.PositionInfo.items[idx].Longitude;
				else
			 		 $scope.hwanbus=$scope.hwanbus+"%7C"+data.PositionInfo.items[idx].Latitude+","+data.PositionInfo.items[idx].Longitude;
			$scope.busdata[idx]=data.PositionInfo.items[idx];
			}
		}
		else
			$scope.dataflag=true;
		$scope.mapflag=true;
		$scope.$apply();
	});

	//***************************BUS DATA END***********************************//
	//***************************SOCKET PART END********************************//

	//***************************BUSTABLE PART**********************************//
	$http.get("data/bustable").
	  success(function(data,status,headers,config){
	  	 //console.log(data);
	  	 if(data.length>0){
			$scope.timetable=data;
	  	 }
	  	 else{
	  	 	$scope.timeflag=true;
	  	 }
	  }).
	  error(function(data,status,headers,config){
	  	console.log(status);
	  });
	//get current bus table
	//***************************BUSTABLE PART END********************************//
	//**************************GO TO MAIN BUTTON****************************//



	//**************************BUTTON END************************************//

//******************************MAIN PAGE END ************************************//



	

	
}]);