<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;



    public function words()
    {
        return $this->hasMany(Word::class);
    }


    public function category()
    {
        return $this->hasOne(Category::class);
    }
}
