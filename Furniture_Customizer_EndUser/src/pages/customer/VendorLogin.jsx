import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Vendor Login Page
 *
 * Split-screen layout:
 * - Left (lg:w-1/2): Primary gradient branding panel with grid SVG pattern,
 *   FurniCustom logo (white chair icon on white bg), headline "Empowering Custom
 *   Furniture Creators", vendor avatar stack (3 photos, -space-x-3),
 *   "Over 2,500 active vendors worldwide"
 * - Right (flex-1): Login form with:
 *   - Mobile logo (lg:hidden)
 *   - "Vendor Portal" heading + subtitle
 *   - Email input (mail icon)
 *   - Password input (lock icon + visibility toggle)
 *   - Remember me checkbox + "Forgot password?" link
 *   - "Sign In to Dashboard" CTA (uppercase, tracking-wider)
 *   - "Not a vendor yet? Apply to join" link
 *   - Footer: Help Center / Privacy / Terms
 *
 * Route: /vendor-login
 */

const VENDOR_AVATARS = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB4mczemsVxQIuE4uCfdIZ6KJuFo97NByxixqeJXcZR5PyFbpiSMoiD047e1nCBgH4FD53s-Dg0RgVFTFxXvEbZPf_hpkjZJHfW3q2jk7UIeDjkigkXUAen5KkkFz0FFuNtYwbzbwWj70fR0iT28hxKdafnk9fe7DiwPFV-zqGPVqKreqjOZQj8pZuOcALVhU4oQXUeCzjXRy5amSFQ9hWe2XoSYRv_wf4Dn4vSRkOIoAi7r0lLi7pwebCSf18_D3P3uhhGvZ_k6oxf',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA5gqB1YeOoujUeAxSU6uPbSPvWLg5-QDHIkI0yG-lB4A9OIk7HVIhf9LXLmvJ2H4YUwERfyJAqevZ3X4U1qFbCXv8cPCW67pHxcF7q0hWULax6lMwdWuj28E7BFSqMCbZSRlc-_zjIqJkxhb80NUddybG9xOBxNLcGlvYB-HzyUFf-r6tu9MrExkQ9rWs35Xc5Gq5L3q7Tyz-ljsbXLfSiG94GmgKkdq1L1AOuXHycyXz_QQfOm3ooqpd4iKj1gZO52z05NuLBGlkF',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAT_L0aFmYENZkxwjyV6ZgtYfdHbRJY26g3qZAhDPvga3vURqQEEI7zMKwwaO3H6TSzFyrEq3BgeqMEQu8QPYGf92qSBxU-VrqtQ8Ve0tuxT8jlmLckCsIHcdsdroDjrOUeXjdVYw6vpjTTULmTYbB6G_V6p366Z7Bx-s9wVRS53udnggyEgt5dhnjs-jM89GqnxWNxzIjM1EK0FuuZE3i_MKnmW6z4_JaoIvL1bUm6vEMtWITTeVB0y8QFghEo6uIqvCq6AM7Svb_o',
];

const VendorLogin = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
            <div className="flex min-h-screen flex-col lg:flex-row">
                {/* Left Side: Branding & Visuals */}
                <div className="hidden lg:flex lg:w-1/2 bg-login-pattern relative overflow-hidden items-center justify-center p-12">
                    <div className="absolute inset-0 opacity-20">
                        {/* Decorative SVG Pattern */}
                        <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern
                                    height="40"
                                    id="grid"
                                    patternUnits="userSpaceOnUse"
                                    width="40"
                                >
                                    <path
                                        d="M 40 0 L 0 0 0 40"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="1"
                                    />
                                </pattern>
                            </defs>
                            <rect fill="url(#grid)" height="100%" width="100%" />
                        </svg>
                    </div>
                    <div className="relative z-10 max-w-lg text-white">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="size-10 bg-white rounded-lg flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-3xl">chair</span>
                            </div>
                            <h1 className="text-3xl font-black tracking-tight">FurniCustom</h1>
                        </div>
                        <h2 className="text-5xl font-extrabold leading-tight mb-6">
                            Empowering Custom Furniture Creators.
                        </h2>
                        <p className="text-xl text-blue-100 font-light leading-relaxed mb-8">
                            Join our global network of artisans and manufacturers. Manage orders, track
                            production, and scale your business with our dedicated vendor tools.
                        </p>
                        <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                            <div className="flex -space-x-3">
                                {VENDOR_AVATARS.map((src, index) => (
                                    <div
                                        key={index}
                                        className="w-10 h-10 rounded-full border-2 border-primary bg-slate-200 overflow-hidden"
                                    >
                                        <img
                                            alt={`Vendor ${index + 1}`}
                                            className="w-full h-full object-cover"
                                            src={src}
                                        />
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm font-medium">Over 2,500 active vendors worldwide</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-24 bg-white dark:bg-background-dark">
                    <div className="mx-auto w-full max-w-md">
                        {/* Logo for mobile */}
                        <div className="lg:hidden flex items-center gap-2 mb-10 text-primary">
                            <span className="material-symbols-outlined text-4xl">chair</span>
                            <span className="text-2xl font-bold tracking-tight">FurniCustom</span>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                Vendor Portal
                            </h2>
                            <p className="mt-2 text-slate-500 dark:text-slate-400">
                                Welcome back. Please enter your details.
                            </p>
                        </div>

                        <form
                            className="space-y-6"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <div>
                                <label
                                    className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                                    htmlFor="email"
                                >
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                        <span className="material-symbols-outlined text-xl">mail</span>
                                    </div>
                                    <input
                                        autoComplete="email"
                                        className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm"
                                        id="email"
                                        name="email"
                                        placeholder="name@business.com"
                                        required
                                        type="email"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label
                                        className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
                                        htmlFor="password"
                                    >
                                        Password
                                    </label>
                                    <Link
                                        className="text-sm font-semibold text-primary hover:text-blue-700 transition-colors"
                                        to="/forgot-password"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                        <span className="material-symbols-outlined text-xl">lock</span>
                                    </div>
                                    <input
                                        autoComplete="current-password"
                                        className="block w-full pl-10 pr-12 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm"
                                        id="password"
                                        name="password"
                                        placeholder="••••••••"
                                        required
                                        type={showPassword ? 'text' : 'password'}
                                    />
                                    <button
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <span className="material-symbols-outlined text-xl">
                                            {showPassword ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input
                                    className="h-4 w-4 text-primary focus:ring-primary border-slate-300 dark:border-slate-700 rounded"
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                />
                                <label
                                    className="ml-2 block text-sm text-slate-600 dark:text-slate-400"
                                    htmlFor="remember-me"
                                >
                                    Remember me for 30 days
                                </label>
                            </div>

                            <div>
                                <button
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all uppercase tracking-wider"
                                    type="submit"
                                >
                                    Sign In to Dashboard
                                </button>
                            </div>
                        </form>

                        <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Not a vendor yet?
                                <a
                                    className="font-bold text-primary hover:text-blue-700 transition-colors ml-1"
                                    href="#"
                                >
                                    Apply to join our network
                                </a>
                            </p>
                        </div>

                        {/* Footer / Support */}
                        <div className="mt-12 flex justify-center gap-6 text-xs text-slate-400 uppercase tracking-widest font-semibold">
                            <a className="hover:text-primary" href="#">
                                Help Center
                            </a>
                            <a className="hover:text-primary" href="#">
                                Privacy
                            </a>
                            <a className="hover:text-primary" href="#">
                                Terms
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorLogin;
