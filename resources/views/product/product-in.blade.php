@extends('layouts.master')
@section('title', 'Product-In')

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
		                	<h5 class="m-0"><strong><i class="fas fa-chevron-circle-down"></i> PRODUCT-IN</strong></h5>
		              </div>
		              <div class="card-body">

	                	<div class="row pl-3">
	                		<div class="form-check">
	                			<input class="form-check-input" type="checkbox" value="" id="pCheckbox">
											  <label class="form-check-label" for="pCheckbox">
											    Store wise product-in
											  </label>
	                		</div>
	                	</div>
	                	<div id="form_div">
	                		<form id="" method="" enctype="multipart/form-data">
	                			<div id="storediv" style="display: disabled">
		                		<div class="row pt-3">
			                		<div class="form-group col-2">
												    <label for="store" style="font-weight: normal;">Store</label><br>
												    <select class="form-control" data-live-search="true" aria-label="Default select example" name="store"
												      id="store"  onchange="storeWiseProducts()" disabled>
												      	<option value="default" selected>Select Store</option>
												      	@foreach($stores as $store)
										            	<option value="{{ $store->id }}">{{ $store->store_name  }}</option>
										        		@endforeach
												    </select>
									    			<div id="" class="form-text">If store not selected product will be added to inventory.</div>

												    <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
												  </div>
												  <div class="form-group col-2">
												    <label for="product" style="font-weight: normal;">Product<span class="text-danger"><strong>*</strong></span></label><br>
												     <!-- <select class="selectpicker" data-live-search="true" aria-label="Default select example" name="product"
												      id="product" data-width="100%">
												      	<option value="default" selected disabled>Select Product</option>
												      	{{-- @foreach($products as $product)
										            	<option value="{{ $product->id }}">{{ $product->productName  }}</option>
										        		@endforeach --}}
												    </select> -->
												    <!-- <input id="test" style="width:100%;" placeholder="type a number, scroll for more results" /> -->
												     <select id='product' name="product" style='width: 100%;' class="select2" data-placeholder="Please select an option">
												        <option></option>
												     </select>
												     <div id="" class="form-text">If store is selected then product will be shown as store wise.</div>
												  </div>
												  <div class="form-group col-2">
												    <label for="batchnumber" style="font-weight: normal;">Batch No. <span style="font-weight: normal;font-size: 14px; color: grey;"></span></label><br>
													  <select class="selectpicker" data-live-search="true" data-width="100%" name="batchnumber"
												      id="batchnumber">
												      	<option value="default" selected disabled>Select Batch</option>
												      	@foreach($batches as $batch)
										            	<option value="{{ $batch->expiry_date }}">{{ $batch->batch_number }}</option>
										        		@endforeach
												    </select>
												    <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
												  </div>
												  <div class="form-group col-2">
												    <label for="expirydate" style="font-weight: normal;">Expiry Date <span style="font-weight: normal;font-size: 14px; color: grey;"></span></label>
												     <input style="width:70%" class="form-control border-left-0 border-right-0 border-top-0 rounded-0" type="date" name="expirydate" id="expirydate">
												  </div>

			                	</div>

			                	<div class="row pt-3">
			                		<div class="form-group col-2">
												    <label for="unitprice" style="font-weight: normal;">Unit Price (Purchase)<span class="text-danger"><strong>*</strong></span></label>
												    <input type="text" class="form-control" placeholder="e.g. 40" id="unitprice" name="unitprice" >
												  </div>
												  <div class="form-group col-2">
												    <label for="mrp" style="font-weight: normal;">MRP<span class="text-danger"><strong>*</strong></span></label>
												    <input type="text" class="form-control" placeholder="e.g. 45" id="mrp" name="mrp" >
												  </div>
												  <div class="form-group col-2">
												    <label for="boxpattern" style="font-weight: normal;">Leaf/Box Pattern <span style="font-weight: normal;font-size: 14px; color: grey;"></span></label><br>
												    <select style="width:70%" class="selectpicker" data-width="100%" name="boxpattern" id="boxpattern" data-live-search="true" title="Select leaf/box size">
												      	@foreach($leaves as $leaf)
											            	<option value="{{ $leaf->total_number_of_per_box }}">{{ $leaf->leaf_type }} ({{ $leaf->total_number_of_per_box }})</option>
										        		@endforeach
												    </select>
												  </div>
												  <div class="form-group col-2">
												    <label for="boxqty" style="font-weight: normal;">Leaf/Box Qty <span style="font-weight: normal;font-size: 14px; color: grey;"></span></label>
												    <input type="number" class="form-control" placeholder="Enter leaf/box quantity" id="boxqty" name="boxqty" >
												  </div>
												  <div class="form-group col-2">
												    <label for="qty" style="font-weight: normal;">Qty<span class="text-danger"><strong>*</strong></span></label>
												    <input type="number" class="form-control" placeholder="e.g. 1000" id="qty" name="qty" >
												  </div>

			                	</div>
			                	<div class="row pt-1">
			                		<div class="col-10">

			                			<button id="add_btn" type="button" class=" w-30 btn btn-info float-right ml-1" onclick="productAddToTable()"><i class="fas fa-plus"></i> Add</button>
			                			<button class="btn btn-outline-danger float-right" type="reset" name="" onclick="resetButton()"><i class="fas fa-eraser"></i> Reset</button>
			                			<h5 class="text-danger float-right mr-5" ><strong id="errorMsg"></strong></h5>
			                		</div>
			                	</div>
		                	</div>
	                		</form>
	                	</div>



	                	<div class="row pt-4">
	                		<div class="col-10">
	                			<table id="productin_table" class="table">
												  <thead>
												    <tr>
												      <th scope="col">Store</th>
												      <th scope="col" style="display: none;">StoreId</th>
												      <th scope="col">Product</th>
												      <th scope="col" style="display: none;">ProductId</th>
												      <th scope="col">Quantity</th>
												      <th scope="col">Batch No.</th>
												      <th scope="col">Expiry Date</th>
												      <th scope="col">Unit Price (Purchase)</th>
												      <th scope="col">MRP</th>
												    </tr>
												  </thead>
												  <tbody id="productin_table_body">


												  </tbody>
												</table>
	                		</div>

	                	</div>
	                	<div class="row">
	                		<div class="form-group col-10" style="padding-top: 31px">

										   <button id="submit" type="button" class=" w-30 btn btn-primary float-right" onclick="productInToServer()"><i class="fas fa-arrow-alt-circle-down"></i> Product In</button>
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
<script type="text/javascript" src="js/product-in.js"></script>
<!-- <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script> -->


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



