@extends('layouts.master')
@section('title', 'Create Product')

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
			<div class="row" id="form_div">
				<form id="AddProductForm" method="POST" enctype="multipart/form-data">
					{{ csrf_field() }}
					<div class="row">
		      			<div class="col-lg-8">

		          			<div class="card card-info">
					            <div class="card-header">
					                <h5 class="m-0"><strong>INFO</strong> <i class="fas fa-info-circle float-right"></i></h5>
					            </div>

				              	<div class="card-body">
			          				<div class="container">

			          					<div class="row">  <!-- --------------------------row--------------------------- -->
											<div class="col-4">
												<div class="mb-3">
												    <label for="productname" class="form-label" style="font-weight: normal;">Product Name<span class="text-danger"><strong>*</strong></span></label>
												    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="text" name="productname" id="productname" placeholder="e.g. Napa">
									    			<h6 class="text-danger pt-1" id="wrongproductname" style="font-size: 14px;"></h6>

											  	</div>
											</div>

											<div class="col-4">
												<div class="mb-3">
												    <label for="productlabel" class="form-label" style="font-weight: normal;">Generic Name<span class="text-danger"><strong>*</strong></span></label>
												    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="text" name="productlabel" id="productlabel" placeholder="e.g. Paracetamol">
												    <h6 class="text-danger pt-1" id="wrongproductlabel" style="font-size: 14px;"></h6>
												</div>
											</div>

											<div class="col-4">
												<div class="col-9">
													<div class="mb-3">
													    <label for="brandname" class="form-label" style="font-weight: normal;">Brand<span class="text-danger"><strong>*</strong></span></label><br>
													    <select style="width:70%" class="selectpicker border-left-0 border-right-0 border-top-0 rounded-0" name="brandname" id="brandname" data-live-search="true" title="Select brand" data-width="100%">
													      	@foreach($brands as $brand)
											            	<option value="{{ $brand->brand_name }}">{{ $brand->brand_name }}</option>
											        		@endforeach
													    </select>
													    <h6 class="text-danger pt-1" id="wrongbrandname" style="font-size: 14px;"></h6>
													</div>
												</div>

											</div>
							      		</div>

							      		<div class="row pt-3"> <!-- --------------------------row--------------------------- -->
											<div class="col-4">
												<div class="col-9">
													<div class="mb-3">
													    <label for="categoryid" class="form-label" style="font-weight: normal;">Category<span class="text-danger"><strong>*</strong></span></label><br>
													    <select style="width:70%" class="selectpicker" data-width="100%" name="categoryid"
													      id="categoryid" data-live-search="true" title="Select category">
													      <!-- <option value="" disabled>Select category</option> -->
													      	@foreach($categories as $category)
												            	<option value="{{ $category->id }}">{{ $category->category_name }}</option>
											        		@endforeach
													    </select>
													    <h6 class="text-danger pt-1" id="wrongcategoryid" style="font-size: 14px;"></h6>
												  	</div>
												</div>

											</div>

											<div class="col-4">
												<div class="col-9">
													<div class="mb-3">
													    <label for="subcategoryname" class="form-label" style="font-weight: normal;">Sub-Category</label><br>
													    <select style="width:70%" class="selectpicker" name="subcategoryname"
													      id="subcategoryname" data-live-search="true" title="Select subcategory" data-width="100%">
													      	<option value="" disabled selected>Select subcategory</option>
													    </select>
													</div>
												</div>

											</div>
							      		</div>

							      		<div class="row pt-3"> <!-- --------------------------row--------------------------- -->
											<div class="col-4">
												<div class="mb-3">
												    <label for="productsku" class="form-label" style="font-weight: normal;">SKU</label>
												    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="text" name="productsku" id="productsku" placeholder="e.g. UGG-BB-PUR-06">
											  	</div>
											</div>

											<div class="col-4">
												<div class="mb-3">
												    <label for="productbarcode" class="form-label" style="font-weight: normal;">Barcode</label>
												    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="text" name="productbarcode" id="productbarcode" placeholder="e.g. 01234 56789123">
												</div>
											</div>

											<div class="col-4">
												<div class="col-9">
													<div class="mb-3">
													    <label for="suppliername" class="form-label" style="font-weight: normal;">Supplier</label><br>
													    <select style="width:70%" class="selectpicker" data-width="100%" name="suppliername" id="suppliername" data-live-search="true" title="Select product supplier">>
													    	<option value="">Select supplier</option>
													      @foreach($suppliers as $supplier)
											            	<option value="{{ $supplier->name }}">{{ $supplier->name }}</option>
											        		@endforeach
													    </select>
													</div>
												</div>

											</div>
							      		</div>

							      		<div class="row pt-3"> <!-- --------------------------row--------------------------- -->
											<div class="col-4">
												<div class="mb-3">
												    <label for="startingstock" class="form-label" style="font-weight: normal;">Starting Stock (Leaf/Box)</label>
												    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="number" step="any" min="0.1" name="startingstock" id="startingstock" placeholder="e.g. 300">
											  	</div>
											</div>

											<div class="col-4">
												<div class="mb-3">
												    <label for="safetystock" class="form-label" style="font-weight: normal;">Safety Stock (Qty)<span class="text-danger"><strong>*</strong></span></label>
												    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="number" step="any" min="0.1" name="safety_stock" id="safetystock" placeholder="safety stock of product">
												    <h6 class="text-danger pt-1" id="wrongsafetystock" style="font-size: 14px;"></h6>
												</div>
											</div>
											<div class="col-4">
												<div class="mb-3">
												    <label for="shelf" class="form-label" style="font-weight: normal;">Shelf</label>
												    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="text" name="shelf" id="shelf" placeholder="e.g. 701">
												</div>
											</div>

							      		</div>
							      		<div class="row pt-3"> <!-- --------------------------row--------------------------- -->
											<div class="col-4">
												<div class="col-9">
													<div class="mb-3">
													    <label for="batchnumber" class="form-label" style="font-weight: normal;">Batch No.</label><br>
													    <select style="width:70%" class="selectpicker" data-width="100%" name="batchnumber" id="batchnumber" data-live-search="true" title="Select batch number">
													    	<option value="">Select batch number</option>
													      	@foreach($batches as $batch)
												            	<option value="{{ $batch->expiry_date }}">{{ $batch->batch_number }}</option>
											        		@endforeach
													    </select>
												  	</div>
												</div>

											</div>

											<div class="col-4">
												<div class="mb-3">
												    <label for="expirydate" class="form-label" style="font-weight: normal;">Expiry Date</label>
												    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="date" name="expirydate" id="expirydate" min="<?= date('Y-m-d'); ?>">
												</div>
											</div>
											<div class="col-4">
												<div class="col-9">
													<div class="mb-3">
													    <label for="boxsize" class="form-label" style="font-weight: normal;">Leaf/Box Size</label><br>
													    <select style="width:70%" class="selectpicker" data-width="100%" name="boxsize" id="boxsize" data-live-search="true" title="Select box size">
													    	<option value="">Select leaf size</option>
													      	@foreach($leaves as $leaf)
												            	<option value="{{ $leaf->total_number_of_per_box }}">{{ $leaf->leaf_type }} ({{ $leaf->total_number_of_per_box }})</option>
											        		@endforeach
													    </select>
												  	</div>
												</div>

											</div>

							      		</div>

			          				</div> <!-- container -->
								</div> <!-- card-body -->
				          	</div> <!-- card card-primary card-outline -->
						</div><!-- col-lg-8 -->

					</div> <!-- row -->

					<div class="row">
		      			<div class="col-lg-8">
		          			<br>
		          			<div class="card card-info">
					            <div class="card-header">
					                <h5 class="m-0"><strong>INVENTORY</strong> <i class="fas fa-warehouse float-right"></i></h5>
					            </div>

				              	<div class="card-body">
			          				<div class="container">

			          					<div class="row">  <!-- --------------------------row--------------------------- -->

											<div class="col-4">
												<div class="col-9">
													<div class="mb-3">
													    <label for="unit" class="form-label" style="font-weight: normal;">Unit<span class="text-danger"><strong>*</strong></span></label><br>
														<select class="selectpicker border-left-0 w-100 border-right-0 border-top-0 rounded-0" name="unit" id="unit" data-live-search="true" title="Select Unit" data-width="100%">
															@foreach($units as $unit)
															  <option value="{{ $unit->name}}">{{ $unit->name}}</option>
															@endforeach
														</select>
														<h6 class="text-danger pt-1" id="wrongunit" style="font-size: 14px;"></h6>
													</div>
												</div>
											</div>

											<div class="col-4">
												<div class="mb-3">
													    <label for="productincoming" class="form-label" style="font-weight: normal;">Product Incoming<span class="text-danger"><strong>*</strong></span></label>
													    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="number" step="any" min="0.1" name="productincoming" id="productincoming" placeholder="e.g. 300">
													    <h6 class="text-danger pt-1" id="wrongproductincoming" style="font-size: 14px;"></h6>
												</div>
											</div>
							      		</div>

							      		<div class="row">  <!-- --------------------------row--------------------------- -->

											<div class="col-4">
												<div class="mb-3">
												    <label for="mrp" class="form-label" style="font-weight: normal;">MRP<span class="text-danger"><strong>*</strong></span></label>
												    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="number" step="any" min="0.1" name="mrp" id="mrp" placeholder="e.g. 200">
												    <h6 class="text-danger pt-1" id="wrongmrp" style="font-size: 14px;"></h6>
												</div>
											</div>

											<div class="col-4">
												<div class="mb-3">
												    <label for="price" class="form-label" style="font-weight: normal;">Purchase Cost<span class="text-danger"><strong>*</strong></span></label>
												    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="number" step="any" min="0.1" name="price" id="price" placeholder="e.g. 190">
												    <h6 class="text-danger pt-1" id="wrongprice" style="font-size: 14px;"></h6>
												</div>
											</div>
											<div class="col-4">
												<div class="mb-3">
												    <label for="purchasedate" class="form-label" style="font-weight: normal;">Date<span class="text-danger"><strong>*</strong></span></label>
												    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="date" name="purchasedate" id="purchasedate">
												    <h6 class="text-danger pt-1" id="wrongpurchasedate" style="font-size: 14px;"></h6>
												</div>
											</div>
							      		</div>



			          				</div> <!-- container -->
								</div> <!-- card-body -->
				          	</div> <!-- card card-primary card-outline -->
						</div><!-- col-lg-6 -->
					</div> <!-- row -->

					<div class="row">
		      			<div class="col-lg-8">
		          			<br>
		          			<div class="card card-info">
					            <div class="card-header">
					                <h5 class="m-0"><strong>VARIANTS </strong><span>(optional)</span> <i class="fas fa-palette float-right"></i></h5>
					            </div>

				              	<div class="card-body">
			          				<div class="container">
			          					<div class="row">
			          						<div class="col-4">
												<div class="mb-3">
												    <label for="strength" class="form-label" style="font-weight: normal;">Strength</label>
												    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="text" name="strength" id="strength" placeholder="e.g. 200ml">
												</div>
											</div>
			          					</div>
							      		<div class="row">  <!-- --------------------------row--------------------------- -->

											<div class="col-7">
												<div class="mb-3 pt-3">

												    <!-- <label for="productimage" class="form-label" style="font-weight: normal;">Image</label>
												    <input id="input-b1" name="imagefile" type="file" class="file productimage" data-browse-on-zone-click="true"> -->

										   			<!-- <div class="input-group mb-3">
										   				<span class="btn btn-primary input-group-text" id="">Browse</span>
											   			<input type="text" class="form-control" placeholder="Select product image" aria-label="Select product image" aria-describedby="basic-addon2" name="productimage" id="productimage">
			  										</div> -->
			  										<!-- <div id="" class="form-text">N.B. Image can be helpful to identify your product easily.</div> -->
												</div>
											</div>



							      		</div>


			          				</div> <!-- container -->
								</div> <!-- card-body -->
				          	</div> <!-- card card-primary card-outline -->
						</div><!-- col-lg-6 -->
					</div> <!-- row -->

					<div class="row">
		      			<div class="col-lg-8">
		          			<br>
		          			<div class="card card-secondary  ">
					            <div class="card-header">
					                <h5 class="m-0"><strong>OTHERS </strong><span>(optional)</span> <i class="fas fa-percent float-right"></i></h5>
					            </div>

				              	<div class="card-body">
			          				<div class="container">

			          					<div class="row pt-3">  <!-- --------------------------row--------------------------- -->

			          						<div class="col-4">
			          							<div class="col-9">
			          								<div class="mb-3">
													    <label for="availablediscount" class="form-label" style="font-weight: normal;">Discount Availability</label><br>
													    <select style="width:70%" class="selectpicker" data-width="100%" name="availablediscount"
													      id="availablediscount" title="Discount availability">
													      <option value="">Select Availablility</option>
													      <option value="true">Yes</option>
									            		  <option value="false">No</option>
													    </select>
													</div>
			          							</div>

											</div>

											<div class="col-4">
												<div class="col-9">
													<div class="mb-3">
													    <label for="discounttype" class="form-label" style="font-weight: normal;">Discount Type</label><br>
													    <select style="width:70%" class="selectpicker" data-width="100%" name="discounttype"
													      id="discounttype" title="Discount type">
													      <option value="">Select Type</option>
													      <option value="BDT">BDT</option>
									            		  <option value="Percentage">Percentage</option>
													    </select>
													</div>
												</div>

											</div>

											<div class="col-4">
												<div class="mb-3">
												    <label for="discount" class="form-label" style="font-weight: normal;">Discount</label>
												    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="number" step="any" min="0.1" name="discount" id="discount" placeholder="e.g. 50">
												</div>
											</div>
							      		</div>

							      		<div class="row pt-3">  <!-- --------------------------row--------------------------- -->

											<div class="col-4">
												<div class="col-9">
													<div class="mb-3">
													    <label for="availableoffer" class="form-label" style="font-weight: normal;">Offer Availability</label><br>
													    <select style="width:70%" class="selectpicker" data-width="100%" name="availableoffer"
													      id="availableoffer" title="Offer availability">
													      	<option value="">Select availability</option>
													      	<option value="true">Yes</option>
									            			<option value="false">No</option>
													    </select>
													</div>
												</div>

											</div>

											<div class="col-4">
												<div class="col-9">
													<div class="mb-3">
													    <label for="offeritemid" class="form-label" style="font-weight: normal;">Offer Item</label><br>
													    <select style="width:70%" class="selectpicker" data-width="100%" name="offeritemid"
													      id="offeritemid" title="Offer product" data-live-search="true">
													      <option value="">Select item</option>
													      @foreach($products as $product)
											            	<option value="{{ $product->id }}">{{ $product->productName }}</option>
											        		@endforeach
													    </select>
													</div>
												</div>

											</div>
							      		</div>

							      		<div class="row pt-3">  <!-- --------------------------row--------------------------- -->

											<div class="col-4">
												<div class="mb-3">
												    <label for="requiredquantity" class="form-label" style="font-weight: normal;">Required Quantity</label>
												    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="number" step="any" min="0.1" name="requiredquantity" id="requiredquantity" placeholder="required qunatity e.g. 2">
												</div>
											</div>

											<div class="col-4">
												<div class="mb-3">
												    <label for="freequantity" class="form-label" style="font-weight: normal;">Free Quantity</label>
												    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="number" step="any" min="0.1" name="freequantity" id="freequantity" placeholder="free offer qunatity e.g. 1">
												</div>
											</div>
							      		</div>

							      		<div class="row pt-3">  <!-- --------------------------row--------------------------- -->
											<div class="col-4">
												<div class="col-9">
													<div class="mb-3">
													    <label for="taxname" class="form-label" style="font-weight: normal;">Tax Name</label><br>
													    <select style="width:70%" class="selectpicker" data-width="100%" name="taxname"
													      id="taxname" title="Product Tax" data-live-search="true">
													      <option value="">Select tax</option>
													      @foreach($tax as $tax)
											            	<option value="{{ $tax->taxName }}">{{ $tax->taxName }}</option>
											        		@endforeach
													    </select>
													</div>
												</div>
											</div>

											<div class="col-4">
												<div class="mb-3">
												    <label for="tax" class="form-label" style="font-weight: normal;">Tax</label>
												    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="number" step="any" min="0.1" name="tax" id="tax" placeholder="tax amount e.g. 17.5">
												</div>
											</div>

											<div class="col-4">
												<div class="col-9">
													<div class="mb-3">
													    <label for="taxexcluded" class="form-label" style="font-weight: normal;">Is Tax Excluded</label><br>
													    <select style="width:70%" data-width="100%" class="selectpicker"  aria-label="Default select example" name="taxexcluded" id="taxexcluded" title="Is tax excluded">
														  	<option value="">Select</option>
											            	<option value="true">Yes</option>
											            	<option value="false">No</option>
														</select>
													</div>
												</div>

											</div>
							      		</div>



			          				</div> <!-- container -->
								</div> <!-- card-body -->
				          	</div> <!-- card card-primary card-outline -->
						</div><!-- col-lg-6 -->
					</div> <!-- row -->

					<div class="row">
		      			<div class="col-lg-8">
		          			<br>
		          			<div class="card card-dark">
					            <div class="card-header">
					                <h5 class="m-0"><strong>STORE </strong><span>(optional)</span> <i class="fas fa-store float-right"></i></h5>
					            </div>

				              	<div class="card-body">
			          				<div class="container">
			          					<!-- <div class="form-check pb-3">
										  <input class="form-check-input" type="checkbox" value="" id="select-all">
										  <label class="form-check-label" for="flexCheckDefault">
										    The item is available for sale in all stores
										  </label>
										</div> -->
							      		 <table id="storeTable" class="table table-borderless">
										  <thead>
										    <tr>
									    		<th class="" scope="col">Available</th>
									    		<th scope="col">Store</th>
									    		<th scope="col">Quantity</th>
									    		<th scope="col">Purchase Cost</th>
									    		<!-- <th scope="col">Starting Stock</th> -->
									    		<th scope="col">Safety Stock</th>
										    </tr>
										  </thead>
										  <tbody>
										  	<div class="row">
										  		@foreach($stores as $store)
											  	<tr>
											  		<td class="pl-5 col-1"><input class="form-check-input" type="checkbox" value="{{ $store->id }}" name="storeid" id="storeid"></td>
											  		<td class="col-2">{{ $store->store_name }}</td>
											  		<td class="col-1"><input class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="number" step="any" min="0.1" value="" id="" placeholder=""></td>
											  		<td class="col-1"><input class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="number" step="any" min="0.1" value="" id="" placeholder=""></td>
											  		<!-- <td class="col-1"><input class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="number" step="any" min="0.1" value="" id="" placeholder=""></td> -->
											  		<td class="col-1"><input class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="number" step="any" min="0.1" value="" id="" placeholder=""></td>
											  	</tr>
											  	@endforeach
										  	</div>
										  </tbody>
										</table>

			          				</div> <!-- container -->
								</div> <!-- card-body -->
				          	</div> <!-- card card-primary card-outline -->




						</div><!-- col-lg-6 -->

					</div> <!-- row -->
					<div class="row mb-3">
						<div class="col-8">
							<button class="cancel_btn btn btn-secondary btn-lg float-left" type="button" name="">CANCEL</button>
							<div class="float-right">
							  <button class="btn btn-outline-danger btn-lg " type="reset" name="" onclick="resetButton()">Reset</button>
							  <button id="save" type="submit" onclick="productSubmitToServer();" class="btn btn-primary btn-lg"  name="">SAVE</button>
						  	</div>
						</div>
					</div>

				</form>
			</div>
    	</div>
	</div>
</div>

<!-- Image Modal -->
<div class="modal fade" id="ImageModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"></h5>
      </div>


      <!-- Image Form -->
      <form id="ImageFORM" enctype="multipart/form-data">

      	<!-- <input type="hidden" name="_method" value="PUT"> -->
			<input type="hidden" name="_token" value="{{ csrf_token() }}">

      	<div class="modal-body">
      		<div class="form-group mb-3">
	   			<input id="input-b1" name="imagefile" type="file" class="file" data-browse-on-zone-click="true">
      		</div>
	    </div>

	    <div class="modal-footer">
	        <button id="close" type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
	        <button type="submit" class="btn btn-primary">Save</button>
	    </div>
      </form>
      <!-- End Form -->

    </div>
  </div>
</div>
<!-- End Modal -->



@endsection

@section('script')
<script type="text/javascript" src="js/product-new.js"></script>


<script type="text/javascript">

	// var productId = $('#productid').val();
	// fetchProduct(productId);

$(document).ready(function() {
    $('#select-all').click(function() {
        $('input[type="checkbox"]').prop('checked', this.checked);
    })
});



$(document).on('change', '#categoryid', function (e) {
		e.preventDefault();

		// alert($('#categoryid').val());

		var categoryId = $(this).val();
		// alert(categoryId);

				$.ajax({
					type: "GET",
					url: "/product-create/"+categoryId,
					success: function(response){
						// console.log(response.subcategory);

						$('select[name="subcategoryname"]').empty();
					    $('select[name="subcategoryname"]').append('<option value="">Select subcategory</option>');
					    $.each(response.subcategory, function(key, item){
					         $('select[name="subcategoryname"]').append('<option value="'+ item.id +'">'+ item.subcategory_name +'</option>');
					    });

					    $('#subcategoryname').appendTo('#subcategoryname').selectpicker('refresh');
					}
				});
		});



	$(document).on('change', '#taxname', function (e) {
		e.preventDefault();

		var taxId = $(this).val();
		// alert(taxId);

				$.ajax({
					type: "GET",
					url: "/product-create-tax/"+taxId,
					success: function(response){
						$('#tax').val(response.tax[0].taxAmount);

						if(response.tax[0].vatType == "included"){
							// alert('false')
							$("#taxexcluded").val('false').change();;
						}else{
							// alert('true')
							$("#taxexcluded").val('true').change();;
						}
					}
				});
		});


	// $(document).on('click', '#productimageb', function (e) {
	// 	e.preventDefault();

	// 	$('#ImageModal').modal('show');

	// });

	// $(document).on('click', '#close', function (e) {
	// 	$('#ImageModal').modal('hide');
	// });

	$(document).on('click', '.cancel_btn', function (e) {
		$(location).attr('href','/product-list');
	});







</script>

@endsection
