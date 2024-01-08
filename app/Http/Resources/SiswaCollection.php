<?php

namespace App\Http\Resources;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class SiswaCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray($request)
    {
        return [
            'data' => $this->collection,
        ];
    }
}
