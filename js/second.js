angular.module('SecondApp',  ['ngMap'])
.controller('SecondController', function(){
	this.address="Pune";
})
.directive('testSecondMod', TestSecondDirective);

function TestSecondDirective() 
{
	var ddo =  {
		templateUrl: 'templates/second.html',
		scope : {
			cities: '@',
			selectedCity: '@',
			selectedCityId:'@',
			center:'@',
			latlng: '@'
		},
		controller : MapDirectiveController,
		controllerAs : 'mapDirCtrl',
		bindToController : true
	};
	return ddo;
};




 function  MapDirectiveController($http, $locale, NgMap) {
        	var self = this;
            
            self.cities = [
                {id: 0 , label: "Pune", lat: 18.5204, lng: 73.8567, zoom: 15},
                {id: 1 , label: "Goa", lat: 15.2933, lng: 74.124, zoom: 12},
                {id: 2 , label: "Mumbai", lat: 19.0760, lng: 72.877, zoom: 15}
                ];
            self.selectedCity = self.cities[0];
            self.selectedCityId = 0;
            self.center = [self.selectedCity.lat, self.selectedCity.lng];
            self.latlng = [self.selectedCity.lat, self.selectedCity.lng];
            
            self.showMap = function(cityID){
                self.selectedCity = self.cities[cityID];
              //  self.lat = event.latLng.lat();
	           // self.lng = event.latLng.lng();
	           // self.latlng = [event.latLng.lat(), event.latLng.lng()];
                self.center = [self.selectedCity.lat, self.selectedCity.lng];
                self.latlng = [self.selectedCity.lat, self.selectedCity.lng];
            
            };
              
	        self.getpos = function (event) {
	            self.lat = event.latLng.lat();
	            self.lng = event.latLng.lng();
	            self.latlng = [event.latLng.lat(), event.latLng.lng()];
                self.loc = this.getPlace().formatted_address;
	        };


	        self.placeMarker = function(){
	            console.log(this.getPlace());  
                console.log(this.getPlace().formatted_address);  
                self.loc = this.getPlace().formatted_address;
                
	            var loc = this.getPlace().geometry.location;
	            self.latlng = [loc.lat(), loc.lng()];
	            self.center = [loc.lat(), loc.lng()];
                
	        };

	    };
    
