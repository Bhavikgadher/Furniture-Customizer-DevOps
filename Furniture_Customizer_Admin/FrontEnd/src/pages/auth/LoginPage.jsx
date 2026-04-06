import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLogin } from '../../hooks/api';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login: setAuth } = useAuth();
    const loginMutation = useLogin();

    const [form, setForm] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = (e) => {
        e.preventDefault();
        loginMutation.mutate(form, {
            onSuccess: (data) => {
                setAuth(data);
                navigate(from, { replace: true });
            },
        });
    };

    return (
        <div className="min-h-screen flex">
            {/* ─── Left Panel — Branding ──────────────────────────── */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
                {/* Animated gradient blobs */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/30 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-violet-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-cyan-500/15 rounded-full blur-[90px] animate-pulse" style={{ animationDelay: '2s' }}></div>

                {/* Grid overlay */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between p-12 w-full">
                    <div>
                        {/* Logo */}
                        <div className="flex items-center gap-3 mb-16">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                                <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    chair
                                </span>
                            </div>
                            <span className="text-white text-lg font-black tracking-tight">
                                Furniture Customizer
                            </span>
                        </div>

                        {/* Headline */}
                        <div className="max-w-lg">
                            <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight mb-6">
                                Manage your
                                <span className="bg-gradient-to-r from-primary via-blue-400 to-cyan-400 bg-clip-text text-transparent"> furniture </span>
                                business with confidence
                            </h1>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Full control over products, vendors, orders, and analytics — all in one powerful admin dashboard.
                            </p>
                        </div>

                        {/* Feature chips */}
                        <div className="flex flex-wrap gap-3 mt-10">
                            {[
                                { icon: 'inventory_2', label: 'Product Management' },
                                { icon: 'groups', label: 'Vendor Control' },
                                { icon: 'monitoring', label: 'Real-time Analytics' },
                                { icon: 'shield', label: 'Role-based Access' },
                            ].map((f) => (
                                <div
                                    key={f.label}
                                    className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2"
                                >
                                    <span className="material-symbols-outlined text-primary text-sm">{f.icon}</span>
                                    <span className="text-white/70 text-xs font-semibold">{f.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom text */}
                    <p className="text-slate-600 text-xs">
                        © 2024 Furniture Customizer Suite • Admin Portal v2.0
                    </p>
                </div>
            </div>

            {/* ─── Right Panel — Login Form ───────────────────────── */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white dark:bg-slate-950">
                <div className="w-full max-w-md">
                    {/* Mobile-only logo */}
                    <div className="flex items-center gap-3 mb-10 lg:hidden">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                            <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                chair
                            </span>
                        </div>
                        <span className="text-slate-900 dark:text-white text-lg font-black tracking-tight">
                            Furniture Customizer
                        </span>
                    </div>

                    {/* Heading */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                            Welcome back
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">
                            Sign in to your admin account to continue
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label
                                htmlFor="login-email"
                                className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                                    mail
                                </span>
                                <input
                                    id="login-email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    autoFocus
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    placeholder="admin@company.com"
                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label
                                    htmlFor="login-password"
                                    className="block text-sm font-bold text-slate-700 dark:text-slate-300"
                                >
                                    Password
                                </label>
                                <a
                                    href="#"
                                    onClick={(e) => e.preventDefault()}
                                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                                    lock
                                </span>
                                <input
                                    id="login-password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    autoComplete="current-password"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    placeholder="Enter your password"
                                    className="w-full pl-11 pr-12 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                                    tabIndex={-1}
                                >
                                    <span className="material-symbols-outlined text-lg">
                                        {showPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center gap-2">
                            <input
                                id="remember-me"
                                type="checkbox"
                                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20 cursor-pointer"
                            />
                            <label
                                htmlFor="remember-me"
                                className="text-sm text-slate-600 dark:text-slate-400 font-medium cursor-pointer select-none"
                            >
                                Keep me signed in
                            </label>
                        </div>

                        {/* Error Message */}
                        {loginMutation.isError && (
                            <div className="flex items-center gap-3 p-3.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl animate-in">
                                <span className="material-symbols-outlined text-red-500 text-lg flex-shrink-0">error</span>
                                <p className="text-sm text-red-700 dark:text-red-400 font-medium">
                                    {loginMutation.error?.response?.data?.message || 'Invalid email or password. Please try again.'}
                                </p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loginMutation.isPending}
                            className="w-full py-3.5 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/25 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loginMutation.isPending ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-8">
                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">or</span>
                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
                    </div>

                    {/* SSO / alternative sign-in */}
                    <button
                        type="button"
                        className="w-full py-3 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Continue with Google SSO
                    </button>

                    {/* Footer note */}
                    <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-8">
                        Protected admin portal. Unauthorized access attempts are logged.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
