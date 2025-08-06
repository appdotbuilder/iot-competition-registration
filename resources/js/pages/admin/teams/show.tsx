import React from 'react';
import { router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    updated_at: string;
    document_path?: string;
}

interface Props {
    team: Team;
    [key: string]: unknown;
}

export default function TeamShow({ team }: Props) {
    const handleStatusUpdate = (newStatus: string) => {
        router.patch(route('teams.update', team.id), {
            status: newStatus
        });
    };

    const handleDelete = () => {
        if (confirm(`Apakah Anda yakin ingin menghapus tim "${team.team_name}"?`)) {
            router.delete(route('teams.destroy', team.id));
        }
    };

    const getStatusBadge = (status: string) => {
        const badges = {
            pending: 'px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium',
            approved: 'px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium',
            rejected: 'px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium'
        };
        return badges[status as keyof typeof badges] || badges.pending;
    };

    const getStatusText = (status: string) => {
        const statusMap = {
            pending: '⏳ Menunggu Verifikasi',
            approved: '✅ Disetujui',
            rejected: '❌ Ditolak'
        };
        return statusMap[status as keyof typeof statusMap] || status;
    };

    return (
        <AppShell>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-4xl">👥</span>
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        Detail Tim
                                    </h1>
                                </div>
                                <p className="text-gray-600">
                                    Informasi lengkap tim {team.team_name}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button 
                                    onClick={() => router.get(route('teams.index'))}
                                    variant="outline"
                                >
                                    ← Kembali
                                </Button>
                            </div>
                        </div>

                        {/* Status Card */}
                        <Card className="mb-6">
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <span className="text-lg font-medium text-gray-900">
                                            Status Pendaftaran:
                                        </span>
                                        <span className={getStatusBadge(team.status)}>
                                            {getStatusText(team.status)}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        {team.status !== 'approved' && (
                                            <Button
                                                onClick={() => handleStatusUpdate('approved')}
                                                className="bg-green-600 hover:bg-green-700 text-white"
                                            >
                                                ✅ Setujui Tim
                                            </Button>
                                        )}
                                        {team.status !== 'rejected' && (
                                            <Button
                                                variant="outline"
                                                onClick={() => handleStatusUpdate('rejected')}
                                                className="text-red-600 border-red-600 hover:bg-red-50"
                                            >
                                                ❌ Tolak Tim
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Team Information */}
                        <div className="grid lg:grid-cols-2 gap-6 mb-6">
                            {/* Basic Info */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl text-blue-600">
                                        📋 Informasi Dasar
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Nama Tim</h3>
                                        <p className="text-gray-600">{team.team_name}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Asal Sekolah</h3>
                                        <p className="text-gray-600">{team.school_origin}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Jurusan</h3>
                                        <p className="text-gray-600">{team.major}</p>
                                    </div>
                                    <div className="pt-4 border-t border-gray-200">
                                        <div className="grid grid-cols-1 gap-3">
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-1">
                                                    📅 Tanggal Daftar
                                                </h3>
                                                <p className="text-gray-600">
                                                    {new Date(team.created_at).toLocaleDateString('id-ID', {
                                                        weekday: 'long',
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-1">
                                                    🔄 Terakhir Diupdate
                                                </h3>
                                                <p className="text-gray-600">
                                                    {new Date(team.updated_at).toLocaleDateString('id-ID', {
                                                        weekday: 'long',
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Contact Info */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl text-green-600">
                                        📞 Informasi Kontak
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                                        <div className="flex items-center gap-2">
                                            <p className="text-gray-600">{team.contact_email}</p>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => window.open(`mailto:${team.contact_email}`)}
                                            >
                                                📧 Email
                                            </Button>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Nomor HP/WhatsApp</h3>
                                        <div className="flex items-center gap-2">
                                            <p className="text-gray-600">{team.contact_phone}</p>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => window.open(`https://wa.me/62${team.contact_phone.replace(/^0/, '')}`)}
                                            >
                                                💬 WhatsApp
                                            </Button>
                                        </div>
                                    </div>
                                    
                                    {team.document_path && (
                                        <div className="pt-4 border-t border-gray-200">
                                            <h3 className="font-semibold text-gray-900 mb-2">
                                                📄 Dokumen Proyek
                                            </h3>
                                            <Button
                                                variant="outline"
                                                onClick={() => window.open(`/storage/${team.document_path}`, '_blank')}
                                                className="w-full"
                                            >
                                                📄 Lihat/Download Dokumen
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Project Information */}
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle className="text-xl text-purple-600">
                                    🚀 Informasi Proyek IoT
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Judul Proyek</h3>
                                        <p className="text-lg text-gray-800 bg-gray-50 p-3 rounded-lg">
                                            {team.project_title}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Deskripsi Proyek</h3>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                                {team.project_description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Team Members */}
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle className="text-xl text-orange-600">
                                    👥 Anggota Tim ({team.team_members.length} orang)
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {team.team_members.map((member, index) => (
                                        <div 
                                            key={index} 
                                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                                        >
                                            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                                                {index + 1}
                                            </div>
                                            <span className="text-gray-800 font-medium">{member}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl text-red-600">
                                    ⚡ Aksi Administratif
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <p className="text-gray-600">
                                        Aksi yang dilakukan tidak dapat dibatalkan. Pastikan Anda yakin sebelum melanjutkan.
                                    </p>
                                    <Button
                                        variant="outline"
                                        onClick={handleDelete}
                                        className="text-red-600 border-red-600 hover:bg-red-50"
                                    >
                                        🗑️ Hapus Tim
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