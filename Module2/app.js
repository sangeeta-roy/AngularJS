(function(){
'use strict;'

angular.module('ShoppingCheck', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.provider('ShoppingList', ShoppingListProvider)
.config(Config)
;

Config.$inject = ['ShoppingListProvider'];
function Config(ShoppingListProvider) {
  ShoppingListProvider.defaults.message = false;
  ShoppingListProvider.defaults.items = [];
  var item={
    name: "carrots",
    quantity: 10,
    bought: false
  };
  ShoppingListProvider.defaults.items.push(item);
  item={
    name: "Broccoli",
    quantity: 2,
    bought: false
  };
  ShoppingListProvider.defaults.items.push(item);
  item={
    name: "Pumpkin",
    quantity: 1,
    bought: false
  };
  ShoppingListProvider.defaults.items.push(item);
  item={
    name: "Eggs",
    quantity: 12,
    bought: false
  };
  ShoppingListProvider.defaults.items.push(item);
  item={
    name: "Chicken",
    quantity: 5,
    bought: false
  };
  ShoppingListProvider.defaults.items.push(item);
}

// LIST #1 - To buy controller
ToBuyController.$inject = ['ShoppingList'];
function ToBuyController(ShoppingList) {
  var TBCtrlList = this;

  TBCtrlList.items = ShoppingList.getItems();
  TBCtrlList.message = ShoppingList.getMessage();

  TBCtrlList.addItem = function () {
    ShoppingList.addItem(TBCtrlList.itemName, TBCtrlList.itemQuantity);
  }

  TBCtrlList.boughtItem = function (itemIndex) {
  ShoppingList.boughtItem(itemIndex);

 var items = ShoppingList.getItems();
  for (var i=0; i<items.length; i++) {
     if( items[i].bought == false)
     return;
   }
     ShoppingList.setMessage(true);
     TBCtrlList.message = ShoppingList.getMessage();
};
}

// LIST #2 - Already bought controller
AlreadyBoughtController.$inject = ['ShoppingList'];
function AlreadyBoughtController(ShoppingList) {
  var ABCtrlList = this;

ABCtrlList.items = ShoppingList.getAlreadyBoughtItems();

}


// If not specified, maxItems assumed unlimited
function ShoppingListService(items, message) {
  var service = this;

  // List of shopping items
  var items = items;
  var message = message;
  //array of already bought items
  var alreadyBoughtItems = [];

  service.addItem = function (itemName, quantity, bought) {

      var item = {
        name: itemName,
        quantity: quantity,
        bought: bought
      };
      items.push(item);
  };

  service.boughtItem = function (itemIndex) {
    items[itemIndex].bought = true;
    var item = items[itemIndex];
    alreadyBoughtItems.push(item);
  };

  service.getItems = function () {
    return items;
  };

  service.getMessage = function () {
    return message;
  };

  service.setMessage = function (newmessage) {
    message = newmessage;
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
  var shoppingList = new ShoppingListService(provider.defaults.items, provider.defaults.message);
  return shoppingList;
  };
}
})();
