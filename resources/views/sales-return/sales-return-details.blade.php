@extends('layouts.master')
@section('title', 'Sales Return Details')

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
		              	<h5 class="m-0"><strong>SALES RETURN DETAILS</strong></h5>
		              </div>
		              <div class="card-body">


		              		<h6><strong>Sales Return No.</strong> {{$data->return_number}}</h6>
		              		<h6><strong>Invoice No.</strong> {{$data->invoice_no}}</h6>
		              		<h6><strong>Customer Name: </strong> {{$name}}</h6>
		              		<h6><strong>Customer Mobile: </strong> {{$mobile}}</h6>
		              		<h6><strong>Total Tax:</strong> {{ number_format($data->total_tax_return, 2, ".", "" ) }}</h6>
		              		<h6><strong>Total Deduction:</strong> {{ number_format($data->total_deduction, 2, ".", "" ) }}</h6>
		              		<h6 class="pb-2"><strong>Net Return:</strong> {{ number_format($data->net_return, 2, ".", "" ) }}</h6>

		              		<hr>

		              		<input type="hidden" name="returnnumber" id="returnnumber" value="{{$data->return_number}}">

		              		<div class="pt-2">
		              			<h6>Return product list:</h6>
												<table id="return_product_table" class="table table-bordered">
											    <thead>
											        <tr>
										            <th>#</th>
										            <th>Product Name</th>
										            <th>Return Qty</th>
										            <th>Price</th>
										            <th>Tax</th>
										            <th>Deduction</th>
										            <th>Total</th>
											        </tr>
											    </thead>
											    <tbody>

											    </tbody>
											  </table>
											</div>
		              </div> <!-- Card-body -->
		            </div>	<!-- Card -->

		        </div>   <!-- /.col-lg-6 -->
        	</div><!-- /.row -->
        </div> <!-- container-fluid -->
    </div> <!-- /.content -->
</div> <!-- /.content-wrapper -->

@endsection

@section('script')
<!-- DataTable -->
<script type="text/javascript" src="{{ asset('js/sales-return-details.js') }}"></script>
@endsection



