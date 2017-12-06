var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    //$scope.carname = "Volvo";
    $http.get("https://findfalcone.herokuapp.com/planets")
    .then(function(response) {
        $scope.planets = response.data;
        console.log($scope.planets);
    });
    $http.get("https://findfalcone.herokuapp.com/vehicles")
    .then(function(response) {
        $scope.vehicles = response.data;
        console.log($scope.vehicles);
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
     console.log($scope.distance);
 };
   $scope.start = function(id,disable) {
    document.getElementById(disable).disabled = true;
    //document.getElementById(id.vehicle.name).checked = true;
    var x = id.vehicle.speed;
    var y = $scope.distance;
    var a = eval("y / x") ;
    var res = a ;
    console.log("time is "+ res);
    if (document.getElementById("time").innerHTML == "") {
      document.getElementById("time").innerHTML = res;
    }
    else {
      var x = document.getElementById("time").innerHTML;
      var x = +x + +res;
      document.getElementById("time").innerHTML = x;
    }
    if (disable == 'myFieldset3') {
      document.getElementById('btn').disabled = false;
    }

   }
});
