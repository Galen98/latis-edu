<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Models\User;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;
class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function editProfile(){
        return Inertia::render('Profiles',[
            'title' => 'Profile' 
        ]);
    }

    public function update(Request $request, User $user){
        $user = auth()->user();
        $this->validate($request, [
            'name' => 'required|string',
            'email' => 'required|email',
            'position' => 'nullable|string',
        ]);
        User::where('id', $request->id)->update([
            'name' => $request->name,
            'email' => $request->email,
            'position' => $request->position
          ]);
        if ($request->hasFile('photo')) {
            $photoFileName = $request->file('photo')->storeAs('profile-photos', $user->id . '_photo.jpg', 'public');
            $namePhoto = $user->id . '_photo.jpg';
            $user->update(['photo' => $namePhoto]);
        }
        return redirect()->to('dashboard')->with(
        'message', 'Update profile berhasil');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
