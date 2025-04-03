$(document).ready(function () {
    var t = $('#stock_report_table').DataTable({
    	"processing": true,
        "serverSide": true,
        ajax: {
        	headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
            "url": "/warehouse-stock-report-data",
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
					var totalOnHand = parseFloat(row.totalOnHand)
					var stockSalePrice = mrp * totalOnHand
					var stockPurchaseCost = price * totalOnHand

					return stockSalePrice.toFixed(2)

          		} 
          	},
          	{ "render": function ( data, type, row, meta ){ 
          			var mrp = parseFloat(row.mrp)
					var price = parseFloat(row.price)
					var totalOnHand = parseFloat(row.totalOnHand)
					var stockSalePrice = mrp * totalOnHand
					var stockPurchaseCost = price * totalOnHand

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
        pageLength : 10,
        lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
    });


    t.on('order.dt search.dt', function () {

	    t.on( 'draw.dt', function () {
	    	var PageInfo = $('#stock_report_table').DataTable().page.info();
	         t.column(0, { page: 'current' }).nodes().each( function (cell, i) {
	            cell.innerHTML = i + 1 + PageInfo.start;
	        } );
	    } );

    }).draw();


});