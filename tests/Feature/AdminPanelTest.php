<?php

use App\Models\Team;
use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

it('requires authentication for admin panel', function () {
    $response = $this->get(route('admin.dashboard'));

    $response->assertRedirect(route('login'));
});

it('allows authenticated user to access admin dashboard', function () {
    $user = User::factory()->create();
    Team::factory()->count(5)->create();

    $response = $this->actingAs($user)->get(route('admin.dashboard'));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('admin/dashboard')
             ->has('stats')
             ->has('recent_teams')
    );
});

it('allows admin to view all teams', function () {
    $user = User::factory()->create();
    Team::factory()->count(3)->create();

    $response = $this->actingAs($user)->get(route('teams.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('admin/teams/index')
             ->has('teams.data', 3)
    );
});

it('allows admin to view team details', function () {
    $user = User::factory()->create();
    $team = Team::factory()->create();

    $response = $this->actingAs($user)->get(route('teams.show', $team));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('admin/teams/show')
             ->where('team.id', $team->id)
    );
});

it('allows admin to update team status', function () {
    $user = User::factory()->create();
    $team = Team::factory()->create(['status' => 'pending']);

    $response = $this->actingAs($user)->patch(route('teams.update', $team), [
        'status' => 'approved'
    ]);

    $response->assertRedirect(route('teams.index'));
    expect($team->fresh()->status)->toBe('approved');
});

it('allows admin to delete team', function () {
    $user = User::factory()->create();
    $team = Team::factory()->create();

    $response = $this->actingAs($user)->delete(route('teams.destroy', $team));

    $response->assertRedirect(route('teams.index'));
    $this->assertModelMissing($team);
});

it('shows correct statistics on dashboard', function () {
    $user = User::factory()->create();
    Team::factory()->count(2)->create(['status' => 'pending']);
    Team::factory()->count(3)->create(['status' => 'approved']);
    Team::factory()->count(1)->create(['status' => 'rejected']);

    $response = $this->actingAs($user)->get(route('admin.dashboard'));

    $response->assertInertia(fn ($page) => 
        $page->has('stats', fn ($stats) => 
            $stats->where('total_teams', 6)
                  ->where('pending_teams', 2)
                  ->where('approved_teams', 3)
                  ->where('rejected_teams', 1)
        )
    );
});