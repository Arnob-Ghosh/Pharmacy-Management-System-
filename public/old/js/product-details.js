$(document).ready(function () {

	var productId = $('#productid').val();

	$.ajax({
		type: "GET",
		url: "/product-details-data/"+productId,
		success: function(response){

			if(response.data.sku == null){
				sku = "N/A"
			}else{
				sku = response.data.sku
			}

			if(response.data.barcode == null){
				barcode = "N/A"
			}else{
				barcode = response.data.barcode
			}
			if(response.data.unit == null){
								unit = "N/A"
							}else{
								unit = response.data.unit
							}
			if(response.data.supplier == null){
				supplier = "N/A"
			}else{
				supplier = response.data.supplier
			}

			if(response.data.batch_number == null){
				batch_number = "N/A"
			}else{
				batch_number = response.data.batch_number
			}
			if(response.data.expiry_date == null){
				expiry_date = "N/A"
			}else{
				expiry_date = response.data.expiry_date
			}
			if(response.data.size == null){
				size = "N/A"
			}else{
				size = response.data.size
			}
			if(response.data.strength == null){
				strength = "N/A"
			}else{
				strength = response.data.strength
			}
			if(response.data.productImage == null){
				productImage = "default.jpg"
			}else{
				productImage = response.data.productImage
			}

			$('#productimage').attr("src", "../uploads/products/"+productImage);
			$('#productname').text(response.data.productName)
			$('#genericname').text(response.data.productLabel)
			$('#brandname').text(response.data.brand)
			$('#category').text(response.data.category_name)
			$('#sku').text(sku)
			$('#barcode').text(barcode)
			$('#supplier').text(supplier)
			$('#batch').text(batch_number)
			$('#expirydate').text(expiry_date)
			//$('#unit').text(size)
			$('#unit').text(unit)
			$('#strength').text(strength)

		}
	});
})