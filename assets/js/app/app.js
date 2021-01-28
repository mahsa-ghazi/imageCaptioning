
var myAPP = angular.module('myAPP', ['ngRoute','ngResource']);

angular.module('myApp', [
'btford.socket-io']).
factory('mySocket', function (socketFactory) {
return socketFactory();
});
myAPP.config(['$routeProvider',
function (
  $routeProvider
) {
  $routeProvider.
 when('/approveCaptions', {
    templateUrl: '/js/app/views/imageCaptions/check.html',
    controller: 'captionController'

  }).when('/main/dashboard', {
    templateUrl: '/js/app/views/root/dashboard.html',
    controller: 'exportBatteryLevelController'

  }).otherwise({
      redirectTo: '/approveCaptions'
    });
}]);

myAPP.run(function () {
  console.log('angular engine has been just started')
});


