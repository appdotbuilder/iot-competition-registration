<?php

use App\Models\Team;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

it('can display the registration form', function () {
    $response = $this->get(route('teams.create'));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('teams/register')
             ->has('majors')
    );
});

it('can register a new team', function () {
    Storage::fake('public');
    
    $response = $this->post(route('teams.store'), [
        'team_name' => 'Team Innovation',
        'school_origin' => 'SMK Negeri 1 Jakarta',
        'major' => 'Teknik Komputer dan Jaringan (TKJ)',
        'project_title' => 'Smart Home Automation',
        'project_description' => str_repeat('This is a detailed description of our IoT project. ', 10),
        'team_members' => ['John Doe', 'Jane Smith', 'Bob Wilson'],
        'contact_email' => 'team@example.com',
        'contact_phone' => '08123456789',
    ]);

    $response->assertInertia(fn ($page) => 
        $page->component('teams/success')
    );

    $this->assertDatabaseHas('teams', [
        'team_name' => 'Team Innovation',
        'school_origin' => 'SMK Negeri 1 Jakarta',
        'status' => 'pending'
    ]);
});

it('validates required fields', function () {
    $response = $this->post(route('teams.store'), []);

    $response->assertSessionHasErrors([
        'team_name',
        'school_origin', 
        'major',
        'project_title',
        'project_description',
        'team_members',
        'contact_email',
        'contact_phone'
    ]);
});

it('validates team name uniqueness', function () {
    Team::factory()->create(['team_name' => 'Existing Team']);

    $response = $this->post(route('teams.store'), [
        'team_name' => 'Existing Team',
        'school_origin' => 'SMK Negeri 1 Jakarta',
        'major' => 'Teknik Komputer dan Jaringan (TKJ)',
        'project_title' => 'Smart Home Automation',
        'project_description' => str_repeat('This is a detailed description. ', 10),
        'team_members' => ['John Doe', 'Jane Smith'],
        'contact_email' => 'team@example.com',
        'contact_phone' => '08123456789',
    ]);

    $response->assertSessionHasErrors(['team_name']);
});

it('validates minimum team members', function () {
    $response = $this->post(route('teams.store'), [
        'team_name' => 'Team Innovation',
        'school_origin' => 'SMK Negeri 1 Jakarta',
        'major' => 'Teknik Komputer dan Jaringan (TKJ)',
        'project_title' => 'Smart Home Automation',
        'project_description' => str_repeat('This is a detailed description. ', 10),
        'team_members' => ['John Doe'], // Only 1 member
        'contact_email' => 'team@example.com',
        'contact_phone' => '08123456789',
    ]);

    $response->assertSessionHasErrors(['team_members']);
});

it('can upload project document', function () {
    Storage::fake('public');
    
    $file = UploadedFile::fake()->create('project.pdf', 1000, 'application/pdf');

    $response = $this->post(route('teams.store'), [
        'team_name' => 'Team Innovation',
        'school_origin' => 'SMK Negeri 1 Jakarta',
        'major' => 'Teknik Komputer dan Jaringan (TKJ)',
        'project_title' => 'Smart Home Automation',
        'project_description' => str_repeat('This is a detailed description. ', 10),
        'team_members' => ['John Doe', 'Jane Smith'],
        'contact_email' => 'team@example.com',
        'contact_phone' => '08123456789',
        'document' => $file,
    ]);

    $team = Team::first();
    expect($team->document_path)->not->toBeNull();
    Storage::disk('public')->assertExists($team->document_path);
});