<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Salary;
use Illuminate\Support\Facades\Log;
use App\Models\Expense;
use Illuminate\Support\Carbon;
use App\Models\User;

class SalaryAPIController extends Controller
{
    public function store(Request $request){ 

        $mytime = Carbon::now();
        $mytime->toDateTimeString();
        $my= substr($mytime, 0, 10);

        



       
        $salary = new Salary;

        $salary->employee_id = (int)$request->employeeId;
        $salary->employee_name = $request->employeeName;

        $salaryMonth             = strtotime($request->salaryMonth);
        $salary->salary_month   = date('Y-m-d', $salaryMonth);

        // $salary->salary_month = $request->salaryMonth; 

        $salary->amount = doubleval($request->amount);
        $salary->note = $request->note;
        $salary->image = $request->image;
        $salary->subscriber_id = (int)$request->subscriberId;
        $salary->store_id = (int)$request->storeId;
        

        $salary->save();

        $expense =new Expense;

        

        $expense->amount = doubleval($request->amount);
        $expense->expense_type = "Salary";
        $expense->note =$request->note;
        $expense->subscriber_id = (int)$request->subscriberId;
        $expense->store_id = (int)$request->storeId;
        //$expense->submitted_by   = $userName;
        $expense->expense_date =$my;

        
        $expense->save();
        

        return response() -> json([
                'status'=>200,
                'message' => 'Salary created Successfully!'
            ]);
    }
}
