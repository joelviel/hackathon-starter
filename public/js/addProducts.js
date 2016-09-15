$(document).ready(function() {
    $('button#addProduct').click(function(e){
        e.preventDefault();
       // $('div#addProduct').html("test");
        $('div#addProduct').load("addProduct");
    })
});