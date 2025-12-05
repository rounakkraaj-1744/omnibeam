"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { User, Lock, Bell, Camera, Mail } from 'lucide-react';
import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export function AccountPage() {
    const { data: session } = useSession();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');

    // Initialize state from session
    useEffect(() => {
        if (session?.user) {
            setName(session.user.name || '');
            setEmail(session.user.email || '');
            setImage(session.user.image || '');
        }
    }, [session]);

    const [notifications, setNotifications] = useState({
        email: true,
        marketing: false,
        security: true
    });

    const handleSaveProfile = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/account', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });

            if (!res.ok) throw new Error('Failed to update profile');

            // Optionally reload session or show toast
            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const initials = name
        ? name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()
        : 'U';

    if (!session) {
        return <div className="p-8">Loading...</div>; // Or better skeleton
    }

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">Account Settings</h1>
                <p className="text-muted-foreground">Manage your profile, security, and notification preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Navigation / Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex flex-col items-center text-center">
                                <div className="relative group cursor-pointer mb-4">
                                    {image ? (
                                        <div className="w-24 h-24 rounded-full border-4 border-background shadow-xl overflow-hidden">
                                            <img src={image} alt="Profile" className="w-full h-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center border-4 border-background shadow-xl text-white text-3xl font-bold">
                                            {initials}
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <h3 className="text-lg font-semibold text-foreground">{name || 'User'}</h3>
                                <p className="text-sm text-muted-foreground">{email}</p>
                                <div className="mt-4">
                                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">Free Plan</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <nav className="space-y-1">
                        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-secondary text-foreground">
                            <User className="w-4 h-4" />
                            Profile
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                            <Lock className="w-4 h-4" />
                            Security
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                            <Bell className="w-4 h-4" />
                            Notifications
                        </button>
                    </nav>
                </div>

                {/* content */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Personal Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Update your personal details and public profile.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="max-w-md"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative max-w-md">
                                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        value={email}
                                        disabled
                                        className="pl-9 bg-muted"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Input id="bio" placeholder="Tell us a little about yourself" className="max-w-md" />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end border-t border-border pt-6">
                            <Button onClick={handleSaveProfile} disabled={loading}>
                                {loading ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Security */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Security</CardTitle>
                            <CardDescription>Manage your password and security preferences.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="current-password">Current Password</Label>
                                    <Input id="current-password" type="password" className="max-w-md" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="new-password">New Password</Label>
                                        <Input id="new-password" type="password" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirm-password">Confirm Password</Label>
                                        <Input id="confirm-password" type="password" />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Two-Factor Authentication</Label>
                                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end border-t border-border pt-6">
                            <Button variant="outline">Update Password</Button>
                        </CardFooter>
                    </Card>

                    {/* Notifications */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Notifications</CardTitle>
                            <CardDescription>Choose what you want to be notified about.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Email Notifications</Label>
                                    <p className="text-sm text-muted-foreground">Receive emails about your account activity.</p>
                                </div>
                                <Switch
                                    checked={notifications.email}
                                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Security Alerts</Label>
                                    <p className="text-sm text-muted-foreground">Get notified about suspicious logins.</p>
                                </div>
                                <Switch
                                    checked={notifications.security}
                                    disabled
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Marketing Emails</Label>
                                    <p className="text-sm text-muted-foreground">Receive news and updates about new features.</p>
                                </div>
                                <Switch
                                    checked={notifications.marketing}
                                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, marketing: checked }))}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
