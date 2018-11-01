( function(){
  'use strict;'

  angular.module('MenuCategoriesApp', [])
  .controller('MenuCategoriesController', MenuCategoriesController)
  .service('MenuCategoriesService', MenuCategoriesService);

  //controller
  MenuCategoriesController.$inject[MenuCategoriesService];
  function MenuCategoriesController(MenuCategoriesService){
    var menu = this;

    var promise

  }
  //service
  MenuCategoriesService.$inject['$http'];
  function MenuCategoriesService($http){
    var service = this;
    
  };


})();
