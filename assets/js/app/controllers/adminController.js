myAPP.controller('adminController', function ($scope,$http,$location,$window) {

  $scope.submit = 'salam';
  $scope.result = 0;

  $scope.login = function() {

    var object = {};
    object.email = $scope.user.email;
    object.password = $scope.user.password;
    if($scope.myform.$valid) {
      $http.post('/api/v1/admin/login',object)
              .success((data, status) => {
                $window.location.href = '/main/dashboard';
                console.log(success);
              }). error(function(err,status) {

                $window.location.href = '/login';
              });
    }
  };

  $scope.signUp = () => {

      if($scope.myform.$valid){
        var fullName = $scope.user.fullName;
        var email = $scope.user.email;
        var password = $scope.user.password;
        var rePassword = $scope.user.rePassword;
          if(password == rePassword){

            var object = {};
            object.email = email;
            object.password = password;
            object.rePassword = rePassword;
            object.fullName = fullName;

            $http.post('/api/v1/admin/register',object)
              .success((data, status) => {
                $window.location.href = '/login';
                returnValue = data;
                $scope.message = data.message;
                $scope.result = 1;
              }). error(function(err,status)
              {
                $scope.message = err.error;
                $scope.result = 1 ;
              });
          }else {
            $scope.result = 1 ;
            $scope.message = 'password and retype password are not match !!';
          }
      }
  
  };

});
