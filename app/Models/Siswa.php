<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Siswa extends Model
{
    use HasFactory;
    protected $fillable = ['nama', 'email', 'lembaga_id', 'nis', 'foto'];
    public function lembaga(){
        return $this->belongsTo(Lembaga::class, 'lembaga_id');
    }
}
