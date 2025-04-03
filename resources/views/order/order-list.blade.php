@extends('layouts.master')
@section('title', 'Orders')

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
              <div class="col-12 col-sm-6 col-md-3">
                <div class="info-box">
                  <span class="info-box-icon bg-info elevation-1"><i style="color: white;" class="fas fa-shopping-cart"></i></span>

                  <div class="info-box-content">
                    <h6 class="info-box-text mb-0" style=""><strong>Sale</strong></h6>
                    <h6 class="info-box-text mb-0">Today: <strong><span id="todaySale">0</span></strong> </h6>
                    <h6 class="info-box-text mb-0">Current Month: <strong><span id="monthSale">0</span></strong></h6>
                    <h6 class="info-box-text mb-0">Total: <strong><span id="totalSale">0</span></strong></h6>
                  </div>
                  <!-- /.info-box-content -->
                  <!-- <div class="overlay">
                    <i class="fas fa-2x fa-sync-alt fa-spin"></i>
                  </div> -->
                </div>
                <!-- /.info-box -->
              </div>
              <!-- /.col -->
              {{-- <div class="col-12 col-sm-6 col-md-3">
                <div class="info-box">
                  <span class="info-box-icon bg-warning elevation-1"><i style="color: white;" class="fas fa-hand-holding-usd"></i></span>

                  <div class="info-box-content">
                    <h6 class="info-box-text mb-0" style=""><strong>Due</strong></h6>
                    <h6 class="info-box-text mb-0">Today: <strong><span id="todayDue">0</span></strong> </h6>
                    <h6 class="info-box-text mb-0">Current Month: <strong><span id="monthDue">0</span></strong> </h6>
                    <h6 class="info-box-text mb-0">Total: <strong><span id="totalDue">0</span></strong> </h6>
                  </div>
                  <!-- /.info-box-content -->
                </div>
                <!-- /.info-box -->
              </div> --}}
              <!-- /.col -->

              <!-- fix for small devices only -->
              <!-- <div class="clearfix hidden-md-up"></div> -->

              {{-- <div class="col-12 col-sm-6 col-md-3">
                <div class="info-box">
                  <span class="info-box-icon bg-danger elevation-1"><i style="color: white;" class="fas fa-money-bill-alt"></i></span>

                  <div class="info-box-content">
                    <h6 class="info-box-text mb-0" style=""><strong>Expense</strong></h6>
                    <h6 class="info-box-text mb-0">Today: <strong><span id="todayExpense">0</span></strong> </h6>
                    <h6 class="info-box-text mb-0">Current Month: <strong><span id="monthExpense">0</span></strong> </h6>
                    <h6 class="info-box-text mb-0">Total: <strong><span id="totalExpense">0</span></strong> </h6>
                  </div>
                  <!-- /.info-box-content -->
                </div>
                <!-- /.info-box -->
              </div> --}}
              <!-- /.col -->
              {{-- <div class="col-12 col-sm-6 col-md-3">
                <div class="info-box">
                  <span class="info-box-icon bg-secondary elevation-1"><i style="color: white;" class="fas fa-shopping-bag"></i></span>

                  <div class="info-box-content">
                    <h6 class="info-box-text mb-0" style=""><strong>Purchase</strong></h6>
                    <h6 class="info-box-text mb-0">Today:  <strong><span id="todayPurchase">0</span></strong> </h6>
                    <h6 class="info-box-text mb-0">Current Month: <strong><span id="monthPurchase">0</span></strong> </h6>
                    <h6 class="info-box-text mb-0">Total: <strong><span id="totalPurchase">0</span></strong> </h6>
                  </div>
                  <!-- /.info-box-content -->
                </div>
                <!-- /.info-box -->
              </div> --}}
              <!-- /.col -->
            </div>
            <div class="row">
	          	<div class="col-lg-12">

		          	<div class="card card-primary">
		              <div class="card-header">
		                	<h5 class="m-0"><strong><i class="fas fa-history"></i> ORDERS</strong></h5>
		              </div>
		              <div class="card-body">
		                <!-- <h6 class="card-title">Special title treatment</h6> -->
		                <!-- Table -->

	                	<!-- <a href="/product-create"><button type="button" class="btn btn-primary">Create Product</button></a> -->


	                    <div class="pt-2">
	                    	<div class="table-responsive">
												<table id="order_table" class="table table-bordered" width="100%">
												    <thead>
												        <tr>
												        		<th width="5%">#</th>
												            <th width="10%">OrderID</th>
												            <th width="12%">Client Name</th>
												            <th width="11%">Client Contact</th>
												            <th width="10%">Order Date</th>
												            <th width="10%">Total</th>
												            <th width="10%">Total Tax</th>
												            <th width="10%">Total Discount</th>
												            <th width="13%">Special Discount</th>
												            <th width="12%">Grand Total</th>
												            <th width="12%">Return Amount</th>
												            <th width="10%">Action</th>
												        </tr>
												    </thead>
												    <!-- <tbody>

												    </tbody> -->
											    </table>
											  </div>
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
<script type="text/javascript" src="js/order.js"></script>
<script type="text/javascript">
</script>

@endsection



