// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('app', ['ionic','leaflet-directive']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

app.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
    .state('page1', {
      url: '/login',
      templateUrl: 'page1.html'
    })
    
    .state('page2', {
      url: '/signup',
      templateUrl: 'page2.html'
    })
    
    .state('map', {
      url: '/map',
      templateUrl: 'templates/map.html',
      controller: 'MapCtrl'
    })
    
    .state('side-menu1', {
      url: '/menu',
      templateUrl: 'side-menu1.html'
    })
    ;

  // if none of the above states are matched, use this as the fallback
  
  $urlRouterProvider.otherwise('/map');
  

});
app.controller("MapCtrl",['$scope', "$log", "leafletData", function($scope, $log, leafletData){

 angular.extend($scope, {
                london: {
                    lat: 51.505,
                    lng: -0.09,
                    zoom: 4
                }
            });

            $scope.fitBounds = function() {
                leafletData.getMap().then(function(map) {
                    map.fitBounds([ [40.712, -74.227], [40.774, -74.125] ]);
                });
            };


    leafletData.getMap().then(function(map) {
      $log.info(map);
 navigator.geolocation.getCurrentPosition(function(position) {
      
       L.Routing.control({
              waypoints: [
                L.latLng(position.coords.latitude,position.coords.longitude),
                L.latLng(57.6792, 11.949)
              ]
            }).addTo(map);
    });
        
    });

            

}]);

