angular.module('starter.controllers', [])

.filter('trim', function() {
    return function(input, scope) {
        if (input!=null) {
          return input.substring(0, input.length - 3)
        }
    }
})

.run(function ($rootScope, eventiService, $log) {
  eventiService.getPoisAsync(function(results) {
    $log.info(results);
    $rootScope.pets = results.Eventi;
    $rootScope.after = $rootScope.pets[$rootScope.pets.length-1].id;
  });
})

// A simple controller that fetches a list of data from a service
.controller('PetIndexCtrl', function($scope, $rootScope, eventiService, $timeout, $ionicPopup, $ionicModal) {

	$scope.noMoreItemsAvailable = false;

	$scope.addEventi = function() {

		eventiService.getMoreEvents($rootScope.after, function(results) {
			console.log("results.Eventi: " + results.Eventi);
			console.log("results.Eventi.length: " + results.Eventi.length);
			$rootScope.pets.push.apply($rootScope.pets, results.Eventi);
    		$rootScope.after = $rootScope.pets[$rootScope.pets.length-1].id;

    		if ( results.Eventi.length < 6 ) {
      			$scope.noMoreItemsAvailable = true;
				console.log("$scope.noMoreItemsAvailable: " + $scope.noMoreItemsAvailable);

    		}

			$scope.$broadcast('scroll.infiniteScrollComplete');

		});

	};

	$scope.doRefresh = function() {
        console.log('Refreshing!');
        $timeout( function() {
    			eventiService.getPoisAsync(function(results) {
  			    console.log('iGallipoliCtrl async returned value');
  			    console.log(results);
  			    $rootScope.pets = results.Eventi;
  			    $rootScope.after = $rootScope.pets[$rootScope.pets.length-1].id;
  			    console.log("after: " + $rootScope.after);
          });
    			$scope.noMoreItemsAvailable = false;
	        //Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
        }, 1000);    
  };

	showAlert = function() {
    $ionicPopup.alert({
      title: 'ProLoco Gallipoli',
          content: 'App ufficiale degli eventi dell\'estate gallipolina! Cerca ProLoco Gallipoli anche su Facebook e Twitter!'
    }).then(function(res) {
    });
	};

  $scope.rightButtons = [{
  	type: 'button-icon button-clear ion-ios7-information',
  	tap: function(e) {
  		console.log("info tapped")
			showAlert();    		
  	}
	}];

  $ionicModal.fromTemplateUrl('templates/modal.html', function(modal) {
    $scope.modal = modal;
  }, {
    animation: 'slide-in-up',
      focusFirstInput: true
  });

})

.controller('MapCtrl', function($scope, $log, $stateParams, $rootScope) {

  $log.info($stateParams.petId);

  for(var i = 0; i < $rootScope.pets.length; i += 1) {
    var result = $rootScope.pets[i];
    if(result.id === $stateParams.petId){
      $scope.pet = result;
    }
  }

  $log.info($scope.pet);

  $scope.map = {
    defaults: {
      tileLayer: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      maxZoom: 18,
      zoomControl: false,
      path: {
        weight: 10,
        color: '#800000',
        opacity: 1
      }
    },
    center: {
      lat: 40.056297,
      lng: 17.988346,
      zoom: 14
    }
  };

  $scope.markers = {};
  $log.info($scope.map);

})

.controller('ModalCtrl', function($scope, $ionicLoading) {
    
    $scope.closeModal = function() {
        console.log('Closing modal...');
        $scope.modal.hide();
    };

});
