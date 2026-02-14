<?php

namespace App\Http\Requests;


use Illuminate\Foundation\Http\FormRequest;
use App\Models\User;
use App\Models\Employee;


class StoreEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // You can add logic here: return $this->user()->role === 'engineering';
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'employee_number' => ['required', 'string', 'unique:employees,employee_number'],
            'department' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:employees,email'],
            'role' => ['required', 'in:operator,supervisor,engineering'],
        ];
    }

        public function messages()
    {
        return [
            'first_name.required' => 'The name is required',
            'last_name.required' => 'Last name is required',
            'employee_number.unique' => 'This ID is already registered',
            'department.required' => 'Deparment is required',
            'email.email' => 'Email should be valid',
            'email.unique' => 'This email is already registered',
            'role.required' => 'Access Level (Role) is required',
        ];
    }
}
