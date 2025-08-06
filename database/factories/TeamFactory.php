<?php

namespace Database\Factories;

use App\Models\Team;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Team>
 */
class TeamFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Team>
     */
    protected $model = Team::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $majors = [
            'Teknik Komputer dan Jaringan (TKJ)',
            'Rekayasa Perangkat Lunak (RPL)',
            'Multimedia (MM)',
            'Teknik Elektronika Industri (TEI)',
            'Teknik Mekatronika',
            'Teknik Otomasi Industri (TOI)',
            'Sistem Informatika Jaringan dan Aplikasi (SIJA)',
            'Teknik Komputer dan Informatika (TKI)'
        ];

        $schools = [
            'SMK Negeri 1 Jakarta',
            'SMK Negeri 2 Bandung',
            'SMK Negeri 1 Surabaya',
            'SMK Negeri 3 Yogyakarta',
            'SMK Negeri 1 Semarang',
            'SMK Negeri 2 Medan',
            'SMK Negeri 1 Makassar',
            'SMK Negeri 2 Denpasar'
        ];

        $projectTitles = [
            'Smart Home Automation System',
            'IoT-Based Agriculture Monitoring',
            'Smart Traffic Management System',
            'Environmental Monitoring Dashboard',
            'Automated Parking System',
            'Smart Energy Management',
            'IoT Weather Station',
            'Smart Security System'
        ];

        return [
            'team_name' => 'Team ' . fake()->company(),
            'school_origin' => fake()->randomElement($schools),
            'major' => fake()->randomElement($majors),
            'project_title' => fake()->randomElement($projectTitles),
            'project_description' => fake()->paragraphs(3, true),
            'team_members' => [
                fake()->name(),
                fake()->name(),
                fake()->name(),
                fake()->name()
            ],
            'contact_email' => fake()->safeEmail(),
            'contact_phone' => '08' . fake()->numerify('##########'),
            'status' => fake()->randomElement(['pending', 'approved', 'rejected']),
            'registration_date' => fake()->dateTimeBetween('-30 days', 'now'),
        ];
    }
}