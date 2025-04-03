$(document).ready(function () {
    $.ajax({
        type: "get",
        url: "/store-stock-price/"+0,
        dataSrc: "data",
        dataType: "json",
        success: function(response){
            // console.log(response);
            $("#totalSale").text((parseFloat(response.totalSellingPrice)).toFixed(2));
            $("#totalPurchase").text((parseFloat(response.totalPurchasePrice)).toFixed(2));
        }
    });
    var t = $('#store_stock_report_table').DataTable({
    	"processing": true,
        "serverSide": true,
        ajax: {
        	headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
            "url": "/store-stock-data-default",
            "dataSrc": "data",
            "dataType": "json",
         	"type": "POST",
        },
        columns: [
          	{ data: null },

            { data: 'productName' },
          	{ data: 'brand' },
          	{ "render": function ( data, type, row, meta ){ var mrp = parseFloat(row.mrp); return mrp.toFixed(2);} },
          	{ "render": function ( data, type, row, meta ){ var price = parseFloat(row.price); return price.toFixed(2);} },
          	{ data: 'totalProductIncoming' },
          	{ data: 'totalProductOutgoing' },
          	{ data: 'totalOnHand' },
            { "render": function ( data, type, row, meta ){
          			var mrp = parseFloat(row.mrp)
					var price = parseFloat(row.price)
					var onHand = parseFloat(row.totalOnHand)
					var stockSalePrice = mrp * row.totalOnHand
					var stockPurchaseCost = price * row.totalOnHand
					return stockSalePrice.toFixed(2)

          		}
          	},
          	{ "render": function ( data, type, row, meta ){
          			var mrp = parseFloat(row.mrp)
					var price = parseFloat(row.price)
					var onHand = parseFloat(row.totalOnHand)
					var stockSalePrice = mrp * row.totalOnHand
					var stockPurchaseCost = price * row.totalOnHand

					return stockPurchaseCost.toFixed(2)

          		}
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
        pageLength : 20,
        lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
    });


    t.on('order.dt search.dt', function () {

	    t.on( 'draw.dt', function () {
	    	var PageInfo = $('#store_stock_report_table').DataTable().page.info();
	         t.column(0, { page: 'current' }).nodes().each( function (cell, i) {
	            cell.innerHTML = i + 1 + PageInfo.start;
	        } );
	    } );

    }).draw();


});


$('#store').on('change', function() {
	var storeId = $(this).val()
	var storeName = $("#store").find("option:selected").text()
    $("#sellingStore").text(storeName);
    $("#purchaseStore").text(storeName);
    $("#totalSale").text('0.00');
    $("#totalPurchase").text('0.00');
	$('#store_stock_report_table').DataTable().clear().destroy()

	$(document).ready(function () {
        $.ajax({
            type: "get",
            url: "/store-stock-price/"+storeId,
            dataSrc: "data",
            dataType: "json",
            success: function(response){
                // console.log(response);
                $("#totalSale").text((parseFloat(response.totalSellingPrice)).toFixed(2));
                $("#totalPurchase").text((parseFloat(response.totalPurchasePrice)).toFixed(2));
            }
        });
	    var t = $('#store_stock_report_table').DataTable({
	    	"processing": true,
	        "serverSide": true,
	        ajax: {
	        	headers: {
					'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				},
	            "url": "/store-stock-data/"+storeId,
	            "dataSrc": "data",
	            "dataType": "json",
	         	"type": "POST",
	        },
	        columns: [
	          	{ data: null },

	            { data: 'productName' },
	          	{ data: 'brand' },
	          	{ "render": function ( data, type, row, meta ){ var mrp = parseFloat(row.mrp); return mrp.toFixed(2);} },
	          	{ "render": function ( data, type, row, meta ){ var price = parseFloat(row.price); return price.toFixed(2);} },
	          	{ data: 'totalProductIncoming' },
	          	{ data: 'totalProductOutgoing' },
	          	{ data: 'totalOnHand' },
	            { "render": function ( data, type, row, meta ){
	          			var mrp = parseFloat(row.mrp)
						var price = parseFloat(row.price)
						var onHand = parseFloat(row.totalOnHand)
						var stockSalePrice = mrp * row.totalOnHand
						var stockPurchaseCost = price * row.totalOnHand
						return stockSalePrice.toFixed(2)

	          		}
	          	},
	          	{ "render": function ( data, type, row, meta ){
	          			var mrp = parseFloat(row.mrp)
						var price = parseFloat(row.price)
						var onHand = parseFloat(row.totalOnHand)
						var stockSalePrice = mrp * row.totalOnHand
						var stockPurchaseCost = price * row.totalOnHand

						return stockPurchaseCost.toFixed(2)

	          		}
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
	        pageLength : 20,
	        lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
	    });


	    t.on('order.dt search.dt', function () {

		    t.on( 'draw.dt', function () {
		    	var PageInfo = $('#store_stock_report_table').DataTable().page.info();
		         t.column(0, { page: 'current' }).nodes().each( function (cell, i) {
		            cell.innerHTML = i + 1 + PageInfo.start;
		        } );
		    } );

	    }).draw();


	});

})
