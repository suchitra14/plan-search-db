angular.module('areaMapModule');
angular.module('MainModule', ['areaMapModule']) 
.controller('MainController',MainController);
.directive('googleMapsBox', [ function(){
		return {
			templateUrl: 'templates/AreaMap.html'
	 	};
	}]);

function MainController()
{
		this.name = "Srini";
		this.address = "Earth";
	}
	



  //'areaMapModule'
	/*.directive('googleMapsBox', [ function(){
		return {
			templateUrl: 'templates/AreaMap.html'
	 	};
	}])*/
	/*.directive('selectBoxes', [ function(){
		return {
			templateUrl: 'SelectBoxes.html'
		};
	}])*/
	


