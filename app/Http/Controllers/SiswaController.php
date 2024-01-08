<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use App\Models\Lembaga;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\SiswaCollection;


class SiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $siswa = new SiswaCollection(Siswa::with('lembaga')->paginate(5));
        $lembaga = Lembaga::get();
        return Inertia::render('Dashboard',[
            'title' => 'Dashboard',
            'siswa' => $siswa,
            'lembaga' => $lembaga,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
     $lembaga = Lembaga::get();
     return Inertia::render('Createsiswa', [
        'lembaga' => $lembaga,
        'message' => session('message'),
     ]);   
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Siswa $siswa)
    {
        Validator::make($request->all(), [
            'nama' => ['required'],
            'email' => 'required | email',
            'lembaga_id' => ['required'],
            'foto' => 'required | max:100',
            'nis' => 'required|numeric|unique:siswas'
        ])->validate();
        if ($request->hasFile('foto')) {
            $uploadedFile = $request->file('foto');
            $originalFileName = $uploadedFile->getClientOriginalName();
            $photoFileName = $uploadedFile->storeAs('siswa-photos', $originalFileName, 'public');
        }
        $siswa = new Siswa();
        $siswa->nama = $request->nama;
        $siswa->email = $request->email;
        $siswa->lembaga_id = $request->lembaga_id;
        $siswa->nis = $request->nis;
        $siswa->foto = $originalFileName;
        $siswa->save();
        return redirect()->to('dashboard')->with('message', 'Data siswa berhasil ditambah');
    }

    /**
     * Display the specified resource.
     */
    public function show(Siswa $siswa)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Siswa $siswa, Request $request)
    {
        return Inertia::render('Editsiswa',[
            'siswa' => $siswa->find($request->id),
            'lembaga' => Lembaga::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Siswa $siswa)
    {
        $siswa = Siswa::find($request->id);
        if($request->nis == $siswa->nis){
        Validator::make($request->all(), [
            'nama' => ['required'],
            'email' => 'required | email',
            'lembaga_id' => ['required'],
            'foto' => 'max:100',
        ])->validate();
        } else{
            Validator::make($request->all(), [
                'nama' => ['required'],
                'email' => 'required | email',
                'lembaga_id' => ['required'],
                'foto' => 'max:100',
                'nis' => 'required|numeric|unique:siswas'
            ])->validate();
        }
        $siswa->update([
            'nama' => $request->nama,
            'email' => $request->email,
            'lembaga_id' => $request->lembaga_id,
            'nis' => $request->nis,
        ]);
        
        if ($request->hasFile('foto')) {
            $uploadedFile = $request->file('foto');
            $originalFileName = $uploadedFile->getClientOriginalName();
            $photoFileName = $uploadedFile->storeAs('siswa-photos', $originalFileName, 'public');
            $siswa->update(['foto' =>  $originalFileName]);
        }
          return redirect()->to('dashboard')->with('message', 'Data siswa berhasil diupdate');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Siswa $siswa, Request $request)
    {
        Siswa::find($request->id)->delete();
        return redirect()->to('dashboard')->with('message', 'Data siswa berhasil dihapus');
    }
}
