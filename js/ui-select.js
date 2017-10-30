angular.module('myUiSelectApp', ['ui.select', 'ngSanitize'])
.controller('uiController', UIController)
.directive('uiBoxes', UIBoxesDirective);



function UIController() {

}


function UIBoxesDirective($http) {

	var ddo =  {
		templateUrl: 'templates/ui-select-sample.html',
		scope : {
			cities: '@',
			selectedCity: '@',
			populatedAreas:'@',
			areas:'@',
			localities: '@'
		},
		controller : UIDirectiveController,
		controllerAs : 'uiDirCtrl',
		bindToController : true
		};
	return ddo;
	};

function UIDirectiveController($http){

 	var self = this;
 	self.populateIsps = false;
	self.cities =[
		{id: "PN", name: "Pune"},
		{id: "BG", name: "Bangalore"},
		{id: "GO", name: "Goa"},
		{id:  "MU", name: "Mumbai"}
	];
	self.selectedCity = self.cities[0];
	self.populatedAreas=[];
	self.areas = {"PN" : [{id : "VN", name : "Viman Nagar"},{id : "HD", name : "Hadapsar"},{id : "MP", name : "Magarpatta"},
			{id : "CN", name : "Chandan Nagar"},{id : "DH", name : "Dhanori"},{id : "VW", name : "Vishrantwadi"},
			{id : "KP", name : "Koregaon Park"},{id : "KN", name : "Kalyani Nagar"},{id : "LN", name : "Lohegaon"}
			],"MU" : [{id : "PN", name : "Pant Nagar, Ghatkopar"},{id : "GN", name : "Garodia Nagar, Ghatkopar"},{id : "SP", name : "Shanti Park, Ghatkopar"},
			{id : "DM", name : "DiwanMann, Vasai"},{id : "JN", name : "Jayraj Nagar, Borivili"},{id : "VL", name : "Vallabaug Lane, Ghatkopar"},
			{id : "CN", name : "Chedda Nagar, Chembur"},{id : "HL", name : "Hingwala Lane, Ghatkopar"},{id : "OD", name : "Odeon, Ghatkopar"}
		]};
		
	
	self.localities = {"PN-VN" : ["Zankar Society", "Konark Campus", "Lunkad Queensland"],
		"PN-HD" : [ "Chaitanya Society", "Bhosale Nagar", "Suzlon"],
		"PN-MP" : ["Annexe Society", "Daffodils", "Amanora Town"],
		"MU-PN" : ["Rajawadi", "Mhada colony", "Neelkanth Valley"],
		"MU-GN" : ["Jai Gayatri", "Shital Baug", "Garodia School"],
		"MU-DM" : ["Om Aditya CHS", "Hill View", "DG Nagar"]
	};

	self.populateAreas = function(selCity){
		console.log(selCity.id);
		console.log(selCity.name);
		console.log("The length is ", self.areas[selCity.id].length)
		self.selectedArea=""
		self.populatedAreas=self.areas[selCity.id];
	};

	self.populateLocalities = function(selCityId, selAreaId){
		console.log(selCityId);
		console.log(selAreaId)
		self.selectedLocality=""
		self.populatedLocalities = self.localities[selCityId + "-" +selAreaId];
	};

	self.getStarClass = function(star, rating){
		return {
			'fa': true,
			'fa-spin': true,
			'fa-2x' : true,
			'fa-star': (rating >= star),
			'fa-star-half': (rating < star && rating > star-1),
			'fa-star-o': (rating <= star-1)
		};
	};

	self.bannerOn = [];

	self.populatePlans = function(selectedCity, selectedArea) {
		$http.get('json/isps.json').success(function(data){
			self.isps = data;
			self.populateIsps = true;

			self.isps.forEach(function(isp){
				isp.oneStar = self.getStarClass(1, isp.roundedRating);
				isp.twoStar = self.getStarClass(2, isp.roundedRating);
				isp.threeStar = self.getStarClass(3, isp.roundedRating);
				isp.fourStar = self.getStarClass(4, isp.roundedRating);
				isp.fiveStar = self.getStarClass(5, isp.roundedRating);
				
				self.bannerOn.push(false); // Banner collapsed by default		
			});

		})
	};

	self.populateAreas(self.selectedCity);

	self.isBannerShow = function(index){
		return(self.bannerOn[index]);
	}

	self.toggleBanner = function(index){
		self.bannerOn[index] = !self.bannerOn[index];
	}
	
}