<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
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
            'email'=>['required','email','exists:users,email'],
            'password'=>'required'
        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'El Email es obligatorio',
            'email.email' => 'El Email es incorrecto',
            'email.exists' => 'El usuario no existe',
            'password' => "La contraseña es obligatoria",
        ];

    }
}
