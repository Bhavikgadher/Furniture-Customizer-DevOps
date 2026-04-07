import { Link } from 'react-router-dom';

/**
 * Vendor Stock Manager Page
 *
 * Stock management with inventory table + activity sidebar:
 * - Header (sticky z-50): inventory_2 icon (text-3xl), "VendorPortal",
 *   nav (Stock Manager active border-b-2 font-semibold), search bar (w-64),
 *   notifications (red dot), "Modern Living Co." / "Authorized Vendor", avatar
 * - Title: "Stock Management" (2xl font-bold), Export CSV + New Product buttons
 * - 4 KPI cards:
 *   - Total SKU Count 1,240 (+2.4% emerald)
 *   - Low Stock Alerts 12 (border-l-4 red-500, warning icon)
 *   - Movements (Today) +45 units (sync_alt icon)
 *   - Inventory Value $242.8k (payments amber icon)
 * - Main grid (9+3):
 *   - Filters: Finished Products(active)/Core Components tabs, category + status selects
 *   - Table (6 cols): checkbox, Product/SKU (with image), Current Stock (progress bar),
 *     Quick Adjust (+/- buttons), Status badge (dot), Log Transaction
 *     4 rows: Dining Table 85 In Stock, Nordic Bar Stool 12 Low Stock (red bg),
 *     Velvet Chair 48 In Stock, Walnut Credenza 0 Out of Stock (opacity-70 grayscale)
 *   - Bulk actions footer: 2 selected, Mark as Restocked, Adjust Reorder Point, pagination
 *   - Sidebar: Recent Activity timeline (4 items), Quick Action panel (bg-primary)
 * - FAB: add_shopping_cart (fixed bottom-6 right-6)
 *
 * Route: /vendor-stock
 */

const STATS = [
    {
        icon: 'inventory',
        iconClasses: 'text-primary bg-primary/10',
        label: 'Total SKU Count',
        value: '1,240',
        badge: '+2.4%',
        badgeClasses: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10',
        extraBorder: '',
    },
    {
        icon: 'warning',
        iconClasses: 'text-red-500 bg-red-50 dark:bg-red-500/10',
        label: 'Low Stock Alerts',
        value: '12',
        badge: null,
        badgeClasses: '',
        extraBorder: 'border-l-4 border-l-red-500',
    },
    {
        icon: 'sync_alt',
        iconClasses: 'text-primary bg-primary/10',
        label: 'Movements (Today)',
        value: '+45 units',
        badge: null,
        badgeClasses: '',
        extraBorder: '',
    },
    {
        icon: 'payments',
        iconClasses: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10',
        label: 'Inventory Value',
        value: '$242.8k',
        badge: null,
        badgeClasses: '',
        extraBorder: '',
    },
];

const PRODUCTS = [
    {
        name: 'Dining Table DT-01',
        sku: 'SKU: FUR-T-001 • Tables',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGmXMXm8SGhvT6ee5mbwy--HN9nSXvSkcObSakjE-WA-h8mELlM6Egp_d0zAfs8skpwurxLNzk4pYH9zalIV0L3wQOvhz90LgoNZV58jkkt9MRKkGmawjrzaBEpvQzyNdzu5i3ik2ON72hOPsx1-TS71hf-wr1KuNLY3IB671w_DU4Km7rjJapWjvtxifRtDo-09WeCa24hvw-h9qTEhTzuVwX3e8nUha_Il5WBWt9_ORYigNcblnl1ezbr6M1QkaDCeVNQcvcAY26',
        stock: 85,
        stockColor: '',
        barPercent: '85%',
        barColor: 'bg-primary',
        status: 'In Stock',
        statusBg: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
        dotColor: 'bg-emerald-500',
        rowBg: '',
        rowExtra: '',
        imgExtra: '',
    },
    {
        name: 'Nordic Bar Stool',
        sku: 'SKU: FUR-S-042 • Seating',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdKqvPEq9mG-RudYTHTItot3opvel2ntpYGJNyYZ6-VvYzL-zy4g57Rom9OM9ThYV0r8OPp2lACmUSJHgBfnFozzaYcLpJPwVxUcN5K4e-tOAzznlqdNaLMQu_ENO4WgTsKarsv48mDdBe9Lt4GMVBpG22elmL9qV2xGzxj2joDW1GAeegNsyBH6vT16MSLChC9BLXiH0JFhJNRmVVgHFlUUFfl4ig7uIwPFnqpBz30HYESaxniJc5CCOX1Vxu3lgFSqetHsYbj5Zs',
        stock: 12,
        stockColor: 'text-red-600 dark:text-red-400',
        barPercent: '15%',
        barColor: 'bg-red-500',
        status: 'Low Stock',
        statusBg: 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400',
        dotColor: 'bg-red-500',
        rowBg: 'bg-red-50/30 dark:bg-red-900/10 hover:bg-red-50/50 dark:hover:bg-red-900/20',
        rowExtra: '',
        imgExtra: '',
    },
    {
        name: 'Velvet Lounge Chair',
        sku: 'SKU: FUR-C-011 • Seating',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyzpr5h_HXxKrAy6ltkwBRr8vLqEjgTDoDrTbArmD9UMBcoh9pI1j9keh_erGxCO4WUJ2nKUZ4O2m21riODtZWjIVKsrVmvIGzkevYCZGrgfhIMywEcK7NH5nV560Ev5qWaICf0XyuVzrQVllXgB51b8z980lDfnFLTxiNQC9nvtROhakAEofXFJN8sWGZW7MaJLu7Bcuj8Vu3AXh9kU_FuJ2rb_YwKKcGkncnNkX1H136RUFHjIYrz7rkM-7KIyjsTGgiCtnB4NOT',
        stock: 48,
        stockColor: '',
        barPercent: '48%',
        barColor: 'bg-primary',
        status: 'In Stock',
        statusBg: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
        dotColor: 'bg-emerald-500',
        rowBg: '',
        rowExtra: '',
        imgExtra: '',
    },
    {
        name: 'Walnut Credenza',
        sku: 'SKU: FUR-ST-09 • Storage',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhtOVBL9ULCk6ieo16GvzSPv5tmYmqjTen__Bbtm49EzL9kKqogYKh3GkMts_gzM9Lv7SoqVmw018k4HhJjrGPe5KRBcfxJgrAf1POJuJhpWn40kzqkKqW3XJM7mNGMukqJN2p1FIk9fopEX6KsxN9nS-P6lRhwDu-DlZHX-IIBPXIO7O4Ec3P5WFSsXAirFbH-tMgEf1DdmDyTVSko34r8FciQISGuk4b3wxPu9yClWW4fJSCVW1rQB-MvJ7HLoYz1GOXDO2hI5US',
        stock: 0,
        stockColor: 'text-slate-400',
        barPercent: '0%',
        barColor: 'bg-slate-300 dark:bg-slate-700',
        status: 'Out of Stock',
        statusBg: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
        dotColor: 'bg-slate-400',
        rowBg: '',
        rowExtra: 'opacity-70',
        imgExtra: 'grayscale',
    },
];

const ACTIVITIES = [
    {
        title: 'Stock Added',
        time: '2m ago',
        dotColor: 'bg-primary',
        content: (
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                <span className="font-bold text-emerald-500">+15</span> Dining Table DT-01 by{' '}
                <span className="text-slate-900 dark:text-white font-medium">Alex Rivera</span>
            </p>
        ),
        reason: 'Reason: Production Batch #884',
        reasonBg: true,
    },
    {
        title: 'Sale Recorded',
        time: '45m ago',
        dotColor: 'bg-slate-300 dark:bg-slate-700',
        content: (
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                <span className="font-bold text-red-500">-2</span> Nordic Bar Stool by{' '}
                <span className="text-slate-900 dark:text-white font-medium">POS Terminal 1</span>
            </p>
        ),
        reason: 'Order: #FL-22910',
        reasonBg: false,
    },
    {
        title: 'Manual Adjust',
        time: '3h ago',
        dotColor: 'bg-slate-300 dark:bg-slate-700',
        content: (
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                <span className="font-bold text-slate-900 dark:text-white">-1</span> Walnut Credenza by{' '}
                <span className="text-slate-900 dark:text-white font-medium">System Manager</span>
            </p>
        ),
        reason: 'Reason: Damaged in Transit',
        reasonBg: true,
    },
    {
        title: 'Threshold Update',
        time: '5h ago',
        dotColor: 'bg-slate-300 dark:bg-slate-700',
        content: (
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Reorder point for{' '}
                <span className="font-medium text-slate-900 dark:text-white">Oak Wood Planks</span> updated
                to 50m.
            </p>
        ),
        reason: null,
        reasonBg: false,
    },
];

const VendorStock = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3">
                <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-3 text-primary">
                            <span className="material-symbols-outlined text-3xl font-bold">inventory_2</span>
                            <h2 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">
                                VendorPortal
                            </h2>
                        </Link>
                        <nav className="hidden md:flex items-center gap-6">
                            <a className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" href="#">
                                Dashboard
                            </a>
                            <a className="text-primary text-sm font-semibold border-b-2 border-primary pb-1" href="#">
                                Stock Manager
                            </a>
                            <a className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" href="#">
                                Orders
                            </a>
                            <a className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" href="#">
                                Suppliers
                            </a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative hidden lg:block">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                                search
                            </span>
                            <input
                                className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary w-64 transition-all"
                                placeholder="Search SKU or Product..."
                                type="text"
                            />
                        </div>
                        <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors relative">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
                        </button>
                        <div className="h-8 w-px bg-slate-200 dark:border-slate-800" />
                        <div className="flex items-center gap-3 pl-2">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-semibold text-slate-900 dark:text-white leading-none">
                                    Modern Living Co.
                                </p>
                                <p className="text-[10px] text-slate-500 font-medium mt-1">Authorized Vendor</p>
                            </div>
                            <img
                                className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                                alt="Vendor profile"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-06Q-zWeXIXCRQRX7eg5WFvQpHQwx3ZaNxu0Ao3qBveb48vfzzaq0wzY6YYZM3HrqfbXhjEXuOV6nzKP4mmXo-Dl8T8q6A6XR1mZSfw-khCIS6Jg0JYVyiQ2JaNkie7WSr7dTZK7hwE2RBeWx30EoUPlplS9yDmImCbAWbL63tngO4zxr4ausq7XBYYRhvvv_bcCUQmOFEn8pdHxf4lumVjT6pAGc46vCgKKG_q-1aEkw5PSaElQWrD4rNqacmEguXy7vCBIx3vVO"
                            />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-[1400px] mx-auto p-6 space-y-6">
                {/* Dashboard Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Stock Management</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            Real-time inventory control for finished products and components.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors">
                            <span className="material-symbols-outlined text-lg">file_download</span>
                            Export CSV
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-shadow shadow-md">
                            <span className="material-symbols-outlined text-lg">add</span>
                            New Product
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {STATS.map((stat) => (
                        <div
                            key={stat.label}
                            className={`bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm ${stat.extraBorder}`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className={`material-symbols-outlined ${stat.iconClasses} p-2 rounded-lg`}>
                                    {stat.icon}
                                </span>
                                {stat.badge && (
                                    <span
                                        className={`text-xs font-bold flex items-center ${stat.badgeClasses} px-2 py-1 rounded-full`}
                                    >
                                        {stat.badge}
                                    </span>
                                )}
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                                {stat.label}
                            </p>
                            <p className="text-2xl font-bold mt-1 tabular-nums">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                    {/* Inventory Table (9 cols) */}
                    <div className="xl:col-span-9 space-y-4">
                        {/* Filters */}
                        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit">
                                <button className="px-6 py-2 text-sm font-bold bg-white dark:bg-slate-700 text-primary dark:text-white rounded-md shadow-sm">
                                    Finished Products
                                </button>
                                <button className="px-6 py-2 text-sm font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                                    Core Components
                                </button>
                            </div>
                            <div className="flex items-center gap-3">
                                <select className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 pl-3 pr-10 focus:ring-primary">
                                    <option>All Categories</option>
                                    <option>Seating</option>
                                    <option>Tables</option>
                                    <option>Storage</option>
                                </select>
                                <select className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 pl-3 pr-10 focus:ring-primary">
                                    <option>All Status</option>
                                    <option>In Stock</option>
                                    <option>Low Stock</option>
                                    <option>Out of Stock</option>
                                </select>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                            <th className="px-6 py-4 w-12">
                                                <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
                                            </th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">
                                                Product / SKU
                                            </th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider text-center">
                                                Current Stock
                                            </th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider text-center">
                                                Quick Adjust
                                            </th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider text-right">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {PRODUCTS.map((product) => (
                                            <tr
                                                key={product.sku}
                                                className={`transition-colors ${product.rowBg ||
                                                    'hover:bg-slate-50/50 dark:hover:bg-slate-800/30'
                                                    } ${product.rowExtra}`}
                                            >
                                                <td className="px-6 py-4">
                                                    <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <img
                                                            className={`w-12 h-12 rounded-lg object-cover bg-slate-100 ${product.imgExtra}`}
                                                            alt={product.name}
                                                            src={product.image}
                                                        />
                                                        <div>
                                                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                                                                {product.name}
                                                            </p>
                                                            <p className="text-xs text-slate-500 font-medium">{product.sku}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex flex-col items-center">
                                                        <span className={`text-sm font-bold tabular-nums ${product.stockColor}`}>
                                                            {product.stock}{' '}
                                                            <span className="text-xs font-normal text-slate-400">/ Units</span>
                                                        </span>
                                                        <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                                                            <div
                                                                className={`${product.barColor} h-full rounded-full`}
                                                                style={{ width: product.barPercent }}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-center gap-1">
                                                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">
                                                            <span className="material-symbols-outlined text-lg">remove</span>
                                                        </button>
                                                        <input
                                                            className="w-12 h-8 text-center text-sm font-bold bg-transparent border-none focus:ring-0 tabular-nums"
                                                            type="text"
                                                            defaultValue={product.stock}
                                                        />
                                                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">
                                                            <span className="material-symbols-outlined text-lg">add</span>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${product.statusBg} flex items-center gap-1 w-fit`}
                                                    >
                                                        <span className={`w-1.5 h-1.5 rounded-full ${product.dotColor}`} />
                                                        {product.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="text-primary hover:text-primary/80 text-xs font-bold uppercase tracking-wider">
                                                        Log Transaction
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Bulk Actions Footer */}
                            <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <p className="text-xs text-slate-500 font-medium italic">2 items selected</p>
                                    <div className="flex items-center gap-2">
                                        <button className="px-3 py-1.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-md hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
                                            Mark as Restocked
                                        </button>
                                        <button className="px-3 py-1.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-md hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
                                            Adjust Reorder Point
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-50"
                                        disabled
                                    >
                                        <span className="material-symbols-outlined text-lg">chevron_left</span>
                                    </button>
                                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400 mx-2">
                                        Page 1 of 12
                                    </span>
                                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700">
                                        <span className="material-symbols-outlined text-lg">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar (3 cols) */}
                    <div className="xl:col-span-3 space-y-4">
                        {/* Recent Activity */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-full">
                            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-slate-400">history</span>
                                    Recent Activity
                                </h3>
                                <button className="text-primary hover:underline text-[10px] font-bold uppercase tracking-wider">
                                    Clear View
                                </button>
                            </div>
                            <div className="p-4 flex-1 overflow-y-auto space-y-6">
                                {ACTIVITIES.map((activity, index) => (
                                    <div key={index} className="relative pl-6 border-l-2 border-primary/20">
                                        <div
                                            className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full ${activity.dotColor} flex items-center justify-center border-4 border-white dark:border-slate-900`}
                                        />
                                        <div className="space-y-1">
                                            <div className="flex justify-between items-start">
                                                <p className="text-xs font-bold text-slate-900 dark:text-white">
                                                    {activity.title}
                                                </p>
                                                <p className="text-[10px] text-slate-400 tabular-nums">{activity.time}</p>
                                            </div>
                                            {activity.content}
                                            {activity.reason && (
                                                <p
                                                    className={`text-[10px] text-slate-400 italic ${activity.reasonBg
                                                            ? 'bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded'
                                                            : ''
                                                        }`}
                                                >
                                                    {activity.reason}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                                <button className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors">
                                    View Full History Logs
                                </button>
                            </div>
                        </div>

                        {/* Quick Action */}
                        <div className="bg-primary p-5 rounded-xl text-white shadow-lg shadow-primary/20 space-y-3">
                            <h4 className="text-sm font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-white/80">bolt</span>
                                Quick Action
                            </h4>
                            <p className="text-xs text-white/80 leading-relaxed">
                                Instantly log a warehouse delivery or bulk stock reduction.
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                                <button className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg text-xs font-bold transition-colors">
                                    Bulk Inbound
                                </button>
                                <button className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg text-xs font-bold transition-colors">
                                    Bulk Outbound
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* FAB */}
            <div className="fixed bottom-6 right-6 z-50">
                <button className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-3xl">add_shopping_cart</span>
                </button>
            </div>
        </div>
    );
};

export default VendorStock;
