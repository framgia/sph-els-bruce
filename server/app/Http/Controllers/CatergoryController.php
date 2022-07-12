<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CatergoryController extends Controller
{
    public function index()
    {
        $category = Category::all();

        return response()->json(
            $category,
            200
        );
    }


    public function edit($id)
    {
        $category = Category::find($id);

        return response()->json(
            $category,
            200
        );
    }

    public function update($id)
    {
        $validator = Validator::make(

            request()->all(),
            [
                'title' => 'required|string',
                'description' => 'required|string',
            ]
        );

        if ($validator->fails()) {
            return response()->json(
                $validator->errors(),
                422
            );
        }

        $category = Category::find($id);
        $category->title = request()->input('title');
        $category->description = request()->input('description');

        $category->update();


        return response()->json([
            'message' => 'Category Updated'
        ], 200);
    }

    public function create()
    {
        $validator = Validator::make(

            request()->all(),
            [
                'title' => 'required|string',
                'description' => 'required|string',
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'validate_err' => $validator->errors()
            ], 422);
        }

        $category = Category::create([
            'title' => request()->title,
            'description' => request()->description,
        ]);

        return response()->json([
            'data' => $category,
            'message' => 'Category Added!'
        ], 200);
    }

    public function destroy($id)
    {
        $category = Category::find($id);
        $category->delete();
        return response()->json(
            ['message' => "Deleted Successfully"],
            200
        );
    }
}
