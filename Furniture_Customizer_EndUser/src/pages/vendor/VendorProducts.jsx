import { Link } from 'react-router-dom';

/**
 * Vendor Product Management Page
 *
 * Full product inventory listing with:
 * - Header (sticky z-50): chair icon + "FurniCustom", nav (Dashboard, Products active
 *   with border-b-2 border-primary, Orders, Analytics), global search, "Add New Product"
 *   CTA (primary), user avatar
 * - Page header: "Product Inventory" (3xl font-black), subtitle, Export CSV + More Filters buttons
 * - Filters card: search input (search icon), Category select (All/Living Room/Bedroom/Office/Outdoor),
 *   status tabs (All active / Live / Draft / Out of Stock)
 * - Product table (7 cols): checkbox, Product (thumbnail + name + SKU), Category, Inventory
 *   (stock count + progress bar), Price (with optional strikethrough), Status badge, Actions (edit/view/delete)
 * - 4 product rows:
 *   1. Nordic Velvet Sofa — Living Room — 24 in stock (70% primary) — $899 / ~$1,200~ — Live (green)
 *   2. Scandi Work Desk — Office — 0 in stock (0% red) — $349 — Out of Stock (red)
 *   3. Industrial Floor Lamp — Lighting — 112 in stock (100% primary) — $125 — Draft (slate)
 *   4. Heritage Linen Chair — Living Room — 5 in stock (15% orange) — $450 — Live (green)
 * - Pagination: "1 to 10 of 142", page buttons (1 active, 2, 3, ..., 15)
 * - Footer: © 2024, Help Center / Terms / API Status
 *
 * Route: /vendor-products
 */

const PRODUCTS = [
    {
        name: 'Nordic Velvet Sofa',
        sku: 'FUR-001-GR',
        category: 'Living Room',
        stock: 24,
        stockLabel: '24 in stock',
        stockPercent: 70,
        stockColor: 'bg-primary',
        price: '$899.00',
        oldPrice: '$1,200.00',
        status: 'Live',
        statusColor: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
        visibilityIcon: 'visibility',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBK14byjngccDPxko-HSoZcQAQTeO9vS5uJknIxYbmC0TgJmcVVoBRSxiGvG0Q2HOAvr1OgR3g5Rjn2IkDDmIe3e6r7QZc1PwPpCKVkJQkYy1zo6X7Pzc6sqPkKDKlG_79swP2GAv8l_UVOSW4H98q-tlU4KfsWYkvj197AMuoxNFaOMACyBjJG2gn7uyLXV0O76qz7wYrcE_1rHmtD0d4A2wew0hoswvovgau56Ude6P1vGU5fHbpPr3_mQJsQiATxP_YXdhWXVYMh',
        alt: 'Modern green sofa thumbnail',
    },
    {
        name: 'Scandi Work Desk',
        sku: 'FUR-042-WD',
        category: 'Office',
        stock: 0,
        stockLabel: '0 in stock',
        stockPercent: 0,
        stockColor: 'bg-red-500',
        price: '$349.00',
        oldPrice: null,
        status: 'Out of Stock',
        statusColor: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
        visibilityIcon: 'visibility_off',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDfcpmrDBFaYQEj7osHG9dNVnqEjL0DwEVHsl09k_ghOGagF_AXe3YYpEGK1Sjc9C7jhpxfADYppRSypSjjaBVRaAu2cEEtePTvE-rEuRBLp_1FNvf6z4USyl3VuZeZslZACuFX6p8JVLWeh6Rj4HxY7MH4he9RtStoOjRyWk0uz86nKXBu9DXlCS4x9c61hENzx0yfQHoXrqz3x67oOILxh-XOE6KtO2fskNDOJwuWlKb79X0d0QPBNTrmGx29U1pAjVYBquf4czkt',
        alt: 'Minimalist wooden desk thumbnail',
    },
    {
        name: 'Industrial Floor Lamp',
        sku: 'LGT-012-IL',
        category: 'Lighting',
        stock: 112,
        stockLabel: '112 in stock',
        stockPercent: 100,
        stockColor: 'bg-primary',
        price: '$125.00',
        oldPrice: null,
        status: 'Draft',
        statusColor: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
        visibilityIcon: 'visibility',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDKxTVQny575lWsy_6xLi__vPU7NwjMx-uG_uCGtm3nbws1QB5XQOQ4vsOmuYR0IngPWNtQq5_fUYkbzR7vQCIU5GThUJ7_PydiRtwTAtOaGcd7oMIwpZYzAqLJjfGBlbmzTJqLj7X50ZHZe56RXYDZ1SrdTABLekzc1ifTAiiS8HcGh4NSuQWCPeqZRNDjg7xqfq5qwvLkAXNpyfJa3MiBR5V9VQe00da91hvckZzbFv4_1OUWj1n-j5amshV6wlPVjThknypyy4Jg',
        alt: 'Industrial floor lamp thumbnail',
    },
    {
        name: 'Heritage Linen Chair',
        sku: 'FUR-882-LC',
        category: 'Living Room',
        stock: 5,
        stockLabel: '5 in stock',
        stockPercent: 15,
        stockColor: 'bg-orange-400',
        price: '$450.00',
        oldPrice: null,
        status: 'Live',
        statusColor: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
        visibilityIcon: 'visibility',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDIQTxu3ISKCScfTAFlcYtbEvt-I0pe0_aH7VXR3OYycr6npHObzCebRaoxQD89E1I_PgznYfL-hdgmYK1G9-42sl0E1ON4aWkjW4kTfbUHHVrT3bxOkHcDraKyMKkecGffWt4KbdqP36I7025Hs8R3GaVQHJpylBgpV41Ki9wIsKTGcoNyMtk0DjLJV5V2kKCLPPsWI4JULJ5kpkkWx5ZVIlnUx5xRIIXIClBvMnWXs4acUiC3xCbA_Rkpzu-xW7Y1tSKm5QMSgYoT',
        alt: 'Linen armchair thumbnail',
    },
];

const NAV_ITEMS = [
    { label: 'Dashboard', active: false, href: '/vendor-dashboard' },
    { label: 'Products', active: true, href: '/vendor-products' },
    { label: 'Orders', active: false, href: '/vendor-orders' },
    { label: 'Analytics', active: false, href: '/vendor-analytics' },
];

const STATUS_TABS = ['All', 'Live', 'Draft', 'Out of Stock'];

const PAGINATION_PAGES = [1, 2, 3, '...', 15];

const VendorProducts = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
            <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    {/* Top Navigation Bar */}
                    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 sticky top-0 z-50">
                        <div className="flex items-center gap-8">
                            <Link to="/home" className="flex items-center gap-2 text-primary">
                                <span className="material-symbols-outlined text-3xl font-bold">chair</span>
                                <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em]">
                                    FurniCustom
                                </h2>
                            </Link>
                            <nav className="hidden md:flex items-center gap-6">
                                {NAV_ITEMS.map((item) => (
                                    <Link
                                        key={item.label}
                                        className={
                                            item.active
                                                ? 'text-primary text-sm font-semibold border-b-2 border-primary py-4'
                                                : 'text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors'
                                        }
                                        to={item.href}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:block">
                                <label className="flex flex-col min-w-40 !h-10 max-w-64">
                                    <div className="flex w-full flex-1 items-stretch rounded-lg h-full overflow-hidden border border-slate-200 dark:border-slate-700">
                                        <div className="text-slate-400 flex bg-slate-50 dark:bg-slate-800 items-center justify-center pl-3">
                                            <span className="material-symbols-outlined text-xl">search</span>
                                        </div>
                                        <input
                                            className="form-input flex w-full min-w-0 flex-1 border-none bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-0 placeholder:text-slate-400 px-3 text-sm"
                                            placeholder="Global search..."
                                        />
                                    </div>
                                </label>
                            </div>
                            <Link className="flex min-w-[40px] h-10 px-4 items-center justify-center rounded-lg bg-primary text-white text-sm font-bold tracking-[0.015em] hover:bg-primary/90 transition-colors" to="/vendor-add-product">
                                <span className="material-symbols-outlined text-xl mr-2">add</span>
                                <span className="truncate">Add New Product</span>
                            </Link>
                            <div
                                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20"
                                style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuChrGjIzl2iPipMHrUtldYkHN5Bb6tt46RjTLkv73bLYuLfDtFLAvpcmRdYLDHAe1N8VbvWP0txvYzUElWChLwCQvAVuxW37_9zZw-xQaq6EnRrZgi7_C4NR46LFJYbSLC_-j7QZ4Hw68L2aUz4wgEUag5Tb7ucbocVCF7CIASp5s6YOfTUvRiaUshd0gnL0OO7wdUUptIxIGTj2GG8QcVWlNSENWSTwc_obBxxCsZcPTtYLMR2i24wBz6Xc4v0nMa-QohxJe2KaIeP")',
                                }}
                            />
                        </div>
                    </header>

                    <main className="flex-1 px-4 md:px-10 lg:px-20 py-8">
                        {/* Page Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                            <div>
                                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                    Product Inventory
                                </h1>
                                <p className="text-slate-500 dark:text-slate-400 mt-1">
                                    Manage your furniture catalog, stock levels, and store visibility.
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button className="flex items-center justify-center gap-2 px-4 h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 text-sm font-semibold hover:bg-slate-50 transition-colors">
                                    <span className="material-symbols-outlined text-lg">download</span>
                                    Export CSV
                                </button>
                                <button className="flex items-center justify-center gap-2 px-4 h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 text-sm font-semibold hover:bg-slate-50 transition-colors">
                                    <span className="material-symbols-outlined text-lg">filter_list</span>
                                    More Filters
                                </button>
                            </div>
                        </div>

                        {/* Filters Area */}
                        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 mb-6 flex flex-col lg:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative group">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                                        search
                                    </span>
                                    <input
                                        className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                                        placeholder="Search by product name, SKU, or tag..."
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-primary/20 py-2 pl-3 pr-10">
                                    <option>All Categories</option>
                                    <option>Living Room</option>
                                    <option>Bedroom</option>
                                    <option>Office</option>
                                    <option>Outdoor</option>
                                </select>
                                <div className="flex bg-slate-50 dark:bg-slate-800 p-1 rounded-lg border border-slate-100 dark:border-slate-700">
                                    {STATUS_TABS.map((tab, index) => (
                                        <button
                                            key={tab}
                                            className={`px-4 py-1.5 text-xs rounded-md ${index === 0
                                                    ? 'font-bold bg-white dark:bg-slate-700 text-primary shadow-sm'
                                                    : 'font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                                }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Product Table */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                            <th className="p-4 w-10">
                                                <input
                                                    className="rounded border-slate-300 text-primary focus:ring-primary"
                                                    type="checkbox"
                                                />
                                            </th>
                                            <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                                Product
                                            </th>
                                            <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                                Category
                                            </th>
                                            <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                                Inventory
                                            </th>
                                            <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                                Price
                                            </th>
                                            <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                                Status
                                            </th>
                                            <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {PRODUCTS.map((product, index) => (
                                            <tr
                                                key={index}
                                                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors"
                                            >
                                                <td className="p-4">
                                                    <input
                                                        className="rounded border-slate-300 text-primary focus:ring-primary"
                                                        type="checkbox"
                                                    />
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className="size-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex-shrink-0 bg-cover bg-center"
                                                            style={{
                                                                backgroundImage: `url('${product.image}')`,
                                                            }}
                                                        />
                                                        <div>
                                                            <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                                                {product.name}
                                                            </div>
                                                            <div className="text-xs text-slate-500 uppercase">
                                                                SKU: {product.sku}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-sm text-slate-600 dark:text-slate-400">
                                                    {product.category}
                                                </td>
                                                <td className="p-4">
                                                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                                        {product.stockLabel}
                                                    </div>
                                                    <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                                                        <div
                                                            className={`${product.stockColor} h-full rounded-full`}
                                                            style={{ width: `${product.stockPercent}%` }}
                                                        />
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                                        {product.price}
                                                    </div>
                                                    {product.oldPrice && (
                                                        <div className="text-xs text-slate-400 line-through">
                                                            {product.oldPrice}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="p-4">
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${product.statusColor}`}
                                                    >
                                                        {product.status}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-right">
                                                    <div className="flex justify-end gap-1">
                                                        <Link className="p-2 text-slate-400 hover:text-primary transition-colors" to="/vendor-edit-product">
                                                            <span className="material-symbols-outlined text-lg">edit</span>
                                                        </Link>
                                                        <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                                                            <span className="material-symbols-outlined text-lg">
                                                                {product.visibilityIcon}
                                                            </span>
                                                        </button>
                                                        <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                                                            <span className="material-symbols-outlined text-lg">delete</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="px-4 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 dark:border-slate-800 gap-4">
                                <div className="text-sm text-slate-500 dark:text-slate-400">
                                    Showing{' '}
                                    <span className="font-bold text-slate-900 dark:text-slate-100">1</span> to{' '}
                                    <span className="font-bold text-slate-900 dark:text-slate-100">10</span> of{' '}
                                    <span className="font-bold text-slate-900 dark:text-slate-100">142</span>{' '}
                                    products
                                </div>
                                <div className="flex items-center gap-1">
                                    <button className="flex items-center justify-center size-9 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 transition-colors">
                                        <span className="material-symbols-outlined">chevron_left</span>
                                    </button>
                                    {PAGINATION_PAGES.map((page, index) =>
                                        page === '...' ? (
                                            <span key={index} className="px-2 text-slate-400">
                                                ...
                                            </span>
                                        ) : (
                                            <button
                                                key={index}
                                                className={`flex items-center justify-center size-9 rounded-lg font-medium text-sm transition-colors ${page === 1
                                                        ? 'bg-primary text-white font-bold'
                                                        : 'border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        )
                                    )}
                                    <button className="flex items-center justify-center size-9 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 transition-colors">
                                        <span className="material-symbols-outlined">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* Bottom Footer */}
                    <footer className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-auto">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
                            <p>© 2024 FurniCustom Vendor Dashboard. All rights reserved.</p>
                            <div className="flex gap-6">
                                <a className="hover:text-primary" href="#">
                                    Help Center
                                </a>
                                <a className="hover:text-primary" href="#">
                                    Terms of Service
                                </a>
                                <a className="hover:text-primary" href="#">
                                    API Status
                                </a>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default VendorProducts;
