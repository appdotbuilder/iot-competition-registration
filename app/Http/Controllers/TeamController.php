<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTeamRequest;
use App\Models\Team;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TeamController extends Controller
{
    /**
     * The notification service instance.
     *
     * @var NotificationService
     */
    protected NotificationService $notificationService;

    /**
     * Create a new controller instance.
     *
     * @param NotificationService $notificationService
     */
    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teams = Team::latest()
            ->with([])
            ->paginate(10);
        
        return Inertia::render('admin/teams/index', [
            'teams' => $teams
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('teams/register', [
            'majors' => [
                'Teknik Komputer dan Jaringan (TKJ)',
                'Rekayasa Perangkat Lunak (RPL)', 
                'Multimedia (MM)',
                'Teknik Elektronika Industri (TEI)',
                'Teknik Mekatronika',
                'Teknik Otomasi Industri (TOI)',
                'Sistem Informatika Jaringan dan Aplikasi (SIJA)',
                'Teknik Komputer dan Informatika (TKI)'
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTeamRequest $request)
    {
        $validated = $request->validated();
        
        // Handle file upload
        $documentPath = null;
        if ($request->hasFile('document')) {
            $documentPath = $request->file('document')->store('team-documents', 'public');
        }
        
        $team = Team::create([
            'team_name' => $validated['team_name'],
            'school_origin' => $validated['school_origin'],
            'major' => $validated['major'],
            'project_title' => $validated['project_title'],
            'project_description' => $validated['project_description'],
            'team_members' => $validated['team_members'],
            'contact_email' => $validated['contact_email'],
            'contact_phone' => $validated['contact_phone'],
            'document_path' => $documentPath,
            'registration_date' => now(),
            'status' => 'pending',
        ]);

        // Send registration confirmation notification
        $this->notificationService->sendRegistrationConfirmation($team);

        return Inertia::render('teams/success', [
            'team' => $team,
            'message' => 'Registration successful! Your team has been registered for the IoT competition.'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Team $team)
    {
        return Inertia::render('admin/teams/show', [
            'team' => $team
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Team $team)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,approved,rejected'
        ]);

        $team->update($validated);

        // Send status update notification
        $this->notificationService->sendStatusUpdate($team);

        return redirect()->route('teams.index')
            ->with('success', 'Team status updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Team $team)
    {
        // Delete document if exists
        if ($team->document_path) {
            Storage::disk('public')->delete($team->document_path);
        }

        $team->delete();

        return redirect()->route('teams.index')
            ->with('success', 'Team deleted successfully.');
    }
}