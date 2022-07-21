<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\Word;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function index($id, Lesson $lesson)
    {

        $lesson = Lesson::find($id);
        $data = $lesson->words()->get();
        $answer =  $lesson->words()->select('answer')->get();
        return response()->json([
            'words' => $data,
            'answer' => $answer,
        ], 200);
    }
}
