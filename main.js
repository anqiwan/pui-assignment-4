//function to create a new item
function Item() {
	this.type = "GPS Tracking Collar";
	this.color;
	this.size;
  this.photo;

}

//arrays with color/image data
var colors = ["Strawberry", "Night Moon", "Camouflage", "Crazyberry", "Blackberry", "Fire Orange"];
var imgs = ['collars/red.png', 'collars/yellow.png', 'collars/camo.png','collars/gradient.png','collars/black.png', 'collars/orange.png'];
var sizedescriptions = ["Tiny (less than 15 lb)", "Small (15-30 lb)", "Medium (30-50 lb)", "Large (50-70 lb)"];
var sizes = ["Tiny", "Small", "Medium", "Large"];
var cartitems = 0; // keeps quantities of cart

$(document).ready(function() {
   //initiate a new item to be stored.
   var newItem = new Item();
   //initiate new stored item arrays
   var storedItems;
   var wishlist;

   //'stored' is the array that contains the stored items
   storedItems = JSON.parse(localStorage.getItem("stored"));
   wishlist = JSON.parse(localStorage.getItem("wish"));

   if (storedItems === null) {
      // should only be first time, initiate new array
      storedItems = [];  
    } 

   if (wishlist === null) {
      wishlist = [];  
    } 

    //capture color swatch
    $('.swatch').click(function() {
      //initiate a new item if they click on a new swatch.
      var color = $(this).attr('id');
      //grab index of the color + change description text
      var index =  ($(this).index());
      var displaytext = colors[index];
      $("#color").text("Color: " + displaytext);
      //change image of display
      $('#collarpic').attr('src', imgs[index]);
      newItem.color = index;
      newItem.photo = imgs[index];
    });

   //capture size 
   $('.size').click(function() {
    console.log(newItem);
    if (newItem === undefined) {
      newItem = new Item();
    }
    var size = $(this).attr('id');
      //grab index of the size + change description text
      var index =  ($(this).index());
      var displaytext = sizedescriptions[index];
      $("#size").text("Size: " + displaytext);
      newItem.size = index;
    });


   //function to update cart when add button is clicked
   $('#add').click(function(){
     //console.log(newItem);
     $("#add").text("Added to Cart!");
     cartitems += 1;
     $("#cart").text("Cart" + " (" + cartitems.toString() + ") " );
     storedItems.push(newItem);
     localStorage.setItem("stored", JSON.stringify(storedItems));

     //clear the item 
     newItem = new Item();
  });

   //add something to wishlist
   $('#addtowishlist').click(function(){
     $("#addtowishlist").text("Added to list!");
     $("#cart").text("Cart" + " (" + cartitems.toString() + ") " );
     wishlist.push(newItem);
     localStorage.setItem("wish", JSON.stringify(wishlist));
     //create a new item and clear the old one.
     newItem = new Item();
  });

   //update cart status
   var cartitems = storedItems.length;
   if (cartitems === 0) {
      $("#cartstatus").text("You have no items in your shopping cart.");
    }
   $("#cart").text("Cart" + " (" + cartitems.toString() + ") " );

  
    //populate list with stored items
    var listItems = JSON.parse(localStorage.getItem("stored"));
     if (listItems === null) {
      // should only be first time, initiate new array
      listItems = [];  
    } 

    //iterate through the array and create a new entry for each CART item
    for (var i = 0; i < listItems.length; i++) {


      imgsource = listItems[i].photo;
      var elem = $("<div>", { "class": "element"});
      var size = listItems[i].size;
      $("#itemlist").append(elem);

      //append the image of the element
      var details = $("<div>", { "class": "details"});
      $(elem).append('<img class = "thumb" src=' + imgsource +' />');

      // append a div with type, size, color
      $(elem).append(details);
      $(details).append("<h3> GPS Tracking Collar </h3>");
      $(details).append("<h3> Size: "+ sizes[listItems[i].size] +" </h3>");
      $(details).append("<h3> Color: "+ colors[listItems[i].color] +" </h3>");

      // append a div with price
      var price = $("<div>", { "class": "price"})
      $(elem).append(price);
      price.append("<h3> $75 </h3>");

      // append a div with the remove button
      var remove = $("<div>", { "class": "removesection"})
      $(elem).append(remove);

      // create a remove button for each element
      var removebutton = $("<button>", { "class": "delete"});
      removebutton.append ("Remove Item");
      $(remove).append(removebutton);

    }


    //populate list with stored items
    var wishlistItems = JSON.parse(localStorage.getItem("wish"));

   if (wishlistItems === null) {
      wishlistItems = [];  
    } 

    /////iterate through the array and create a new entry for each WISHLIST item
    for (var i = 0; i < wishlistItems.length; i++) {
      imgsource = wishlistItems[i].photo;
      var elem = $("<div>", { "class": "element"});
      var size = wishlistItems[i].size;
      $("#wishlistlist").append(elem);

      //add product image
      var details = $("<div>", { "class": "details"});
      $(elem).append('<img class = "thumb" src=' + imgsource +' />');

      // append a div with type, size, color
      $(elem).append(details);
      $(details).append("<h3> GPS Tracking Collar </h3>");
      $(details).append("<h3> Size: "+ sizes[wishlistItems[i].size] +" </h3>");
      $(details).append("<h3> Color: "+ colors[wishlistItems[i].color] +" </h3>");

      // append a div with price
      var price = $("<div>", { "class": "price"})
      $(elem).append(price);
      price.append("<h3> $75 </h3>");

      // append a div with the remove button
      var remove = $("<div>", { "class": "removesection"})
      $(elem).append(remove);
    }


    //when remove a product button is clicked
    $('.delete').click(function() {
      //"item" is div of the product entry
      var item = this.parentNode.parentNode;

      //find index of selected item and remove it from the localstorage array
      var index = $(item).index();
      listItems.splice(index,1);
      localStorage.setItem("stored" , JSON.stringify(listItems));

      //remove the row from the cart and update cart quantity
      item.parentNode.removeChild(item);
      cartitems -= 1;
      $("#cart").text("Cart" + " (" + cartitems.toString() + ") " );

      if (cartitems === 0) {
        $("#cartstatus").text("You have no items in your shopping cart.");
      }
    });

    //clear all the items in cart
    $("#clear").click(function() {
      localStorage.setItem("stored" , JSON.stringify([]));
      // clears all the items in cart.
      $("#button-action-text").text("Cleared!");
      $("#button-action-text").css("display", "block");
      $("#cart").text("Cart" + " (0)");
      $("#itemlist").empty();
    });

  });