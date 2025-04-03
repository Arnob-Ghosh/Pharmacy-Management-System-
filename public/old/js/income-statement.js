fetchIncomeStatement();
function fetchIncomeStatement(){

	$.ajax({
		type: "GET",
		url: "/income-statement-data",
		dataType:"json",
		success: function(response){

			var lossProfit = parseFloat(response.totalRevenue) - parseFloat(response.totalExpense)
			var totalRevenue = parseFloat(response.totalRevenue)
			var totalExpense = parseFloat(response.totalExpense)


			$('#sales_thead').append('\
			<tr>\
				<th width="20%">Sales Revenue</th>\
				<th colspan="2"></th>\
				<th width="20%">'+totalRevenue.toFixed(2)+'</th>\
    		</tr>');

			$.each(response.data, function(key, item) {

				if(item.totalCredit == 0){
					var amount = parseFloat(item.totalDebit)
				}else{
					var amount = parseFloat(item.totalCredit)
				}

				$('#sales_tbody').append('\
				<tr>\
					<td width="25%"></td>\
					<td width="25%">'+item.head_name+'</td>\
					<td width="25%">'+amount.toFixed(2)+'</td>\
					<td width="25%"></td>\
        		</tr>');
			})

			$('#sales_tfoot').append('\
			<tr>\
				<td colspan="2"></td>\
				<th>'+totalRevenue.toFixed(2)+'</th>\
				<th></th>\
    		</tr>');

    		$('#expense_thead').append('\
			<tr>\
				<th width="20%">Expense</th>\
				<th colspan="2"></th>\
				<th width="20%">'+totalExpense.toFixed(2)+'</th>\
    		</tr>');

			$.each(response.data1, function(key, item) {

				if(item.totalCredit == 0){
					var amount = parseFloat(item.totalDebit)
				}else{
					var amount = parseFloat(item.totalCredit)
				}

				$('#expense_tbody').append('\
				<tr>\
					<td width="25%"></td>\
					<td width="25%">'+item.head_name+'</td>\
					<td width="25%">'+amount.toFixed(2)+'</td>\
					<td width="25%"></td>\
        		</tr>');
			})

			$('#expense_tfoot').append('\
			<tr>\
				<td colspan="2"></td>\
				<th>'+totalExpense.toFixed(2)+'</th>\
				<th></th>\
    		</tr>');

    		$('#total_tbody').append('\
			<tr>\
				<td width="" colspan="3"></td>\
				<th width="25%">'+lossProfit.toFixed(2)+'</th>\
    		</tr>');
		}
	});
}

function print(){
	$.print("#income_statement");
}

function date_wise_print() {
    $.print("#date_wise_income_statement");
}

$('#date_wise_income_statement').hide()
// $('#date_wise_income_statement').empty()
$('#incomeStatement').on('submit', function (e) {
    e.preventDefault();

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    let formData = new FormData($('#incomeStatement')[0]);

    if ($('#startdate').val().length != 0 && $('#enddate').val().length != 0) {
        $('#income_statement').hide()
        $('#date_wise_income_statement').show()
        $.ajax({
            type: "POST",
            url: "/income-statement-datewise",
            data: formData,
            contentType: false,
            processData: false,
		success: function(response){

			var lossProfit = parseFloat(response.totalRevenue) - parseFloat(response.totalExpense)
			var totalRevenue = parseFloat(response.totalRevenue)
			var totalExpense = parseFloat(response.totalExpense)

            $('#date_wise_sales_thead').empty()
            $('#date_wise_sales_tbody').empty()
            $('#date_wise_sales_tfoot').empty()
            $('#date_wise_expense_thead').empty()
            $('#date_wise_expense_tbody').empty()
            $('#date_wise_expense_tfoot').empty()
            $('#date_wise_total_tbody').empty()



			$('#date_wise_sales_thead').append('\
			<tr>\
				<th width="20%">Sales Revenue</th>\
				<th colspan="2"></th>\
				<th width="20%">'+totalRevenue.toFixed(2)+'</th>\
    		</tr>');

			$.each(response.data, function(key, item) {

				if(item.totalCredit == 0){
					var amount = parseFloat(item.totalDebit)
				}else{
					var amount = parseFloat(item.totalCredit)
				}

				$('#date_wise_sales_tbody').append('\
				<tr>\
					<td width="25%"></td>\
					<td width="25%">'+item.head_name+'</td>\
					<td width="25%">'+amount.toFixed(2)+'</td>\
					<td width="25%"></td>\
        		</tr>');
			})

			$('#date_wise_sales_tfoot').append('\
			<tr>\
				<td colspan="2"></td>\
				<th>'+totalRevenue.toFixed(2)+'</th>\
				<th></th>\
    		</tr>');

    		$('#date_wise_expense_thead').append('\
			<tr>\
				<th width="20%">Expense</th>\
				<th colspan="2"></th>\
				<th width="20%">'+totalExpense.toFixed(2)+'</th>\
    		</tr>');

			$.each(response.data1, function(key, item) {

				if(item.totalCredit == 0){
					var amount = parseFloat(item.totalDebit)
				}else{
					var amount = parseFloat(item.totalCredit)
				}

				$('#date_wise_expense_tbody').append('\
				<tr>\
					<td width="25%"></td>\
					<td width="25%">'+item.head_name+'</td>\
					<td width="25%">'+amount.toFixed(2)+'</td>\
					<td width="25%"></td>\
        		</tr>');
			})

			$('#date_wise_expense_tfoot').append('\
			<tr>\
				<td colspan="2"></td>\
				<th>'+totalExpense.toFixed(2)+'</th>\
				<th></th>\
    		</tr>');

    		$('#date_wise_total_tbody').append('\
			<tr>\
				<td width="" colspan="3"></td>\
				<th width="25%">'+lossProfit.toFixed(2)+'</th>\
    		</tr>');
		}
	});
    } else {
        $.notify("Please select From date and To date.", {
            className: 'error',
            position: 'bottom right'
        });

    }

})
$('#incomeStatement').on('reset', function (e) {
    e.preventDefault();
    $('#income_statement').show()
    $('#date_wise_income_statement').hide()
    // $("input[type=date][name$=TerminationDate]").val('');
    $("#startdate").val("");
    $("#enddate").val("");
    $.notify("Selected Dates are cleared", {
        className: 'success',
        position: 'bottom right'
    });
})
