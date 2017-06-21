var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http',
	function($scope, $http) {
		console.log("Hello world from controller");

		var refresh = function() {
			$http.get('/taskmgr').then(function(response) {
				console.log("I got the data I requested!");
				$scope.tasks = response.data;
				$scope.task = null;
			});
		}

		refresh();

		$scope.addTask = function() {
			console.log($scope.task);
			$http.post('/taskmgr', $scope.task).then(function(response) {
				console.log(response);
				refresh();
			});
		}

		$scope.remove = function(id) {
			console.log(id);
			$http.delete('/taskmgr/' + id).then(function(response) {
				refresh();
			});
		}

		$scope.edit = function(id) {
			console.log(id);
			$http.get('/taskmgr/' + id).then(function(response) {
				$scope.task = response.data;
			});
		}

		$scope.update = function() {
			console.log($scope.task._id);
			$http.put('/taskmgr/' + $scope.task._id, $scope.task).then(function(response) {
				refresh();
			});
		}

		$scope.deselect = function() {
			$scope.task = "";
		}
	} 
]);