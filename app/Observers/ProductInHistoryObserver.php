<?php

namespace App\Observers;

use App\Models\ProductInHistory;
use Illuminate\Support\Facades\Auth;


class ProductInHistoryObserver
{
    /**
     * Handle the ProductInHistory "created" event.
     *
     * @param  \App\Models\ProductInHistory  $productInHistory
     * @return void
     */
    public function creating(ProductInHistory $productInHistory)
    {
        $productInHistory->created_by = Auth::user()->subscriber_id;
        
    }

    /**
     * Handle the ProductInHistory "updated" event.
     *
     * @param  \App\Models\ProductInHistory  $productInHistory
     * @return void
     */
    public function updating(ProductInHistory $productInHistory)
    {
         $productInHistory->updated_by = Auth::user()->subscriber_id;
        
    }

    /**
     * Handle the ProductInHistory "deleted" event.
     *
     * @param  \App\Models\ProductInHistory  $productInHistory
     * @return void
     */
    public function deleted(ProductInHistory $productInHistory)
    {
        //
    }

    /**
     * Handle the ProductInHistory "restored" event.
     *
     * @param  \App\Models\ProductInHistory  $productInHistory
     * @return void
     */
    public function restored(ProductInHistory $productInHistory)
    {
        //
    }

    /**
     * Handle the ProductInHistory "force deleted" event.
     *
     * @param  \App\Models\ProductInHistory  $productInHistory
     * @return void
     */
    public function forceDeleted(ProductInHistory $productInHistory)
    {
        //
    }
}
