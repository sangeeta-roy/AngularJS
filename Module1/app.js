(function(){
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
      $scope.message = "";
      $scope.lunchMenu = "";
      $scope.CheckLunchMenu = function() {
      $scope.LunchItemsSum = 0;
      var lunchItems = $scope.lunchMenu.split(',');
      var index;
      for(index = 0; index < lunchItems.length; index++){
        if (lunchItems[index].trim().length > 0)
        $scope.LunchItemsSum++;
      }

      if (!$scope.lunchMenu) {
        $scope.message = "Please Enter data first!";

      } else if ($scope.LunchItemsSum <= 3) {
        $scope.message = "Enjoy!";

      } else if ($scope.LunchItemsSum > 3) {
        $scope.message = "Too much!";

      }

    };
  }
})();
