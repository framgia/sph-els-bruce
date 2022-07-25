<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\Word;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WordController extends Controller
{
    public function store(Lesson $lesson)
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
                'lesson_id' => 'required|integer',
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
            'lesson_id' =>  request()->lesson_id,
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
