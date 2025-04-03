<?php

namespace App\Observers;

use App\Models\ProductTransferHistory;
use Illuminate\Support\Facades\Auth;

class ProductTransferHistoryObserver
{
    /**
     * Handle the ProductTransferHistory "created" event.
     *
     * @param  \App\Models\ProductTransferHistory  $productTransferHistory
     * @return void
     */
    public function creating(ProductTransferHistory $productTransferHistory)
    {
        $productTransferHistory->created_by = Auth::user()->subscriber_id;
    }

    /**
     * Handle the ProductTransferHistory "updated" event.
     *
     * @param  \App\Models\ProductTransferHistory  $productTransferHistory
     * @return void
     */
    public function updating(ProductTransferHistory $productTransferHistory)
    {
         $productTransferHistory->updated_by = Auth::user()->subscriber_id;
    }

    /**
     * Handle the ProductTransferHistory "deleted" event.
     *
     * @param  \App\Models\ProductTransferHistory  $productTransferHistory
     * @return void
     */
    public function deleted(ProductTransferHistory $productTransferHistory)
    {
        //
    }

    /**
     * Handle the ProductTransferHistory "restored" event.
     *
     * @param  \App\Models\ProductTransferHistory  $productTransferHistory
     * @return void
     */
    public function restored(ProductTransferHistory $productTransferHistory)
    {
        //
    }

    /**
     * Handle the ProductTransferHistory "force deleted" event.
     *
     * @param  \App\Models\ProductTransferHistory  $productTransferHistory
     * @return void
     */
    public function forceDeleted(ProductTransferHistory $productTransferHistory)
    {
        //
    }
}
