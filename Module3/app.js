(function (){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('APIBasePath', "http://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItems);

//Found Items directive
function FoundItems() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'dirlist',
    bindToController: true
  };
  return ddo;
}
//directive controller
function FoundItemsDirectiveController() {
  var dirlist = this;

  dirlist.isEmpty = function() {
    return dirlist.found != undefined && dirlist.found.length === 0;
  }
}

// Narrow down controller
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;
  list.narrowIt = function() {

     if (list.searchTerm === undefined || list.searchTerm === "") {
       list.found = [];
       return;
     }

  var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);
  promise.then(function (response){
    list.found = response;
  })
  .catch(function(error){
    console.log("Something went terribly wrong.");
  });

};

list.onRemove = function(index){
    list.found.splice(index, 1);
};

}

//Menu search service
MenuSearchService.$inject = ['$http', 'APIBasePath'];
function MenuSearchService($http, APIBasePath){
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {

    return $http({
      method: "GET",
      url: (APIBasePath + "/menu_items.json")
    }).then(function(result){
      var items = result.data.menu_items;

      var foundItems = [];
      for(var i =0; i< items.length; i++){
          //search the menulist with the searchterms
          if(items[i].description.toLowerCase().search(searchTerm.toLowerCase()) !== -1){
            foundItems.push(items[i]);
          }
        }
        return foundItems;
    });
  };

}

})();
