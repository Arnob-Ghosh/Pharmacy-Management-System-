$(document).ready(function () {
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});


	// CREATE SUPPLIER
	$(document).on('submit', '#AddCustomerForm', function (e) {
		e.preventDefault();

		let formData = new FormData($('#AddCustomerForm')[0]);

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
			url: "/customer-create",
			data: formData,
			contentType: false,
			processData: false,
			success: function(response){
				if($.isEmptyObject(response.error)){
                    
             		$(location).attr('href','/customer-list');

                }else{
                	$('body').loadingModal('destroy');
                    printErrorMsg(response.error);
                }
			}
		});

	});

	function printErrorMsg (message) {
       
            $('#wrongcustomername').empty();
            $('#wrongmobile').empty();
			

			if(message.customername == null){
				customername = ""
			}else{
				customername = message.customername[0]
			}
			if(message.mobile == null){
				mobile = ""
			}else{
				mobile = message.mobile[0]
			}

            $('#wrongcustomername').append('<span id="">'+customername+'</span>');
            $('#wrongmobile').append('<span id="">'+mobile+'</span>');

    }

});
	

	// EDIT SUPPLIER
	$(document).on('click', '.edit_btn', function (e) {
		e.preventDefault();

		var clientId = $(this).val();
		$('#EDITCustomerMODAL').modal('show');
			
			$.ajax({
			type: "GET",
			url: "/customer-edit/"+clientId,
			success: function(response){
				if (response.status == 200) {
					$('#edit_customername').val(response.client.name);
					$('#edit_contactnumber').val(response.client.mobile);
					$('#edit_customeremail').val(response.client.email);
					$('#edit_customeraddress').val(response.client.address);
					$('#edit_note').val(response.client.note);
					$('#edit_storeid').val(response.client.storeId);
					if(response.client.image == null){
						$('#edit_image').attr("src", "../uploads/clients/user.png");
					}else{
						$('#edit_image').attr("src", "../uploads/clients/"+response.client.image);
					}
					$('#customerid').val(clientId);
				}
			}
		});
	});

	// //UPDATE SUPPLIER
	$(document).on('submit', '#UPDATECustomerFORM', function (e)
	{
		e.preventDefault();

		var id = $('#customerid').val(); 

		let EditFormData = new FormData($('#UPDATECustomerFORM')[0]);

		EditFormData.append('_method', 'PUT');

		$.ajax({
			type: "POST",
			url: "/customer-edit/"+id,
			data: EditFormData,
			contentType: false,
			processData: false,
			success: function(response){

				if($.isEmptyObject(response.error)){
                    $('#EDITCustomerMODAL').modal('hide');
                    $.notify(response.message, 'success')
                    $(location).attr('href','/customer-list');
                }else{

                    $('#edit_wrongcustomername').empty();
					$('#edit_wrongcontactnumber').empty();
				

					if(response.error.customername == null){
						customername = ""
					}else{
						customername = response.error.customername[0]
					}
					if(response.error.mobile == null){
						mobile = ""
					}else{
						mobile = response.error.mobile[0]
					}
					

	                $('#edit_wrongcustomername').append('<span id="">'+customername+'</span>');
	                $('#edit_wrongcontactnumber').append('<span id="">'+mobile+'</span>');
	       
                }
			}
		});
	});

	// //DELETE SUPPLIER
	$(document).ready( function () {
		$('#customer_table').on('click', '.delete_btn', function(){

			var customerId = $(this).data("value");

			$('#customerid').val(customerId);

			$('#DELETECustomerFORM').attr('action', '/customer-delete/'+customerId);

			$('#DELETECustomerMODAL').modal('show');

		});
	});

$(document).ready(function () {
    var t = $('#customer_table').DataTable({
        ajax: {
            "url": "/customer-list-data",
            "dataSrc": "customer"
        },
        columns: [
            { data: null },

            { data: 'name' },


            { data: 'mobile' },

            { 
            	"render": function ( data, type, row, meta )
		        {
					if(row.email == null){
						var email = "N/A"
					}else{
						var email = row.email
					}
			        return email;
		        }
            },


            { 
            	"render": function ( data, type, row, meta )
		        {
					if(row.address == null){
						var address = "N/A"
					}else{
						var address = row.address
					}
			        return address;
		        }
            },


            { 
            	"render": function ( data, type, row, meta )
		        {
					if(row.image == null){
						var image = "default.jpg"
					}else{
						var image = row.image
					}

					return '<img src="uploads/clients/'+image+'" width="50px" height="50px" alt="image" class="rounded-circle">'
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
	    	var PageInfo = $('#customer_table').DataTable().page.info();
	         t.column(0, { page: 'current' }).nodes().each( function (cell, i) {
	            cell.innerHTML = i + 1 + PageInfo.start;
	        } );
	    });

    }).draw();
});

function getBtns(data, type, row, meta) {

    var id = row.id;
    return '<a type="button" class="details_btn btn btn-info btn-sm" href="/customer-details/'+id+'" data-value="'+id+'" title="Details"><i class="fas fa-info-circle"></i></a>\
			<button type="button" value="'+id+'" class="edit_btn btn btn-secondary btn-sm" title="Edit"><i class="fas fa-edit"></i></button>\
        	<a href="javascript:void(0)" class="delete_btn btn btn-outline-danger btn-sm" data-value="'+id+'" title="Delete"><i class="fas fa-trash"></i></a>';
}

