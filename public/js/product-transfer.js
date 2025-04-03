function productAddToTable() {

    this.event.preventDefault();

    var fromStore       =   $("#fromstore").find("option:selected").text();
    var fromStoreId     =   $("#fromstore").val()
    var toStore         =   $("#tostore").find("option:selected").text();
    var toStoreId       =   $("#tostore").val()
    var product         =   $('#product').select2('data')[0].productName
    var productId       =   $("#product").val()
    var quantity        =   $("#qty").val();
    //console.log(quantity);

    if(fromStoreId != 'fromdefault' && toStoreId != 'todefault' && productId != 'default' && quantity.length != 0){

        if($('#product_transfer_table_body tr > td:first-child:contains('+product+')').length == 0){

	    	if(fromStoreId == toStoreId){
                $('#errorMsg').text('Please select different stores.')


	    	}else{
	    		$('#errorMsg').empty()
                $('#errorMsg1').empty()
                $('#product_transfer_table_body').append('<tr>\
                <td>'+product+'</td>\
                <td style="display: none;">'+productId+'</td>\
                <td>'+fromStore+'</td>\
                <td style="display: none;">'+fromStoreId+'</td>\
                <td>'+toStore+'</td>\
                <td style="display: none;">'+toStoreId+'</td>\
                <td>'+quantity+'</td>\
                <td><button class="btn-remove" style="background: transparent;" value=""><i class="fas fa-minus-circle" style="color: red;"></i></button></td>\
                </tr>');
	    	}

		}else{
			var qty = $('#product_transfer_table_body tr > td:first-child:contains('+product+')').closest("tr").find("td:eq(6)").text()
			var totalProductQty = parseFloat($('#product_transfer_table_body tr > td:first-child:contains('+product+')').closest("tr").find("td:eq(6)").text())
			//alert(totalProductQty)
			var add = parseFloat(qty) + parseFloat(quantity)
			if(add > totalProductQty){

				$('#product_transfer_table_body tr > td:first-child:contains('+product+')').closest("tr").find("td:eq(6)").text(add)
			}else{
                $.notify("Invalid Quantity", "error");
                resetButto()

			}
		}

	}else{

		$('#errorMsg').text('Please fill up the required fields.')
	}
}






$("#product_transfer_table").on('click', '.btn-remove', function () {
    $(this).closest('tr').remove();
})

function productTransferToServer() {
    this.event.preventDefault();

    let products = {};
    let productList = []

    if( $('#product_transfer_table tr').length > 1){
        $('#errorMsg').empty()
        $('#errorMsg1').empty()
        var productTable = $('#product_transfer_table');
        $(productTable).find('> tbody > tr').each(function () {
            let product = {}

            product["product"]      = $(this).find("td:eq(0)").text();
            product["productId"]    = $(this).find("td:eq(1)").text();
            product["fromStore"]    = $(this).find("td:eq(2)").text();
            product["fromStoreId"]  = $(this).find("td:eq(3)").text();
            product["toStore"]      = $(this).find("td:eq(4)").text();
            product["toStoreId"]    = $(this).find("td:eq(5)").text();
            product["quantity"]     = $(this).find("td:eq(6)").text();

            productList.push(product);

        })

        products["productList"] = productList

        productTransfer(products)

    }else{
        $('#errorMsg1').text('Please Enter at least one product.')
    }
}

function productTransfer(jsonData){

    $.ajax({
        type: "POST",
        url: "/product-transfer",
        data: JSON.stringify(jsonData),
        dataType : "json",
        contentType: "application/json",
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (response) {
            $.notify(response.message, {className: 'success', position: 'bottom right'});
            resetButton()
        }
    });

}

function resetButton(){
    $('#errorMsg').empty()
    $('#errorMsg1').empty()
    $('#form_div').find('form')[0].reset();
    $("#product_transfer_table").find("tr:gt(0)").remove();
    $('form').on('reset', function() {
        setTimeout(function() {
            $('.selectpicker').selectpicker('refresh');
        });
    });
}


function resetButto(){
    $('#errorMsg').empty()
    $('#errorMsg1').empty()
    //$('#form_div').find('form')[0].reset();
    //$("#product_transfer_table").find("tr:gt(0)").remove();
    $('form').on('reset', function() {
        setTimeout(function() {
            $('.selectpicker').selectpicker('refresh');
        });
    });
}
function storeWiseProducts(){
    (function() {

    var storeId = $('#fromstore').val();
      $("#product").select2({
        allowClear: true,
        ajax: {
            url: '/storewise-product-data/'+storeId,
            dataType: 'json',
            delay: 250,
            data: function(params) {
                return {
                    term: params.term || '',
                    page: params.page || 1
                }
            },
            cache: true
        },
        placeholder: 'Search product',
        minimumInputLength: 1,
        templateResult: formatProduct,
        templateSelection: formatProductSelection
        });


        function formatProduct(product) {
            if (product.loading) {
                return product.text;
            }

            var $container = $(
                "<div class='select2-result-product clearfix'>" +
                "<div class='select2-result-product__productName'></div>" +
                "</div>" +
                "</div>" +
                "</div>"
            );

            $container.find(".select2-result-product__productName").text(product.productName);

            return $container;
        }

        function formatProductSelection(product) {
            return product.productName;
        }

    })();
}
function inventoryWiseProducts(){
    (function() {

      $("#product").select2({
        allowClear: true,
        ajax: {
            url: '/get-product-data',
            dataType: 'json',
            delay: 250,
            data: function(params) {
                return {
                    term: params.term || '',
                    page: params.page || 1
                }
            },
            cache: true
        },
        placeholder: 'Search product',
        minimumInputLength: 1,
        templateResult: formatProduct,
        templateSelection: formatProductSelection
        });


        function formatProduct(product) {
            if (product.loading) {
                return product.text;
            }

            var $container = $(
                "<div class='select2-result-product clearfix'>" +
                "<div class='select2-result-product__productName'></div>" +
                "</div>" +
                "</div>" +
                "</div>"
            );

            $container.find(".select2-result-product__productName").text(product.productName);

            return $container;
        }

        function formatProductSelection(product) {
            return product.productName;
        }

    })();
}
