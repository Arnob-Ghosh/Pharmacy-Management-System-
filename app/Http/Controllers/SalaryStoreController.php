<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use DB;
use DateTime;

use App\Models\EmployeeDepartment;
use App\Models\Attendance;
use App\Models\SalaryEmployee;
use App\Models\BenefitList;
use App\Models\SalaryGrade;


class SalaryStoreController extends Controller
{
    public function store(Request $request){

        foreach($request->salaryList as $salary){

            $basicPay = SalaryGrade::where([
                ['id', $salary['salaryGrade']],
                ['subscriber_id', Auth::user()->subscriber_id]
            ])->first();

            $newSalary = new SalaryEmployee;

            $newSalary->employee_id = $salary['employeeId'];
            $newSalary->employee_name = $salary['employeeName'];
            $newSalary->designation = $salary['designation'];
            $newSalary->department = $salary['department'];
            $newSalary->present = $salary['present'];
            $newSalary->absent = $salary['absent'];
            $newSalary->leave = $salary['leave'];
            $newSalary->basic_pay = $salary['basicPay'];
            $newSalary->gross_pay = $salary['basicPay'];
            $newSalary->absent_deduction = $salary['absent_deduction'];
            $newSalary->deduction = $salary['deduction'];
            $newSalary->addition = $salary['addition'];
            //$newSalary->addition = NULL;
            $newSalary->net_pay = $salary['netPay'];
            $newSalary->salary_grade_id = $salary['salaryGrade'];
            $newSalary->salary_month = $salary['salaryMonth'];

            $benefitList = BenefitList::where([
                ['grade_id', $salary['salaryGrade']],
                ['subscriber_id', Auth::user()->subscriber_id]
            ])->get();

            // if($benefitList->isEmpty()){
            //     $newSalary->addition = 0;
            //     $newSalary->deduction = 0;
            // }else{
            //     // $totalAddition = 0;
            //     // $totalDeduction = 0;
            //     foreach($benefitList as $benefit){
            //         if($benefit->benefit_type == "add"){

            //             //$xyz = ($basicPay->basic_pay/100) * $benefit->amount;

            //             $additionBenefits = [
            //                 'benefit_id' => $benefit->benefit_id,
            //                 'benefit_name' => $benefit->benefit_name,
            //                 'amount' => $benefit->amount,
            //                 //'in_amount' => $xyz
            //             ];

            //             $additionBenefitList[] = $additionBenefits;
            //             //log::info($additionBenefits);

            //             // $totalAddition = $totalAddition + $xyz;
            //         }elseif($benefit->benefit_type == "deduct"){

            //             //$xyz = ($basicPay->basic_pay/100) * $benefit->amount;

            //             $deductionBenefits = [
            //                 'benefit_id' => $benefit->benefit_id,
            //                 'benefit_name' => $benefit->benefit_name,
            //                 'amount' => $benefit->amount,
            //                // 'in_amount' => $xyz
            //             ];

            //             $deductionBenefitList[] = $deductionBenefits;
            //             //log::info($deductionBenefits);

            //             // $totalDeduction = $totalDeduction + $xyz;

            //         }
            //     }

            //     //$newSalary->addition = json_encode($additionBenefitList);
            //     //$newSalary->deduction = json_encode($deductionBenefitList);
            //     //log::info($newSalary);
            // }

            $newSalary->subscriber_id = Auth::user()->subscriber_id;
            $newSalary->save();

        }

        return response() -> json([
                'status'=>200,
                'message' => 'Salary paid successfully.',
            ]);
    }
}
