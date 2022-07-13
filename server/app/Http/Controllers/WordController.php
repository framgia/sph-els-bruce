<?php

namespace App\Http\Controllers;

use App\Models\Word;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WordController extends Controller
{
    public function store()
    {
        $validator = Validator::make(
            request()->all(),
            [
                'word' => 'required|string|unique:words,word',
                'choiceA' => 'required|string',
                'choiceB' => 'required|string',
                'choiceC' => 'required|string',
                'choiceD' => 'required|string',
                'answer' => 'required|string',
            ]
        );

        if ($validator->fails()) {
            return response()->json(
                $validator->errors(),
                422
            );
        }

        $word = Word::create([
            'word' => request()->word,
            'lesson_id' => 1,
            'choiceA' => request()->choiceA,
            'choiceB' => request()->choiceB,
            'choiceC' => request()->choiceC,
            'choiceD' => request()->choiceD,
            'answer' => request()->answer,
        ]);

        return response()->json([
            $word,
            'message' => 'Category Added!'
        ], 200);
    }
}
