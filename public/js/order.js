$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/dashboard-report",
        dataType: "json",
        success: function (response) {

            var zero = parseFloat(0)

            //SALE --------------------------------------------------------
            var todaySale = parseFloat(response.todaySale)
            var monthSale = parseFloat(response.totalMonthSale)
            var totalSale = parseFloat(response.totalSale)


            if (response.todaySale == null) {
                $('#todaySale').text(zero.toFixed(2));
            } else {
                $('#todaySale').text(todaySale.toFixed(2));
            }

            if (response.totalMonthSale == null) {
                $('#monthSale').text(zero.toFixed(2));
            } else {
                $('#monthSale').text(monthSale.toFixed(2));
            }

            if (response.totalSale == null) {
                $('#totalSale').text(zero.toFixed(2));
            } else {
                $('#totalSale').text(totalSale.toFixed(2));
            }
        }
    });

    var t = $('#order_table').DataTable({
    	"processing": true,
        "serverSide": true,
        ajax: {
        	headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
            "url": "/order-list-data",
            "dataSrc": "data",
            "dataType": "json",
         	"type": "POST",
        },
        columns: [
          	{ data: null },

            { data: 'orderId' },

            {
            	data: 'name',
            	render: checkName
            },

            {
                data: 'mobile',
                render: checkMobile
            },

            {
                data: 'orderDate'
            },
            {
                data: 'total',
                render: getTotal
            },

            {
                data: 'totalTax',
                render: getTotalTax
            },
            {
                data: 'totalDiscount',
                render: getTotalDiscount
            },
            {
                data: 'specialDiscount',
                render: getSpecialDiscount
            },

            {
                data: 'grandTotal',
                render: getGrandTotal
            },

            {
                data: 'salesReturn',
                render: getSalesReturn
            },

            {
                data: 'id',
                render: getBtns
            },
        ],
        columnDefs: [
            {
                searchable: true,
                orderable: true,
                targets: 0,
            },
        ],
        order: [[1, 'asc']],
        pageLength : 10,
        lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
    });


    t.on('order.dt search.dt', function () {

	    t.on( 'draw.dt', function () {
	    	var PageInfo = $('#order_table').DataTable().page.info();
	         t.column(0, { page: 'current' }).nodes().each( function (cell, i) {
	            cell.innerHTML = i + 1 + PageInfo.start;
	        } );
	    } );

    }).draw();


});

function checkName(data, type, full, meta) {
    var name = data;
    if (name === null) {
       name = "Walking Customer"
    } else {
        name = name
    }
     return name;
}

function checkMobile(data, type, full, meta) {
    var mobile = data;
    if (mobile === null) {
       mobile = "N/A"
    } else {
        mobile = mobile
    }
     return mobile;
}

function getTotal(data, type, full, meta) {
    var total = parseFloat(data);
    return total.toFixed(2);
}

function getTotalDiscount(data, type, full, meta) {
    var totalDiscount = parseFloat(data);
    return totalDiscount.toFixed(2);
}
function getSpecialDiscount(data, type, full, meta) {
    var specialDiscount = parseFloat(data);
    return specialDiscount.toFixed(2);
}

function getGrandTotal(data, type, full, meta) {
    var grandTotal = parseFloat(data);
    return grandTotal.toFixed(2);
}

function getSalesReturn(data, type, full, meta) {
    // var grandTotal = parseFloat(data);
    var zero=0;
    if (data=='') {
        var salesReturn = zero.toFixed(2);
    }
    else{
        var salesReturn = '<a type="button" class="edit_btn btn btn-info btn-sm" href="/sales-return-details/' + data.return_number + '">' + parseFloat(data.net_return).toFixed(2) +'</a>'
    }
    return salesReturn;
}
function getTotalTax(data, type, full, meta) {
    var totalTax = parseFloat(data);
    return totalTax.toFixed(2);
}


function getBtns(data, type, full, meta) {

    var id = data;
    return '<a type="button" class="edit_btn btn btn-info btn-sm" href="/order-product-list/'+id+'"><i class="fas fa-info-circle"></i> Details</a>';
}
