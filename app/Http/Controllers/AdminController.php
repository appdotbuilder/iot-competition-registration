<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index()
    {
        $stats = [
            'total_teams' => Team::count(),
            'pending_teams' => Team::pending()->count(),
            'approved_teams' => Team::approved()->count(),
            'rejected_teams' => Team::where('status', 'rejected')->count(),
        ];

        $recent_teams = Team::latest()
            ->limit(5)
            ->get();

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recent_teams' => $recent_teams
        ]);
    }
}