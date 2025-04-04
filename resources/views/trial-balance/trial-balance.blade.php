@extends('layouts.master')
@section('title', 'Trial Balance')

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
		                	<h5 class="m-0"><strong><i class="fas fa-clipboard-list"></i> TRIAL BALANCE</strong></h5>
		              </div>
		              <div class="card-body">
		                <!-- <h6 class="card-title">Special title treatment</h6> -->
		                <!-- Table -->
	                	<div class="row">
	                		<div class="col-12">
	                			<form id="TrialBalance" method="POST" enctype="multipart/form-data">
						            	<!-- <small id="" class="form-text text-muted mb-0 pt-5">Genrate Custom Expense Report</small> -->
						            	
												  <div class="form-row pt-3">

												    <div class="form-group col-md-3">

												      <label for="startdate">From Date</label>
												      <input type="date" class="form-control" id="startdate" name="startdate">
												    </div>
												    <div class="form-group col-md-3">
												      <label for="enddate">To Date</label>
												      <input type="date" class="form-control" id="enddate" name="enddate">
												    </div>
												    
												    <div style="padding-top: 32px;" class="form-group col-md-3">
												      <button type="submit" class="btn btn-primary">Generate</button>
												      <button type="reset" value="Reset" class="btn btn-outline-danger" onclick=""><i class="fas fa-eraser"></i> Reset</button>
												    </div>
												    
												  </div>
												</form>
	                		</div>
	                	</div>
	                	<input type="hidden" name="" id="subscriberid" value="{{auth()->user()->subscriber_id}}">
	                    <div class="pt-3">
												<table id="trial_balance_table" class="table table-bordered">
													 <!-- <caption></caption> -->
												    <thead>
												        <tr>
												            <th class="">#</th>
												            <th width="28%">Account/Head Name</th>
												            <th width="27%">Account/Head Code</th>
												            <th width="20%">Debit</th>
												            <th width="20%">Credit</th>
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
<script type="text/javascript" src="js/trial-balance.js"></script>
<script type="text/javascript">

	
</script>

@endsection


	
