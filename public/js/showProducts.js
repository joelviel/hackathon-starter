$(document).ready(function() {
    var productsList =  $('ul#products');
    var products = JSON.parse(localStorage.getItem('products'));
    $.each(products, function(key,val){
       productsList.append("<li> Name: "+ val.name + " | Qty: " + val.qty + " | Price: " + val.price );
    });
});