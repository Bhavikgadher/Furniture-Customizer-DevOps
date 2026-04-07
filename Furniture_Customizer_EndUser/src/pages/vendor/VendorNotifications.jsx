import { Link } from 'react-router-dom';

/**
 * Vendor Notification Settings Page
 *
 * Notification preferences with grouped toggle controls:
 * - Header (sticky z-50): storefront icon (bg-primary p-2), "Vendor Portal" (xl font-bold),
 *   nav (Settings active text-primary font-semibold), notifications (bg-slate-100),
 *   avatar (bg-primary/20 border-primary/30)
 * - Breadcrumb: Settings > Notifications (text-primary)
 * - Title: "Notification Settings" (3xl font-bold)
 * - DND Card: bg-primary/5 border-primary/20, bedtime icon (bg-primary/10 text-primary),
 *   large toggle (w-14 h-7 peer-checked:bg-primary)
 * - Order Updates: shopping_bag, New Orders (Email ✓, Push ✓),
 *   Order Cancellations (Email ✓, Push ✗)
 * - Inventory & Stock: inventory_2, Low Stock Warning (both ✓),
 *   Out of Stock Alerts (both ✓)
 * - System & Platform: campaign, Platform News (Email ✗),
 *   Maintenance Windows (Email ✓)
 * - Summary Preferences: bg-slate-100, Digest Frequency select,
 *   Primary Email (mail icon + admin@modernvendor.com)
 * - Action Bar: Discard Changes + Save Preferences (shadow-lg shadow-primary/20)
 * - Footer: © 2024 with Privacy Policy + Terms links
 *
 * Route: /vendor-notifications
 */

const TOGGLE_CLASSES =
    'w-11 h-6 bg-slate-200 peer-checked:bg-primary rounded-full peer ' +
    "after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white " +
    'after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full';

const TOGGLE_LARGE_CLASSES =
    'w-14 h-7 bg-slate-200 peer-focus:outline-none dark:bg-slate-700 ' +
    'peer-checked:after:translate-x-full peer-checked:after:border-white ' +
    "after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white " +
    'after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 ' +
    'after:transition-all peer-checked:bg-primary';

const Toggle = ({ defaultChecked = false, large = false }) => (
    <label className="relative inline-flex items-center cursor-pointer">
        <input
            className="sr-only peer"
            type="checkbox"
            defaultChecked={defaultChecked}
        />
        <div className={large ? TOGGLE_LARGE_CLASSES : TOGGLE_CLASSES} />
    </label>
);

const NOTIFICATION_GROUPS = [
    {
        icon: 'shopping_bag',
        title: 'Order Updates',
        showHeaders: true,
        items: [
            {
                title: 'New Orders',
                desc: 'Receive an alert whenever a customer places a new order.',
                email: true,
                push: true,
            },
            {
                title: 'Order Cancellations',
                desc: 'Get notified when an order is cancelled by a user or system.',
                email: true,
                push: false,
            },
        ],
    },
    {
        icon: 'inventory_2',
        title: 'Inventory & Stock',
        showHeaders: false,
        items: [
            {
                title: 'Low Stock Warning',
                desc: 'Notify me when items fall below my custom threshold.',
                email: true,
                push: true,
            },
            {
                title: 'Out of Stock Alerts',
                desc: 'Immediate alerts when a product becomes unavailable.',
                email: true,
                push: true,
            },
        ],
    },
    {
        icon: 'campaign',
        title: 'System & Platform',
        showHeaders: false,
        items: [
            {
                title: 'Platform News',
                desc: 'Updates about new features and marketplace improvements.',
                email: false,
                push: null,
            },
            {
                title: 'Maintenance Windows',
                desc: 'Crucial alerts for scheduled site maintenance and downtime.',
                email: true,
                push: null,
            },
        ],
    },
];

const VendorNotifications = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="bg-primary p-2 rounded-lg text-white">
                                <span className="material-symbols-outlined block">storefront</span>
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Vendor Portal
                            </span>
                        </Link>
                        <nav className="hidden md:flex items-center gap-8">
                            <a className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary font-medium text-sm transition-colors" href="#">
                                Dashboard
                            </a>
                            <a className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary font-medium text-sm transition-colors" href="#">
                                Orders
                            </a>
                            <a className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary font-medium text-sm transition-colors" href="#">
                                Inventory
                            </a>
                            <a className="text-primary font-semibold text-sm" href="#">
                                Settings
                            </a>
                        </nav>
                        <div className="flex items-center gap-4">
                            <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 transition-all">
                                <span className="material-symbols-outlined text-xl">notifications</span>
                            </button>
                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden border border-primary/30">
                                <img
                                    className="h-full w-full object-cover"
                                    alt="User profile avatar"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkgXNtL9AGXfmskW-Mp-j_7Utwh_lnfIIHvKiCUAqNfhAHhBJD8A2DZTSQmP_jycZRJKGeo_32GJPBjx_XiZhDHvrplrBumlrImw_zuXyui6SKND96nH5i6eWbD6HN4Qtdddq2FZ4a2-BS7wirEKGU2rzfe2ApNey5p1EO0QL-ykEvD0M4F-1wsAm-FsHBAHEYy8ox1sGBY6TruD9tPj2nMDmhUwigsc5VHj2QA6prDE5jD5iDSCnJbFrl5fRyLVyikPQEzWLviypo"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-2">
                        <span>Settings</span>
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                        <span className="text-primary font-medium">Notifications</span>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                        Notification Settings
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Choose how and when you want to be notified about your shop activity.
                    </p>
                </div>

                {/* Do Not Disturb Card */}
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex gap-4">
                        <div className="bg-primary/10 p-3 rounded-lg text-primary">
                            <span className="material-symbols-outlined text-2xl">bedtime</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight">
                                Do Not Disturb
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                                Mute all notifications across email and mobile for 24 hours.
                            </p>
                        </div>
                    </div>
                    <Toggle large />
                </div>

                {/* Notification Groups */}
                <div className="space-y-6">
                    {NOTIFICATION_GROUPS.map((group) => (
                        <section
                            key={group.title}
                            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                        >
                            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">{group.icon}</span>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{group.title}</h2>
                            </div>
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                {group.items.map((item, idx) => (
                                    <div
                                        key={item.title}
                                        className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                    >
                                        <div className="flex-1 pr-4">
                                            <p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                                        </div>
                                        <div className="flex items-center gap-8">
                                            {/* Email toggle */}
                                            <div className="flex flex-col items-center gap-1">
                                                {group.showHeaders && idx === 0 && (
                                                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                                                        Email
                                                    </span>
                                                )}
                                                <Toggle defaultChecked={item.email} />
                                            </div>
                                            {/* Push toggle — only render if push is not null */}
                                            {item.push !== null && (
                                                <div className="flex flex-col items-center gap-1">
                                                    {group.showHeaders && idx === 0 && (
                                                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                                                            Push
                                                        </span>
                                                    )}
                                                    <Toggle defaultChecked={item.push} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                {/* Summary Preferences */}
                <div className="mt-10 p-6 bg-slate-100 dark:bg-slate-800/50 rounded-xl">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-4">Summary Preferences</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Digest Frequency
                            </label>
                            <select className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary">
                                <option>Instant (Real-time)</option>
                                <option>Daily Digest (Every Morning)</option>
                                <option>Weekly Summary</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Primary Email
                            </label>
                            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                                <span className="material-symbols-outlined text-sm text-slate-400">mail</span>
                                <span className="text-sm text-slate-600 dark:text-slate-400">
                                    admin@modernvendor.com
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-4">
                    <button className="px-6 py-2.5 rounded-lg font-bold text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                        Discard Changes
                    </button>
                    <button className="px-8 py-2.5 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all">
                        Save Preferences
                    </button>
                </div>

                {/* Footer */}
                <footer className="mt-12 text-center text-sm text-slate-400 dark:text-slate-600 pb-8">
                    <p>
                        © 2024 Vendor Portal •{' '}
                        <a className="underline" href="#">
                            Privacy Policy
                        </a>{' '}
                        •{' '}
                        <a className="underline" href="#">
                            Terms of Service
                        </a>
                    </p>
                </footer>
            </main>
        </div>
    );
};

export default VendorNotifications;
