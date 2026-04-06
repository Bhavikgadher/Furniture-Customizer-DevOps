import { Link } from 'react-router-dom';

/**
 * Vendor Change Password Page
 *
 * Password change form with strength indicator and requirements:
 * - Header: star SVG icon (text-primary w-8 h-8), "Vendor Portal" (xl font-bold),
 *   nav (Settings active border-b-2 border-primary), avatar (w-10 h-10)
 * - Page title: "Change Password" (3xl font-black text-center)
 * - Form card (shadow-xl rounded-xl):
 *   - Decorative banner (h-48 bg-cover) with bg-primary/20 backdrop-blur-sm overlay,
 *     lock_reset icon (text-5xl), "SECURITY CENTER" (uppercase tracking-widest)
 *   - Current Password (password + visibility toggle)
 *   - Separator (hr border-slate-100)
 *   - New Password (password + visibility toggle)
 *   - Strength Indicator: 4 bars (2 primary, 1 primary/30, 1 slate-200),
 *     "Strength: Medium" (text-primary), "Try adding a symbol" (italic)
 *   - Confirm Password (password + check_circle green icon)
 *   - Requirements checklist (bg-slate-50 rounded-lg):
 *     ✓ At least 8 characters (green), ✓ One uppercase (green),
 *     ○ One special symbol (slate), ○ One number (slate)
 *   - Update Password (primary shadow-lg) + Cancel buttons
 * - Back to Security Settings link (arrow_back hover:-translate-x-1)
 * - Hidden success toast (border-l-4 green-500, shadow-2xl)
 *
 * Route: /vendor-change-password
 */

const VendorChangePassword = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
            {/* Header */}
            <header className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="text-primary">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                            <span className="text-xl font-bold tracking-tight">Vendor Portal</span>
                        </Link>
                        <nav className="hidden md:flex items-center gap-8">
                            <a className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">
                                Dashboard
                            </a>
                            <a className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">
                                Orders
                            </a>
                            <a className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">
                                Inventory
                            </a>
                            <a className="text-sm font-medium text-slate-900 dark:text-slate-100 border-b-2 border-primary pb-1" href="#">
                                Settings
                            </a>
                        </nav>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden border border-slate-300 dark:border-slate-600">
                                <img
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg_gEqot811j3qF_W8dWS8jdaXNuh9YjB5DUowAJxwfwtcAO4IK0Hhc2MzYqUvW4v7U5z7Msy3JYvSOHB6vK7M6VhnmREyv1em-Fa3cSUk0aufmQfWaIx3JpQHw21IDCyrxLj1KRWxsu8n3wcDskhKaG21n_7L5AxgJ4eY9KfkoI4TbTVCnc9g_S97PeQyMdOs5YF4k1QPRmuZtUo4N4lS2e5fPBskCieWUbTBEREHJZwkD9cQK4bLvLZk25eUDshh7xAPVV928z13"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    {/* Page Header */}
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
                            Change Password
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            Ensure your account stays secure by using a strong, unique password.
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white dark:bg-slate-900 shadow-xl rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                        {/* Decorative Banner */}
                        <div
                            className="h-48 w-full bg-cover bg-center relative"
                            style={{
                                backgroundImage:
                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBYQJa-Vjc6QsvVUCCg6U21MCERGOp1_Gn9UHtWXBzAEpIg2SKdAJx7D1I0lSzlCl5VJgzyyZaK-0X-Mm9a9Eavx74aqU9ulgdHXphtlcKQqoSpofaQ1KzIU14sietlNngYKt0nDGsxTj0LULXrST5tH37_Sd6iNRK_lGIcwuTfR-HQh08JxEgVeyVXhJlgcItbCpIsFbwB9bWISqQv1--EFK6VIkWQ7ASYppBcKSQrGFWaiUMCbExBW5yS-thy7OYJVloRkL5sinXP')",
                            }}
                        >
                            <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                                <div className="text-white flex flex-col items-center">
                                    <span className="material-symbols-outlined text-5xl mb-2">lock_reset</span>
                                    <span className="font-semibold uppercase tracking-widest text-xs">
                                        Security Center
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="p-8">
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                {/* Current Password */}
                                <div>
                                    <label
                                        className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                                        htmlFor="current-password"
                                    >
                                        Current Password
                                    </label>
                                    <div className="relative group">
                                        <input
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                            id="current-password"
                                            name="current-password"
                                            placeholder="••••••••••••"
                                            type="password"
                                        />
                                        <button
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                                            type="button"
                                        >
                                            <span className="material-symbols-outlined">visibility</span>
                                        </button>
                                    </div>
                                </div>

                                <hr className="border-slate-100 dark:border-slate-800" />

                                {/* New Password */}
                                <div>
                                    <label
                                        className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                                        htmlFor="new-password"
                                    >
                                        New Password
                                    </label>
                                    <div className="relative group mb-3">
                                        <input
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                            id="new-password"
                                            name="new-password"
                                            placeholder="Enter new password"
                                            type="password"
                                        />
                                        <button
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                                            type="button"
                                        >
                                            <span className="material-symbols-outlined">visibility</span>
                                        </button>
                                    </div>

                                    {/* Strength Indicator */}
                                    <div className="space-y-3">
                                        <div className="flex gap-1 h-1.5 w-full">
                                            <div className="flex-1 bg-primary rounded-full" />
                                            <div className="flex-1 bg-primary rounded-full" />
                                            <div className="flex-1 bg-primary/30 rounded-full" />
                                            <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full" />
                                        </div>
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-primary font-medium">Strength: Medium</span>
                                            <span className="text-slate-500 italic">Try adding a symbol</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label
                                        className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                                        htmlFor="confirm-password"
                                    >
                                        Confirm New Password
                                    </label>
                                    <div className="relative group">
                                        <input
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                            id="confirm-password"
                                            name="confirm-password"
                                            placeholder="Confirm new password"
                                            type="password"
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 flex items-center">
                                            <span className="material-symbols-outlined">check_circle</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Requirements Checklist */}
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                                        Password Requirements
                                    </h4>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm">
                                        <li className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium">
                                            <span className="material-symbols-outlined text-[18px]">check</span>
                                            At least 8 characters
                                        </li>
                                        <li className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium">
                                            <span className="material-symbols-outlined text-[18px]">check</span>
                                            One uppercase letter
                                        </li>
                                        <li className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                            <span className="material-symbols-outlined text-[18px]">radio_button_unchecked</span>
                                            One special symbol
                                        </li>
                                        <li className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                            <span className="material-symbols-outlined text-[18px]">radio_button_unchecked</span>
                                            One number
                                        </li>
                                    </ul>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <button
                                        className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                                        type="submit"
                                    >
                                        <span className="material-symbols-outlined">security</span>
                                        Update Password
                                    </button>
                                    <button
                                        className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold py-3 px-6 rounded-lg transition-all"
                                        type="button"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Back Link */}
                    <div className="mt-8 text-center">
                        <a
                            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline group"
                            href="#"
                        >
                            <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">
                                arrow_back
                            </span>
                            Back to Security Settings
                        </a>
                    </div>
                </div>
            </main>

            {/* Success Toast (Hidden by Default) */}
            <div className="fixed bottom-8 right-8 bg-white dark:bg-slate-900 border-l-4 border-green-500 p-4 rounded shadow-2xl flex items-center gap-4 max-w-sm border dark:border-slate-800 hidden">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full text-green-600 dark:text-green-400">
                    <span className="material-symbols-outlined">verified</span>
                </div>
                <div>
                    <p className="font-bold text-slate-900 dark:text-white">Password updated!</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Your credentials have been successfully changed.
                    </p>
                </div>
                <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>
        </div>
    );
};

export default VendorChangePassword;
