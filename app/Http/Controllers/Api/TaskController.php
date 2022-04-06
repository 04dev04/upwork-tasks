<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function show()
    {
        return Task::all();
    }

    public function create(Request $request)
    {
        Task::create([
            'title' => $request->title,
            'completed' => 'no'
        ]);

        return response()->json(['success' => true]);
    }

    public function delete($id)
    {
        return Task::find($id)->delete();
    }

    public function complete($id)
    {
        return Task::find($id)->update([
            'completed' => 'yes'
        ]);
    }
}
