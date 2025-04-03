$(document).ready(function () {
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});


	//CREATE SUPPLIER
	$(document).on('submit', '#AddSupplierForm', function (e) {
		e.preventDefault();

		let formData = new FormData($('#AddSupplierForm')[0]);

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
			url: "/supplier-create",
			data: formData,
			contentType: false,
			processData: false,
			success: function(response){
				if($.isEmptyObject(response.error)){
             		$(location).attr('href','/supplier-list');
                }else{
                	$('body').loadingModal('destroy');
                    printErrorMsg(response.error);
                }
			}
		});

	});

	function printErrorMsg (message) {
            $('#wrongsuppliername').empty();
            $('#wrongmobile').empty();
			$('#wrongsupplieraddress').empty();
			

			if(message.suppliername == null){
				suppliername = ""
			}else{
				suppliername = message.suppliername[0]
			}
			if(message.mobile == null){
				mobile = ""
			}else{
				mobile = message.mobile[0]
			}
			
			if(message.supplieraddress == null){
				supplieraddress = ""
			}else{
				supplieraddress = message.supplieraddress[0]
			}

            $('#wrongsuppliername').append('<span id="">'+suppliername+'</span>');
            $('#wrongmobile').append('<span id="">'+mobile+'</span>');
            $('#wrongsupplieraddress').append('<span id="">'+supplieraddress+'</span>');
    }

});
	//SUPPLIER LIST


	//EDIT SUPPLIER
	$(document).on('click', '.edit_btn', function (e) {
		e.preventDefault();

		var supplierId = $(this).val();
		// alert(supplierId);
		$('#EDITSupplierMODAL').modal('show');
			
			$.ajax({
			type: "GET",
			url: "/supplier-edit/"+supplierId,
			success: function(response){


					if(response.supplier.image == null){
						var image = "default.jpg"
					}else{
						var image = response.supplier.image
					}

				if (response.status == 200) {
					$('#edit_suppliername').val(response.supplier.name);
					$('#edit_contactnumber').val(response.supplier.mobile);
					$('#edit_supplieremail').val(response.supplier.email);
					$('#edit_supplierwebsite').val(response.supplier.supplier_website);
					$('#edit_supplieraddress').val(response.supplier.address);
					$('#edit_note').val(response.supplier.note);
					$('#edit_image').attr("src", "../uploads/clients/"+image);
					$('#supplierid').val(supplierId);
				}
			}
		});
	});

	//UPDATE SUPPLIER
	$(document).on('submit', '#UPDATESupplierFORM', function (e)
	{
		e.preventDefault();

		var id = $('#supplierid').val(); 

		let EditFormData = new FormData($('#UPDATESupplierFORM')[0]);

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
			url: "/supplier-edit/"+id,
			data: EditFormData,
			contentType: false,
			processData: false,
			success: function(response){
				if($.isEmptyObject(response.error)){
                    $('#EDITSupplierMODAL').modal('hide');
                    $.notify(response.message, 'success')
                    $(location).attr('href','/supplier-list');
                }else{
                	$('body').loadingModal('destroy');
                    $('#edit_wrongsuppliername').empty();
					$('#edit_wrongcontactnumber').empty();
					$('#edit_wrongsupplieraddress').empty();

					if(response.error.suppliername == null){
						suppliername = ""
					}else{
						suppliername = response.error.suppliername[0]
					}
					if(response.error.mobile == null){
						mobile = ""
					}else{
						mobile = response.error.mobile[0]
					}
					
					if(response.error.supplieraddress == null){
						supplieraddress = ""
					}else{
						supplieraddress = response.error.supplieraddress[0]
					}
					
	                $('#edit_wrongsuppliername').append('<span id="">'+suppliername+'</span>');
	                $('#edit_wrongcontactnumber').append('<span id="">'+mobile+'</span>');
	                $('#edit_wrongsupplieraddress').append('<span id="">'+supplieraddress+'</span>');

                }
			}
		});
	});

	//DELETE SUPPLIER
	$(document).ready( function () {
		$('#supplier_table').on('click', '.delete_btn', function(){

			var supplierId = $(this).data("value");

			$('#supplierid').val(supplierId);

			$('#DELETESupplierFORM').attr('action', '/supplier-delete/'+supplierId);

			$('#DELETESupplierMODAL').modal('show');

		});
	});


$(document).ready(function () {
    var t = $('#supplier_table').DataTable({
        ajax: {
            "url": "/supplier-list-data",
            "dataSrc": "supplier"
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
					if(row.supplier_website == null){
						var supplier_website = "N/A"
					}else{
						var supplier_website = row.supplier_website
					}
			        return supplier_website;
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

					return '<img src="uploads/suppliers/'+image+'" width="50px" height="50px" alt="image" class="rounded-circle">'
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
	    	var PageInfo = $('#supplier_table').DataTable().page.info();
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