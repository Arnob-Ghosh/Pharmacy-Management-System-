$('#totalpricepurchase').on('click', function (e) {
	e.preventDefault();

	var total = $("#receivedqty").val() * $("#unitprice").val();

	$("#totalpricepurchase").val(total);

});

function productAddToTable() {
	this.event.preventDefault();
	var productId		=	$("#product option:selected").val();
	var productName     =   $("#product option:selected").text();
    if(productName==''){

        productName     = $('#product').select2('data')[0].productName
    }
    // alert(productName)
	var mrp       		=   $("#mrp").val()
	var quantity  		=   $("#qty").val()
	var discount  		=   $("#discount1").val()
    if(discount==''){
        discount=0;
    }
	var tax  			=   $("#tax1").val()
	var total			= 	parseFloat(mrp) * parseFloat(quantity)

	var availableOffer  	= 	$("#availableoffer").val()
	var requiredQuantity	= 	$("#requiredQuantity").val()
	var freeQuantity  		= 	$("#freeQuantity").val()
	var freeItemName  		= 	$("#freeItemName").val()
	var offerItemId  		= 	$("#offerItemId").val()
	var productQty  		= 	parseFloat($('#productQty').val())

	var isExcludedTax  		= 	$("#isExcludedTax").val()

	if(isExcludedTax == "true"){
		var tax = (parseFloat(mrp)/100) * parseFloat(tax);
	}else{
		var tax = 0;
	}


	if(productId != 'option_select' && quantity.length != 0  && mrp.length != 0){

	    if($('#product_table tr > td:first-child:contains('+productName+')').length == 0){

	    	if(quantity > productQty){
	    		$('#addProduct').notify("Stock limited!", {className: 'error', position: 'bottom left'});
    		 	$("#qty").val(productQty)


	    	}else{
	    		$('#product_table_body').append('<tr>\
					<td>'+productName+'</td>\
					<td>'+mrp+'</td>\
					<td>'+quantity+'</td>\
					<td>'+total+'</td>\
					<td style="display:none;">'+discount+'</td>\
					<td style="display:none;">'+tax+'</td>\
					<td style="display:none;">'+discount+'</td>\
					<td style="display:none;">'+tax+'</td>\
					<td style="display:none;">'+productId+'</td>\
					<td style="display:none;">'+availableOffer+'</td>\
					<td style="display:none;">'+requiredQuantity+'</td>\
					<td style="display:none;">'+freeQuantity+'</td>\
					<td style="display:none;">'+freeItemName+'</td>\
					<td style="display:none;">'+offerItemId+'</td>\
					<td style="display:none;">'+productQty+'</td>\
					<td><button class="btn-remove" style="background: transparent;" value="'+productId+'"><i class="fas fa-minus-circle" style="color: red;"></i></button></td>\
	    		</tr>');
	    	}


		}else{
			var trid = $('#product_table tr > td:first-child:contains('+productName+')').closest("tr").index();
			var qty = $('#product_table tr > td:first-child:contains('+productName+')').closest("tr").find("td:eq(2)").text()
			var discount1 = $('#product_table tr > td:first-child:contains('+productName+')').closest("tr").find("td:eq(4)").text()
			var vat = $('#product_table tr > td:first-child:contains('+productName+')').closest("tr").find("td:eq(5)").text()
			var totalProductQty = parseFloat($('#product_table tr > td:first-child:contains('+productName+')').closest("tr").find("td:eq(14)").text())

			var add = parseFloat(qty) + parseFloat(quantity)

			if(add > totalProductQty){

				$('#addProduct').notify("Stock limited !", {className: 'error', position: 'bottom left'});

				$('#product_table tr > td:first-child:contains('+productName+')').closest("tr").find("td:eq(2)").text(totalProductQty)

				var subTotal = totalProductQty * parseFloat(mrp)
				$('#product_table tr > td:first-child:contains('+productName+')').closest("tr").find("td:eq(3)").text(subTotal)


				var totalDiscount = parseFloat(discount)
				$('#product_table tr > td:first-child:contains('+productName+')').closest("tr").find("td:eq(4)").text(totalDiscount)

				var totalVat = parseFloat(vat)
				$('#product_table tr > td:first-child:contains('+productName+')').closest("tr").find("td:eq(5)").text(totalVat)

			}else{

				$('#product_table tr > td:first-child:contains('+productName+')').closest("tr").find("td:eq(2)").text(add)

				var subTotal = add * parseFloat(mrp)
				$('#product_table tr > td:first-child:contains('+productName+')').closest("tr").find("td:eq(3)").text(subTotal)


				var totalDiscount = parseFloat(discount) + parseFloat(discount1)
				$('#product_table tr > td:first-child:contains('+productName+')').closest("tr").find("td:eq(4)").text(totalDiscount)

				var totalVat = parseFloat(vat) + parseFloat(tax)
				$('#product_table tr > td:first-child:contains('+productName+')').closest("tr").find("td:eq(5)").text(totalVat)


			}

		}

		var qty = $('#product_table tr > td:first-child:contains('+productName+')').closest("tr").find("td:eq(2)").text()
		var res = Math.floor(qty/requiredQuantity)
		var remainder =  (qty%requiredQuantity)

		if(availableOffer == 'true' && remainder == 0){

			var freeQty = Math.floor(qty/requiredQuantity)

			if(freeQty > 0){
				if($('#free_product_table tr > td:contains('+productName+')').length == 0){
					alert('Offer Avaialble! Buy '+requiredQuantity+ ' ' +productName +' & Get '+freeQuantity+ ' '+ freeItemName)
					$('#free_product_table').show();
					$('#free_product_table_body').append('<tr>\
						<td>'+freeItemName+'</td>\
						<td>'+freeQuantity+'</td>\
						<td>'+productName+'</td>\
						<td style="display:none;">'+offerItemId+'</td>\
	        		</tr>');
				}else{
					alert('Offer Item Added for '+productName+'!')
					var add =  parseInt($('#free_product_table tr > td:contains('+productName+')').closest("tr").find("td:eq(1)").text()) + freeQuantity
					$('#free_product_table tr > td:contains('+productName+')').closest("tr").find("td:eq(1)").text(add)
				}
			}
		}

		var total = 0;
		$('#product_table').find('> tbody > tr').each(function () {
	    	var price = parseFloat($(this).find("td:eq(3)").text());
			total = total + price;
			$('#totalX').val(total.toFixed(2));
	    });

		var discountTotal = 0;
		$('#product_table').find('> tbody > tr').each(function () {
	    	var d = parseFloat($(this).find("td:eq(4)").text());
			discountTotal = discountTotal + d;
			$('#discount').val(discountTotal.toFixed(2));
	    });

	    var vatTotal = 0;
		$('#product_table').find('> tbody > tr').each(function () {
	    	var d = parseFloat($(this).find("td:eq(5)").text());
			vatTotal = vatTotal + d;
			$('#tax').val(vatTotal.toFixed(2));
	    });

        var specialdiscount  		=   $("#specialdiscount").val()
        if(specialdiscount==''){
            specialdiscount=0;
        }

	    $('#grandtotal').val((((parseFloat($('#totalX').val()) - parseFloat($('#discount').val()))- specialdiscount) + parseFloat($('#tax').val())).toFixed(2) );

	}else{

		$('#addProduct').notify('Please fill up all th required fields.', {className: 'error', position: 'bottom right'});

	}
}

$("#product_table").on('click', '.btn-remove', function () {
    $(this).closest('tr').remove();

    var total = 0;
	$('#product_table').find('> tbody > tr').each(function () {
    	var price = parseFloat($(this).find("td:eq(3)").text());
		total = total + price;
		$('#totalX').val(total.toFixed(2));
    });

	var discountTotal = 0;
	$('#product_table').find('> tbody > tr').each(function () {
    	var d = parseFloat($(this).find("td:eq(4)").text());
		discountTotal = discountTotal + d;
		$('#discount').val(discountTotal.toFixed(2));
    });

    var vatTotal = 0;
	$('#product_table').find('> tbody > tr').each(function () {
    	var d = parseFloat($(this).find("td:eq(5)").text());
		vatTotal = vatTotal + d;
		$('#tax').val(vatTotal.toFixed(2));
    });

    var specialdiscount  		=   $("#specialdiscount").val()
    if(specialdiscount==''){
        specialdiscount=0;
    }

    $('#grandtotal').val((((parseFloat($('#totalX').val()) - parseFloat($('#discount').val()))- specialdiscount) + parseFloat($('#tax').val())).toFixed(2) );

    var rowCount = $('#product_table tr').length;

    if(rowCount == 1){
    	$('#total').text(0);
    	$('#discount').text(0);
    	$('#vatS').text(0);
    	$('#grandTotal').text(0);
    }

    var availableOffer   = $(this).closest("tr").find("td:eq(9)").text()
    var requiredQuantity = parseInt($(this).closest("tr").find("td:eq(10)").text())
    var freeQuantity 	 = parseInt($(this).closest("tr").find("td:eq(11)").text())
    var freeItemName 	 = $(this).closest("tr").find("td:eq(12)").text()
    var productName 	 = $(this).closest("tr").find("td:eq(0)").text()

    var qty = $(this).closest("tr").find("td:eq(2) input[type='number']").val()

    if(availableOffer == "true"){

    	$('#free_product_table tr > td:contains('+productName+')').closest("tr").remove()
    	if($('#free_product_table tr').length == 1){
			$('#free_product_table').hide()
		}

    }




});


$(document).on('click', '#save', function (e){
	OrderSubmitToServer();
})


function OrderSubmitToServer() {
	this.event.preventDefault();

	var d = new Date();
	var date = d.getFullYear() +"-"+ (d.getMonth()+1) +"-"+ d.getDate();

	let orders= {};

	var client = $("#clientid option:selected").text();
	var clientName = client.substr(0, client.indexOf(' ('));

	var clientId = $("#clientid option:selected").val();

	if(clientId == 'option_select'){
		clientId = ""
	}

    var totalDiscount=parseFloat($("#discount").val());
    var specialDiscount=parseFloat($("#specialdiscount").val());
    if(specialDiscount>0){
    }
    else{
        specialDiscount=0;

    }
    if(totalDiscount>0){
    }
    else{
        totalDiscount=0;
    }

	orders["orderId"] 			= $("#invoiceno").val();
	orders["clientId"] 			= clientId
	orders["clientName"] 		= clientName
	orders["total"] 			= $("#totalX").val();
	// orders["totalDiscount"] 	= $("#discount").val();
	orders["totalDiscount"] 	= totalDiscount;
	orders["totalTax"] 			= $("#tax").val();
	orders["specialDiscount"] 	= specialDiscount;
	orders["grandTotal"] 		= $("#grandtotal").val();

	orders["subscriberId"]		= $("#subscriberid").val();
	orders["storeId"] 			= $("#store").val();
	orders["posId"] 			= $("#pos").val();
	orders["salesBy"] 			= $("#salesby").val();
	orders["orderDate"] 		= $("#orderdate").val();
	orders["due"] 				= $('#duep').text();


	var productTable = $('#product_table');
	var freeProductTable = $('#free_product_table');
	var productList = [];
	var paymentDetails=[];
	let cashObj= {};
	let mobileBankingObj= {};
	let bankObj= {};
	let paymentObj= {};

	//---------------------PAYMENT DETAILS--------------------------------------------------------------------

	paymentObj["amount"] = $("#grandtotal").val()
	paymentObj["id"]	 = "0000"
	paymentObj["payment_type"]	 = "cash"

	paymentDetails.push(paymentObj);


	if( $('#cashamount').val() && $('#cashamount').val() > 0){

		cashObj["amount"]	= $('#cashamount').val();
		cashObj["id"]		= "0000"
		cashObj["payment_type"]		= "cash"

		paymentDetails.push(cashObj);
	}

	if( $('#mobilebankingamount').val() && $('#mobilebankingamount').val() > 0 && $('#mobilebanking').val() != "default"){

		mobileBankingObj["amount"]	= $('#mobilebankingamount').val();
		mobileBankingObj["id"]		= $('#mobilebanking').val();
		mobileBankingObj["payment_type"]	= $("#mobilebanking").find("option:selected").text();

		paymentDetails.push(mobileBankingObj);
	}

	if( $('#bankamount').val() && $('#bankamount').val() > 0){

		bankObj["amount"]	= $('#bankamount').val();
		bankObj["id"]		= "0000"
		bankObj["payment_type"]		= "card"

		paymentDetails.push(bankObj);
	}

    $(productTable).find('> tbody > tr').each(function () {

    	//----------------------------------------------------------------------Product Object
    	let product= {};

    	product["productId"]		= $(this).find("td:eq(8)").text();
    	product["productName"]		= $(this).find("td:eq(0)").text();
    	product["quantity"]			= $(this).find("td:eq(2)").text();
    	product["price"]			= $(this).find("td:eq(1)").text();

    	if( ($(this).find("td:eq(9)").text() == "true") && ( product["quantity"] >= parseInt( $(this).find("td:eq(10)").text()) ) ){

    		$(freeProductTable).find('> tbody > tr').each(function () {
	    		if( product["productName"] == $(this).find("td:eq(2)").text() ){
	    			product["offerItemId"]		= $(this).find("td:eq(3)").text();
			    	product["offerName"]		= $(this).find("td:eq(0)").text();
			    	product["offerQuantity"]	= $(this).find("td:eq(1)").text();
	    		}
	    	 })
    	}else{
    		if( ($(this).find("td:eq(9)").text() == "true") ){

				product["offerItemId"]		= $(this).find("td:eq(13)").text()
		    	product["offerName"]		= $(this).find("td:eq(12)").text()
		    	product["offerQuantity"]	= 0;

    		}else{
    			product["offerItemId"]		= "null";
		    	product["offerName"]		= "null";
		    	product["offerQuantity"]	= 0;
    		}

    	}

    	product["totalPrice"]		= $(this).find("td:eq(3)").text();
    	product["totalDiscount"]	= $(this).find("td:eq(4)").text();
    	product["totalTax"]			= $(this).find("td:eq(5)").text();

    	product["grandTotal"]		= ((parseFloat($(this).find("td:eq(3)").text()) - parseFloat($(this).find("td:eq(4)").text())) + parseFloat($(this).find("td:eq(5)").text()));
    	product["discount"]			= $(this).find("td:eq(6)").text()

    	var price = $(this).find("td:eq(1)").text();
		var tax = parseFloat($(this).find("td:eq(7)").text());
		var taxAmount = parseFloat((tax*100)/price);
		product["tax"]			= taxAmount;


    	productList.push(product);

    });

    orders["orderDetails"]=productList;
    orders["paymentDetails"]=paymentDetails;

    if(productList.length>0){
    	var clientId = $('#clientid').val();
var store = $('#store').val();
var pos = $('#pos').val();

if (clientId !== 'option_select' && store !== 'option_select' && (store === 'inventory' || pos !== null)) {
    submitOrder(orders);
} else {
    $('#save').notify("Please fill up the required fields!", { className: 'error', position: 'bottom left' });
}



    }else{
    	$.notify("Please select at least one product!", {className: 'error', position: 'bottom right'});

    }

}


$(document).on('keyup', '#specialdiscount', function(e) {
	var grandTotal = parseFloat($("#grandtotal").val());
	var sDiscount = parseFloat($("#specialdiscount").val());
	var totalPrice = $("#totalX").val();
	var totalTax = $("#tax").val();
	var totalDiscount = $("#discount").val();
	let zero = 0;
    // alert(grandTotal)
	if(grandTotal.length != 0 || grandTotal != 0){

		if(parseFloat(sDiscount) <= parseFloat(grandTotal) && parseFloat(sDiscount) > zero.toFixed(2)){
			gTotal = (parseFloat(totalPrice) + parseFloat(totalTax)) - parseFloat(sDiscount) - parseFloat(totalDiscount)
			$("#grandtotal").val(gTotal.toFixed(2))
		}else{
            $("#specialdiscount").val('');
            $("#grandtotal").val(grandTotal.toFixed(2))
            $.notify("Invalid Special Discount!!", {className: 'error', position: 'bottom right'});
		}

	}

	if(sDiscount.length == 0){
		gTotal = (parseFloat(totalPrice) + parseFloat(totalTax)) - parseFloat(totalDiscount)
		$("#grandtotal").val(gTotal.toFixed(2))
	}


})


function submitOrder(jsonData) {

    $.ajax({
        type: "POST",
        url: "/get-order",
        data: JSON.stringify(jsonData),
        dataType : "json",
        contentType: "application/json",
        headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		},
        success: function (response) {
        	invoice(response.orderId)

        }
    });


}

function resetButton(){

	$('form').on('reset', function() {
	  	setTimeout(function() {
		    $('.selectpicker').selectpicker('refresh');
	  	});
	});
	$('#form_div1').find('form')[0].reset();
}

$(document).ready( function() {

    var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!

	var yyyy = today.getFullYear();
	if(dd<10){
		dd='0'+dd
	}
	if(mm<10){
		mm='0'+mm
	}
	today = yyyy+'-'+mm+'-'+dd;
	$('#orderdate').attr('value', today);

	var time = new Date().getTime();
	var orderId = time.toString();
	$('#invoiceno').attr('value', orderId);

})

$('#product').on('change', function() {
    var productId = $(this).val()
    var productName = $("#product").find("option:selected").text()

    // var storeId = $("#store").find("option:selected").val()
    let storeId=$('#store').val()


    $.ajax({
        type: "GET",
        url: "/product-add/"+productId+"/"+storeId,
        dataType:"json",
        success: function(response){
            // console.log(response)
            $.each(response.products, function(key, item){

				if(item.isExcludedTax == "true"){
					var tax = (parseFloat(item.mrp)/100) * parseFloat(item.tax);
				}else{
					var tax = 0;
				}

				$('#mrp').val(parseFloat(item.mrp))
				$('#discount1').val(parseFloat(item.discount))
				$('#tax1').val(item.tax)

				$('#availableoffer').val(item.available_offer)
				$('#requiredQuantity').val(item.requiredQuantity)
				$('#freeQuantity').val(item.freeQuantity)
				$('#freeItemName').val(item.freeItemName)
				$('#offerItemId').val(item.offerItemId)
				$('#isExcludedTax').val(tax)

			})

			$('#productQty').val(response.onHand)

        }
    })

})


$('#search_btn').on('click', function(e){
	e.preventDefault();

	var storeId = $('#store').val();
	var keyword = $('#search').val();

	if( $('#search').val() ){
	 	$.ajax({

			type: "GET",
			url: "/product-new-sales-search/"+storeId+'/'+keyword,
			dataType: "json",
			success: function(response){
				if($.isEmptyObject(response.products)){
             		$('#search_btn').notify('No product found!!!', {className: 'error', position: 'bottom right'});
                }else{

                	$('#product').empty();
		            $.each(response.products, function(key, item){
	                 	$('#product').append('<option value="'+ item.id +'">'+ item.productName +'</option>');
		            });

		            $('#product').appendTo('#product').selectpicker('refresh');
		            $("#product").val($('#product option:first').val());
					$("#product").selectpicker('refresh');

                    $.each(response.products, function(key, item){
                        let item_tax=0;
                        if(item.tax!=null){
                            item_tax=item.tax
                        }

                        if(item.isExcludedTax == "true"){
                            tax = (parseFloat(item.mrp)/100) * parseFloat(item_tax);
                        }else{
                            tax = 0;
                        }

                        $('#mrp').val(parseFloat(item.mrp))
                        $('#tax1').val(tax)
                        let discount=0;
                        if(item.discount!=null){
                            discount=item.discount
                        }
                        $('#discount1').val(parseFloat(discount))

                        $('#availableoffer').val(item.available_offer)
                        $('#requiredQuantity').val(item.requiredQuantity)
                        $('#freeQuantity').val(item.freeQuantity)
                        $('#freeItemName').val(item.freeItemName)
                        $('#offerItemId').val(item.offerItemId)
                        $('#isExcludedTax').val(tax)

                        $('#productQty').val(item.totalOnHand)
                    })


				}

			}
		})
	}
})


$(document).on('click', '#pay_btn', function (e){

	$('#PaymentModal').modal('show');

	var grandTotal = parseFloat($('#grandtotal').val())
	var zero = 0

	$('#totalp').text(grandTotal.toFixed(2))
	$('#paidp').text(zero.toFixed(2))
	$('#duep').text(grandTotal.toFixed(2))

})

$("#cashamount").change(function(){

  if( !$('#cashamount').val() ){
		$('#cashamount').val(0)
	}

  var cashAmount = parseFloat($('#cashamount').val())
  var grandTotal = parseFloat($('#grandtotal').val())

  if($('#mobilebankingamount').val() > 0 && $('#bankamount').val() > 0){
  	var totalPaid = parseFloat( $('#mobilebankingamount').val()) + parseFloat($('#bankamount').val()) + cashAmount
  }else if($('#mobilebankingamount').val() > 0){
  	var totalPaid = parseFloat( $('#mobilebankingamount').val()) + cashAmount
  }else if($('#bankamount').val() > 0){
  	var totalPaid = parseFloat( $('#bankamount').val()) + cashAmount
  }else{
  	var totalPaid = cashAmount
  }

  var totalDue = parseFloat(grandTotal) - parseFloat(totalPaid)

	$('#paidp').text(totalPaid.toFixed(2))
	$('#duep').text(totalDue.toFixed(2))

});

$("#mobilebankingamount").change(function(){

	if( !$('#mobilebankingamount').val() ){
		$('#mobilebankingamount').val(0)
	}

	var mobileBankingAmount = parseFloat($('#mobilebankingamount').val())
	var grandTotal = parseFloat($('#grandtotal').val())

	if($('#cashamount').val() > 0 && $('#bankamount').val() > 0){
		var totalPaid = parseFloat( $('#cashamount').val()) + parseFloat($('#bankamount').val()) + mobileBankingAmount
	}else if($('#cashamount').val() > 0){
		var totalPaid = parseFloat( $('#cashamount').val()) + mobileBankingAmount
	}else if($('#bankamount').val() > 0){
		var totalPaid = parseFloat( $('#bankamount').val()) + mobileBankingAmount
	}else{
		var totalPaid = mobileBankingAmount
	}

	var totalDue = parseFloat(grandTotal) - parseFloat(totalPaid)

	$('#paidp').text(totalPaid.toFixed(2))
	$('#duep').text(totalDue.toFixed(2))

})

$("#bankamount").change(function(){

	if( !$('#bankamount').val() ){
		$('#bankamount').val(0)
	}

	var bankAmount = parseFloat($('#bankamount').val())
	var grandTotal = parseFloat($('#grandtotal').val())

	if($('#cashamount').val() > 0 && $('#mobilebankingamount').val() > 0){
		var totalPaid = parseFloat( $('#cashamount').val()) + parseFloat($('#mobilebankingamount').val()) + bankAmount
	}else if($('#cashamount').val() > 0){
		var totalPaid = parseFloat( $('#cashamount').val()) + bankAmount
	}else if($('#mobilebankingamount').val() > 0){
		var totalPaid = parseFloat( $('#mobilebankingamount').val()) + bankAmount
	}else{
		var totalPaid = bankAmount
	}

	var totalDue = parseFloat(grandTotal) - parseFloat(totalPaid)

	$('#paidp').text(totalPaid.toFixed(2))
	$('#duep').text(totalDue.toFixed(2))
})

$(document).on('click', '#pay_btnP', function (e){

	let due = {}

	var d = new Date();
	var date = d.getFullYear() +"-"+ (d.getMonth()+1) +"-"+ d.getDate();

	var time = new Date().getTime();
	var orderId = time.toString();

	var client = $("#clientid option:selected").text();
	var clientName = client.substr(0, client.indexOf(' ('));

	due["card"] 			= $('#bankamount').val();
	due["cash"] 			= $('#cashamount').val();
	due["clientId"] 		= $("#clientid option:selected").val();
	due["due_amount"] 		= parseFloat($('#duep').text());
	due["mobile_bank"] 		= $('#mobilebankingamount').val();
	due["mobile_bank_type"] = $("#mobilebanking").find("option:selected").text()
	due["paid_amount"] 		= $("#paidp").text();


	due["storeId"] 		= $("#store").val();
	due["subscriberId"] = $("#subscriberid").val();
	due["total"] 		= parseFloat($("#totalp").text());
	due["userId"] 		= $("#salesby").val();
	due["depositDate"] 	= date;
	due["orderId"] 		= orderId;

	var dueAmount = parseFloat($('#duep').text());
	var customerId = $("#clientid option:selected").val();
	var grandTotal = parseFloat($('#grandtotal').text())

	if( (dueAmount > 0 && customerId == 'option_select') || (dueAmount > 0 && customerId == '0')){
		$('#pay_btnP').notify("Customer is not eligible for due!", {className: 'error', position: 'bottom left'});
	}else if(grandTotal == 0){
		$.notify("Please Enter at least one product!", "error");
	}else if(dueAmount > 0){
		submitDue(due);
		OrderSubmitToServer();
	}else{
		OrderSubmitToServer();
	}

	e.preventDefault();
})


function submitDue(jsonData){

	$.ajax({
        type: "POST",
        url: "/due-payment",
        data: JSON.stringify(jsonData),
        dataType : "json",
        contentType: "application/json",
        headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		},
        success: function (response) {

        }
    });
}


function invoice(data){

	$('#invoice_table_body').empty()
	var storeName = $("#store").val();
    var OrgName= $("#OrgName").val();

	//var cashier = $("#userid").val();
	var cashier = $("#username").val();
	var posId = $("#pos_id").val();
    var binNumber= $("#binNumber").val();
	var time = new Date().getTime();
	var orderId = data

	var d = new Date();
	var date = d.getDate() +"-"+ (d.getMonth()+1) +"-"+ d.getFullYear()

	var d = new Date(); // for now
	var hours = d.getHours(); // => 9
	var miutes = d.getMinutes(); // =>  30
	var seconds = d.getSeconds(); // => 51
	var iTime = d.getHours()+":"+d.getMinutes()

	var customerId = $("#clientid option:selected").text();


	$('#iStoreName').text(storeName)
    $('#iOrgName').text(OrgName)
	$('#iCashier').text(cashier)
	$('#iPosId').text(posId)
	$('#iInvoice').text(orderId)
    $('#iBin').text(binNumber)
	$('#iDate').text(date+" "+iTime)
	if(customerId.length == 0 || customerId == "option_select"){
		$('#iCustomerId').text('Walkin Customer')
	}else{
		$('#iCustomerId').text(customerId)
	}

	var productTable = $('#product_table');
	var index = 0

	$(productTable).find('> tbody > tr').each(function () {
		var itemDescription = $(this).find("td:eq(0)").text()
		var unitPrice = parseFloat($(this).find("td:eq(1)").text())
		var qty = parseFloat($(this).find("td:eq(2)").text())
		var total = parseFloat($(this).find("td:eq(3)").text())
		index = index + 1
		$('#invoice_table_body').append('\
			<tr>\
				<td>'+index+'</td>\
				<td>'+ itemDescription+'</td>\
				<td>'+ unitPrice.toFixed(2) +'</td>\
				<td>'+ qty.toFixed(2) +'</td>\
				<td>'+ total.toFixed(2) +'</td>\
    		</tr>')


	})

	var subTotal = parseFloat($("#totalX").val());
	var discount = parseFloat($("#discount").val());
    var specialdiscount=parseFloat($("#specialdiscount").val());
    if(isNaN(specialdiscount) || specialdiscount=='' ||specialdiscount==null || specialdiscount.length == 0){
        specialdiscount=0
    }
	var afterDiscount = subTotal - (discount+specialdiscount)
	var vat = parseFloat($("#tax").val());
	var afterVat = afterDiscount + vat
	var rounding = Math.round(afterVat)

    var discountf=discount.toFixed(2);
    var specialdiscountf=specialdiscount.toFixed(2);
    // if(isNaN(specialdiscountf) || specialdiscountf=='' ||specialdiscountf==null || specialdiscountf.length == 0){
    //     specialdiscountf=0
    // }
	$('#iSubTotal').text(subTotal.toFixed(2))
    if(specialdiscountf>=discountf){
        $('#iDiscount').text((specialdiscountf-discountf).toFixed(2))
    }
    else{
        $('#iDiscount').text((discountf-specialdiscountf).toFixed(2))
    }

	$('#iAfterDiscount').text(afterDiscount.toFixed(2))
	$('#iVat').text(vat.toFixed(2))
	$('#iAfterVat').text(afterVat.toFixed(2))
	$('#iRounding').text(rounding.toFixed(2))
	$('#iNetPayable').text(rounding.toFixed(2))



	$('#ReceiptModal').modal('show');
    $.print("#invoice");
    $('#ReceiptModal').on('hidden.bs.modal', function () {
	 location.reload();
	})

}

