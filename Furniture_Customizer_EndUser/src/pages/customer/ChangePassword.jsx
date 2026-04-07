import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { profileService } from '../../services/profile.service';
import toast from 'react-hot-toast';

/**
 * Change Password Page
 *
 * Security settings view with:
 * - Sticky navbar with SVG logo, nav links (Settings active with underline),
 *   notifications button, user avatar
 * - Breadcrumbs: Settings / Security / Change Password
 * - Centered card (max-w-md):
 *   - Header: "Change Password" (3xl bold), description
 *   - Form: Current Password (visibility toggle, forgot link),
 *     New Password (visibility toggle, strength indicator — 4-bar),
 *     Confirm Password
 *   - Update Password (primary CTA) + Cancel
 * - Security Tip card (shield_lock icon)
 * - Footer with SVG logo
 *
 * Route: /change-password
 */

const ChangePassword = () => {
    const navigate = useNavigate();
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error('Please fill in all password fields.');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            toast.error('New passwords do not match!');
            return;
        }
        
        if (newPassword.length < 8) {
            toast.error('New password must be at least 8 characters long.');
            return;
        }

        setIsLoading(true);
        try {
            const res = await profileService.changePassword(currentPassword, newPassword);
            if (res.success) {
                toast.success(res.message || 'Password successfully changed.');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setTimeout(() => navigate('/profile'), 1500);
            } else {
                toast.error(res.message || 'Failed to change password.');
            }
        } catch (error) {
            console.error('Password change error:', error);
            toast.error(error.response?.data?.message || 'Server error. Could not change password.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
            {/* Top Navigation Bar */}
            {/* Removed hardcoded header to use MainLayout */}

            <main className="max-w-[1200px] mx-auto px-4 py-8 md:py-12">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 mb-8 text-sm font-medium">
                    <a className="text-slate-500 hover:text-primary transition-colors" href="#">
                        Settings
                    </a>
                    <span className="text-slate-400">/</span>
                    <span className="text-slate-900 dark:text-slate-100">Security</span>
                    <span className="text-slate-400">/</span>
                    <span className="text-primary">Change Password</span>
                </nav>

                <div className="max-w-md mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
                            Change Password
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400">
                            Ensure your account is secure by using a strong password with at least 8 characters.
                        </p>
                    </div>

                    {/* Password Form Card */}
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                        <form
                            className="flex flex-col gap-6"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            {/* Current Password */}
                            <div className="flex flex-col gap-2">
                                <label
                                    className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                                    htmlFor="current-password"
                                >
                                    Current Password
                                </label>
                                <div className="relative">
                                    <input
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white"
                                        id="current-password"
                                        placeholder="••••••••"
                                        type={showCurrent ? 'text' : 'password'}
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />
                                    <button
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                        type="button"
                                        onClick={() => setShowCurrent(!showCurrent)}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">
                                            {showCurrent ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                </div>
                                <div className="flex justify-end">
                                    <Link
                                        className="text-xs text-primary font-medium hover:underline"
                                        to="/forgot-password"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                            </div>

                            <hr className="border-slate-100 dark:border-slate-800" />

                            {/* New Password */}
                            <div className="flex flex-col gap-2">
                                <label
                                    className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                                    htmlFor="new-password"
                                >
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white"
                                        id="new-password"
                                        placeholder="Min. 8 characters"
                                        type={showNew ? 'text' : 'password'}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <button
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                        type="button"
                                        onClick={() => setShowNew(!showNew)}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">
                                            {showNew ? 'visibility' : 'visibility_off'}
                                        </span>
                                    </button>
                                </div>
                                {/* Strength Indicator */}
                                <div className="mt-2">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                                            Password Strength
                                        </span>
                                        <span className="text-[11px] font-bold text-yellow-500 uppercase tracking-wider">
                                            Medium
                                        </span>
                                    </div>
                                    <div className="flex gap-1 h-1.5 w-full">
                                        <div className="h-full flex-1 rounded-full bg-primary" />
                                        <div className="h-full flex-1 rounded-full bg-primary" />
                                        <div className="h-full flex-1 rounded-full bg-yellow-500" />
                                        <div className="h-full flex-1 rounded-full bg-slate-200 dark:bg-slate-700" />
                                    </div>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="flex flex-col gap-2">
                                <label
                                    className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                                    htmlFor="confirm-password"
                                >
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <input
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white"
                                        id="confirm-password"
                                        placeholder="Re-type new password"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3 pt-4">
                                <button
                                    className={`w-full ${isLoading ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'} text-white font-bold py-3.5 rounded-lg transition-all shadow-lg shadow-primary/20 active:scale-[0.98]`}
                                    type="submit"
                                    disabled={isLoading}
                                    onClick={handleSubmit}
                                >
                                    {isLoading ? 'Updating...' : 'Update Password'}
                                </button>
                                <button
                                    className="w-full bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold py-3 rounded-lg transition-all"
                                    type="button"
                                    onClick={() => navigate(-1)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Additional Help/Info */}
                    <div className="mt-8 text-center p-6 rounded-lg bg-primary/5 border border-primary/10">
                        <div className="flex items-center justify-center gap-2 text-primary mb-2">
                            <span className="material-symbols-outlined text-[20px]">shield_lock</span>
                            <span className="text-sm font-bold uppercase tracking-wider">Security Tip</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            We recommend using a mix of letters, numbers, and special symbols for maximum
                            security. Never share your password with anyone.
                        </p>
                    </div>
                </div>
            </main>

            {/* Removed hardcoded footer to use MainLayout */}
        </div>
    );
};

export default ChangePassword;
