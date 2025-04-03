@extends('layouts.master')
@section('title', 'Product-Transfer')

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
		                	<h5 class="m-0"><strong><i class="fas fa-exchange-alt"></i>  PRODUCT-TRANSFER</strong></h5>
		              </div>
		              <div class="card-body">

	                	<div id="form_div">
	                		<form id="" method="" enctype="multipart/form-data">
		                		<div id="storediv" style="display: disabled">
			                		<div class="row pt-3">
				                		<div class="form-group col-2">
													    <label for="fromstore" style="font-weight: normal;">From Store<span class="text-danger"><strong>*</strong></span></label><br>
													    <select class="selectpicker"  data-live-search="true" aria-label="Default select example" name="fromstore"
													      id="fromstore" data-width="100%" onchange="storeWiseProducts()">
													      	<option value="fromdefault" selected disabled>Select Store</option>
													      	<option value="inventory">Warehouse</option>
													      	@foreach($stores as $store)
											            	<option value="{{ $store->id }}">{{ $store->store_name  }}</option>
											        		@endforeach
													    </select>
													    <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
													  </div>
													  <div class="form-group col-2">
													    <label for="tostore" style="font-weight: normal;">To Store<span class="text-danger"><strong>*</strong></span></label><br>
													    <select class="selectpicker"  data-live-search="true" aria-label="Default select example" name="tostore"
													      id="tostore" data-width="100%">
													      	<option value="todefault" selected disabled>Select Store</option>
													      	<option value="inventory">Warehouse</option>
													      	@foreach($stores as $store)
											            	<option value="{{ $store->id }}">{{ $store->store_name  }}</option>
											        		@endforeach
													    </select>
													    <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
													  </div>
													  <div class="form-group col-2">
													    <label for="product" style="font-weight: normal;">Product<span class="text-danger"><strong>*</strong></span></label><br>
													     <!-- <select class="selectpicker"  data-live-search="true" aria-label="Default select example" name="product"
													      id="product" data-width="100%">
													      	<option value="default" selected disabled>Select Product</option>
													      	@foreach($products as $product)
											            	<option value="{{ $product->id }}">{{ $product->productName  }}</option>
											        		@endforeach
													    </select> -->
													    <select id='product' name="product" style='width: 100%;' class="select2" data-placeholder="Please select an option">
												        <option></option>
												      </select>
												      <div id="" class="form-text">If store is selected then product will be shown as store wise.</div>
													  </div>
													  {{-- <div class="form-group col-2"> --}}
														{{-- <label for="batch" style="font-weight: normal;">Batch<span class="text-danger"><strong>*</strong></span><span style="font-weight: normal;font-size: 14px; color: grey;"></span></label><br>
														<select class="selectpicker" data-live-search="true" data-width="100%" name="batch"
														id="batch">
														
														</select> --}}
													<!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
													{{-- </div> --}}
													  <div class="form-group col-2">
													    <label for="qty" style="font-weight: normal;">Qty<span class="text-danger"><strong>*</strong></span></label>
													    <input type="text" class="form-control" placeholder="Enter quantity" id="qty" name="qty" >
													  </div>

													  <div class="form-group col-4" style="padding-top: 31px">

													   <button id="add_btn" type="button" class=" w-30 btn btn-primary" onclick="productAddToTable()"><i class="fas fa-plus"></i> Add</button>
													   <button id="reset_btn" type="reset" value="Reset" class=" w-30 btn btn-outline-danger" onclick="resetButton()"><i class="fas fa-eraser"></i> Reset</button>

													  </div>
				                	</div>
				                	<div class="row">
				                		<div class="col-1"></div>
				                		<div class="col-9">
				                			<h6 class="text-danger float-right mr-5 pr-5" ><strong id="errorMsg"></strong></h6>
				                		</div>
				                	</div>
			                	</div>
	                		</form>
	                	</div>

	                	<div class="row">
	                		<div class="col-12">
	                			<small id="" class="form-text text-muted">1. Please check your store or warehouse product Qty before transfering a product.</small>
	                			<small id="" class="form-text text-muted">2. If a product stock Qty is less then transfer Qty then it will not be transfered.</small>
	                			<small id="" class="form-text text-muted">3. If the destination store does not have this product then transfering product will be added to that store.</small>
	                		</div>
	                	</div>

	                	<div class="row pt-3">
	                		<div class="col-10">
	                			<table id="product_transfer_table" class="table">
												  <thead>
												    <tr>
													<th scope="col">Product</th>
													<th scope="col" style="display: none;">ProductId</th>
													<th scope="col">From Store</th>
												    <th scope="col" style="display: none;">FromStoreId</th>
												    <th scope="col">To Store</th>
												    <th scope="col" style="display: none;">ToStoreId</th>
												    <th scope="col">Quantity</th>
												    </tr>
												  </thead>
												  <tbody id="product_transfer_table_body">


												  </tbody>
												</table>
	                		</div>

	                	</div>
	                	<div class="row">
	                		<div class="col-1"></div>
	                		<div class="col-9">
	                			<h6 class="text-danger float-right" ><strong id="errorMsg1"></strong></h6>
	                		</div>
	                	</div>
	                	<div class="row">
	                		<div class="form-group col-10" style="padding-top: 10px">
										   <button id="" type="button" class=" w-30 btn btn-primary float-right" onclick="productTransferToServer()"><i class="fas fa-angle-double-right"></i> Product Transfer</button>
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
<script type="text/javascript" src="js/product-transfer.js"></script>
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

        $container.find(".select2-result-product__productName").text(product.productName);

        return $container;
    }

    function formatProductSelection(product) {
        return product.productName;
    }

	})();


// 	$('#product').on('change', function() {
//     var productId = $(this).val()
//     var productName = $("#product").find("option:selected").text()
//     var storeId = $("#fromstore").val()

//     // alert(storeId)

//     $.ajax({
//         type: "GET",
//         url: "/product-wise-batch/"+productId+"/"+storeId,
//         dataType:"json",
//         success: function(response){
//             // console.log(response.data)
//             // alert(response.message)

//             $('#batch').empty();
//             $('#batch').append('<option value="default" selected disabled>Select batch</option>');
//             $.each(response.data, function(key, item){
//                  $('#batch').append('<option value="'+ item.id+'">'+ item.batch_number +'</option>');
//             });

//             $('#batch').appendTo('#batch').selectpicker('refresh');

//         }
//     })

// })
</script>

@endsection



