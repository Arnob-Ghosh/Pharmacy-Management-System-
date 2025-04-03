@extends('layouts.master')
@section('title', 'Create User')

@section('content')
<div class="content-wrapper" id="">
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
                <div class="col-lg-6">

                    <div class="card card-primary">
                        <div class="card-header">
                            <h5 class="m-0"><strong><i class="fas fa-user-plus"></i> CREATE USER</strong></h5>
                        </div>
                        <div class="card-body">
                            <form id="AddUserForm" action="" method="POST" enctype="multipart/form-data">
                            <!-- <form action="{{ route('user.create') }}" method="POST" enctype="multipart/form-data"> -->
                                {{ csrf_field() }}
                                <div class="form-row">
                                    <div class="form-group col-md-6 col-sm-12">
                                        <label for="name" style="font-weight: normal;">Name<span class="text-danger"><strong>*</strong></span></label>
                                        <input type="text" class="form-control w-75" id="name" name="name"
                                            placeholder="e.g. Jhon">
                                        <h6 class="text-danger pt-1" id="wrongname" style="font-size: 14px;"></h6>

                                    </div>
                                    <div class="form-group col-md-6 col-sm-12">
                                        <label for="email" style="font-weight: normal;">Email<span class="text-danger"><strong>*</strong></span></label>
                                        <input type="email" class="form-control w-75" id="email" name="email"
                                            placeholder="jhon@example.com">
                                        <h6 class="text-danger pt-1" id="wrongemail" style="font-size: 14px;"></h6>

                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6 col-sm-12">
                                        <label for="password" style="font-weight: normal;">Password<span class="text-danger"><strong>*</strong></span></label>
                                        <input type="password" class="form-control w-75" id="password" name="password"
                                            placeholder="User password here ">
                                        <h6 class="text-danger pt-1" id="wrongpassword" style="font-size: 14px;"></h6>

                                    </div>
                                    <div class="form-group col-md-6 col-sm-12">
                                        <label for="password_confirmation" style="font-weight: normal;">Confirm Password<span class="text-danger"><strong>*</strong></span></label>
                                        <input type="password" class="form-control w-75" id="password_confirmation"
                                            name="password_confirmation" placeholder="Confirm password">
                                        <h6 class="text-danger pt-1" id="wrongpassword_confirmation" style="font-size: 14px;"></h6>

                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6 col-sm-12">
                                        <label for="contactnumber" style="font-weight: normal;">Contact Number<span class="text-danger"><strong>*</strong></span></label>
                                        <input type="text" class="form-control w-75" id="contactnumber" name="contactnumber"
                                            placeholder="e.g. 01XXXXXXXXX">
                                        <h6 class="text-danger pt-1" id="wrongcontactnumber" style="font-size: 14px;"></h6>

                                    </div>
                                    <div class="form-group col-md-6 col-sm-12">
                                        <label for="store" style="font-weight: normal;">Assign Store<span class="text-danger"><strong>*</strong></span></label><br>
                                        <select class="selectpicker" data-live-search="true" aria-label="Default select example" name="store"
                                          id="store" title="Select store" data-width="200px">
                                            <!-- <option value="default" selected>Select Store</option> -->
                                            @foreach($stores as $store)
                                            <option value="{{ $store->id }}">{{ $store->store_name  }}</option>
                                            @endforeach
                                        </select>
                                        <h6 class="text-danger pt-1" id="wrongstore" style="font-size: 14px;"></h6>

                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6 col-sm-6">
                                        <label for="roles" style="font-weight: normal;">Assign Roles<span class="text-danger"><strong>*</strong></span></label><br>
                                            <select name="roles" id="roles" class="selectpicker" data-live-search="true" aria-label="Default select example"
                                             title="Select role" data-width="75%">
                                            @foreach($roles as $role)
                                                <option value="{{ $role->id }}">{{ $role->name }}</option>
                                            @endforeach
                                        </select>
                                        <h6 class="text-danger pt-1" id="wrongroles" style="font-size: 14px;"></h6>

                                    </div>

                                </div>

                                <div class="row">
                                    <div class="col-12">
                                        <button type="submit" class="btn btn-primary mt-2">Create</button>
                                        <button type="reset" value="Reset" class="btn btn-outline-danger mt-2 col-form-label" onclick="resetButton()"><i class="fas fa-eraser"></i> Reset</button>
                                    </div>
                                </div>


                            </form>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection
@section('script')
<script type="text/javascript" src="{{ asset('js/user.js') }}"></script>

<script type="text/javascript">
function resetButton(){
    $('form').on('reset', function() {
        setTimeout(function() {
            $('.selectpicker').selectpicker('refresh');
        });
    });
}
</script>
@endsection

