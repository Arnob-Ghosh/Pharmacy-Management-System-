$(document).ready(function () {
	//CREATE BATCH
	$(document).on('submit', '#AddBatchForm', function (e) {
		e.preventDefault();

		let formData = new FormData($('#AddBatchForm')[0]);

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
			url: "/batch-create",
			data: formData,
			contentType: false,
			processData: false,
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			success: function(response){
				if($.isEmptyObject(response.error)){
                    
             		$(location).attr('href','/batch-list');

                }else{
                	$('body').loadingModal('destroy');
                    printErrorMsg(response.error);
                }
			}
		});
	});

	function printErrorMsg (message) {
            $('#wrongbatchnumber').empty();
            $('#wrongexpirydate').empty();

			if(message.batchnumber == null){
				batchnumber = ""
			}else{
				batchnumber = message.batchnumber[0]
			}
			if(message.expirydate == null){
				expirydate = ""
			}else{
				expirydate = message.expirydate[0]
			}

            $('#wrongbatchnumber').append('<span id="">'+batchnumber+'</span>');
            $('#wrongexpirydate').append('<span id="">'+expirydate+'</span>');
        // });
    }
});


$(document).ready(function () {
    var t = $('#batch_table').DataTable({
        ajax: {
            "url": "/batch-list-data",
            "dataSrc": "batch"
        },
        columns: [
            { data: null },
            { data: 'batch_number' },
            { data: 'expiry_date' },
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
	    	var PageInfo = $('#batch_table').DataTable().page.info();
	         t.column(0, { page: 'current' }).nodes().each( function (cell, i) {
	            cell.innerHTML = i + 1 + PageInfo.start;
	        } );
	    });

    }).draw();
});


//EDIT BATCH
$(document).on('click', '.edit_btn', function (e) {
	e.preventDefault();

	var batchId = $(this).val();
	// alert(batchId);
	$('#EDITBatchMODAL').modal('show');
		
		$.ajax({
		type: "GET",
		url: "/batch-edit/"+batchId,
		success: function(response){
			if (response.status == 200) {
				$('#edit_batchnumber').val(response.batch.batch_number);
				$('#edit_expirydate').val(response.batch.expiry_date);
				$('#batchid').val(batchId);
			}
		}
	});
});

//UPDATE BATCH
$(document).on('submit', '#UPDATEBatchFORM', function (e)
{
	e.preventDefault();

	var id = $('#batchid').val(); 

	let EditFormData = new FormData($('#UPDATEBatchFORM')[0]);

	EditFormData.append('_method', 'PUT');

	$.ajax({
		type: "POST",
		url: "/batch-edit/"+id,
		data: EditFormData,
		contentType: false,
		processData: false,
		success: function(response){
			
			if($.isEmptyObject(response.error)){
                $('#EDITBatchMODAL').modal('hide');
                $(location).attr('href','/batch-list');
            }else{

                $('#edit_wrongbatchnumber').empty();
				$('#edit_wrongexpirydate').empty();

				if(response.error.batchnumber == null){
					batchnumber = ""
				}else{
					batchnumber = response.error.batchnumber[0]
				}
				if(response.error.expirydate == null){
					expirydate = ""
				}else{
					expirydate = response.error.expirydate[0]
				}
				

                $('#edit_wrongbatchnumber').append('<span id="">'+batchnumber+'</span>');
                $('#edit_wrongexpirydate').append('<span id="">'+expirydate+'</span>');
                
            }
		}
	});
});

//Delete BATCH
$(document).ready( function () {
	$('#batch_table').on('click', '.delete_btn', function(){

		var batchId = $(this).data("value");

		$('#batchid').val(batchId);
		$('#DELETEBatchFORM').attr('action', '/batch-delete/'+batchId);
		$('#DELETEBatchMODAL').modal('show');

	});
});
