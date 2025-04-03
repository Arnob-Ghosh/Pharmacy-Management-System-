function fetchProduct(id){
		$.ajax({
		type: "GET",
		url: "/product-edit/"+id,
		success: function(response){
			if (response.status == 200) {
				if(response.product[0].subcategory == null){
					subcategory = ""
				}else{
					subcategory = response.product[0].subcategory
				}

				$('#edit_productname').val(response.product[0].productName);
				$('#edit_productlabel').val(response.product[0].productLabel);
				$('#edit_productbrand').val(response.product[0].brand);
				$('#edit_categoryid').val(response.product[0].category);
				$('#edit_subcategoryname').val(subcategory);
				$('#edit_sku').val(response.product[0].sku);
				$('#edit_barcode').val(response.product[0].barcode);
				$('#edit_supplier').val(response.product[0].supplier);
				$('#edit_startingstock').val(response.product[0].start_stock);
				$('#edit_safetystock').val(response.product[0].safety_stock);
				$('#edit_unit').val(response.product[0].measuringType);
				$('#edit_productincoming').val(response.product[0].onHand);
				$('#edit_sellingprice').val(response.product[0].mrp);
				$('#edit_purchasecost').val(response.product[0].price);
				$('#edit_purchasedate').val(response.product[0].purchase_date);
				$('#edit_color').val(response.product[0].color);
				$('#edit_size').val(response.product[0].size);
				$('#edit_productdesc').val(response.product[0].desc);
				$('#edit_shelf').val(response.product[0].shelf);
				$('#edit_expirydate').val(response.product[0].expiry_date);
				$('#edit_boxsize').val(response.product[0].box_size).change();
				$('#edit_batchnumber').val(response.product[0].batch_number);
				$('#edit_strength').val(response.product[0].strength);

				if(response.product[0].productImage == null){
					var productImage = "default.jpg"
				}else{
					var productImage = response.product[0].productImage
				}

				$('#edit_image').attr("src", "../uploads/products/"+productImage);
				$('#edit_productimage').val(response.product[0].productImage);
				$('#edit_availablediscount').val(response.product[0].available_discount);
				$('#edit_discounttype').val(response.product[0].discount_type);
				$('#edit_discount').val(response.product[0].discount);
				$('#edit_availableoffer').val(response.product[0].available_offer);
				$('#edit_offeritemid').val(response.product[0].offerItemId);
				$('#edit_freeitemname').val(response.product[0].freeItemName);
				$('#edit_requiredquantity').val(response.product[0].requiredQuantity);
				$('#edit_freequantity').val(response.product[0].freeQuantity);
				$('#edit_taxname').val(response.product[0].taxName);
				$('#edit_tax').val(response.product[0].tax);
				$('#edit_taxexcluded').val(response.product[0].isExcludedTax);
				

			}
		}
	});
}


function productUpdateToServer(){
		this.event.preventDefault();

		productId = $('#productid').val();

		let products = {};

		products["productName"]			= $('#edit_productname').val();
		products["productLabel"]		= $('#edit_productlabel').val();

		products["category"]			= $('#edit_categoryid').val();
		products["category_name"]		= $('#edit_categoryid :selected').text();

		products["subcategory"]			= $('#edit_subcategoryname').val();
		products["subcategory_name"]	= $('#edit_subcategoryname :selected').text();

		products["sku"]					= $('#edit_sku').val();
		products["barcode"]				= $('#edit_barcode').val();
		products["supplier"]			= $('#edit_supplier').val();
		products["start_stock"]			= $('#edit_startingstock').val();
		products["safety_stock"]		= $('#edit_safetystock').val();
		products["color"]				= $('#edit_color').val();
		products["size"]				= $('#edit_size').val();
		products["available_discount"]	= $('#edit_availablediscount').val();
		products["discount"]			= $('#edit_discount').val();
		products["discount_type"]		= $('#edit_discounttype').val();
		products["offerItemId"]			= $('#edit_offeritemid').val();
		products["available_offer"]		= $('#edit_availableoffer').val();
		products["freeItemName"]		= $('#edit_offeritemid :selected').text();
		products["requiredQuantity"]	= $('#edit_requiredquantity').val();
		products["freeQuantity"]		= $('#edit_freequantity').val();
		products["taxName"]				= $('#edit_taxname').val();
		products["isExcludedTax"]		= $('#edit_taxexcluded').val();
		products["tax"]					= $('#edit_tax').val();
		products["desc"]				= $('#edit_productdesc').val();

		var filename = $('input[type=file]').val().split('\\').pop();

		products["productImage"]		= filename
		products["brand"]				= $('#edit_productbrand').val();

		products["onHand"]				= $('#edit_productincoming').val();
		products["productIncoming"]		= $('#edit_productincoming').val();
		products["mrp"]					= $('#edit_sellingprice').val();
		products["measuringType"]		= $('#edit_unit').val();
		products["price"]				= $('#edit_purchasecost').val();
		products["purchase_date"]		= $('#edit_purchasedate').val();

		products["shelf"]				= $('#edit_shelf').val();
		products["expirydate"]			= $('#edit_expirydate').val();
		products["boxsize"]				= $('#edit_boxsize').val();
		products["batchnumber"]			= $('#edit_batchnumber').val();
		products["strength"]			= $('#edit_strength').val();

		var T = $('.Table');
		var storeProducts = [];

		$(T).find('> tbody > tr').each(function (){
			let storeProduct = {};

			if ($(this).find('input[type="checkbox"]').is(':checked')){


				if($(this).find("td:eq(2) input[type='text']").val().length == 0 || $(this).find("td:eq(3) input[type='text']").val().length == 0 ||
				 $(this).find("td:eq(4) input[type='text']").val().length == 0 || $(this).find("td:eq(5) input[type='text']").val().length == 0){
					$.notify("please fill the fileds!")
				}else{
					storeProduct["store_id"]		= $(this).find("td:eq(0) input[type='checkbox']:checked").val();
					storeProduct["onHand"]			= $(this).find("td:eq(2) input[type='text']").val();
					storeProduct["price"]			= $(this).find("td:eq(3) input[type='text']").val();
					storeProduct["start_stock"]		= $(this).find("td:eq(4) input[type='text']").val();
					storeProduct["safety_stock"]	= $(this).find("td:eq(5) input[type='text']").val();

					storeProduct["mrp"]				= $('#edit_sellingprice').val();
					storeProduct["measuringType"]	= $('#edit_unit').val();
					storeProducts.push(storeProduct);   
				}

		    }

		})


		products["storeProducts"] = storeProducts;

	}


$(document).on('submit', '#EditProductForm', function (e){
		e.preventDefault();
		var productId = $('#productid').val();
		let EditFormData = new FormData($('#EditProductForm')[0]);
		EditFormData.append('_method', 'PUT');
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
			url: "/product-edit/"+productId,
			data: EditFormData,
			contentType: false,
			processData: false,
			success: function (response) {
        	if($.isEmptyObject(response.error)){
          		$(location).attr('href','/product-list');

             }else{
             	$('body').loadingModal('destroy');
             	printErrorMsg(response.error);
             }            
            
        }
		});
	});

	function imageUpdate(){

		var productId = $('#productid').val();
		$: FormData = new FormData($('#EditProductForm')[0]);

		$.ajax({
			type: "POST",
			url: "/product-image-update/"+productId,
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

function printErrorMsg (message) {
        $('#edit_wrongproductname').empty();
        $('#edit_wrongproductlabel').empty();
		$('#edit_wrongbrandname').empty();
		$('#edit_wrongcategoryid').empty();
		$('#edit_wrongstartingstock').empty();
		$('#edit_wrongunit').empty();
		$('#edit_wrongproductincoming').empty();
		$('#edit_wrongmrp').empty();
		$('#edit_wrongprice').empty();
		$('#edit_wrongpurchasedate').empty();
		

		if(message.productname == null){
			productname = ""
		}else{
			productname = message.productname[0]
		}

		if(message.productlabel == null){
			productlabel = ""
		}else{
			productlabel = message.productlabel[0]
		}
		
		if(message.productbrand == null){
			productbrand = ""
		}else{
			productbrand = message.productbrand[0]
		}
		
		if(message.categoryid == null){
			categoryid = ""
		}else{
			categoryid = message.categoryid[0]
		}

		if(message.startingstock == null){
			startingstock = ""
		}else{
			startingstock = message.startingstock[0]
		}

		if(message.unit == null){
			unit = ""
		}else{
			unit = message.unit[0]
		}

		if(message.productincoming == null){
			productincoming = ""
		}else{
			productincoming = message.productincoming[0]
		}

		if(message.sellingprice == null){
			sellingprice = ""
		}else{
			sellingprice = message.sellingprice[0]
		}
		if(message.purchasecost == null){
			purchasecost = ""
		}else{
			purchasecost = message.purchasecost[0]
		}
		if(message.purchasedate == null){
			purchasedate = ""
		}else{
			purchasedate = message.purchasedate[0]
		}

        $('#edit_wrongproductname').append('<span id="">'+productname+'</span>');
        $('#edit_wrongproductlabel').append('<span id="">'+productlabel+'</span>');
        $('#edit_wrongbrandname').append('<span id="">'+productbrand+'</span>');
        $('#edit_wrongcategoryid').append('<span id="">'+categoryid+'</span>');
        $('#edit_wrongstartingstock').append('<span id="">'+startingstock+'</span>');
        $('#edit_wrongunit').append('<span id="">'+unit+'</span>');
        $('#edit_wrongproductincoming').append('<span id="">'+productincoming+'</span>');
        $('#edit_wrongmrp').append('<span id="">'+sellingprice+'</span>');
        $('#edit_wrongprice').append('<span id="">'+purchasecost+'</span>');
        $('#edit_wrongpurchasedate').append('<span id="">'+purchasedate+'</span>');
}

function deleteProduct() {

	var productId = $('#productid').val();

		$('#productidDelete').val(productId);

		$('#DELETEProductFORM').attr('action', '/product-delete/'+productId);

		$('#DELETEProductMODAL').modal('show');
}






