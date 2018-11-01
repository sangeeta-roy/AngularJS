(function(){
'use strict;'

angular.module('ShoppingCheck', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.provider('ShoppingList', ShoppingListProvider)
.config(Config)
;
//Config file with default values
Config.$inject = ['ShoppingListProvider'];
function Config(ShoppingListProvider) {
  ShoppingListProvider.defaults.items = [];
  var item={
    name: "Cookies",
    quantity: 20,
  };
  ShoppingListProvider.defaults.items.push(item);
  item={
    name: "Carrots",
    quantity: 10,
  };
  ShoppingListProvider.defaults.items.push(item);
  item={
    name: "Broccoli",
    quantity: 2,
  };
  ShoppingListProvider.defaults.items.push(item);
  item={
    name: "Pumpkin",
    quantity: 1,
  };
  ShoppingListProvider.defaults.items.push(item);
  item={
    name: "Eggs",
    quantity: 12,
  };
  ShoppingListProvider.defaults.items.push(item);
  item={
    name: "Chicken",
    quantity: 5,
  };
  ShoppingListProvider.defaults.items.push(item);
}

// LIST #1 - To buy controller
ToBuyController.$inject = ['ShoppingList'];
function ToBuyController(ShoppingList) {
  var TBCtrlList = this;

  TBCtrlList.items = ShoppingList.getItems();

  TBCtrlList.boughtItem = function (itemIndex) {
  ShoppingList.boughtItem(itemIndex);
 };

}

// LIST #2 - Already bought controller
AlreadyBoughtController.$inject = ['ShoppingList'];
function AlreadyBoughtController(ShoppingList) {
  var ABCtrlList = this;

ABCtrlList.items = ShoppingList.getAlreadyBoughtItems();

}


// If not specified, maxItems assumed unlimited
//ShoppingListService
function ShoppingListService(items, message) {
  var service = this;

  // array of shopping items
  var items = items;

  //array of already bought items
  var alreadyBoughtItems = [];

  service.addItem = function (itemName, quantity) {

      var item = {
        name: itemName,
        quantity: quantity,
      };
      items.push(item);
  };

  service.boughtItem = function (itemIndex) {

    var item = items[itemIndex];
    alreadyBoughtItems.push(item);
    items.splice(itemIndex, 1);
    };

  service.getItems = function () {
    return items;
  };

  service.getAlreadyBoughtItems = function() {
    return alreadyBoughtItems;
  };

}

function ShoppingListProvider() {
  var provider = this;

  provider.defaults = {
    items: []
};
provider.$get = function () {
  var shoppingList = new ShoppingListService(provider.defaults.items);
  return shoppingList;
  };
}
})();
