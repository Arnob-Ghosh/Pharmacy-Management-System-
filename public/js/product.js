

// DATA TABLE
$(document).ready(function () {
    var t = $('#product_table').DataTable({
    	"processing": true,
        "serverSide": true,
        ajax: {
        	headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
            "url": "/product-list-data",
            "dataSrc": "data",
            "dataType": "json",
         	"type": "POST",
        },
        columns: [
          	{ data: null },

            {
            	data: 'productName'
            },

            {
                data: 'productLabel'
            },

            {
                data: 'brand'
            },

            {
                data: 'category_name'
            },

            {
                "render": function ( data, type, row, meta ){

                	var strength = row.strength

                	if(strength == null){
                		strength = "N/A"
                	}else{
                		strength = strength
                	}

                	return strength;
                }
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
	    	var PageInfo = $('#product_table').DataTable().page.info();
	         t.column(0, { page: 'current' }).nodes().each( function (cell, i) {
	            cell.innerHTML = i + 1 + PageInfo.start;
	        } );
	    } );

    }).draw();


});

$(document).ready(function () {
    var t = $('#default_product_table').DataTable({
    	"processing": true,
        "serverSide": true,
        ajax: {
        	headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
            "url": "/default-product-list-data",
            "dataSrc": "data",
            "dataType": "json",
         	"type": "POST",
        },
        columns: [
          	{ data: null },

            {
            	data: 'productName'
            },

            {
                data: 'productLabel'
            },

            {
                data: 'brand'
            },

            {
                data: 'category_name'
            },

            {
                "render": function ( data, type, row, meta ){

                	var strength = row.strength

                	if(strength == null){
                		strength = "N/A"
                	}else{
                		strength = strength
                	}

                	return strength;
                }
            },

            // {
            //     data: 'id',
            //     render: getBtns
            // },
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
	    	var PageInfo = $('#default_product_table').DataTable().page.info();
	         t.column(0, { page: 'current' }).nodes().each( function (cell, i) {
	            cell.innerHTML = i + 1 + PageInfo.start;
	        } );
	    } );

    }).draw();


});

function getBtns(data, type, row, meta) {

    var id = row.id;
    return '<a title="Details" type="button" class="details_btn btn btn-info btn-sm" href="/product-details/'+id+'"><i class="fas fa-info-circle"></i></a>\
			<a title="Edit" type="button" class="edit_btn btn btn-secondary btn-sm" href="/product-edit/'+id+'"><i class="fas fa-edit"></i></a>';
}

