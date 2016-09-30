$(document).ready(function() {
    var products = JSON.parse(localStorage.getItem('products'));
    $.each(products, function(key,val){
       $('ul#productsList').append("<li> Name: "+ val.name + " | Qty: " + val.qty + " | Price: " + val.price );
    });
});