import { Link } from 'react-router-dom';

/**
 * Vendor Sales Analytics Page
 *
 * Full app shell with sidebar + analytics content:
 * - Sidebar (w-64, hidden lg:flex): chair logo, nav (Dashboard, Sales Analytics active,
 *   Inventory, Orders, Settings), user profile footer
 * - Header: "Sales Analytics" + "Live View" badge, date picker "Last 30 Days", Export Report CTA
 * - KPI Cards (4-col): Revenue $124,592 (+14.2%), Units 3,482 (+5.7%),
 *   Growth 22.4% (+2.1%), AOV $357.80 (-1.2%)
 * - Revenue Trends chart: SVG dual-line (current solid primary, previous dashed slate),
 *   Daily/Weekly/Monthly tabs, interactive data point tooltip, legend footer
 * - Sales by Category donut: SVG circle chart (Living Room 45%, Bedroom 30%, Office 25%)
 * - Top Performing Products table: 3 products with thumbnails, price, sold, revenue, trend badges
 *
 * Route: /vendor-analytics
 */

const NAV_ITEMS = [
    { icon: 'dashboard', label: 'Dashboard', active: false },
    { icon: 'analytics', label: 'Sales Analytics', active: true },
    { icon: 'inventory_2', label: 'Inventory', active: false },
    { icon: 'shopping_cart', label: 'Orders', active: false },
    { icon: 'settings', label: 'Settings', active: false },
];

const KPI_CARDS = [
    {
        label: 'Total Revenue',
        icon: 'payments',
        value: '$124,592.00',
        change: '+14.2%',
        changeColor: 'text-emerald-600 dark:text-emerald-400',
        changeIcon: 'trending_up',
        note: 'vs prev. month',
    },
    {
        label: 'Units Sold',
        icon: 'package_2',
        value: '3,482',
        change: '+5.7%',
        changeColor: 'text-emerald-600 dark:text-emerald-400',
        changeIcon: 'trending_up',
        note: 'vs prev. month',
    },
    {
        label: 'Monthly Growth',
        icon: 'show_chart',
        value: '22.4%',
        change: '+2.1%',
        changeColor: 'text-emerald-600 dark:text-emerald-400',
        changeIcon: 'trending_up',
        note: 'since Jan',
    },
    {
        label: 'Avg. Order Value',
        icon: 'shopping_basket',
        value: '$357.80',
        change: '-1.2%',
        changeColor: 'text-rose-600 dark:text-rose-400',
        changeIcon: 'trending_down',
        note: 'vs prev. month',
    },
];

const CATEGORY_DATA = [
    { label: 'Living Room', pct: '45%', color: 'bg-primary' },
    { label: 'Bedroom', pct: '30%', color: 'bg-blue-500' },
    { label: 'Office', pct: '25%', color: 'bg-blue-300' },
];

const TOP_PRODUCTS = [
    {
        name: 'Velvet Shell Sofa',
        category: 'Living Room',
        price: '$899.00',
        sold: '124',
        revenue: '$111,476',
        trend: '+12%',
        trendPositive: true,
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuC1D2OHWSPnY46ckk_4xL7NHs8LEQzFLhFkY90DcPz-Pg-LySRnMJIDFlMVxMlFak8iJrvcZYpKBOy2BHJD41pFeVAYRzYPDHXz2UuHJmbVRxahI3N64Mu6TQZTKlfsx3FxkVePReQu_0xuyid9gbxiGK7mIpToCLQezc9OigaBZjz7cyMeCdyToDDL826YYQhoo8wV-P7AYNU9mozTkU7oDDFW6Tfu_YEtGpD_Kd23J9ChDjlIVTqFi4rTkE4pBjoefoctw5BWEXgc',
    },
    {
        name: 'Oak Standing Desk',
        category: 'Office',
        price: '$549.00',
        sold: '98',
        revenue: '$53,802',
        trend: '+8%',
        trendPositive: true,
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAABU_DUrPoyQ21bVHbR1r0rC6rGoYni0MCqL5vQHCOK1it-m3EG_8K9aXo6_2GELLR_QBUxjTPc1HVOVbvhULGF1emkWPgqGsuCWcYc1sLWbO2wi6O-rZHT3cua5jVbvLzZt8or6kRN1z_oc9Mzo3wLOTJXFenmOJc2pOtd3Byz3iAYo9gLsTb3NRgbAhGzG2ipW9LnQwBYRIHvDvOkvff2NVFu0EABt944Qta6VzYPNjTrEa8DqcbVvAq8_IBcbe0H26JTB31dlVG',
    },
    {
        name: 'Luna Table Lamp',
        category: 'Lighting',
        price: '$129.00',
        sold: '186',
        revenue: '$23,994',
        trend: '-3%',
        trendPositive: false,
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCIsspBPx7cQBHIJ2ZtNNtkSgcYKiPNYq7md3rzx28NzoP4pp2BtDOslWU7BivrXMKd1Bdh4Err4y2pUugrkFKNSSJpzscfSYfhjtnwS5SAzC93BkNaxj_lsreu0gxWspbZmYtSvMdMG1Xlv6-gL586R2myi_RnG3s2mlVBGEn87PUUrHX8c8MX9Pwt7nfKKuKpQer4Juu68h7jFntnBNNuy61kbX1pC3ttXEyPklgv72tS2miPgtmxUPeGzSbnmsKOo6WiQ2Hn9NsR',
    },
];

const VendorAnalytics = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
            <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden">
                <div className="layout-container flex h-full grow">
                    {/* Sidebar Navigation */}
                    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col hidden lg:flex">
                        <div className="p-6 flex items-center gap-3">
                            <Link to="/" className="flex items-center gap-3">
                                <div className="size-8 bg-primary rounded flex items-center justify-center text-white">
                                    <span className="material-symbols-outlined">chair</span>
                                </div>
                                <h2 className="text-lg font-bold tracking-tight">FurniCustom</h2>
                            </Link>
                        </div>
                        <nav className="flex-1 px-4 space-y-2">
                            {NAV_ITEMS.map((item) => (
                                <div
                                    key={item.label}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${item.active
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                        }`}
                                >
                                    <span className="material-symbols-outlined">{item.icon}</span>
                                    <span className={`text-sm ${item.active ? 'font-semibold' : 'font-medium'}`}>
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </nav>
                        <div className="p-4 mt-auto border-t border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <div
                                    className="size-10 rounded-full bg-slate-200 bg-cover bg-center"
                                    style={{
                                        backgroundImage:
                                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAgSUxzBZmAld2uPwfrjP0H6pSdGA19mcueiMnxqobW2Rz7ypAZ2wEU1dD3olYic8KDb9epBYWLH9p-aQhXjDbGW_zq1Fqzp_Yq4_SiXRAyHtr9Zdxu3mwF55Pw32WqbCzSWukpvqHgsREa7nQBRCOe1_KrCLZ5tEQeswFBl17CHCxz0IpfU3D3BXn9KEF7dyG1EFW-yc9xQh-Q8P01q2JXcq0OGRIjG5Wt81UIEHbvLYdtBv2bgkSIhZPfyeUP1I3wX2_I1DvMJBye')",
                                    }}
                                />
                                <div className="overflow-hidden">
                                    <p className="text-sm font-bold truncate">Alex Rivest</p>
                                    <p className="text-xs text-slate-500 truncate">Store Manager</p>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                        {/* Top Header */}
                        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-10">
                            <div className="flex items-center gap-4">
                                <h1 className="text-xl font-bold">Sales Analytics</h1>
                                <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-500">
                                    Live View
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="relative group">
                                    <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                        <span className="material-symbols-outlined text-base">calendar_today</span>
                                        <span>Last 30 Days</span>
                                        <span className="material-symbols-outlined text-base">expand_more</span>
                                    </button>
                                </div>
                                <button className="flex items-center gap-2 px-4 py-1.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
                                    <span className="material-symbols-outlined text-base">file_download</span>
                                    <span>Export Report</span>
                                </button>
                            </div>
                        </header>

                        <div className="p-8 space-y-8">
                            {/* Metric Cards Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {KPI_CARDS.map((kpi, index) => (
                                    <div
                                        key={index}
                                        className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">
                                                {kpi.label}
                                            </p>
                                            <span className="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-lg">
                                                {kpi.icon}
                                            </span>
                                        </div>
                                        <h3 className="text-3xl font-black">{kpi.value}</h3>
                                        <div
                                            className={`mt-2 flex items-center gap-1 ${kpi.changeColor} text-sm font-bold`}
                                        >
                                            <span className="material-symbols-outlined text-sm">{kpi.changeIcon}</span>
                                            <span>{kpi.change}</span>
                                            <span className="text-slate-400 font-normal ml-1">{kpi.note}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Main Chart Row */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-lg font-bold">Revenue Trends</h3>
                                        <p className="text-sm text-slate-500">
                                            Comparing current performance against previous period
                                        </p>
                                    </div>
                                    <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                                        <button className="px-4 py-1.5 text-xs font-bold rounded-md bg-white dark:bg-slate-700 shadow-sm">
                                            Daily
                                        </button>
                                        <button className="px-4 py-1.5 text-xs font-bold rounded-md text-slate-500 hover:text-slate-900 dark:hover:text-slate-200">
                                            Weekly
                                        </button>
                                        <button className="px-4 py-1.5 text-xs font-bold rounded-md text-slate-500 hover:text-slate-900 dark:hover:text-slate-200">
                                            Monthly
                                        </button>
                                    </div>
                                </div>
                                <div className="p-8 h-96 relative">
                                    {/* Simulated Chart Area */}
                                    <div className="absolute inset-0 flex items-end justify-between px-12 pb-16 pt-8">
                                        {/* Background Grid Lines */}
                                        <div className="absolute inset-x-8 top-8 bottom-16 flex flex-col justify-between pointer-events-none">
                                            <div className="w-full border-t border-slate-100 dark:border-slate-800/50" />
                                            <div className="w-full border-t border-slate-100 dark:border-slate-800/50" />
                                            <div className="w-full border-t border-slate-100 dark:border-slate-800/50" />
                                            <div className="w-full border-t border-slate-100 dark:border-slate-800/50" />
                                            <div className="w-full border-t border-slate-100 dark:border-slate-800/50" />
                                        </div>
                                        {/* Line Chart SVG */}
                                        <svg
                                            className="absolute inset-x-8 top-8 bottom-16 w-[calc(100%-64px)] h-[calc(100%-96px)]"
                                            preserveAspectRatio="none"
                                        >
                                            <path
                                                d="M0,80 Q50,120 100,60 T200,40 T300,100 T400,30 T500,70 T600,10 T700,50 T800,20 T900,60"
                                                fill="none"
                                                stroke="#1152d4"
                                                strokeLinecap="round"
                                                strokeWidth="3"
                                            />
                                            <path
                                                d="M0,100 Q50,140 100,110 T200,90 T300,120 T400,80 T500,130 T600,90 T700,110 T800,100 T900,120"
                                                fill="none"
                                                stroke="#94a3b8"
                                                strokeDasharray="4"
                                                strokeLinecap="round"
                                                strokeWidth="2"
                                            />
                                        </svg>
                                        {/* Interactive Data Point */}
                                        <div className="absolute left-1/2 top-20 -translate-x-1/2 group">
                                            <div className="w-3 h-3 bg-primary border-2 border-white rounded-full cursor-pointer shadow-lg" />
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-32 bg-slate-900 text-white text-xs rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                <p className="font-medium text-slate-400 mb-1">Oct 14, 2023</p>
                                                <p className="font-bold text-sm">$4,284.50</p>
                                                <div className="mt-1 flex items-center text-emerald-400 gap-1">
                                                    <span className="material-symbols-outlined text-[10px]">trending_up</span>
                                                    <span>12% over avg</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* X-Axis Labels */}
                                        <div className="absolute inset-x-8 bottom-0 flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter pt-4">
                                            <span>Oct 01</span>
                                            <span>Oct 05</span>
                                            <span>Oct 10</span>
                                            <span>Oct 15</span>
                                            <span>Oct 20</span>
                                            <span>Oct 25</span>
                                            <span>Oct 30</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-8 py-4 bg-slate-50 dark:bg-slate-800/50 flex gap-6 border-t border-slate-200 dark:border-slate-800">
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-primary" />
                                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                                            Current Period
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full border border-slate-400 border-dashed bg-transparent" />
                                        <span className="text-xs font-semibold text-slate-500">Previous Period</span>
                                    </div>
                                </div>
                            </div>

                            {/* Secondary Row */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Donut Chart Card */}
                                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm col-span-1">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="font-bold">Sales by Category</h3>
                                        <button className="material-symbols-outlined text-slate-400 hover:text-slate-600">
                                            more_horiz
                                        </button>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="relative w-48 h-48 mb-6">
                                            <svg
                                                className="w-full h-full transform -rotate-90"
                                                viewBox="0 0 100 100"
                                            >
                                                <circle
                                                    className="text-slate-100 dark:text-slate-800"
                                                    cx="50"
                                                    cy="50"
                                                    fill="transparent"
                                                    r="40"
                                                    stroke="currentColor"
                                                    strokeWidth="12"
                                                />
                                                {/* Living Room 45% */}
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    fill="transparent"
                                                    r="40"
                                                    stroke="#1152d4"
                                                    strokeDasharray="113.1 251.3"
                                                    strokeDashoffset="0"
                                                    strokeWidth="12"
                                                />
                                                {/* Bedroom 30% */}
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    fill="transparent"
                                                    r="40"
                                                    stroke="#3b82f6"
                                                    strokeDasharray="75.4 251.3"
                                                    strokeDashoffset="-113.1"
                                                    strokeWidth="12"
                                                />
                                                {/* Office 25% */}
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    fill="transparent"
                                                    r="40"
                                                    stroke="#93c5fd"
                                                    strokeDasharray="62.8 251.3"
                                                    strokeDashoffset="-188.5"
                                                    strokeWidth="12"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-2xl font-black">100%</span>
                                                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                                                    Total Sales
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-full space-y-3">
                                            {CATEGORY_DATA.map((cat) => (
                                                <div
                                                    key={cat.label}
                                                    className="flex items-center justify-between text-sm"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <span className={`size-2 rounded-full ${cat.color}`} />
                                                        <span className="font-medium">{cat.label}</span>
                                                    </div>
                                                    <span className="font-bold">{cat.pct}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Data Table Card */}
                                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm col-span-2">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="font-bold">Top Performing Products</h3>
                                        <a className="text-primary text-sm font-bold hover:underline" href="#">
                                            View All
                                        </a>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="text-left text-xs text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                                                    <th className="pb-4 font-semibold">Product</th>
                                                    <th className="pb-4 font-semibold">Price</th>
                                                    <th className="pb-4 font-semibold">Sold</th>
                                                    <th className="pb-4 font-semibold">Revenue</th>
                                                    <th className="pb-4 font-semibold text-right">Trend</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                                                {TOP_PRODUCTS.map((product, index) => (
                                                    <tr key={index}>
                                                        <td className="py-4">
                                                            <div className="flex items-center gap-3">
                                                                <div
                                                                    className="size-10 bg-slate-100 rounded bg-cover"
                                                                    style={{
                                                                        backgroundImage: `url('${product.image}')`,
                                                                    }}
                                                                />
                                                                <div>
                                                                    <p className="text-sm font-bold">{product.name}</p>
                                                                    <p className="text-[10px] text-slate-500">
                                                                        Category: {product.category}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 text-sm">{product.price}</td>
                                                        <td className="py-4 text-sm font-medium">{product.sold}</td>
                                                        <td className="py-4 text-sm font-bold">{product.revenue}</td>
                                                        <td className="py-4 text-right">
                                                            <span
                                                                className={`px-2 py-1 rounded text-[10px] font-bold ${product.trendPositive
                                                                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                                                                        : 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400'
                                                                    }`}
                                                            >
                                                                {product.trend}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default VendorAnalytics;
