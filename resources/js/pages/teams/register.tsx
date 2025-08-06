import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props {
    majors: string[];
    errors?: Record<string, string>;
    [key: string]: unknown;
}

export default function Register({ majors, errors = {} }: Props) {
    const [formData, setFormData] = useState({
        team_name: '',
        school_origin: '',
        major: '',
        project_title: '',
        project_description: '',
        team_members: ['', ''],
        contact_email: '',
        contact_phone: '',
        document: null as File | null
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'team_members') {
                formData.team_members.forEach((member, index) => {
                    data.append(`team_members[${index}]`, member);
                });
            } else if (key === 'document' && formData.document) {
                data.append('document', formData.document);
            } else if (key !== 'document') {
                data.append(key, formData[key as keyof typeof formData] as string);
            }
        });

        router.post(route('teams.store'), data);
    };

    const addTeamMember = () => {
        if (formData.team_members.length < 5) {
            setFormData(prev => ({
                ...prev,
                team_members: [...prev.team_members, '']
            }));
        }
    };

    const removeTeamMember = (index: number) => {
        if (formData.team_members.length > 2) {
            setFormData(prev => ({
                ...prev,
                team_members: prev.team_members.filter((_, i) => i !== index)
            }));
        }
    };

    const updateTeamMember = (index: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            team_members: prev.team_members.map((member, i) => 
                i === index ? value : member
            )
        }));
    };

    return (
        <AppShell>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="mb-4">
                                <span className="text-5xl">📝</span>
                            </div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                Pendaftaran Tim IoT Competition
                            </h1>
                            <p className="text-gray-600">
                                Lengkapi form di bawah ini untuk mendaftarkan tim Anda
                            </p>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl text-blue-600">
                                    🏆 Form Pendaftaran
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Team Information */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="team_name">Nama Tim *</Label>
                                            <Input
                                                id="team_name"
                                                value={formData.team_name}
                                                onChange={(e) => setFormData(prev => ({
                                                    ...prev, team_name: e.target.value
                                                }))}
                                                placeholder="Masukkan nama tim"
                                                className={errors.team_name ? 'border-red-500' : ''}
                                            />
                                            {errors.team_name && (
                                                <p className="text-red-500 text-sm">{errors.team_name}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="school_origin">Asal Sekolah *</Label>
                                            <Input
                                                id="school_origin"
                                                value={formData.school_origin}
                                                onChange={(e) => setFormData(prev => ({
                                                    ...prev, school_origin: e.target.value
                                                }))}
                                                placeholder="Contoh: SMK Negeri 1 Jakarta"
                                                className={errors.school_origin ? 'border-red-500' : ''}
                                            />
                                            {errors.school_origin && (
                                                <p className="text-red-500 text-sm">{errors.school_origin}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="major">Jurusan *</Label>
                                        <Select 
                                            value={formData.major}
                                            onValueChange={(value) => setFormData(prev => ({
                                                ...prev, major: value
                                            }))}
                                        >
                                            <SelectTrigger className={errors.major ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Pilih jurusan" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {majors.map(major => (
                                                    <SelectItem key={major} value={major}>
                                                        {major}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.major && (
                                            <p className="text-red-500 text-sm">{errors.major}</p>
                                        )}
                                    </div>

                                    {/* Project Information */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            🚀 Informasi Proyek
                                        </h3>
                                        
                                        <div className="space-y-2">
                                            <Label htmlFor="project_title">Judul Proyek *</Label>
                                            <Input
                                                id="project_title"
                                                value={formData.project_title}
                                                onChange={(e) => setFormData(prev => ({
                                                    ...prev, project_title: e.target.value
                                                }))}
                                                placeholder="Masukkan judul proyek IoT"
                                                className={errors.project_title ? 'border-red-500' : ''}
                                            />
                                            {errors.project_title && (
                                                <p className="text-red-500 text-sm">{errors.project_title}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="project_description">Deskripsi Proyek *</Label>
                                            <Textarea
                                                id="project_description"
                                                value={formData.project_description}
                                                onChange={(e) => setFormData(prev => ({
                                                    ...prev, project_description: e.target.value
                                                }))}
                                                placeholder="Deskripsikan proyek IoT Anda secara detail (minimal 100 karakter)"
                                                rows={5}
                                                className={errors.project_description ? 'border-red-500' : ''}
                                            />
                                            <p className="text-sm text-gray-500">
                                                {formData.project_description.length}/100 karakter minimum
                                            </p>
                                            {errors.project_description && (
                                                <p className="text-red-500 text-sm">{errors.project_description}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Team Members */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                👥 Anggota Tim (2-5 orang)
                                            </h3>
                                            {formData.team_members.length < 5 && (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={addTeamMember}
                                                >
                                                    + Tambah Anggota
                                                </Button>
                                            )}
                                        </div>

                                        {formData.team_members.map((member, index) => (
                                            <div key={index} className="flex gap-2 items-end">
                                                <div className="flex-1 space-y-2">
                                                    <Label htmlFor={`member_${index}`}>
                                                        Anggota {index + 1} *
                                                    </Label>
                                                    <Input
                                                        id={`member_${index}`}
                                                        value={member}
                                                        onChange={(e) => updateTeamMember(index, e.target.value)}
                                                        placeholder={`Nama anggota ${index + 1}`}
                                                        className={errors[`team_members.${index}`] ? 'border-red-500' : ''}
                                                    />
                                                    {errors[`team_members.${index}`] && (
                                                        <p className="text-red-500 text-sm">
                                                            {errors[`team_members.${index}`]}
                                                        </p>
                                                    )}
                                                </div>
                                                {formData.team_members.length > 2 && (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => removeTeamMember(index)}
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        Hapus
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                        {errors.team_members && (
                                            <p className="text-red-500 text-sm">{errors.team_members}</p>
                                        )}
                                    </div>

                                    {/* Contact Information */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            📞 Informasi Kontak
                                        </h3>
                                        
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="contact_email">Email Kontak *</Label>
                                                <Input
                                                    id="contact_email"
                                                    type="email"
                                                    value={formData.contact_email}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev, contact_email: e.target.value
                                                    }))}
                                                    placeholder="email@contoh.com"
                                                    className={errors.contact_email ? 'border-red-500' : ''}
                                                />
                                                {errors.contact_email && (
                                                    <p className="text-red-500 text-sm">{errors.contact_email}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="contact_phone">Nomor HP/WA *</Label>
                                                <Input
                                                    id="contact_phone"
                                                    value={formData.contact_phone}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev, contact_phone: e.target.value
                                                    }))}
                                                    placeholder="08xxxxxxxxxx"
                                                    className={errors.contact_phone ? 'border-red-500' : ''}
                                                />
                                                {errors.contact_phone && (
                                                    <p className="text-red-500 text-sm">{errors.contact_phone}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Document Upload */}
                                    <div className="space-y-2">
                                        <Label htmlFor="document">Upload Dokumen Proyek</Label>
                                        <Input
                                            id="document"
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0] || null;
                                                setFormData(prev => ({ ...prev, document: file }));
                                            }}
                                            className={errors.document ? 'border-red-500' : ''}
                                        />
                                        <p className="text-sm text-gray-500">
                                            Upload proposal proyek dalam format PDF, DOC, atau DOCX (maksimal 10MB)
                                        </p>
                                        {errors.document && (
                                            <p className="text-red-500 text-sm">{errors.document}</p>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex justify-end pt-6">
                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                                        >
                                            🚀 Daftarkan Tim
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}