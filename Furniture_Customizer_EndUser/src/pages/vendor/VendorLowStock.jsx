import { Link } from 'react-router-dom';

/**
 * Vendor Low Stock Alerts Page
 *
 * Low stock management with alerts table and reorder sidebar:
 * - Header (sticky z-50): chair icon (bg-primary), "FurniVendor",
 *   search (w-64), nav (Suppliers active text-primary), notifications (red dot),
 *   settings, avatar (size-9)
 * - Breadcrumb: Vendor Portal > Stock Management (primary)
 * - Title: "Low Stock Alerts" (3xl font-extrabold), Threshold Settings + Bulk Reorder buttons
 * - 3 KPI cards:
 *   - Total Low Stock Items 24 (-5% red trending_down)
 *   - Critical Alerts 8 High Priority (text-red-600, border-l-4 red-500)
 *   - Pending Reorders 12 Orders (green icon)
 * - Filter pills: All Alerts(active)/Materials/Finished Goods/Hardware, Sort select
 * - Table (7 cols): checkbox, Product/Material (with image), SKU, Stock Status
 *   (progress bar), Threshold (editable on hover), Priority badge, Reorder button
 *   4 rows with High/Medium/Low priorities
 * - Pagination: 1-4 of 24
 * - Slide-out sidebar (translate-x-full hidden): Reorder form
 *
 * Route: /vendor-low-stock
 */

const STATS = [
    {
        icon: 'inventory_2',
        iconBg: 'bg-primary/10 text-primary',
        label: 'Total Low Stock Items',
        value: '24 Items',
        badge: (
            <span className="text-red-500 text-xs font-bold flex items-center gap-1 bg-red-50 px-2 py-1 rounded-full uppercase">
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>trending_down</span> 5%
            </span>
        ),
        extraBorder: '',
        valueColor: '',
    },
    {
        icon: 'priority_high',
        iconBg: 'bg-red-100 text-red-600',
        label: 'Critical Alerts',
        value: '8 High Priority',
        badge: (
            <span className="text-slate-400 text-xs font-medium uppercase tracking-tighter">Needs Immediate Action</span>
        ),
        extraBorder: 'border-l-4 border-l-red-500',
        valueColor: 'text-red-600',
    },
    {
        icon: 'pending_actions',
        iconBg: 'bg-green-100 text-green-600',
        label: 'Pending Reorders',
        value: '12 Orders',
        badge: (
            <span className="text-slate-400 text-xs font-medium uppercase tracking-tighter">In Transit</span>
        ),
        extraBorder: '',
        valueColor: '',
    },
];

const ALERTS = [
    {
        name: 'Premium Walnut Timber',
        category: 'Materials > Hardwood',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYaPXGRUKDbsrsTS5-6gHqoUCI3ebJlF8LAwTItUsk0nUFvba6t3WB-lDplqFfBgckDcBRRV7HDUlpZDNVt_WL6lQZHDyDIVDTPEHPwTdN9_goYyokWDWKEQvNf195l9mz0okV8n9U6fy1IXiJ73KnBDOWfYTA3brCEWSu_E73zCYZmcFDEsPTA5e_uw_RHNLg58kteqsV_3Ol5DmkMmWLSLRY3pbuwtrkbQ11kUNl9udNyXtOIZ799k95X3mIoOt2VFPnbvz5MdKr',
        sku: 'WNT-440-LW',
        stock: 12,
        stockColor: 'text-red-600',
        barPercent: '15%',
        barColor: 'bg-red-500',
        unit: 'units',
        threshold: '80 min',
        priority: 'High',
        priorityClasses: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    },
    {
        name: 'Nordic Lounge Chair',
        category: 'Products > Seating',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrf6VWaqcrfpUnUvYK9AIfVC-WCqOhPjWff2HLnXtjfo17wqNO9LyoIolbkNCMdgR8dDTScS6K_ffWaL59XTO4YSjYPwGfbN-2v_MzDfERBs_AhnunZnBt9r7AITFpPAVpdzAXboCo6mBsrQeYbpjZYUzxqWGlQY-AkBxx2X91fznavjeBpZbpugVJgLMj_oKoJFRoIEtJyTzyRBTGf9E8E01QGhW6kiGxufZ6yMp5QB2hOL8yynLwq7bBYln5-2wyeHYD-g-PJxyD',
        sku: 'LC-500-GRN',
        stock: 8,
        stockColor: 'text-amber-600',
        barPercent: '40%',
        barColor: 'bg-amber-500',
        unit: 'units',
        threshold: '20 min',
        priority: 'Medium',
        priorityClasses: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    },
    {
        name: 'Brushed Brass Handles',
        category: 'Hardware > Accessories',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvqKVCDLNzH7BMSDjdgZwpatYwmUFIHBTnTIuUN3EHFSJUW1SaWXk48swB4m9JxLsKBGVT8Xn92IuOSvvf6fLjKFxoQ4mK7oragE5FExQo7MVhA1DRaXEU7i3OVcBtdqttNZQDduyb9bc7tQwg0mKPf3pJLh-M4UFpPpB3WxLkT9FOHF4ZHIMURabmOxdiBHj7WYhi9zRvrkTRmaeDLyk4octcRDxhwLq7WL0GT-c8HH3cBwehn2Kj98FNGo13EjnyFvOSEUK0z86h',
        sku: 'HD-BRS-02',
        stock: 145,
        stockColor: 'text-slate-700 dark:text-slate-300',
        barPercent: '75%',
        barColor: 'bg-primary',
        unit: 'units',
        threshold: '200 min',
        priority: 'Low',
        priorityClasses: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400',
    },
    {
        name: 'Charcoal Grey Linen',
        category: 'Materials > Fabrics',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyXUMWzvQPSxz7oDQYROcEeZyMTL9p5ewWzqEYAbDs4nfPYo7_VPYOV2ovfsTIwlleGpR7gT-AZ7EDhQBqeUbZlb1NEUvBy7ThPuPCOsBOTiXgxWaK6glA--Qw03r7zk2cMmlmarrCgmgmXIXXh4KHr0Xrh--QyqyaObv8Hzi9ncrrr85YZRoy9kRGoydzu5_AzJcagmBl6nJvbNp7RwjUCA-z-NXhaFBW5T6poPL9CqtILQDt_RnTzd6OI2I236waxQb4GeD05llz',
        sku: 'FAB-LN-CHR',
        stock: 5,
        stockColor: 'text-red-600',
        barPercent: '8%',
        barColor: 'bg-red-500',
        unit: 'meters',
        threshold: '60 min',
        priority: 'High',
        priorityClasses: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    },
];

const FILTER_PILLS = ['All Alerts', 'Materials', 'Finished Goods', 'Hardware'];

const VendorLowStock = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3">
                <div className="max-w-[1440px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="bg-primary p-1.5 rounded-lg text-white">
                                <span className="material-symbols-outlined">chair</span>
                            </div>
                            <h2 className="text-lg font-bold tracking-tight">FurniVendor</h2>
                        </Link>
                        <div className="relative w-64">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                search
                            </span>
                            <input
                                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary"
                                placeholder="Search inventory..."
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <nav className="hidden md:flex items-center gap-6">
                            <a className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary" href="#">Inventory</a>
                            <a className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary" href="#">Orders</a>
                            <a className="text-sm font-medium text-primary" href="#">Suppliers</a>
                            <a className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary" href="#">Reports</a>
                        </nav>
                        <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-6">
                            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg relative">
                                <span className="material-symbols-outlined">notifications</span>
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
                            </button>
                            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                                <span className="material-symbols-outlined">settings</span>
                            </button>
                            <div className="size-9 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden ml-2 border border-slate-200 dark:border-slate-700">
                                <img
                                    alt="User Profile"
                                    className="w-full h-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhiN3g6HBLAgid87quclxzkIhP7CP8877VFFpfQDcXccNdVpvqMzwDPV-MkBv5NdHVwxRutXPjfXNa1HH86HuuDR2AmgZ8MjzIgm_p1ps6fJP9Una6y7Kh5j-Y8sudB6rkyeXQG5USs7pExW__rCu_OV14W7aG3CV0WdMXxDu1q5JeHU4sBCK4sbS8loc_OlTCDRuMEBQhV4ZuuiOFKEfNyZ4m0OgWTFkAHsNfyortg4gh4vkSsy_2iCswPQzrV0q693u5OVMw0iAr"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-[1440px] mx-auto px-6 py-8">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div className="space-y-1">
                        <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
                            <span>Vendor Portal</span>
                            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>chevron_right</span>
                            <span className="text-primary">Stock Management</span>
                        </nav>
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                            Low Stock Alerts
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
                            Manage materials and products below safety thresholds. Take immediate action to avoid production delays.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50">
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>tune</span>
                            Threshold Settings
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 shadow-sm shadow-primary/20">
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add_shopping_cart</span>
                            Bulk Reorder
                        </button>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {STATS.map((stat) => (
                        <div
                            key={stat.label}
                            className={`bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm ${stat.extraBorder}`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                                    <span className="material-symbols-outlined">{stat.icon}</span>
                                </div>
                                {stat.badge}
                            </div>
                            <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.label}</h3>
                            <p className={`text-3xl font-bold mt-1 ${stat.valueColor}`}>{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Table Section */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                    {/* Filters */}
                    <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                            {FILTER_PILLS.map((pill, i) => (
                                <button
                                    key={pill}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium ${i === 0
                                            ? 'bg-primary text-white'
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                                        }`}
                                >
                                    {pill}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-3">
                            <select className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 focus:ring-primary py-1.5 pl-3 pr-8">
                                <option>Sort by: Priority</option>
                                <option>Sort by: Stock Level</option>
                                <option>Sort by: Category</option>
                            </select>
                        </div>
                    </div>

                    {/* Alerts Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 dark:bg-slate-800/50">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-10">
                                        <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        Product / Material
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        SKU
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        Stock Status
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        Threshold
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        Priority
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                {ALERTS.map((alert) => (
                                    <tr key={alert.sku} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-10 rounded bg-slate-100 dark:bg-slate-700 flex-shrink-0">
                                                    <img
                                                        alt={alert.name}
                                                        className="w-full h-full object-cover rounded"
                                                        src={alert.image}
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{alert.name}</p>
                                                    <p className="text-xs text-slate-500">{alert.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-500">{alert.sku}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className={`text-sm font-bold ${alert.stockColor}`}>{alert.stock}</span>
                                                <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                    <div className={`${alert.barColor} h-full`} style={{ width: alert.barPercent }} />
                                                </div>
                                                <span className="text-[10px] text-slate-400 font-medium">{alert.unit}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                                            <div className="flex items-center gap-1 group cursor-pointer hover:text-primary">
                                                {alert.threshold}
                                                <span className="material-symbols-outlined opacity-0 group-hover:opacity-100" style={{ fontSize: '12px' }}>
                                                    edit
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${alert.priorityClasses}`}>
                                                {alert.priority}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary text-xs font-bold rounded-lg transition-all hover:text-white">
                                                Reorder
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <p className="text-xs font-medium text-slate-500">Showing 1 to 4 of 24 alerts</p>
                        <div className="flex items-center gap-1">
                            <button className="size-8 flex items-center justify-center rounded border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-white">
                                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>chevron_left</span>
                            </button>
                            <button className="size-8 flex items-center justify-center rounded bg-primary text-white font-bold text-xs">1</button>
                            <button className="size-8 flex items-center justify-center rounded border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-white font-bold text-xs">2</button>
                            <button className="size-8 flex items-center justify-center rounded border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-white font-bold text-xs">3</button>
                            <button className="size-8 flex items-center justify-center rounded border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-white">
                                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Slide-out Reorder Sidebar (hidden by default) */}
            <div className="fixed inset-y-0 right-0 w-[400px] bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 p-8 transform translate-x-full transition-transform z-50">
                <button className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600">
                    <span className="material-symbols-outlined">close</span>
                </button>
                <div className="space-y-6">
                    <div className="space-y-1">
                        <h3 className="text-xl font-bold">Reorder Item</h3>
                        <p className="text-sm text-slate-500">Configure replenishment order details.</p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center gap-4">
                        <div className="size-16 rounded bg-white dark:bg-slate-700">
                            <img
                                alt="Material Thumb"
                                className="w-full h-full object-cover rounded"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaZAXEy8yOyDP4PM03GA72VanOrlBwC8FCEikfBTs51mWERz_RXzVsjG2wX5m7tqHK0yoQIGoEA6EWXn8difcP9y11Q6Ozk-u4Ssw64Z6qpFSANCvRoX4kaSADLVjS_ONhfvW-E3OTb7IB4qhYaCtaD0AP0-_1vssJ2PsyIMVlTGgslGCnfqGnum2JPXvCJsAm_DCkERbWs8d5ZyTR0nCruX7M2H269tzdqQWhhvmqVsj82GdwslWW3wkZplNabG8CqaYCJ7ltFFqY"
                            />
                        </div>
                        <div>
                            <p className="font-bold text-sm">Premium Walnut Timber</p>
                            <p className="text-xs text-red-600 font-bold">Stock Level: 12 units</p>
                        </div>
                    </div>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Preferred Supplier</label>
                            <select className="w-full border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-lg text-sm">
                                <option>Timber Excellence Co.</option>
                                <option>Hardwood Central</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Order Quantity</label>
                            <input
                                className="w-full border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-lg text-sm"
                                type="number"
                                defaultValue={100}
                            />
                            <p className="text-[10px] text-slate-400 mt-1">Suggested based on safety stock + 30-day forecast.</p>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Lead Time Expectation</label>
                            <div className="flex items-center gap-2 p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                                <span className="material-symbols-outlined text-primary">schedule</span>
                                <span className="text-sm font-medium">12-14 Business Days</span>
                            </div>
                        </div>
                        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-medium text-slate-500">Estimated Total</span>
                                <span className="text-lg font-bold text-slate-900 dark:text-white">$2,440.00</span>
                            </div>
                            <button
                                className="w-full py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90"
                                type="button"
                            >
                                Confirm Reorder
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VendorLowStock;
