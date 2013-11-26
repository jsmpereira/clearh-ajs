api.service('companiesService', function ($http, $q) {
	var API_ROOT = 'http://limitless-tundra-1502.herokuapp.com/companies';

	this.index = function () {
		var deferred = $q.defer();
		
		$http.get(API_ROOT).success(function (data) {
  		deferred.resolve(data);
  	});
  	return deferred.promise;
	};

	this.show = function (id) {
		var deferred = $q.defer();

		$http.get(API_ROOT+"/"+id).success(function (data) {
    	deferred.resolve(data);
  	});
  	return deferred.promise;
	};

	this.create = function (data) {
		var deferred = $q.defer();
		// Angular just POSTs JSON. Need to use jQuery's $.param.
		$http.post(API_ROOT, $.param({company: data})).success(function (result) {
  		deferred.resolve(result);
			}).error(function (result) {
				deferred.reject(result);
			});
		return deferred.promise;	
  }
});
		