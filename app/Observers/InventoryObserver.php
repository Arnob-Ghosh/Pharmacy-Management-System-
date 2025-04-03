<?php

namespace App\Observers;

use App\Models\Inventory;
use Illuminate\Support\Facades\Auth;


class InventoryObserver
{
    /**
     * Handle the Inventory "created" event.
     *
     * @param  \App\Models\Inventory  $inventory
     * @return void
     */
    public function creating(Inventory $inventory)
    {
        if(session()->has('subscriberId')){
            $inventory->created_by = Session('subscriberId');
        }
        else{
            $inventory->created_by = Auth::user()->subscriber_id;
        }
    }

    /**
     * Handle the Inventory "updated" event.
     *
     * @param  \App\Models\Inventory  $inventory
     * @return void
     */
    public function updating(Inventory $inventory)
    {
        $inventory->updated_by = Auth::user()->subscriber_id;
    }

    /**
     * Handle the Inventory "deleted" event.
     *
     * @param  \App\Models\Inventory  $inventory
     * @return void
     */
    public function deleted(Inventory $inventory)
    {
        //
    }

    /**
     * Handle the Inventory "restored" event.
     *
     * @param  \App\Models\Inventory  $inventory
     * @return void
     */
    public function restored(Inventory $inventory)
    {
        //
    }

    /**
     * Handle the Inventory "force deleted" event.
     *
     * @param  \App\Models\Inventory  $inventory
     * @return void
     */
    public function forceDeleted(Inventory $inventory)
    {
        //
    }
}
