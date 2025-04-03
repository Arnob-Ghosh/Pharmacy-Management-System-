<?php

namespace App\Observers;

use App\Models\OrderedProductTax;
use Illuminate\Support\Facades\Auth;

class OrderedProductTaxObserver
{
    /**
     * Handle the OrderedProductTax "created" event.
     *
     * @param  \App\Models\OrderedProductTax  $orderedProductTax
     * @return void
     */
    public function creating(OrderedProductTax $orderedProductTax)
    {
        $orderedProductTax->created_by = 'subscriber_id';
        // $orderedProductTax->created_by = Auth::user()->subscriber_id;

        
    }

    /**
     * Handle the OrderedProductTax "updated" event.
     *
     * @param  \App\Models\OrderedProductTax  $orderedProductTax
     * @return void
     */
    public function updating(OrderedProductTax $orderedProductTax)
    {
        $orderedProductTax->updated_by = 'subscriber_id';
        // $orderedProductTax->updated_by = Auth::user()->subscriber_id;

    }

    /**
     * Handle the OrderedProductTax "deleted" event.
     *
     * @param  \App\Models\OrderedProductTax  $orderedProductTax
     * @return void
     */
    public function deleted(OrderedProductTax $orderedProductTax)
    {
        //
    }

    /**
     * Handle the OrderedProductTax "restored" event.
     *
     * @param  \App\Models\OrderedProductTax  $orderedProductTax
     * @return void
     */
    public function restored(OrderedProductTax $orderedProductTax)
    {
        //
    }

    /**
     * Handle the OrderedProductTax "force deleted" event.
     *
     * @param  \App\Models\OrderedProductTax  $orderedProductTax
     * @return void
     */
    public function forceDeleted(OrderedProductTax $orderedProductTax)
    {
        //
    }
}
