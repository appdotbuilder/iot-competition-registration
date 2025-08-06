import React from 'react';
import { router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Stats {
    total_teams: number;
    pending_teams: number;
    approved_teams: number;
    rejected_teams: number;
}

interface Team {
    id: number;
    team_name: string;
    school_origin: string;
    project_title: string;
    status: string;
    created_at: string;
}

interface Props {
    stats: Stats;
    recent_teams: Team[];
    [key: string]: unknown;
}

export default function AdminDashboard({ stats, recent_teams }: Props) {
    const handleViewAllTeams = () => {
        router.get(route('teams.index'));
    };

    const getStatusBadge = (status: string) => {
        const badges = {
            pending: 'px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium',
            approved: 'px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium',
            rejected: 'px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium'
        };
        return badges[status as keyof typeof badges] || badges.pending;
    };

    const getStatusText = (status: string) => {
        const statusMap = {
            pending: '⏳ Menunggu',
            approved: '✅ Disetujui',
            rejected: '❌ Ditolak'
        };
        return statusMap[status as keyof typeof statusMap] || status;
    };

    return (
        <AppShell>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-4xl">👨‍💼</span>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Admin Dashboard
                            </h1>
                        </div>
                        <p className="text-gray-600">
                            Kelola pendaftaran tim IoT Competition 2024
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600">
                                    Total Tim Terdaftar
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">👥</span>
                                    <span className="text-3xl font-bold text-blue-600">
                                        {stats.total_teams}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600">
                                    Menunggu Verifikasi
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">⏳</span>
                                    <span className="text-3xl font-bold text-yellow-600">
                                        {stats.pending_teams}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600">
                                    Tim Disetujui
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">✅</span>
                                    <span className="text-3xl font-bold text-green-600">
                                        {stats.approved_teams}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600">
                                    Tim Ditolak
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">❌</span>
                                    <span className="text-3xl font-bold text-red-600">
                                        {stats.rejected_teams}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Teams */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-xl text-gray-900">
                                    📋 Tim Terdaftar Terbaru
                                </CardTitle>
                                <Button 
                                    onClick={handleViewAllTeams}
                                    variant="outline"
                                >
                                    Lihat Semua Tim
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {recent_teams.length === 0 ? (
                                <div className="text-center py-8">
                                    <span className="text-4xl mb-4 block">📝</span>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                        Belum Ada Tim Terdaftar
                                    </h3>
                                    <p className="text-gray-600">
                                        Tim yang mendaftar akan muncul di sini
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {recent_teams.map((team) => (
                                        <div 
                                            key={team.id}
                                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3 className="font-semibold text-gray-900">
                                                        {team.team_name}
                                                    </h3>
                                                    <span className={getStatusBadge(team.status)}>
                                                        {getStatusText(team.status)}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-1">
                                                    🏫 {team.school_origin}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    🚀 {team.project_title}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-500">
                                                    {new Date(team.created_at).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </p>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => router.get(route('teams.show', team.id))}
                                                    className="mt-2"
                                                >
                                                    Lihat Detail
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <div className="mt-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl text-gray-900">
                                    ⚡ Aksi Cepat
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <Button 
                                        onClick={handleViewAllTeams}
                                        className="flex items-center justify-center gap-2 h-20"
                                        variant="outline"
                                    >
                                        <span className="text-2xl">👥</span>
                                        <span>Kelola Semua Tim</span>
                                    </Button>
                                    <Button 
                                        onClick={() => router.get(route('teams.index', { status: 'pending' }))}
                                        className="flex items-center justify-center gap-2 h-20"
                                        variant="outline"
                                    >
                                        <span className="text-2xl">⏳</span>
                                        <span>Review Pendaftaran</span>
                                    </Button>
                                    <Button 
                                        onClick={() => router.get(route('welcome'))}
                                        className="flex items-center justify-center gap-2 h-20"
                                        variant="outline"
                                    >
                                        <span className="text-2xl">🏠</span>
                                        <span>Lihat Halaman Utama</span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}