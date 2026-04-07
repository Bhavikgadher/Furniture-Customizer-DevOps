import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Vendor Customization Configuration Page
 *
 * Product configurator for "Mid-Century Modern Sofa" (SKU: MCM-782):
 * - Header (sticky z-50): chair icon, "FurniCustom Vendor", nav (Dashboard, Products active,
 *   Inventory, Orders), search SKU input, "Save Changes" CTA, user avatar
 * - Breadcrumb: Products > Configurator
 * - Page header: "Customization Configuration" (3xl font-black), SKU badge, product name,
 *   Live Preview + Version History buttons
 * - Category tabs: Materials & Textures (active), Color Palette, Dimensions & Sizing, Hardware Options
 * - Material Management table (5 cols): Material Name (inline edit), Texture Swatch (with hover edit),
 *   Price Multiplier (inline edit), Status toggle, Actions (delete)
 *   3 rows: Premium Oak (0%), Italian Velvet (+15%), Top-Grain Leather (+25%, disabled)
 *   "Add New Material Option" dashed button
 * - Color Variants card: 3 swatches (Obsidian Blue #2D3436, Blush Rose #E84393,
 *   Emerald Isle #00B894) + "Add Color" dashed card
 * - Sidebar (4-col):
 *   - Price Simulation (dark bg-slate-900): Base $1,299, Material +$194.85,
 *     Size +$350, MSRP $1,843.85, "Update Base Pricing" CTA
 *   - Variation Insights: Top Seller (green), Low Availability (amber)
 *   - Quick Tip: drag-and-drop reorder info
 * - Mobile floating action bar (lg:hidden): Discard + Save Changes
 *
 * Route: /vendor-configurator
 */

const MATERIALS = [
    {
        name: 'Premium Oak',
        multiplier: '0%',
        enabled: true,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgJxAnhm59a-4-HWcTcVV5le8z3bnUC8eJhnirbmCDF0K2VhTRyCWhETeP-brTuAEJCO-npmstAMsGFXW3_6aIOStnQJfDpkRCyRZ7YW7wo-mGKYpfcnpyLmmqtgfzkLLOfkf8AvpWA3naG6u8BrrcoDrDKHsOZhL0X1ONmNY2V1hzWR-hU0wmkgIGDzVfd6yxJ9pOI72ut9aoip6dUUUY7jCFO1PadxMpr5zQU3YBNWwc3brMJEIHvMkKdPx3eCK0y_CY4tsVgcdx',
        alt: 'Close up of high quality oak wood texture',
    },
    {
        name: 'Italian Velvet',
        multiplier: '15%',
        enabled: true,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWFUF977bNf28r9sY4myBZjXiDhveeOXzL3oEzu0230lSWBGAaxNy2GUuyqbVruYCtEU1gGiA6HOat626ya06vl822WVtnpsrDX2tTQVa12b1bc_UBSfFnDQ4nRuKlPcbwkHBlgN257FIGz9d-DPLnYntCTeQ1vdvqUH0qGalz5CoXefgBtEwYBVyn2b6hCkWsR36Rj12kVZh5-0LCPZbSNEBDCaCwfXVlB9cT9KoWkEpiP26EeXjLkHMJE6Ej2QeXNJhAFpvz7PrH',
        alt: 'Abstract soft velvet fabric texture in deep blue',
    },
    {
        name: 'Top-Grain Leather',
        multiplier: '25%',
        enabled: false,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbbGVjVMoEXGvbIz436t5o8Y1cmj1TZBSbf8iXJKkD2THQE7Vb4xUcd9PbAv-KOBgNQLcU_a9uOd_tyu8lApZpU4vI7s6zqDmF3fm-479gPrE3Slyt6tuYawWQ5l-wtiq6UWFitdYbkqL_elJ1Z2RV6wVF1epzpWRYMHTHMZvf4FK58sx9lNNRgYZ-MfF4Ij16PIK156jw90yyWziCrUvcBQA7SeRxoTHu-Bu7rPeNGAb9VJuC7pOg0qYe-HWFHjuVjQfvQa209Tln',
        alt: 'Brown textured leather surface close up',
    },
];

const COLOR_VARIANTS = [
    { name: 'Obsidian Blue', hex: '#2D3436' },
    { name: 'Blush Rose', hex: '#E84393' },
    { name: 'Emerald Isle', hex: '#00B894' },
];

const CATEGORY_TABS = [
    'Materials & Textures',
    'Color Palette',
    'Dimensions & Sizing',
    'Hardware Options',
];

const VendorConfigurator = () => {
    const [materials, setMaterials] = useState(MATERIALS);

    const toggleMaterial = (index) => {
        setMaterials((prev) =>
            prev.map((m, i) => (i === index ? { ...m, enabled: !m.enabled } : m))
        );
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3">
                <div className="max-w-[1440px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="bg-primary p-1.5 rounded-lg text-white">
                                <span className="material-symbols-outlined block">chair</span>
                            </div>
                            <h1 className="text-lg font-bold tracking-tight">
                                FurniCustom{' '}
                                <span className="font-normal text-slate-500">Vendor</span>
                            </h1>
                        </Link>
                        <nav className="hidden md:flex items-center gap-6">
                            <a
                                className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
                                href="#"
                            >
                                Dashboard
                            </a>
                            <a
                                className="text-sm font-medium text-primary border-b-2 border-primary pb-1 mt-1"
                                href="#"
                            >
                                Products
                            </a>
                            <a
                                className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
                                href="#"
                            >
                                Inventory
                            </a>
                            <a
                                className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
                                href="#"
                            >
                                Orders
                            </a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative hidden sm:block">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                                search
                            </span>
                            <input
                                className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm w-64 focus:ring-2 focus:ring-primary"
                                placeholder="Search SKU..."
                                type="text"
                            />
                        </div>
                        <button className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-all">
                            <span className="material-symbols-outlined text-sm">save</span>
                            Save Changes
                        </button>
                        <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 overflow-hidden">
                            <img
                                alt="User Profile"
                                className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBU8L72E817kXotME8mXyuCOVQE9DJAVtjbQZGHf90ECzjd6BqSx7XPMsQHA6gIN9oyh3uHfmZr6_DAxrQozhOJTZkuVZWtmiQxdM8fmSDdQjvXHYD3FtS3vuSdStQYItulZCN8sjk6FoFA5UTGo91hF9pR7UOMnqYe9Rfiz4oilIjeSYEG45Db3wdn1uPKB42bE9bYce2dqp7IlLT8KfDamUXuTGCjA57T1ltg1xYQLF6ygCVZiq9GZ79N_1eSmyHp2pea0DVbFwg7"
                            />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-[1440px] mx-auto p-6 lg:p-10">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                            <a className="hover:text-primary" href="#">
                                Products
                            </a>
                            <span className="material-symbols-outlined text-xs">chevron_right</span>
                            <span>Configurator</span>
                        </nav>
                        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
                            Customization Configuration
                        </h2>
                        <div className="flex items-center gap-3">
                            <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                                SKU: MCM-782
                            </span>
                            <p className="text-slate-500 font-medium">Product: Mid-Century Modern Sofa</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">
                            <span className="material-symbols-outlined text-lg">visibility</span>
                            Live Preview
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">
                            <span className="material-symbols-outlined text-lg">history</span>
                            Version History
                        </button>
                    </div>
                </div>

                {/* Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Configuration Cards */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Category Tabs */}
                        <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar">
                            {CATEGORY_TABS.map((tab, index) => (
                                <button
                                    key={tab}
                                    className={`px-6 py-3 text-sm font-bold whitespace-nowrap ${index === 0
                                            ? 'text-primary border-b-2 border-primary'
                                            : 'text-slate-500 hover:text-slate-700'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Materials Card */}
                        <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary">texture</span>
                                    <h3 className="font-bold text-lg">Material Management</h3>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined">filter_list</span>
                                    </button>
                                    <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined">reorder</span>
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 dark:bg-slate-800/50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                            <th className="px-6 py-4">Material Name</th>
                                            <th className="px-6 py-4">Texture Swatch</th>
                                            <th className="px-6 py-4">Price Multiplier</th>
                                            <th className="px-6 py-4 text-center">Status</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {materials.map((mat, index) => (
                                            <tr
                                                key={index}
                                                className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group"
                                            >
                                                <td className="px-6 py-4">
                                                    <input
                                                        className="bg-transparent border-none focus:ring-0 p-0 font-medium text-sm w-full"
                                                        type="text"
                                                        defaultValue={mat.name}
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="w-10 h-10 rounded-lg bg-slate-200 overflow-hidden relative group/swatch">
                                                        <img
                                                            alt={mat.alt}
                                                            className="w-full h-full object-cover"
                                                            src={mat.image}
                                                        />
                                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/swatch:opacity-100 transition-opacity cursor-pointer">
                                                            <span className="material-symbols-outlined text-white text-sm">
                                                                edit
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-slate-400 text-sm font-medium">+</span>
                                                        <input
                                                            className="w-16 bg-slate-100 dark:bg-slate-800 border-none rounded px-2 py-1 text-sm font-bold text-primary focus:ring-1 focus:ring-primary text-center"
                                                            type="text"
                                                            defaultValue={mat.multiplier}
                                                        />
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-center">
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input
                                                                checked={mat.enabled}
                                                                onChange={() => toggleMaterial(index)}
                                                                className="sr-only peer"
                                                                type="checkbox"
                                                            />
                                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                                                        </label>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="text-slate-400 hover:text-red-500 transition-colors">
                                                        <span className="material-symbols-outlined">delete</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800">
                                <button className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg text-slate-500 hover:text-primary hover:border-primary transition-all font-bold text-sm">
                                    <span className="material-symbols-outlined">add_circle</span>
                                    Add New Material Option
                                </button>
                            </div>
                        </section>

                        {/* Color Options Card */}
                        <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary">palette</span>
                                    <h3 className="font-bold text-lg">Color Variants</h3>
                                </div>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    Linked to Material: Italian Velvet
                                </span>
                            </div>
                            <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {COLOR_VARIANTS.map((color) => (
                                    <div
                                        key={color.hex}
                                        className="p-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-primary transition-colors cursor-pointer group"
                                    >
                                        <div
                                            className="w-full aspect-square rounded-lg mb-3 shadow-inner"
                                            style={{ backgroundColor: color.hex }}
                                        />
                                        <p className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                                            {color.name}
                                        </p>
                                        <p className="text-[10px] text-slate-500 font-mono">{color.hex}</p>
                                    </div>
                                ))}
                                <div className="p-3 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    <span className="material-symbols-outlined text-slate-300 text-3xl mb-1">
                                        add
                                    </span>
                                    <p className="text-[10px] font-bold text-slate-400">Add Color</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Sidebar */}
                    <aside className="lg:col-span-4 space-y-6">
                        {/* Price Calculator Panel */}
                        <div className="bg-slate-900 text-white rounded-xl p-6 sticky top-24 shadow-xl">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">
                                Price Simulation
                            </h4>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400">Base Unit Price</span>
                                    <span className="font-mono font-medium">$1,299.00</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400">Selected Material (+15%)</span>
                                    <span className="text-primary font-bold">+$194.85</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400">Selected Size (XL)</span>
                                    <span className="text-primary font-bold">+$350.00</span>
                                </div>
                                <div className="pt-4 border-t border-slate-800 flex justify-between items-end">
                                    <span className="text-slate-400 text-sm font-bold uppercase">
                                        Estimated MSRP
                                    </span>
                                    <span className="text-3xl font-black">$1,843.85</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <p className="text-[11px] text-slate-500 italic">
                                    This is an estimated customer-facing price based on your current multipliers
                                    and the base product cost.
                                </p>
                                <button className="w-full py-3 bg-primary hover:bg-blue-600 transition-colors rounded-lg font-bold text-sm">
                                    Update Base Pricing
                                </button>
                            </div>
                        </div>

                        {/* Product Insights */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
                                Variation Insights
                            </h4>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg text-green-600">
                                        <span className="material-symbols-outlined">trending_up</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">Top Seller Combination</p>
                                        <p className="text-xs text-slate-500">
                                            Premium Oak + Obsidian Blue is currently trending in 84% of orders.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg text-amber-600">
                                        <span className="material-symbols-outlined">warning</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">Low Availability</p>
                                        <p className="text-xs text-slate-500">
                                            Top-Grain Leather stock is currently below 15 units.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Help */}
                        <div className="p-6 bg-primary/5 rounded-xl border border-primary/10">
                            <div className="flex items-center gap-2 text-primary mb-2">
                                <span className="material-symbols-outlined text-sm">info</span>
                                <h5 className="text-sm font-bold">Quick Tip</h5>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                Drag and drop materials to reorder them. The top-most active material will be
                                the default selected option for customers.
                            </p>
                        </div>
                    </aside>
                </div>
            </main>

            {/* Floating Action Bar (Mobile/Tablets) */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 flex gap-3 z-40">
                <button className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-bold">
                    Discard
                </button>
                <button className="flex-1 py-3 bg-primary text-white rounded-lg text-sm font-bold">
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default VendorConfigurator;
