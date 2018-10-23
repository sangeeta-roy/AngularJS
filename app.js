(function(){
  'use strict';

  angular.module('hello', [])
  .controller('helloController', helloController);

  helloController.$inject = ['$scope'];
    function helloController($scope) {
      $scope.name = "Deepankar";
    }
})();
