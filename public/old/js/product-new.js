
	function productSubmitToServer(){
		this.event.preventDefault();


		let products = {};

		products["productName"]			= $('#productname').val();
		products["productLabel"]		= $('#productlabel').val();

		products["category"]			= $('#categoryid').val();
		products["category_name"]		= $('#categoryid :selected').text()

		products["subcategory"]			= $('#subcategoryname').val();
		products["subcategory_name"]	= $('#subcategoryname :selected').text();

		products["sku"]					= $('#productsku').val();
		products["barcode"]				= $('#productbarcode').val();
		products["supplier"]			= $('#suppliername').val();
		products["start_stock"]			= $('#startingstock').val();
		products["safety_stock"]		= $('#safetystock').val();
		products["color"]				= $('#color').val();
		products["size"]				= $('#size').val();
		products["available_discount"]	= $('#availablediscount').val();
		products["discount"]			= $('#discount').val();
		products["discount_type"]		= $('#discounttype').val();
		products["offerItemId"]			= $('#offeritemid').val();
		products["available_offer"]		= $('#availableoffer').val();
		products["freeItemName"]		= $('#offeritemid :selected').text()
		products["requiredQuantity"]	= $('#requiredquantity').val();
		products["freeQuantity"]		= $('#freequantity').val();
		products["taxName"]				= $('#taxname').val();
		products["isExcludedTax"]		= $('#taxexcluded').val();
		products["tax"]					= $('#tax').val();
		products["desc"]				= $('#productdesc').val();



		products["strength"]			= $('#strength').val();
		products["brand"]				= $('#brandname').val();

		products["onHand"]				= $('#productincoming').val();
		products["productIncoming"]		= $('#productincoming').val();
		products["mrp"]					= $('#mrp').val();
		products["measuringType"]		= $('#unit').val();
		products["price"]				= $('#price').val();
		products["purchase_date"]		= $('#purchasedate').val();

		products["shelf"]				= $('#shelf').val();
		products["batchNumber"]			= $('#batchnumber :selected').text()
		products["expiryDate"]			= $('#expirydate').val();
		products["boxSize"]				= $('#boxsize').val();



		var T = $('#storeTable');
		var storeProducts = [];
		var checkFields = 1
		$(T).find('> tbody > tr').each(function (){
			let storeProduct = {};

			if ($(this).find('input[type="checkbox"]').is(':checked')){

				if($(this).find("td:eq(2) input[type='number']").val().length == 0 || $(this).find("td:eq(3) input[type='number']").val().length == 0 ||
				  $(this).find("td:eq(4) input[type='number']").val().length == 0){
					checkFields = 0

				}else{
					storeProduct["store_id"]		= $(this).find("td:eq(0) input[type='checkbox']:checked").val();
					storeProduct["onHand"]			= $(this).find("td:eq(2) input[type='number']").val();
					storeProduct["price"]			= $(this).find("td:eq(3) input[type='number']").val();
					storeProduct["safety_stock"]	= $(this).find("td:eq(4) input[type='number']").val();

					storeProduct["mrp"]				= $('#mrp').val();
					storeProduct["measuringType"]	= $('#unit').val();
					storeProducts.push(storeProduct);

					checkFields = 1
				}

		    }

		})


		products["storeProducts"] = storeProducts;

		var incomingQty = parseInt($('#productincoming').val())
		var totalStoreQty = 0
		$(T).find('> tbody > tr').each(function (){
			if ($(this).find('input[type="checkbox"]').is(':checked')){

				if($(this).find("td:eq(2) input[type='number']").val().length != 0){
					var storeQty = $(this).find("td:eq(2) input[type='number']").val();
					totalStoreQty = parseInt(totalStoreQty) + parseInt(storeQty)
				}else{

					totalStoreQty = incomingQty+1;
				}
			}
		})

		if(totalStoreQty > incomingQty){
			$.notify('Please adjust store quantity with total incoming product quantity.')
		}else if(checkFields == 0){
			$.notify('Please fill all the fields in store section.')
		}else{
			// alert('success')
    		submitToServer(products);

		}


	}



	function submitToServer(jsonData) {


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
	        url: "/product-create",
	        data: JSON.stringify(jsonData),
	        dataType : "json",
	        headers: {
	            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	        },
	        success: function (response) {;

	            if($.isEmptyObject(response.error)){
                    $.notify(response.message, 'success');
                    $(location).attr('href','/product-list');

                }else{
                	$('body').loadingModal('destroy');
                    printErrorMsg(response.error);
                }

	        }
	    });


	}

	function printErrorMsg (message) {

            $('#wrongproductname').empty();
            $('#wrongproductlabel').empty();
			$('#wrongbrandname').empty();
			$('#wrongcategoryid').empty();
            $('#wrongsafetystock').empty();
			$('#wrongunit').empty();
			$('#wrongproductincoming').empty();
			$('#wrongmrp').empty();
			$('#wrongprice').empty();
			$('#wrongpurchasedate').empty();


			if(message.productName == null){
				productName = ""
			}else{
				productName = message.productName[0]
			}

			if(message.productLabel == null){
				productLabel = ""
			}else{
				productLabel = message.productLabel[0]
			}

			if(message.brand == null){
				brand = ""
			}else{
				brand = message.brand[0]
			}

			if(message.category == null){
				category = ""
			}else{
				category = message.category[0]
			}

            if (message.safety_stock == null){
                safetystock = ""
			}else{
                safetystock = message.safety_stock[0]
			}

			if(message.measuringType == null){
				measuringType = ""
			}else{
				measuringType = message.measuringType[0]
			}

			if(message.productIncoming == null){
				productIncoming = ""
			}else{
				productIncoming = message.productIncoming[0]
			}

			if(message.mrp == null){
				mrp = ""
			}else{
				mrp = message.mrp[0]
			}
			if(message.price == null){
				price = ""
			}else{
				price = message.price[0]
			}
			if(message.purchase_date == null){
				purchase_date = ""
			}else{
				purchase_date = message.purchase_date[0]
			}

            $('#wrongproductname').append('<span id="">'+productName+'</span>');
            $('#wrongproductlabel').append('<span id="">'+productLabel+'</span>');
            $('#wrongbrandname').append('<span id="">'+brand+'</span>');
            $('#wrongcategoryid').append('<span id="">'+category+'</span>');
            $('#wrongsafetystock').append('<span id="">' + safetystock +'</span>');
            $('#wrongunit').append('<span id="">'+measuringType+'</span>');
            $('#wrongproductincoming').append('<span id="">'+productIncoming+'</span>');
            $('#wrongmrp').append('<span id="">'+mrp+'</span>');
            $('#wrongprice').append('<span id="">'+price+'</span>');
            $('#wrongpurchasedate').append('<span id="">'+purchase_date+'</span>');
        // });
    }

function resetButton(){
	$('form').on('reset', function() {
	  	setTimeout(function() {
		    $('.selectpicker').selectpicker('refresh');
	  	});
	});

	$('#form_div').find('form')[0].reset();
	$('select[name="subcategoryname"]').empty();
	$('select[name="subcategoryname"]').append('\
		<option value="default" selected>Select subcategory</option>');
}

$(document).on('change', '#batchnumber', function (e) {
	e.preventDefault();

	var expiryDate = $('#batchnumber').val()
	$('#expirydate').val(expiryDate)
})

$(document).on('change', '#boxsize', function (e) {
	e.preventDefault();

    if ($('#startingstock').val().length != 0 && $('#boxsize').val().length != 0){
		var boxSizeXstartStock = $('#boxsize').val() * $('#startingstock').val()
		$('#productincoming').val(boxSizeXstartStock)
	}else{
		$('#productincoming').val('')
	}
})
$('input[name= startingstock]').change(function () {
    var startStock = $(this).val()
    if ($('#startingstock').val().length != 0 && $('#boxsize').val().length != 0) {
        var boxSizeXstartStock = $('#boxsize').val() * startStock
        $('#productincoming').val(boxSizeXstartStock)
    } else {
        $('#productincoming').val('')
    }
});

$(document).on('change','#mrp', function(){
	let price=parseFloat($('#price').val());
	let mrp=parseFloat($('#mrp').val());
    if(price>mrp){
        $('#mrp').val('')
        $.notify('MRP can not be less than Purchase Cost ')
    }
});

$('#price').change(function (e) {
    e.preventDefault();
	let price=parseFloat($('#price').val());
	let mrp=parseFloat($('#mrp').val());
    if(price>mrp){
        $('#price').val('')
        $.notify('Purchase Cost can not be greater than MRP ')
    }
});
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
	$('#purchasedate').attr('value', today);

})


function imageStore(){

		$: FormData = new FormData($('#AddProductForm')[0]);

		$.ajax({
			type: "POST",
			url: "/product-image-create",
			data: FormData,
			contentType: false,
			processData: false,
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			success: function(response){
				if(response.status == 200){

				}
			}
		});
}


	var T = $('#storeTable');

	$(T).find('> tbody > tr').each(function (){

		$(this).find('input[type="checkbox"]').change(function(){
			var price = $('#price').val()
			if ($(this).is(':checked')){
				$(this).closest('tr').find("td:eq(3) input[type='number']").val(price);
			}else{
				$(this).closest('tr').find("td:eq(3) input[type='number']").val('');
			}
		})

	})




