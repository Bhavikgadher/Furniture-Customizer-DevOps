import { Link } from 'react-router-dom';

/**
 * Vendor Dashboard Page
 *
 * Full app shell with sidebar + main content:
 * - Sidebar (w-64): chair_alt logo, nav links (Dashboard active, Orders, Products,
 *   Analytics, Reviews, Settings), "Add Product" CTA
 * - Header (h-16): search input, notifications (red dot), mail, "Studio Oak" vendor profile
 * - KPI Cards (4-col): Revenue $42,500 (+12.5%), Orders 1,284 (+8.2%),
 *   Products 45 (Steady), Rating 4.8 (+0.1)
 * - Top Selling Models table (2/3): 3 products with thumbnails, sales, performance bars, revenue
 * - Recent Activity timeline (1/3): 4 items with colored dots and connector lines
 * - Sales Performance bar chart: 12 month bars with hover effect, period select dropdown
 *
 * Route: /vendor-dashboard
 */

const KPI_CARDS = [
    {
        icon: 'payments',
        label: 'Total Revenue',
        value: '$42,500.00',
        badge: '+12.5%',
        badgeClass: 'text-emerald-600 bg-emerald-100',
    },
    {
        icon: 'shopping_cart',
        label: 'Total Orders',
        value: '1,284',
        badge: '+8.2%',
        badgeClass: 'text-emerald-600 bg-emerald-100',
    },
    {
        icon: 'inventory_2',
        label: 'Active Products',
        value: '45',
        badge: 'Steady',
        badgeClass: 'text-slate-500 bg-slate-100',
    },
    {
        icon: 'star',
        label: 'Average Rating',
        value: '4.8',
        badge: '+0.1',
        badgeClass: 'text-emerald-600 bg-emerald-100',
        isRating: true,
    },
];

const TOP_PRODUCTS = [
    {
        name: 'Nordic Lounge Chair',
        sku: 'NL-821-OAK',
        sales: '342 units',
        performance: '85%',
        revenue: '$12,450',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuC9LJzg_VnrjPU8fVMTKLw6vEaiz1NlSAAJg567VIQ3gPgtuxjWbc6mZ2-RDVW8_E5R_NeKJ3HR1qYGYNASiaOtTuHxfiGF-zJtFCE9u1W_QELlPDCB3gMmLgwCWjt0hd9XfUPIqgEQXgX7j2InrrZoD0XUP9ClOwi_v5NfWzGRVf0R5gPMYpjXsfL5PWJnf_3qBL79cThcnGeGSWsucMhsMa-nGSLTlVi_hUkMyHmlz8bhCaqGgPgEHVIchoc6NwqiVwp3pdFWBSjD',
    },
    {
        name: 'Custom Walnut Dining Table',
        sku: 'DT-552-WAL',
        sales: '128 units',
        performance: '62%',
        revenue: '$38,200',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCtyq1ttuelWqBPh0xtA7i4-ET9pMf-LZbfv3CKrOFCtYXi39E8RC7tpYSa08fk7GcgpAR0F6joYOqFYLe-Ev-yK9ecPJXuI_RK8-6mV3CffR-GKiFkWxe37kl0lR9lLbryKSWbkihF4zMUP9Hlab3EbnqMswFwwPW8ksUxL6S2k97gEftiW_YCYP9yZGWYMnRJeyhINYm0_TX45i1oi2LGpBYIagxV2i3Y3PRFP0LFBQpHabC3lo8aynDztaYah0xzCwhn30agse2h',
    },
    {
        name: 'Minimalist Bedside Stand',
        sku: 'BS-110-WHT',
        sales: '215 units',
        performance: '45%',
        revenue: '$8,600',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDQagkTbYFAyAYhPT3W77Opka0sc2HYYoQKESoPcuvLH1q7S7KfgUfKRELZ-RoK2DDAB0_4otzkQijz34t6I0oE16cLe3iB_ilvW70uaFqOnff9P8_GmIkwl61p3-LgvBwlGODP-3VhF42utK2aypqxoiCQHOuNoiJ1ybL9bM7sd03jpR2LoLybhic5xvm7qURMbCbEw0mWeZESPHoDbH11SZvOs5M-en42y90M0X-92RepHak9Gr32q0KfGP4GXgjV-yfeRfK0jmq1',
    },
];

const ACTIVITIES = [
    {
        icon: 'shopping_bag',
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-600',
        title: 'New Order #1234 Received',
        desc: 'Custom Oak Table ordered by Alex M.',
        time: '2 minutes ago',
        showLine: true,
    },
    {
        icon: 'verified',
        iconBg: 'bg-primary/10',
        iconColor: 'text-primary',
        title: 'Design Approved',
        desc: "'Nordic Chair' variation #2 was approved by the curation team.",
        time: '1 hour ago',
        showLine: true,
    },
    {
        icon: 'payments',
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        title: 'Payout Scheduled',
        desc: 'Your weekly payout of $4,200 is scheduled for tomorrow.',
        time: '3 hours ago',
        showLine: true,
    },
    {
        icon: 'grade',
        iconBg: 'bg-amber-100',
        iconColor: 'text-amber-600',
        title: 'New Review (5 Stars)',
        desc: '"The quality of the timber is exceptional." - Jane D.',
        time: '5 hours ago',
        showLine: false,
    },
];

const CHART_BARS = [40, 55, 45, 70, 60, 85, 95, 75, 65, 80, 50, 40];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const NAV_ITEMS = [
    { icon: 'dashboard', label: 'Dashboard', active: true, href: '/vendor-dashboard' },
    { icon: 'shopping_bag', label: 'Orders', active: false, href: '/vendor-orders' },
    { icon: 'inventory_2', label: 'Products', active: false, href: '/vendor-products' },
    { icon: 'bar_chart', label: 'Analytics', active: false, href: '/vendor-analytics' },
    { icon: 'reviews', label: 'Reviews', active: false, href: '/vendor-reviews' },
    { icon: 'settings', label: 'Settings', active: false, href: '/vendor-profile' },
];

const VendorDashboard = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar Navigation */}
                <aside className="w-64 flex-shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
                    <div className="p-6">
                        <Link to="/home" className="flex items-center gap-3">
                            <div className="bg-primary rounded-lg p-1.5">
                                <span className="material-symbols-outlined text-white">chair_alt</span>
                            </div>
                            <div>
                                <h1 className="text-lg font-bold leading-none">FurniCustom</h1>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Vendor Portal</p>
                            </div>
                        </Link>
                    </div>
                    <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.label}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg ${item.active
                                        ? 'bg-primary/10 text-primary font-medium'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'
                                    }`}
                                to={item.href}
                            >
                                <span className="material-symbols-outlined">{item.icon}</span>
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </nav>
                    <div className="p-4 mt-auto">
                        <Link className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors" to="/vendor-add-product">
                            <span className="material-symbols-outlined text-[20px]">add</span>
                            <span>Add Product</span>
                        </Link>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 flex flex-col overflow-hidden">
                    {/* Global Header */}
                    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8">
                        <div className="flex items-center gap-4 flex-1 max-w-xl">
                            <div className="relative w-full">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                                    search
                                </span>
                                <input
                                    className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 transition-all"
                                    placeholder="Search orders, products, or customers..."
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full relative">
                                <span className="material-symbols-outlined">notifications</span>
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
                            </button>
                            <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                                <span className="material-symbols-outlined">mail</span>
                            </button>
                            <div className="h-8 w-px bg-slate-200 dark:border-slate-700 mx-2" />
                            <div className="flex items-center gap-3 cursor-pointer group">
                                <div className="text-right">
                                    <p className="text-sm font-semibold leading-none">Studio Oak</p>
                                    <p className="text-xs text-slate-500">Premium Vendor</p>
                                </div>
                                <div className="size-9 rounded-full bg-slate-200 overflow-hidden border border-slate-200 dark:border-slate-700">
                                    <img
                                        className="w-full h-full object-cover"
                                        alt="Vendor profile avatar"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqW_NWoHvx_zHbsXMFOFrz9VvjF88JQD9tAJ1xYPc_-V7RpCcXpaTGXE0wHIVIeRExfrdfvUEkvRdCRUEIRZ8OTy1PymoLeeFqJ--AGqJzSEdLekAPw9WrCRvgB8nIn3ejK36-p6EYPFw-_DySHwmM0Mc2XNijRCR4qzl5PgqpXUP2CcoEcqBSwrkfwP5wtVRwYK_DMTGuINUP7qOpU5tl6OkQd-Q7ji5AN_CO_67THW2Ng0tdG05Ozf2kctmgxcBYtgeZAjSMfb1Q"
                                    />
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Dashboard Content */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-8">
                        {/* KPI Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                            {KPI_CARDS.map((kpi, index) => (
                                <div
                                    key={index}
                                    className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            <span className="material-symbols-outlined text-primary">{kpi.icon}</span>
                                        </div>
                                        <span
                                            className={`text-xs font-semibold ${kpi.badgeClass} px-2 py-1 rounded-full`}
                                        >
                                            {kpi.badge}
                                        </span>
                                    </div>
                                    <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                                        {kpi.label}
                                    </h3>
                                    {kpi.isRating ? (
                                        <div className="flex items-center gap-2 mt-1">
                                            <p className="text-2xl font-bold">{kpi.value}</p>
                                            <div className="flex text-amber-400">
                                                <span className="material-symbols-outlined text-sm">star</span>
                                            </div>
                                            <span className="text-xs text-slate-400">(240 reviews)</span>
                                        </div>
                                    ) : (
                                        <p className="text-2xl font-bold mt-1">{kpi.value}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Main Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Top Selling Models */}
                            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col">
                                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                                    <h2 className="font-bold text-lg">Top Selling Models</h2>
                                    <button className="text-sm text-primary font-semibold hover:underline">
                                        View All Products
                                    </button>
                                </div>
                                <div className="p-0 overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                                            <tr>
                                                <th className="px-6 py-4">Product Name</th>
                                                <th className="px-6 py-4 text-center">Sales</th>
                                                <th className="px-6 py-4">Performance</th>
                                                <th className="px-6 py-4 text-right">Revenue</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                            {TOP_PRODUCTS.map((product, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="size-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                                                                <img
                                                                    className="w-full h-full object-cover"
                                                                    alt={product.name}
                                                                    src={product.image}
                                                                />
                                                            </div>
                                                            <div>
                                                                <p className="font-semibold text-sm">{product.name}</p>
                                                                <p className="text-xs text-slate-500">SKU: {product.sku}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className="text-sm font-medium">{product.sales}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                                            <div
                                                                className="bg-primary h-full rounded-full"
                                                                style={{ width: product.performance }}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <span className="text-sm font-semibold">{product.revenue}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col">
                                <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                                    <h2 className="font-bold text-lg">Recent Activity</h2>
                                </div>
                                <div className="p-6 flex-1 space-y-6 overflow-y-auto">
                                    {ACTIVITIES.map((activity, index) => (
                                        <div key={index} className="flex gap-4 relative">
                                            {activity.showLine && (
                                                <div className="absolute left-[11px] top-6 bottom-[-24px] w-[2px] bg-slate-100 dark:bg-slate-800" />
                                            )}
                                            <div
                                                className={`size-6 rounded-full ${activity.iconBg} flex items-center justify-center flex-shrink-0 z-10`}
                                            >
                                                <span
                                                    className={`material-symbols-outlined text-[14px] ${activity.iconColor} font-bold`}
                                                >
                                                    {activity.icon}
                                                </span>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold">{activity.title}</p>
                                                <p className="text-xs text-slate-500 mt-0.5">{activity.desc}</p>
                                                <p className="text-[10px] text-slate-400 mt-2 font-medium uppercase tracking-tight">
                                                    {activity.time}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-b-xl">
                                    <button className="w-full text-center text-xs font-bold text-slate-500 hover:text-primary transition-colors">
                                        Load More Activity
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Sales Performance Chart */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="font-bold text-lg">Sales Performance</h2>
                                    <p className="text-sm text-slate-500">Year over year growth analysis</p>
                                </div>
                                <div className="flex gap-2">
                                    <select className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-xs font-semibold py-1.5 px-3 focus:ring-1 focus:ring-primary">
                                        <option>Last 30 Days</option>
                                        <option>Last 6 Months</option>
                                        <option>This Year</option>
                                    </select>
                                    <button className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600">
                                        <span className="material-symbols-outlined text-[20px]">file_download</span>
                                    </button>
                                </div>
                            </div>
                            <div className="h-64 w-full flex items-end justify-between gap-2 px-4">
                                {CHART_BARS.map((height, index) => (
                                    <div
                                        key={index}
                                        className="flex-1 bg-primary/20 rounded-t-lg hover:bg-primary transition-all cursor-pointer"
                                        style={{ height: `${height}%` }}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-between mt-4 px-4 text-[10px] font-bold text-slate-400 uppercase">
                                {MONTHS.map((month) => (
                                    <span key={month}>{month}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default VendorDashboard;
