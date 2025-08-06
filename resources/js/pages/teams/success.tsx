import React from 'react';
import { router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TeamMember {
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
    registration_date: string;
}

interface Props {
    team: TeamMember;
    message: string;
    [key: string]: unknown;
}

export default function Success({ team, message }: Props) {
    const handleBackToHome = () => {
        router.get(route('welcome'));
    };

    return (
        <AppShell>
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        {/* Success Header */}
                        <div className="text-center mb-8">
                            <div className="mb-6">
                                <span className="text-6xl">✅</span>
                            </div>
                            <h1 className="text-4xl font-bold text-green-600 mb-4">
                                Pendaftaran Berhasil!
                            </h1>
                            <p className="text-xl text-gray-600">
                                {message}
                            </p>
                        </div>

                        {/* Registration Details */}
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-2xl text-blue-600 flex items-center gap-2">
                                    📋 Detail Pendaftaran
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Team Info */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
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
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Email Kontak</h3>
                                            <p className="text-gray-600">{team.contact_email}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Nomor HP/WA</h3>
                                            <p className="text-gray-600">{team.contact_phone}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Status</h3>
                                            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                                                ⏳ Menunggu Verifikasi
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Project Info */}
                                <div className="border-t pt-6">
                                    <h3 className="font-semibold text-gray-900 mb-3">🚀 Informasi Proyek</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <h4 className="font-medium text-gray-800 mb-1">Judul Proyek</h4>
                                            <p className="text-gray-600">{team.project_title}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-800 mb-1">Deskripsi</h4>
                                            <p className="text-gray-600 leading-relaxed">
                                                {team.project_description}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Team Members */}
                                <div className="border-t pt-6">
                                    <h3 className="font-semibold text-gray-900 mb-3">👥 Anggota Tim</h3>
                                    <div className="grid md:grid-cols-2 gap-2">
                                        {team.team_members.map((member, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                                                    {index + 1}
                                                </span>
                                                <span className="text-gray-700">{member}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Next Steps */}
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-xl text-green-600">
                                    📌 Langkah Selanjutnya
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                                            1
                                        </span>
                                        <div>
                                            <h4 className="font-medium text-gray-900">Verifikasi Admin</h4>
                                            <p className="text-gray-600 text-sm">
                                                Tim admin akan memverifikasi data dan dokumen yang telah Anda submit
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                                            2
                                        </span>
                                        <div>
                                            <h4 className="font-medium text-gray-900">Notifikasi Status</h4>
                                            <p className="text-gray-600 text-sm">
                                                Kami akan mengirimkan email konfirmasi ke <strong>{team.contact_email}</strong>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                                            3
                                        </span>
                                        <div>
                                            <h4 className="font-medium text-gray-900">Persiapan Kompetisi</h4>
                                            <p className="text-gray-600 text-sm">
                                                Jika disetujui, Anda akan menerima panduan lengkap untuk tahap selanjutnya
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="text-center">
                            <Button
                                onClick={handleBackToHome}
                                size="lg"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                            >
                                🏠 Kembali ke Beranda
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}