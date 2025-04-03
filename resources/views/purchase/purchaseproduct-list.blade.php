@extends('layouts.master')
@section('title', 'Product List')

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
				<div class="col-lg-10">
				  	<div class="card card-primary">
				  		<div class="card-header">
			                <h5 class="m-0"><strong>PURCHASE DETAILS</strong></h5>
			            </div>
				      
				      <div class="card-body">
				        <!-- <h6 class="card-title">Special title treatment</h6> -->
				        <!-- Table -->

				        <div class="row justify-content-between">

				        	<div class="col-sm-8">
							      <a href="/purchase-list"><button type="button" class="btn btn-outline-secondary">
				      			<i class="fas fa-chevron-left"></i>  Purchases</button></a>

				      		</div>

				      		<div class="col-sm-4">
				      			@foreach($purchaseList as $purchase)
					      			@if($purchase->status == 'pending')
						      			<a href="#"><button type="button" class="btn btn-danger float-right ml-1" id="pending" value="{{$purchase->id}}">
						      			Receive Now</button></a>
						      			<a href="/purchase-product-edit/{{ $purchase->id }}">
						      				<button type="button" class="btn btn-outline-secondary float-right">Edit</button>
				      					</a>
						      		@else
						      			<a href="#"><button type="button" class="btn btn-success float-right ml-1" disabled>
						      			Received</button></a>
						      		@endif
				      			
				      			
				      			@endforeach	  
						    </div>
				        </div>

				        <hr>
				        @foreach($purchaseList as $purchase)
                         
					        <h1>PO {{ $purchase->poNumber }}</h1>  
					        @if($purchase->status == 'pending')
				      			<h4 class="text-danger"  id="status"><strong>Pending</strong></h4>
				      		@else
				      			<h4 class="text-success" id="status1"><strong>Received</strong></h4>
				      		@endif
					        
					      @endforeach
					        <div class="row pt-3">
					        	<div class="col-2">
					        		<p class="mb-0"><strong>Supplier:</strong></p>
							        @foreach($supplier as $s)
								        <p class="mb-0">{{ $s->name }}</p>
								        <p class="mb-0">{{ $s->mobile }}</p>
								        <p class="mb-0">{{ $s->address }}</p>
								        <p class="mb-0">{{ $s->email }}</p>
								        <p class="mb-0">{{ $s->supplier_website }}</p>
							        @endforeach
					        	</div>

					        	@foreach($purchaseList as $purchase)
					        	<div class="col-3">
					        		<p class="mb-0"><strong>Store: </strong><span id="storeSpan">{{ $purchase->store }}</span></p>
							        <p class="mb-0"><strong>Order Date: </strong>{{ $purchase->purchaseDate }}</p>
							        <p class="mb-0"><strong>Order By: </strong>{{ $order_by }}</p>
							    @endforeach
					        	</div>
					        	@foreach($purchaseList as $purchase)
					        	<div class="col-7 pl-5">
					        		<div class="pl-5">
					        			<div class="row pl-5">
					        				<div class="col-6 ">
							          			<h5><strong>Total: </strong></h5>
					        				</div>
					        				<div class="col-6 ">
					        					<h5>{{ number_format($purchase->totalPrice, 2, ".", "") }}</h5>
					        				</div>
					        			</div>
					        			<div class="row pl-5">
					        				<div class="col-6">
							          			<h5><strong>Discount: </strong></h5>
					        				</div>
					        				<div class="col-6 ">
					        					<h5>{{ number_format($purchase->discount, 2, ".", "") }}</h5>
					        				</div>
					        			</div>
					        			<div class="row pl-5">
					        				<div class="col-6 ">
							          			<h5><strong>Other Cost: </strong></h5>
					        				</div>
					        				<div class="col-6 ">
					        					<h5>{{ number_format($purchase->other_cost, 2, ".", "") }}</h5>
					        				</div>
					        			</div>
					        			<div class="row pl-5">
					        				<div class="col-6 ">
							          			<h5><strong>Grand Total: </strong></h5>
					        				</div>
					        				<div class="col-6">
					        					<h5>{{ number_format($purchase->grandTotal, 2, ".", "") }}</h5>
					        				</div>
					        			</div>
									    
					          		</div>
					        	</div>
					        	@endforeach
					        </div>

				        <br>
				        <hr>
				        
				        <h3>Products</h3>

				        @foreach($productList as $product)
				        <input type="hidden" name="purchaseid" id="purchaseid" value="{{ $product->purchaseProductId }}">
				        @endforeach

				         <div class="pt-2 row table-responsive ">
				          	<div class="col-12">
					          	<table id="product_table" class="display" >
								    <thead>
								        <tr>
								        	<th>#</th>	
								        	<th class="hidden">ProductId</th>
								            <th>Product Name</th>
								            <th>Quantity</th>
								            <th>Unit Price</th>
								            <th>MRP</th>
								            <th>Batch No.</th>
								            <th>Total Price</th>
								        </tr>
								    </thead>
								    <tbody>

								    </tbody>
							    </table>
				          	</div>
						</div>
						<div class="row">
				          	<div class="col-11">
				          		
				          	</div>
						</div>

				      </div> <!-- Card-body -->
				    </div>	<!-- Card -->
			  
			</div>   <!-- /.col-lg-6 -->
		</div><!-- /.row -->
	</div>
</div>
</div>
        

@endsection

@section('script')
<script type="text/javascript" src="{{ asset('js/purchaseproductlist.js') }}"></script>
<script type="text/javascript">
	$(document).on('click', '#close', function (e) {
		$('#EDITDiscountMODAL').modal('hide');
	});
	$(document).on('click', '.cancel_btn', function (e) {
		$('#DELETEDiscountMODAL').modal('hide');
	});

	
	
</script>

@endsection


	<!-- {{ asset('js/purchaselist.js') }} -->
