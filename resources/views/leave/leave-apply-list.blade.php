@extends('layouts.master')
@section('title', 'Applied Leaves')

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
	          	<div class="col-lg-12">
	            
		          	<div class="card card-primary">
		              <div class="card-header">
		                	<h5 class="m-0"><strong><i class="fas fa-walking"></i> APPLIED LEAVES</strong></h5>
		              </div>
		              <div class="card-body">
	                	
	                	<input type="hidden" name="" id="subscriberid" value="{{auth()->user()->subscriber_id}}">
	                    <div class="pt-3">
	                    	<div class="table-responsive">
								<table id="leave_table" class="table table-bordered" width="100%">
								    <thead>
								        <tr>
							        		<th width="5%">#</th>
								            <th width="20%">Employee Name</th>
								            <th width="10%">Leave Type</th>
								            <th width="10%">Start Date</th>
								            <th width="10%">End Date</th>
								            <th width="15%">Note</th>
								            <th width="10%">Status</th>
								            <th width="10%">Action</th>
								        </tr>
								    </thead>
								    <tbody>

								    </tbody>
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


<!-- Edit LEAVE Modal -->
<div class="modal fade" id="EDITLeaveApplyMODAL" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"><strong>APPROVE LEAVE</strong></h5>	        
      </div>


      <!-- Update LEAVE Form -->
      <form id="UPDATELeaveApplyFORM" enctype="multipart/form-data">
      	
      	<input type="hidden" name="_method" value="PUT">
			<input type="hidden" name="_token" value="{{ csrf_token() }}">
      	
      	<div class="modal-body">

      		<input type="hidden" name="leaveid" id="leaveid">

      		<div class="form-group mb-3">
      			<label>Start Date<span class="text-danger"><strong>*</strong></span></label>
      			<input type="date" id="edit_startdate" name="startdate" class="form-control w-50">
				<h6 class="text-danger pt-1" id="edit_wrongstartdate" style="font-size: 14px;"></h6>
      		</div>
      		<div class="form-group mb-3">
      			<label>End Date<span class="text-danger"><strong>*</strong></span></label>
      			<input type="date" id="edit_enddate" name="enddate" class="form-control w-50">
				<h6 class="text-danger pt-1" id="edit_wrongenddate" style="font-size: 14px;"></h6>
      		</div>

      		<div class="form-group mb-3">
      			<label>Action<span class="text-danger"><strong>*</strong></span></label>
      			<select class="form-select w-50" id="edit_status" name="status" title="Select action">
				  <option value="" selected disabled>Change status</option>
				  <option value="pending">Pending</option>
				  <option value="approve">Approve</option>
				  <option value="reject">Reject</option>
				</select>
				<h6 class="text-danger pt-1" id="edit_wrongstatus" style="font-size: 14px;"></h6>
      		</div>
      		<div class="form-group mb-3">
      			<label>Note</label>
      			<textarea class="form-control w-50" id="edit_note" name="note" rows="2" placeholder="If any notes"></textarea>
      		</div>
      			       
	    </div>
	    <div class="modal-footer">
	        <button id="close" type="button" class="btn btn-outline-danger" data-dismiss="modal">Close</button>
	        <button type="submit" class="btn btn-primary">Update</button>
	    </div>
      </form>
      <!-- End Update LEAVE Form -->

    </div>
  </div>
</div>
<!-- End Edit LEAVE Modal -->


@endsection

@section('script')
<script type="text/javascript" src="js/leave-apply.js"></script>
<script type="text/javascript">

	$(document).on('click', '#close', function (e) {
		$('#EDITLeaveApplyMODAL').modal('hide');
		$('#edit_wrongstartdate').empty();
		$('#edit_wrongenddate').empty();
		$('#edit_wrongstatus').empty();
	});

	
</script>

@endsection


	
