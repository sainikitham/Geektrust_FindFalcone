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
app.controller('myCtrl', function($scope, $http) {
    $http.get("https://findfalcone.herokuapp.com/planets")
    .then(function(response) {
        $scope.planets = response.data;
    });
    $http.get("https://findfalcone.herokuapp.com/vehicles")
    .then(function(response) {
        $scope.vehicles = response.data;
    });
  //  $scope.vehicles.push($scope.planets);

   $scope.update = function(id,bool,item){

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
      if (item == 'Donlon') {
        var distance = 100;
        for (var i = 0; i < $scope.vehicles.length; i++) {
          if ($scope.vehicles[i].max_distance >= distance) {
              $scope.vehicles[i].disable = 'nodisabled';
          }else {
            $scope.vehicles[i].disable = 'disabled';
          }
        }
      }else if (item == "Enchai") {
        var distance = 200;
        for (var i = 0; i < $scope.vehicles.length; i++) {
          if ($scope.vehicles[i].max_distance >= distance) {
              $scope.vehicles[i].disable = 'nodisabled';
          }else {
            $scope.vehicles[i].disable = 'disabled';
          }
        }
      }
      else if (item == "Jebing") {
        var distance = 300;
        for (var i = 0; i < $scope.vehicles.length; i++) {
          if ($scope.vehicles[i].max_distance >= distance) {
              $scope.vehicles[i].disable = 'nodisabled';
          }else {
            $scope.vehicles[i].disable = 'disabled';
          }
        }
      }else if (item == "Sapir") {
        var distance = 400;
        for (var i = 0; i < $scope.vehicles.length; i++) {
          if ($scope.vehicles[i].max_distance >= distance) {
              $scope.vehicles[i].disable = 'nodisabled';
          }else {
            $scope.vehicles[i].disable = 'disabled';
          }
        }
      }
      else if (item == "Lerbin") {
        var distance = 500;
        for (var i = 0; i < $scope.vehicles.length; i++) {
          if ($scope.vehicles[i].max_distance >= distance) {
              $scope.vehicles[i].disable = 'nodisabled';
          }else {
            $scope.vehicles[i].disable = 'disabled';
          }
        }
      }else if (item == "Pingasor") {
        var distance = 600;
        for (var i = 0; i < $scope.vehicles.length; i++) {
          if ($scope.vehicles[i].max_distance >= distance) {
              $scope.vehicles[i].disable = 'nodisabled';
          }else {
            $scope.vehicles[i].disable = 'disabled';
          }
        }
        console.log($scope.vehicles);
      }
     $scope.distance = distance;
 };

   $scope.start = function(id,disable,flash) {
    document.getElementById(disable).disabled = true;
    //document.getElementById(id.vehicle.name).checked = true;
    if (flash == 'vehicles1') {
      $scope.vehicles1 = id.vehicle.name;
    }else if (flash == 'vehicles2') {
      $scope.vehicles2 = id.vehicle.name;
    }else if (flash == 'vehicles3') {
      $scope.vehicles3 = id.vehicle.name;
    }else if (flash == 'vehicles4') {
      $scope.vehicles4 = id.vehicle.name;
    }
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
       //planets
       var plane = $scope.item;
       var plane1 = $scope.item1;
       var plane2 = $scope.item2;
       var plane3 = $scope.item3;
       var cars = new Array;
       cars.push(plane);cars.push(plane1);cars.push(plane2);cars.push(plane3);
       //vehicles
       var blah = $scope.vehicles1;
       var blah1 = $scope.vehicles2;
       var blah2 = $scope.vehicles3;
       var blah3 = $scope.vehicles4;
       var bikes = new Array;
       bikes.push(blah);bikes.push(blah1);bikes.push(blah2);bikes.push(blah3);
       var req = {
       method: 'POST',
       url: 'http://findfalcone.herokuapp.com/find',
       headers: {
         'Accept' : 'application/json',
         'Content-Type' :'application/json'
       },
       data: {
           "token": "tjqHYqwfTCGfksrSwzoRASRywZrqyqZk",
           "planet_names" : cars,
           "vehicle_names" : bikes
       }
       }
       $http(req).then(function(response){
         console.log(response.data);
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
           document.getElementById("result").innerHTML = `<h2 class="text-center">Failed on Finding Falcone.</h2>
           <a href="#!/" class="btn btn-large btn-default" style="margin-left: 43%;margin-top: 9%;">Start Again</a>`;
         }
       });
     }
   }
});
app.filter('display', function ($scope) {
    return function (item) {
      console.log($scope.vehicles1 + $scope.item);
    };
});
