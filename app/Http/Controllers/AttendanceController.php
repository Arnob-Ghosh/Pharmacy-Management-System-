<?php

namespace App\Http\Controllers;

use DB;
use Log;
use Carbon\Carbon;
use App\Models\Shift;
use App\Models\Holiday;
use App\Models\Weekend;
use App\Models\Employee;

use App\Models\Attendance;
use Illuminate\Http\Request;
use App\Models\EmployeeLeave;

use App\Models\ShiftAllocation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AttendanceController extends Controller
{
    public function create(){
        $date=Carbon::now()->format('Y-m-d');
        $total_present=Attendance::whereDate('attendance_date',$date)
        ->where('attendance_status','!=' ,'Absent')->count();
        $total_emp=DB::table('employee_tables')->count();

        // log::info($total_emp);
        return view('attendance/attendance',['presnet_today'=>$total_present,'total_emp'=>$total_emp]);
    }

    public function employeeList(){
        $todayDate = Carbon::today();

        $day = Carbon::parse($todayDate)->dayName;

        $data = DB::table('employee_tables')
                ->join('attendances', function($join) {
                        $join->on('employee_tables.id', '=', 'attendances.employee_id');
                    })
                // ->whereNull('attendances.employee_id')
                ->where([
                    ['attendances.attendance_date', $todayDate],
                    ['attendances.subscriber_id', Auth::user()->subscriber_id]
                ])
            ->get();

        // Log::info($day);

        if($data->isEmpty()){

            $employees = DB::table('employee_tables')->where('subscriber_id', Auth::user()->subscriber_id)->get();

            $checkHoildays = Holiday::where('subscriber_id', Auth::user()->subscriber_id)
                ->whereDate('start_date', '<=', $todayDate)
                ->whereDate('end_date', '>=', $todayDate)
                ->first();

            $checkWeekends = Weekend::where([
                ['subscriber_id', Auth::user()->subscriber_id],
                ['weekend_name', $day]
            ])->first();

            // $checkLeaves = DB::table('employee_tables')
            //     ->join('employee_leaves', function($join) {
            //             $join->on('employee_tables.id', '=', 'employee_leaves.employee_id');
            //         })
            //     // ->whereNull('attendances.employee_id')
            //     ->where([
            //         ['employee_leaves.subscriber_id', Auth::user()->subscriber_id]
            //     ])
            //     ->whereDate('start_date', '<=', $todayDate)
            //     ->whereDate('end_date', '>=', $todayDate)
            //     ->get();

            // Log::info($checkLeaves);

            if($checkHoildays){
                return response() -> json([
                    'status'=>200,
                    'message' => 'holiday',
                    'data' => $employees,
                    'holidayName' => $checkHoildays->holiday_name
                ]);
            }else{
                if($checkWeekends){
                    return response() -> json([
                        'status'=>200,
                        'message' => 'weekend',
                        'data' => $employees,
                        'weekendName' => 'Weekend'
                    ]);
                }else{
                    return response() -> json([
                        'status'=>200,
                        'message' => 'No data',
                        'data' => $employees,
                        'holidayName' => 'Absent'
                    ]);
                }

            }
        }

        return response() -> json([
            'status'=>200,
            'message' => 'Success',
            'data' => $data
        ]);
    }

    public function attendanceStatus(Request $request){
        $empId = $request->employeeId;
        $signIn = $request->signInTime.':00';
        $signOut = $request->signOutTime.':00';

        $shifts = ShiftAllocation::where('employee_id', $empId)->get();
        $today = Carbon::now()->format('Y-m-d');

        // Log::info($empId);
        foreach($shifts as $shift){
            if($shift->end_date >= $today){

                $sihftCheck = Shift::where('id', $shift->shift_id)->first();
                if( $sihftCheck->in_time >= $signIn ){

                    if($sihftCheck->out_time > $signOut){
                        return response() -> json([
                            'status'=>200,
                            'message' => 'Early out'
                        ]);
                    }else{
                        return response() -> json([
                            'status'=>200,
                            'message' => 'Present'
                        ]);
                    }

                }else{

                    if($sihftCheck->out_time > $signOut){
                        return response() -> json([
                            'status'=>200,
                            'message' => 'Late in & Early out'
                        ]);
                    }else{
                        return response() -> json([
                            'status'=>200,
                            'message' => 'Late In'
                        ]);
                    }

                }

            }
        }

        return response() -> json([
            'status'=>200,
            'message' => 'No allocated shift',

        ]);

    }

    public function employeeListDateWise($date){
        // $data = Attendance::rightjoin('employee_tables', function($join) {
        //             $join->on('attendances.employee_id', '=', 'employee_tables.id');
        //             })
        //         ->whereNull('employee_tables.id')
        //         ->where([
        //             ['attendances.attendance_date', $date],
        //             ['attendances.subscriber_id', Auth::user()->subscriber_id]
        //         ])
        //     ->get();

         $day = Carbon::parse($date)->dayName;

        $data = DB::table('employee_tables')
                ->join('attendances', function($join) {
                        $join->on('employee_tables.id', '=', 'attendances.employee_id');
                    })
                // ->whereNull('attendances.employee_id')
                ->where([
                    ['attendances.attendance_date', $date],
                    ['attendances.subscriber_id', Auth::user()->subscriber_id]
                ])
            ->get();



        if($data->isEmpty()){

            $employees = DB::table('employee_tables')->where('subscriber_id', Auth::user()->subscriber_id)->get();

            $checkHoildays = Holiday::where('subscriber_id', Auth::user()->subscriber_id)
                ->whereDate('start_date', '<=', $date)
                ->whereDate('end_date', '>=', $date)
                ->first();

            $checkWeekends = Weekend::where([
                ['subscriber_id', Auth::user()->subscriber_id],
                ['weekend_name', $day]
            ])->first();

            $checkLeaves = DB::table('employee_tables')
            ->leftjoin('employee_leaves', function($join) {
                    $join->on('employee_tables.id', '=', 'employee_leaves.employee_id');
                })
            // ->whereNull('employee_leaves.employee_id')
            ->where([
                ['employee_leaves.subscriber_id', Auth::user()->subscriber_id]
            ])
            ->whereDate('employee_leaves.start_date', '<=', $date)
            ->whereDate('employee_leaves.end_date', '>=', $date)
            ->get();

            $employeesX = [];
            $attendance_status = 'false';
            $leave_status = '';

            foreach($employees as $employee){
                foreach($checkLeaves as $checkLeave){
                    if($employee->id == $checkLeave->employee_id){
                        $attendance_status = 'true';
                        $leave_status = $checkLeave->leave_status;
                    }
                }
                if($attendance_status != 'false' && $leave_status != ''){
                    $employeeX = [
                        'id' => $employee->id,
                        'employee_name' => $employee->employee_name,
                        'designation' => $employee->designation,
                        'department' => $employee->department,
                        'attendance_status' => $attendance_status,
                        'leave_status' => $leave_status,
                    ];

                    $employeesX[] = $employeeX;
                }else{
                    $employeeX = [
                        'id' => $employee->id,
                        'employee_name' => $employee->employee_name,
                        'designation' => $employee->designation,
                        'department' => $employee->department,
                        'attendance_status' => 'false',
                        'leave_status' => '',
                    ];

                    $employeesX[] = $employeeX;
                }

            }



            // Log::info(json_encode($employeesX));

            // Log::info($checkHoildays);

            if($checkHoildays){
                return response() -> json([
                    'status'=>200,
                    'message' => 'holiday',
                    'data' => $employees,
                    'holidayName' => $checkHoildays->holiday_name
                ]);
            }elseif($checkWeekends){
                return response() -> json([
                        'status'=>200,
                        'message' => 'weekend',
                        'data' => $employees,
                        'weekendName' => 'Weekend'
                    ]);
            }else{
                 if($checkLeaves->isEmpty()){
                    return response() -> json([
                        'status'=>200,
                        'message' => 'absent',
                        'data' => $employees,
                        'absent' => 'Absent'
                    ]);

                }else{
                    return response() -> json([
                        'status'=>200,
                        'message' => 'leave',
                        'data' => $employeesX,
                    ]);
                }
            }
        }

        return response() -> json([
            'status'=>200,
            'message' => 'Success',
            'data' => $data
        ]);
    }

    public function attendanceSubmit(Request $request){

        $checkAttendance = Attendance::where([
                    ['attendance_date', $request->attendanceDate],
                    ['subscriber_id', Auth::user()->subscriber_id]
                ])->get();

        // Log::info($checkAttendance);

        if($checkAttendance->isEmpty()){
            foreach($request->attendanceList as $attendance){
                $newAttendance = new Attendance;
                $newAttendance->employee_name = $attendance['employee_name'];
                $newAttendance->employee_id = $attendance['employee_id'];
                $newAttendance->designation = $attendance['designation'];
                $newAttendance->department = $attendance['department'];
                $newAttendance->attendance_date = $attendance['attendance_date'];
                $newAttendance->sign_in = $attendance['sign_in'];
                $newAttendance->sign_out = $attendance['sign_out'];
                $newAttendance->stay_time = $attendance['stay_time'];
                $newAttendance->attendance_status = $attendance['status'];
                $newAttendance->subscriber_id = Auth::user()->subscriber_id;
                $newAttendance->save();

            }

            return response() -> json([
                'status'=>200,
                'message' => 'Attendance taken successfully!'
            ]);
        }else{
            foreach($checkAttendance as $check){
                foreach($request->attendanceList as $attendance){
                    if($check->employee_id == $attendance['employee_id']){
                        $id = $check->id;
                        $updateAttendance = Attendance::find($id);
                        $updateAttendance->sign_in = $attendance['sign_in'];
                        $updateAttendance->sign_out = $attendance['sign_out'];
                        $updateAttendance->stay_time = $attendance['stay_time'];
                        $updateAttendance->attendance_status = $attendance['status'];
                        $updateAttendance->save();
                    }
                }
            }
            return response() -> json([
                'status'=>200,
                'message' => 'Attendance updated successfully!'
            ]);
        }
    }


    public function employeereports_create()
    {

        return view('attendance/employeereports');


    }



    public function employeereports_list(Request $request)
    {
        //log::info();

         // SELECT employee_name,COUNT(CASE WHEN attendance_status = 'Late In' THEN 1 END) AS present_count,
        //  COUNT(CASE WHEN attendance_status = 'Absent' THEN 1 END) AS absent_count FROM `attendances`
        // WHERE MONTH(attendance_date) = MONTH(CURRENT_DATE()) AND YEAR(attendance_date) = YEAR(CURRENT_DATE()) GROUP BY employee_id;
        if($request->has('month')){
            $month=$request->month;
        }
        else{

            $month=Carbon::now()->month;
        }

        $employeereports_create= DB::table("attendances")
        ->select("employee_name","employee_id","designation","department",
        DB::raw('SUM(CASE WHEN attendance_status = "Present" THEN 1 ELSE 0 END) as present_count'),
        DB::raw('SUM(CASE WHEN attendance_status = "Absent" THEN 1 ELSE 0 END) as absent_count'),
        DB::raw('SUM(CASE WHEN attendance_status = "Late In" THEN 1 ELSE 0 END) as late_count'))
        ->whereMonth('attendance_date', '=', $month)
        ->whereYear('attendance_date', '=', '2023')
        ->groupBy("employee_id")->get();


        //log::info($request);



        return response()-> json([
            'status'=>200,
            'data' => $employeereports_create
        ]);



    }
}
