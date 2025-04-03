@extends('layouts.master')
@section('title', 'Supplier Purchase Reports')

@section('content')
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">

                    </div><!-- /.col -->
                </div><!-- /.row mb-2 -->
            </div><!-- /.container-fluid -->
        </div> <!-- /.content-header -->

        <!-- Main content -->
        <div class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-8">

                        <div class="card card-primary">
                            <div class="card-header">
                                <h5 class="m-0"><strong><i class="fas fa-file-contract"></i> SUPPLIER PURCHASE
                                        REPORT</strong></h5>
                            </div>
                            <div class="card-body">
                                <div id="form_div">
                                    <form id="supplierPurchaseReportForm" >
                                        <div class="form-row">
                                            <div class="form-group col-md-3">
                                                <label for="supplier_id" style="font-weight: normal;">Supplier</label><br>
                                                <select class="selectpicker" name="supplier_id" id="supplier_id"
                                                    data-live-search="true" data-width="100%">
                                                    <option value=""selected disabled> Select Supplier</option>
                                                    @foreach ($suppliers as $supplier)
                                                        <option value="{{ $supplier->id }}">{{ $supplier->name }}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                            <div class="form-group col-md-3">
                                                <label for="startdate" style="font-weight: normal;">From</label>
                                                <input type="date" class="form-control" id="startdate" name="startdate">
                                            </div>
                                            <div class="form-group col-md-3">
                                                <label for="enddate" style="font-weight: normal;">To</label>
                                                <input type="date" class="form-control" id="enddate" name="enddate">
                                            </div>

                                            <div style="padding-top: 32px;" class="form-group col-md-3">
                                                <button type="submit" class="btn btn-primary"
                                                    id="gen_btn">Generate</button>
                                                <button id="reset_btn" type="button" class=" w-30 btn btn-outline-danger"
                                                    onclick="resetButton()"><i class="fas fa-eraser"></i> Reset</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>



                                <div id="tablePart" >
                                    <hr>
                                    <h5 class="pb-3"><strong><u>Purchase History</u></strong></h5>
                                    <table id="supplier_table" class="display" style="100%!important">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Store</th>
                                                <th>PO Number</th>
                                                <th>Total Price</th>
                                                <th>Discount</th>
                                                <th>Other_cost</th>
<!-- 												            <th>Note</th> -->
                                                <!-- <th>Store</th> -->
                                                <th>Grand Total</th>

                                            </tr>
                                        </thead>
                                       <!--  <tbody>

                                        </tbody> -->
                                    </table>
                                </div>

                            </div> <!-- Card-body -->
                        </div> <!-- Card -->
                    </div> <!-- /.col-lg-6 -->
                </div><!-- /.row -->
            </div> <!-- container-fluid -->
        </div> <!-- /.content -->
    </div> <!-- /.content-wrapper -->

@endsection

@section('script')
    {{-- <script type="text/javascript" src="js/product-in-report.js"></script> --}}
    <script>
        var i=1;
        $('#tablePart').hide();
        $(document).ready(function() {
            $('#supplierPurchaseReportForm').on('submit', function(e) {


            var supplier_id = $('#supplier_id').find(":selected").val();
               var startdate=$('#startdate').val();
               var enddate=$('#enddate').val();
// if(supplier_id !=''){
// alert(supplier_id)
// }else{
//     alert(0)
// }
               e.preventDefault();
               if (supplier_id !=''&& startdate.length != 0 && enddate.length != 0) {

                         $.ajax({
                    type: "get",
                    url: "/supplier-purchase-report-data/"+supplier_id+"/"+startdate+"/"+enddate,

                    success: function(response) {
                        // console.log(response.data)
                        i=1;
                        $('#tablePart').show();
                        onChangeDataTable(response.data,i)
                        // if (response.message == 'No Data available') {
                        //     $.notify(response.message);
                        // } else {

                        //     // onChangeDataTable(response.data)

                        // }

                    }
                });
               }

               else {
        $.notify("Please select Supplier Name, From date and To date.", {
            className: 'error',
            position: 'bottom right'
        });

    }

            });

    function onChangeDataTable(json,i){

$('#supplier_table').DataTable().clear().destroy()

var t = $('#supplier_table').DataTable({

    data : json,

    columns: [
        { "render": function ( data, type, row, meta ){

        return i++;
        }
        },
        { "render": function ( data, type, row, meta ){

            return row.store;
            }
        },
        { "render": function ( data, type, row, meta ){

             return row.poNumber;
            }
        },
        { "render": function ( data, type, row, meta ){

            var totalPrice = parseFloat(row.totalPrice);
            return totalPrice.toFixed(2);
}
},
        { "render": function ( data, type, row, meta ){
            var discount = parseFloat(row.discount);
            return discount.toFixed(2);
        }
    },
    { "render": function ( data, type, row, meta ){
            var other_cost = parseFloat(row.other_cost);
            return other_cost.toFixed(2);
        }
    },
    { "render": function ( data, type, row, meta ){
            var grandTotal = parseFloat(row.grandTotal);
            return grandTotal.toFixed(2);
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
    bAutoWidth: false,
    order: [[1, 'asc']],
    pageLength : 10,
    lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
    dom: 'Bfrtip',
    buttons: [
        // 'copy', 'csv', 'excel', 'pdf', 'print'
        {
                extend: 'copy',
                exportOptions: {
                    columns: [ 1, 2,3,4, 5,6 ]
                }
            },
            {
            extend: 'csv',
            exportOptions: {
                columns: [ 1, 2,3,4, 5,6 ]
            }
        },
            {
            extend: 'excel',
            exportOptions: {
                columns: [ 1, 2,3,4, 5,6 ]
            }
        },
        {
            extend: 'pdf',
            exportOptions: {
                columns: [ 1, 2,3,4, 5,6 ]
            }
        },
        {
            extend: 'print',
            exportOptions: {
                columns: [ 1, 2,3,4, 5,6 ]
            }
        },


    ]

});


}

        });
        function resetButton(){
            // e.preventDefault();
    $('#tablePart').hide();

    // $("input[type=date][name$=TerminationDate]").val('');
    $("#startdate").val("");
    $("#enddate").val("");
    $('#supplier_head_code').val("");
    $('.selectpicker').selectpicker('refresh');
    $.notify("Selected Supplier and Dates are cleared", {
        className: 'success',
        position: 'bottom right'
    });
}
    </script>
@endsection
