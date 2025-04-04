@extends('layouts.master')
@section('title', 'Default Brands')

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
		                	<h5 class="m-0"><strong><i class="fas fa-clone"></i> DEFAULT BRANDS</strong></h5>
		              </div>
		              <div class="card-body">
		                <!-- <h6 class="card-title">Special title treatment</h6> -->
		                <!-- Table -->

	                	<a href="/brand-create"><button type="button" class="btn btn-outline-info"><i class="fas fa-plus"></i> Create Brand</button></a>

	                	<input type="hidden" name="" id="subscriberid" value="{{auth()->user()->subscriber_id}}">
	                    <div class="pt-3">
	                    	<div class="table-responsive">
													<table id="default_brand_table" class="display" width="100%">
												    <thead>
												        <tr>
											            <th>#</th>
											            <th>Name</th>
											            <th>Origin</th>
											            <th>Logo</th>
											            {{-- <th>Action</th> --}}
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

<!-- Edit Brand Modal -->
<div class="modal fade" id="EDITBrandMODAL" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"><strong>UPDATE BRAND</strong></h5>
      </div>


      <!-- Update Brand Form -->
      <form id="UPDATEBrandFORM" enctype="multipart/form-data">

      	<input type="hidden" name="_method" value="PUT">
			<input type="hidden" name="_token" value="{{ csrf_token() }}">

      	<div class="modal-body">

      		<input type="hidden" name="brandid" id="brandid">

      		<div class="form-group mb-3">
      			<label>Brand Name<span class="text-danger"><strong>*</strong></span></label>
      			<input type="text" id="edit_brandname" name="brandname" class="form-control">
      			<h6 class="text-danger pt-1" id="edit_wrongbrandname" style="font-size: 14px;"></h6>
      		</div>
      		<div class="form-group mb-3 pt-3">
      			<img src="" alt="Brnad image" width="100px" height="100px" alt="image" class="rounded-circle pb-3" name="brandimage" id="edit_brandimage">
      			<label>Brand Logo</label>
      			<input type="file" id="edit_brandlogo" name="brandlogo" class="form-control">
      		</div>
      		<div class="form-group mb-3 pt-3">
      			<label>Brand Origin<span class="text-danger"><strong>*</strong></span></label>
      				<select class="selectpicker countrypicker form-control" data-live-search="true" name="brandorigin" id="edit_brandorigin">
					       <option value="Select Country" disabled selected>Select Country</option>
					       <!-- <option value="">None</option> -->
							   <option value="Afganistan">Afghanistan</option>
							   <option value="Albania">Albania</option>
							   <option value="Algeria">Algeria</option>
							   <option value="American Samoa">American Samoa</option>
							   <option value="Andorra">Andorra</option>
							   <option value="Angola">Angola</option>
							   <option value="Anguilla">Anguilla</option>
							   <option value="Antigua & Barbuda">Antigua & Barbuda</option>
							   <option value="Argentina">Argentina</option>
							   <option value="Armenia">Armenia</option>
							   <option value="Aruba">Aruba</option>
							   <option value="Australia">Australia</option>
							   <option value="Austria">Austria</option>
							   <option value="Azerbaijan">Azerbaijan</option>
							   <option value="Bahamas">Bahamas</option>
							   <option value="Bahrain">Bahrain</option>
							   <option value="Bangladesh">Bangladesh</option>
							   <option value="Barbados">Barbados</option>
							   <option value="Belarus">Belarus</option>
							   <option value="Belgium">Belgium</option>
							   <option value="Belize">Belize</option>
							   <option value="Benin">Benin</option>
							   <option value="Bermuda">Bermuda</option>
							   <option value="Bhutan">Bhutan</option>
							   <option value="Bolivia">Bolivia</option>
							   <option value="Bonaire">Bonaire</option>
							   <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
							   <option value="Botswana">Botswana</option>
							   <option value="Brazil">Brazil</option>
							   <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
							   <option value="Brunei">Brunei</option>
							   <option value="Bulgaria">Bulgaria</option>
							   <option value="Burkina Faso">Burkina Faso</option>
							   <option value="Burundi">Burundi</option>
							   <option value="Cambodia">Cambodia</option>
							   <option value="Cameroon">Cameroon</option>
							   <option value="Canada">Canada</option>
							   <option value="Canary Islands">Canary Islands</option>
							   <option value="Cape Verde">Cape Verde</option>
							   <option value="Cayman Islands">Cayman Islands</option>
							   <option value="Central African Republic">Central African Republic</option>
							   <option value="Chad">Chad</option>
							   <option value="Channel Islands">Channel Islands</option>
							   <option value="Chile">Chile</option>
							   <option value="China">China</option>
							   <option value="Christmas Island">Christmas Island</option>
							   <option value="Cocos Island">Cocos Island</option>
							   <option value="Colombia">Colombia</option>
							   <option value="Comoros">Comoros</option>
							   <option value="Congo">Congo</option>
							   <option value="Cook Islands">Cook Islands</option>
							   <option value="Costa Rica">Costa Rica</option>
							   <option value="Cote DIvoire">Cote DIvoire</option>
							   <option value="Croatia">Croatia</option>
							   <option value="Cuba">Cuba</option>
							   <option value="Curaco">Curacao</option>
							   <option value="Cyprus">Cyprus</option>
							   <option value="Czech Republic">Czech Republic</option>
							   <option value="Denmark">Denmark</option>
							   <option value="Djibouti">Djibouti</option>
							   <option value="Dominica">Dominica</option>
							   <option value="Dominican Republic">Dominican Republic</option>
							   <option value="East Timor">East Timor</option>
							   <option value="Ecuador">Ecuador</option>
							   <option value="Egypt">Egypt</option>
							   <option value="El Salvador">El Salvador</option>
							   <option value="Equatorial Guinea">Equatorial Guinea</option>
							   <option value="Eritrea">Eritrea</option>
							   <option value="Estonia">Estonia</option>
							   <option value="Ethiopia">Ethiopia</option>
							   <option value="Falkland Islands">Falkland Islands</option>
							   <option value="Faroe Islands">Faroe Islands</option>
							   <option value="Fiji">Fiji</option>
							   <option value="Finland">Finland</option>
							   <option value="France">France</option>
							   <option value="French Guiana">French Guiana</option>
							   <option value="French Polynesia">French Polynesia</option>
							   <option value="French Southern Ter">French Southern Ter</option>
							   <option value="Gabon">Gabon</option>
							   <option value="Gambia">Gambia</option>
							   <option value="Georgia">Georgia</option>
							   <option value="Germany">Germany</option>
							   <option value="Ghana">Ghana</option>
							   <option value="Gibraltar">Gibraltar</option>
							   <option value="Great Britain">Great Britain</option>
							   <option value="Greece">Greece</option>
							   <option value="Greenland">Greenland</option>
							   <option value="Grenada">Grenada</option>
							   <option value="Guadeloupe">Guadeloupe</option>
							   <option value="Guam">Guam</option>
							   <option value="Guatemala">Guatemala</option>
							   <option value="Guinea">Guinea</option>
							   <option value="Guyana">Guyana</option>
							   <option value="Haiti">Haiti</option>
							   <option value="Hawaii">Hawaii</option>
							   <option value="Honduras">Honduras</option>
							   <option value="Hong Kong">Hong Kong</option>
							   <option value="Hungary">Hungary</option>
							   <option value="Iceland">Iceland</option>
							   <option value="Indonesia">Indonesia</option>
							   <option value="India">India</option>
							   <option value="Iran">Iran</option>
							   <option value="Iraq">Iraq</option>
							   <option value="Ireland">Ireland</option>
							   <option value="Isle of Man">Isle of Man</option>
							   <option value="Israel">Israel</option>
							   <option value="Italy">Italy</option>
							   <option value="Jamaica">Jamaica</option>
							   <option value="Japan">Japan</option>
							   <option value="Jordan">Jordan</option>
							   <option value="Kazakhstan">Kazakhstan</option>
							   <option value="Kenya">Kenya</option>
							   <option value="Kiribati">Kiribati</option>
							   <option value="Korea North">Korea North</option>
							   <option value="Korea Sout">Korea South</option>
							   <option value="Kuwait">Kuwait</option>
							   <option value="Kyrgyzstan">Kyrgyzstan</option>
							   <option value="Laos">Laos</option>
							   <option value="Latvia">Latvia</option>
							   <option value="Lebanon">Lebanon</option>
							   <option value="Lesotho">Lesotho</option>
							   <option value="Liberia">Liberia</option>
							   <option value="Libya">Libya</option>
							   <option value="Liechtenstein">Liechtenstein</option>
							   <option value="Lithuania">Lithuania</option>
							   <option value="Luxembourg">Luxembourg</option>
							   <option value="Macau">Macau</option>
							   <option value="Macedonia">Macedonia</option>
							   <option value="Madagascar">Madagascar</option>
							   <option value="Malaysia">Malaysia</option>
							   <option value="Malawi">Malawi</option>
							   <option value="Maldives">Maldives</option>
							   <option value="Mali">Mali</option>
							   <option value="Malta">Malta</option>
							   <option value="Marshall Islands">Marshall Islands</option>
							   <option value="Martinique">Martinique</option>
							   <option value="Mauritania">Mauritania</option>
							   <option value="Mauritius">Mauritius</option>
							   <option value="Mayotte">Mayotte</option>
							   <option value="Mexico">Mexico</option>
							   <option value="Midway Islands">Midway Islands</option>
							   <option value="Moldova">Moldova</option>
							   <option value="Monaco">Monaco</option>
							   <option value="Mongolia">Mongolia</option>
							   <option value="Montserrat">Montserrat</option>
							   <option value="Morocco">Morocco</option>
							   <option value="Mozambique">Mozambique</option>
							   <option value="Myanmar">Myanmar</option>
							   <option value="Nambia">Nambia</option>
							   <option value="Nauru">Nauru</option>
							   <option value="Nepal">Nepal</option>
							   <option value="Netherland Antilles">Netherland Antilles</option>
							   <option value="Netherlands">Netherlands (Holland, Europe)</option>
							   <option value="Nevis">Nevis</option>
							   <option value="New Caledonia">New Caledonia</option>
							   <option value="New Zealand">New Zealand</option>
							   <option value="Nicaragua">Nicaragua</option>
							   <option value="Niger">Niger</option>
							   <option value="Nigeria">Nigeria</option>
							   <option value="Niue">Niue</option>
							   <option value="Norfolk Island">Norfolk Island</option>
							   <option value="Norway">Norway</option>
							   <option value="Oman">Oman</option>
							   <option value="Pakistan">Pakistan</option>
							   <option value="Palau Island">Palau Island</option>
							   <option value="Palestine">Palestine</option>
							   <option value="Panama">Panama</option>
							   <option value="Papua New Guinea">Papua New Guinea</option>
							   <option value="Paraguay">Paraguay</option>
							   <option value="Peru">Peru</option>
							   <option value="Phillipines">Philippines</option>
							   <option value="Pitcairn Island">Pitcairn Island</option>
							   <option value="Poland">Poland</option>
							   <option value="Portugal">Portugal</option>
							   <option value="Puerto Rico">Puerto Rico</option>
							   <option value="Qatar">Qatar</option>
							   <option value="Republic of Montenegro">Republic of Montenegro</option>
							   <option value="Republic of Serbia">Republic of Serbia</option>
							   <option value="Reunion">Reunion</option>
							   <option value="Romania">Romania</option>
							   <option value="Russia">Russia</option>
							   <option value="Rwanda">Rwanda</option>
							   <option value="St Barthelemy">St Barthelemy</option>
							   <option value="St Eustatius">St Eustatius</option>
							   <option value="St Helena">St Helena</option>
							   <option value="St Kitts-Nevis">St Kitts-Nevis</option>
							   <option value="St Lucia">St Lucia</option>
							   <option value="St Maarten">St Maarten</option>
							   <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
							   <option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
							   <option value="Saipan">Saipan</option>
							   <option value="Samoa">Samoa</option>
							   <option value="Samoa American">Samoa American</option>
							   <option value="San Marino">San Marino</option>
							   <option value="Sao Tome & Principe">Sao Tome & Principe</option>
							   <option value="Saudi Arabia">Saudi Arabia</option>
							   <option value="Senegal">Senegal</option>
							   <option value="Seychelles">Seychelles</option>
							   <option value="Sierra Leone">Sierra Leone</option>
							   <option value="Singapore">Singapore</option>
							   <option value="Slovakia">Slovakia</option>
							   <option value="Slovenia">Slovenia</option>
							   <option value="Solomon Islands">Solomon Islands</option>
							   <option value="Somalia">Somalia</option>
							   <option value="South Africa">South Africa</option>
							   <option value="Spain">Spain</option>
							   <option value="Sri Lanka">Sri Lanka</option>
							   <option value="Sudan">Sudan</option>
							   <option value="Suriname">Suriname</option>
							   <option value="Swaziland">Swaziland</option>
							   <option value="Sweden">Sweden</option>
							   <option value="Switzerland">Switzerland</option>
							   <option value="Syria">Syria</option>
							   <option value="Tahiti">Tahiti</option>
							   <option value="Taiwan">Taiwan</option>
							   <option value="Tajikistan">Tajikistan</option>
							   <option value="Tanzania">Tanzania</option>
							   <option value="Thailand">Thailand</option>
							   <option value="Togo">Togo</option>
							   <option value="Tokelau">Tokelau</option>
							   <option value="Tonga">Tonga</option>
							   <option value="Trinidad & Tobago">Trinidad & Tobago</option>
							   <option value="Tunisia">Tunisia</option>
							   <option value="Turkey">Turkey</option>
							   <option value="Turkmenistan">Turkmenistan</option>
							   <option value="Turks & Caicos Is">Turks & Caicos Is</option>
							   <option value="Tuvalu">Tuvalu</option>
							   <option value="Uganda">Uganda</option>
							   <option value="United Kingdom">United Kingdom</option>
							   <option value="Ukraine">Ukraine</option>
							   <option value="United Arab Erimates">United Arab Emirates</option>
							   <option value="United States of America">United States of America</option>
							   <option value="Uraguay">Uruguay</option>
							   <option value="Uzbekistan">Uzbekistan</option>
							   <option value="Vanuatu">Vanuatu</option>
							   <option value="Vatican City State">Vatican City State</option>
							   <option value="Venezuela">Venezuela</option>
							   <option value="Vietnam">Vietnam</option>
							   <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
							   <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
							   <option value="Wake Island">Wake Island</option>
							   <option value="Wallis & Futana Is">Wallis & Futana Is</option>
							   <option value="Yemen">Yemen</option>
							   <option value="Zaire">Zaire</option>
							   <option value="Zambia">Zambia</option>
							   <option value="Zimbabwe">Zimbabwe</option>
					    </select>
      				<h6 class="text-danger pt-1" id="edit_wrongbrandorigin" style="font-size: 14px;"></h6>

      		</div>

	    </div>
	    <div class="modal-footer">
	        <button id="close" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
	        <button type="submit" class="btn btn-primary">Update</button>
	    </div>
      </form>
      <!-- End Update Brand Form -->

    </div>
  </div>
</div>
<!-- End Edit Brand Modal -->

<!-- Delete Modal -->

<div class="modal fade" id="DELETEBrandMODAL" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  	<div class="modal-dialog" role="document">
    	<div class="modal-content">

			<form id="DELETEBrandFORM" method="POST" enctype="multipart/form-data">

					{{ csrf_field() }}
					{{ method_field('DELETE') }}


			    <div class="modal-body">
			    	<input type="hidden" name="" id="brandid">
			      <h5 class="text-center">Are you sure you want to delete?</h5>
			    </div>

			    <div class="modal-footer justify-content-center">
			        <button type="button" class="cancel btn btn-secondary cancel_btn" data-dismiss="modal">Cancel</button>
			        <button type="submit" class="delete btn btn-danger">Yes</button>
			    </div>

			</form>

		</div>
	</div>
</div>

<!-- END Delete Modal -->

@endsection

@section('script')
<script type="text/javascript" src="js/brand.js"></script>
<script type="text/javascript">

	$(document).on('click', '#close', function (e) {
		$('#EDITBrandMODAL').modal('hide');
	});

	$(document).on('click', '.cancel_btn', function (e) {
		$('#DELETEBrandMODAL').modal('hide');
	});
</script>

@endsection



