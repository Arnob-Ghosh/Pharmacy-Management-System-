@extends('layouts.master')
@section('title', 'Edit Product')

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
				<form id="EditProductForm" method="" enctype="multipart/form-data">
				{{ csrf_field() }}
					<input type="hidden" name="_method" value="PUT">
					<input type="hidden" name="_token" value="{{ csrf_token() }}">

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
												    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="text" name="productname" id="edit_productname">
									    			<h6 class="text-danger pt-1" id="edit_wrongproductname" style="font-size: 14px;"></h6>

											  	</div>
											</div>

											<div class="col-4">
												<div class="mb-3">
												    <label for="productlabel" class="form-label" style="font-weight: normal;">Generic Name<span class="text-danger"><strong>*</strong></span></label>
												    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="" name="productlabel" id="edit_productlabel">
												    <h6 class="text-danger pt-1" id="edit_wrongproductlabel" style="font-size: 14px;"></h6>

												</div>
											</div>

											<div class="col-4">
												<div class="col-9">
													<div class="mb-3">
													    <label for="productbrand" class="form-label" style="font-weight: normal;">Brand<span class="text-danger"><strong>*</strong></span></label><br>
													    <select style="width:70%" class="selectpicker" data-width="100%" data-width="100%" data-live-search="true" name="productbrand"
													      id="edit_productbrand">
													      <option value="option_select" disabled selected>Select Brand</option>
													      	@foreach($brands as $brand)
											            	<option value="{{ $brand->brand_name }}">
											            		{{ $brand->brand_name }}
											            	</option>
											        		@endforeach
													    </select>
													    <h6 class="text-danger pt-1" id="edit_wrongbrandname" style="font-size: 14px;"></h6>
													</div>
												</div>

											</div>
							      		</div>

							      		<div class="row pt-3"> <!-- --------------------------row--------------------------- -->
											<div class="col-4">
												<div class="col-9">
													<div class="mb-3">
													    <label for="categoryid" class="form-label" style="font-weight: normal;">Category<span class="text-danger"><strong>*</strong></span></label><br>
													    <select style="width:70%" class="selectpicker" data-width="100%" data-live-search="true" name="categoryid"
													      id="edit_categoryid">
													      <option value="option_select" disabled selected>Select category</option>
													      	@foreach($categories as $category)
												            	<option value="{{ $category->id }}">{{ $category->category_name }}</option>
											        		@endforeach
													    </select>
													    <h6 class="text-danger pt-1" id="edit_wrongcategoryid" style="font-size: 14px;"></h6>
												  	</div>
												</div>

											</div>

											<div class="col-4">
												<div class="col-9">
													<div class="mb-3">
													    <label for="subcategoryname" class="form-label" style="font-weight: normal;">Sub-Category</label><br>
													    <select style="width:70%" class="selectpicker" data-width="100%" name="subcategoryname"
													      id="edit_subcategoryname" data-live-search="true">
													      <option value="" disabled selected>Select subcategory</option>
													      @foreach($subcategories as $subcategory)
												            	<option value="{{ $subcategory->id }}">{{ $subcategory->subcategory_name }}</option>
											        		@endforeach
													    </select>
													</div>
												</div>

											</div>
							      		</div>

							      		<div class="row pt-3"> <!-- --------------------------row--------------------------- -->
											<div class="col-4">
												<div class="mb-3">
												    <label for="sku" class="form-label" style="font-weight: normal;">SKU</label>
												    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="text" name="sku" id="edit_sku" placeholder="e.g. UGG-BB-PUR-06">
											  	</div>
											</div>

											<div class="col-4">
												<div class="mb-3">
												    <label for="barcode" class="form-label" style="font-weight: normal;">Barcode</label>
												    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="text" name="barcode" id="edit_barcode" placeholder="e.g. 01234 56789123">
												</div>
											</div>

											<div class="col-4">
												<div class="col-9">
													<div class="mb-3">
													    <label for="supplier" class="form-label" style="font-weight: normal;">Supplier</label><br>
													    <select style="width:70%" class="selectpicker" data-width="100%" data-live-search="true" name="supplier"
													      id="edit_supplier">
													      <option value="">Select supplier</option>
													      @foreach($suppliers as $supplier)
											            	<option value="{{ $supplier->name }}">
											            		{{ $supplier->name }}
											            	</option>
											        		@endforeach
													    </select>
													</div>
												</div>

											</div>
							      		</div>

							      		<div class="row pt-3"> <!-- --------------------------row--------------------------- -->
											<div class="col-4">
												<div class="mb-3">
												    <label for="startingstock" class="form-label" style="font-weight: normal;">Starting Stock (Box)<span class="text-danger"><strong>*</strong></span></label>
												    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="number" step="any" min="0.0" name="startingstock" id="edit_startingstock">
												    <h6 class="text-danger pt-1" id="edit_wrongstartingstock" style="font-size: 14px;"></h6>
											  	</div>
											</div>

											<div class="col-4">
												<div class="mb-3">
												    <label for="safetystock" class="form-label" style="font-weight: normal;">Safety Stock (Qty)</label>
												    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="number" step="any" min="0.0" name="safetystock" id="edit_safetystock">
												</div>
											</div>
											<div class="col-4">
												<div class="mb-3">
												    <label for="shelf" class="form-label" style="font-weight: normal;">Shelf</label>
												    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="text" name="shelf" id="edit_shelf" placeholder="Enter shelf number">
												</div>
											</div>

							      		</div>
							      		<div class="row pt-3"> <!-- --------------------------row--------------------------- -->
											<div class="col-4">
												<div class="col-9">
													<div class="mb-3">
													    <label for="batchnumber" class="form-label" style="font-weight: normal;">Batch No.</label><br>
													    <select style="width:70%" class="selectpicker" data-width="100%" name="batchnumber" id="edit_batchnumber" data-live-search="true" title="Select batch number">
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
												    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="date" name="expirydate" id="edit_expirydate">
												</div>
											</div>
											<div class="col-4">
												<div class="col-9">
													<div class="mb-3">
													    <label for="boxsize" class="form-label" style="font-weight: normal;">Box Size</label><br>
													    <select style="width:70%" class="selectpicker" data-width="100%" name="boxsize" id="edit_boxsize" data-live-search="true" title="Select box size">
													    	<option value="">Select box size</option>
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
						</div><!-- col-lg-6 -->
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
														<select style="width:70%" class="selectpicker" data-width="100%" data-live-search="true" data-live-search="true" aria-label="Default select example" name="unit" id="edit_unit">

																@foreach($units as $unit)
																  <option value="{{ $unit->name}}">{{ $unit->name}}</option>
																@endforeach

														</select>
														<h6 class="text-danger pt-1" id="edit_wrongunit" style="font-size: 14px;"></h6>

													</div>
												</div>

											</div>
											<div class="col-4">
												<div class="mb-3">
													    <label for="productincoming" class="form-label" style="font-weight: normal;">Product Incoming<span class="text-danger"><strong>*</strong></span></label>
													    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="number" step="any" min="0.0" name="productincoming" id="edit_productincoming" placeholder="Enter prdoduct incoming number">
													    <h6 class="text-danger pt-1" id="edit_wrongproductincoming" style="font-size: 14px;"></h6>

												</div>
											</div>
							      		</div>


							      		<div class="row">  <!-- --------------------------row--------------------------- -->

											<div class="col-4">
												<div class="mb-3">
												    <label for="sellingprice" class="form-label" style="font-weight: normal;">MRP<span class="text-danger"><strong>*</strong></span></label>
												    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="number" step="any" min="0.0" name="sellingprice" id="edit_sellingprice">
												    <h6 class="text-danger pt-1" id="edit_wrongmrp" style="font-size: 14px;"></h6>

												</div>
											</div>

											<div class="col-4">
												<div class="mb-3">
												    <label for="purchasecost" class="form-label" style="font-weight: normal;">Purchase Cost<span class="text-danger"><strong>*</strong></span></label>
												    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="number" step="any" min="0.0" name="purchasecost" id="edit_purchasecost">
												    <h6 class="text-danger pt-1" id="edit_wrongprice" style="font-size: 14px;"></h6>

												</div>
											</div>
											<div class="col-4">
												<div class="mb-3">
												    <label for="purchasedate" class="form-label" style="font-weight: normal;">Date<span class="text-danger"><strong>*</strong></span></label>
												    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="date" name="purchasedate" id="edit_purchasedate">
												    <h6 class="text-danger pt-1" id="edit_wrongpurchasedate" style="font-size: 14px;"></h6>

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
												    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="text" name="strength" id="edit_strength" placeholder="e.g. 200ml">
												</div>
											</div>
			          					</div>

							      		<div class="row">  <!-- --------------------------row--------------------------- -->

											<div class="col-4">
												<div class="mb-3 pt-3">
												    <!-- label for="productimage" class="form-label" style="font-weight: normal;">Image</label>
												    <img src="" alt="product image" width="100px" height="100px" alt="image" class="rounded-circle pb-3" name="image" id="edit_image"> -->

												   <!--  <input id="input-b1" name="imagefile" type="file" class="file productimage" data-browse-on-zone-click="true"> -->
										   			<!-- <input type="file" style="" class="form-control" name="productimage" id="edit_productimage"> -->
										   			<!-- <div class="input-group mb-3">
										   				<span class="btn btn-primary input-group-text" id="productimageb">Browse</span>
											   			<input type="text" class="form-control" placeholder="Update product image" aria-label="Select product image" aria-describedby="basic-addon2" name="productimage" id="edit_productimage" disabled>
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

			          					<div class="row">  <!-- --------------------------row--------------------------- -->

			          						<div class="col-4">
			          							<div class="col-9">
			          								<div class="mb-3">
													    <label for="availablediscount" class="form-label" style="font-weight: normal;">Discount Availability</label><br>
													    <select style="width:70%" class="selectpicker" data-width="100%" name="availablediscount"
													      id="edit_availablediscount" title="Discount availability">
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
													    <select style="width:70%" class="selectpicker" data-width="100%"  name="discounttype"
													      id="edit_discounttype" title="Discount type">
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
												    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" data-live-search="true" type="number" step="any" min="0.0" name="discount" id="edit_discount" placeholder="e.g. 50">
												</div>
											</div>
							      		</div>

							      		<div class="row">  <!-- --------------------------row--------------------------- -->

											<div class="col-4">
												<div class="col-9">
													<div class="mb-3">
													    <label for="availableoffer" class="form-label" style="font-weight: normal;">Offer Availability</label><br>
													    <select style="width:70%" class="selectpicker" data-width="100%"  name="availableoffer"
													      id="edit_availableoffer" title="Offer availability">
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
													    <select style="width:70%" class="selectpicker" data-width="100%" data-live-search="true" name="offeritemid"
													      id="edit_offeritemid" title="Offer product">
													      <option value="">Select item</option>
													      @foreach($products as $product)
											            	<option value="{{ $product->id }}">
											            		{{ $product->productName }}
											            	</option>
											        		@endforeach
													    </select>
													</div>
												</div>

											</div>
							      		</div>

							      		<div class="row">  <!-- --------------------------row--------------------------- -->

											<div class="col-4">
												<div class="mb-3">
												    <label for="requiredquantity" class="form-label" style="font-weight: normal;">Required Quantity</label>
												    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="number" step="any" min="0.0" name="requiredquantity" id="edit_requiredquantity" placeholder="required qunatity e.g. 2">
												</div>
											</div>

											<div class="col-4">
												<div class="mb-3">
												    <label for="freequantity" class="form-label" style="font-weight: normal;">Free Quantity</label>
												    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="number" step="any" min="0.0" name="freequantity" id="edit_freequantity" placeholder="free offer qunatity e.g. 1">
												</div>
											</div>
							      		</div>

							      		<div class="row">  <!-- --------------------------row--------------------------- -->

											<div class="col-4">
												<div class="col-9">
													<div class="mb-3">
													    <label for="taxname" class="form-label" style="font-weight: normal;">Tax Name</label><br>
													    <select style="width:70%" class="selectpicker" data-width="100%" data-live-search="true" name="taxname"
													      id="edit_taxname" title="Product Tax">
													      <option value="">Select tax</option>
													      @foreach($tax as $tax)
											            	<option value="{{ $tax->taxName }}">
											            		{{ $tax->taxName }}
											            	</option>
											        		@endforeach
													    </select>
													</div>
												</div>

											</div>

											<div class="col-4">
												<div class="mb-3">
												    <label for="tax" class="form-label" style="font-weight: normal;">Tax</label>
												    <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="number" step="any" min="0.0" name="tax" id="edit_tax" placeholder="tax amount e.g. 17.5">
												</div>
											</div>
											<div class="col-4">
												<div class="col-9">
													<div class="mb-3">
													    <label for="taxexcluded" class="form-label" style="font-weight: normal;">Is Tax Excluded</label><br>
													    <select style="width:70%" class="selectpicker" data-width="100%" name="taxexcluded" id="edit_taxexcluded" title="Is tax excluded">
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

					<div class="row pb-3">
						<div class="col-8">

								<button class="cancel_btn btn btn-secondary btn-lg" type="button" name="">CANCEL</button>
						  	<div class="float-right">
				          		<button class="delete_btn btn btn-outline-danger btn-lg" type="button" onclick="deleteProduct();" name="">DELETE</button>
							  	<button class="btn btn-primary btn-lg" type="submit" onclick="" name="">SAVE</button>

						  	</div>
						</div>
					</div>

			        	<input type="hidden" name="productid" id="productid" value="{{ $p->id }}">

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
      <form id="" enctype="multipart/form-data">

      	<!-- <input type="hidden" name="_method" value="PUT"> -->
		<!-- <input type="hidden" name="_token" value="{{ csrf_token() }}"> -->

      	<div class="modal-body">
      		<div class="form-group mb-3">
	   			<input id="input-b1" name="imagefile" type="file" class="file" data-browse-on-zone-click="true">
      		</div>
	    </div>

	    <div class="modal-footer">
	        <button id="close" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
	        <!-- <button type="submit" class="delete btn btn-primary">Submit</button> -->
	    </div>
      </form>
      <!-- End Form -->

    </div>
  </div>
</div>
<!-- End Modal -->

<!-- Delete Modal -->

<div class="modal fade" id="DELETEProductMODAL" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  	<div class="modal-dialog" role="document">
    	<div class="modal-content">

			<form id="DELETEProductFORM" method="POST" enctype="multipart/form-data">

					{{ csrf_field() }}
					{{ method_field('DELETE') }}


			    <div class="modal-body">
			    	<input type="hidden" name="" id="productidDelete">
			      <h5 class="text-center">Are you sure you want to delete?</h5>
			    </div>

			    <div class="modal-footer justify-content-center">
			        <button type="button" class="cancel_delete_btn btn btn-secondary" data-dismiss="modal">Cancel</button>
			        <button type="submit" class="delete btn btn-danger">Yes</button>
			    </div>

			</form>

		</div>
	</div>
</div>

<!-- END Delete Modal -->


@endsection

@section('script')
<script type="text/javascript" src="{{ asset('js/product-edit.js') }}"></script>


<script type="text/javascript">


$(document).ready(function() {
    var productId = $('#productid').val();
    fetchProduct(productId);
    $('#select-all').click(function() {
        $('input[type="checkbox"]').prop('checked', this.checked);
    })
});

	$(document).on('change', '#edit_categoryid', function (e) {
		e.preventDefault();

		// alert($('#categoryid').val());

		var categoryId = $(this).val();
		// alert(categoryId);

				$.ajax({
					type: "GET",
					url: "/product-edit-subcategory/"+categoryId,
					success: function(response){
						//console.log(response.subcategory);

						$('select[name="subcategoryname"]').empty();
					    $('select[name="subcategoryname"]').append('<option value="">Select sub-category</option>');
					    $.each(response.subcategory, function(key, item){
					         $('select[name="subcategoryname"]')
					         .append('<option value="'+ item.id +'">'+ item.subcategory_name +'</option>');
					    });
					    $('#edit_subcategoryname').appendTo('#edit_subcategoryname').selectpicker('refresh');
					}
				});
		});

	$(document).on('change', '#edit_taxname', function (e) {
		e.preventDefault();

		var taxId = $(this).val();
		// alert(taxId);

				$.ajax({
					type: "GET",
					url: "/product-create-tax/"+taxId,
					success: function(response){
					// console.log(response.tax[0].vatType);

					// $('select[name="taxname"]').empty();
				 	//    $('select[name="taxname"]').append('<option value="'+response.tax[0].vatName+'"> '+response.tax[0].vatName+' </option>');

					$('#edit_tax').val(response.tax[0].taxAmount);
					// console.log(response.tax[0].taxAmount);
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




	$('.cancel_btn').on('click', function(e){
		e.preventDefault();
		$(location).attr('href','/product-list');
	})

	$(document).on('click', '.cancel_delete_btn', function (e) {
		$('#DELETEProductMODAL').modal('hide');
	});

</script>

@endsection
