<?php

namespace App\Observers;

use App\Models\Expense;
use Illuminate\Support\Facades\Auth;

class ExpenseObserver
{
    /**
     * Handle the Expense "created" event.
     *
     * @param  \App\Models\Expense  $expense
     * @return void
     */
    public function creating(Expense $expense)
    {
        // $expense->created_by = Auth::user()->subscriber_id;
        // $expense->created_by = Auth::user()->subscriber_id;
         if(session()->has('subscriberId')){
            $expense->created_by = Session('subscriberId');
        }
        else{
            $expense->created_by = Auth::user()->subscriber_id;
        }
    }

    /**
     * Handle the Expense "updated" event.
     *
     * @param  \App\Models\Expense  $expense
     * @return void
     */
    public function updating(Expense $expense)
    {
        // $expense->updated_by = Auth::user()->subscriber_id;
        $expense->updated_by = Auth::user()->subscriber_id;
    }

    /**
     * Handle the Expense "deleted" event.
     *
     * @param  \App\Models\Expense  $expense
     * @return void
     */
    public function deleted(Expense $expense)
    {
        //
    }

    /**
     * Handle the Expense "restored" event.
     *
     * @param  \App\Models\Expense  $expense
     * @return void
     */
    public function restored(Expense $expense)
    {
        //
    }

    /**
     * Handle the Expense "force deleted" event.
     *
     * @param  \App\Models\Expense  $expense
     * @return void
     */
    public function forceDeleted(Expense $expense)
    {
        //
    }
}
