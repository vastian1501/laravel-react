<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name'=>'required|string',
            'email'=>'required|email|unique:users,email',
            'password'=> [
                'required',
                'confirmed',
                Password::min(8)->letters()->symbols()->numbers()
            ]
        ];
    }

    public function messages()
    {
        return [
            'name' => "El nombre es obligatorio",
            'email.email' => "El email no es valido",
            'email.required' => "El email es obligatorio",
            'email.unique' => "El usuario ya esta registrado",
            'password' => "La constraseña debe contener 8 caracteres, numeros y simbolos",
        ];
    }
}
