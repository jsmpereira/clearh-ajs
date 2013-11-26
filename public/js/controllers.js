var api = angular.module('api', ['ui.bootstrap']);

api.config(function($httpProvider) {
	//Enable cross domain calls
  $httpProvider.defaults.useXDomain = true;

	//Remove the header used to identify ajax call  that would prevent CORS from working
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  // Allow POST
  $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
});

api.controller('APIController', function ($scope, companiesService) {

    function companies () {
      companiesService.index().then(function (data) {
        $scope.companies = data;
      });  
    }
    
    $scope.create = function () {
      companiesService.create($scope.new_company).then(function (data) {
        alert("Company created.");
        companies();
      }, function(error){
        console.log("Error:", error);
        alert("Please, check your input.");
      });
    };

    $scope.show = function(id) {
      companiesService.show(id).then(function (data) {
        $scope.company = data;
      })
    }

    angular.element(document).ready(function () {
      companies();
    });
});