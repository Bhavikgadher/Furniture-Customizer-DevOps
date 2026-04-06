import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Account Settings Page
 *
 * Settings dashboard with sidebar + content layout:
 * - Sticky navbar: chair logo (primary bg), Shop / Design / Settings (active) / Help,
 *   rounded search input, user avatar
 * - Sidebar: Account section (General, Security, Notifications [active], Privacy),
 *   Experience section (Theme, Linked Accounts)
 * - Header: "Notifications & Privacy" (3xl font-black), Discard/Save buttons
 * - Email Notifications: Order Updates, New Furniture Drops, Weekly Newsletter toggles
 * - Privacy & Visibility: Public Design Profile, Data Usage toggles
 * - Linked Social Accounts: Google (connected), Instagram (not connected), Apple (connected)
 * - Danger Zone: Deactivate Account (red)
 * - Mobile sticky save bar (md:hidden)
 * - Footer
 *
 * Route: /settings
 */

const SIDEBAR_ACCOUNT = [
    { icon: 'person', label: 'General', active: false },
    { icon: 'security', label: 'Security', active: false },
    { icon: 'notifications', label: 'Notifications', active: true, filled: true },
    { icon: 'lock', label: 'Privacy', active: false },
];

const SIDEBAR_EXPERIENCE = [
    { icon: 'palette', label: 'Theme', active: false },
    { icon: 'link', label: 'Linked Accounts', active: false },
];

const EMAIL_NOTIFICATIONS = [
    {
        id: 'order_updates',
        title: 'Order Updates',
        description: 'Receive real-time tracking and delivery notifications for your furniture.',
        defaultChecked: true,
    },
    {
        id: 'drops',
        title: 'New Furniture Drops',
        description: 'Be the first to know about our latest custom design launches.',
        defaultChecked: true,
    },
    {
        id: 'newsletter',
        title: 'Weekly Newsletter',
        description: 'Interior design tips, curated collections, and community highlights.',
        defaultChecked: false,
    },
];

const PRIVACY_SETTINGS = [
    {
        id: 'public_profile',
        title: 'Public Design Profile',
        description: 'Allow other users to see your custom furniture configurations.',
        defaultChecked: true,
    },
    {
        id: 'data_usage',
        title: 'Data Usage for Recommendations',
        description: 'Allow us to analyze your browsing to show relevant items.',
        defaultChecked: true,
    },
];

const SOCIAL_ACCOUNTS = [
    {
        name: 'Google',
        connected: true,
        email: 'alex.design@gmail.com',
        logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCg1Y7Ao02p1QcxPcE2Rk9B0-8Io486abqeFm5Z-4uPJHlpivuEmW2CrHhn89wX63dabTBzDHR2gjG3L0LW3dKC-e-pzd8WNsCSb3V-9bmUHNNtMcY02VPiLLIDxPmbtlZFdeK9Q5bBFwZJxsE-M4au8vAd7lHFEHI5kA48f629s8mDHvqwDu4oLadbZJD3vKPjOc8dt9zFgWNrLK7Oe2tAcc2nWoO9GUMsc8Hocbndq1sSABcUzOetPiCKqOrYySUgGOU1m4YqM1Sc',
        logoAlt: 'Official Google G Logo',
        invert: false,
    },
    {
        name: 'Instagram',
        connected: false,
        email: null,
        logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4ZN6c_HOru72UkU3INUR5sKSrX9-jA-oa9uZwbhopnTkx6fiMxRZLSpdMOh1oWn7RpXNUrwX2j6eUylb7lqn2hA2xHmE4Hip0h9sYyoJ3SqlM6r55eQYSGcfESf-vIGM0Li9-bUQI15wXKJEiI5F9bqXwDFBY8MR041L1PM0k3Oa_unF99tyzVy7iVcu9-25WKH2bKjfKrNCmMbtAZx0qKru6eUYzBRiye9ZivwxhHnij835fjIMjUnyIeNtemM6z_icgxp84Lp0C',
        logoAlt: 'Official Instagram Glyph Logo',
        invert: false,
    },
    {
        name: 'Apple ID',
        connected: true,
        email: 'a.smith@icloud.com',
        logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6Rxlf4W3TFhrPwRtzr1Gaj_6vo5Uhp5RRDukh3OIL0D0Q609g52rpmObXNU49-DR18yjDi_Zudz0jquh0IfZmcUKvs2YgLvRpEH_8BSzH04fAWaZ6xu4_z3NLB_vMHiKSZji_Ob9ZpEqL_iOlr6vczVJZ7zOHUBkvgvGCKZDsnasM-3bz5UzIvEASRghD7ak05kbk_T8pVsqMI1GmlsF1VzyBraiFMbYTyXTyFtpgzHo5PeGF007MEpBXjDgrXwcjIZD46MB-c7mx',
        logoAlt: 'Official Apple Logo',
        invert: true,
    },
];

const ToggleSwitch = ({ id, defaultChecked }) => {
    const [checked, setChecked] = useState(defaultChecked);

    return (
        <div className="relative inline-block w-10 h-5 align-middle select-none transition duration-200 ease-in">
            <input
                checked={checked}
                onChange={() => setChecked(!checked)}
                className="switch-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-slate-300 dark:border-slate-600 appearance-none cursor-pointer z-10 transition-transform duration-200 ease-in"
                id={id}
                name="toggle"
                type="checkbox"
            />
            <label
                className="switch-label block overflow-hidden h-5 rounded-full bg-slate-300 dark:bg-slate-700 cursor-pointer transition-colors duration-200 ease-in after:content-[''] after:absolute after:top-0 after:left-0 after:w-5 after:h-5 after:rounded-full after:bg-white after:shadow-sm after:transition-transform"
                htmlFor={id}
            />
        </div>
    );
};

const Settings = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
                {/* Navigation Header */}
                {/* Removed hardcoded header to use MainLayout */}

                <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-10 py-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Navigation */}
                        <aside className="w-full lg:w-64 flex flex-col gap-1">
                            <div className="px-3 py-2">
                                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    Account
                                </h3>
                            </div>
                            {SIDEBAR_ACCOUNT.map((item, index) => (
                                <a
                                    key={index}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${item.active
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                        }`}
                                    href="#"
                                >
                                    <span
                                        className="material-symbols-outlined text-xl"
                                        style={item.filled ? { fontVariationSettings: "'FILL' 1" } : {}}
                                    >
                                        {item.icon}
                                    </span>
                                    <span className="text-sm font-medium">{item.label}</span>
                                </a>
                            ))}
                            <div className="px-3 py-2 mt-4">
                                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    Experience
                                </h3>
                            </div>
                            {SIDEBAR_EXPERIENCE.map((item, index) => (
                                <a
                                    key={index}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                                    href="#"
                                >
                                    <span className="material-symbols-outlined text-xl">{item.icon}</span>
                                    <span className="text-sm font-medium">{item.label}</span>
                                </a>
                            ))}
                        </aside>

                        {/* Content Area */}
                        <div className="flex-1 flex flex-col gap-6">
                            {/* Header */}
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                <div>
                                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                        Notifications &amp; Privacy
                                    </h1>
                                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                                        Control how we communicate with you and manage your data.
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <button className="px-4 py-2 text-sm font-medium border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                        Discard
                                    </button>
                                    <button className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20">
                                        Save Changes
                                    </button>
                                </div>
                            </div>

                            {/* Email Notifications Section */}
                            <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                                <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                        Email Notifications
                                    </h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Manage which updates you receive via email.
                                    </p>
                                </div>
                                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {EMAIL_NOTIFICATIONS.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between p-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                                        >
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-sm font-semibold">{item.title}</span>
                                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                                    {item.description}
                                                </span>
                                            </div>
                                            <ToggleSwitch id={item.id} defaultChecked={item.defaultChecked} />
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Privacy Settings Section */}
                            <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                                <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                        Privacy &amp; Visibility
                                    </h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Control who can see your designs and profile info.
                                    </p>
                                </div>
                                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {PRIVACY_SETTINGS.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between p-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                                        >
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-sm font-semibold">{item.title}</span>
                                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                                    {item.description}
                                                </span>
                                            </div>
                                            <ToggleSwitch id={item.id} defaultChecked={item.defaultChecked} />
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Linked Social Accounts Section */}
                            <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                                <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                        Linked Social Accounts
                                    </h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Quickly sign in or share your designs to social media.
                                    </p>
                                </div>
                                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {SOCIAL_ACCOUNTS.map((account, index) => (
                                        <div key={index} className="flex items-center justify-between p-6">
                                            <div
                                                className={`flex items-center gap-4 ${!account.connected ? 'opacity-75' : ''
                                                    }`}
                                            >
                                                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                                    <img
                                                        alt={account.name}
                                                        className={`w-5 h-5 ${account.invert ? 'dark:invert' : ''}`}
                                                        src={account.logo}
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold">{account.name}</span>
                                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                                        {account.connected
                                                            ? `Connected as ${account.email}`
                                                            : 'Not connected'}
                                                    </span>
                                                </div>
                                            </div>
                                            {account.connected ? (
                                                <button className="px-4 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors border border-transparent hover:border-red-200">
                                                    Disconnect
                                                </button>
                                            ) : (
                                                <button className="px-4 py-1.5 text-xs font-semibold text-primary border border-primary/20 hover:bg-primary/5 rounded-lg transition-colors">
                                                    Connect
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Danger Zone */}
                            <section className="bg-red-50/30 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/30 overflow-hidden shadow-sm">
                                <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <h2 className="text-lg font-bold text-red-700 dark:text-red-400">
                                            Danger Zone
                                        </h2>
                                        <p className="text-sm text-red-600/80 dark:text-red-400/60 mt-1">
                                            Permanently deactivate your account and delete all design history.
                                        </p>
                                    </div>
                                    <button className="px-5 py-2.5 text-sm font-bold bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm shadow-red-600/20">
                                        Deactivate Account
                                    </button>
                                </div>
                            </section>
                        </div>
                    </div>
                </main>

                {/* Fixed Save Bar (Mobile/Bottom) */}
                <div className="md:hidden sticky bottom-0 left-0 w-full p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-4 z-50 shadow-2xl">
                    <button className="flex-1 py-3 text-sm font-medium border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 transition-colors">
                        Discard
                    </button>
                    <button className="flex-1 py-3 text-sm font-bold bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30">
                        Save All
                    </button>
                </div>

                {/* Removed hardcoded footer to use MainLayout */}
            </div>
        </div>
    );
};

export default Settings;
