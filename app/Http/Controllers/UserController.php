<?php

namespace App\Http\Controllers;

use Validator;
use App\Models\User;
use App\Helpers\RestApi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    public function index(Request $request)
    {
        if (request()->wantsJson()) {
            $request->validate([
                'search' => ['nullable', 'string'],
                'tampilkan' => ['nullable', 'string']
            ]);

            $data = User::where('name', 'LIKE', "%" . $request->search . "%")
                ->orWhere('email', 'LIKE', "%" . $request->search . "%")
                ->paginate(isset($request->tampilkan) ? $request->tampilkan : 10);

            return response()->json($data, 200);

        } else {
            return response()->json(['message' => 'bad request!'], 401);
        }
    }


    public function store(Request $request)
    {
        if (request()->wantsJson()) {
            $validate = Validator::make($request->all(), [
                'name' => ['required', 'string', 'min:4', 'unique:users,name'],
                'email' => ['required', 'string', 'email', 'unique:users,email'],
                'password' => ['required', 'confirmed']
            ]);

            if ($validate->fails()) {
                $message = [];
                $errors = $validate->errors();
                foreach ($errors->messages() as $err) {
                    $message[] = $err[0];
                }
                return RestApi::error($message, 400);
            }

            $data = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            if ($data) {
                return RestApi::success(['Data Successfully Created'], 201);
            } else {
                return RestApi::error(['Data Failed To Created'], 400);
            }
        } else {
            return RestApi::error(['Bad Request!'], 400);
        }
    }

    public function show($uuid)
    {
        if (request()->wantsJson()) {
            $user = User::where('uuid', $uuid)->first();
            if (!isset($user)) {
                return RestApi::error(['Data Not Found!'], 404);
            }
            return RestApi::success($user, 200);
        } else {
            return RestApi::error(['Bad Request!'], 400);
        }
    }

    public function update(Request $request, $uuid)
    {
        if (request()->wantsJson()) {
            $validate = Validator::make($request->all(), [
                'name' => ['required', 'string', 'min:4', 'unique:users,name'],
                'email' => ['required', 'string', 'email'],
                'password' => ['nullable', 'confirmed'],
            ]);

            if ($validate->fails()) {
                $message = [];
                $errors = $validate->errors();
                foreach ($errors->messages() as $err) {
                    $message[] = $err[0];
                }
                return RestApi::error($message, 400);
            }

            $req = $request->all();
            if ($request->password != "" && $request->password != null) {
                $req['password'] = Hash::make($request->password);
            } else {
                unset($req["password"]);
            }

            $user = User::where('uuid', $uuid)->first();
            if (!isset($user)) {
                return RestApi::error(['Data Not Found!'], 404);
            }

            $user = $user->update($req);

            if ($user) {
                return RestApi::success(['Data Successfully Update'], 200);
            } else {
                return RestApi::error(['Data Failed To Update'], 400);
            }
        } else {
            return RestApi::error(['Bad Request!'], 400);
        }
    }

    public function delete($uuid)
    {
        if (request()->wantsJson()) {

            $user = User::where('uuid', $uuid)->first();
            if (!isset($user)) {
                return RestApi::error(['Data Not Found!'], 404);
            }
            $user->delete();
            if ($user) {
                return RestApi::success(['Data Successfully Deleted'], 200);
            }
        } else {
            return RestApi::error(['Bad Request!'], 400);
        }
    }

}