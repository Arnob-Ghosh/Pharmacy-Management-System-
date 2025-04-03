$(document).ready(function () {
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});


	//CREATE BRAND
	$(document).on('submit', '#AddBrandForm', function (e) {
		e.preventDefault();

		let formData = new FormData($('#AddBrandForm')[0]);

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
			url: "/brand-create",
			data: formData,
			contentType: false,
			processData: false,
			success: function(response){

				if($.isEmptyObject(response.error)){

             		$(location).attr('href','/brand-list');

                }else{
                	$('body').loadingModal('destroy');
                    printErrorMsg(response.error);
                }
			}
		});

	});

	function printErrorMsg (message) {
            $('#wrongbrandname').empty();
            $('#wrongbrandorigin').empty();

			if(message.brandname == null){
				brandname = ""
			}else{
				brandname = message.brandname[0]
			}

			if(message.brandorigin == null){
				brandorigin = ""
			}else{
				brandorigin = message.brandorigin[0]
			}

            $('#wrongbrandname').append('<span id="">'+brandname+'</span>');
            $('#wrongbrandorigin').append('<span id="">'+brandorigin+'</span>');
    }

});


//EDIT BRAND
$(document).on('click', '.edit_btn', function (e) {
	e.preventDefault();

	var brandId = $(this).val();
	$('#EDITBrandMODAL').modal('show');

		$.ajax({
		type: "GET",
		url: "/brand-edit/"+brandId,
		success: function(response){
			if (response.status == 200) {
				$('#edit_brandname').val(response.brand.brand_name);

				if(response.brand.brand_logo == null){
					brand_logo = 'default.jpg'
				}else{
					brand_logo = response.brand.brand_logo
				}

				$('#edit_brandimage').attr("src", "../uploads/brands/"+brand_logo);
				// $('#edit_brandlogo').val(response.brand.brand_logo);
				$('#edit_brandorigin').val(response.brand.brand_origin).change();
				$('#brandid').val(brandId);
			}
		}
	});
});

//UPDATE BRAND
$(document).on('submit', '#UPDATEBrandFORM', function (e)
{
	e.preventDefault();

	var id = $('#brandid').val();

	let EditFormData = new FormData($('#UPDATEBrandFORM')[0]);

	EditFormData.append('_method', 'PUT');

	$.ajax({
		type: "POST",
		url: "/brand-edit/"+id,
		data: EditFormData,
		contentType: false,
		processData: false,
		success: function(response){

			if($.isEmptyObject(response.error)){
                $('#EDITBrandMODAL').modal('hide');
                $(location).attr('href','/brand-list');
            }else{
                $('#edit_wrongbrandname').empty();
				$('#edit_wrongbrandorigin').empty();

				if(response.error.brandname == null){
					brandname = ""
				}else{
					brandname = response.error.brandname[0]
				}
				if(response.error.brandorigin == null){
					brandorigin = ""
				}else{
					brandorigin = response.error.brandorigin[0]
				}


                $('#edit_wrongbrandname').append('<span id="">'+brandname+'</span>');
                $('#edit_wrongbrandorigin').append('<span id="">'+brandorigin+'</span>');

            }


		}
	});
});


//Delete BRAND
$(document).ready( function () {
	$('#brand_table').on('click', '.delete_btn', function(){

		var brandId = $(this).data("value");

		$('#brandid').val(brandId);
		$('#DELETEBrandFORM').attr('action', '/brand-delete/'+brandId);
		$('#DELETEBrandMODAL').modal('show');

	});
});


function resetButton(){
	$('form').on('reset', function() {
	  	setTimeout(function() {
		    $('.selectpicker').selectpicker('refresh');
	  	});
	});
}

$(document).ready(function () {
    var t = $('#brand_table').DataTable({
        ajax: {
            "url": "/brand-list-data",
            "dataSrc": "brand"
        },
        columns: [
            { data: null },

            { data: 'brand_name' },
            {
            	"render": function ( data, type, row, meta )
		        {

		        	if(row.brand_origin == null){
		        		var brand_origin = "N/A"
		        	}else{
		        		var brand_origin = row.brand_origin
		        	}
			        return brand_origin
		        }
            },
            {
            	"render": function ( data, type, row, meta )
		        {

		        	if(row.brand_logo == null){
		        		var brand_logo = "default.jpg"
		        	}else{
		        		var brand_logo = row.brand_logo
		        	}
			        return '<img src="uploads/brands/'+brand_logo+'" width="50px" height="50px" alt="image" class="rounded-circle">'
		        }
            },

            {
                "render": function ( data, type, row, meta )
		        {
			        return '<button type="button" value="'+row.id+'" class="edit_btn btn btn-secondary btn-sm"><i class="fas fa-edit"></i></button>\
	                     	<a href="javascript:void(0)" class="delete_btn btn btn-outline-danger btn-sm" data-value="'+row.id+'"><i class="fas fa-trash"></i></a>'
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
	    	var PageInfo = $('#brand_table').DataTable().page.info();
	         t.column(0, { page: 'current' }).nodes().each( function (cell, i) {
	            cell.innerHTML = i + 1 + PageInfo.start;
	        } );
	    });

    }).draw();
});

$(document).ready(function () {
    var t = $('#default_brand_table').DataTable({
        ajax: {
            "url": "/default-brand-list-data",
            "dataSrc": "brand"
        },
        columns: [
            { data: null },

            { data: 'brand_name' },
            {
            	"render": function ( data, type, row, meta )
		        {

		        	if(row.brand_origin == null){
		        		var brand_origin = "N/A"
		        	}else{
		        		var brand_origin = row.brand_origin
		        	}
			        return brand_origin
		        }
            },
            {
            	"render": function ( data, type, row, meta )
		        {

		        	if(row.brand_logo == null){
		        		var brand_logo = "default.jpg"
		        	}else{
		        		var brand_logo = row.brand_logo
		        	}
			        return '<img src="uploads/brands/'+brand_logo+'" width="50px" height="50px" alt="image" class="rounded-circle">'
		        }
            },

            // {
            //     "render": function ( data, type, row, meta )
		    //     {
			//         return '<button type="button" value="'+row.id+'" class="edit_btn btn btn-secondary btn-sm"><i class="fas fa-edit"></i></button>\
	        //              	<a href="javascript:void(0)" class="delete_btn btn btn-outline-danger btn-sm" data-value="'+row.id+'"><i class="fas fa-trash"></i></a>'
		    //     }
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
	    	var PageInfo = $('#default_brand_table').DataTable().page.info();
	         t.column(0, { page: 'current' }).nodes().each( function (cell, i) {
	            cell.innerHTML = i + 1 + PageInfo.start;
	        } );
	    });

    }).draw();
});
