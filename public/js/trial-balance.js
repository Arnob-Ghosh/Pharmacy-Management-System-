$(document).ready(function () {
    var t = $('#trial_balance_table').DataTable({
        ajax: {
            "url": "/trial-balance-data",
            "dataSrc": "data",
        },
        columns: [
          	{data: null},
            { data: 'head_name' },
            { data: 'head_code' },
            { "render": function ( data, type, row, meta ){ var totalDebit = parseFloat(row.totalDebit); return totalDebit.toFixed(2);} },
            { "render": function ( data, type, row, meta ){ var totalCredit = parseFloat(row.totalCredit); return totalCredit.toFixed(2);} },
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
	    	var PageInfo = $('#trial_balance_table').DataTable().page.info();
	         t.column(0, { page: 'current' }).nodes().each( function (cell, i) {
	            cell.innerHTML = i + 1 + PageInfo.start;
	        } );
	    } );

    }).draw();


});


$('#TrialBalance').on('submit',  function (e) {
	e.preventDefault();

	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});
	
	let formData = new FormData($('#TrialBalance')[0]);
	
	if($('#startdate').val().length != 0 || $('#enddate').val().length != 0 ){
		$.ajax({
			type: "POST",
			url: "/trial-balance-datewise",
			data: formData,
			contentType: false,
			processData: false,
			success: function(response){
				onChangeDataTable(response.data);

			}
		})
	}else{
		$.notify("Please select at lease one date.", {className: 'error', position: 'bottom right'});   

	}
	
})

function onChangeDataTable(json){

	$('#trial_balance_table').DataTable().clear().destroy()

	var t = $('#trial_balance_table').DataTable({
        data : json,
        columns: [
          	{data: null},
            { data: 'head_name' },
            { data: 'head_code' },
            { "render": function ( data, type, row, meta ){ var totalDebit = parseFloat(row.totalDebit); return totalDebit.toFixed(2);} },
            { "render": function ( data, type, row, meta ){ var totalCredit = parseFloat(row.totalCredit); return totalCredit.toFixed(2);} },
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
	    dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });

    t.on('order.dt search.dt', function () {
	    t.on( 'draw.dt', function () {
	    	var PageInfo = $('#trial_balance_table').DataTable().page.info();
	         t.column(0, { page: 'current' }).nodes().each( function (cell, i) {
	            cell.innerHTML = i + 1 + PageInfo.start;
	        } );
	    });

    }).draw();
}
