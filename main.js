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


var cartitems = 0;

$(document).ready(function() {

   //initiate a new item to be stored.
   //var newItem;
   var newItem = new Item();
   //initiate new stored item array
   var storedItems;

   //'stored' is the array that contains the stored items
   storedItems = JSON.parse(localStorage.getItem("stored"));

   //grab the array and see
   console.log(storedItems);

   if (storedItems === null) {
      console.log("null"); // should only be first time, initiate new array
      storedItems = [];  
    } 

    //capture color
    $('.swatch').click(function() {
      //initiate a new item if they click on a new swatch.
      
      var color = $(this).attr('id');
      //grab index of the color + change description text
      var index =  ($(this).index());
      var displaytext = colors[index];
      $("#color").text("Color: " + displaytext);
      //change image of dispslay
      $('#collarpic').attr('src', imgs[index]);

      newItem.color = index;
      newItem.photo = imgs[index];

      console.log(newItem.color);
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
      console.log(newItem.size);
    });


   //function to update cart when add button is clicked
   $('#add').click(function(){
    console.log(newItem);
    $("#add").text("Added to Cart!");
    cartitems += 1;
    $("#cart").text("Cart" + " (" + cartitems.toString() + ") " );
    storedItems.push(newItem);
    localStorage.setItem("stored", JSON.stringify(storedItems));
    console.log( storedItems);

    //create a new item and clear the old one.
    newItem = new Item();
  });


   var cartitems = storedItems.length;
   if (cartitems === 0) {
      $("#cartstatus").text("You have no items in your shopping cart.");
    }
   $("#cart").text("Cart" + " (" + cartitems.toString() + ") " );

  

    //populate list with stored items
    var listItems = JSON.parse(localStorage.getItem("stored"));

    /////iterate through the array and create a new entry for each cart item////
    for (var i = 0; i < listItems.length; i++) {
      imgsource = listItems[i].photo;
      var elem = $("<div>", { "class": "element"});
      var size = listItems[i].size;
      $("#itemlist").append(elem);

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
      console.log (size);

    }

    //when remove a product button is clicked
    $('.delete').click(function() {
        //"item" is the container element for all product details
        var item = this.parentNode.parentNode;
        console.log( $(item).index() );

        //find index of selected item and remove it from the locally stored array
        var index = $(item).index();
        listItems.splice(index,1);
        localStorage.setItem("stored" , JSON.stringify(listItems));

        //remove the row from the cart and update cart quantity
        item.parentNode.removeChild(item);
        cartitems -= 1;
        $("#cart").text("Cart" + " (" + cartitems.toString() + ") " );
    });

     $("#clear").click(function() {
    localStorage.setItem("stored" , JSON.stringify([]));
      // makes it cleared
      $("#button-action-text").text("Cleared!");
      $("#button-action-text").css("display", "block");
      $("#cart").text("Cart" + " (0)");
      $("#itemlist").empty();
    });


  });