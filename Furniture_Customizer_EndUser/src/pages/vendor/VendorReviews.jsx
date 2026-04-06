import { Link } from 'react-router-dom';

/**
 * Vendor Customer Reviews Page
 *
 * Reviews management with filters, stats, and reply functionality:
 * - Header (sticky z-50): star SVG (size-6), "VendorPortal", nav (Reviews active),
 *   search (w-48), notifications, settings, avatar (size-9)
 * - Title: "Customer Reviews" (3xl font-black), Export CSV + Generate Reports
 * - 4 KPI cards: Average Rating 4.8/5, Total Reviews 1,284,
 *   Response Rate 92%, Customer Sentiment Positive
 * - Filters sidebar (w-72): Rating/Product Category selects,
 *   Status checkboxes, Clear All, Rating Distribution bars
 * - Reviews feed: tabs (All/Pending/Replied), 3 review cards
 *   with star ratings, reply/report actions, reply box, textarea
 * - Pagination: 1-12 with prev/next
 * - Mobile footer: 4.8 rating + Reply to Pending button
 *
 * Route: /vendor-reviews
 */

const STATS = [
    {
        icon: 'star',
        iconClasses: 'p-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 rounded-lg material-symbols-outlined',
        iconFill: true,
        badge: '+0.2%',
        badgeColor: 'text-green-500 bg-green-50 dark:bg-green-900/20',
        label: 'Average Rating',
        value: '4.8 / 5',
    },
    {
        icon: 'forum',
        iconClasses: 'p-2 bg-primary/10 text-primary rounded-lg material-symbols-outlined',
        iconFill: false,
        badge: '+12%',
        badgeColor: 'text-green-500 bg-green-50 dark:bg-green-900/20',
        label: 'Total Reviews',
        value: '1,284',
    },
    {
        icon: 'quickreply',
        iconClasses: 'p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg material-symbols-outlined',
        iconFill: false,
        badge: '-2%',
        badgeColor: 'text-red-500 bg-red-50 dark:bg-red-900/20',
        label: 'Response Rate',
        value: '92%',
    },
    {
        icon: 'sentiment_very_satisfied',
        iconClasses: 'p-2 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg material-symbols-outlined',
        iconFill: false,
        badge: '+5%',
        badgeColor: 'text-green-500 bg-green-50 dark:bg-green-900/20',
        label: 'Customer Sentiment',
        value: 'Positive',
    },
];

const DISTRIBUTION = [
    { stars: 5, pct: '70%' },
    { stars: 4, pct: '20%' },
    { stars: 3, pct: '5%' },
    { stars: 2, pct: '3%' },
    { stars: 1, pct: '2%' },
];

const VendorReviews = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
            <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    {/* Header */}
                    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 md:px-10 py-3 sticky top-0 z-50">
                        <div className="flex items-center gap-8">
                            <Link to="/" className="flex items-center gap-4 text-primary">
                                <div className="size-6">
                                    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">
                                    VendorPortal
                                </h2>
                            </Link>
                            <div className="hidden lg:flex items-center gap-6">
                                <a className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" href="#">Dashboard</a>
                                <a className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" href="#">Orders</a>
                                <a className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" href="#">Products</a>
                                <a className="text-primary text-sm font-bold border-b-2 border-primary pb-1" href="#">Reviews</a>
                                <a className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" href="#">Analytics</a>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-1.5 border border-slate-200 dark:border-slate-700">
                                <span className="material-symbols-outlined text-slate-500 text-lg">search</span>
                                <input
                                    className="bg-transparent border-none focus:ring-0 text-sm placeholder:text-slate-500 w-48"
                                    placeholder="Search reviews..."
                                    type="text"
                                />
                            </div>
                            <button className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                <span className="material-symbols-outlined">notifications</span>
                            </button>
                            <button className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                <span className="material-symbols-outlined">settings</span>
                            </button>
                            <div className="size-9 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700">
                                <img
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfGX9R33HNIFnhBo4jZ-WPyXJTOHfo8MfJMTFwDN-XwaikQMwRvRuWBPjSV53-EYdBzpn3uHZnfsMzmrcl_s8QyDk36tIqhxwqTUPXUCB2lZiWWYYPAQkXHyuWBjGOnjAlJWXA5dbQR0EUaongAO7Sb88Irtmb8VD-Q3ArMJxev-jbCoaiyDmfdf6g3DrwNnN6uOdano8WWJoAHnIGUERV7H_2OIBGVQ84YREZ3VXeWDNklGgdDwdw6vdAkiI9ZzeUlhAiAVcpWZ2X"
                                />
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
                        {/* Page Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                            <div>
                                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                    Customer Reviews
                                </h1>
                                <p className="text-slate-500 dark:text-slate-400 mt-1">
                                    Monitor sentiment and engage with your community.
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    <span className="material-symbols-outlined text-lg">download</span>
                                    Export CSV
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">
                                    <span className="material-symbols-outlined text-lg">auto_awesome</span>
                                    Generate Reports
                                </button>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            {STATS.map((stat) => (
                                <div key={stat.label} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <div className="flex justify-between items-start mb-4">
                                        <span
                                            className={stat.iconClasses}
                                            style={stat.iconFill ? { fontVariationSettings: "'FILL' 1" } : undefined}
                                        >
                                            {stat.icon}
                                        </span>
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.badgeColor}`}>
                                            {stat.badge}
                                        </span>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.label}</p>
                                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                                </div>
                            ))}
                        </div>

                        {/* Main Content */}
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Filters Sidebar */}
                            <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
                                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <h4 className="font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                                        <span className="material-symbols-outlined text-lg">filter_alt</span> Filters
                                    </h4>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                                Rating
                                            </label>
                                            <select className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary">
                                                <option>All Ratings</option>
                                                <option>5 Stars</option>
                                                <option>4 Stars</option>
                                                <option>3 Stars &amp; Below</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                                Product Category
                                            </label>
                                            <select className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary">
                                                <option>All Products</option>
                                                <option>Electronics</option>
                                                <option>Accessories</option>
                                                <option>Software</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                                Status
                                            </label>
                                            <div className="space-y-2 mt-2">
                                                <label className="flex items-center gap-2 cursor-pointer group">
                                                    <input defaultChecked className="rounded text-primary focus:ring-primary" type="checkbox" />
                                                    <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors">
                                                        Pending Reply
                                                    </span>
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer group">
                                                    <input className="rounded text-primary focus:ring-primary" type="checkbox" />
                                                    <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors">
                                                        Replied
                                                    </span>
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer group">
                                                    <input className="rounded text-primary focus:ring-primary" type="checkbox" />
                                                    <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors">
                                                        Flagged
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="w-full mt-6 py-2 text-primary text-sm font-bold border border-primary/20 bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors">
                                        Clear All
                                    </button>
                                </div>

                                {/* Rating Distribution */}
                                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <h4 className="font-bold mb-4 text-slate-900 dark:text-white">Distribution</h4>
                                    <div className="space-y-3">
                                        {DISTRIBUTION.map((d) => (
                                            <div key={d.stars} className="flex items-center gap-2">
                                                <span className="text-xs font-medium w-4">{d.stars}</span>
                                                <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                    <div className="h-full bg-primary" style={{ width: d.pct }} />
                                                </div>
                                                <span className="text-xs text-slate-500 w-8 text-right">{d.pct}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </aside>

                            {/* Reviews Feed */}
                            <div className="flex-1 space-y-4">
                                {/* Tabs */}
                                <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6 overflow-x-auto">
                                    <button className="px-6 py-3 text-sm font-bold text-primary border-b-2 border-primary whitespace-nowrap">
                                        All Reviews (1,284)
                                    </button>
                                    <button className="px-6 py-3 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white whitespace-nowrap">
                                        Pending Reply (42)
                                    </button>
                                    <button className="px-6 py-3 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white whitespace-nowrap">
                                        Replied (1,242)
                                    </button>
                                </div>

                                {/* Review 1: 5 stars, Pending */}
                                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden hover:border-primary/30 transition-colors">
                                    <div className="p-6">
                                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    alt="Sarah J."
                                                    className="size-10 rounded-full"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnyVmhVD60kQCqixjAT6nORVIFdvhKBzeDGrUNwnQSX_xsoKb_05dmECIe1Id1vt-1ik1FCawdEPZfvx7dCsf2lptO7vqTdVCFpztY0CcL92r7Hubk56AWbKAKjLNFTtvuT1PPMMMAOSX46tRZSjWRLIvYtp73Z5UUUjMQ7qD9QQYcvFT6K48ES92Dv4Rt8Enc4j30pPKXc-uK827zPqne87y3cMb9d4fvwu9dKBzcwuStK4vjTeIq8AwSxySvHHQVu5X7I1zwRwoG"
                                                />
                                                <div>
                                                    <h5 className="font-bold text-slate-900 dark:text-white">Sarah Jenkins</h5>
                                                    <p className="text-xs text-slate-500">
                                                        Purchased: <span className="text-primary font-medium">Premium Wireless Headphones</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="flex gap-0.5 text-primary">
                                                    {[1, 2, 3, 4, 5].map((i) => (
                                                        <span key={i} className="material-symbols-outlined text-lg fill" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                    ))}
                                                </div>
                                                <span className="text-xs text-slate-500 mt-1">2 hours ago</span>
                                            </div>
                                        </div>
                                        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-6">
                                            The sound quality is absolutely stunning for the price. I&apos;ve used many high-end brands before, but these are definitely on par. The battery life is also better than advertised. Fast shipping was a huge plus!
                                        </p>
                                        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800 pt-4">
                                            <div className="flex gap-3">
                                                <button className="flex items-center gap-2 text-primary text-sm font-bold hover:underline">
                                                    <span className="material-symbols-outlined text-lg">reply</span>
                                                    Reply
                                                </button>
                                                <button className="flex items-center gap-2 text-slate-400 hover:text-red-500 text-sm font-medium transition-colors">
                                                    <span className="material-symbols-outlined text-lg">flag</span>
                                                    Report
                                                </button>
                                            </div>
                                            <span className="text-xs font-bold text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-2.5 py-1 rounded-full uppercase tracking-tight">
                                                Pending Reply
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Review 2: 4 stars, Replied */}
                                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-slate-400">person</span>
                                                </div>
                                                <div>
                                                    <h5 className="font-bold text-slate-900 dark:text-white">Michael R.</h5>
                                                    <p className="text-xs text-slate-500">
                                                        Purchased: <span className="text-primary font-medium">Smart Fitness Watch v2</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="flex gap-0.5 text-primary">
                                                    {[1, 2, 3, 4].map((i) => (
                                                        <span key={i} className="material-symbols-outlined text-lg fill" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                    ))}
                                                    <span className="material-symbols-outlined text-lg">star</span>
                                                </div>
                                                <span className="text-xs text-slate-500 mt-1">Yesterday, 4:20 PM</span>
                                            </div>
                                        </div>
                                        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-6">
                                            Good value for money. The heart rate sensor is fairly accurate during cardio. Only downside is the app takes a bit of time to sync occasionally. Overall happy with it.
                                        </p>
                                        {/* Reply Box */}
                                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border-l-4 border-primary mb-6">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-xs font-bold text-primary">Your Response</span>
                                                <span className="text-[10px] text-slate-500">• 4 hours ago</span>
                                            </div>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                                                &quot;Hi Michael! Glad to hear you&apos;re enjoying the fitness watch. We are currently working on an app update to improve sync speeds. Thanks for the feedback!&quot;
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                                            <button className="text-slate-400 hover:text-primary text-sm font-medium transition-colors">
                                                Edit Response
                                            </button>
                                            <span className="text-xs font-bold text-green-500 bg-green-50 dark:bg-green-900/20 px-2.5 py-1 rounded-full uppercase tracking-tight">
                                                Replied
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Review 3: 5 stars, Reply textarea */}
                                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    alt="David W."
                                                    className="size-10 rounded-full"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBx0ioteVJa4p66ZD32erTFEhPDThyLivabA5l8R75RuRELwgOCE_P2xWLzbjzo051xJAUqW7EU55Woqc6gFtqccKqA8MgGxM1ces3OY1lr03S7hEBvzl6gA7AnEPRoCrt-aE4j7LClP8z2j57nv-DnmiBdYe3PdDNwKXIEPaL8KKd4uOwD3xg2aAcMKZDm8UYkTFo5hioi5aJqL4PiFqvDea2fT0S4ZUrq1jWgNU5G_K4N5apDIPjjBbWCjKrCA-f4xuETAUp3Dtww"
                                                />
                                                <div>
                                                    <h5 className="font-bold text-slate-900 dark:text-white">David Wilson</h5>
                                                    <p className="text-xs text-slate-500">
                                                        Purchased: <span className="text-primary font-medium">Ergonomic Office Chair</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="flex gap-0.5 text-primary">
                                                    {[1, 2, 3, 4, 5].map((i) => (
                                                        <span key={i} className="material-symbols-outlined text-lg fill" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                    ))}
                                                </div>
                                                <span className="text-xs text-slate-500 mt-1">Oct 12, 2023</span>
                                            </div>
                                        </div>
                                        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-6">
                                            Easy to assemble and very comfortable for long work sessions. I&apos;ve had it for a week now and my back pain has significantly decreased. Worth every penny.
                                        </p>
                                        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                            <textarea
                                                className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm p-4 focus:ring-primary focus:border-primary"
                                                placeholder="Write your reply..."
                                                rows="3"
                                            />
                                            <div className="flex justify-end gap-3">
                                                <button className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors">
                                                    Cancel
                                                </button>
                                                <button className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-md shadow-primary/20 hover:opacity-90">
                                                    Send Reply
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Pagination */}
                                <div className="flex items-center justify-between py-6">
                                    <button
                                        className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-500 hover:text-primary transition-colors disabled:opacity-50"
                                        disabled
                                    >
                                        <span className="material-symbols-outlined">chevron_left</span>
                                    </button>
                                    <div className="flex gap-2">
                                        <button className="size-9 flex items-center justify-center bg-primary text-white rounded-lg font-bold text-sm">
                                            1
                                        </button>
                                        {[2, 3].map((p) => (
                                            <button key={p} className="size-9 flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium hover:border-primary transition-colors">
                                                {p}
                                            </button>
                                        ))}
                                        <span className="size-9 flex items-center justify-center text-slate-400">...</span>
                                        <button className="size-9 flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium hover:border-primary transition-colors">
                                            12
                                        </button>
                                    </div>
                                    <button className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-500 hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* Mobile Footer */}
                    <footer className="lg:hidden sticky bottom-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4">
                        <div className="flex justify-between items-center max-w-7xl mx-auto">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-black">4.8</span>
                                <span className="text-xs text-slate-500 leading-none">
                                    Overall
                                    <br />
                                    Rating
                                </span>
                            </div>
                            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold">
                                Reply to Pending
                            </button>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default VendorReviews;
