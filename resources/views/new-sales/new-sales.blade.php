@extends('layouts.master')
@section('title', 'New Sales')

@section('content')
<div class="content-wrapper">

	<div class="content-header">
		<div class="container-fluid">
			<div class="row">
				<div class="col-4">
                    @php
                      $storeName =session()->get('storeName');
                      $posName=session()->get('posName');
                      $storeId=session()->get('storeId');
                      $posId=session()->get('posId');
                      $OrgName=session()->get('orgName');
                      $binNumber=session()->get('binNumber');
                    @endphp
                    {{-- <h2><span class="badge badge-success">STORE NAME: {{ $storeName }} </span></h2> --}}
					{{-- <h2><span class="badge badge-success">POS: {{ $posName }} </span></h2> --}}


				</div>

				<div class="col-8">



                    {{-- <button class="float-right btn btn-danger" type="button" id="poslogout">POS Logout</button> --}}

					<input type="hidden" name="referenceid" id="referenceid" disabled>
				</div>




			</div>
		</div>
	</div>

	<div class="content">
		<div class="container-fluid ">

			<div class="row">
				<div class="col-lg-3">

					<div class="card card-primary">
				        <div class="card-header">
				            <h5 class="m-0"><strong>NEW SALES</strong></h5>
				        </div>

				      	<div class="card-body">
							<div class="container" id="form_div">
									<!-- <form id="AddNewSalesForm" method="POST" enctype="multipart/form-data"> -->

									<input type="hidden" name="" id="subscriberid" value="{{auth()->user()->subscriber_id}}">
									<input type="hidden" name="" id="salesby" value="{{auth()->user()->email}}">
									<input type="hidden" name="" id="userid" value="{{auth()->user()->id}}">
									<input type="hidden" name="" id="username" value="{{auth()->user()->name}}">
                                    <input type="hidden" name="" id="OrgName" value="{{$OrgName}}">
                                    <input type="hidden" name="" id="binNumber" value="{{$binNumber}}">
									<div class="form-group row">
									    <label for="clientid" class="col-sm-4 col-form-label" style="font-weight: normal;">Client<span class="text-danger"><strong>*</strong></span></label>
									    <div class="col-sm-8">
									      <select class="selectpicker" data-width="100%" data-live-search="true" aria-label="Default select example" name="clientid"
									      id="clientid">
									      	<option value="option_select" disabled selected>Select Client</option>
									      	@foreach($clients as $client)
							            	<option value="{{ $client->id }}">{{ $client->name }} ({{ $client->mobile }})</option>
							        		@endforeach
									      </select>
									    </div>
							  		</div>

							  		<div class="form-group row">
									    <label for="store" class="col-sm-4 col-form-label" style="font-weight: normal;">Store<span class="text-danger"><strong>*</strong></span></label>
									    <div class="col-sm-8">
                                            {{-- <input class="form-control" type="text" name="store" id="store" value="{{$storeName}}" readonly> --}}
                                            {{-- <input class="form-control" type="hidden" name="store_id" id="store_id" value="{{$storeId}}" > --}}
									      <select class="selectpicker" data-width="100%" data-live-search="true" aria-label="Default select example" name="store"
									      id="store">
									      	<option value="option_select" disabled selected>Select Store</option>
									      	<option value="inventory">Warehouse</option>
									      	@foreach($stores as $store)
							            	<option value="{{ $store->id  }}">{{ $store->store_name  }}</option>
							        		@endforeach
									      </select>
									    </div>
							  		</div>
							  		<div class="form-group row">
									    <label for="pos" class="col-sm-4 col-form-label" style="font-weight: normal;">Pos<span class="text-danger"><strong>*</strong></span></label>
									    <div class="col-sm-8">
                                            {{-- <input class="form-control" type="text" name="pos" id="pos" value="{{$posName}}" readonly> --}}
                                            {{-- <input class="form-control" type="hidden" name="pos_id" id="pos_id" value="{{$posId}}" readonly> --}}
									      <select class="selectpicker" data-width="100%" data-live-search="true" aria-label="Default select example" name="pos"
									      id="pos">
									      	<option value="option_select" disabled selected>Select Pos</option>

									      </select>
									    </div>
							  		</div>

								  	<div class="form-group row">
									    <label for="invoiceno" class="col-sm-4 col-form-label" style="font-weight: normal;">Invoice no.<span class="text-danger"><strong>*</strong></span></label>
									    <div class="col-sm-8">
									      <input class="form-control" type="text" name="invoiceno" id="invoiceno" placeholder="e.g. 1029384756" readonly>
									    </div>
								  	</div>

								  	<div class="form-group row">
									    <label for="totalprice" class="col-sm-4 col-form-label" style="font-weight: normal;">Total Price<span class="text-danger"><strong>*</strong></span></label>
									    <div class="col-sm-8">
									      <input class="form-control" type="number" name="totalX" id="totalX" placeholder="e.g. 1000" readonly>
									    </div>
								  	</div>

								  	<div class="form-group row">
									    <label for="discount" class="col-sm-4 col-form-label" style="font-weight: normal;">Discount<span class="text-danger"><strong>*</strong></span></label>
									    <div class="col-sm-8">
									      <input class="form-control" type="number" name="discount" id="discount" placeholder="%discount e.g. 100" readonly>
									    </div>
								  	</div>
								  	<div class="form-group row">
									    <label for="tax" class="col-sm-4 col-form-label" style="font-weight: normal;">Tax/Vat<span class="text-danger"><strong>*</strong></span><span class="text-danger"></span></label>
									    <div class="col-sm-8">
									      <input class="form-control" type="number" name="tax" id="tax" placeholder="e.g. 150" readonly>
									    </div>
								  	</div>
								  	<div class="form-group row">
									    <label for="specialdiscount" class="col-sm-4 col-form-label" style="font-weight: normal;">Special Discount<span class="text-danger"><strong></strong></span><span class="text-danger"></span></label>
									    <div class="col-sm-8">
									      <input class="form-control" type="text" name="specialdiscount" id="specialdiscount" placeholder="e.g. 150" >
									    </div>
								  	</div>
								  	<div class="form-group row">
									    <label for="grandtotal" class="col-sm-4 col-form-label" style="font-weight: normal;">Grand Total<span class="text-danger"><strong>*</strong></span></label>
									    <div class="col-sm-8">
									      <input class="form-control" type="number" name="grandtotal" id="grandtotal" placeholder="e.g. 1050" value="0.00" readonly>
									    </div>
								  	</div>

								  	<div class="form-group row">
									    <label for="orderdate" class="col-sm-4 col-form-label" style="font-weight: normal;">Order Date<span class="text-danger"><strong>*</strong></span></label>
									    <div class="col-sm-8">
									      <input class="form-control" type="date" name="orderdate" id="orderdate">
									    </div>
								  	</div>

								  	<div class="form-group row">
									    <label for="ordernote" class="col-sm-4 col-form-label" style="font-weight: normal;">Note</label>
									    <div class="col-sm-8">
									      <textarea class="form-control" name="ordernote" id="ordernote"  rows="1" placeholder="if any notes"></textarea>
									    </div>
								  	</div>

								  	<div class="form-group row pt-3">
								  		<div class="col-sm-5">
								  			 <button id="cancel_window" type="button" class="btn btn-danger">Cancel</button>
								  		</div>
								  		<div class="col-sm-7">
								  			<h6 class="text-danger float-left" ><strong id="errorMsg1"></strong></h6>
									  		<div  class="btn-group w-100" role="group" aria-label="Basic outlined example">
											  <button id="save" type="submit" class="btn btn-info"><i class="fas fa-print"></i> Pay & Print</button>
											  <button id="pay_btn" type="button" class="btn btn-primary"><i class="fas fa-cash-register"></i> Pay</button>
											</div>

									  	</div>

								  	</div>
								<!-- </form> -->
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
									    <label for="barcode" class="col-2 col-form-label" style="font-weight: normal;">Barcode</label>

			  						</div>
			  						<div class="form-group row mb-3">
			  							<div class="col-4">
		          							<div class="input-group">
												<input type="text" class="form-control" name="search" id="search">
												<div class="input-group-append">
												<!-- <span class="input-group-text" id="search_btn" style=""><i class="fas fa-search"></i></span> -->
												<button class="input-group-text btn btn-light" id="search_btn" type="submit"><i class="fas fa-search"></i></button>
											</div>
											</div>
		          						</div>

			  						</div>
			  						<div class="form-group row mb-0">

									    <label for="product" class="col-2 col-form-label" style="font-weight: normal;">Product<span class="text-danger"><strong>*</strong></span></label>
								      	<!-- <label for="batch" class="col-2 col-form-label" style="font-weight: normal;">Batch<span class="text-danger"><strong>*</strong></span></label> -->
									    <label for="mrp" class="col-2 col-form-label" style="font-weight: normal;">MRP<span class="text-danger"><strong>*</strong></span></label>
									    <label for="qty" class="col-2 col-form-label" style="font-weight: normal;">
									    	Qty<span class="text-danger"><strong>*</strong></span>
									    </label>
								     	<label for="discount1" class="col-2 col-form-label" style="font-weight: normal;">Discount<span class="text-danger"><strong>*</strong></span></label>
									    <label for="tax1" class="col-2 col-form-label" style="font-weight: normal;">Vat/Tax<span class="text-danger"><strong>*</strong></span></label>
									</div>
									<div class="form-group row mt-0">
										<div class="col-2">
									      {{-- <select class="product selectpicker" data-width="100%" name="product" id="product" data-width="170px" data-live-search="true">
									      	<option value="option_select" disabled selected>Select Product
									      	</option>
										   @foreach($products as $product)
							            	<option value="{{ $product->id }}">{{ $product->productName }}</option>
							        		@endforeach
									      </select> --}}
                                          <select id='product' name="product" style='width: 100%;' class="select2 form-control" data-placeholder="Please select an option" disabled>
                                            <option></option>
                                         </select>
									    </div>
									   {{-- <div class="col-2">
											<select class="selectpicker" data-live-search="true" data-width="100%" name="batch"
										      id="batch">
										      	<option value="default" selected disabled>Select Batch</option>
										      	@foreach($batches as $batch)
								            	<option value="{{ $batch->id }}">{{ $batch->batch_number }}</option>
								        		@endforeach


										    </select>
									    </div> --}}

									    <div class="col-2">
									      <input type="number" step="any" min="0.1" class="form-control" name="mrp" id="mrp">
									    </div>
									    <div class="col-2">
									      <input type="number" step="any" min="0.1" class="form-control" name="qty" id="qty">
									    </div>
									    <div class="col-2">
									      <input type="number" step="any" min="0.1" class="form-control" name="discount1" id="discount1">
									    </div>



									    <div class="col-2">
									      <input type="number" step="any" min="0.1" class="form-control" name="tax1" id="tax1">
									    </div>

									</div>

									<div class="form-group row mt-0 mb-0">
										<div class="col-3">
									      <input type="hidden" class="form-control" name="availableoffer" id="availableoffer">
									    </div>
									    <div class="col-2">
									      <input type="hidden" class="form-control" name="requiredQuantity" id="requiredQuantity">
									    </div>
									    <div class="col-2">
									      <input type="hidden" class="form-control" name="freeQuantity" id="freeQuantity">
									    </div>
									    <div class="col-2">
									      <input type="hidden" class="form-control" name="freeItemName" id="freeItemName">
									    </div>
									    <div class="col-2">
									      <input type="hidden" class="form-control" name="offerItemId" id="offerItemId">
									    </div>
								     	<div class="col-1">
									      <input type="hidden" class="form-control" name="productQty" id="productQty">
									    </div>
									</div>
									<div class="form-group row mt-0">
										<div class="col-2">
									      <input type="hidden" class="form-control" name="isExcludedTax" id="isExcludedTax">
									    </div>

									</div>

								    <div class="row pt-0">
								    	<div class="col-10">
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
				  					<table id="product_table" class="table table-bordered">
									  <thead>
									    <tr>
									      <th width="30%">Product Name</th>
									      <th width="20%">MRP</th>
									      <th width="20%">Qty</th>
									      <th width="20%">Subtotal</th>
									      <th width="10%"></th>
									    </tr>
									  </thead>
									  <tbody id="product_table_body">

									  </tbody>
									</table>
			  					</div>

			  					<div class="table-responsive">
          							<table id="free_product_table" class="table hidden table-bordered">
									    <thead class="">
									        <tr>
									            <th>Free Item</th>
									            <th>Quantity</th>
									            <th>On Product</th>
									            <th class="hidden"></th>

									        </tr>
									    </thead>
									    <tbody id="free_product_table_body">

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



<!-- ------------------------------------------------------------------------Payment Modal------------------------------------------------------------------------ -->

<div class="modal fade" id="PaymentModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  	<div class="modal-dialog" role="document">
    	<div class="modal-content" id="form_div">

			<form id="PaymentForm" method="" enctype="multipart/form-data">

			    <div class="modal-body">

			        <h4 class="pt-3 text-center">Payment</h4>

			        <hr>

			        <div class="row g-3 align-items-center pt-3">
  						<div class="col-3">
						    <label for="cashamount" class="col-form-label fw-normal">Cash</label>
						</div>
  						<div class="col-4">
						    <input type="number" name="cashamount" id="cashamount" class="form-control" id="cashamount" placeholder="Cash amount">
						</div>

  					</div>
  					<div class="row g-3 align-items-center pt-3">
  						<div class="col-3">
						    <label for="mobilebanking" class="col-form-label fw-normal">Mobile Banking</label>
						</div>
  						<div class="col-4">
						    <select class="form-control" name="mobilebanking" id="mobilebanking">
						    	<option value="default" selected>Select</option>
						      	@foreach($methods as $method)
				            	<option value="{{ $method->id }}">{{ $method->paymentType  }}</option>
				        		@endforeach
						    </select>
						</div>
						<div class="col-4">
						    <input type="number" name="mobilebankingamount" id="mobilebankingamount" class="form-control" id="mobilebankingamount" placeholder="Amount">
						</div>

  					</div>
  					<div class="row g-3 align-items-center pt-3 ">
  						<div class="col-3">
						    <label for="bankamount" class="col-form-label fw-normal">Bank</label>
						</div>
  						<div class="col-4">
						    <input type="number" name="bankamount" id="bankamount" class="form-control" id="bankamount" placeholder="Bank amount">
						</div>

  					</div>

  					<div class="pt-5">
			    		<h4> <strong>Total:</strong> <span id="totalp">0</span></h4>
			    		<h4> <strong>Paid:</strong> <span id="paidp">0</span></h4>
			    		<h4> <strong>Due:</strong> <span id="duep">0</span></h4>
			    	</div>


			    </div>

			    <div class="modal-footer justify-content-center">
			        <button type="button" class="cancel_payment btn btn-danger cancel_btn" data-dismiss="modal">Cancel</button>
			        <button type="reset" class="reset_payment btn btn-info cancel_btn" data-dismiss="modal">Reset</button>
			        <button id="pay_btnP" type="button" class="btn btn-primary">Pay</button>
			    </div>

			</form>

		</div>
	</div>
</div>


<!-- --------------------------------------------------------------------------End Payment Modal-------------------------------------------------------------------------- -->

<!-- -----------------------------------------------------------------------------POS receipt----------------------------------------------------------------------------- -->
<div class="modal fade w-500" id="ReceiptModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  	<div class="modal-dialog" role="document">
    	<div class="modal-content" id="form_div">
		    <div class="modal-body">

		    	<div id="invoice" class="" >
		    		<div  class="container" style="">
		    			<div>
		    				<br>
				        	<h6 class="text-center"><strong><span id="iStoreName"></span></strong></h6>
				        	<h6 class="text-center"><span id="iOrgName"></span></h6>
				        	<h6 class="text-center"><span id="iStoreAddress"></span></h6>
				        	<h6 class="text-center">BIN : <span id="iBin"></span></h6>
				        	<h6 class="text-center">Mushak - <span id="">6.3</span></h6>
				        </div>
				        <div>
				        	<hr style="border: 0 none; border-top: 2px dashed #322f32; background: none; height:0;" class="mb-0">
				        	<h5 class="text-center mb-0">INVOICE</h5>
				        	<hr style="border: 0 none; border-top: 2px dashed #322f32; background: none; height:0;" class="mt-0">
				        </div>


				        <div>
				        	<div class="row">
					        	<div class="col-6"><h6 class="text-left">Cashier : <span id="iCashier"></span></h6></div>
					        	<div class="col-6"><h6 class="text-right">POS ID : <span id="iPosId"></span></h6></div>
					        </div>
					        <div class="row">
					        	<div class="col-6"><h6 class="text-left">Invoice : <span id="iInvoice"></span></h6></div>
					        	<div class="col-6"><h6 class="text-right">Date : <span id="iDate"></span></h6></div>
					        </div>
					        <div class="row">
					        	<div class="col-12"><h6 class="text-left">Customer Name : <span id="iCustomerId"></span></h6></div>
<!--                                <span class="hidden" id="iCustomerId"></span>-->
					        </div>
				        </div>

				        <div class="mt-3">
				        	 <table id="invoice_table" class="table table-bordered">
							    <thead class="" style="border: 0 none; border-top: 2px dashed #322f32; background: none; height:0; border-bottom: 2px dashed #322f32; ">
							        <tr>
							        	<th>SL</th>
							            <th>Item Description</th>
							            <th>Unit Price</th>
							            <th>Qty</th>
							            <th>Total</th>

							        </tr>
							    </thead>
							    <tbody id="invoice_table_body">


							    </tbody>
						    </table>
				        </div>
				        <hr style="border: 0 none; border-top: 2px dashed #322f32; background: none; height:0;" class="mt-0">

				        <div class="row">
				        	<div class="col-7"><h6 class="text-right">Sub Total : </h6></div>
					        <div class="col-4"><h6 class="text-right"><span id="iSubTotal">0.00</span></h6></div>
				        </div>
				        <div class="row">
				        	<div class="col-7"><h6 class="text-right">(-) Discount : </h6></div>
					        <div class="col-4"><h6 class="text-right"><span id="iDiscount">0.00</span></h6></div>
				        </div>
				        <div class="row mt-0">
				        	<div class="col-7"><h6 class="text-right"></h6></div>
					        <div class="col-4"><h6 class="text-right"><hr style="border: 0 none; border-top: 2px dashed #322f32; background: none; height:0;"></h6></div>
				        </div>
				        <div class="row">
				        	<div class="col-7"><h6 class="text-right"></h6></div>
					        <div class="col-4"><h6 class="text-right"><span id="iAfterDiscount">0.00</span></h6></div>
				        </div>
				        <div class="row">
				        	<div class="col-7"><h6 class="text-right"><span id="">Total VAT : </span></h6></div>
					        <div class="col-4"><h6 class="text-right"><span id="iVat">0.00</span></h6></div>
				        </div>
				        <div class="row">
				        	<div class="col-7"><h6 class="text-right"></h6></div>
					        <div class="col-4"><h6 class="text-right"><hr style="border: 0 none; border-top: 2px dashed #322f32; background: none; height:0;"></h6></div>
				        </div>
				        <div class="row">
				        	<div class="col-7"><h6 class="text-right"></h6></div>
					        <div class="col-4"><h6 class="text-right"><span id="iAfterVat">0.00</span></h6></div>
				        </div>
				        <div class="row">
				        	<div class="col-7"><h6 class="text-right">(+/-) Rounding : </h6></div>
					        <div class="col-4"><h6 class="text-right"><span id="iRounding">0.00</span></h6></div>
				        </div>
				        <div class="row">
				        	<div class="col-7"><h6 class="text-right"></h6></div>
					        <div class="col-4"><h6 class="text-right"><hr style="border: 0 none; border-top: 2px dashed #322f32; background: none; height:0;"></h6></div>
				        </div>
				        <div class="row">
				        	<div class="col-7"><h6 class="text-right">Net Payable : </h6></div>
					        <div class="col-4"><h6 class="text-right"><span id="iNetPayable">0.00</span></h6></div>
				        </div>

				        <hr style="border: 0 none; border-top: 2px dashed #322f32; background: none; height:0;" class="mt-2">
				        <div>
				        	<h6 class="text-center">Hotline : <span id=""></span></h6>
				        	<h6 class="text-center"><span id="">*** Thank You For Shopping With Us ***</span></h6>

				        </div>

		    		</div>

		    	</div>


		    </div>
		</div>
	</div>
</div>




@endsection

@section('script')
<script type="text/javascript" src="js/new-sales.js"></script>

<script type="text/javascript">
$(document).on('click','#poslogout',function(){

        $.ajax({
            type: "POST",
            url: "/new-sales-pos-logout",
            headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
            success: function(response){
                if(response.url != null){
                    window.location=response.url;
                }
            }
        })
});


 //start //
// $( document ).ready(function() {

//     let storeId=$('#store_id').val()


//     $.ajax({
//         ajaxStart: $('body').loadingModal({
//           position: 'auto',
//           text: 'Please Wait',
//           color: '#fff',
//           opacity: '0.7',
//           backgroundColor: 'rgb(0,0,0)',
//           animation: 'foldingCube'
//         }),
// 	        type: "GET",
// 	        url: "/store-wise-product/"+storeId,
// 	        dataType:"json",
// 	        success: function(response){

// 	            $('#product').empty();
// 	            $('#product').append('<option value="option_select" selected disabled>Select product</option>');
// 	            $.each(response.data, function(key, item){
// 	                 $('#product').append('<option value="'+ item.id +'">'+ item.productName +'</option>');
// 	            });

// 	            $('#product').appendTo('#product').selectpicker('refresh');
//                 $('body').loadingModal('destroy');
// 	        }
// 	    })

//         //end //
//         $('#product').on('change', function() {



//             var productId = this.value;


//                 $.ajax({
//                     type: "GET",
//                     url: "/get-product-price/"+productId,
//                     dataType:"json",
//                     success: function(response){
//                         // console.log(response.products)
//                         // alert(response.message)
//                         console.log(response)
//                         // $('#unitprice').val(response.products[0].price)
//                         $('#mrp').val(response.products[0].mrp)

//                     }
//                 })



//             });
//         });

(function() {

$("#product").select2({
  // theme: "classic",
  // width: '350px',
  allowClear: true,
//   ajax: {
//       url: '/get-product-data',
//       dataType: 'json',
//       delay: 250,
//       data: function(params) {
//           return {
//               term: params.term || '',
//               page: params.page || 1
//           }
//       },
//       cache: true
//   },
    placeholder: 'Search product',
    minimumInputLength: 1,
    // templateResult: formatProduct,
    // templateSelection: formatProductSelection
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


// $('.select2').on('select2:select', function (e) {
//     var productName = $('#product').select2('data')[0].productName
//     var id = $('#product').select2('data')[0].id
//    	// alert(id)

//    	$.ajax({
//         type: "GET",
//         url: "/get-product-price/"+id,
//         dataType:"json",
//         success: function(response){
//             console.log(response)
//             // alert(response.message)
//             $('#unitprice').val(response.products[0].price)
//             $('#mrp').val(response.products[0].mrp)
//             if(response.products[0].discount==null){
//                 $('#discount1').val(0)
//             }else{
//                 $('#discount1').val(response.products[0].discount)
//             }
//             if(response.products[0].tax==null){
//                 $('#tax1').val(0)
//             }else{
//                 $('#tax1').val(response.products[0].tax)

//             }


//         }
//     })

// });

$(document).on('click', '.cancel_payment', function (e) {
	$('#PaymentModal').modal('hide');

	var grandTotal = parseFloat($('#grandtotal').val())
	var zero = 0

	$('#totalp').text(grandTotal.toFixed(2))
	$('#paidp').text(zero.toFixed(2))
	$('#duep').text(grandTotal.toFixed(2))

	$('#cashamount').val('')
	$('#mobilebankingamount').val('')
	$('#bankamount').val('')
})

$(document).on('click', '.reset_payment', function (e) {

	// $('#form_div').find('form')[0].reset();
	// $('#cashamount').reset();

	var grandTotal = parseFloat($('#grandtotal').val())
	var zero = 0

	$('#totalp').text(grandTotal.toFixed(2))
	$('#paidp').text(zero.toFixed(2))
	$('#duep').text(grandTotal.toFixed(2))

	$('#cashamount').val('')
	$('#mobilebankingamount').val('')
	$('#bankamount').val('')

})

$(document).on('click', '#cancel_window', function () {
    window.location='/order-list';
});

$('#store').on('change', function() {
    var storeId = $(this).val()
    var storeName = $("#store").find("option:selected").text()

    // alert(storeId)
    // fetchStoreStock(storeId)

    if(storeId == 'inventory'){
    	inventoryWiseProducts()
    }else{
    	$.ajax({
	        type: "GET",
	        url: "/store-wise-product/"+storeId,
	        dataType:"json",
	        success: function(response){

	            // console.log(response)
	            // alert(response.message)

	            $('#product').empty();
	            $('#product').append('<option value="option_select" selected disabled>Select</option>');
	            $.each(response.data, function(key, item){
	                 $('#product').append('<option value="'+ item.id +'">'+ item.productName +'</option>');
	            });

	            $('#product').appendTo('#product').selectpicker('refresh');
                $('#product').prop('disabled',false);

	        }
	    })
    }

    $.ajax({
	        type: "GET",
	        url: "/store-wise-pos/"+storeId,
	        dataType:"json",
	        success: function(response){
	            // console.log(response.data)
	            // alert(response.message)

	            $('#pos').empty();
	            $('#pos').append('<option value="option_select" selected disabled>Select pos</option>');
	            $.each(response.data, function(key, item){
	                 $('#pos').append('<option value="'+ item.id +'">'+ item.pos_name +'</option>');
	            });

	            $('#pos').appendTo('#pos').selectpicker('refresh');

	        }
	    })


})

function inventoryWiseProducts(){
    $.ajax({
        type: "GET",
        url: "/inventory-wise-product",
        dataType:"json",
        success: function(response){
            // console.log(response.data)
            // alert(response.message)

            $('#product').empty();
            $('#product').append('<option value="option_select" selected disabled>Select product</option>');
            $.each(response.data, function(key, item){
                 $('#product').append('<option value="'+ item.productId +'">'+ item.productName +'</option>');
            });

            $('#product').appendTo('#product').selectpicker('refresh');
            $('#product').prop('disabled',false);
        }
    })
}
</script>
@endsection
