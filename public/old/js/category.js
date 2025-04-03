$(document).ready(function () {
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});


	//CREATE CATEGORY
	$(document).on('submit', '#AddCategoryForm', function (e) {
		e.preventDefault();

		let formData = new FormData($('#AddCategoryForm')[0]);

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
			url: "/category-create",
			data: formData,
			contentType: false,
			processData: false,
			success: function(response){

				if($.isEmptyObject(response.error)){

             		$(location).attr('href','/category-list');

                }else{
                	$('body').loadingModal('destroy');
                    printErrorMsg(response.error);
                }
			}
		});

	});

	function printErrorMsg (message) {

            $('#wrongcategoryname').empty();

			if(message.categoryname == null){
				categoryname = ""
			}else{
				categoryname = message.categoryname[0]
			}

            $('#wrongcategoryname').append('<span id="">'+categoryname+'</span>');

    }

});



//EDIT CATEGORY
$(document).on('click', '.edit_btn', function (e) {
	e.preventDefault();

	var categoryId = $(this).val();
	// alert(categoryId);
	$('#EDITCategoryMODAL').modal('show');

		$.ajax({
		type: "GET",
		url: "/category-edit/"+categoryId,
		success: function(response){
			if (response.status == 200) {
				$('#edit_categoryname').val(response.category.category_name);
				$('#categoryid').val(categoryId);
			}
		}
	});
});


//UPDATE CATEGORY
$(document).on('submit', '#UPDATECategoryFORM', function (e)
{
	e.preventDefault();

	var id = $('#categoryid').val();

	let EditFormData = new FormData($('#UPDATECategoryFORM')[0]);

	EditFormData.append('_method', 'PUT');

	$.ajax({
		type: "POST",
		url: "/category-edit/"+id,
		data: EditFormData,
		contentType: false,
		processData: false,
		success: function(response){
			if($.isEmptyObject(response.error)){
                $('#EDITCategoryMODAL').modal('hide');
                $(location).attr('href','/category-list');
            }else{
                $('#edit_wrongcategoryname').empty();

				if(response.error.categoryname == null){
					categoryname = ""
				}else{
					categoryname = response.error.categoryname[0]
				}

                $('#edit_wrongcategoryname').append('<span id="">'+categoryname+'</span>');

            }
		}
	});
});


//DELETE CATEGORY
$(document).ready( function () {
	$('#category_table').on('click', '.delete_btn', function(){

		var categoryId = $(this).data("value");

		$('#categoryid').val(categoryId);

		$('#DELETECategoryFORM').attr('action', '/category-delete/'+categoryId);

		$('#DELETECategoryMODAL').modal('show');

	});
});


$(document).ready(function () {
    var t = $('#category_table').DataTable({
        ajax: {
            "url": "/category-list-data",
            "dataSrc": "category"
        },
        columns: [
            { data: null },

            { data: 'category_name' },
            {
            	"render": function ( data, type, row, meta )
		        {

		        	if(row.category_image == null){
		        		var category_image = "default.jpg"
		        	}else{
		        		var category_image = row.category_image
		        	}
			        return '<td><img src="uploads/categories/'+category_image+'" width="50px" height="50px" alt="image" class=""></td>';
		        }
            },

            {
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
	    	var PageInfo = $('#category_table').DataTable().page.info();
	         t.column(0, { page: 'current' }).nodes().each( function (cell, i) {
	            cell.innerHTML = i + 1 + PageInfo.start;
	        } );
	    });

    }).draw();
});

function getBtns(data, type, row, meta) {

    var id = row.id;
    return '<button type="button" value="'+id+'" class="edit_btn btn btn-secondary btn-sm"><i class="fas fa-edit"></i></button>\
            <a href="javascript:void(0)" class="delete_btn btn btn-outline-danger btn-sm" data-value="'+id+'"><i class="fas fa-trash"></i></a>';
}


$(document).ready(function () {
    var t = $('#default_category_table').DataTable({
        ajax: {
            "url": "/default-category-list-data",
            "dataSrc": "category"
        },
        columns: [
            { data: null },

            { data: 'category_name' },
            {
            	"render": function ( data, type, row, meta )
		        {

		        	if(row.category_image == null){
		        		var category_image = "default.jpg"
		        	}else{
		        		var category_image = row.category_image
		        	}
			        return '<td><img src="uploads/categories/'+category_image+'" width="50px" height="50px" alt="image" class=""></td>';
		        }
            },
            // {
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
	    	var PageInfo = $('#default_category_table').DataTable().page.info();
	         t.column(0, { page: 'current' }).nodes().each( function (cell, i) {
	            cell.innerHTML = i + 1 + PageInfo.start;
	        } );
	    });

    }).draw();
});
