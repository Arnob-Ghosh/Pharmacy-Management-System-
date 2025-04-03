$(document).ready(function () {

	$(document).on('submit', '#AddShiftForm', function (e) {
		e.preventDefault();

		let formData = new FormData($('#AddShiftForm')[0]);

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
			url: "/shift-create",
			data: formData,
			contentType: false,
			processData: false,
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			success: function(response){

				if($.isEmptyObject(response.error)){

             		$(location).attr('href','/shift-list');

                }else{
                	$('body').loadingModal('destroy');
                    printErrorMsg(response.error);
                }
			}
		});
	});

	function printErrorMsg (message) {
            $('#wrongshiftname').empty();
            $('#wrongintime').empty();
            $('#wrongouttime').empty();

			if(message.shiftname == null){
				shiftname = ""
			}else{
				shiftname = message.shiftname[0]
			}

			if(message.intime == null){
				intime = ""
			}else{
				intime = message.intime[0]
			}

			if(message.outtime == null){
				outtime = ""
			}else{
				outtime = message.outtime[0]
			}

            $('#wrongshiftname').append('<span id="">'+shiftname+'</span>');
            $('#wrongintime').append('<span id="">'+intime+'</span>');
            $('#wrongouttime').append('<span id="">'+outtime+'</span>');
        // });
    }
});


//SHIFT LIST

$(document).ready(function () {
    var t = $('#shift_table').DataTable({
        ajax: {
            "url": "/shift-list-data",
            "dataSrc": "shift",
        },
        columns: [
            { data: null },
            { data: 'shift_name' },
            { data: 'in_time' },
            { data: 'out_time' },
            { "render": function ( data, type, row, meta ){ 

                    return '<button type="button" value="'+row.id+'" class="allocate_shift_btn btn btn-info btn-sm">Allocate Employee <i class="fas fa-user-clock"></i>\
                    	</button>'
                } 
            },
            { "render": function ( data, type, row, meta ){ 
                    
                    return '<button type="button" value="'+row.id+'" class="edit_btn btn btn-secondary btn-sm" title="Edit"><i class="fas fa-edit"></i></button>\
                        <a href="javascript:void(0)" class="delete_btn btn btn-outline-danger btn-sm" data-value="'+row.id+'" title="Delete"><i class="fas fa-trash"></i></a>'
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
        order: [[1, 'desc']],
        pageLength : 10,
        lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
    });


    t.on('order.dt search.dt', function () {

        t.on( 'draw.dt', function () {
            var PageInfo = $('#shift_table').DataTable().page.info();
             t.column(0, { page: 'current' }).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
            } );
        } );

    }).draw();

});

//EDIT SHIFT
$(document).on('click', '.edit_btn', function (e) {
	e.preventDefault();

	var shiftId = $(this).val();
	// alert(shiftId);
	$('#EDITShiftMODAL').modal('show');
		
		$.ajax({
		type: "GET",
		url: "/shift-edit/"+shiftId,
		success: function(response){
			if (response.status == 200) {
				$('#edit_shiftname').val(response.shift.shift_name);
				$('#edit_intime').val(response.shift.in_time);
				$('#edit_outtime').val(response.shift.out_time);
				$('#shiftid').val(shiftId);
			}
		}
	});
});


//UPDATE SHIFT
$(document).on('submit', '#UPDATEShiftFORM', function (e)
{
	e.preventDefault();

	var id = $('#shiftid').val(); 

	let EditFormData = new FormData($('#UPDATEShiftFORM')[0]);

	EditFormData.append('_method', 'PUT');

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
		url: "/shift-edit/"+id,
		data: EditFormData,
		contentType: false,
		processData: false,
		success: function(response){
			
			if($.isEmptyObject(response.error)){
 
                $('#EDITShiftMODAL').modal('hide');
                $(location).attr('href','/shift-list');
            }else{
            	$('body').loadingModal('destroy');
                $('#edit_wrongshiftname').empty();
				$('#edit_wrongintime').empty();
				$('#edit_wrongouttime').empty();

				if(response.error.shiftname == null){
					shiftname = ""
				}else{
					shiftname = response.error.shiftname[0]
				}

				if(response.error.intime == null){
					intime = ""
				}else{
					intime = response.error.intime[0]
				}

				if(response.error.outtime == null){
					outtime = ""
				}else{
					outtime = response.error.outtime[0]
				}
				

                $('#edit_wrongshiftname').append('<span id="">'+shiftname+'</span>');
                $('#edit_wrongintime').append('<span id="">'+intime+'</span>');
                $('#edit_wrongouttime').append('<span id="">'+outtime+'</span>');
                
            }
		}
	});
});

//Delete SHIFT
$(document).ready( function () {
	$('#shift_table').on('click', '.delete_btn', function(){

		var shiftId = $(this).data("value");

		$('#shiftid').val(shiftId);
		$('#DELETEShiftFORM').attr('action', '/shift-delete/'+shiftId);
		$('#DELETEShiftMODAL').modal('show');

	});
});


//Allocate Employee
$(document).on('click', '.allocate_shift_btn', function (e) {
	e.preventDefault();

	var shiftId = $(this).val();
	$('#ALLOCATEShiftMODAL').modal('show');
		
	$.ajax({
		type: "GET",
		url: "/shift-edit/"+shiftId,
		success: function(response){
			if (response.status == 200) {
				$('#allocateshiftname').val(response.shift.shift_name);
				$('#shiftid').val(shiftId);
			}
		}
	});
});


//SAVE ALLOCATE EMPLOYEE
$(document).on('submit', '#ALLOCATEShiftFORM', function (e)
{
	e.preventDefault();

	var id = $('#shiftid').val(); 

	let EditFormData = new FormData($('#ALLOCATEShiftFORM')[0]);

	EditFormData.append('shiftid', id);

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
		url: "/shift-allocate",
		data: EditFormData,
		contentType: false,
		processData: false,
		success: function(response){
			
			if($.isEmptyObject(response.error)){
                $('#ALLOCATEShiftMODAL').modal('hide');
                $(location).attr('href','/shift-list');
            }else{
            	$('body').loadingModal('destroy');
                $('#wrongemployee').empty();
				$('#wrongallocateshiftname').empty();
				$('#wrongstartdate').empty();
				$('#wrongenddate').empty();

				if(response.error.employee == null){
					employee = ""
				}else{
					employee = response.error.employee[0]
				}

				if(response.error.allocateshiftname == null){
					allocateshiftname = ""
				}else{
					allocateshiftname = response.error.allocateshiftname[0]
				}

				if(response.error.startdate == null){
					startdate = ""
				}else{
					startdate = response.error.startdate[0]
				}

				if(response.error.enddate == null){
					enddate = ""
				}else{
					enddate = response.error.enddate[0]
				}
				

                $('#wrongemployee').append('<span id="">'+employee+'</span>');
                $('#wrongallocateshiftname').append('<span id="">'+allocateshiftname+'</span>');
                $('#wrongstartdate').append('<span id="">'+startdate+'</span>');
                $('#wrongenddate').append('<span id="">'+enddate+'</span>');
                
            }
		}
	});
});
