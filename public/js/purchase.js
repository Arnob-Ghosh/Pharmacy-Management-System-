// $('#totalpricepurchase').on('click', function (e) {
// 	e.preventDefault();

// 	var total = $("#receivedqty").val() * $("#unitprice").val();

// 	$("#totalpricepurchase").val(total);

// });
$(document).ready(function () {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;
    // console.log(today)
    $('#purchasedate').attr('value', today);

    var time = new Date().getTime();
    var poNumber = time.toString();
    $('#ponumber').attr('value', poNumber);

})

	function productAddToTable() {
		this.event.preventDefault();
        var total = $("#receivedqty").val() * $("#unitprice").val();
		var productId		=	$("#product option:selected").val();
		var productName     =   $('#product').select2('data')[0].productName
		var productCategory     =   $('#product').select2('data')[0].category_name
		var productStrength     =   $('#product').select2('data')[0].strength
	    var quantity  		=   $("#receivedqty").val();
	    var unitPrice       =   $("#unitprice").val();
	    var mrp       		=   $("#mrp").val();
	    // var total			= 	$("#totalpricepurchase").val();

	    if($("#batchnumber option:selected").val() == 'option_select'){
	    	batchNo = 0
	    }else{
	    	batchNo = $("#batchnumber option:selected").text();
	    }

	    var batchName =   $('#purchase_table tr > td:first-child:contains('+productId+')').closest("tr").find("td:eq(4)").text()


		if(productId != 'option_select' && quantity.length != 0 && unitPrice.length != 0 && total.length != 0 && mrp.length != 0){
	    	$('#errorMsg').empty()
		    if($('#purchase_table tr > td:first-child:contains('+productId+')').length == 0 && batchName.length == 0){
					// alert('1')
					$("#purchase_table tbody").append(
						"<tr>" +
						"<td hidden=true >" + productId + "</td>" +
						"<td>" + productName +" ("+productCategory+ "-" +productStrength+ ")</td>" +
						"<td>" + quantity + "</td>" +
						"<td>" + unitPrice + "</td>" +
						"<td>" + mrp + "</td>" +
						"<td>" + batchNo + "</td>" +
                        "<td>" + total.toFixed(2) + "</td>" +
						"<td>" +
						"<button type='button' class='delete-btn btn btn-outline-danger btn-sm'><i class='fas fa-trash'></button>" +
						"</td>" +
						"</tr>");
					resetButton()
			}else if($('#purchase_table tr > td:first-child:contains('+productId+')').length != 0 && batchName.length != 0){
					// alert('2')

					$("#purchase_table tbody").append(
							"<tr>" +
							"<td hidden=true >" + productId + "</td>" +
                            "<td>" + productName +" ("+productCategory+ "-" +productStrength+ ")</td>" +
							"<td>" + quantity + "</td>" +
							"<td>" + unitPrice + "</td>" +
							"<td>" + mrp + "</td>" +
							"<td>" + batchNo + "</td>" +
                            "<td>" + total.toFixed(2) + "</td>" +
							"<td>" +
							"<button type='button' class='delete-btn btn btn-outline-danger btn-sm'><i class='fas fa-trash'></button>" +
							"</td>" +
							"</tr>");
					resetButton()
			}
		}else{
			$('#errorMsg').text('Please fill up the required fields.')
		}
	}


	$("#purchase_table").on('click', '.delete-btn', function () {
	    $(this).closest('tr').remove();
	    subTotal()
	});



	function productListSubmitToServer() {
		this.event.preventDefault();

		let purchaseProducts= {};

		if($("#discount").val().length == 0){
			var discount = 0;
		}else{
			var discount = parseFloat($("#discount").val());
		}

		if($("#othercost").val().length == 0){
			var otherCost = 0;
		}else{
			var otherCost = parseFloat($("#othercost").val());
		}

		var totalPrice = parseFloat($("#totalprice").val())
		var grandTotal = (totalPrice - discount) + otherCost

		purchaseProducts["supplierId"] 		= $("#supplierid").val();
		purchaseProducts["store"] 			= $("#store").val();
		purchaseProducts["poNumber"] 		= parseInt($("#ponumber").val());
		purchaseProducts["totalPrice"] 		= $("#totalprice").val();
		purchaseProducts["discount"] 		= discount
		purchaseProducts["otherCost"] 		= otherCost
		purchaseProducts["grandTotal"] 		= grandTotal
		purchaseProducts["purchaseDate"]	= $("#purchasedate").val();
		purchaseProducts["purchaseNote"] 	= $("#purchasenote").val();

		var T = $('.table');
		var purchaseProductList=[];

	    $(T).find('> tbody > tr').each(function () {
	    	let purchaseProduct= {};
	    	purchaseProduct["productId"]	= $(this).find("td:eq(0)").text();
	    	purchaseProduct["productName"]	= $(this).find("td:eq(1)").text();
	    	purchaseProduct["quantity"]		= $(this).find("td:eq(2)").text();
	    	purchaseProduct["unitPrice"]	= $(this).find("td:eq(3)").text();
	    	purchaseProduct["mrp"]			= $(this).find("td:eq(4)").text();
	    	purchaseProduct["batchNumber"]	= $(this).find("td:eq(5)").text();
	    	purchaseProduct["totalPrice"]	= $(this).find("td:eq(6)").text();
	    	purchaseProductList.push(purchaseProduct);


	    });

	    purchaseProducts["productList"]=purchaseProductList;

	    if(purchaseProductList.length>0){
	    	$('#errorMsg').empty()
	    	$('#errorMsg1').empty()

            // console.log(purchaseProducts)
	    	submitToServer(purchaseProducts);
	    }else{
	    	$('#errorMsg1').text('Please purchase at least one product.')
	    }

	}

$(document).on('change','#mrp', function(){
	let unitprice=parseFloat($('#unitprice').val());
	let mrp=parseFloat($('#mrp').val());
    if(unitprice>mrp){
        $('#mrp').val('')
        $.notify('MRP can not be less than Purchase Cost ')
    }
});

$('#unitprice').change(function () {
	let unitprice=parseFloat($('#unitprice').val());
	let mrp=parseFloat($('#mrp').val());
    if(unitprice>mrp){
        $('#unitprice').val('')
        $.notify('Purchase Cost can not be greater than MRP ')
    }
});

$('#discount').on('change', function () {

    if ($("#discount").val().length == 0) {
        var discount = 0;
    } else {
        var discount = parseFloat($("#discount").val());
    }

    if ($("#othercost").val().length == 0) {
        var otherCost = 0;
    } else {
        var otherCost = parseFloat($("#othercost").val());
    }

    var totalPrice = parseFloat($("#totalprice").val())
    var grandTotal = (totalPrice - discount) + otherCost
    // alert(grandTotal)
    $("#grandtotal").val(grandTotal)
})

$('#othercost').on('change', function () {

    if ($("#discount").val().length == 0) {
        var discount = 0;
    } else {
        var discount = parseFloat($("#discount").val());
    }

    if ($("#othercost").val().length == 0) {
        var otherCost = 0;
    } else {
        var otherCost = parseFloat($("#othercost").val());
    }

    var totalPrice = parseFloat($("#totalprice").val())
    var grandTotal = (totalPrice - discount) + otherCost
    // alert(grandTotal)
    $("#grandtotal").val(grandTotal)
})

	$('#addProduct').on('click', function(){
		subTotal();
        if ($("#discount").val().length == 0) {
            var discount = 0;
        } else {
            var discount = parseFloat($("#discount").val());
        }

        if ($("#othercost").val().length == 0) {
            var otherCost = 0;
        } else {
            var otherCost = parseFloat($("#othercost").val());
        }

        var totalPrice = parseFloat($("#totalprice").val())
        var grandTotal = (totalPrice - discount) + otherCost
        // alert(grandTotal)
        $("#grandtotal").val(grandTotal)
	})



	function subTotal(){
        var rowCount = $('.table tr').length

        var T = $('.table');
        var s = 0;
        $(T).find('> tbody > tr').each(function () {

            var p = parseFloat($(this).find("td:eq(6)").text());

            // console.log(p);
            s = s + p;

            $('#totalprice').val(s.toFixed(2));

        });

        // alert(rowCount)
        if (rowCount == 1) {
            $('#totalprice').val(s.toFixed(2));
        }
	}





	function submitToServer(jsonData) {

	    var supplier = $("#supplierid option:selected").val();
	    var store = $("#store option:selected").val();
	    var poNum = $("#ponumber").val();
	    var total = $("#totalprice").val();
	    var discount = $("#discount").val();
	    var purchaseDate = $("#purchasedate").val();

	    if(supplier != 'option_select' && store != 'option_select' && poNum.length != 0 && total.length != 0 && purchaseDate.length != 0 ){
	    	$('#errorMsg').empty()

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
		        url: "/purchase-create",
		        data: JSON.stringify(jsonData),
		        dataType : "json",
		        headers: {
	                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	            },
		        success: function (response) {
		            $(location).attr('href','/purchase-list');

		        }
		    });

	    }else{

	    	$('#errorMsg1').text('Please fill up the required fields.')


	    }


	}


	function resetButton(){

		$('form').on('reset', function() {
		  	setTimeout(function() {
			    $('.selectpicker').selectpicker('refresh');
		  	});
		});
		$('#form_div1').find('form')[0].reset();
        $('#product').val('').trigger('change')
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
	$('#purchasedate').attr('value', today);

})


