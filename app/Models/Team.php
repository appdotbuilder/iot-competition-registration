<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Team
 *
 * @property int $id
 * @property string $team_name
 * @property string $school_origin
 * @property string $major
 * @property string $project_title
 * @property string $project_description
 * @property array $team_members
 * @property string|null $document_path
 * @property string $contact_email
 * @property string $contact_phone
 * @property string $status
 * @property \Illuminate\Support\Carbon $registration_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Team newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Team newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Team query()
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereContactEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereContactPhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereDocumentPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereMajor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereProjectDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereProjectTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereRegistrationDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereSchoolOrigin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereTeamMembers($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereTeamName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team pending()
 * @method static \Illuminate\Database\Eloquent\Builder|Team approved()
 * @method static \Database\Factories\TeamFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Team extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'team_name',
        'school_origin',
        'major',
        'project_title',
        'project_description',
        'team_members',
        'document_path',
        'contact_email',
        'contact_phone',
        'status',
        'registration_date',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'team_members' => 'array',
        'registration_date' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Scope a query to only include pending teams.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include approved teams.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }
}