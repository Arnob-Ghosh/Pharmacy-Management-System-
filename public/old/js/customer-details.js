
fetchCustomerDetails()
function fetchCustomerDetails(){
	var customerId =  $('#customerid').val();
	$.ajax({
		type: "GET",
		url: "/customer-details/"+customerId,
		dataType:"json",
		success: function(response){
			$.each(response.order, function(key, item) {

				var total = parseFloat(item.total)
				var totalDiscount = parseFloat(item.totalDiscount)
				var totalTax = parseFloat(item.totalTax)
				var grandTotal = parseFloat(item.grandTotal)


				$('tbody').append('<tr>\
					<td></td>\
					<td>'+item.orderId+'</td>\
					<td>'+total.toFixed(2)+'</td>\
					<td>'+totalDiscount.toFixed(2)+'</td>\
					<td>'+totalTax.toFixed(2)+'</td>\
					<td>'+grandTotal.toFixed(2)+'</td>\
					<td>'+item.orderDate+'</td>\
    			</tr>');
			})	
		}
	});
}

$(document).ready(function () {
	$('#order_table').DataTable({
	    pageLength : 10,
	    lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
	    "fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		    //debugger;
		    var index = iDisplayIndexFull + 1;
		    $("td:first", nRow).html(index);
		    return nRow;
	  	},
	});
})
	
