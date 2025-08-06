import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Team {
    id: number;
    team_name: string;
    school_origin: string;
    major: string;
    project_title: string;
    project_description: string;
    team_members: string[];
    contact_email: string;
    contact_phone: string;
    status: string;
    created_at: string;
    document_path?: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface TeamsData {
    data: Team[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

interface Props {
    teams: TeamsData;
    [key: string]: unknown;
}

export default function TeamsIndex({ teams }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const handleStatusUpdate = (teamId: number, newStatus: string) => {
        router.patch(route('teams.update', teamId), {
            status: newStatus
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const handleDelete = (teamId: number, teamName: string) => {
        if (confirm(`Apakah Anda yakin ingin menghapus tim "${teamName}"?`)) {
            router.delete(route('teams.destroy', teamId));
        }
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

    const filteredTeams = teams.data.filter(team => {
        const matchesSearch = team.team_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            team.school_origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            team.project_title.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || team.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    return (
        <AppShell>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-4xl">👥</span>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Kelola Tim
                                </h1>
                            </div>
                            <p className="text-gray-600">
                                Manage all registered teams for IoT Competition 2024
                            </p>
                        </div>
                        <Button 
                            onClick={() => router.get(route('admin.dashboard'))}
                            variant="outline"
                        >
                            📊 Dashboard
                        </Button>
                    </div>

                    {/* Filters */}
                    <Card className="mb-6">
                        <CardContent className="pt-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Cari Tim
                                    </label>
                                    <Input
                                        placeholder="Cari berdasarkan nama tim, sekolah, atau judul proyek..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Filter Status
                                    </label>
                                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Semua Status</SelectItem>
                                            <SelectItem value="pending">⏳ Menunggu</SelectItem>
                                            <SelectItem value="approved">✅ Disetujui</SelectItem>
                                            <SelectItem value="rejected">❌ Ditolak</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Teams List */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span>📋 Daftar Tim ({filteredTeams.length})</span>
                                <div className="text-sm font-normal text-gray-600">
                                    Total: {teams.total} tim terdaftar
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {filteredTeams.length === 0 ? (
                                <div className="text-center py-12">
                                    <span className="text-6xl mb-4 block">🔍</span>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                        Tidak Ada Tim Ditemukan
                                    </h3>
                                    <p className="text-gray-600">
                                        Coba ubah filter pencarian Anda
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredTeams.map((team) => (
                                        <div 
                                            key={team.id}
                                            className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="text-xl font-semibold text-gray-900">
                                                            {team.team_name}
                                                        </h3>
                                                        <span className={getStatusBadge(team.status)}>
                                                            {getStatusText(team.status)}
                                                        </span>
                                                    </div>
                                                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                                                        <div>🏫 <strong>Sekolah:</strong> {team.school_origin}</div>
                                                        <div>🎓 <strong>Jurusan:</strong> {team.major}</div>
                                                        <div>📧 <strong>Email:</strong> {team.contact_email}</div>
                                                        <div>📱 <strong>HP/WA:</strong> {team.contact_phone}</div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <h4 className="font-medium text-gray-800 mb-1">
                                                            🚀 Proyek: {team.project_title}
                                                        </h4>
                                                        <p className="text-sm text-gray-600 line-clamp-2">
                                                            {team.project_description}
                                                        </p>
                                                    </div>
                                                    <div className="mb-4">
                                                        <h4 className="font-medium text-gray-800 mb-2">
                                                            👥 Anggota Tim ({team.team_members.length}):
                                                        </h4>
                                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 text-sm text-gray-600">
                                                            {team.team_members.map((member, index) => (
                                                                <span key={index}>
                                                                    {index + 1}. {member}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                <div className="text-sm text-gray-500">
                                                    Daftar: {new Date(team.created_at).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric'
                                                    })}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {team.document_path && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => window.open(`/storage/${team.document_path}`, '_blank')}
                                                        >
                                                            📄 Dokumen
                                                        </Button>
                                                    )}
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => router.get(route('teams.show', team.id))}
                                                    >
                                                        👁️ Detail
                                                    </Button>
                                                    
                                                    {/* Status Update Buttons */}
                                                    {team.status !== 'approved' && (
                                                        <Button
                                                            size="sm"
                                                            onClick={() => handleStatusUpdate(team.id, 'approved')}
                                                            className="bg-green-600 hover:bg-green-700 text-white"
                                                        >
                                                            ✅ Setujui
                                                        </Button>
                                                    )}
                                                    {team.status !== 'rejected' && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleStatusUpdate(team.id, 'rejected')}
                                                            className="text-red-600 border-red-600 hover:bg-red-50"
                                                        >
                                                            ❌ Tolak
                                                        </Button>
                                                    )}
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDelete(team.id, team.team_name)}
                                                        className="text-red-600 border-red-600 hover:bg-red-50"
                                                    >
                                                        🗑️ Hapus
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Pagination */}
                    {teams.last_page > 1 && (
                        <div className="mt-6 flex justify-center">
                            <div className="flex items-center gap-2">
                                {teams.links.map((link, index) => (
                                    <Button
                                        key={index}
                                        variant={link.active ? "default" : "outline"}
                                        size="sm"
                                        disabled={!link.url}
                                        onClick={() => link.url && router.get(link.url)}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}