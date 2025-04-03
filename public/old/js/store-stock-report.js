$(document).ready(function () {
    var t = $('#store_stock_report_table').DataTable({
    	"processing": true,
        "serverSide": true,
        ajax: {
        	headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
            "url": "/store-stock-report-data-default",
            "dataSrc": "data",
            "dataType": "json",
         	"type": "POST",
        },
        columns: [
          	{ data: null },

            { data: 'productName' },
            { data: 'batch_number' },
          	{ "render": function ( data, type, row, meta ){ 
          			if(row.expiry_date == null){
						var expiry_date = 'N/A'
					}else{
						var expiry_date = row.expiry_date
					}

					return expiry_date

          		} 
          	},
          	{ data: 'brand' },
          	{ "render": function ( data, type, row, meta ){ var mrp = parseFloat(row.mrp); return mrp.toFixed(2);} },
          	{ "render": function ( data, type, row, meta ){ var price = parseFloat(row.price); return price.toFixed(2);} },
          	{ data: 'productIncoming' },
          	{ data: 'productOutgoing' },
          	{ data: 'onHand' },
            { "render": function ( data, type, row, meta ){ 
          			var mrp = parseFloat(row.mrp)
					var price = parseFloat(row.price)
					var onHand = parseFloat(row.onHand)
					var stockSalePrice = mrp * row.onHand
					var stockPurchaseCost = price * row.onHand

					return stockSalePrice.toFixed(2)

          		} 
          	},
          	{ "render": function ( data, type, row, meta ){ 
          			var mrp = parseFloat(row.mrp)
					var price = parseFloat(row.price)
					var onHand = parseFloat(row.onHand)
					var stockSalePrice = mrp * row.onHand
					var stockPurchaseCost = price * row.onHand

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
	$('#store_stock_report_table').DataTable().clear().destroy()

	$(document).ready(function () {
    var t = $('#store_stock_report_table').DataTable({
    	"processing": true,
        "serverSide": true,
        ajax: {
        	headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
            "url": "/store-stock-report-data/"+storeId,
            "dataSrc": "data",
            "dataType": "json",
         	"type": "POST",
        },
        columns: [
          	{ data: null },

            { data: 'productName' },
            { data: 'batch_number' },
          	{ "render": function ( data, type, row, meta ){ 
          			if(row.expiry_date == null){
						var expiry_date = 'N/A'
					}else{
						var expiry_date = row.expiry_date
					}

					return expiry_date

          		} 
          	},
          	{ data: 'brand' },
          	{ "render": function ( data, type, row, meta ){ var mrp = parseFloat(row.mrp); return mrp.toFixed(2);} },
          	{ "render": function ( data, type, row, meta ){ var price = parseFloat(row.price); return price.toFixed(2);} },
          	{ data: 'productIncoming' },
          	{ data: 'productOutgoing' },
          	{ data: 'onHand' },
            { "render": function ( data, type, row, meta ){ 
          			var mrp = parseFloat(row.mrp)
					var price = parseFloat(row.price)
					var onHand = parseFloat(row.onHand)
					var stockSalePrice = mrp * row.onHand
					var stockPurchaseCost = price * row.onHand

					return stockSalePrice.toFixed(2)

          		} 
          	},
          	{ "render": function ( data, type, row, meta ){ 
          			var mrp = parseFloat(row.mrp)
					var price = parseFloat(row.price)
					var onHand = parseFloat(row.onHand)
					var stockSalePrice = mrp * row.onHand
					var stockPurchaseCost = price * row.onHand

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
	    	var PageInfo = $('#store_stock_report_table').DataTable().page.info();
	         t.column(0, { page: 'current' }).nodes().each( function (cell, i) {
	            cell.innerHTML = i + 1 + PageInfo.start;
	        } );
	    } );

    }).draw();


});

})
