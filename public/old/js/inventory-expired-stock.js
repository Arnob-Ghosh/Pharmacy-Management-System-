$(document).ready(function () {
    var t = $('#store_stock_report_table').DataTable({
        ajax: {
            "url": "/inventory-expired-stock-data",
            "dataSrc": "data",
        },
        columns: [
          	{ data: null },

            { data: 'productName' },
          	{ data: 'batch_number' },
          	{ "render": function ( data, type, row, meta ){
          			return '<span class="badge badge-danger">'+row.expiry_date+'</span>'
          		}
          	},
          	{ "render": function ( data, type, row, meta ){
          			return '<span class="badge badge-danger">'+row.onHand+'</span>'
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

