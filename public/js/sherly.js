

$(document).ready(function () {
	
	// var testHere = function() {alert('hello here');}

	// example ajax request in jQuery to get all products
	$("#sherlyButton").click(function(){
	    $.get("/api/products", function(data, status){
	        $("#resultAjaxGet").empty();
	        for(i=0; i<data.Records.length;i++) {
	        	$("#resultAjaxGet").append('<li>'+data.Records[i].name+'</li>');
	        }
	    });
	});

});