/*angular.module('ispApp', ['ngSanitize', 'ui.select'])
.controller('ispController', [function(){
	this.cities=["Pune", "Mumbai", "Bangalore", "Goa"];
	this.areas=["Viman Nagar", "ChandanNagar", "Magarpatta", "Hadapsar", "DiwanMan", "Garodia Nagar"];
	this.localities=["Palladium Grand", "Lunkad Zodiac", "Lunkad Amazon", "Park Spring", "Geri Bellismo"];
	this.disabled=true;


}])*/

angular.module('ispApp', ['ngSanitize', 'ui.select'])
.controller('ispController', ['$scope', function ($scope){
    $scope.itemArray = [
        {id: 1, name: 'first'},
        {id: 2, name: 'second'},
        {id: 3, name: 'third'},
        {id: 4, name: 'fourth'},
        {id: 5, name: 'fifth'},
    ];

    $scope.selected = { value: $scope.itemArray[0] };
}]);