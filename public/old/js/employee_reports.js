$(document).ready(function () {
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});


    $.ajax({
        type: "get",
        url: "/employeereports_list",
        success: function (response) {
           
            filter(response.data)



        }
    });

});


function filter(jsonData) {
    //$(location).attr('href','/employeereports_list');

    var t = $('#employeereports_table').DataTable({
        data:jsonData,
        columns: [
            // { data: 'employee_id '},
            { data: 'employee_name' },
            { data: 'designation' },
            { data: 'department' },
            { data: 'present_count' },
            { data: 'absent_count' },
            { data: 'late_count' },


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

}
function collection(){

	let object= {};

	object['month'] = $('#month').val();
    //object['year'] = $('#year').val();
$.ajax({
    type: "post",
    url: "/employeereports_list",
    data: object,
    dataType: "Json",
    success: function (response) {
       // console.log(response)
       $('#employeereports_table').DataTable().destroy();
       //n = d.getMonth(),
        filter(response.data)



    }
});

}


function resetButton(){
	// dataTableX()
	// fetchExpense()
    // $("#expense_table").find("tr:gt(0)").remove();
	$('form').on('reset', function() {
	  	setTimeout(function() {
		    $('.selectpicker').selectpicker('refresh');
	  	});
	});
}
