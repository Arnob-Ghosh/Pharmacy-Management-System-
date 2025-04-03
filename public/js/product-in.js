$(document).ready(function(){

    $('input[type="checkbox"]').click(function(){
        if ($('#pCheckbox').is(":checked")){
            $('#store').prop("disabled", false);
            $('#form_div').find('form')[0].reset();
            $("#productin_table").find("tr:gt(0)").remove();
            $('#product').val('').trigger('change');
            $('#boxpattern').val('').trigger('change');
        }else{
            $('#store').prop("disabled", true);
            $('#form_div').find('form')[0].reset();
            $("#productin_table").find("tr:gt(0)").remove();
            resetButton();
            $('#product').val('').trigger('change');
            $('#boxpattern').val('').trigger('change');
            // inventoryWiseProducts()

        }
    })

});

function productAddToTable() {

    this.event.preventDefault();

    var store       =   $("#store").find("option:selected").text();
    var storeId     =   $("#store").val()
    var product     =   $('#product').select2('data')[0].productName
    var productCategory     = $('#product').select2('data')[0].category_name
    var productStrength     = $('#product').select2('data')[0].strength
    var productId   =   $("#product").val()
    var quantity    =   $("#qty").val();
    var unitPrice   =   $("#unitprice").val();
    var mrp         =   $("#mrp").val();



    if($("#batchnumber").find("option:selected").text() == "Select Batch"){
        var batch   =   "";
    }else{
        var batch   =   $("#batchnumber").find("option:selected").text();
    }

    var expiryDate  =   $("#expirydate").val();


    if($('#pCheckbox').is(":checked")){
        if(productId != "default" && storeId != "default" && quantity.length != 0 && unitPrice.length != 0 && mrp.length != 0 ){
            $('#errorMsg').empty()
            $('#productin_table_body').append('<tr>\
                <td>'+store+'</td>\
                <td style="display: none;">'+storeId+'</td>\
                <td>'+ product + ' (' + productCategory + ' - ' + productStrength +')</td>\
                <td style="display: none;">'+productId+'</td>\
                <td>'+quantity+'</td>\
                <td>'+batch+'</td>\
                <td>'+expiryDate+'</td>\
                <td>'+unitPrice+'</td>\
                <td>'+mrp+'</td>\
                <td><button class="btn-remove" style="background: transparent;" value=""><i class="fas fa-minus-circle" style="color: red;"></i></button></td>\
            </tr>');
            resetButtonFields()
        }else{
            // $.notify("Invalid selection")
            $('#errorMsg').text('Please fill up the required fields.')
        }
    }else{
        if(productId != "default" && quantity.length != 0 && unitPrice.length != 0 && mrp.length != 0 ){
            $('#errorMsg').empty()
            $('#productin_table_body').append('<tr>\
                <td>Inventory</td>\
                <td style="display: none;">'+storeId+'</td>\
                <td>'+ product + ' (' + productCategory + ' - ' + productStrength +')</td>\
                <td style="display: none;">'+productId+'</td>\
                <td>'+quantity+'</td>\
                <td>'+batch+'</td>\
                <td>'+expiryDate+'</td>\
                <td>'+unitPrice+'</td>\
                <td>'+mrp+'</td>\
                <td><button class="btn-remove" style="background: transparent;" value=""><i class="fas fa-minus-circle" style="color: red;"></i></button></td>\
            </tr>');
            resetButtonFields()
        }else{
            $('#errorMsg').text('Please fill up the required fields.')

        }
    }


}

$("#productin_table").on('click', '.btn-remove', function () {
    $(this).closest('tr').remove();
})

function productInToServer() {
    this.event.preventDefault();

    let products = {};
    let productList = []
    var time = new Date().getTime();
    var productInNum = time.toString();

    if ($('#pCheckbox').is(":checked")){
        if( $('#productin_table tr').length > 1){
            $('#errorMsg').empty()
            var productTable = $('#productin_table');
            $(productTable).find('> tbody > tr').each(function () {
                let product = {}

                product["store"]        = $(this).find("td:eq(0)").text();
                product["storeId"]      = $(this).find("td:eq(1)").text();
                product["product"]      = $(this).find("td:eq(2)").text();
                product["productId"]    = $(this).find("td:eq(3)").text();
                product["quantity"]     = $(this).find("td:eq(4)").text();
                product["batchNumber"]  = $(this).find("td:eq(5)").text();
                product["expiryDate"]   = $(this).find("td:eq(6)").text();
                product["unitPrice"]    = $(this).find("td:eq(7)").text();
                product["mrp"]          = $(this).find("td:eq(8)").text();
                product["productInNum"] = productInNum;


                productList.push(product);

            })

            products["productList"] = productList
            productIn(products)

        }else{
            $('#errorMsg').text("Please Enter at least one product!");
        }
    }else{
        if( $('#productin_table tr').length > 1){

            $('#errorMsg').empty()

           var productTable = $('#productin_table');

            var d = new Date();
            var date = d.getFullYear() +"-"+ (d.getMonth()+1) +"-"+ d.getDate() ;

            $(productTable).find('> tbody > tr').each(function () {
                let product = {}

                product["store"]        = "inventory"
                product["storeId"]      = "null"
                product["product"]      = $(this).find("td:eq(2)").text();
                product["productId"]    = $(this).find("td:eq(3)").text();
                product["quantity"]     = $(this).find("td:eq(4)").text();
                product["batchNumber"]  = $(this).find("td:eq(5)").text();
                product["expiryDate"]   = $(this).find("td:eq(6)").text();
                product["unitPrice"]    = $(this).find("td:eq(7)").text();
                product["mrp"]          = $(this).find("td:eq(8)").text();
                product["productInNum"] = productInNum;
                product["date"]         = date;

                productList.push(product);
            })

            products["productList"] = productList
            productIn(products)

        }else{
            $('#errorMsg').text("Please Enter at least one product!");

        }

    }

}

function productIn(jsonData){


    $.ajax({
        type: "POST",
        url: "/product-in",
        data: JSON.stringify(jsonData),
        dataType : "json",
        contentType: "application/json",
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
        success: function (response) {
        if(response.message == 'Store does not have this product.'){
            $.notify(response.message, {className: 'error', position: 'bottom right'});
        }else{
            $.notify(response.message, {className: 'success', position: 'bottom right'});
            resetButton()
            location.href = "/product-in";
        }



        }
    });

}


function resetButton(){

    $('form').on('reset', function() {
        setTimeout(function() {
            $('.selectpicker').selectpicker('refresh');
        });
    });
    $('#form_div').find('form')[0].reset();
    $("#productin_table").find("tr:gt(0)").remove();
}

function resetButtonFields(){

    $('form').on('reset', function() {
        setTimeout(function() {
            $('.selectpicker').selectpicker('refresh');
        });
    });
    // $('#form_div').find('form')[0].reset();
    $('#boxpattern').val('').trigger('change');
    $('#product').val('').trigger('change')
    $('#batchnumber').val('')
    $('#expirydate').val('')
    $('#unitprice').val('')
    $('#mrp').val('')
    $('#boxpattern').val('')
    $('#boxqty').val('')
    $('#qty').val('')

}

$(document).on('change', '#batchnumber', function (e) {
    e.preventDefault();

    var expiryDate = $('#batchnumber').val()
    $('#expirydate').val(expiryDate)
})

$(document).on('change', '#boxqty', function (e) {
    e.preventDefault();

    var qty = $('#boxpattern').val() * $('#boxqty').val()

    $('#qty').val(qty)
})

$(document).on('change','#mrp', function(){
	let unitprice=parseFloat($('#unitprice').val());
	let mrp=parseFloat($('#mrp').val());
    if(unitprice>mrp){
        $('#mrp').val('')
        $.notify('MRP can not be less than Purchase Cost ')
    }
});

$('#unitprice').change(function (e) {
    e.preventDefault();
	let unitprice=parseFloat($('#unitprice').val());
	let mrp=parseFloat($('#mrp').val());
    if(unitprice>mrp){
        $('#unitprice').val('')
        $.notify('Purchase Cost can not be greater than MRP ')
    }
});

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


function storeWiseProducts(){
    (function() {

    var storeId = $('#store').val();

      $("#product").select2({
        // theme: "classic",
        // width: '350px',
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

    });
}
