<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTeamRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'team_name' => 'required|string|max:255|unique:teams,team_name',
            'school_origin' => 'required|string|max:255',
            'major' => 'required|string|max:255',
            'project_title' => 'required|string|max:255',
            'project_description' => 'required|string|min:100',
            'team_members' => 'required|array|min:2|max:5',
            'team_members.*' => 'required|string|max:255',
            'contact_email' => 'required|email|max:255',
            'contact_phone' => 'required|string|max:20',
            'document' => 'nullable|file|mimes:pdf,doc,docx|max:10240',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'team_name.required' => 'Team name is required.',
            'team_name.unique' => 'This team name is already registered.',
            'school_origin.required' => 'School origin is required.',
            'major.required' => 'Major field is required.',
            'project_title.required' => 'Project title is required.',
            'project_description.required' => 'Project description is required.',
            'project_description.min' => 'Project description must be at least 100 characters.',
            'team_members.required' => 'Team members are required.',
            'team_members.min' => 'At least 2 team members are required.',
            'team_members.max' => 'Maximum 5 team members allowed.',
            'team_members.*.required' => 'Each team member name is required.',
            'contact_email.required' => 'Contact email is required.',
            'contact_email.email' => 'Please provide a valid email address.',
            'contact_phone.required' => 'Contact phone is required.',
            'document.mimes' => 'Document must be a PDF, DOC, or DOCX file.',
            'document.max' => 'Document size must not exceed 10MB.',
        ];
    }
}