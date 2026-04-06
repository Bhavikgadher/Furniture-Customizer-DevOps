import { Link } from 'react-router-dom';

/**
 * Vendor Inventory Page
 *
 * Raw Material Inventory management:
 * - Header (sticky z-50): inventory_2 icon (bg-primary), "FurnitureERP",
 *   nav (Inventory active border-b-2), notifications + settings, user info, avatar
 * - Page Header: "Stock Management" (primary uppercase tracking-wider),
 *   "Raw Material Inventory" (4xl font-black), "Add New Material" CTA
 * - 4 KPI cards:
 *   - Total SKUs 1,284 (+2.4% emerald)
 *   - Low Stock Alerts 12 items (+5% amber, border-l-4 amber-400)
 *   - Inventory Value $425,000 (-1.2% rose)
 *   - Active Shipments 8 Orders (On Time emerald)
 * - Utility bar: search, category select, Advanced Filters, Export
 * - Table (7 cols): checkbox, Material Name (with swatch), Category (badge),
 *   Current Quantity (with progress bar), Unit Cost, Supplier (with lead time), Actions
 *   4 rows: Oak Wood (75% emerald), Velvet Navy (15% rose LOW STOCK bg-rose-50/30),
 *   Steel Frame (45% emerald), Brass Knobs (90% emerald)
 * - Pagination: 1-10 of 1,284, pages 1(active)/2/3.../129
 * - Bulk Action float bar (hidden by default)
 *
 * Route: /vendor-inventory
 */

const STATS = [
    {
        icon: 'inventory',
        iconBg: 'bg-primary/10 text-primary',
        label: 'Total SKUs',
        value: '1,284',
        change: '+2.4%',
        changeColor: 'text-emerald-500 bg-emerald-50',
        extraBorder: '',
    },
    {
        icon: 'report_problem',
        iconBg: 'bg-amber-100 text-amber-600',
        label: 'Low Stock Alerts',
        value: '12 items',
        change: '+5%',
        changeColor: 'text-amber-600 bg-amber-50',
        extraBorder: 'border-l-4 border-l-amber-400',
    },
    {
        icon: 'payments',
        iconBg: 'bg-primary/10 text-primary',
        label: 'Inventory Value',
        value: '$425,000',
        change: '-1.2%',
        changeColor: 'text-rose-500 bg-rose-50',
        extraBorder: '',
    },
    {
        icon: 'local_shipping',
        iconBg: 'bg-primary/10 text-primary',
        label: 'Active Shipments',
        value: '8 Orders',
        change: 'On Time',
        changeColor: 'text-emerald-500 bg-emerald-50',
        extraBorder: '',
    },
];

const MATERIALS = [
    {
        name: 'Oak Wood Plank',
        sku: 'SKU: WD-OK-2024',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkRIxI_1JLOtBy7s-ANadujN-RsVhMBiI4gFep--P1LcPLzPc6B2luALPhN2-oNmSGyQeoq-r243VZ6G9zVXOHUpedQHPHUufKFW3U8j5baW9wy9Kx22UpHThEuF6U_YEebIwM6wjG9aKEM8qUJ7RMm0_xDDvUUTLMKiP427Pdg-SNkPttlDvhZz789s3xgaUvLVpleT5ilwUa5WJ8PHrUvvVASsNWZJO82V4X_aN0HVlQa2u6Ajz1RNxLtVGNCQc5-pn6gNOYI8Li',
        category: 'Wood',
        categoryColor: 'bg-amber-100 text-amber-700',
        quantity: '450 sq ft',
        quantityColor: 'text-slate-900 dark:text-slate-100',
        barPercent: '75%',
        barColor: 'bg-emerald-500',
        cost: '$12.00',
        supplier: 'North Timber Co.',
        supplierNote: 'Lead time: 5 days',
        supplierNoteColor: 'text-slate-500',
        rowBg: '',
        isLowStock: false,
    },
    {
        name: 'Velvet Fabric - Navy',
        sku: 'SKU: FB-VV-NVY',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT1o47aHZEwQaXAbTetUoRJgolZGeRFOcn60Ey5repE-hRPAECxUTgKtobBS1RlDit45DZCi13kKK0J8YWemQRRYvMbnymp-pqz_0YjH2BBp0Zex9kzpB3TT4y5LEb9YajYSIXeRu7GO2RdmVstKiz7MRzV28gbddfeVGUnc8WS30NBJfCSS2KiFeT9bDdV0F5jZFnc6xahqY1QoXKjnTF_YXO8N_Qv1XhzeT8fsOwb9QL6gd-zYIe-kCMzVZNdFqw84Tdr_IlmvAI',
        category: 'Fabric',
        categoryColor: 'bg-indigo-100 text-indigo-700',
        quantity: '12 yards',
        quantityColor: 'font-bold text-rose-600',
        barPercent: '15%',
        barColor: 'bg-rose-500',
        cost: '$25.00',
        supplier: 'Elite Textiles',
        supplierNote: 'Critical restock',
        supplierNoteColor: 'text-rose-500 font-medium',
        rowBg: 'bg-rose-50/30 dark:bg-rose-900/10',
        isLowStock: true,
    },
    {
        name: 'Steel Frame - Chair',
        sku: 'SKU: MT-ST-CH',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkgpt-QPKOBxJa06XdAXjXZroITQX_VXmSJSe0WnLxoP4LeiVjyR7KTIXbGzQzZCk_rEEmx33vjweY2YDrJ5DeF00WwHMhcwvv6B3IdwWORDN1gUmFT3irYOJt5uGtkF0UcIhzRusE37Tly4QbVjSjr1a7ngexhsh5xWTG3OjdLQUXa1fuHYT-rVQyE-b1fEoUHCGjPjPxu5n7YBV0EvbWQ5FWOpNLNn4AKsUhGaVT-IWw6aRB6ndwgQYh7VVo3WnbISz1ru1-iWaq',
        category: 'Metal',
        categoryColor: 'bg-slate-100 text-slate-700',
        quantity: '115 units',
        quantityColor: 'text-slate-900 dark:text-slate-100',
        barPercent: '45%',
        barColor: 'bg-emerald-500',
        cost: '$45.00',
        supplier: 'Industrial Forges',
        supplierNote: 'Bulk discount applied',
        supplierNoteColor: 'text-slate-500',
        rowBg: '',
        isLowStock: false,
    },
    {
        name: 'Brass Knobs (10pk)',
        sku: 'SKU: HW-BR-KNB',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6GfeHrn6xiYDzWqBoL03pcE53MjYhtdhialXjUz58BhZJty5WdjoCWDlPQcp5klV1LRnh3fLhI0zuLN2MScybbshlQ4Oq44vQ5GaizQnVeAJ9iLH0TRUIblRS-EsmCRhs_UWA5KpWkZND9UD2frkQXGdB2oxLH85dhmuY_sKZne90LbWQWl2Tv2r6n55j98PkybsOvj8h4GammTZ_tIXqfAUyu6doTsYMObU8xdPh8HR1iv9z2YNO8PaSXaVxe-5hBl-RBKKe5LOQ',
        category: 'Hardware',
        categoryColor: 'bg-orange-100 text-orange-700',
        quantity: '850 pkgs',
        quantityColor: 'text-slate-900 dark:text-slate-100',
        barPercent: '90%',
        barColor: 'bg-emerald-500',
        cost: '$8.50',
        supplier: 'Global Fittings Ltd.',
        supplierNote: 'International supplier',
        supplierNoteColor: 'text-slate-500',
        rowBg: '',
        isLowStock: false,
    },
];

const VendorInventory = () => {
    return (
        <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
            <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    {/* Header */}
                    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 lg:px-10 py-3 sticky top-0 z-50">
                        <div className="flex items-center gap-8">
                            <Link to="/" className="flex items-center gap-4 text-primary">
                                <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                                    <span className="material-symbols-outlined">inventory_2</span>
                                </div>
                                <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em]">
                                    FurnitureERP
                                </h2>
                            </Link>
                            <nav className="hidden md:flex items-center gap-6">
                                <a className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" href="#">Dashboard</a>
                                <a className="text-primary text-sm font-semibold border-b-2 border-primary pb-1" href="#">Inventory</a>
                                <a className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" href="#">Suppliers</a>
                                <a className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" href="#">Orders</a>
                            </nav>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex gap-2">
                                <button className="flex items-center justify-center rounded-lg size-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                                    <span className="material-symbols-outlined text-[20px]">notifications</span>
                                </button>
                                <button className="flex items-center justify-center rounded-lg size-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                                    <span className="material-symbols-outlined text-[20px]">settings</span>
                                </button>
                            </div>
                            <div className="h-10 w-px bg-slate-200 dark:bg-slate-700 mx-2" />
                            <div className="flex items-center gap-3">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Alex Rivera</p>
                                    <p className="text-xs text-slate-500">Inventory Manager</p>
                                </div>
                                <div
                                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20"
                                    style={{
                                        backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuABcOqcxfoHYXl08LxWFE5SI1FDS1IQIX6pxk-_OKrk-RhUi64Hszn0LEGbP5qUCBDmBwzPgyLkOGrfhFpWKh5xC4uxcq6WPBA1xa-gUD5aM6vcYCLJPcd48cmIPiNruR5CcDpDm0R8nBL2-z_P4RjsnSHDWsfNG_i610IUYm4I9o4ZtwFX7jdRw31lMPtHVvPggTSt7KdUzlUQf436PLHk26AV6_Tdz9tiv6_7veap0_25PndGWqruBZ1Lg05qJp_6IAhMgn7oWRKX")`,
                                    }}
                                    role="img"
                                    aria-label="User profile picture of Alex Rivera"
                                />
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 px-4 lg:px-10 py-8 max-w-7xl mx-auto w-full">
                        {/* Page Header */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
                                    <span className="material-symbols-outlined text-sm">home_storage</span>
                                    Stock Management
                                </div>
                                <h1 className="text-slate-900 dark:text-slate-100 text-4xl font-black leading-tight tracking-tight">
                                    Raw Material Inventory
                                </h1>
                                <p className="text-slate-500 dark:text-slate-400 text-base max-w-xl">
                                    Monitor your furniture manufacturing stock levels, track unit costs across 1,284 individual SKUs.
                                </p>
                            </div>
                            <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg shadow-primary/20 active:scale-95">
                                <span className="material-symbols-outlined">add</span>
                                <span>Add New Material</span>
                            </button>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            {STATS.map((stat) => (
                                <div
                                    key={stat.label}
                                    className={`bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm ${stat.extraBorder}`}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                                            <span className="material-symbols-outlined">{stat.icon}</span>
                                        </div>
                                        <span className={`text-sm font-bold flex items-center ${stat.changeColor} px-2 py-0.5 rounded-full`}>
                                            {stat.change}
                                        </span>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.label}</p>
                                    <p className="text-slate-900 dark:text-slate-100 text-2xl font-black mt-1">{stat.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Table Section */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            {/* Utility Bar */}
                            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4">
                                <div className="relative flex-1">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                                    <input
                                        className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary text-sm transition-all"
                                        placeholder="Search materials, suppliers, or SKUs..."
                                        type="text"
                                    />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <div className="relative">
                                        <select className="appearance-none bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-4 pr-10 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-primary">
                                            <option>All Categories</option>
                                            <option>Wood</option>
                                            <option>Fabric</option>
                                            <option>Metal</option>
                                            <option>Hardware</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                            expand_more
                                        </span>
                                    </div>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 transition-all">
                                        <span className="material-symbols-outlined text-[18px]">filter_list</span>
                                        <span>Advanced Filters</span>
                                    </button>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 transition-all">
                                        <span className="material-symbols-outlined text-[18px]">file_download</span>
                                        <span>Export</span>
                                    </button>
                                </div>
                            </div>

                            {/* Data Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 dark:bg-slate-800/50">
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-10">
                                                <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
                                            </th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Material Name</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Current Quantity</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Unit Cost</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Supplier</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {MATERIALS.map((material) => (
                                            <tr key={material.sku} className={`group hover:bg-primary/5 transition-colors cursor-pointer ${material.rowBg}`}>
                                                <td className="px-6 py-4">
                                                    <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="size-10 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden border border-slate-200">
                                                            <div
                                                                className="w-full h-full bg-cover bg-center"
                                                                style={{ backgroundImage: `url('${material.image}')` }}
                                                                role="img"
                                                                aria-label={material.name}
                                                            />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-slate-900 dark:text-slate-100">{material.name}</p>
                                                            <p className="text-xs text-slate-500">{material.sku}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${material.categoryColor}`}>
                                                        {material.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-1">
                                                        <div className={`flex items-center gap-1.5 ${material.isLowStock ? '' : ''}`}>
                                                            <span className={`font-medium ${material.quantityColor}`}>{material.quantity}</span>
                                                            {material.isLowStock && (
                                                                <span className="material-symbols-outlined text-rose-600 text-sm">warning</span>
                                                            )}
                                                        </div>
                                                        <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                            <div className={`h-full ${material.barColor}`} style={{ width: material.barPercent }} />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-medium">{material.cost}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium">{material.supplier}</span>
                                                        <span className={`text-xs ${material.supplierNoteColor}`}>{material.supplierNote}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button className="p-1 hover:text-primary transition-colors">
                                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                                        </button>
                                                        <button className="p-1 hover:text-rose-500 transition-colors">
                                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                                <p className="text-sm text-slate-500">
                                    Showing <span className="font-semibold text-slate-900 dark:text-slate-100">1</span> to{' '}
                                    <span className="font-semibold text-slate-900 dark:text-slate-100">10</span> of{' '}
                                    <span className="font-semibold text-slate-900 dark:text-slate-100">1,284</span> entries
                                </p>
                                <div className="flex items-center gap-2">
                                    <button className="flex items-center justify-center size-8 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 transition-all" disabled>
                                        <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                                    </button>
                                    <button className="flex items-center justify-center size-8 rounded bg-primary text-white font-bold text-xs">1</button>
                                    <button className="flex items-center justify-center size-8 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium">2</button>
                                    <button className="flex items-center justify-center size-8 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium">3</button>
                                    <span className="text-slate-400">...</span>
                                    <button className="flex items-center justify-center size-8 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium">129</button>
                                    <button className="flex items-center justify-center size-8 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Bulk Action Float (hidden by default) */}
                        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-6 z-40 hidden">
                            <span className="text-sm font-medium">3 items selected</span>
                            <div className="flex gap-4">
                                <button className="text-sm hover:text-primary font-bold flex items-center gap-1 transition-colors">
                                    <span className="material-symbols-outlined text-sm">edit</span> Bulk Edit
                                </button>
                                <button className="text-sm hover:text-rose-400 font-bold flex items-center gap-1 transition-colors">
                                    <span className="material-symbols-outlined text-sm">delete</span> Delete
                                </button>
                            </div>
                            <button className="p-1 hover:bg-white/10 rounded-full transition-all">
                                <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default VendorInventory;
