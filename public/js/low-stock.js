$(document).ready(function () {
    var t = $('#store_stock_report_table').DataTable({
        ajax: {
            "url": "/low-stock-data",
            "dataSrc": "data",
        },
        columns: [
          	{ data: null },

            { data: 'productName' },
          	{ data: 'batch_number' },
          	{ data: 'brand' },
          	{ data: 'productLabel' },
          	{ "render": function ( data, type, row, meta ){
          			return '<span class="badge badge-success">'+row.safety_stock+'</span>'
          		}
          	},
          	{ "render": function ( data, type, row, meta ){
          			return '<span class="badge badge-danger">'+row.onHand+'</span>'
          		}
          	},
          	{ data: 'store_name' },

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

	$.ajax({
		type: "GET",
		url: "/low-stock-report-data/"+storeId,
		dataType:"json",
		success: function(response){
			onChangeDataTable(response.data)

			
		}	
	})
	
})

function onChangeDataTable(json){
	$('#store_stock_report_table').DataTable().clear().destroy()
	$(document).ready(function () {
	    var t = $('#store_stock_report_table').DataTable({
	        data : json,
	        columns: [
	          	{ data: null },

	            { data: 'productName' },
	          	{ data: 'batch_number' },
	          	{ data: 'brand' },
	          	{ data: 'productLabel' },
	          	{ "render": function ( data, type, row, meta ){
	          			return '<span class="badge badge-success">'+row.safety_stock+'</span>'
	          		}
	          	},
	          	{ "render": function ( data, type, row, meta ){
	          			return '<span class="badge badge-danger">'+row.onHand+'</span>'
	          		}
	          	},
	          	{ data: 'store_name' },

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
}