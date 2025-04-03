$(document).ready(function () {

    var t = $('#due_table').DataTable({
        ajax: {
            "url": "/supplier-transection-data",
            "dataSrc": "data"
        },
        columns: [
            { data: null },
            {
            	"render": function ( data, type, row, meta )
            	{
            		return '<span ><a style="color: black" href="due-in-details/'+row.name+'">'+row.name+'</a></span>'
            	}
            },
            { "render": function ( data, type, row, meta )
            { return row.mobile; }
            },
            { "render": function ( data, type, row, meta ){

                 var balance = row.totalPurchase[0];
                 var supplier_id=row.totalPurchase[0];

                  if(balance.total_purchase !=null){
                    return '<span class="badge badge-primary"><a style="color: white" href="/supplier-total-purchase/'+supplier_id.supplierId+'">'+balance.total_purchase+'</a></span>'  ;
                    // return balance.total_purchase;
                }
                else{
                    return 0
                }

                }
            },

            { "render": function ( data, type, row, meta ){
                var balance = row.totalPayment[0];
                var head_code=row.totalPayment[0].head_code;

                if(balance.totalPayment !=null){
                    return '<span  class="badge badge-info"><a style="color: white" href="/supplier-total-payment/'+head_code+'">'+balance.totalPayment+'</a></span>'  ;
                }
                else{
                    return 0
                }

                }
            },
            { "render": function ( data, type, row, meta ){
                var balance_amount = row.balance[0];
                if(balance_amount.balance >= 0 && balance_amount.balance!='' ){
                    if(balance_amount.balance == 0){
                        return 0;
                    }
                    return balance_amount.balance+' (Dr)' ;
                }
                else if(balance_amount.balance <0){
                    return balance_amount.balance+' (Cr)';
                }
                else{
                    return 0;
                }

                }
            }

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
	    	var PageInfo = $('#due_table').DataTable().page.info();
	         t.column(0, { page: 'current' }).nodes().each( function (cell, i) {
	            cell.innerHTML = i + 1 + PageInfo.start;
	        } );
	    });

    }).draw();
});
