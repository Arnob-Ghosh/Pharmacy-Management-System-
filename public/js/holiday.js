$(document).ready(function () {

	$(document).on('submit', '#AddHolidayForm', function (e) {
		e.preventDefault();

		let formData = new FormData($('#AddHolidayForm')[0]);

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
			url: "/holiday-create",
			data: formData,
			contentType: false,
			processData: false,
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			success: function(response){
				if($.isEmptyObject(response.error)){

             		$(location).attr('href','/holiday-list');

                }else{
                	$('body').loadingModal('destroy');
                    printErrorMsg(response.error);
                }
			}
		});
	});

	function printErrorMsg (message) {
        
            $('#wrongholidayname').empty();
            $('#wrongstartdate').empty();
            $('#wrongenddate').empty();

			if(message.holidayname == null){
				holidayname = ""
			}else{
				holidayname = message.holidayname[0]
			}

			if(message.startdate == null){
				startdate = ""
			}else{
				startdate = message.startdate[0]
			}

			if(message.enddate == null){
				enddate = ""
			}else{
				enddate = message.enddate[0]
			}

            $('#wrongholidayname').append('<span id="">'+holidayname+'</span>');
            $('#wrongstartdate').append('<span id="">'+startdate+'</span>');
            $('#wrongenddate').append('<span id="">'+enddate+'</span>');

    }
});

//HOLIDAY LIST

$(document).ready(function () {
    var t = $('#holiday_table').DataTable({
        ajax: {
            "url": "/holiday-list-data",
            "dataSrc": "holiday",
        },
        columns: [
            { data: null },
            { data: 'holiday_name' },
            { data: 'start_date' },
            { data: 'end_date' },
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
            var PageInfo = $('#holiday_table').DataTable().page.info();
             t.column(0, { page: 'current' }).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
            } );
        } );

    }).draw();

});

//EDIT HOLIDAY
$(document).on('click', '.edit_btn', function (e) {
	e.preventDefault();

	var holidayId = $(this).val();
	$('#EDITHolidayMODAL').modal('show');
		
		$.ajax({
		type: "GET",
		url: "/holiday-edit/"+holidayId,
		success: function(response){
			if (response.status == 200) {
				$('#edit_holidayname').val(response.holiday.holiday_name);
				$('#edit_startdate').val(response.holiday.start_date);
				$('#edit_enddate').val(response.holiday.end_date);
				$('#holidayid').val(holidayId);
			}
		}
	});
});

//UPDATE HOLIDAY
$(document).on('submit', '#UPDATEHolidayFORM', function (e)
{
	e.preventDefault();

	var id = $('#holidayid').val(); 

	let EditFormData = new FormData($('#UPDATEHolidayFORM')[0]);

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
		url: "/holiday-edit/"+id,
		data: EditFormData,
		contentType: false,
		processData: false,
		success: function(response){
			
			if($.isEmptyObject(response.error)){
                $('#EDITHolidayMODAL').modal('hide');
                $(location).attr('href','/holiday-list');
            }else{
            	$('body').loadingModal('destroy');
                $('#edit_wrongholidayname').empty();
				$('#edit_wrongstartdate').empty();
				$('#edit_wrongenddate').empty();

				if(response.error.holidayname == null){
					holidayname = ""
				}else{
					holidayname = response.error.holidayname[0]
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
				

                $('#edit_wrongholidayname').append('<span id="">'+holidayname+'</span>');
                $('#edit_wrongstartdate').append('<span id="">'+startdate+'</span>');
                $('#edit_wrongenddate').append('<span id="">'+enddate+'</span>');
                
            }
		}
	});
});

//Delete HOLIDAY
$(document).ready( function () {
	$('#holiday_table').on('click', '.delete_btn', function(){

		var holidayId = $(this).data("value");

		$('#holidayid').val(holidayId);
		$('#DELETEHolidayFORM').attr('action', '/holiday-delete/'+holidayId);
		$('#DELETEHolidayMODAL').modal('show');

	});
});
