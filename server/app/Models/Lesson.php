<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function words()
    {
        return $this->hasMany(Word::class);
    }


    public function category()
    {
        return $this->hasOne(Category::class);
    }

    public function Result()
    {
        return $this->hasMany(Result::class);
    }
}
