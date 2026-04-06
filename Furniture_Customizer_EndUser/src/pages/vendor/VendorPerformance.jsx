import { Link } from 'react-router-dom';

/**
 * Vendor Product Performance Report Page
 *
 * Product analytics dashboard:
 * - Header: chair icon (bg-primary), "VendorPortal", nav (Reports active border-b-2),
 *   search, notifications + settings, avatar
 * - Page header: "Product Performance Report" (4xl font-black),
 *   "Last 30 Days" + "Export Report" buttons
 * - 4 KPI cards with progress bars:
 *   - Total Revenue $42,850 (+12.5%, primary 75%)
 *   - Units Sold 1,248 (+5.2%, emerald 50%)
 *   - Avg Profit Margin 34.2% (-1.2%, blue-400 33%)
 *   - Active SKUs 142 (Stable, indigo-400 90%)
 * - 2-col chart grid:
 *   - Category Performance: horizontal bars (Sofas $18,400 85%, Dining $12,100 60%,
 *     Office $7,800 40%, Beds $4,550 25%)
 *   - Inventory Optimization: 4x4 heatmap grid, Low/High legend,
 *     UNDERPERFORMERS (red) / SAFE BETS (green) labels
 * - Top Products table (5 cols): Product Info, Sales Volume (mini sparkline bars),
 *   Revenue Contribution (progress bar + %), Stock Health badge, Action
 *   3 rows: Velvet Sofa (Healthy), Oak Table (Low Stock), Office Chair (Critical)
 * - Pagination: 1-10 of 142, Prev/Next
 * - Footer: chair icon, © 2023, Help/API/Privacy links
 *
 * Route: /vendor-performance
 */

const KPI_CARDS = [
    {
        label: 'Total Revenue',
        value: '$42,850.00',
        change: '+12.5%',
        changeColor: 'text-green-500',
        barColor: 'bg-primary',
        barWidth: 'w-3/4',
    },
    {
        label: 'Units Sold',
        value: '1,248',
        change: '+5.2%',
        changeColor: 'text-green-500',
        barColor: 'bg-emerald-500',
        barWidth: 'w-1/2',
    },
    {
        label: 'Avg. Profit Margin',
        value: '34.2%',
        change: '-1.2%',
        changeColor: 'text-red-500',
        barColor: 'bg-blue-400',
        barWidth: 'w-1/3',
    },
    {
        label: 'Active SKUs',
        value: '142',
        change: 'Stable',
        changeColor: 'text-slate-400',
        barColor: 'bg-indigo-400',
        barWidth: 'w-[90%]',
    },
];

const CATEGORIES = [
    { name: 'Sofas & Loveseats', revenue: '$18,400', filled: 'w-[85%]', remaining: 'w-[15%]' },
    { name: 'Dining Sets', revenue: '$12,100', filled: 'w-[60%]', remaining: 'w-[40%]' },
    { name: 'Office Chairs', revenue: '$7,800', filled: 'w-[40%]', remaining: 'w-[60%]' },
    { name: 'Bed Frames', revenue: '$4,550', filled: 'w-[25%]', remaining: 'w-[75%]' },
];

const HEATMAP_CELLS = [
    'bg-blue-600/20', 'bg-primary/40', 'bg-primary/80', 'bg-primary',
    'bg-blue-600/10', 'bg-primary/30', 'bg-primary/60', 'bg-primary/90',
    'bg-slate-100 dark:bg-slate-700/30', 'bg-blue-600/10', 'bg-primary/20', 'bg-primary/40',
    'bg-slate-200 dark:bg-slate-700/50', 'bg-slate-100 dark:bg-slate-700/30', 'bg-blue-600/10', 'bg-blue-600/20',
];

const TOP_PRODUCTS = [
    {
        name: 'Velvet Modular Sofa',
        sku: 'SKU: FURN-00124',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOHKyeGFhrX69kyUkiJrJa2AlvDwtCJjjUan8kd9GyaKwy-CN_dSolvnq4rH8XMm2JkioLXN4LxzBA-7n5k35Lqqn_5kIQfcXjPTSg4ZZL6Bhba1WxSgxgFWmdOhWJzdkaSrRC1fVxQVtCQ1PuWv_bC4f7hLp7VcuUE7vy8LfaCZLti3oB6UA2ROT-485s8KpBZ2H18lx--M5arX-Za73KkG7O00MyyWJhSpgxNsjMU_ElmwaFTzsPxG9yj0-pjL84YolEM62bPVTk',
        units: '312 units',
        sparkline: ['h-1', 'h-2', 'h-1.5', 'h-3', 'h-4'],
        revenue: '$12,480',
        revenueBar: 'w-[85%]',
        revenuePercent: '24%',
        status: 'Healthy',
        statusColor: 'bg-emerald-100 text-emerald-700',
    },
    {
        name: 'Oak Dining Table',
        sku: 'SKU: FURN-00289',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAf3424KYSjVVwthvXAx58EMDetDJ1skQGRyYhFfA7aTzTdvfhTodsISyjfq6AIIj2uIUToIromsdxezgmHkJ0zbkrT_ShgbgJ45kQndPmOKqBla-yMD7kCtq_MKha_26xtd4sqhrMNMbZeFCjVBZU1hpmABd6Vq5ritWPV4V9GMSRncNosVABjb15iC0pdsnznd6WZRcVcJpHUS-R4wZPxvXVlvb0sHF6bBg5pXs0a9RyyOL4eLHS4wM_CHWUh9EGu0qb7IyVTNRGk',
        units: '158 units',
        sparkline: ['h-3', 'h-2.5', 'h-4', 'h-2', 'h-3.5'],
        revenue: '$9,150',
        revenueBar: 'w-[60%]',
        revenuePercent: '18%',
        status: 'Low Stock',
        statusColor: 'bg-amber-100 text-amber-700',
    },
    {
        name: 'Pro Office Chair',
        sku: 'SKU: FURN-00451',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYbLWvX0CBbVbWbzVfnWRAUOaIjetYoHMywl4hEuIjdmdBkmNXA9pN6hONGaj4iWHJtggC9qL6bSZXZns_mVY96NAHbmh2UIZELLUQd3d6MuDU2zugkjvonoiM08-CfdQYX6NIL2yJpGSPISwIGEmPJe_sAUOg8rqd9qX4xRtXfzyx2Zc_USlsb6DJS23prrrRiyKqK7T2jgaWH59YWKOzCo0_X0BSJJrql2VqnubVkxOPF4F6fOTPEhTXS23k_HYtyJSjjPxtiz6N',
        units: '204 units',
        sparkline: ['h-1.5', 'h-1.5', 'h-2', 'h-1.5', 'h-2'],
        revenue: '$6,120',
        revenueBar: 'w-[40%]',
        revenuePercent: '12%',
        status: 'Critical',
        statusColor: 'bg-red-100 text-red-700',
    },
];

const VendorPerformance = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
            <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    {/* Header */}
                    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-10 py-3 bg-white dark:bg-background-dark">
                        <div className="flex items-center gap-8">
                            <Link to="/" className="flex items-center gap-4 text-primary">
                                <div className="size-8 flex items-center justify-center bg-primary rounded-lg text-white">
                                    <span className="material-symbols-outlined">chair</span>
                                </div>
                                <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight">
                                    VendorPortal
                                </h2>
                            </Link>
                            <nav className="hidden md:flex items-center gap-9">
                                <a className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Dashboard</a>
                                <a className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Inventory</a>
                                <a className="text-primary text-sm font-bold leading-normal border-b-2 border-primary py-1" href="#">Reports</a>
                                <a className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Orders</a>
                            </nav>
                        </div>
                        <div className="flex flex-1 justify-end gap-6 items-center">
                            <label className="hidden lg:flex flex-col min-w-40 !h-10 max-w-64">
                                <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                                    <div className="text-slate-400 flex border-none bg-slate-100 dark:bg-slate-800 items-center justify-center pl-4 rounded-l-lg border-r-0">
                                        <span className="material-symbols-outlined text-xl">search</span>
                                    </div>
                                    <input
                                        className="form-input flex w-full min-w-0 flex-1 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-0 focus:ring-2 focus:ring-primary border-none bg-slate-100 dark:bg-slate-800 h-full placeholder:text-slate-400 px-4 rounded-l-none pl-2 text-base font-normal"
                                        placeholder="Search products..."
                                    />
                                </div>
                            </label>
                            <div className="flex gap-2">
                                <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200">
                                    <span className="material-symbols-outlined">notifications</span>
                                </button>
                                <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200">
                                    <span className="material-symbols-outlined">settings</span>
                                </button>
                            </div>
                            <div className="bg-primary/20 rounded-full size-10 border-2 border-primary flex items-center justify-center overflow-hidden">
                                <img
                                    className="w-full h-full object-cover"
                                    alt="Vendor profile avatar"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXpiYlOmVrMACsS0bFf1lC90KTN2_OwARmR3PN_5vCsI51eeNHWwXtgqQPhcWYZc6iSpgWR0eTDUb433shjxJbBJVNdgfurp3ExFY7p0EeWavrZQ-ngrQOQJ1xFdnBJXANQYjTXpMqAMEVMbvuh7cVWCaWJlEzrrcPPACNs5_fHM2OnhiumLnlF5tRgxly_NIFr3HoIJGrUc5L_0jQDKnwFXtabnkP4AR7--A1kLhgXEPclF0bfr8FuwIUqjH48T2LCXbT16X01qNt"
                                />
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 p-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto w-full">
                        {/* Page Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                            <div>
                                <h1 className="text-slate-900 dark:text-slate-100 text-4xl font-black leading-tight tracking-tight">
                                    Product Performance Report
                                </h1>
                                <p className="text-slate-500 dark:text-slate-400 text-base mt-1">
                                    Analyze sales velocity and inventory health across your catalog.
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm">
                                    <span className="material-symbols-outlined text-lg">calendar_month</span>
                                    Last 30 Days
                                </button>
                                <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all">
                                    <span className="material-symbols-outlined text-lg">download</span>
                                    Export Report
                                </button>
                            </div>
                        </div>

                        {/* KPI Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {KPI_CARDS.map((card) => (
                                <div
                                    key={card.label}
                                    className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700"
                                >
                                    <div className="flex justify-between items-start">
                                        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
                                            {card.label}
                                        </p>
                                        <span className={`${card.changeColor} text-xs font-bold flex items-center`}>
                                            {card.change}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-black mt-2">{card.value}</h3>
                                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-4 overflow-hidden">
                                        <div className={`${card.barColor} h-full ${card.barWidth}`} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Charts Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                            {/* Category Bar Chart */}
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                                <div className="flex justify-between items-center mb-6">
                                    <h4 className="font-bold text-lg">Category Performance</h4>
                                    <span className="material-symbols-outlined text-slate-400 cursor-help">info</span>
                                </div>
                                <div className="space-y-6">
                                    {CATEGORIES.map((cat) => (
                                        <div key={cat.name} className="space-y-2">
                                            <div className="flex justify-between text-sm font-medium">
                                                <span>{cat.name}</span>
                                                <span>{cat.revenue}</span>
                                            </div>
                                            <div className="w-full bg-slate-100 dark:bg-slate-700 h-8 rounded-lg overflow-hidden flex">
                                                <div className={`bg-primary h-full ${cat.filled} flex items-center px-3 text-[10px] text-white font-bold`}>
                                                    REVENUE
                                                </div>
                                                <div className={`bg-primary/30 h-full ${cat.remaining}`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Inventory Heatmap */}
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                                <div className="flex justify-between items-center mb-6">
                                    <h4 className="font-bold text-lg">Inventory optimization</h4>
                                    <div className="flex items-center gap-4 text-xs">
                                        <span className="flex items-center gap-1">
                                            <div className="w-3 h-3 rounded bg-blue-100" /> Low
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <div className="w-3 h-3 rounded bg-primary" /> High
                                        </span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 grid-rows-4 gap-2 h-64 relative">
                                    {/* Axis Labels */}
                                    <div className="absolute -left-6 top-1/2 -rotate-90 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        Sales Velocity
                                    </div>
                                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        Stock Level
                                    </div>
                                    {/* Heatmap Cells */}
                                    {HEATMAP_CELLS.map((cellClass, i) => (
                                        <div
                                            key={i}
                                            className={`${cellClass} rounded-lg border border-white/10 ${i === 0
                                                    ? 'flex items-center justify-center group relative cursor-pointer hover:scale-105 transition-transform'
                                                    : ''
                                                }`}
                                        >
                                            {i === 0 && (
                                                <div className="hidden group-hover:block absolute bg-slate-900 text-white text-[10px] p-2 rounded -top-10 z-10 whitespace-nowrap">
                                                    &quot;Winners&quot;: High Velocity / Low Stock
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 flex justify-between text-[10px] font-black text-slate-400">
                                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded">UNDERPERFORMERS</span>
                                    <span className="bg-emerald-100 text-emerald-600 px-2 py-1 rounded">SAFE BETS</span>
                                </div>
                            </div>
                        </div>

                        {/* Top Products Table */}
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
                                <h4 className="font-bold text-lg">Top Performing Products</h4>
                                <div className="flex gap-2">
                                    <button className="text-xs font-bold bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-lg text-primary">
                                        By Revenue
                                    </button>
                                    <button className="text-xs font-bold px-3 py-1.5 rounded-lg text-slate-500">
                                        By Units Sold
                                    </button>
                                    <button className="text-xs font-bold px-3 py-1.5 rounded-lg text-slate-500">
                                        By Margin
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Product Info</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Sales Volume</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Revenue Contribution</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Stock Health</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                        {TOP_PRODUCTS.map((product) => (
                                            <tr key={product.sku} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-700 overflow-hidden flex-shrink-0">
                                                            <img className="w-full h-full object-cover" alt={product.name} src={product.image} />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{product.name}</p>
                                                            <p className="text-xs text-slate-500">{product.sku}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-semibold">{product.units}</span>
                                                        <div className="flex gap-0.5 items-end h-4">
                                                            {product.sparkline.map((h, i) => (
                                                                <div key={i} className={`w-1 bg-primary ${h}`} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-sm font-bold">{product.revenue}</span>
                                                        <div className="flex-1 max-w-[100px] h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                            <div className={`bg-emerald-500 h-full ${product.revenueBar}`} />
                                                        </div>
                                                        <span className="text-[10px] font-bold text-slate-400">{product.revenuePercent}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${product.statusColor}`}>
                                                        {product.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                                                        <span className="material-symbols-outlined">more_vert</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                                <span className="text-sm text-slate-500">Showing 1-10 of 142 products</span>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1 rounded border border-slate-200 dark:border-slate-700 text-sm disabled:opacity-50">
                                        Prev
                                    </button>
                                    <button className="px-3 py-1 rounded bg-primary text-white text-sm">Next</button>
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* Footer */}
                    <footer className="mt-auto px-10 py-6 border-t border-slate-200 dark:border-slate-800 text-center md:text-left">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-2 text-slate-400">
                                <span className="material-symbols-outlined text-lg">chair</span>
                                <span className="text-xs font-medium">© 2023 Furniture Vendor Portal. All rights reserved.</span>
                            </div>
                            <div className="flex gap-6">
                                <a className="text-xs font-medium text-slate-400 hover:text-primary" href="#">Help Center</a>
                                <a className="text-xs font-medium text-slate-400 hover:text-primary" href="#">API Documentation</a>
                                <a className="text-xs font-medium text-slate-400 hover:text-primary" href="#">Privacy Policy</a>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default VendorPerformance;
