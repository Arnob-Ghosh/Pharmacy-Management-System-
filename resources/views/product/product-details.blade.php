@extends('layouts.master')
@section('title', 'Product Details')

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
				<div class="col-lg-6">
          			<div class="card card-info">
			            <div class="card-header">
			                <h5 class="m-0"><strong>PRODUCT DETAILS</strong> <i class="fas fa-info-circle float-right"></i></h5>
			            </div>

			            <input type="hidden" id="productid" name="" value="{{ $productId }}">

		              	<div class="card-body">
	          				<div class="container">
	          					{{-- <img id="productimage" src="" width="300px" height="300px"> --}}
	          					<div class="row pt-3">
	          						<div class="col-12 text-left">
	          							<h5><strong><span id="productname"></span></strong></h5>
	          						</div>
	          					</div>
	          					<div class="row">

	          						<div class="col-7 text-left">
	          							<h6><b>Generic Name:</b> <span id="genericname"></span></h6>
	          						</div>
	          					</div>
	          					<div class="row">

	          						<div class="col-7 text-left">
	          							<h6><b>Brand Name:</b> <span id="brandname"></span></h6>
	          						</div>
	          					</div>
	          					<div class="row">

	          						<div class="col-7 text-left">
	          							<h6><b>Category:</b> <span id="category"></span></h6>
	          						</div>
	          					</div>
	          					<div class="row">

	          						<div class="col-7 text-left">
	          							<h6><b>SKU:</b> <span id="sku"></span></h6>
	          						</div>
	          					</div>
	          					<div class="row">

	          						<div class="col-7 text-left">
	          							<h6><b>Barcode:</b> <span id="barcode"></span></h6>
	          						</div>
	          					</div>
	          					<div class="row">

	          						<div class="col-7 text-left">
	          							<h6><b>Supplier:</b> <span id="supplier"></span></h6>
	          						</div>
	          					</div>
	          					<div class="row">

	          						<div class="col-7 text-left">
	          							<h6><b>Batch:</b> <span id="batch"></span></h6>
	          						</div>
	          					</div>
	          					<div class="row">

	          						<div class="col-7 text-left">
	          							<h6><b>Expiry Date:</b> <span id="expirydate"></span></h6>
	          						</div>
	          					</div>
	          					<div class="row">

	          						<div class="col-7 text-left">
	          							<h6><b>Unit:</b> <span id="unit"></span></h6>
	          						</div>
	          					</div>
	          					<!-- <div class="row">

	          						<div class="col-7 text-left">
	          							<h6>MRP: <span id="mrp"></span></h6>
	          						</div>
	          					</div>
	          					<div class="row">

	          						<div class="col-7 text-left">
	          							<h6>Purchase Cost: <span id="purchasecost"></span></h6>
	          						</div>
	          					</div> -->
	          					<div class="row">

	          						<div class="col-7 text-left">
	          							<h6><b>Strength:</b> <span id="strength"></span></h6>
	          						</div>
	          					</div>

	          				</div>
	          			</div>
	          		</div>
				</div>
			</div>

    	</div>
	</div>
</div>


@endsection

@section('script')

<script type="text/javascript" src="{{ asset('js/product-details.js') }}"></script>

@endsection
