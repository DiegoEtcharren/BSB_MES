<?php

namespace App\Http\Requests;


use Illuminate\Foundation\Http\FormRequest;
use App\Models\User;
use App\Models\Employee;
use Illuminate\Validation\Rule;


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
        $isUpdate = $this->isMethod('put') || $this->isMethod('patch');
        $employeeId = $this->route('employee') ?? $this->route('id');
        $userId = null;

        if ($isUpdate && $employeeId) {
            $employee = Employee::find($employeeId);
            $userId = $employee ? $employee->user_id : null;
        }

        return [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'employee_number' => ['required', 'string',
                $isUpdate
                    ? Rule::unique('employees', 'employee_number')->ignore($employeeId)
                    : Rule::unique('employees', 'employee_number')
            ],
            'department' => ['required', 'string', 'max:255'],
            'email' => ['required','email',
                $isUpdate
                    ? Rule::unique('employees', 'email')->ignore($employeeId)
                    : Rule::unique('employees', 'email')
            ],
            'role' => ['required', 'in:operator,supervisor,engineer'],
            'status' => [$isUpdate
                ? ['required', 'string', 'in:active,inactive,on_leave']
                : ['nullable']]
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
