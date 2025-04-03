$(document).ready(function () {
	// $(document).on('submit', '#poNoForm', function (e) {
	// 	e.preventDefault();

	// 	if( $('#search').val() == null){
	// 		var msg = "Purchase Order no. is required."
	// 		$('#wrongsearch').empty();
	//     	$('#wrongsearch').append('<span id="">'+msg+'</span>');
	// 	}else{
	// 		var poNo = $('#search').val()
	// 		$.ajax({
	// 			type: "GET",
	// 			url: "/purchase-return-create/"+poNo,
	// 			dataType:"json",
	// 			success: function(response){
	// 				if(response.message == 'No data found.'){
	// 					$('#wrongsearch').empty();
    //     				$('#wrongsearch').append('<span id="">'+response.message+'</span>');
	// 				}
	// 				else{
	// 					$('#wrongsearch').empty();

	// 					supplierId = response.data[0].supplierId
	// 					$('#suppliername').val('')
	// 					var supplier = response.supplierName
	// 					$('#suppliername').val(supplier)
	// 					$('#supplierid').val(supplierId)

	// 					$('#date').val('')
	// 					var date = response.data[0].purchaseDate
	// 					$('#date').val(date)

	// 					$('#storeid').val('')
	// 					var storeid = response.storeId
	// 					$('#storeid').val(storeid)

	// 					$('#store').val('')
	// 					var store = response.data[0].store
	// 					$('#store').val(store)


	// 					$("#return_table").find("tr:gt(0)").remove();
	// 					$.each(response.data, function(key, item) {

	// 						var price = parseFloat(item.unitPrice)

	// 						if(item.discount == null){
	// 							var discount = 0;
	// 						}else{
	// 							var discount = parseFloat(item.discount)
	// 						}

	// 						if(item.other_cost == null){
	// 							var other_cost = 0;
	// 						}else{
	// 							var other_cost = parseFloat(item.other_cost)
	// 						}

	// 						$('#return_table_body').append('\
	// 						<tr>\
	// 							<td>'+item.productName+'</td>\
	// 							<td>'+item.quantity+'</td>\
	// 							<td><input type="number" class="form-control" name="" id="returnqty" value="0"></td>\
	// 							<td>'+price.toFixed(2)+'</td>\
	// 							<td><input type="number" class="form-control" name="" id="deduction" value=""></td>\
	// 							<td><input type="number" class="form-control" name="" id="total" value="0" disabled></td>\
	// 							<td class="hidden"></td>\
	// 							<td class="hidden"><input type="number" class="form-control" name="" id="deduction" value="0" disabled></td>\
	// 							<td>'+discount.toFixed(2)+'</td>\
	// 							<td>'+other_cost.toFixed(2)+'</td>\
	// 							<td class="hidden"><input type="number" class="form-control" name="" id="taxamount" value="0" disabled></td>\
	// 		        			<td class="hidden">'+item.productId+'</td>\
	// 		        		</tr>');


	// 					})
	// 				}
	// 			}
	// 		})
	// 	}
	// })

    $(document).on('change', '#search', function (e) {
		e.preventDefault();

		if( $('#search').val() == null){
			var msg = "Purchase Order no. is required."
			$('#wrongsearch').empty();
	    	$('#wrongsearch').append('<span id="">'+msg+'</span>');
		}else{
			var poNo = $('#search').val()
			$.ajax({
				type: "GET",
				url: "/purchase-return-create/"+poNo,
				dataType:"json",
				success: function(response){
					if(response.message == 'No data found.'){
						$('#wrongsearch').empty();
        				$('#wrongsearch').append('<span id="">'+response.message+'</span>');
					}
					else{
						$('#wrongsearch').empty();

						supplierId = response.data[0].supplierId
						$('#suppliername').val('')
						var supplier = response.supplierName
						$('#suppliername').val(supplier)
						$('#supplierid').val(supplierId)

						$('#date').val('')
						var date = response.data[0].purchaseDate
						$('#date').val(date)

						$('#storeid').val('')
						var storeid = response.storeId
						$('#storeid').val(storeid)

						$('#store').val('')
						var store = response.data[0].store
						$('#store').val(store)

                        $('#discount').val('')
						if(response.data[0].discount == null){
                            var discount = 0;
                        }else{
                            var discount = parseFloat(response.data[0].discount)
                        }
						$('#discount').val(discount)

                        $('#other_cost').val('')
						if(response.data[0].other_cost == null){
                            var other_cost = 0;
                        }else{
                            var other_cost = parseFloat(response.data[0].other_cost)
                        }
						$('#other_cost').val(other_cost)

						$("#return_table").find("tr:gt(0)").remove();
						$.each(response.data, function(key, item) {

							var price = parseFloat(item.unitPrice)

							$('#return_table_body').append('\
							<tr>\
								<td>'+item.productName+'</td>\
								<td>'+item.quantity+'</td>\
								<td><input type="number" class="form-control" name="" id="returnqty" value="0"></td>\
								<td>'+price.toFixed(2)+'</td>\
								<td><input type="number" class="form-control" name="" id="deduction" value=""></td>\
								<td><input type="number" class="form-control" name="" id="total" value="0" disabled></td>\
								<td class="hidden"></td>\
								<td class="hidden"><input type="number" class="form-control" name="" id="deduction" value="0" disabled></td>\
								<td class="hidden"><input type="number" class="form-control" name="" id="taxamount" value="0" disabled></td>\
			        			<td class="hidden">'+item.productId+'</td>\
                                </tr>');
								// <td>'+discount.toFixed(2)+'</td>\
								// <td>'+other_cost.toFixed(2)+'</td>\


						})
					}
				}
			})
		}
	})
})


$(document).on('keyup', '#returnqty', function(e) {

  var returnQty = $(this).val()
  var soldQty = parseInt($(this).closest("tr").find("td:eq(1)").text())

  var price = parseFloat($(this).closest("tr").find("td:eq(3)").text())
  var totalPrice = parseFloat(returnQty*price)

//   var otherCost = parseFloat($(this).closest("tr").find("td:eq(9)").text())



  if(returnQty <= soldQty && returnQty >= 0){
  	$(this).closest("tr").find("td:eq(5) input[type='number']").val(totalPrice.toFixed(2))

  	//Deduction
    var deduction = $(this).closest("tr").find("td:eq(4) input[type='number']").val()
	var deductionAmount = parseFloat(returnQty*price*(deduction/100))
	$(this).closest("tr").find("td:eq(7) input[type='number']").val(deductionAmount)

    var totalAfterDeduction = totalPrice - deductionAmount
	$(this).closest("tr").find("td:eq(5) input[type='number']").val(totalAfterDeduction.toFixed(2))

    var totalDeduction = 0
  	$('#return_table').find('> tbody > tr').each(function () {
    	var deduct = $(this).closest("tr").find("td:eq(7) input[type='number']").val();
		totalDeduction = parseFloat(totalDeduction) + parseFloat(deduct)

		$('#totaldeduction').val(totalDeduction.toFixed(2));
    });


  	//total
    var total = 0
  	$('#return_table').find('> tbody > tr').each(function () {
    	var p = parseFloat($(this).closest("tr").find("td:eq(5) input[type='number']").val());
		total = parseFloat(total + p);
		$('#netreturn').val(total.toFixed(2));
    });

  }else{
  	$.notify("Invalid Return Qty", {className: 'error', position: 'bottom right'});
  	$(this).closest("tr").find("td:eq(2) input[type='number']").val(0)
  }

})


$(document).on('keyup', '#deduction', function(e) {
	var deduction = $(this).val()

	if(deduction > 100 || deduction < 0){
		$.notify('Invalid Deduction!', {className: 'error', position: 'bottom right'});
		$(this).val(0)
	}else{
		var price = parseFloat($(this).closest("tr").find("td:eq(3)").text())
		var returnQty = parseFloat($(this).closest("tr").find("td:eq(2) input[type='number']").val());

		var deductionAmount = parseFloat(returnQty*price*(deduction/100))
		$(this).closest("tr").find("td:eq(7) input[type='number']").val(deductionAmount)


		var soldQty = parseInt($(this).closest("tr").find("td:eq(1)").text())
		var totalPrice = parseFloat(returnQty*price)
		// var otherCost = parseFloat($(this).closest("tr").find("td:eq(9)").text())



		var totalAfterDeduction = totalPrice - deductionAmount
		$(this).closest("tr").find("td:eq(5) input[type='number']").val(totalAfterDeduction.toFixed(2))

	    var totalDeduction = 0
	  	$('#return_table').find('> tbody > tr').each(function () {
	    	var deduct = $(this).closest("tr").find("td:eq(7) input[type='number']").val();
			totalDeduction = parseFloat(totalDeduction) + parseFloat(deduct)

			$('#totaldeduction').val(totalDeduction.toFixed(2));
	    });

		var total = 0
	  	$('#return_table').find('> tbody > tr').each(function () {
	    	var p = parseFloat($(this).closest("tr").find("td:eq(5) input[type='number']").val());
			total = parseFloat(total + p);
			// alert(total)
			$('#netreturn').val(total.toFixed(2));
	    });
	}


});

function collectingData() {
	this.event.preventDefault();

	let products = {};
    let productList = []
    var time = new Date().getTime();
    var returnNum = time.toString();

    var totalReturnQty = 0
  	$('#return_table').find('> tbody > tr').each(function () {
    	var p = parseFloat($(this).closest("tr").find("td:eq(2) input[type='number']").val());
		totalReturnQty = parseFloat(totalReturnQty + p);
    });


    if( $('#return_table tr').length > 1 && totalReturnQty > 0){
            $('#errMsg').empty()
            var returnTable = $('#return_table');
            $(returnTable).find('> tbody > tr').each(function () {

                let product = {}
				product["productId"]        = $(this).find("td:eq(9)").text();
                product["productName"]      = $(this).find("td:eq(0)").text();
                product["quantity"]         = $(this).find("td:eq(1)").text();
                product["returnQty"]        = $(this).closest("tr").find("td:eq(2) input[type='number']").val()
                product["price"]        	= $(this).find("td:eq(3)").text();
                product["deductionPercent"] = $(this).closest("tr").find("td:eq(4) input[type='number']").val()
                product["total"]        	= $(this).closest("tr").find("td:eq(5) input[type='number']").val()
                product["deductionAmount"]  = $(this).closest("tr").find("td:eq(7) input[type='number']").val()
                // product["discount"]        	= $(this).find("td:eq(8)").text();
                // product["otherCost"]        = $(this).find("td:eq(9)").text();
                product["discount"]        	= $('#discount').val()
                product["otherCost"]        = $('#other_cost').val()


                productList.push(product);

            })

  			products["poNo"] = $('#search').val()
  			products["supplierId"] = $('#supplierid').val()
  			products["supplierName"] = $('#suppliername').val()
  			products["storeId"] = $('#storeid').val()
  			products["date"] = $('#date').val()
  			products["note"] = $('#note').val()

  			products["totalDeduction"] = $('#totaldeduction').val()
  			products["netReturn"] = $('#netreturn').val()

            products["productList"] = productList
            products["returnNumber"] = returnNum

            purchaseReturn(products)


        }else{
            $('#errMsg').text("*Please add products to return.");
        }
}


function purchaseReturn(jsonData){

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
        url: "/purchase-return",
        data: JSON.stringify(jsonData),
        dataType : "json",
        contentType: "application/json",
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
        success: function (response) {

	        if(response.message == "Already returned."){
	        	$('body').loadingModal('destroy');
	            $.notify(response.message, {className: 'error', position: 'bottom right'});
	        }else{
	        	$.notify(response.message, {className: 'success', position: 'bottom right'});
	        	$(location).attr('href','/purchase-return-list');
	        }
        }
    });

}
