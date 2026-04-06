import { Link } from 'react-router-dom';

/**
 * Vendor Sales Dashboard Page
 *
 * Sales performance analytics with sidebar layout:
 * - Header (sticky z-50): analytics icon (bg-primary), "FurnitureCo" / "Sales Analytics Portal",
 *   Export + Share Report buttons, avatar (border-2 border-primary/20)
 * - Sidebar (w-64): "Main Menu" label, Dashboard (active bg-primary/10), Inventory,
 *   Orders, Customers, Settings, Target Reach 82% progress bar
 * - Title: "Sales Performance" (3xl font-black), Monthly(active)/Yearly toggle
 * - 4 KPI cards:
 *   - YTD Revenue $1.24M +12% (mini bar chart), payments icon
 *   - YoY Growth +14.5% +2.4%, query_stats icon
 *   - Peak Season Q4 Holiday, product avatars, calendar_month icon
 *   - Avg Order Value $850 +5%, shopping_basket icon
 * - Revenue Comparison chart: SVG with dashed previous year line, gradient current year area,
 *   4 data points, tooltip (September $214,500 vs $185,200, +15.8%), JAN-DEC x-axis
 * - Bottom grid (1/3 + 2/3):
 *   - Seasonal Insights: 3 cards (Outdoor Patio border-l-4 primary, Home Office emerald,
 *     Dining Sets amber)
 *   - Growth by Category table: Living Room +18.2% High Growth, Dining +11.5% Stable,
 *     Bedroom +9.4% Stable, Home Office +2.1% Slowing
 *
 * Route: /vendor-sales
 */

const KPI_CARDS = [
    {
        label: 'YTD Revenue',
        icon: 'payments',
        value: '$1.24M',
        change: '12%',
        changeIcon: 'trending_up',
        hasChart: true,
    },
    {
        label: 'YoY Growth',
        icon: 'query_stats',
        value: '+14.5%',
        change: '2.4%',
        changeIcon: 'add',
        note: 'Growth outperformed industry average by 3.2% in Q3.',
    },
    {
        label: 'Peak Season',
        icon: 'calendar_month',
        value: 'Q4 Holiday',
        hasAvatars: true,
    },
    {
        label: 'Avg. Order Value',
        icon: 'shopping_basket',
        value: '$850',
        change: '5%',
        changeIcon: 'trending_up',
        note: 'Premium Sofa line driving significant basket increases.',
    },
];

const SIDEBAR_LINKS = [
    { icon: 'dashboard', label: 'Dashboard', active: true },
    { icon: 'inventory_2', label: 'Inventory', active: false },
    { icon: 'shopping_cart', label: 'Orders', active: false },
    { icon: 'group', label: 'Customers', active: false },
];

const INSIGHTS = [
    {
        title: 'Outdoor Patio Peak',
        desc: 'Expected spike in April-May. Recommend increasing stock by 20% compared to 2023.',
        borderColor: 'border-primary',
    },
    {
        title: 'Home Office Stability',
        desc: 'Consistency across all quarters. Q3 Back-to-School season showed 8% growth.',
        borderColor: 'border-emerald-500',
    },
    {
        title: 'Dining Sets Surge',
        desc: 'Holiday preparation peaks in late October. Current orders up 15% YoY.',
        borderColor: 'border-amber-500',
    },
];

const CATEGORIES = [
    {
        icon: 'chair',
        iconBg: 'bg-blue-100 text-blue-600',
        name: 'Living Room',
        revenue: '$452,000',
        growth: '+18.2%',
        growthColor: 'text-emerald-500',
        status: 'High Growth',
        statusColor: 'bg-emerald-100 text-emerald-700',
    },
    {
        icon: 'table_restaurant',
        iconBg: 'bg-amber-100 text-amber-600',
        name: 'Dining Room',
        revenue: '$312,500',
        growth: '+11.5%',
        growthColor: 'text-emerald-500',
        status: 'Stable',
        statusColor: 'bg-blue-100 text-blue-700',
    },
    {
        icon: 'bed',
        iconBg: 'bg-purple-100 text-purple-600',
        name: 'Bedroom',
        revenue: '$285,100',
        growth: '+9.4%',
        growthColor: 'text-emerald-500',
        status: 'Stable',
        statusColor: 'bg-blue-100 text-blue-700',
    },
    {
        icon: 'desk',
        iconBg: 'bg-slate-100 text-slate-600',
        name: 'Home Office',
        revenue: '$192,400',
        growth: '+2.1%',
        growthColor: 'text-slate-400',
        status: 'Slowing',
        statusColor: 'bg-slate-100 text-slate-600',
    },
];

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const Y_LABELS = ['$250k', '$200k', '$150k', '$100k', '$50k', '$0'];

const VendorSales = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased font-display">
            <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    {/* Header */}
                    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark px-6 md:px-10 py-3 sticky top-0 z-50">
                        <Link to="/" className="flex items-center gap-4 text-slate-900 dark:text-slate-100">
                            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                                <span className="material-symbols-outlined text-xl">analytics</span>
                            </div>
                            <div>
                                <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight">
                                    FurnitureCo
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">
                                    Sales Analytics Portal
                                </p>
                            </div>
                        </Link>
                        <div className="flex flex-1 justify-end gap-4 items-center">
                            <div className="hidden md:flex gap-2">
                                <button className="flex cursor-pointer items-center justify-center rounded-lg h-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 gap-2 text-sm font-bold px-4 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">download</span>
                                    Export
                                </button>
                                <button className="flex cursor-pointer items-center justify-center rounded-lg h-10 bg-primary text-white gap-2 text-sm font-bold px-4 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                                    <span className="material-symbols-outlined text-[20px]">share</span>
                                    Share Report
                                </button>
                            </div>
                            <div className="h-10 w-px bg-slate-200 dark:bg-slate-800 mx-2" />
                            <div className="bg-slate-200 dark:bg-slate-800 rounded-full size-10 flex items-center justify-center overflow-hidden border-2 border-primary/20">
                                <img
                                    className="w-full h-full object-cover"
                                    alt="Sales manager profile"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4d8nLwfLUaDK-qLAj38tZiKv6twR9gqxilmRuwvg2wwaDns3p5OI5vaMwwwhWgHmJ80FE1cxWFC0O9rWf0vN8LdZPq68jzRxhB55X3b5btqjZ-FkOKLJjd_1VCriMoWtryDGN11QQWLN7nrt1Dkc2KRSFztu7Va67Jue0d6rei_6xijyzHzOpanpv5iTskLLLCKlGuTH-Dn4N63B0IhPuHzhf9N_28oLv3hkUChc3c3c5TMppZSdgn46BCod0X5w0vCWE2moICYdv"
                                />
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 flex flex-col md:flex-row">
                        {/* Sidebar */}
                        <aside className="w-full md:w-64 bg-white dark:bg-background-dark border-r border-slate-200 dark:border-slate-800 p-4 flex flex-col gap-2">
                            <div className="mb-4 px-2 py-3">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Main Menu
                                </p>
                            </div>
                            <nav className="flex flex-col gap-1">
                                {SIDEBAR_LINKS.map((link) => (
                                    <a
                                        key={link.label}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${link.active
                                                ? 'bg-primary/10 text-primary'
                                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                            }`}
                                        href="#"
                                    >
                                        <span className="material-symbols-outlined">{link.icon}</span>
                                        <span className={`text-sm ${link.active ? 'font-semibold' : 'font-medium'}`}>
                                            {link.label}
                                        </span>
                                    </a>
                                ))}
                                <div className="h-px bg-slate-200 dark:bg-slate-800 my-4" />
                                <a
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                                    href="#"
                                >
                                    <span className="material-symbols-outlined">settings</span>
                                    <span className="text-sm font-medium">Settings</span>
                                </a>
                            </nav>
                            <div className="mt-auto p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-xs font-bold text-slate-500">Target Reach</p>
                                    <span className="text-xs font-bold text-primary">82%</span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-primary h-full w-[82%]" />
                                </div>
                            </div>
                        </aside>

                        {/* Dashboard Content */}
                        <section className="flex-1 p-6 md:p-8 lg:p-10 bg-slate-50 dark:bg-background-dark/50">
                            {/* Title */}
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                                <div className="flex flex-col gap-1">
                                    <h1 className="text-slate-900 dark:text-slate-100 text-3xl font-black leading-tight tracking-tight">
                                        Sales Performance
                                    </h1>
                                    <p className="text-slate-500 dark:text-slate-400 text-base font-medium">
                                        Long-term growth and seasonal trends analysis for 2024
                                    </p>
                                </div>
                                <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-1 shadow-sm">
                                    <button className="px-6 py-2 rounded-md bg-primary text-white text-sm font-bold transition-all shadow-md shadow-primary/20">
                                        Monthly
                                    </button>
                                    <button className="px-6 py-2 rounded-md text-slate-500 dark:text-slate-400 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                                        Yearly
                                    </button>
                                </div>
                            </div>

                            {/* KPI Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                {/* YTD Revenue */}
                                <div className="flex flex-col gap-3 rounded-xl bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                                            YTD Revenue
                                        </p>
                                        <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-lg text-lg">
                                            payments
                                        </span>
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <p className="text-slate-900 dark:text-slate-100 text-2xl font-black leading-tight">
                                            $1.24M
                                        </p>
                                        <p className="text-emerald-500 text-sm font-bold pb-0.5 flex items-center">
                                            <span className="material-symbols-outlined text-sm">trending_up</span> 12%
                                        </p>
                                    </div>
                                    <div className="w-full bg-slate-50 dark:bg-slate-800 rounded h-10 overflow-hidden flex items-end gap-1 px-1">
                                        <div className="w-full bg-primary/30 h-[40%] rounded-t-sm" />
                                        <div className="w-full bg-primary/30 h-[60%] rounded-t-sm" />
                                        <div className="w-full bg-primary/30 h-[50%] rounded-t-sm" />
                                        <div className="w-full bg-primary/30 h-[80%] rounded-t-sm" />
                                        <div className="w-full bg-primary h-[90%] rounded-t-sm" />
                                    </div>
                                </div>

                                {/* YoY Growth */}
                                <div className="flex flex-col gap-3 rounded-xl bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                                            YoY Growth
                                        </p>
                                        <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-lg text-lg">
                                            query_stats
                                        </span>
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <p className="text-slate-900 dark:text-slate-100 text-2xl font-black leading-tight">
                                            +14.5%
                                        </p>
                                        <p className="text-emerald-500 text-sm font-bold pb-0.5 flex items-center">
                                            <span className="material-symbols-outlined text-sm">add</span> 2.4%
                                        </p>
                                    </div>
                                    <p className="text-slate-400 text-[11px] font-medium leading-tight">
                                        Growth outperformed industry average by 3.2% in Q3.
                                    </p>
                                </div>

                                {/* Peak Season */}
                                <div className="flex flex-col gap-3 rounded-xl bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                                            Peak Season
                                        </p>
                                        <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-lg text-lg">
                                            calendar_month
                                        </span>
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <p className="text-slate-900 dark:text-slate-100 text-2xl font-black leading-tight">
                                            Q4 Holiday
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="flex -space-x-2">
                                            <div className="size-6 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 flex items-center justify-center overflow-hidden">
                                                <img
                                                    className="w-full h-full object-cover"
                                                    alt="Office chair"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIqPXvjy12j0kTsny3yRuTG2cqejhlTNMWgHrkYyADe-FRGLw-9WY5-zceEgsTY584_k0rtCah18l59L75bR5bE5bKbsZ_2AC9meuaIk0_y2CQfBmflp341aSgHCwYwvp6b0PqK_QX7OQpWTWn7fdpFUFCKYItlT91QuZkW9ooMm3HcpmC9ARCHFrghlJEipGry40ucK-eNhFON4L0h2raFDl6CTVQN4PEq1x28AiQ7CEH_bsKBp0Kb477iPEOoK7ZydoL-P9KFgPl"
                                                />
                                            </div>
                                            <div className="size-6 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 flex items-center justify-center overflow-hidden">
                                                <img
                                                    className="w-full h-full object-cover"
                                                    alt="Dining set"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgI1X5dA2KaKxGXH8uppQYZOCmZovN96nSgltS-W3c6rQ5AxXsXJWCeicEj__hex3l4G1Ial51MZtYwZOez7YRDoQ7p_EDIj2OFKqmTa9jBIk_7Xnz9O7hcMvvnoUVjbl54swNyLf1CWZuCw_pt1oQzHU1-_5KPcypMH57V_XGydVi7tY_uHcQFYLIPMOZX8OoWkN537kkcexsRJ0y0u-k8iR4NPdr6W6g0-l-YyDOXh_4wD7YQVZFV3buR_jbxooR9YvdGAU3BDOv"
                                                />
                                            </div>
                                        </div>
                                        <p className="text-slate-400 text-[11px] font-medium">
                                            Top categories: Home Office, Dining
                                        </p>
                                    </div>
                                </div>

                                {/* Avg Order Value */}
                                <div className="flex flex-col gap-3 rounded-xl bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                                            Avg. Order Value
                                        </p>
                                        <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-lg text-lg">
                                            shopping_basket
                                        </span>
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <p className="text-slate-900 dark:text-slate-100 text-2xl font-black leading-tight">
                                            $850
                                        </p>
                                        <p className="text-emerald-500 text-sm font-bold pb-0.5 flex items-center">
                                            <span className="material-symbols-outlined text-sm">trending_up</span> 5%
                                        </p>
                                    </div>
                                    <p className="text-slate-400 text-[11px] font-medium leading-tight">
                                        Premium Sofa line driving significant basket increases.
                                    </p>
                                </div>
                            </div>

                            {/* Revenue Comparison Chart */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 mb-8">
                                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                                            Revenue Comparison
                                        </h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            Comparing 2024 Current Year vs. 2023 Previous Year
                                        </p>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex items-center gap-2">
                                            <span className="size-3 rounded-full bg-primary" />
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                                                Current Year (2024)
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="size-3 rounded-full border border-slate-400 border-dashed" />
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                                                Previous Year (2023)
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/* Chart */}
                                <div className="relative h-[400px] w-full mt-10">
                                    {/* Y-Axis */}
                                    <div className="absolute left-0 h-full flex flex-col justify-between text-[10px] font-bold text-slate-400 -ml-8">
                                        {Y_LABELS.map((l) => (
                                            <span key={l}>{l}</span>
                                        ))}
                                    </div>
                                    {/* Grid */}
                                    <div className="w-full h-full flex flex-col justify-between py-1">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <div
                                                key={i}
                                                className="w-full border-t border-slate-100 dark:border-slate-800"
                                            />
                                        ))}
                                        <div className="w-full border-t border-slate-200 dark:border-slate-700" />
                                    </div>
                                    {/* SVG */}
                                    <div className="absolute inset-0 flex items-end">
                                        {/* Previous Year Dashed */}
                                        <svg
                                            className="absolute bottom-0 w-full h-full overflow-visible"
                                            preserveAspectRatio="none"
                                            viewBox="0 0 100 100"
                                        >
                                            <path
                                                d="M0,80 Q10,75 20,85 T40,60 T60,70 T80,40 T100,30"
                                                fill="none"
                                                stroke="#94a3b8"
                                                strokeDasharray="4,4"
                                                strokeWidth="2"
                                            />
                                        </svg>
                                        {/* Current Year Area */}
                                        <svg
                                            className="absolute bottom-0 w-full h-full overflow-visible"
                                            preserveAspectRatio="none"
                                            viewBox="0 0 100 100"
                                        >
                                            <defs>
                                                <linearGradient id="currentGradient" x1="0" x2="0" y1="0" y2="1">
                                                    <stop offset="0%" stopColor="#1152d4" stopOpacity="0.2" />
                                                    <stop offset="100%" stopColor="#1152d4" stopOpacity="0" />
                                                </linearGradient>
                                            </defs>
                                            <path
                                                d="M0,75 Q10,65 20,70 T40,45 T60,50 T80,25 T100,15 L100,100 L0,100 Z"
                                                fill="url(#currentGradient)"
                                            />
                                            <path
                                                d="M0,75 Q10,65 20,70 T40,45 T60,50 T80,25 T100,15"
                                                fill="none"
                                                stroke="#1152d4"
                                                strokeWidth="3"
                                            />
                                            <circle cx="20" cy="70" fill="#1152d4" r="4" stroke="white" strokeWidth="2" />
                                            <circle cx="40" cy="45" fill="#1152d4" r="4" stroke="white" strokeWidth="2" />
                                            <circle cx="60" cy="50" fill="#1152d4" r="4" stroke="white" strokeWidth="2" />
                                            <circle cx="80" cy="25" fill="#1152d4" r="4" stroke="white" strokeWidth="2" />
                                        </svg>
                                        {/* Tooltip */}
                                        <div className="absolute left-[80%] bottom-[75%] bg-slate-900 text-white rounded-lg p-3 text-xs shadow-xl flex flex-col gap-1 transform -translate-x-1/2 -translate-y-full mb-4">
                                            <div className="font-bold border-b border-slate-700 pb-1 mb-1">
                                                September Performance
                                            </div>
                                            <div className="flex justify-between gap-4">
                                                <span>2024:</span>{' '}
                                                <span className="font-bold">$214,500</span>
                                            </div>
                                            <div className="flex justify-between gap-4">
                                                <span>2023:</span>{' '}
                                                <span className="text-slate-400">$185,200</span>
                                            </div>
                                            <div className="text-emerald-400 font-bold mt-1">+15.8% Growth</div>
                                        </div>
                                    </div>
                                    {/* X-Axis */}
                                    <div className="absolute bottom-0 w-full flex justify-between text-[10px] font-bold text-slate-400 pt-4 transform translate-y-full">
                                        {MONTHS.map((m) => (
                                            <span key={m}>{m}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Seasonal Insights */}
                                <div className="lg:col-span-1 flex flex-col gap-6">
                                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-amber-500">lightbulb</span>
                                            Seasonal Insights
                                        </h3>
                                        <div className="space-y-4">
                                            {INSIGHTS.map((insight) => (
                                                <div
                                                    key={insight.title}
                                                    className={`p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border-l-4 ${insight.borderColor}`}
                                                >
                                                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                                                        {insight.title}
                                                    </p>
                                                    <p className="text-[11px] text-slate-500 mt-1">{insight.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Growth by Category */}
                                <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                                    <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                                            Growth by Category
                                        </h3>
                                        <button className="text-xs font-bold text-primary hover:underline">
                                            View All Category Details
                                        </button>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="bg-slate-50 dark:bg-slate-800/50">
                                                    <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">
                                                        Category
                                                    </th>
                                                    <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">
                                                        2024 Revenue
                                                    </th>
                                                    <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">
                                                        Growth
                                                    </th>
                                                    <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">
                                                        Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                                {CATEGORIES.map((cat) => (
                                                    <tr
                                                        key={cat.name}
                                                        className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                                                    >
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <div
                                                                    className={`size-8 rounded ${cat.iconBg} flex items-center justify-center`}
                                                                >
                                                                    <span className="material-symbols-outlined text-lg">
                                                                        {cat.icon}
                                                                    </span>
                                                                </div>
                                                                <span className="text-sm font-bold">{cat.name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-sm font-medium">{cat.revenue}</td>
                                                        <td className={`px-6 py-4 text-sm font-bold ${cat.growthColor}`}>
                                                            {cat.growth}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span
                                                                className={`px-2 py-1 ${cat.statusColor} text-[10px] font-black rounded-full uppercase`}
                                                            >
                                                                {cat.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default VendorSales;
