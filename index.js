var app = angular.module('myApp', ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "templates/start.html",
        controller : "myCtrl"
    })
    .when("/find", {
        templateUrl : "templates/final.html",
        controller : "myCtrl"
    });
});
app.controller('myCtrl', function($scope, $http, $rootScope) {
    $http.get("https://findfalcone.herokuapp.com/planets")
    .then(function(response) {
        $scope.planets = response.data;
    });
    $http.get("https://findfalcone.herokuapp.com/vehicles")
    .then(function(response) {
        $scope.vehicles = response.data;
    });
   $scope.update = function(id,bool){
     if (bool == 'vehicles1') {
       $scope.vehicles1  = true;
     }
     if (bool == 'vehicles2') {
       $scope.vehicles2  = true;
     }
     if (bool == 'vehicles3') {
       $scope.vehicles3  = true;
     }
     if (bool == 'vehicles4') {
       $scope.vehicles4  = true;
     }
     var distance = document.getElementById(id).value;
     $scope.distance = distance;
 };
   $scope.start = function(id,disable) {
    document.getElementById(disable).disabled = true;
    //document.getElementById(id.vehicle.name).checked = true;
    var x = id.vehicle.speed;
    var y = $scope.distance;
    var a = eval("y / x") ;
    var res = a ;
    if (document.getElementById("time").innerHTML == "") {
      document.getElementById("time").innerHTML = res;
    }
    else {
      var x = document.getElementById("time").innerHTML;
      var x = +x + +res;
      document.getElementById("time").innerHTML = x;
      localStorage.setItem('time', JSON.stringify(x));
    }
    if (disable == 'myFieldset3') {
      document.getElementById('btn').disabled = false;
    }
   }
   $scope.getDetails = function() {
     var time = localStorage.getItem('time');
     $scope.item = "Donlon";
     $scope.item1 = "Enchai";
     $scope.item2 = "Sapir";
     $scope.token = "bCQfJqPMTyegYCwedccNOSEmderKMpLt";
     var req = {
     method: 'POST',
     url: 'http://findfalcone.herokuapp.com/token',
     headers: {
       'Accept' : 'application/json'
     },
     data: { }
     }
     $http(req).then(function(response){
         $scope.token = JSON.stringify(response.data.token);
         find($scope.token)
     });
     function find(val){
       var req = {
       method: 'POST',
       url: 'http://findfalcone.herokuapp.com/find',
       headers: {
         'Accept' : 'application/json',
         'Content-Type' :'application/json'
       },
       data: {
           "token": "tjqHYqwfTCGfksrSwzoRASRywZrqyqZk",
           "planet_names" : [
           	$scope.item,
           	$scope.item1,
           	$scope.item2,
           	"Pingasor"
           ],
           "vehicle_names" : [
           	"Space pod",
           	"Space rocket",
           	"Space ship",
           	"Space ship"
           ]
       }
       }
       $http(req).then(function(response){
         if (response.data.status == "success") {
           document.getElementById("result").innerHTML = `<div style="text-align: center;padding:5px;">
             <h3>Success!!
               Congratulation on Finding Falcone.
               King Shan is mighty pleased.</h3>
               <h3>Time taken: ${time}</h3>
               <h3>Planet found: ${response.data.planet_name}</h3>
             <a href="#!/" class="btn btn-large btn-default">Start Again</a>
           </div>`;
         }
         else {
           document.getElementById("result").innerHTML = `<h2 class="text-center">Failure!! Try Again....</h2>
           <a href="#!/" class="btn btn-large btn-default" style="margin-left: 43%;margin-top: 9%;">Start Again</a>`;
         }
       });
     }
   }
});
