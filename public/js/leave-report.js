fetchLeave()
function fetchLeave(){
	$.ajax({
		type: "GET",
		url: "/leave-report-onload",
		dataType:"json",
		success: function(response){
			// console.log(response.message)
			$('#date').text(response.monthName)
			$.each(response.data, function(key, item) {
				$('tbody').append('\
				<tr>\
					<td></td>\
					<td>'+item.employeeName+'</td>\
					<td>'+item.employeeDepartment+'</td>\
					<td>'+item.employeeDesignation+'</td>\
					<td>'+item.totalPresent+'</td>\
					<td>'+item.totalAbsent+'</td>\
					<td>'+item.totalLateIn+'</td>\
					<td>'+item.totalEarlyOut+'</td>\
					<td>\
	                	<a style="color: white" href="leave-report-details/'+item.employeeId+'"><button type="button" class="action btn btn-outline-info btn-sm">Details</button></a>\
	    			</td>\
	    		</tr>');
			})
			

		}
	})
}



$('#LeaveReportForm').on('submit',  function (e) {
	e.preventDefault();
	

	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});
	
	let formData = new FormData($('#LeaveReportForm')[0]);

	startDate = $('#startdate').val()
	endDate = $('#enddate').val()
	

	$.ajax({
		type: "POST",
		url: "/leave-report",
		data: formData,
		contentType: false,
		processData: false,
		success: function(response){

			if(startDate.length != 0 && endDate.length == 0){
				$('#date').text('')
				$('#date').text(startDate)
			}else if(startDate.length == 0 && endDate.length != 0){
				$('#date').text('')
				$('#date').text(endDate)
			}else if(startDate.length != 0 && endDate.length != 0){
				$('#date').text('')
				$('#date').text(startDate+' to '+endDate)
			}

			$('#leave_report_table').DataTable().clear().destroy()
			dataTableX()

			if(response.data == null){
				$('#gen_btn').notify("No Data Found.", {className: 'error', position: 'bottom left'})
			}else{
				$('tbody').html("");
				$.each(response.data, function(key, item) {

					if(startDate.length == 0 && endDate.length == 0){
						$('tbody').append('<tr>\
							<td></td>\
							<td>'+item.employeeName+'</td>\
							<td>'+item.employeeDepartment+'</td>\
							<td>'+item.employeeDesignation+'</td>\
							<td>'+item.totalPresent+'</td>\
							<td>'+item.totalAbsent+'</td>\
							<td>'+item.totalLateIn+'</td>\
							<td>'+item.totalEarlyOut+'</td>\
							<td>\
			                	<a style="color: white" href="leave-report-details/'+item.employeeId+'"><button type="button" class="action btn btn-outline-info btn-sm">Details</button></a>\
			    			</td>\
		        		</tr>');
					}else if(startDate.length != 0 && endDate.length == 0){
						$('tbody').append('<tr>\
							<td></td>\
							<td>'+item.employeeName+'</td>\
							<td>'+item.employeeDepartment+'</td>\
							<td>'+item.employeeDesignation+'</td>\
							<td>'+item.totalPresent+'</td>\
							<td>'+item.totalAbsent+'</td>\
							<td>'+item.totalLateIn+'</td>\
							<td>'+item.totalEarlyOut+'</td>\
							<td>\
			                	<a style="color: white" href="leave-report-details/'+item.employeeId+'/'+startDate+'"><button type="button" class="action btn btn-outline-info btn-sm">Details</button></a>\
			    			</td>\
		        		</tr>');
					}else if(startDate.length == 0 && endDate.length != 0){
						$('tbody').append('<tr>\
							<td></td>\
							<td>'+item.employeeName+'</td>\
							<td>'+item.employeeDepartment+'</td>\
							<td>'+item.employeeDesignation+'</td>\
							<td>'+item.totalPresent+'</td>\
							<td>'+item.totalAbsent+'</td>\
							<td>'+item.totalLateIn+'</td>\
							<td>'+item.totalEarlyOut+'</td>\
							<td>\
			                	<a style="color: white" href="leave-report-details/'+item.employeeId+'/'+endDate+'"><button type="button" class="action btn btn-outline-info btn-sm">Details</button></a>\
			    			</td>\
		        		</tr>');
					}else if(startDate.length != 0 && endDate.length != 0){
						$('tbody').append('<tr>\
							<td></td>\
							<td>'+item.employeeName+'</td>\
							<td>'+item.employeeDepartment+'</td>\
							<td>'+item.employeeDesignation+'</td>\
							<td>'+item.totalPresent+'</td>\
							<td>'+item.totalAbsent+'</td>\
							<td>'+item.totalLateIn+'</td>\
							<td>'+item.totalEarlyOut+'</td>\
							<td>\
			                	<a style="color: white" href="leave-report-details/'+item.employeeId+'/'+startDate+'/'+endDate+'"><button type="button" class="action btn btn-outline-info btn-sm">Details</button></a>\
			    			</td>\
		        		</tr>');
					}

					
				})
			}
		}
	})
})


dataTableX()
function dataTableX(){
	$(document).ready( function () {
		$('#leave_report_table').DataTable({
		    pageLength : 10,
		    lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
		    "fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
			    //debugger;
			    var index = iDisplayIndexFull + 1;
			    $("td:first", nRow).html(index);
			    return nRow;
		  	},
		});
	});
}
