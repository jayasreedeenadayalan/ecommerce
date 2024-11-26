<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    //regsiter process API
    function register(Request $req){
        $user = new User;
        if(!empty($req->input('name')) && !empty($req->input('email')) && !empty($req->input('password')) ) {
            $user->name = $req->input('name');
            $user->email_id = $req->input('email');
            $user->password =Hash::make($req->input('password'));
            $user->save();
            return $user;
        }else{
            return $user['message'] = 'input is missing';
        }

    }
    //Login Api
    function login(Request $req){
        $user = new User;
        if(!empty($req->email) && !empty($req->password)){

            $result = $user::where('email_id',$req->email)->first();
            if(empty($result)){
               $error['error'] = 'No User Found';
            }elseif(!empty($result)){
                if(Hash::check($req->password,$result['password'])){
                   return $result;
                }else{
                     $error['error'] = 'Incorrect username/Password ';
                }
            }

        }else{
            $error['error'] = 'Email and Password is Required';
        }
        return !empty($error) ? $error : $result;

    }
}
