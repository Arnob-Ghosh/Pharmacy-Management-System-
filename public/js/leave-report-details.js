dataTableX()
function dataTableX(){
	$(document).ready( function () {
		$('#leave_report_table').DataTable({
		    pageLength : 10,
		    lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
		});
	});
}