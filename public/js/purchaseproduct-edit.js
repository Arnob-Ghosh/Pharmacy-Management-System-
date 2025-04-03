function fetchProduct(id) {
    // alert(id);

    var other_discount;

    $.ajax({
        type: "GET",
        url: "/purchase-product-edit/" + id,
        // dataType:"json",
        success: function (response) {
           // console.log(response);
            if (response.status == 200) {
                $.each(response.supplier, function (key, item) {
                    $('#edit_supplier').val(item.id).change();
                });

                // if(item.purchaseNote == null){
                // 	purchaseNote = 'N/A'
                // }else{
                // 	purchaseNote = item.purchaseNote
                // }

                $.each(response.purchaseList, function (key, item) {
                    $('#edit_purchasedate').val(item.purchaseDate);
                    $('#edit_store').val(item.store).change();
                    $('#edit_discount').val(item.discount);
                    $('#edit_othercost').val(item.other_cost);
                    $('#edit_subtotalprice').val(item.totalPrice);
                    $('#edit_grandtotalprice').val(item.grandTotal);

                    if (item.purchaseNote == null) {
                        $('#edit_note').val('N/A');
                    } else {
                        $('#edit_note').val(item.purchaseNote);
                    }

                });



                // $('#purchaseid').val(id);

                $('tbody').html("");
                $.each(response.productList, function (key, item) {
                    $('tbody').append('<tr>\
					<td>'+ item.productName + '</td>\
					<td class="w-25"><input type="number" class="form-control w-auto border-left-0 border-right-0 border-top-0 border-bottom-0 editquantity'+ item.id + '" value="' + item.quantity + '" name="editquantity' + item.id + '"></td>\
                    <td class="w-25"><spam id="editunitprice'+ item.id + '" class="editunitprice' + item.id + '" name="editunitprice' + item.id + '">' + item.unitPrice + '</spam></td>\
                    <td><spam id="edittotalprice'+ item.id + '" class="edittotalprice' + item.id + '" name="edittotalprice' + item.id + '">' + item.totalPrice + '</spam></td>\
					<td>\
                    <a href="javascript:void(0)" class="delete_btn btn btn-outline-danger btn-sm" data-value="'+ item.id + '"><i class="fas fa-trash"></i></a>\
        			</td>\
                    <td><input type="hidden" id="totalprice" class="form-control w-50 border-left-0 border-right-0 border-top-0 border-bottom-0 totalprice'+ item.id + '"  value="' + item.totalPrice + '" name="totalprice' + item.id + '"></td>\
		    		</tr>');
                })
                // <td class="w-25"><input type="text" class="form-control w-25 border-left-0 border-right-0 border-top-0 border-bottom-0 editunitprice'+ item.id + '" value="' + item.unitPrice + '" name="editunitprice' + item.id +'"disabled></td>\
                // <td><input type="text" id="edittotalprice" class="form-control w-50 border-left-0 border-right-0 border-top-0 border-bottom-0 edittotalprice'+ item.id +'"  value="'+item.totalPrice+'" name="edittotalprice'+item.id+'" disabled></td>\

                $.each(response.productList, function (key, item) {
                    $('.editquantity' + item.id).on('change', function (e) {
                        e.preventDefault();
                        // console.log(item)
                        var total = $('.editquantity' + item.id).val() * $('.editunitprice' + item.id).text();

                        $('.edittotalprice' + item.id).text(total.toFixed(2));
                        $('.totalprice' + item.id).val(total.toFixed(2));
                        add_btn();
                    })
                });


                // $.each(response.productList, function(key, item) {
                // 	$('.editunitprice'+item.id).on('change', function(e){
                // 		e.preventDefault();

                // 		var total = $('.editquantity'+item.id).val() * $('.editunitprice'+item.id).text();

                // 		$('.edittotalprice'+item.id).text(total);
                // 	})
                // });

                $('#edit_discount').on('change', function (e) {
                    e.preventDefault();

                    if ($("#edit_discount").val().length == 0) {
                        var discount = 0;
                    } else {
                        var discount = parseFloat($("#edit_discount").val());
                    }

                    if ($("#edit_othercost").val().length == 0) {
                        var otherCost = 0;
                    } else {
                        var otherCost = parseFloat($("#edit_othercost").val());
                    }

                    var Price = parseFloat($("#edit_subtotalprice").val());

                    var total = parseFloat(Price) + parseFloat(otherCost) - parseFloat(discount);

                    $('#edit_grandtotalprice').val(total.toFixed(2));
                })
                $('#edit_othercost').on('change', function (e) {
                    e.preventDefault();

                    if ($("#edit_discount").val().length == 0) {
                        var discount = 0;
                    } else {
                        var discount = parseFloat($("#edit_discount").val());
                    }

                    if ($("#edit_othercost").val().length == 0) {
                        var otherCost = 0;
                    } else {
                        var otherCost = parseFloat($("#edit_othercost").val());
                    }

                    var Price = parseFloat($("#edit_subtotalprice").val());

                    var total = parseFloat(Price) + parseFloat(otherCost) - parseFloat(discount);

                    $('#edit_grandtotalprice').val(total.toFixed(2));
                })

            }
        }
    });
}



function add_btn() {
// $('.add_btn').on('click', function () {

    var subtotal = 0;
    $('#productTable').find('> tbody > tr').each(function () {
        subtotal = subtotal + parseFloat($(this).find("td:eq(3)").text());
        // alert($(this).find("td:eq(3)").text())
    });
    $('#edit_subtotalprice').val(subtotal.toFixed(2));

    if ($("#edit_discount").val().length == 0) {
        var discount = 0;
    } else {
        var discount = parseFloat($("#edit_discount").val());
    }

    if ($("#edit_othercost").val().length == 0) {
        var otherCost = 0;
    } else {
        var otherCost = parseFloat($("#edit_othercost").val());
    }

    var Price = parseFloat($("#edit_subtotalprice").val());

    var total = parseFloat(Price) + parseFloat(otherCost) - parseFloat(discount);

    $('#edit_grandtotalprice').val(total.toFixed(2));
// });
}

$("#productTable").on('click', '.delete_btn', function () {
    $(this).closest('tr').remove();

});

$('.cancel_btn').on('click', function () {
    window.history.back();
});



// $(document).on('submit', '#UPDATEProductFORM', function (e) {
$('#submit').on('click', function (e) {
    e.preventDefault();

    $('#edit_subtotalprice').prop("disabled", false);
    $('#edit_grandtotalprice').prop("disabled", false);

    var id = $('#purchaseid').val();
    // alert(id);
    let EditFormData = new FormData($('#UPDATEProductFORM')[0]);

    EditFormData.append('_method', 'PUT');
   // console.log(EditFormData);

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
        url: "/purchase-product-edit/" + id,
        data: EditFormData,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.status == 200) {
                $.notify(response.message, "success");
                $(location).attr('href', '/purchase-product-list/'+id);
            }
        }
    });
});


function subTotal() {
    var rowCount = $('.table tr').length

    var T = $('.table');
    // console.log(rowCount);
    // console.log(T);
    var s = 0;
    $(T).find('> tbody > tr').each(function () {

        var p = parseFloat($(this).find("td:eq(3)").text());

       // console.log(p);
        // alert(p);

        s = s + p;

        $('#edit_totalprice').val(s);

    });

    // alert(rowCount)
    if (rowCount == 1) {
        $('#edit_totalprice').val(s);
    }
}


