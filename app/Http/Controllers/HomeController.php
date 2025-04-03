<?php

namespace App\Http\Controllers;

use Log;
use Session;

use Carbon\Carbon;
use App\Models\Pos;
use App\Models\User;
use App\Models\Store;
use App\Models\Subscriber;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index(){
        // return view('layouts/master');

        $timestamp = Carbon::now();
        $date = $timestamp->toDateString();
        $monthName = Carbon::createFromFormat('Y-m-d', $date)->month;

        if (Auth::user()->first_time_login) {
            $first_time_login = true;
            Auth::user()->first_time_login = false;
            Auth::user()->save();
        } else {
            $first_time_login = false;
        }

        $users = Subscriber::join("users", "subscribers.id","=", "users.subscriber_id")
                                ->where("users.id", Auth::user()->id)
                                ->get();

        foreach($users as $user){
            $subscriberId = $user->subscriber_id;
        }

        $stores = Store::where('subscriber_id', Auth::user()->subscriber_id)->get();
        // Log::info($stores);


        if($stores->isNotEmpty()){
            foreach($stores as $store){
                $storeId = $store->id;
            }
            $poses = Pos::where('store_id', $storeId)->get();
            $subscriberId = Auth::user()->subscriber_id;

            $subscriber = Subscriber::find($subscriberId);
            $orgName = $subscriber->org_name;
            $orgLogo = $subscriber->logo;
            Session::put('orgNameMaster', $orgName);
            Session::put('orgLogo', $orgLogo);
        }
        else{
            $poses=0;
        }

        return view(
            'home',
            ['first_time_login' => $first_time_login, 'stores' => $stores, 'poses' => $poses, 'monthName' => $monthName]
        );

        // return $store;

    }


}
