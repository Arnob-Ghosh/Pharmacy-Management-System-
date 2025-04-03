@extends('layouts.master')
@section('title', 'Income Statement')

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
                                <h5 class="m-0"><strong><i class="fas fa-clipboard-list"></i> INCOME STATEMENT</strong>
                                </h5>
                            </div>
                            <div class="card-body" id="">
                                <!-- <h6 class="card-title">Special title treatment</h6> -->
                                <!-- Table -->
                                <div class="row">
                                    <div class="col-12">
                                        <form id="incomeStatement" method="POST" enctype="multipart/form-data">
                                            <!-- <small id="" class="form-text text-muted mb-0 pt-5">Genrate Custom Expense Report</small> -->

                                            <div class="form-row ">

                                                <div class="form-group col-md-3">

                                                    <label for="startdate">From Date</label>
                                                    <input type="date" class="form-control" id="startdate"
                                                        name="startdate">
                                                </div>
                                                <div class="form-group col-md-3">
                                                    <label for="enddate">To Date</label>
                                                    <input type="date" class="form-control" id="enddate"
                                                        name="enddate">
                                                </div>

                                                <div style="padding-top: 32px;" class="form-group col-md-3">
                                                    <button type="submit" class="btn btn-primary">Generate</button>
                                                    <button type="reset" value="Reset" class="btn btn-outline-danger"
                                                        onclick=""><i class="fas fa-eraser"></i> Reset</button>
                                                </div>

                                            </div>
                                        </form>
                                    </div>


                                </div>


                                <input type="hidden" name="" id="subscriberid"
                                    value="{{ auth()->user()->subscriber_id }}">
                                <div class="pt-1" id="income_statement">
                                    <button type="button" class="btn btn-info btn-lg rounded-pill float-right mb-3"
                                        title="Print" onclick="print();"><i class="fas fa-print"></i></button>
                                    <table id="trial_balance_table_sales" class="table table-bordered table-sm mb-0">
                                        <!-- <caption></caption> -->
                                        <thead id="sales_thead" class="table-primary">

                                        </thead>
                                        <tbody id="sales_tbody">



                                        </tbody>
                                        <tfoot id="sales_tfoot">

                                        </tfoot>
                                    </table>
                                    <table id="trial_balance_table_income" class="table table-bordered table-sm mt-0 mb-0">
                                        <!-- <caption></caption> -->
                                        <thead id="expense_thead" class="table-primary">

                                        </thead>
                                        <tbody id="expense_tbody">



                                        </tbody>
                                        <tfoot id="expense_tfoot">

                                        </tfoot>
                                    </table>
                                    <table id="trial_balance_table_total" class="table table-bordered table-sm mt-0">

                                        <tbody id="total_tbody">

                                        </tbody>
                                    </table>
                                </div>

                                <div class="pt-1" id="date_wise_income_statement">
                                    <button type="button" class="btn btn-info btn-lg rounded-pill float-right mb-3"
                                        title="Print" onclick="date_wise_print();"><i class="fas fa-print"></i></button>
                                    <table id="date_wise_trial_balance_table_sales" class="table table-bordered table-sm mb-0">
                                        <!-- <caption></caption> -->
                                        <thead id="date_wise_sales_thead" class="table-primary">

                                        </thead>
                                        <tbody id="date_wise_sales_tbody">



                                        </tbody>
                                        <tfoot id="date_wise_sales_tfoot">

                                        </tfoot>
                                    </table>
                                    <table id="date_wise_trial_balance_table_income" class="table table-bordered table-sm mt-0 mb-0">
                                        <!-- <caption></caption> -->
                                        <thead id="date_wise_expense_thead" class="table-primary">

                                        </thead>
                                        <tbody id="date_wise_expense_tbody">



                                        </tbody>
                                        <tfoot id="date_wise_expense_tfoot">

                                        </tfoot>
                                    </table>
                                    <table id="date_wise_trial_balance_table_total" class="table table-bordered table-sm mt-0">

                                        <tbody id="date_wise_total_tbody">

                                        </tbody>
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
    <script type="text/javascript" src="js/income-statement.js"></script>
    <script type="text/javascript">

    </script>

@endsection
