@extends('layouts.master')
@section('title', 'Create Purchase')

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
				<div class="col-lg-3">

					<div class="card card-primary">
				        <div class="card-header">
				            <h5 class="m-0"><strong>Product Stock-In</strong></h5>
				        </div>

				      	<div class="card-body">
							<div class="container" id="form_div">
									<form id="AddPurchaseProductForm" method="POST" enctype="multipart/form-data">
									<div class="form-group row">
									    <label for="supplierid" class="col-sm-4 col-form-label" style="font-weight: normal;">Supplier<span class="text-danger"><strong>*</strong></span></label>
									    <div class="col-sm-8">
									      <select class="selectpicker" data-width="100%" data-live-search="true" aria-label="Default select example" name="supplierid"
									      id="supplierid">
									      	<option value="option_select" disabled selected>Select Supplier</option>
									      	@foreach($suppliers as $supplier)
							            	<option value="{{ $supplier->id }}">{{ $supplier->name  }}</option>
							        		@endforeach
									      </select>
									    </div>
							  		</div>

							  		<div class="form-group row">
									    <label for="store" class="col-sm-4 col-form-label" style="font-weight: normal;">Store<span class="text-danger"><strong>*</strong></span></label>
									    <div class="col-sm-8">
									      <select class="selectpicker" data-width="100%" data-live-search="true" aria-label="Default select example" name="store"
									      id="store">
									      	<option value="option_select" disabled selected>Select Store</option>
							            	<option value="Warehouse">Warehouse</option>
									      	@foreach($stores as $store)
							            	<option value="{{ $store->store_name  }}">{{ $store->store_name  }}</option>
							        		@endforeach
									      </select>
									    </div>
							  		</div>

								  	<div class="form-group row">
									    <label for="ponumber" class="col-sm-4 col-form-label" style="font-weight: normal;">P.O. Number<span class="text-danger"><strong>*</strong></span></label>
									    <div class="col-sm-8">
									      <input class="form-control" type="text" name="ponumber" id="ponumber" placeholder="e.g. 1029384756">
									    </div>
								  	</div>

								  	<div class="form-group row">
									    <label for="totalprice" class="col-sm-4 col-form-label" style="font-weight: normal;">Total Price<span class="text-danger"><strong>*</strong></span></label>
									    <div class="col-sm-8">
									      <input class="form-control" type="number" name="totalprice" id="totalprice" placeholder="e.g. 1000" disabled>
									    </div>
								  	</div>

								  	<div class="form-group row">
									    <label for="discount" class="col-sm-4 col-form-label" style="font-weight: normal;">Discount</label>
									    <div class="col-sm-8">
									      <input class="form-control" type="number" name="discount" id="discount" placeholder="discount e.g. 100">
									    </div>
								  	</div>

								  	<div class="form-group row">
									    <label for="othercost" class="col-sm-4 col-form-label" style="font-weight: normal;">Other Cost<span class="text-danger"></span></label>
									    <div class="col-sm-8">
									      <input class="form-control" type="number" name="othercost" id="othercost" placeholder="e.g. 200">
									    </div>
								  	</div>

                                    <div class="form-group row">
									    <label for="totalprice" class="col-sm-4 col-form-label" style="font-weight: normal;">Grand Total</label>
									    <div class="col-sm-8">
									      <input class="form-control" type="number" name="grandtotal" id="grandtotal" placeholder="0.00" disabled>
									    </div>
								  	</div>

								  	<div class="form-group row">
									    <label for="purchasedate" class="col-sm-4 col-form-label" style="font-weight: normal;">Purchase Date<span class="text-danger"><strong>*</strong></span></label>
									    <div class="col-sm-8">
									      <input class="form-control" type="date" name="purchasedate" id="purchasedate">
									    </div>
								  	</div>

								  	<div class="form-group row">
									    <label for="purchasenote" class="col-sm-4 col-form-label" style="font-weight: normal;">Purchase Note</label>
									    <div class="col-sm-8">
									      <textarea class="form-control" name="purchasenote" id="purchasenote"  rows="1" placeholder="if any notes"></textarea>
									    </div>
								  	</div>

								  	<div class="form-group row">
								  		<div class="col-sm-12">
								  			<h6 class="text-danger float-left" ><strong id="errorMsg1"></strong></h6>
								  			<!-- <button type="reset" value="Reset" class="btn btn-outline-danger float-right ml-2" onclick="resetButton()"><i class="fas fa-eraser"></i> Reset</button> -->
									  		<button type="submit" onclick="productListSubmitToServer();" class="btn btn-primary float-right"></i> Save</button>
									  	</div>
								  	</div>
								</form>
							</div> <!-- container -->
						</div> <!-- card-body -->
			  		</div> <!-- card card-primary card-outline -->
				</div> <!-- col-lg-4 -->

					<div class="col-lg-9">

						<div class="card card-primary">
			            <div class="card-header">
			                <h5 class="m-0"><strong>Products</strong></h5>
			            </div>

			          	<div class="card-body">
			  				<div class="container" id="form_div1">
			  					<form>
			  						<div class="form-group row mb-0">

									    <label for="product" class="col-2 col-form-label" style="font-weight: normal;">Product<span class="text-danger"><strong>*</strong></span></label>
									    <label for="receivedqty" class="col-2 col-form-label" style="font-weight: normal;">Purchase Qty<span class="text-danger"><strong>*</strong></span></label>
									    <label for="unitprice" class="col-2 col-form-label" style="font-weight: normal;">Unit Price (Purchase)<span class="text-danger"><strong>*</strong></span></label>
									     <label for="mrp" class="col-2 col-form-label" style="font-weight: normal;">MRP<span class="text-danger"><strong>*</strong></span></label>
									      <label for="batchnumber" class="col-2 col-form-label" style="font-weight: normal;">Batch No. <span style="font-size: 14px; color: grey;">(optional)</span><span class="text-danger"></span></label>
									    {{-- <label for="totalpricepurchase" class="col-2 col-form-label" style="font-weight: normal;">Total Price (Purchase)<span class="text-danger"><strong>*</strong></span></label> --}}
									</div>
									<div class="form-group row mt-0">
										<div class="col-2">
									      <!-- <select class="product selectpicker" data-width="100%" name="product" id="product" data-width="170px" data-live-search="true">
									      	<option value="option_select" disabled selected>Select Product
									      	</option>
										  	{{-- @foreach($products as $product)
							            	<option value="{{ $product->id }}">{{ $product->productName }}</option>
							        		@endforeach --}}
									      </select> -->
									      <select id='product' name="product" style='width: 100%;' class="select2" data-placeholder="Please select an option">
									        <option></option>
									      </select>
									    </div>


									    <div class="col-2">
									      <input type="number" class="form-control" name="receivedqty" id="receivedqty">
									    </div>


									    <div class="col-2">
									      <input type="number" class="form-control" name="unitprice" id="unitprice">
									    </div>
									    <div class="col-2">
									      <input type="number" class="form-control" name="mrp" id="mrp">
									    </div>
									    <div class="col-2">
											<select class="selectpicker" data-width="100%" name="batchnumber" id="batchnumber" data-width="170px" data-live-search="true">
										      	<option value="option_select" disabled selected>Select Batch</option>
											  	@foreach($batches as $batch)
								            	<option value="{{ $batch->id }}">{{ $batch->batch_number }}</option>
								        		@endforeach
									      </select>
									    </div>


									    {{-- <div class="col-2">
									      <input type="number" class="form-control" name="totalpricepurchase" id="totalpricepurchase">
									    </div> --}}
									{{-- </div> --}}

								    {{-- <div class="row pt-2"> --}}
								    	<div class="col-2">
								    		<button type="submit" onclick="productAddToTable();" id="addProduct" class="ml-2 btn btn-outline-info float-right">
									  		<i class="fas fa-plus"></i> Add
									  	  </button>
									  	  <button type="reset" value="Reset" class="btn btn-outline-danger float-right" onclick="resetButton()"><i class="fas fa-eraser"></i> Reset</button>
									  	  <h6 class="text-danger float-right mr-5" ><strong id="errorMsg"></strong></h6>
								    	</div>

								    </div>


			  					</form>


			  					<div class="pt-2">
			  						<h4> List of Products</h4>
				  					<table id="purchase_table" class="table">
									  <thead>
									    <tr>
									      <th scope="col">Product Name</th>
									      <th scope="col">Quantity</th>
									      <th scope="col">Unit Price</th>
									      <th scope="col">MRP</th>
									      <th scope="col">Batch No.</th>
									      <th scope="col">Total Price</th>
									      <th scope="col">Action</th>
									    </tr>
									  </thead>
									  <tbody>

									  </tbody>
									</table>
			  					</div>

							</div> <!-- container -->
						</div> <!-- card-body -->
			      	</div> <!-- card card-primary card-outline -->
					</div> <!-- col-lg-8 -->
			</div> <!-- row -->
		</div>
	</div>
</div>




@endsection

@section('script')
<script type="text/javascript" src="js/purchase.js"></script>

<script type="text/javascript">
	(function() {

	  $("#product").select2({
	    // theme: "classic",
	    // width: '350px',
	    allowClear: true,
	    ajax: {
	        url: '/get-product-data',
	        dataType: 'json',
	        delay: 250,
	        data: function(params) {
	            return {
	                term: params.term || '',
	                page: params.page || 1
	            }
	        },
	        cache: true
	    },
	    placeholder: 'Search product',
	    minimumInputLength: 1,
      templateResult: formatProduct,
      templateSelection: formatProductSelection
		});


	  function formatProduct(product) {
        if (product.loading) {
            return product.text;
        }

        var $container = $(
            "<div class='select2-result-product clearfix'>" +
            "<div class='select2-result-product__productName'></div>" +
            "</div>" +
            "</div>" +
            "</div>"
        );
        var productName=product.productName;
        var productCategory = product.category_name;
        if(product.strength!=null){
            var productStrength = product.strength;
        }
        else{
            var productStrength = 'N/A';
        }
        var productDetails = (productName+' ('+productCategory+' - '+productStrength+')');
        // console.log(productDetails);
        $container.find(".select2-result-product__productName").text(productDetails);

        return $container;
    }

    function formatProductSelection(product) {
        var productName=product.productName;
        var productCategory = product.category_name;
        if(product.strength!=null){
            var productStrength = product.strength;
        }
        else{
            var productStrength = 'N/A';
        }
        var productDetails = (productName+' ('+productCategory+' - '+productStrength+')');
        if($('#product').val().length==0)
        {
            // alert($("#product").val().length);
            return 'Select Product';
        }
        else
        {
            // alert($("#product").val().length);
            return productDetails;
        }
        // return productDetails;
    }

	})();


	$('.select2').on('select2:select', function (e) {
    var productName = $('#product').select2('data')[0].productName
    var id = $('#product').select2('data')[0].id
   	// alert(id)

   	$.ajax({
        type: "GET",
        url: "/get-product-price/"+id,
        dataType:"json",
        success: function(response){
            // console.log(response.products)
            // alert(response.message)
            $('#unitprice').val(response.products[0].price)
            $('#mrp').val(response.products[0].mrp)

        }
    })

	});
</script>
@endsection
