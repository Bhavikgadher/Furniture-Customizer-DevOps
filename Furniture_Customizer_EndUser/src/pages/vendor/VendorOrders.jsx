import { Link } from 'react-router-dom';

/**
 * Vendor Order Management Page
 *
 * Order management dashboard with fixed sidebar:
 * - Sidebar (w-64 fixed, lg:flex): chair icon (bg-primary), "FurnitureStudio" / "Vendor Dashboard",
 *   nav (Orders active bg-primary/10, Inventory, Analytics, Payouts), Settings link,
 *   profile (Modern Craft Co. / Premium Partner)
 * - Header (h-16 sticky): "Order Management", search (Order ID or Customer),
 *   notifications (red dot) + help buttons
 * - 3 Metric cards:
 *   - Total Revenue $45,280.00 (+12.5% emerald)
 *   - Pending Orders 12 (+2 emerald)
 *   - Active Production 8 (-1 red)
 * - Filter tabs: All Orders (active), New (badge: 4), In Production, Ready for Shipping, Completed
 * - Order table (6 cols): Order ID + date, Customer (avatar initials), Customization Summary,
 *   Total Amount, Status badge, Actions
 *   4 rows:
 *   - #ORD-7721: Alex Rivera, Velvet Sofa Royal Blue/Gold Legs, $2,450, New (blue), "Accept Order" CTA
 *   - #ORD-7718: Sarah Jenkins, Mid-Century Armchair Emerald/Oak, $1,120, In Production (amber animate-pulse), "Mark Produced"
 *   - #ORD-7715: Michael Chen, Marble Coffee Table White/Black, $890, New (blue), "Accept Order" CTA
 *   - #ORD-7712: Emma Wilson, King Size Bedframe Grey Linen, $3,100, In Production (amber), "Mark Produced"
 * - Pagination: "1 to 4 of 42", pages 1(active)/2/3
 * - Help banner: bg-primary/5, support_agent icon, "Open Support Center" link
 *
 * Route: /vendor-orders
 */

const SIDEBAR_NAV = [
    { icon: 'list_alt', label: 'Orders', active: true, href: '/vendor-orders' },
    { icon: 'inventory_2', label: 'Inventory', active: false, href: '/vendor-products' },
    { icon: 'analytics', label: 'Analytics', active: false, href: '/vendor-analytics' },
    { icon: 'payments', label: 'Payouts', active: false, href: '/vendor-revenue' },
];

const METRICS = [
    {
        label: 'Total Revenue',
        icon: 'payments',
        iconColor: 'text-primary',
        value: '$45,280.00',
        change: '+12.5%',
        changeColor: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10',
        note: 'vs. previous 30 days',
    },
    {
        label: 'Pending Orders',
        icon: 'pending_actions',
        iconColor: 'text-amber-500',
        value: '12',
        change: '+2',
        changeColor: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10',
        note: 'Needs immediate attention',
    },
    {
        label: 'Active Production',
        icon: 'conveyor_belt',
        iconColor: 'text-blue-500',
        value: '8',
        change: '-1',
        changeColor: 'text-red-600 bg-red-50 dark:bg-red-500/10',
        note: 'On schedule',
    },
];

const FILTER_TABS = [
    { label: 'All Orders', active: true, badge: null },
    { label: 'New', active: false, badge: '4' },
    { label: 'In Production', active: false, badge: null },
    { label: 'Ready for Shipping', active: false, badge: null },
    { label: 'Completed', active: false, badge: null },
];

const ORDERS = [
    {
        id: '#ORD-7721',
        date: 'Oct 24, 2023',
        initials: 'AR',
        initialsColor: 'bg-primary/10 text-primary',
        customer: 'Alex Rivera',
        product: 'Velvet Sofa',
        details: 'Royal Blue / Gold Legs',
        amount: '$2,450.00',
        status: 'New',
        statusColor: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
        dotColor: 'bg-blue-600 dark:bg-blue-400',
        dotPulse: false,
        actionType: 'accept',
    },
    {
        id: '#ORD-7718',
        date: 'Oct 24, 2023',
        initials: 'SJ',
        initialsColor: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400',
        customer: 'Sarah Jenkins',
        product: 'Mid-Century Armchair',
        details: 'Emerald / Oak',
        amount: '$1,120.00',
        status: 'In Production',
        statusColor: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
        dotColor: 'bg-amber-600 dark:bg-amber-400',
        dotPulse: true,
        actionType: 'produced',
    },
    {
        id: '#ORD-7715',
        date: 'Oct 23, 2023',
        initials: 'MC',
        initialsColor: 'bg-primary/10 text-primary',
        customer: 'Michael Chen',
        product: 'Marble Coffee Table',
        details: 'White / Black Base',
        amount: '$890.00',
        status: 'New',
        statusColor: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
        dotColor: 'bg-blue-600 dark:bg-blue-400',
        dotPulse: false,
        actionType: 'accept',
    },
    {
        id: '#ORD-7712',
        date: 'Oct 23, 2023',
        initials: 'EW',
        initialsColor: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400',
        customer: 'Emma Wilson',
        product: 'King Size Bedframe',
        details: 'Grey Linen',
        amount: '$3,100.00',
        status: 'In Production',
        statusColor: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
        dotColor: 'bg-amber-600 dark:bg-amber-400',
        dotPulse: false,
        actionType: 'produced',
    },
];

const VendorOrders = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
            <div className="flex min-h-screen">
                {/* Side Navigation */}
                <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark hidden lg:flex flex-col fixed h-full">
                    <Link to="/home" className="p-6 flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-primary flex items-center justify-center text-white">
                            <span className="material-symbols-outlined">chair</span>
                        </div>
                        <div>
                            <h1 className="font-bold text-lg leading-tight">FurnitureStudio</h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Vendor Dashboard</p>
                        </div>
                    </Link>
                    <nav className="flex-1 px-4 py-4 space-y-1">
                        {SIDEBAR_NAV.map((item) => (
                            <Link
                                key={item.label}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${item.active
                                        ? 'bg-primary/10 text-primary font-medium'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors'
                                    }`}
                                to={item.href}
                            >
                                <span className="material-symbols-outlined">{item.icon}</span>
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </nav>
                    <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-1">
                        <Link
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            to="/vendor-profile"
                        >
                            <span className="material-symbols-outlined">settings</span>
                            <span>Settings</span>
                        </Link>
                        <div className="flex items-center gap-3 px-3 py-4 mt-2 border-t border-slate-100 dark:border-slate-800">
                            <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                                <img
                                    className="w-full h-full object-cover"
                                    alt="Vendor profile"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuj6_oW0CARkJk_afGO2ea8lSmx4LNvLqYctVJD38J4tfKrLEtLQKR-Uf-q9b9cCnwHLybehf2HAQ3m8Gjr3W16WRdR_rYrhh_dZov2P7ORpWGbf1TJzIjmAt3hXzv2P-n9CjTq7bzXTttXLCPKn54FZwvXRjo2Kos_iRxAQfGaBYKUk8uKfdFVGB2HRt4J-8NoASr7RCN62BWo62L4Y9noMud1n1hvIKTXRkUv0-unwB9pQTvEpE_b0rC5MMDLZaEXKBTb-GQXwvD"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold truncate">Modern Craft Co.</p>
                                <p className="text-xs text-slate-500 truncate">Premium Partner</p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 lg:ml-64 flex flex-col min-w-0">
                    {/* Header */}
                    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark sticky top-0 z-10 flex items-center justify-between px-8">
                        <div className="flex items-center gap-4 flex-1 max-w-xl">
                            <span className="material-symbols-outlined text-slate-400 lg:hidden">menu</span>
                            <h2 className="text-xl font-bold lg:block hidden">Order Management</h2>
                            <div className="relative flex-1 max-w-md ml-4">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                                    search
                                </span>
                                <input
                                    className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary text-sm placeholder:text-slate-500"
                                    placeholder="Search by Order ID or Customer..."
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="size-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative">
                                <span className="material-symbols-outlined">notifications</span>
                                <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-background-dark" />
                            </button>
                            <button className="size-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                <span className="material-symbols-outlined">help_outline</span>
                            </button>
                        </div>
                    </header>

                    <div className="p-8 space-y-8">
                        {/* Metrics Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {METRICS.map((metric) => (
                                <div
                                    key={metric.label}
                                    className="bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 p-6 rounded-xl"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                            {metric.label}
                                        </span>
                                        <span className={`material-symbols-outlined ${metric.iconColor}`}>
                                            {metric.icon}
                                        </span>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <h3 className="text-2xl font-bold">{metric.value}</h3>
                                        <span
                                            className={`text-xs font-semibold ${metric.changeColor} px-1.5 py-0.5 rounded`}
                                        >
                                            {metric.change}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-2">{metric.note}</p>
                                </div>
                            ))}
                        </div>

                        {/* Orders Section */}
                        <div className="space-y-4">
                            {/* Filter Tabs */}
                            <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar">
                                {FILTER_TABS.map((tab) => (
                                    <button
                                        key={tab.label}
                                        className={`px-6 py-4 border-b-2 font-medium text-sm whitespace-nowrap ${tab.active
                                                ? 'border-primary text-primary font-semibold'
                                                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                            }`}
                                    >
                                        {tab.label}
                                        {tab.badge && (
                                            <span className="ml-1 px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-full text-xs">
                                                {tab.badge}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Table */}
                            <div className="bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                                    Order ID
                                                </th>
                                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                                    Customer
                                                </th>
                                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                                    Customization Summary
                                                </th>
                                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                                    Total Amount
                                                </th>
                                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                                    Status
                                                </th>
                                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                            {ORDERS.map((order) => (
                                                <tr
                                                    key={order.id}
                                                    className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group"
                                                >
                                                    <td className="px-6 py-5 align-middle">
                                                        <span className="font-bold text-slate-900 dark:text-white">
                                                            {order.id}
                                                        </span>
                                                        <p className="text-[10px] text-slate-400 mt-0.5">{order.date}</p>
                                                    </td>
                                                    <td className="px-6 py-5 align-middle">
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className={`size-8 rounded-full ${order.initialsColor} flex items-center justify-center font-bold text-xs`}
                                                            >
                                                                {order.initials}
                                                            </div>
                                                            <span className="text-sm font-medium">{order.customer}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5 align-middle">
                                                        <div className="text-sm">
                                                            <span className="font-medium">{order.product}</span>
                                                            <span className="text-slate-500 mx-1">•</span>
                                                            <span className="text-slate-500">{order.details}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5 align-middle">
                                                        <span className="text-sm font-bold">{order.amount}</span>
                                                    </td>
                                                    <td className="px-6 py-5 align-middle">
                                                        <span
                                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${order.statusColor} text-xs font-bold`}
                                                        >
                                                            <span
                                                                className={`size-1.5 rounded-full ${order.dotColor} ${order.dotPulse ? 'animate-pulse' : ''
                                                                    }`}
                                                            />
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-5 align-middle text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            {order.actionType === 'accept' ? (
                                                                <button className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-sm">
                                                                    Accept Order
                                                                </button>
                                                            ) : (
                                                                <button className="px-3 py-1.5 border border-primary text-primary text-xs font-bold rounded-lg hover:bg-primary/5 transition-colors">
                                                                    Mark Produced
                                                                </button>
                                                            )}
                                                            <Link className="p-1.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors" to="/vendor-order-details">
                                                                <span className="material-symbols-outlined text-xl">
                                                                    visibility
                                                                </span>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
                                    <p className="text-xs text-slate-500">Showing 1 to 4 of 42 orders</p>
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-background-dark text-slate-400 disabled:opacity-50"
                                            disabled
                                        >
                                            <span className="material-symbols-outlined text-lg">chevron_left</span>
                                        </button>
                                        <button className="size-8 flex items-center justify-center rounded-lg bg-primary text-white text-xs font-bold">
                                            1
                                        </button>
                                        <button className="size-8 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-medium">
                                            2
                                        </button>
                                        <button className="size-8 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-medium">
                                            3
                                        </button>
                                        <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-background-dark text-slate-600 dark:text-slate-400">
                                            <span className="material-symbols-outlined text-lg">chevron_right</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Help Banner */}
                        <div className="relative bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-2xl p-8 overflow-hidden">
                            <div className="relative z-10 max-w-lg">
                                <h4 className="text-xl font-bold mb-2">Need help with fulfillment?</h4>
                                <p className="text-slate-600 dark:text-slate-400 mb-6">
                                    Our vendor support team is available 24/7 to help you manage your production
                                    schedule and logistics.
                                </p>
                                <button className="flex items-center gap-2 text-primary font-bold text-sm hover:underline">
                                    Open Support Center{' '}
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                            </div>
                            <div className="absolute right-0 top-0 h-full w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
                                <span className="material-symbols-outlined text-[200px] -rotate-12 translate-x-12">
                                    support_agent
                                </span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default VendorOrders;
