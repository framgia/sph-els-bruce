<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'score' => 'array'
    ];

    public function lesson()
    {
        return $this->hasMany(Lesson::class);
    }
}
