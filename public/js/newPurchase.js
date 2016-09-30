$(document).ready(function() {
    //date-picker
    $('input#purchaseDate').datepicker();
    $('input#paidDate').datepicker();

    //load table of products
    $('div#showProducts').empty();
    $('div#showProducts').load("showProducts");

    //clear all products from localStorage
    $('button#clearProducts').click(function(e){
        e.preventDefault();   
        e.stopImmediatePropagation();
        localStorage.removeItem('products');  
        $('div#showProducts').empty();
        alert ("All products have been cleared");
    })

    //load form add product
    $('button#addProduct').click(function(e){
        e.preventDefault();   
        $('div#addProduct').load("addProduct");
    })

    //cancel form add product
    $('button#cancelProduct').click(function(e){
        e.preventDefault();   
        $('div#addProduct').empty();
    })
  
    //cancel form purchase & reload page
    $('button#cancelPurchase').click(function(e){
        e.preventDefault(); 
        localStorage.clear();
        location.reload(true);
    })
  
    //autofill supplierId
    $('select#supplierName').change(function(e){
        var selectedIndex = $(this).find("option:selected").index();
        $('select#supplierId').prop('selectedIndex', selectedIndex);
    })

    //autofill productId
    $('select#productName').change(function(e){
        var selectedIndex = $(this).find("option:selected").index();
        $('select#productId').prop('selectedIndex', selectedIndex);
    })

    //save product to local storage
     $('button#saveProduct').click(function(e){
        e.preventDefault();
        if (typeof(Storage) !== "undefined") {

            //get data
            var productId = $('select#productId').val();
            var productName = $('select#productName').val();
            var qty = $('input#qty').val().trim();
            var price = $('input#price').val().trim();

            //validate data
            if (qty.length == 0 || price.length == 0)  alert ("Price and quantity must be filled!");
            else if (isNaN(qty) || isNaN(price)) alert ("Price and quantity must be number!");

            else {
                //save to local storage
                var localStorageProducts = JSON.parse(localStorage.getItem('products')) || [];
                var product = { 'productId':productId, 'name':productName, 'qty':qty, 'price':price};
                localStorageProducts.push(product);
                localStorage.setItem('products', JSON.stringify(localStorageProducts));
               
                //load table of products
                $('div#showProducts').empty();
                $('div#showProducts').load("showProducts");
                $('div#addProduct').empty();
            }
        } else {
            //local storage is not supported
            alert ("Local Storage not supported!");
        }
    })

    //save form purchase
    $('button#savePurchase').click(function(e){
        e.preventDefault(); 
        var purchaseDate= new Date ($('input#purchaseDate').val());
        var paidDate = ($('input#paidDate').val() === null)? null : new Date ($('input#paidDate').val());
        var supplierId = $('select#supplierId').val();
        var postPurchaseHeader = {'purchaseDate' : purchaseDate, 'paidDate' : paidDate, 'supplierId' : supplierId};
        var postProducts = JSON.parse(localStorage.getItem('products'));
        $.ajax ({
            type: 'post',
            url: '/api/purchaseOrders',
            beforeSend: function(req){req.setRequestHeader('X-CSRF-Token', $("meta[name='csrf-token']").attr("content"));},
            data: {
                products : postProducts,
                purchaseHeader : postPurchaseHeader
            },
            success: function (data){

            }
        });
    })


});