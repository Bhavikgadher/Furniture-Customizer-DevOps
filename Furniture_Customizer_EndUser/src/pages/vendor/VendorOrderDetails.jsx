import { Link } from 'react-router-dom';

/**
 * Vendor Order Details Page
 *
 * Detailed order view for Order #ORD-88241 — Custom Mid-Century Modern Walnut Dining Table:
 * - Header (sticky z-50): chair icon, "CraftFlow Vendor", nav (Dashboard, Orders active
 *   border-b-2, Inventory, Customers), search, notifications (red dot), avatar
 * - Breadcrumb: Dashboard > Orders > Order #ORD-88241
 * - Page header: "#ORD-88241" (3xl font-black), "In Production" yellow badge,
 *   Print Invoice + Update Status (primary shadow-lg) buttons
 * - 3-col grid (2/1):
 *   Left (2-col):
 *     - 3D Preview hero: view_in_ar label, zoom/refresh/fullscreen buttons,
 *       aspect-video image, configuration overlay label
 *     - Material Specs (3-col): Wood (border-l-4 primary, walnut swatch), Finish, Hardware (brass gradient)
 *     - Pricing table: Base $2,450, Dimensions +$350, Delivery +$195, Total $2,995 (font-black primary)
 *     - Production Timeline: 5 steps (Order Placed ✅, Material Sourced ✅,
 *       Production 🔵 65% animate-pulse, Quality Check ⚪ grayscale, Shipped ⚪ grayscale)
 *   Right sidebar:
 *     - Customer: Eleanor Shellstrop (VIP, 4 orders), email/phone/address, View Profile
 *     - Vendor Notes: yellow note card, textarea, Save Note (bg-slate-900)
 *     - Shipping Logistics: 185 lbs, LTL Freight, "Very High" fragile badge (red)
 *
 * Route: /vendor-order-details
 */

const TIMELINE_STEPS = [
    { icon: 'check', label: 'Order Placed', date: 'Oct 12, 2023', status: 'completed' },
    { icon: 'check', label: 'Material Sourced', date: 'Oct 15, 2023', status: 'completed' },
    { icon: 'precision_manufacturing', label: 'Production', date: 'In Progress (65%)', status: 'active' },
    { icon: 'verified', label: 'Quality Check', date: 'Est. Nov 2', status: 'pending' },
    { icon: 'local_shipping', label: 'Shipped', date: 'Est. Nov 5', status: 'pending' },
];

const PRICING_ROWS = [
    {
        title: 'Walnut Dining Table (8-Seater)',
        subtitle: 'Base configuration',
        unitPrice: '$2,450.00',
        total: '$2,450.00',
    },
    {
        title: 'Custom Dimensions Upgrade',
        subtitle: '96" x 42" x 30"',
        unitPrice: '$350.00',
        total: '$350.00',
    },
    {
        title: 'White Glove Delivery',
        subtitle: 'In-home assembly + removal',
        unitPrice: '$195.00',
        total: '$195.00',
    },
];

const VendorOrderDetails = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased font-display">
            <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    {/* Header */}
                    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark px-6 py-3 sticky top-0 z-50">
                        <div className="flex items-center gap-8">
                            <Link to="/home" className="flex items-center gap-3 text-primary">
                                <span className="material-symbols-outlined text-3xl font-bold">chair</span>
                                <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight">
                                    CraftFlow Vendor
                                </h2>
                            </Link>
                            <nav className="hidden md:flex items-center gap-6">
                                <Link className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" to="/vendor-dashboard">
                                    Dashboard
                                </Link>
                                <Link className="text-primary text-sm font-bold border-b-2 border-primary pb-1" to="/vendor-orders">
                                    Orders
                                </Link>
                                <Link className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" to="/vendor-products">
                                    Inventory
                                </Link>
                                <Link className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" to="/vendor-profile">
                                    Customers
                                </Link>
                            </nav>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative hidden sm:block">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                                    search
                                </span>
                                <input
                                    className="w-64 pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/50"
                                    placeholder="Search orders, clients..."
                                />
                            </div>
                            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full relative">
                                <span className="material-symbols-outlined">notifications</span>
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                            </button>
                            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 overflow-hidden">
                                <img
                                    className="w-full h-full object-cover"
                                    alt="Vendor profile avatar"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfob_JohjoSFE8AGccONc0H7Wi5WNIUM52wQgUDwVGdYeFaMCpEiuk1k58w4z4p2wHJ3LdhG-ZH4JUG7nJ9ZbBG9wqGh6XRfoDixeLlp-lRDpxw2f6pKPUx4m4o0ClDu9NmZVNhLFmtiqpVI1QeJ-6nLySicySaOHi6rOef6bQGOfj5uW3wsI5yct4jF_-TlYVURzQbo3zf4TCXpZ68NvJlZRj4pZC2By2hFF3iNX8nezNzrEDc0hCRceHruztSXrPNH8O1kCa_f9w"
                                />
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 mb-6 text-sm text-slate-500">
                            <Link className="hover:text-primary" to="/vendor-dashboard">Dashboard</Link>
                            <span className="material-symbols-outlined text-sm">chevron_right</span>
                            <Link className="hover:text-primary" to="/vendor-orders">Orders</Link>
                            <span className="material-symbols-outlined text-sm">chevron_right</span>
                            <span className="text-slate-900 dark:text-slate-100 font-semibold">
                                Order #ORD-88241
                            </span>
                        </div>

                        {/* Page Title & Actions */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                                        Order #ORD-88241
                                    </h1>
                                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 text-xs font-bold rounded-full uppercase tracking-wider">
                                        In Production
                                    </span>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400">
                                    Custom Mid-Century Modern Walnut Dining Table
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors">
                                    <span className="material-symbols-outlined text-lg">print</span> Print Invoice
                                </button>
                                <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                                    <span className="material-symbols-outlined text-lg">edit_square</span> Update
                                    Status
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* 3D Preview Hero */}
                                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                                    <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                                        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary">view_in_ar</span>{' '}
                                            Live 3D Configuration Preview
                                        </h3>
                                        <div className="flex gap-2">
                                            <button className="p-1.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-sm hover:text-primary">
                                                <span className="material-symbols-outlined text-lg">zoom_in</span>
                                            </button>
                                            <button className="p-1.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-sm hover:text-primary">
                                                <span className="material-symbols-outlined text-lg">refresh</span>
                                            </button>
                                            <button className="p-1.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-sm hover:text-primary">
                                                <span className="material-symbols-outlined text-lg">fullscreen</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="aspect-video relative group">
                                        <img
                                            className="w-full h-full object-cover"
                                            alt="Modern walnut dining table high resolution 3D render"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAD652P9gpNJDh9yfce1QZUqNneEsscSLk7lmEl46-sFFftiCxnWj3jqqRfLdhyaX6ZsAd8aPWXrI7shG7iJ-FJKY5syocsWrXxF_ot_1I-G3xgP_Kc9QajNq8gvrssyz_v7390l-72SWRuMvRx_SkJ6gxro7tB8J3WmKJAKLxpl7xJcV_ifE5MuT85GJbhXlMZKrAZPOtjzk49VtU_VD6-PvvmQszEbE8Wjt_i5wQRc0gkksdV_kJjoFwWfwV9GP2JOpmLSMCqqroz"
                                        />
                                        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-medium border border-white/20">
                                            Current Configuration: Solid Walnut + Brass Inlays
                                        </div>
                                    </div>
                                </div>

                                {/* Material Specifications */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Wood Choice */}
                                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border-l-4 border-primary shadow-sm space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                                Wood Choice
                                            </span>
                                            <span className="material-symbols-outlined text-primary">forest</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-lg bg-orange-900 shadow-inner"
                                                style={{
                                                    backgroundImage:
                                                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDPp9OthQLpCM2u-zNgAULYQ6G5ORmNIVnT0XIFVMDYC-BvbEUA6jYSN3MnE6l54HXwGR8OPrL0i-FfXcMMG7dh1yoIImvzRb81MWMvFf5U2_doZ9viq8W_LUTwm8gtJK-tLfzA5JBG85xA4RJT4987vVksulepWabz1yywmK49Ae1CXdvfFCi_ONULOP7d2nuoJ0v8oU9sF4tn4-yYbIsX5HzuY5j9uJmDM_VGc94-qlThy0bHXTaotKwJSvUWTdNf1ucCqJToFKd0')",
                                                }}
                                            />
                                            <div>
                                                <p className="font-bold text-slate-800 dark:text-slate-100">
                                                    Solid American Walnut
                                                </p>
                                                <p className="text-xs text-slate-500">Premium Grade A</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Finish */}
                                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                                Finish
                                            </span>
                                            <span className="material-symbols-outlined text-slate-400">
                                                format_paint
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center border border-slate-200 dark:border-slate-600">
                                                <span className="material-symbols-outlined text-slate-400">opacity</span>
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800 dark:text-slate-100">
                                                    Satin Hand-Rubbed Oil
                                                </p>
                                                <p className="text-xs text-slate-500">Water resistant, Matte</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Hardware */}
                                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                                Hardware
                                            </span>
                                            <span className="material-symbols-outlined text-slate-400">hardware</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-lg bg-yellow-400 shadow-inner"
                                                style={{
                                                    backgroundImage:
                                                        'radial-gradient(circle at center, #facc15, #ca8a04)',
                                                }}
                                            />
                                            <div>
                                                <p className="font-bold text-slate-800 dark:text-slate-100">
                                                    Brushed Brass
                                                </p>
                                                <p className="text-xs text-slate-500">Reinforced L-Joints</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Pricing Table */}
                                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                                        <h3 className="font-bold text-slate-800 dark:text-slate-200">
                                            Pricing Breakdown
                                        </h3>
                                    </div>
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 font-medium">
                                                <th className="px-6 py-3 text-left">Description</th>
                                                <th className="px-6 py-3 text-right">Unit Price</th>
                                                <th className="px-6 py-3 text-right">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                            {PRICING_ROWS.map((row, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4">
                                                        <p className="font-semibold text-slate-800 dark:text-slate-100">
                                                            {row.title}
                                                        </p>
                                                        <p className="text-xs text-slate-500">{row.subtitle}</p>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">{row.unitPrice}</td>
                                                    <td className="px-6 py-4 text-right">{row.total}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot>
                                            <tr className="bg-primary/5 dark:bg-primary/10">
                                                <td
                                                    className="px-6 py-4 text-right font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider text-xs"
                                                    colSpan="2"
                                                >
                                                    Total Order Value
                                                </td>
                                                <td className="px-6 py-4 text-right text-lg font-black text-primary">
                                                    $2,995.00
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>

                                {/* Production Timeline */}
                                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                                    <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-8">
                                        Production Timeline
                                    </h3>
                                    <div className="relative flex flex-col md:flex-row justify-between items-start gap-8">
                                        {/* Background Line */}
                                        <div className="absolute hidden md:block top-5 left-8 right-8 h-1 bg-slate-200 dark:bg-slate-800 -z-0">
                                            <div className="h-full bg-primary w-2/3" />
                                        </div>
                                        {/* Steps */}
                                        {TIMELINE_STEPS.map((step) => (
                                            <div
                                                key={step.label}
                                                className={`relative z-10 flex md:flex-col items-center gap-4 text-center ${step.status === 'pending' ? 'grayscale opacity-50' : ''
                                                    }`}
                                            >
                                                <div
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${step.status === 'completed'
                                                            ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                                            : step.status === 'active'
                                                                ? 'bg-primary border-4 border-primary/20 text-white'
                                                                : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                                                        }`}
                                                >
                                                    <span
                                                        className={`material-symbols-outlined text-lg ${step.status === 'active' ? 'animate-pulse' : ''
                                                            }`}
                                                    >
                                                        {step.icon}
                                                    </span>
                                                </div>
                                                <div className="text-left md:text-center">
                                                    <p
                                                        className={`text-xs font-black uppercase ${step.status === 'completed'
                                                                ? 'text-primary'
                                                                : step.status === 'active'
                                                                    ? 'text-slate-900 dark:text-slate-100'
                                                                    : 'text-slate-500'
                                                            }`}
                                                    >
                                                        {step.label}
                                                    </p>
                                                    <p className="text-[10px] text-slate-500">{step.date}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Sidebar */}
                            <div className="space-y-6">
                                {/* Customer Card */}
                                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                                    <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-xl">person</span>{' '}
                                        Customer Details
                                    </h3>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-14 h-14 rounded-full bg-slate-100 overflow-hidden ring-4 ring-slate-50">
                                            <img
                                                className="w-full h-full object-cover"
                                                alt="Client profile picture"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhEDIrK4pEmH9FAn3IENY9uahc_-VRPnB8-hoSMXLIYm0UpdrRflUvrH6LrENaPLgmbpXWDn_IZLffC8G1lW8EEiugtPuZ8v2DU9LWoP3JOsiEFbHyxxOkh886aTT9p0zzZQAj2eCGYGB00AklfQbxaZN3c1g_laiLridOmfXk5JHn4pxe7jWY-76kNH5uGSVK0ZWDQ02MWUkmSRCgzopOIHq8fVqY3K77nt04-NiHcCSVCybuFoiuAQQnszkxiz5brqFjWU3oPXru"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                                                Eleanor Shellstrop
                                            </p>
                                            <p className="text-xs text-primary font-medium">
                                                VIP Client • 4 Previous Orders
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex gap-3">
                                            <span className="material-symbols-outlined text-slate-400">mail</span>
                                            <div>
                                                <p className="text-[10px] uppercase font-bold text-slate-400">
                                                    Email Address
                                                </p>
                                                <p className="text-sm text-slate-700 dark:text-slate-300">
                                                    e.shellstrop@architect.com
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <span className="material-symbols-outlined text-slate-400">call</span>
                                            <div>
                                                <p className="text-[10px] uppercase font-bold text-slate-400">Phone</p>
                                                <p className="text-sm text-slate-700 dark:text-slate-300">
                                                    +1 (555) 098-7654
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <span className="material-symbols-outlined text-slate-400">
                                                location_on
                                            </span>
                                            <div>
                                                <p className="text-[10px] uppercase font-bold text-slate-400">
                                                    Shipping Address
                                                </p>
                                                <p className="text-sm text-slate-700 dark:text-slate-300">
                                                    123 Artisan Way,
                                                    <br />
                                                    Suite 400, Austin, TX 78701
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="w-full mt-6 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-lg transition-colors">
                                        View Customer Profile
                                    </button>
                                </div>

                                {/* Internal Notes */}
                                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                                    <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-xl">
                                            sticky_note_2
                                        </span>{' '}
                                        Vendor Notes
                                    </h3>
                                    <div className="space-y-3 mb-4">
                                        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/30 rounded-lg">
                                            <p className="text-xs text-yellow-800 dark:text-yellow-400 italic">
                                                &quot;Customer requested extra kiln drying for the walnut to prevent
                                                warping in humid environments.&quot;
                                            </p>
                                            <p className="text-[10px] text-yellow-600/60 dark:text-yellow-400/50 mt-2 font-medium">
                                                — Admin, Oct 13
                                            </p>
                                        </div>
                                    </div>
                                    <textarea
                                        className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-1 focus:ring-primary/50 mb-3"
                                        placeholder="Add a craftsman note..."
                                        rows="3"
                                    />
                                    <button className="w-full py-2 bg-slate-900 dark:bg-slate-700 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors">
                                        Save Note
                                    </button>
                                </div>

                                {/* Logistics Info */}
                                <div className="bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/10 shadow-sm p-6">
                                    <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4">
                                        Shipping Logistics
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-500">Package Weight:</span>
                                            <span className="font-semibold text-slate-700 dark:text-slate-300">
                                                185 lbs
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-500">Service:</span>
                                            <span className="font-semibold text-slate-700 dark:text-slate-300">
                                                LTL Freight
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-500">Fragile Level:</span>
                                            <span className="px-2 py-0.5 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-[10px] font-bold rounded-full uppercase">
                                                Very High
                                            </span>
                                        </div>
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

export default VendorOrderDetails;
