<?php

namespace App\Observers;

use App\Models\OrderedProductDiscount;
use Illuminate\Support\Facades\Auth;

class OrderedProductDiscountObserver
{
    /**
     * Handle the OrderedProductDiscount "created" event.
     *
     * @param  \App\Models\OrderedProductDiscount  $orderedProductDiscount
     * @return void
     */
    public function creating(OrderedProductDiscount $orderedProductDiscount)
    {
        $orderedProductDiscount->created_by = Auth::user()->subscriber_id;
        // $orderedProductDiscount->created_by = Auth::user()->subscriber_id;


    }

    /**
     * Handle the OrderedProductDiscount "updated" event.
     *
     * @param  \App\Models\OrderedProductDiscount  $orderedProductDiscount
     * @return void
     */
    public function updating(OrderedProductDiscount $orderedProductDiscount)
    {
        $orderedProductDiscount->updated_by = Auth::user()->subscriber_id;
        // $orderedProductDiscount->updated_by = Auth::user()->subscriber_id;

    }

    /**
     * Handle the OrderedProductDiscount "deleted" event.
     *
     * @param  \App\Models\OrderedProductDiscount  $orderedProductDiscount
     * @return void
     */
    public function deleted(OrderedProductDiscount $orderedProductDiscount)
    {
        //
    }

    /**
     * Handle the OrderedProductDiscount "restored" event.
     *
     * @param  \App\Models\OrderedProductDiscount  $orderedProductDiscount
     * @return void
     */
    public function restored(OrderedProductDiscount $orderedProductDiscount)
    {
        //
    }

    /**
     * Handle the OrderedProductDiscount "force deleted" event.
     *
     * @param  \App\Models\OrderedProductDiscount  $orderedProductDiscount
     * @return void
     */
    public function forceDeleted(OrderedProductDiscount $orderedProductDiscount)
    {
        //
    }
}
