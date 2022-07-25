<?php

namespace App\Http\Controllers;

use App\Models\Result;
use Illuminate\Support\Facades\Auth;


class ResultController extends Controller
{
    public function create()
    {

        $id = Auth::user()->id;
        $result = Result::create([
            'lesson_id' => request()->lesson_id,
            'users_id' => $id,
            'score' => request()->score,
        ]);

        return response()->json(
            $result
        );
    }
}
