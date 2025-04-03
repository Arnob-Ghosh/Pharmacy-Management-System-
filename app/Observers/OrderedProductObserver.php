<?php

namespace App\Observers;

use App\Models\OrderedProduct;
use Illuminate\Support\Facades\Auth;


class OrderedProductObserver
{
    /**
     * Handle the OrderedProduct "created" event.
     *
     * @param  \App\Models\OrderedProduct  $orderedProduct
     * @return void
     */
    public function creating(OrderedProduct $orderedProduct)
    {
        $orderedProduct->created_by = 'subscriber_id';
        // $orderedProduct->created_by = Auth::user()->subscriber_id;

        
    }

    /**
     * Handle the OrderedProduct "updated" event.
     *
     * @param  \App\Models\OrderedProduct  $orderedProduct
     * @return void
     */
    public function updating(OrderedProduct $orderedProduct)
    {
        $orderedProduct->updated_by = 'subscriber_id';
        // $orderedProduct->updated_by = Auth::user()->subscriber_id;

        
    }

    /**
     * Handle the OrderedProduct "deleted" event.
     *
     * @param  \App\Models\OrderedProduct  $orderedProduct
     * @return void
     */
    public function deleted(OrderedProduct $orderedProduct)
    {
        //
    }

    /**
     * Handle the OrderedProduct "restored" event.
     *
     * @param  \App\Models\OrderedProduct  $orderedProduct
     * @return void
     */
    public function restored(OrderedProduct $orderedProduct)
    {
        //
    }

    /**
     * Handle the OrderedProduct "force deleted" event.
     *
     * @param  \App\Models\OrderedProduct  $orderedProduct
     * @return void
     */
    public function forceDeleted(OrderedProduct $orderedProduct)
    {
        //
    }
}
