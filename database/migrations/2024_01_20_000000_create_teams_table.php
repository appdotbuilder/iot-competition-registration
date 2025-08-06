<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('teams', function (Blueprint $table) {
            $table->id();
            $table->string('team_name');
            $table->string('school_origin');
            $table->string('major');
            $table->string('project_title');
            $table->text('project_description');
            $table->json('team_members');
            $table->string('document_path')->nullable();
            $table->string('contact_email');
            $table->string('contact_phone');
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->timestamp('registration_date');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('team_name');
            $table->index('school_origin');
            $table->index('status');
            $table->index(['status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teams');
    }
};