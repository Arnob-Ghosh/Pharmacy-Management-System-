@extends('layouts.master')
@section('title', 'Product-In Reports')

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
		                	<h5 class="m-0"><strong><i class="fas fa-file-contract"></i> PRODUCT-IN-REPORT</strong></h5>
		              </div>
		              <div class="card-body">
	                	<div id="form_div">
		                	<form id="productInReportForm" method="POST" enctype="multipart/form-data">
											  <div class="form-row">
											    <div class="form-group col-md-3">
											      <label for="startdate" style="font-weight: normal;">From</label>
											      <input type="date" class="form-control" id="startdate" name="startdate">
											    </div>
											    <div class="form-group col-md-3">
											      <label for="enddate" style="font-weight: normal;">To</label>
											      <input type="date" class="form-control" id="enddate" name="enddate">
											    </div>
											    <div class="form-group col-md-2">
											      <label for="store" style="font-weight: normal;">Store</label><br>
											      <select class="selectpicker" name="store" id="store" data-live-search="true" data-width="100%">
										      		<option value="all_store"selected>	All Store</option>
										      		@foreach($stores as $store)
									            	<option value="{{ $store->id }}">{{ $store->store_name  }}</option>
									        		@endforeach
										      	</select>
											    </div>
											    <div style="padding-top: 32px;" class="form-group col-md-4">
											      <button type="submit" class="btn btn-primary" id="gen_btn">Generate</button>
											      <button id="reset_btn" type="button" class=" w-30 btn btn-outline-danger" onclick="resetButton()"><i class="fas fa-eraser"></i> Reset</button>
											    </div>
											  </div>
											</form>
	                	</div>
	               	
	                	<hr>

										<div id="tablePart" class="col-12">
											<h5 class="pb-3"><strong><u>Product-In History</u></strong></h5>
											<table id="product_table" class="display">
											  <thead>
											    <tr>
											    	<th>#</th>
											      <th scope="col">Store</th>
											      <th scope="col">Product</th>
											      <th scope="col">Qty</th>
											    </tr>
											  </thead>
											  <!-- <tbody id="product_table_body">
											    
											  </tbody> -->
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
<script type="text/javascript" src="js/product-in-report.js"></script>
@endsection


	
