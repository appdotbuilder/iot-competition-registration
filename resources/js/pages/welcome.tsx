import React from 'react';
import { router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Welcome() {
    const handleRegisterClick = () => {
        router.get(route('teams.create'));
    };

    const handleAdminClick = () => {
        router.get(route('login'));
    };

    return (
        <AppShell>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Hero Section */}
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center mb-16">
                        <div className="mb-6">
                            <span className="text-6xl">🏆</span>
                        </div>
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            IoT Competition 2024
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            Kompetisi Internet of Things untuk Sekolah Menengah Kejuruan
                            <br />
                            Wujudkan inovasi teknologi masa depan bersama tim terbaikmu!
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button 
                                onClick={handleRegisterClick}
                                size="lg"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                            >
                                🚀 Daftar Sekarang
                            </Button>
                            <Button 
                                onClick={handleAdminClick}
                                variant="outline"
                                size="lg"
                                className="px-8 py-3 text-lg"
                            >
                                👨‍💼 Admin Panel
                            </Button>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <Card className="text-center">
                            <CardHeader>
                                <div className="text-4xl mb-4">📝</div>
                                <CardTitle>Pendaftaran Mudah</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Form pendaftaran yang sederhana dan user-friendly. 
                                    Daftarkan tim dengan informasi lengkap dan upload dokumen proyek.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardHeader>
                                <div className="text-4xl mb-4">👥</div>
                                <CardTitle>Manajemen Tim</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Kelola informasi tim dengan mudah. Maksimal 5 anggota per tim
                                    dari berbagai jurusan teknik di SMK.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardHeader>
                                <div className="text-4xl mb-4">⚡</div>
                                <CardTitle>Teknologi IoT</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Kompetisi khusus untuk proyek Internet of Things.
                                    Tunjukkan kreativitas dan inovasi teknologi terdepan.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Competition Details */}
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
                        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
                            📋 Ketentuan Kompetisi
                        </h2>
                        
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-blue-600">
                                    🎯 Persyaratan Tim
                                </h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• Minimal 2 anggota, maksimal 5 anggota</li>
                                    <li>• Siswa aktif SMK jurusan teknik</li>
                                    <li>• Satu tim satu sekolah</li>
                                    <li>• Memiliki pembimbing guru</li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-green-600">
                                    📄 Dokumen yang Diperlukan
                                </h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• Proposal proyek IoT (PDF/DOC)</li>
                                    <li>• Deskripsi lengkap proyek</li>
                                    <li>• Data anggota tim lengkap</li>
                                    <li>• Informasi kontak yang valid</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Supported Majors */}
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-8 text-gray-900">
                            🎓 Jurusan yang Dapat Berpartisipasi
                        </h2>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                'TKJ - Teknik Komputer Jaringan',
                                'RPL - Rekayasa Perangkat Lunak',
                                'MM - Multimedia',
                                'TEI - Teknik Elektronika Industri',
                                'Teknik Mekatronika',
                                'TOI - Teknik Otomasi Industri',
                                'SIJA - Sistem Informatika',
                                'TKI - Teknik Komputer Informatika'
                            ].map((major, index) => (
                                <div 
                                    key={index}
                                    className="bg-white p-4 rounded-lg shadow border border-gray-200"
                                >
                                    <span className="text-sm font-medium text-gray-700">
                                        {major}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="bg-blue-600 text-white py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            Siap Menjadi Juara? 🏆
                        </h2>
                        <p className="text-xl mb-8">
                            Jangan lewatkan kesempatan emas ini! Daftarkan timmu sekarang juga.
                        </p>
                        <Button 
                            onClick={handleRegisterClick}
                            size="lg"
                            className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-4 text-xl font-semibold"
                        >
                            🚀 Mulai Pendaftaran
                        </Button>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}