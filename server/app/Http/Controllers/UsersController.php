<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\HasApiTokens;

class UsersController extends Controller
{
    public function register(Request $request)
    {

        $validator = Validator::make(

            $request->all(),
            [
                'firstname' => 'required|string|min:4',
                'lastname' => 'required|string',
                'email' => 'required|string|unique:users,email',
                'password' => 'required|string|confirmed',
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => "422",
                'validate_err' => $validator->errors(),
            ]);
        }



        $user = User::create([
            'firstname' => request()->firstname,
            'lastname' =>  request()->lastname,
            'email' => request()->email,
            'password' => bcrypt(request()->password)
        ]);


        $token = $user->createToken($user->email . '_Token')->plainTextToken;

        return response()->json([
            'status' => 200,
            'username' => $user->email,
            'data' => $user,
            'token' => $token,
            'message' => 'Successfully Registered',
        ]);
    }

    public function login()
    {
        $validate = Validator::make(request()->all(), [
            'email' => ' required',
            'password' => ' required',
        ]);
        if ($validate->fails()) {
            return response()->json([
                'status' => "422",
                'validate_err' => $validate->errors(),
            ]);
        } else {
            $user = User::where('email', request()->email)->first();

            if (!$user || !Hash::check(request()->password, $user->password)) {
                return response()->json([
                    'status' => 401,
                    'message' => 'Invalid Credentials'
                ]);
            } else {

                $token = $user->createToken($user->email . '_Token')->plainTextToken;

                return response()->json([
                    'status' => 200,
                    'username' => $user->email,
                    'data' => $user,
                    'token' => $token,
                    'message' => 'Successfully Login',
                ]);
            }
        }
    }

    public function logout(Request $request, User $user)
    {
        $user->tokens()->delete();
        return [
            'status' => 200,
            'message' => 'Logged Out'
        ];
    }
}