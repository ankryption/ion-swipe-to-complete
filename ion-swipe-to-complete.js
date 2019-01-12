angular.module("MyApp", ['ionic']).directive('swipeToComplete', function() {
    // THIS IS HOW THE SWIPE BUTTON WORKS
    // SLIDE 0 - the black overlay when you slide right
    // SLIDE 1 - the base slide - you can give it a right arrow on left edge (TO SWIPE RIGHT) or left arrow on right edge (TO SWIPE LEFT) 
    // SLIDE 2 - the black overlay when you slide left
    return {
        templateUrl: '/ion-swipe-to-complete/ion-swipe-to-complete.html',
        restrict: 'E',
        scope: {
            swipeLeft: '=?',
            onSwipeEnd: '=?',
            buttonText: '=?',
            buttonSubtext: '=?',
            onSwipeEndData: '=?',
        },
        controller: function($scope, $rootScope) {
            $scope.$on("$ionicSlides.sliderInitialized", function(event, data) {
                // data.slider is the instance of Swiper
                $scope.slider = data.slider;
                // by default when you load the button, you want it to be on the base slide
                // !swipeLeft = user wants to swipe right --> so slideNext as SLIDE 1 is the base slide in this case
                if (!$scope.swipeLeft) {
                    $scope.slider.slideNext();
                }
            });
            $scope.$on("$ionicSlides.slideChangeEnd", function(event, data) {
                // note: the indexes are 0-based
                // index 0 and 1 indicate that the swipe is done
                if ((!$scope.swipeLeft && data.slider.activeIndex === 0) || ($scope.swipeLeft && data.slider.activeIndex === 1)) {
                    if ($scope.onSwipeEnd) {
                        $scope.onSwipeEnd($scope.onSwipeEndData);
                    }
                }
            });
            $scope.$on('RESET_SWIPE_BUTTON_EVENT', function() {
                if ($scope.slider) {
                    if ($scope.swipeLeft) {
                        $scope.slider.slidePrev();
                    } else {
                        $scope.slider.slideNext();
                    }
                }
            });
        }
    };
})