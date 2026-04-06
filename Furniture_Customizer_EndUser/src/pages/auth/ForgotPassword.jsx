import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthHeader from '../../components/common/AuthHeader';
import AuthFooter from '../../components/common/AuthFooter';
import { authService } from '../../services/auth.service';
import toast from 'react-hot-toast';

/**
 * Forgot Password Page
 *
 * Standalone auth page with:
 * - Top: Minimal navigation header with logo + support link
 * - Center: Card with lock icon, heading, description, email input, and submit button
 * - Bottom: Back to Login link and copyright footer
 * - Decorative gradient blur circles for premium aesthetic
 *
 * Route: /forgot-password
 */
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email) {
            toast.error('Please enter your email address.');
            return;
        }

        setIsLoading(true);
        try {
            const res = await authService.forgotPassword(email);
            if (res.success) {
                toast.success(res.message || 'Reset link sent to your email.');
                setEmail('');
            } else {
                toast.error(res.message || 'Failed to send reset link.');
            }
        } catch (error) {
            console.error('Forgot password error:', error);
            toast.error(error.response?.data?.message || 'Server error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
            {/* Top Navigation Bar */}
            <AuthHeader />

            {/* Main Content Area */}
            <main className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-[450px] bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 lg:p-10">
                    {/* Icon/Header Section */}
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="size-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                            <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>
                                lock_reset
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                            Forgot your password?
                        </h2>
                        <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            No worries! Enter the email address associated with your FurniCustom account, and
                            we&apos;ll send you a link to reset your password.
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label
                                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                                htmlFor="email"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    className="block w-full px-4 py-3 bg-background-light dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="e.g., name@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            className={`w-full py-3.5 px-4 ${isLoading ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'} text-white font-bold rounded-lg transition-colors shadow-md shadow-primary/20 flex items-center justify-center gap-2 group`}
                            type="submit"
                            disabled={isLoading}
                        >
                            <span>{isLoading ? 'Sending...' : 'Send Reset Link'}</span>
                            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                                arrow_forward
                            </span>
                        </button>
                    </form>

                    {/* Footer Links */}
                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col items-center gap-4">
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
                        >
                            <span className="material-symbols-outlined">arrow_back</span>
                            Back to Login
                        </Link>
                    </div>
                </div>
            </main>

            {/* Page Footer */}
            <AuthFooter />

            {/* Decorative Elements (Premium aesthetic) */}
            <div className="fixed top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="fixed bottom-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
        </div>
    );
};

export default ForgotPassword;
