<?php

namespace App\Observers;

use App\Models\DuePayment;
use Illuminate\Support\Facades\Auth;

class DuePaymentObserver
{
    /**
     * Handle the DuePayment "created" event.
     *
     * @param  \App\Models\DuePayment  $duePayment
     * @return void
     */
    public function creating(DuePayment $duePayment)
    {
        // $duePayment->created_by = Auth::user()->subscriber_id;
        $duePayment->created_by = 'subscriber_id';
    }

    /**
     * Handle the DuePayment "updated" event.
     *
     * @param  \App\Models\DuePayment  $duePayment
     * @return void
     */
    public function updating(DuePayment $duePayment)
    {
        // $duePayment->updated_by = Auth::user()->subscriber_id;
        $duePayment->updated_by = 'subscriber_id';
    }

    /**
     * Handle the DuePayment "deleted" event.
     *
     * @param  \App\Models\DuePayment  $duePayment
     * @return void
     */
    public function deleted(DuePayment $duePayment)
    {
        //
    }

    /**
     * Handle the DuePayment "restored" event.
     *
     * @param  \App\Models\DuePayment  $duePayment
     * @return void
     */
    public function restored(DuePayment $duePayment)
    {
        //
    }

    /**
     * Handle the DuePayment "force deleted" event.
     *
     * @param  \App\Models\DuePayment  $duePayment
     * @return void
     */
    public function forceDeleted(DuePayment $duePayment)
    {
        //
    }
}
