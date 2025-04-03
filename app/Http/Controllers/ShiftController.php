<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Shift;
use App\Models\Subscriber;
use App\Models\ShiftAllocation;

use DB;
use Log;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ShiftController extends Controller
{
    public function create(){
        return view('shift/shift-add');
    }

    public function store(Request $request){

        $messages = [
            'shiftname.required'  =>    "Shift name is required.",
            'intime.required'  =>    "In time is required.",
            'outtime.required'  =>    "Out time is required.",
        ];

        $validator = Validator::make($request->all(), [
            'shiftname' => 'required',
            'intime' => 'required',
            'outtime'  => 'required'
        ], $messages);

        if ($validator->passes()) {
            $shift = new Shift;

            $shift->shift_name = $request->shiftname;
            $shift->in_time = $request->intime;
            $shift->out_time = $request->outtime;
            $shift->subscriber_id = Auth::user()->subscriber_id;
            $shift->user_id = Auth::user()->id;

            $shift->save();

            return response() -> json([
                'status'=>200,
                'message' => 'Shift created Successfully!'
            ]);
        }
        return response()->json(['error'=>$validator->errors()]);        
        
    }

    public function listView(){
        $employees = DB::table('employee_tables')->where('subscriber_id', Auth::user()->subscriber_id)->get();
        // Log::info($employees);
        return view('shift/shift-list', ["employees"=>$employees]);
    }

    public function list(Request $request){

        $shift = Shift::where('subscriber_id', Auth::user()->subscriber_id)->get();

        if($request -> ajax()){
            return response()->json([
                'shift'=>$shift,
                'message'=>'Success'
            ]);
        }
    }

    public function edit($id){
        $shift = Shift::find($id);

        if($shift){
            return response()->json([
                'status'=>200,
                'shift'=>$shift,
                
            ]);
        }
    }

    public function update(Request $request, $id){

        $messages = [
            'shiftname.required'  =>    "Shift name is required.",
            'intime.required'  =>    "In time is required.",
            'outtime.required'  =>    "Out time is required.",
        ];

        $validator = Validator::make($request->all(), [
            'shiftname' => 'required',
            'intime' => 'required',
            'outtime'  => 'required'
        ], $messages);

        if ($validator->passes()) {
            $shift = Shift::find($id);

            $shift->shift_name = $request->shiftname;
            $shift->in_time = $request->intime;
            $shift->out_time = $request->outtime;
            
            $shift->save();
            
            return response() -> json([
                'status'=>200,
                'message' => 'Shift updated successfully'
            ]);
        }
        return response()->json(['error'=>$validator->errors()]);        
        
    }

    public function destroy($id){
        Shift::find($id)->delete($id);
        return redirect('shift-list')->with('status', 'Deleted successfully!');
    }

    public function allocateShift(Request $request){
        $messages = [
            'employee.required'  =>    "Employee is required.",
            'allocateshiftname.required'  =>    "Shift name is required.",
            'startdate.required'  =>    "Start date is required.",
            'enddate.required'  =>    "End date is required.",
        ];

        $validator = Validator::make($request->all(), [
            'employee' => 'required',
            'allocateshiftname' => 'required',
            'startdate'  => 'required',
            'enddate'  => 'required'
        ], $messages);

        if ($validator->passes()) {
            $shiftallocation = new ShiftAllocation;
            $shiftallocation->employee_id = $request->employee;
            $shiftallocation->shift_name = $request->allocateshiftname;
            $shiftallocation->shift_id = $request->shiftid;
            $shiftallocation->start_date = $request->startdate;
            $shiftallocation->end_date = $request->enddate;
            $shiftallocation->subscriber_id = Auth::user()->subscriber_id;
            $shiftallocation->save();
            return response() -> json([
                'status'=>200,
                'message' => 'Shift Allocated Successfully!'
            ]);
        }
        return response()->json(['error'=>$validator->errors()]);        

    }
}
