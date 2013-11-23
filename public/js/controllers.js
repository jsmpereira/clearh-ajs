var api = angular.module('api', ['ui.bootstrap']);

api.config(function($httpProvider) {
	//Enable cross domain calls
  $httpProvider.defaults.useXDomain = true;

	//Remove the header used to identify ajax call  that would prevent CORS from working
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  // Allow POST
  $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
});

api.controller('APIController', ['$scope', '$http',
  function ($scope, $http) {

  	$scope.API_ROOT = 'http://limitless-tundra-1502.herokuapp.com/companies';

  	$scope.index = function() {
  		$http.get(this.API_ROOT).success(function(data) {
    		console.log("200 OK", data)
      	$scope.companies = data;
    	});
  	}

  	$scope.show = function(id) {
  		$http.get(this.API_ROOT+"/"+id).success(function(data) {
    		console.log("200 OK", data)
      	$scope.company = data;
    	});
  	}

		$scope.create = function(data) {
			// Angular just POSTs JSON. Need to use jQuery's $.param.
  		$http.post(this.API_ROOT, $.param({company: data}) ).success(function(result) {
    		console.log("200 OK", result)
    		if (result.status == 400) {
    			window.alert("Please, check your input.")
    		} else {
    			window.alert("Company Created.")
    			$scope.index()	
    		}
    	});
  	}

  	angular.element(document).ready(function () {
        $scope.index();
    });

  }]);