var app = angular.module('Present',[]);


app.controller('Present_control',['$scope','$window','$http',function($scope,$window,$http){

$scope.centerXarea=36.076149;
$scope.centerYarea=129.39200;
$scope.cbus='';
$scope.rooturl='http://consulting.handong.edu:8080/';
$scope.present_view=true;
$scope.past_view=false;
$scope.predict_view=false;

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
    {"xarea": 36.10363741, "yarea": 129.3907629},   //1
    {"xarea": 36.105704 ,"yarea": 129.397942},      //scool 3
    {"xarea": 36.099619 ,"yarea": 129.410537},      //factory enter
    {"xarea": 36.095077 ,"yarea": 129.407662},      //factory middle
    {"xarea": 36.090291 ,"yarea": 129.417490},      //factory end
    {"xarea": 36.084980,"yarea":129.415863},        //jookchen
    {"xarea": 36.080372 ,"yarea": 129.416438},      //yeonam
    {"xarea": 36.079782 ,"yarea": 129.411567},      //3line
    {"xarea": 36.082560,"yarea": 129.409757},       //pohang uni.
    {"xarea": 36.08201475, "yarea": 129.4055177},   //2
    {"xarea": 36.0818941, "yarea": 129.3984391},    //3
    {"xarea": 36.08193402, "yarea": 129.3927931},   //4
    {"xarea": 36.0779776, "yarea": 129.3923392},    //5
    {"xarea": 36.076149 ,"yarea": 129.392674},
    {"xarea": 36.0763572, "yarea": 129.3959634},    //barok 6
    {"xarea": 36.076392 ,"yarea": 129.397094},  
    {"xarea": 36.070027 ,"yarea": 129.399197},
    {"xarea": 36.06978682, "yarea": 129.3973878},   //hwan 7
    {"xarea": 36.06876, "yarea": 129.3920045},      //8
    {"xarea": 36.06568746, "yarea": 129.384675},    //9
    {"xarea": 36.06112634, "yarea": 129.3796298},   //10
    {"xarea": 36.05511792, "yarea": 129.376448},    //11
    {"xarea": 36.05103383, "yarea": 129.3722614},   //12
    {"xarea": 36.04615438, "yarea": 129.3713212},   //13
    {"xarea": 36.04083627, "yarea": 129.3668841},   //14
    ];

$scope.predicttime=[
    "0705","0800","0900","1000","1100","1200","1300","1400","1500","1600","1700",
    "1800","1900","2000","2100","2140","2340","2420","2450"



    ];
//Googlemaps red line path

$scope.markers="icon:"+$scope.rooturl+"public/images/bus_stop.png";
$scope.yookbus="icon:"+$scope.rooturl+"public/images/bus_icon1.png";
$scope.hwanbus="icon:"+$scope.rooturl+"public/images/bus_icon2.png";
$scope.buspath="color:red";
$scope.buspath_blue1="color:blue";
$scope.buspath_blue2="color:blue";
$scope.mapflag=false;
$scope.timetable=[];
$scope.dataflag=false;
$scope.timeflag=false;
$scope.chartflag=false;
for(var i in $scope.busStop)
 {  $scope.markers=$scope.markers+"%7C"+$scope.busStop[i].xarea+","+$scope.busStop[i].yarea;
    
    }   
    // Set bus Stop marker
for(var i in $scope.pathinfo)
  { $scope.buspath = $scope.buspath+"%7C"+$scope.pathinfo[i].xarea+","+$scope.pathinfo[i].yarea;
    }  
    // Set path line 

$scope.buspath_blue1 = $scope.buspath_blue1+"%7C"+ "36.099619" + "," + "129.410537";
$scope.buspath_blue1 = $scope.buspath_blue1+"%7C"+ "36.095545" + "," + "129.420172";
$scope.buspath_blue1 = $scope.buspath_blue1+"%7C"+ "36.090291" + "," + "129.417490";

$scope.buspath_blue2 = $scope.buspath_blue2+"%7C" + "36.05103383" +","+ "129.3722614";
$scope.buspath_blue2 = $scope.buspath_blue2+"%7C" + "36.04083627" +","+ "129.3668841";

$scope.busdata=[];   //bus data
$scope.weather=[];   //weather data 

$http.get("data/bustable").
  success(function(data,status,headers,config){
     //console.log(data);
     if(data){
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

$scope.chartd_time=[{},{},{},{},{},{},{}];
$scope.chartd_shelter=[];
$scope.chart_time=[];

$scope.post_time=function(){
    param={'from':"2015/02/02",'to':"2015/03/10"};
    $http.post('data/staticByTime',param).
          success(function(data,status,headers,config){
                for(var idx in data)
                {
                    switch(data[idx]._id)
                    {
                        case 0:
                        $scope.chartd_time[6]=data[idx].value.timeArray;
                        break;
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        $scope.chartd_time[data[idx]._id-1]=data[idx].value.timeArray;
                    };
                
                }

                for(var idx in $scope.chartd_time)
                {
                    $scope.chart_time=$scope.chart_time.concat($scope.chartd_time[idx]);
                }
                

                $scope.drawchart();
          })
          .error(function(data,status,headers,config){
            console.log(status);
          });

};


$window.socket = io.connect('consulting.handong.edu:8080');
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
            //console.log($scope.busdata.length);
        }
    }
    else
        $scope.dataflag=true;
    
    //console.log($scope.busdata.length);
    
        $scope.mapflag=true;
        $scope.$apply();
});
//BUS data listener
$window.socket.on('weatherData',function(weatherdata){
    $scope.weather=weatherdata;
//   console.log(weatherdata);
    $scope.$apply();
});
//WEATHER data listener

$scope.present=function(){
    $scope.present_view = true;
    $scope.past_view=false;
    $scope.predict_view=false;
};
$scope.past=function(){
    param={'from':"2015/02/02",'to':"2015/03/10"};

        $http.post('data/staticByShel',param).
          success(function(data,status,headers,config){
            // console.log(data);
            $scope.chartd_shelter=data;
            $scope.post_time();

          })
          .error(function(data,status,headers,config){
            console.log(status);
          });
        //Shel data

        
        
    $scope.present_view = false;
    $scope.past_view=true;
    $scope.predict_view=false;

};
$scope.predict=function(){
    $scope.present_view = false;
    $scope.past_view=false;
    $scope.predict_view=true;
};
// VIEW SELECTOR - footer button
$scope.drawchart = function(){
jui.ready([ "chart.builder" ],function(chart){
                c = chart("#GraphByTime",{
                    width: 900,
                    height : 400,
                    theme : "jennifer",
                    padding : 50,
                    axis : {
                        x : {
                            domain : [
                                "07"," "," ","10"," "," ","13"," "," ","16"," "," ","19"," "," ","22"," "," ","01"," "," "," ",
                                "07"," "," ","10"," "," ","13"," "," ","16"," "," ","19"," "," ","22"," "," ","01"," "," "," ",
                                "07"," "," ","10"," "," ","13"," "," ","16"," "," ","19"," "," ","22"," "," ","01"," "," "," ",
                                "07"," "," ","10"," "," ","13"," "," ","16"," "," ","19"," "," ","22"," "," ","01"," "," "," ",
                                "07"," "," ","10"," "," ","13"," "," ","16"," "," ","19"," "," ","22"," "," ","01"," "," "," ",
                                "07"," "," ","10"," "," ","13"," "," ","16"," "," ","19"," "," ","22"," "," ","01"," "," "," ",
                                "07"," "," ","10"," "," ","13"," "," ","16"," "," ","19"," "," ","22"," "," ","01"," "," ","04"
                            ],      
                            line : true,
                            full:true
                        },
                        y :
                        {
                            type : 'range',
                            domain : [0, 200],
                            step : 10
                        },
                        //area : { x : 0, y : 0, width : '100%', height : '100%' },
                        data : $scope.chart_time
                    },
                    brush : [
                        {
                            type : 'splitarea',
                            animate : true,
                            target:'totalPass',
                            split: 110
                        },
                        {
                            type:'splitline',
                            animate:true,
                            target:'totalPass',
                            split: 110                          
                        },
                        {
                            type:'pin',
                            split:"21"
                        },
                        {
                            type:'pin',
                            split:"44"
                        },
                        {
                            type:'pin',
                            split:"66"
                        },
                        {
                            type:'pin',
                            split:"88"
                        },
                        {
                            type:'pin',
                            split:"110"
                        },
                        {
                            type:'pin',
                            split:"132"
                        }
                    ],
                    widget : [
                        {
                            type : "title",
                            text : "Passenger by time",
                            render : true
                        },
                        {
                            type : "tooltip",
                            orient : 'top'
                        },
                        {
                            type : "title",
                            text : "Mon",
                            render : true,
                            dx:-345,
                            dy:40
                        },
                        {
                            type : "title",
                            text : "Tue",
                            render : true,
                            dx:-230,
                            dy:40
                        },
                        {
                            type : "title",
                            text : "Wed",
                            render : true,
                            dx:-115,
                            dy:40
                        },
                        {
                            type : "title",
                            text : "Thu",
                            render : true,
                            dx:0,
                            dy:40
                        },
                        {
                            type : "title",
                            text : "Fri",
                            render : true,
                            dx:115,
                            dy:40
                        },
                        {
                            type : "title",
                            text : "Sat",
                            render : true,
                            dx:230,
                            dy:40
                        },
                        {
                            type : "title",
                            text : "Sun",
                            render : true,
                            dx:345,
                            dy:40
                        }
                    ],
                    style:{
                        lineSplitBorderColor:'#e9f819',
                        areaSplitBackgroundColor:'#e9f819'
                    }
                });
//chart - Passenger with time
                d = chart("#GraphByShelter",{
                    width: 900,
                    height : 400,
                    theme : "jennifer",
                    padding : {right:120},
                    axis : [{
                        x : {
                            domain : ["학교","●","●","●","●","●","환호동","●","●","●","●","●","●","육거리",
                                      "●","●","●","●","●","●","환호동","●","●","●","●","●","학교"
                                    ],        

                            line : true,
                            full:true
                        },
                        y :
                        {
                            type : 'range',
                            domain : [0, 10000],
                            step : 10,
                            color:'#e9f819'
                        },
                        //area : { x : 0, y : 0, width : '100%', height : '100%' },
                        data : $scope.chartd_shelter
                    },{
                        x : {
                            extend:0,
                            hide:true
                        },
                        y :
                        {
                            type : 'range',
                            domain : [0, 50],
                            step : 5,
                            orient:'right',

                        },
                        //area : { x : 0, y : 0, width : '100%', height : '100%' },
                       
                        data : $scope.chartd_shelter
                    }],
                    brush : [
                        {
                            type : 'area',
                            animate : true,
                            target:'totalPass',
                            colors:['#e9f819']
                        },

                        {
                            type:'line',
                            animate:true,
                            target:'average',
                            axis:1
                        },
                        {
                            type:'line',
                            animate: true,
                            target:'totalPass',
                            colors:['#e9f819]']
                        },
                        {
                            type:"pin",
                            split:"13"
                        }
                    ],
                    widget : [
                        {
                            type : "title",
                            text : "Passenger by Shelter",
                            render : true
                        },
                        {
                            type : "tooltip",
                            orient : 'top'
                        },
                        {
                            type: "title",
                            text: "학교 >> 목적지(육거리,환호동)",
                            dx: -224,
                            dy: 40
                        },
                        {
                            type:"title",
                            text: " 목적지(육거리,환호동)>>학교",
                            dx: 224,
                            dy: 40
                        },
                        {
                            type:"legend",
                            brush:[0,1],
                            align:'end'
                        }
                    ]
                });
//chart - Passenger with Shelter
            }),

$scope.chartflag=true;
};

}]);

