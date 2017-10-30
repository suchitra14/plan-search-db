angular.module('FirstApp', ['SecondApp', 'myUiSelectApp'])
.controller('FirstController', function(){
	this.name="Suchitra";
	this.company="Speedon";
})