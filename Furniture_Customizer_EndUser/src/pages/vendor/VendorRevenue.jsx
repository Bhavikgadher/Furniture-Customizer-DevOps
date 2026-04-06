import { Link } from 'react-router-dom';

/**
 * Vendor Revenue Report Page
 *
 * Revenue analytics dashboard for Oct 1-31, 2023:
 * - Header: analytics icon (bg-primary/10), "Revenue Report",
 *   subtitle "Furniture Vendor Global Sales • Oct 1 - Oct 31, 2023",
 *   Date Range (calendar_today) + Export Report (download, primary shadow-sm) buttons
 * - 3 KPI cards:
 *   - Total Earnings $124,500 (+12.5% emerald trending_up)
 *   - Net Profit $42,300 (+5.2% emerald), Margin 34%
 *   - Avg Order Value $850 (-2.1% rose trending_down), Target $900
 * - Revenue Trends chart:
 *   - Daily/Weekly(active)/Monthly toggle
 *   - SVG with gradient area fill, primary trend line, data points
 *   - Week 1-5 x-axis labels
 *   - Tooltip: Oct 14 Revenue $24,200 Orders 32
 * - Order Breakdown table (5 cols):
 *   - Search + Filter controls
 *   - 5 rows: #ORD-9421 JS Delivered $1,240 / #ORD-9420 MK Processing $850 /
 *     #ORD-9419 EL Delivered $2,100 / #ORD-9418 TR Shipped $450 /
 *     #ORD-9417 AA Refunded $0
 *   - Pagination: 5 of 1,248, pages 1(active)/2/3
 * - Footer: © 2023 Furniture Vendor Dashboard
 *
 * Route: /vendor-revenue
 */

const KPI_CARDS = [
    {
        label: 'Total Earnings',
        value: '$124,500.00',
        change: '+12.5%',
        changeIcon: 'trending_up',
        changeColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10',
        note: 'vs. $110,660.00 last month',
    },
    {
        label: 'Net Profit',
        value: '$42,300.00',
        change: '+5.2%',
        changeIcon: 'trending_up',
        changeColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10',
        note: 'Margin: 34% of revenue',
    },
    {
        label: 'Avg. Order Value',
        value: '$850.00',
        change: '-2.1%',
        changeIcon: 'trending_down',
        changeColor: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10',
        note: 'Target: $900.00',
    },
];

const CHART_TABS = [
    { label: 'Daily', active: false },
    { label: 'Weekly', active: true },
    { label: 'Monthly', active: false },
];

const ORDERS = [
    {
        id: '#ORD-9421',
        initials: 'JS',
        customer: 'Julianne Smith',
        date: 'Oct 24, 2023',
        status: 'Delivered',
        statusColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
        revenue: '$1,240.00',
    },
    {
        id: '#ORD-9420',
        initials: 'MK',
        customer: 'Marcus King',
        date: 'Oct 24, 2023',
        status: 'Processing',
        statusColor: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
        revenue: '$850.00',
    },
    {
        id: '#ORD-9419',
        initials: 'EL',
        customer: 'Elena Lund',
        date: 'Oct 23, 2023',
        status: 'Delivered',
        statusColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
        revenue: '$2,100.00',
    },
    {
        id: '#ORD-9418',
        initials: 'TR',
        customer: 'Tom Riley',
        date: 'Oct 23, 2023',
        status: 'Shipped',
        statusColor: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
        revenue: '$450.00',
    },
    {
        id: '#ORD-9417',
        initials: 'AA',
        customer: 'Alice Adams',
        date: 'Oct 22, 2023',
        status: 'Refunded',
        statusColor: 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
        revenue: '$0.00',
    },
];

const WEEK_LABELS = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];

const VendorRevenue = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased font-display">
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    {/* Header */}
                    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-4 md:px-10">
                        <Link to="/" className="flex items-center gap-4 text-slate-900 dark:text-slate-100">
                            <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary">
                                <span className="material-symbols-outlined">analytics</span>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold leading-tight tracking-tight">Revenue Report</h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Furniture Vendor Global Sales • Oct 1 - Oct 31, 2023
                                </p>
                            </div>
                        </Link>
                        <div className="flex gap-3">
                            <button className="flex items-center justify-center rounded-lg h-10 px-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 gap-2 text-sm font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                                <span>Date Range</span>
                            </button>
                            <button className="flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white gap-2 text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20">
                                <span className="material-symbols-outlined text-[20px]">download</span>
                                <span>Export Report</span>
                            </button>
                        </div>
                    </header>

                    <main className="flex-1 max-w-[1200px] mx-auto w-full p-6 md:p-10 space-y-8">
                        {/* KPI Summary */}
                        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {KPI_CARDS.map((card) => (
                                <div
                                    key={card.label}
                                    className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
                                >
                                    <div className="flex justify-between items-start">
                                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                                            {card.label}
                                        </p>
                                        <span
                                            className={`flex items-center ${card.changeColor} text-xs font-bold px-2 py-1 rounded-full`}
                                        >
                                            <span className="material-symbols-outlined text-[14px] mr-1">
                                                {card.changeIcon}
                                            </span>
                                            {card.change}
                                        </span>
                                    </div>
                                    <p className="text-slate-900 dark:text-slate-100 tracking-tight text-3xl font-bold mt-1">
                                        {card.value}
                                    </p>
                                    <p className="text-slate-400 text-xs mt-1">{card.note}</p>
                                </div>
                            ))}
                        </section>

                        {/* Revenue Trends Chart */}
                        <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="flex flex-col md:flex-row md:items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 gap-4">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                                        Revenue Trends
                                    </h3>
                                    <p className="text-sm text-slate-500">
                                        Sales volume performance across the selected timeframe
                                    </p>
                                </div>
                                <div className="inline-flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                                    {CHART_TABS.map((tab) => (
                                        <button
                                            key={tab.label}
                                            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${tab.active
                                                    ? 'bg-white dark:bg-slate-700 text-primary dark:text-slate-100 shadow-sm'
                                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                                }`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="relative w-full h-72">
                                    {/* SVG Chart */}
                                    <svg
                                        className="w-full h-full"
                                        preserveAspectRatio="none"
                                        viewBox="0 0 1000 300"
                                    >
                                        <defs>
                                            <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                                <stop offset="0%" stopColor="#1152d4" stopOpacity="0.2" />
                                                <stop offset="100%" stopColor="#1152d4" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        {/* Grid Lines */}
                                        {[50, 125, 200, 275].map((y) => (
                                            <line
                                                key={y}
                                                className="text-slate-100 dark:text-slate-800"
                                                stroke="currentColor"
                                                strokeWidth="1"
                                                x1="0"
                                                x2="1000"
                                                y1={y}
                                                y2={y}
                                            />
                                        ))}
                                        {/* Area Fill */}
                                        <path
                                            d="M0,300 L0,180 C150,160 250,220 400,140 C550,60 650,110 800,40 C900,10 1000,60 1000,60 L1000,300 Z"
                                            fill="url(#chartGradient)"
                                        />
                                        {/* Trend Line */}
                                        <path
                                            d="M0,180 C150,160 250,220 400,140 C550,60 650,110 800,40 C900,10 1000,60 1000,60"
                                            fill="none"
                                            stroke="#1152d4"
                                            strokeLinecap="round"
                                            strokeWidth="4"
                                        />
                                        {/* Data Points */}
                                        <circle
                                            cx="400"
                                            cy="140"
                                            fill="#1152d4"
                                            r="6"
                                            stroke="white"
                                            strokeWidth="2"
                                        />
                                        <circle
                                            cx="800"
                                            cy="40"
                                            fill="#1152d4"
                                            r="6"
                                            stroke="white"
                                            strokeWidth="2"
                                        />
                                    </svg>
                                    {/* X-Axis Labels */}
                                    <div className="flex justify-between mt-4 px-2">
                                        {WEEK_LABELS.map((label) => (
                                            <span
                                                key={label}
                                                className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider"
                                            >
                                                {label}
                                            </span>
                                        ))}
                                    </div>
                                    {/* Tooltip */}
                                    <div className="absolute left-[360px] top-[40px] bg-slate-900 text-white p-3 rounded-lg text-xs shadow-xl hidden md:block">
                                        <div className="font-bold mb-1">Oct 14, 2023</div>
                                        <div className="flex justify-between gap-4">
                                            <span className="text-slate-400">Revenue:</span>
                                            <span className="font-semibold text-primary/100">$24,200</span>
                                        </div>
                                        <div className="flex justify-between gap-4">
                                            <span className="text-slate-400">Orders:</span>
                                            <span className="font-semibold">32</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Order Breakdown Table */}
                        <section className="space-y-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                                    Order Breakdown
                                </h2>
                                <div className="flex items-center gap-3">
                                    <div className="relative group">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                                            search
                                        </span>
                                        <input
                                            className="pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none w-full md:w-64 transition-all"
                                            placeholder="Search Order ID..."
                                            type="text"
                                        />
                                    </div>
                                    <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">filter_list</span>
                                        <span>Filter</span>
                                    </button>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                                Order ID
                                            </th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                                Customer
                                            </th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                                                Revenue
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {ORDERS.map((order) => (
                                            <tr
                                                key={order.id}
                                                className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                                            >
                                                <td className="px-6 py-4 text-sm font-semibold text-primary">
                                                    {order.id}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500">
                                                            {order.initials}
                                                        </div>
                                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                                            {order.customer}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                                                    {order.date}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${order.statusColor}`}
                                                    >
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-slate-100 text-right">
                                                    {order.revenue}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {/* Pagination */}
                                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
                                    <p className="text-xs font-medium text-slate-500">
                                        Showing 5 of 1,248 entries
                                    </p>
                                    <div className="flex gap-2">
                                        <button className="size-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-400 hover:bg-slate-50 transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                                        </button>
                                        <button className="size-8 flex items-center justify-center rounded border border-primary bg-primary text-white font-bold text-xs">
                                            1
                                        </button>
                                        <button className="size-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-colors font-bold text-xs">
                                            2
                                        </button>
                                        <button className="size-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-colors font-bold text-xs">
                                            3
                                        </button>
                                        <button className="size-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-400 hover:bg-slate-50 transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">
                                                chevron_right
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>

                    {/* Footer */}
                    <footer className="border-t border-slate-200 dark:border-slate-800 py-6 px-10 text-center">
                        <p className="text-xs text-slate-500">
                            © 2023 Furniture Vendor Dashboard • Secure Data Access
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default VendorRevenue;
