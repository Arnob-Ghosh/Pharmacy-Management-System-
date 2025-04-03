fetchReturnProducts()
function fetchReturnProducts(){
	var returnNumber =  $('#returnnumber').val();
	$.ajax({
		type: "GET",
		url: "/sales-return-details/"+returnNumber,
		dataType:"json",
		success: function(response){
            // console.log(response);

			$.each(response.returnProducts, function(key, item) {

				var returnQty = parseFloat(item.return_qty)
				var price = parseFloat(item.price)
				var taxReturn = parseFloat(item.tax_return)
				var deduction = parseFloat(item.deduction)
				var total =  parseFloat(((returnQty*price)-deduction)+taxReturn)


				$('tbody').append('<tr>\
					<td></td>\
					<td>'+item.product_name+'</td>\
					<td>'+item.return_qty+'</td>\
					<td>'+price.toFixed(2)+'</td>\
					<td>'+taxReturn.toFixed(2)+'</td>\
					<td>'+deduction.toFixed(2)+'</td>\
					<td>'+total.toFixed(2)+'</td>\
    			</tr>');
			})
		}
	});
}

// $(document).ready(function () {
// 	$('#return_product_table').DataTable({
// 	    pageLength : 10,
// 	    lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
// 	    "fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
// 		    //debugger;
// 		    var index = iDisplayIndexFull + 1;
// 		    $("td:first", nRow).html(index);
// 		    return nRow;
// 	  	},
// 	});
// })
