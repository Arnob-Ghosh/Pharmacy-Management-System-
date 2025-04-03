fetchOrderProduct()
function fetchOrderProduct(){		

	var orderId = $('#orderid').val();

	$.ajax({
		type: "GET",
		url: "/order-product-list-data/"+orderId,
		dataType:"json",
		success: function(response){
			$('tbody').html("");
			$.each(response.productList, function(key, item) {

				var totalPrice = parseFloat(item.totalPrice)
				var totalDiscount = parseFloat(item.totalDiscount)
				var totalTax = parseFloat(item.totalTax)
				var grandTotal = parseFloat(item.grandTotal)

				$('tbody').append('<tr>\
					<td></td>\
					<td>'+item.productName+'</td>\
					<td>'+item.quantity+'</td>\
					<td>'+totalPrice.toFixed(2)+'</td>\
					<td>'+totalDiscount.toFixed(2)+'</td>\
					<td>'+totalTax.toFixed(2)+'</td>\
					<td>'+grandTotal.toFixed(2)+'</td>\
	    		</tr>');
			})
		}
	});
}

		
//DATA TABLE
$(document).ready( function () {
	$('#products_table').DataTable({
	    pageLength : 5,
	    lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
	    "fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		    //debugger;
		    var index = iDisplayIndexFull + 1;
		    $("td:first", nRow).html(index);
		    return nRow;
	  	},
	});
});