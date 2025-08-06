<?php

namespace App\Services;

use App\Models\Team;
use Illuminate\Support\Facades\Mail;

class NotificationService
{
    /**
     * Send registration confirmation email.
     */
    public function sendRegistrationConfirmation(Team $team): void
    {
        // In a real application, you would send an actual email
        // For now, we'll just log the notification
        logger()->info('Registration confirmation sent', [
            'team_id' => $team->id,
            'team_name' => $team->team_name,
            'contact_email' => $team->contact_email,
            'message' => 'Your team registration has been received and is pending approval.'
        ]);
    }

    /**
     * Send status update notification.
     */
    public function sendStatusUpdate(Team $team): void
    {
        $status = $team->status;
        $message = match($status) {
            'approved' => 'Congratulations! Your team has been approved for the IoT Competition.',
            'rejected' => 'Unfortunately, your team registration has been rejected.',
            default => 'Your team registration status has been updated.'
        };

        logger()->info('Status update notification sent', [
            'team_id' => $team->id,
            'team_name' => $team->team_name,
            'contact_email' => $team->contact_email,
            'status' => $status,
            'message' => $message
        ]);
    }

    /**
     * Send reminder email for incomplete registrations.
     */
    public function sendRegistrationReminder(Team $team): void
    {
        logger()->info('Registration reminder sent', [
            'team_id' => $team->id,
            'team_name' => $team->team_name,
            'contact_email' => $team->contact_email,
            'message' => 'Don\'t forget to complete your IoT Competition registration!'
        ]);
    }

    /**
     * Send competition updates to all approved teams.
     */
    public function sendCompetitionUpdate(string $message): int
    {
        $approvedTeams = Team::approved()->get();
        
        foreach ($approvedTeams as $team) {
            logger()->info('Competition update sent', [
                'team_id' => $team->id,
                'team_name' => $team->team_name,
                'contact_email' => $team->contact_email,
                'message' => $message
            ]);
        }

        return $approvedTeams->count();
    }
}