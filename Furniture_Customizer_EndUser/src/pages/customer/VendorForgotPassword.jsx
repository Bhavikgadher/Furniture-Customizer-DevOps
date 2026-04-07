import { Link } from 'react-router-dom';

/**
 * Vendor Forgot Password Page
 *
 * Centered auth card layout:
 * - Navbar: SVG logo (primary bg) + "FurniCustom Vendor", Support button (help icon)
 * - Auth Card (shadow-xl):
 *   - lock_reset icon (primary/10 circle)
 *   - "Forgot your password?" heading
 *   - Description about business email reset
 *   - Email input with mail icon
 *   - Security badge: verified_user icon + "encrypted and secure"
 *   - "Send Reset Link" CTA (uppercase tracking-wide)
 *   - Footer: "Return to Login" link (arrow_back) + "Contact Vendor Support"
 * - "FurniCustom B2B Platform" label
 * - Footer: © 2024, Privacy Policy / Terms / Security links
 *
 * Route: /vendor-forgot-password
 */

const VendorForgotPassword = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
            {/* Top Navigation Bar */}
            <header className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2">
                            <div className="p-1.5 bg-primary rounded-lg">
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                                FurniCustom <span className="text-primary">Vendor</span>
                            </span>
                        </Link>
                        {/* Help Button */}
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-semibold">
                            <span className="material-symbols-outlined text-[20px]">help</span>
                            <span className="hidden sm:inline">Support</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* Auth Card */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 p-8">
                        {/* Card Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                                <span className="material-symbols-outlined text-primary text-4xl">lock_reset</span>
                            </div>
                            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
                                Forgot your password?
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                Enter the business email address associated with your FurniCustom vendor account.
                                We&apos;ll send you a secure link to reset your password.
                            </p>
                        </div>

                        {/* Form */}
                        <form
                            className="space-y-6"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <div>
                                <label
                                    className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                                    htmlFor="vendor-email"
                                >
                                    Business Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-slate-400 text-[20px]">
                                            mail
                                        </span>
                                    </div>
                                    <input
                                        className="block w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm transition-all"
                                        id="vendor-email"
                                        name="email"
                                        placeholder="vendor@company.com"
                                        required
                                        type="email"
                                    />
                                </div>
                            </div>

                            {/* Security Badge */}
                            <div className="flex items-center gap-2 px-3 py-2 bg-primary/5 rounded-lg border border-primary/10">
                                <span className="material-symbols-outlined text-primary text-[18px]">
                                    verified_user
                                </span>
                                <p className="text-[12px] text-slate-600 dark:text-slate-400 font-medium">
                                    Your request is encrypted and secure.
                                </p>
                            </div>

                            <button
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all uppercase tracking-wide"
                                type="submit"
                            >
                                Send Reset Link
                            </button>
                        </form>

                        {/* Footer Links */}
                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col items-center gap-4">
                            <Link
                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                                to="/vendor-login"
                            >
                                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                                Return to Login
                            </Link>
                            <p className="text-xs text-slate-500 dark:text-slate-500 text-center">
                                Need help?{' '}
                                <a
                                    className="text-slate-700 dark:text-slate-300 underline font-medium hover:text-primary transition-colors"
                                    href="#"
                                >
                                    Contact Vendor Support
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Additional Context */}
                    <div className="mt-8 text-center px-4">
                        <p className="text-xs text-slate-400 dark:text-slate-600 uppercase tracking-widest font-bold">
                            FurniCustom B2B Platform
                        </p>
                    </div>
                </div>
            </main>

            {/* Simple Footer */}
            <footer className="py-6 px-4 border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        © 2024 FurniCustom Inc. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a
                            className="text-xs text-slate-500 hover:text-primary transition-colors"
                            href="#"
                        >
                            Privacy Policy
                        </a>
                        <a
                            className="text-xs text-slate-500 hover:text-primary transition-colors"
                            href="#"
                        >
                            Terms of Service
                        </a>
                        <a
                            className="text-xs text-slate-500 hover:text-primary transition-colors"
                            href="#"
                        >
                            Security
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default VendorForgotPassword;
