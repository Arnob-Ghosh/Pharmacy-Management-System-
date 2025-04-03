fetchProduct();
function fetchProduct(){
		var purchaseProductId = $('#purchaseid').val();

		$.ajax({
		type: "GET",
		url: "/purchase-product-list-data/"+purchaseProductId,
		dataType:"json",
		success: function(response){

			$('tbody').html("");
			$.each(response.productList, function(key, item) {
				$('tbody').append('<tr>\
				<td></td>\
				<td class="hidden">'+item.productId+'</td>\
				<td>'+item.productName+'</td>\
				<td>'+item.quantity+'</td>\
				<td>'+item.unitPrice+'</td>\
				<td>'+item.mrp+'</td>\
				<td>'+item.batch_number+'</td>\
				<td>'+item.totalPrice+'</td>\
    		</tr>');
			})

		}
	});
}

$(document).on('click', '#pending', function (e) {
	e.preventDefault();

	var purchaseId = $(this).val();

	let purchaseProducts= {}
	var purchaseProductList=[];

	var T = $('.display');
	

	$(T).find('> tbody > tr').each(function () {
		let purchaseProduct= {};
		purchaseProduct["productId"]	= $(this).find("td:eq(1)").text();
    	purchaseProduct["productName"]	= $(this).find("td:eq(2)").text();
    	purchaseProduct["quantity"]		= $(this).find("td:eq(3)").text();
    	purchaseProduct["unitPrice"]	= $(this).find("td:eq(4)").text();
    	purchaseProduct["mrp"]			= $(this).find("td:eq(5)").text();
    	purchaseProduct["batchNumber"]	= $(this).find("td:eq(6)").text();
    	purchaseProduct["totalPrice"]	= $(this).find("td:eq(7)").text();
    	purchaseProductList.push(purchaseProduct);
	})

	purchaseProducts["store"]= $('#storeSpan').text();
	purchaseProducts["productList"]=purchaseProductList;

	$.ajax({
		ajaxStart: $('body').loadingModal({
			  position: 'auto',
			  text: 'Please Wait',
			  color: '#fff',
			  opacity: '0.7',
			  backgroundColor: 'rgb(0,0,0)',
			  animation: 'foldingCube'
			}),
        type: "POST",
        contentType: "application/json",
        url: "/purchase-product-receive/"+purchaseId,
        data: JSON.stringify(purchaseProducts),
        dataType : "json",
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (response) {
			location.reload();  
            
        }
    });

})

$(document).ready( function () {
	$('#product_table').DataTable({
	    pageLength : 10,
	    lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
	    "fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		    //debugger;
		    var index = iDisplayIndexFull + 1;
		    $("td:first", nRow).html(index);
		    return nRow;
	  	},

	  	dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
	})
});

