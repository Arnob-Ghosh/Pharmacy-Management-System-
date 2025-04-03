@extends('layouts.master')
@section('title', 'Attendance')

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
      			<div class="col-lg-12">
          			<div class="card card-primary">
			            <div class="card-header">
			                <h5 class="m-0"><strong><i class="far fa-calendar-alt"></i> EMPLOYEE REPORTS</strong></h5>
			            </div>

		              	<div class="card-body">
	          				<!-- <div class="container"> -->


	          					<div class="row">
                                    <div class="col-2">
                                        <div class="form-group">
                                            <label for="month" class="form-label" style="font-weight: normal;">Select Month<span class="text-danger"><strong>*</strong></span></label>
                                            <select class="selectpicker" data-width="100%" data-live-search="true" title="Select Month" name="month" id="month">
                                                <!-- <option value="option_select" disabled selected>Select Month</option> -->
                                                <option value="01">January</option>
                                                <option value="02">February</option>
                                                <option value="03">Macrh</option>
                                                <option value="04">April</option>
                                                <option value="05">May</option>
                                                <option value="06">June</option>
                                                <option value="07">July</option>
                                                <option value="08">August</option>
                                                <option value="09">September</option>
                                                <option value="10">October</option>
                                                <option value="11">November</option>
                                                <option value="12">December</option>
                                            </select>

                                            <h6 class="text-danger pt-1" id="wrong_month" style="font-size: 14px;"></h6>

                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="form-group" style="padding-top: 31px;">
                                            <button id="gen_btn" onclick="collection()" type="button" class="btn btn-primary">Generate</button>
                                            <button type="reset" value="Reset" class="btn btn-outline-danger" onclick="resetButton()"><i class="fas fa-eraser"></i> Reset</button>

                                        </div>
                                    </div>
	          						<div class="col-12">
				                    	<div class="table-responsive pt-3">
											<table id="employeereports_table" class="table table-bordered" width="100%">
											    <thead>
											        <tr>

											            <th width="10%">Employee</th>
											            <th width="12%">Designation</th>
											            <th width="10%">Department</th>
											            <th width="10%">Present</th>
											            <th width="12%">Absent</th>
                                                        <th width="12%">late In</th>


											        </tr>
											    </thead>
											    <tbody>

											    </tbody>
									    	</table>
									  	</div>
									</div>
	          					</div>




							<!-- </div> container -->
						</div> <!-- card-body -->
		          	</div> <!-- card card-primary card-outline -->
      			</div> <!-- col-lg-5 -->
      		</div> <!-- row -->
		</div> <!-- container-fluid -->
	</div> <!-- content -->

</div> <!-- content-wrapper -->

@endsection

@section('script')
<script type="text/javascript" src="js/employee_reports.js"></script>

@endsection
