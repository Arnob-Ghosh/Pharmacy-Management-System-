@extends('layouts.master')
@section('title', 'Create Shift')

@section('content')
<div class="content-wrapper">
	<div class="content-header">
		<div class="container-fluid">
			<div class="row">
				<!-- Header -->
			</div>
		</div>
	</div>

	<div class="content">
		<div class="container-fluid ">
			<div class="row">
      			<div class="col-lg-6">
          			<div class="card card-primary">
			            <div class="card-header">
			                <h5 class="m-0"><strong><i class="fas fa-user-clock"></i> SHIFT</strong></h5>
			            </div>

		              	<div class="card-body">
	          				<div class="container">

								<form id="AddShiftForm" method="POST" enctype="multipart/form-data">
									
								  	<div class="form-group">
									    <label for="shiftname" class="form-label" style="font-weight: normal;">Shift Name<span class="text-danger"><strong>*</strong></span></label>
									    <input type="text" class="form-control w-50" name="shiftname" id="shiftname" placeholder="e.g. Morning Shift or Shift 1">
									    <h6 class="text-danger pt-1" id="wrongshiftname" style="font-size: 14px;"></h6>
								  	</div>

								  	<div class="form-group">
									    <label for="intime" class="form-label" style="font-weight: normal;">In-Time<span class="text-danger"><strong>*</strong></span></label>
									    <input type="time" class="form-control w-50" name="intime" id="intime">
									    <h6 class="text-danger pt-1" id="wrongintime" style="font-size: 14px;"></h6>
								  	</div>

								  	<div class="form-group">
									    <label for="outtime" class="form-label" style="font-weight: normal;">Out-Time<span class="text-danger"><strong>*</strong></span></label>
									    <input type="time" class="form-control w-50" name="outtime" id="outtime">
									    <h6 class="text-danger pt-1" id="wrongouttime" style="font-size: 14px;"></h6>
								  	</div>
								  	
								  	
								  	<div class="form-group pt-3">
									  	<button type="submit" class="btn btn-primary">Create</button>
										<button type="reset" value="Reset" class="btn btn-outline-danger"><i class="fas fa-eraser"></i> Reset</button>
								  	</div>
								  	
								</form>

							</div> <!-- container -->
						</div> <!-- card-body -->
		          	</div> <!-- card card-primary card-outline -->
      			</div> <!-- col-lg-5 -->
      		</div> <!-- row -->
		</div> <!-- container-fluid -->
	</div> <!-- content -->
	
</div> <!-- content-wrapper -->

@endsection

@section('script')
<script type="text/javascript" src="js/shift.js"></script>

@endsection