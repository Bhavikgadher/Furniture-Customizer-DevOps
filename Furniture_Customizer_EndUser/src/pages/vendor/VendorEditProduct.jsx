import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Vendor Edit Product Page
 *
 * Product editing form for "Nordic Lounge Chair":
 * - Header (sticky z-50): chair icon (primary), breadcrumb (Products > Edit Product),
 *   product title, Discard + Save Changes buttons
 * - Tabs: General Info (active), Pricing & Inventory, Shipping, Variants
 * - Product Media: 3 images with hover overlay (edit/delete), upload button, "Main" badge
 * - General Information: Product Name, SKU, Description textarea (pre-filled)
 * - Pricing & Tax: Base Price $599, Discounted $499, Tax Class select
 * - Sidebar:
 *   - Product Status: "Active" badge, toggle switch "Visible on Store"
 *   - Organization: Category select (Seating), Tags (Scandinavian, Minimalist) with remove
 *   - Inventory Status: 42 Units, 70% stock bar, Low Stock Alert input
 *   - Danger Zone: "Archive Product" red button
 * - Success toast (hidden by default)
 *
 * Route: /vendor-edit-product
 */

const MEDIA_IMAGES = [
    {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAL56_BFWwnmzpad4SUB4F5P9Tmq7rzPlPnJL3u--zXVg4Liksv44dMUJ5TEqELbJxT_zje-nNUaU03K_9sozixn8YdIwCjD5HHax6ZgArP3Ux6iCbvcrVg717w16nPMmOXLB_wR2NBxVjnZtmZr2DfFRPiRm-4NxBiZPXcoF0nOA0KpktUWzsby0P4wGiTJ7WRm3wTq8Ftg-3I9Eb-l30mRdPiivuDpANU4BXW1UZ5Y6eqsSQz4zrbtzAFd3D2gXyBK8YQUW0xAkvR',
        alt: 'Modern Nordic wooden lounge chair main view',
        isMain: true,
    },
    {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAw-XtapuWmAtPaP1DnbdPYVGLpJqKF1tQOJjR2J_xOCeZjv-2G_zoBFmNOLsP4HQvFlDZjuwP5Tkvr013cjeVUctP06JS-uE7B3MycjohF6IX4t52xPgUrHIEom6aWg-XGXKZei-CZBL3HWncSs5KcuSoJmlWoXShMD0cVh9m0vTc4C5Q7A0PemoQgJSkGUZSaut4mkhXIOSjqpzZr7hE7jgQMPZ6cxZUTL-jsAXCLu-KJy7sBdKYSeEyIHaYnW-s3LmwmvQ34vaCy',
        alt: 'Side profile of Nordic lounge chair',
        isMain: false,
    },
    {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjmW7gdV8JicjGkfSG9iBQ9NNDt2VLxSdTZVsqcXcvNBXzuAcfYDjJLr-W0c98jOldSAQcJYEMvJCbfaGK1BibvFwNDDnh_ROCeP9bHigIB27TDjzc6ob1SfBlShzloTdvK-zv1F1zpBN6ugfIF86GesM1Of_fSWQ0IVZfNjcuUfUaZe9-yWDJK4cZP6SOCGItWC1t8iivR8slWPNXB4OJxwzXHw_kOrOKO7g-SkgU1ic6xBtCDKYzOQQOnNCv-M-F6WHDLPuL3c2R',
        alt: 'Detailed texture of lounge chair fabric',
        isMain: false,
    },
];

const TABS = ['General Info', 'Pricing & Inventory', 'Shipping', 'Variants'];

const VendorEditProduct = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [tags, setTags] = useState(['Scandinavian', 'Minimalist']);

    const removeTag = (tagToRemove) => {
        setTags((prev) => prev.filter((t) => t !== tagToRemove));
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
            {/* Top Navigation Bar (Sticky) */}
            <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="text-primary">
                        <span className="material-symbols-outlined text-3xl">chair</span>
                    </div>
                    <div>
                        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
                            <a className="hover:text-primary" href="#">
                                Products
                            </a>
                            <span className="material-symbols-outlined text-sm">chevron_right</span>
                            <span className="text-slate-900 dark:text-slate-200">Edit Product</span>
                        </nav>
                        <h1 className="text-xl font-bold leading-tight">Nordic Lounge Chair</h1>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 text-sm font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors">
                        Discard
                    </button>
                    <button className="px-6 py-2 text-sm font-semibold rounded-lg bg-primary text-white hover:bg-primary/90 shadow-sm transition-all">
                        Save Changes
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Navigation Tabs */}
                        <div className="border-b border-slate-200 dark:border-slate-800">
                            <nav className="flex gap-8">
                                {TABS.map((tab, index) => (
                                    <a
                                        key={tab}
                                        className={`pb-4 border-b-2 font-semibold text-sm ${index === 0
                                                ? 'border-primary text-primary'
                                                : 'border-transparent text-slate-500 hover:text-slate-700'
                                            }`}
                                        href="#"
                                    >
                                        {tab}
                                    </a>
                                ))}
                            </nav>
                        </div>

                        {/* Product Media Section */}
                        <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold">Product Media</h2>
                                <button className="text-primary text-sm font-semibold flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">add_circle</span> Add Media
                                </button>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {MEDIA_IMAGES.map((img, index) => (
                                    <div
                                        key={index}
                                        className="relative aspect-square group rounded-lg overflow-hidden border border-slate-200"
                                    >
                                        <img
                                            className="w-full h-full object-cover"
                                            alt={img.alt}
                                            src={img.src}
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <button className="p-2 bg-white rounded-full text-slate-900 shadow-lg">
                                                <span className="material-symbols-outlined text-lg">edit</span>
                                            </button>
                                            <button className="p-2 bg-white rounded-full text-red-600 shadow-lg">
                                                <span className="material-symbols-outlined text-lg">delete</span>
                                            </button>
                                        </div>
                                        {img.isMain && (
                                            <span className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-white text-[10px] font-bold rounded uppercase">
                                                Main
                                            </span>
                                        )}
                                    </div>
                                ))}
                                <button className="aspect-square border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg flex flex-col items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all">
                                    <span className="material-symbols-outlined text-3xl">upload_file</span>
                                    <span className="text-xs font-medium mt-2">Upload New</span>
                                </button>
                            </div>
                        </section>

                        {/* Basic Information Section */}
                        <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                            <h2 className="text-lg font-bold">General Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        Product Name
                                    </label>
                                    <input
                                        className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary"
                                        type="text"
                                        defaultValue="Nordic Lounge Chair"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        SKU
                                    </label>
                                    <input
                                        className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary"
                                        type="text"
                                        defaultValue="FURN-NLC-001"
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        Description
                                    </label>
                                    <textarea
                                        className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary"
                                        rows="4"
                                        defaultValue="The Nordic Lounge Chair is a masterpiece of minimalist design. Crafted with sustainably sourced oak and premium charcoal fabric, it offers both ergonomic comfort and a timeless aesthetic. Perfect for living rooms, studies, or reading nooks. Dimensions: 85cm x 72cm x 75cm."
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Pricing Section */}
                        <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                            <h2 className="text-lg font-bold">Pricing &amp; Tax</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        Base Price
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                            $
                                        </span>
                                        <input
                                            className="w-full pl-8 rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary"
                                            type="number"
                                            defaultValue="599.00"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        Discounted Price
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                            $
                                        </span>
                                        <input
                                            className="w-full pl-8 rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary"
                                            type="number"
                                            defaultValue="499.00"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        Tax Class
                                    </label>
                                    <select className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary">
                                        <option>Standard 20%</option>
                                        <option>Reduced 5%</option>
                                        <option>Zero Tax</option>
                                    </select>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Status Card */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold">Product Status</h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full uppercase">
                                        Active
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-background-light dark:bg-slate-800 rounded-lg">
                                <span className="text-sm font-medium">Visible on Store</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        checked={isVisible}
                                        onChange={() => setIsVisible(!isVisible)}
                                        className="sr-only peer"
                                        type="checkbox"
                                    />
                                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                                </label>
                            </div>
                            <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                                This product is currently visible to customers in your storefront and searchable on
                                global marketplaces.
                            </p>
                        </div>

                        {/* Organization Card */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                            <h3 className="font-bold">Organization</h3>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    Category
                                </label>
                                <select className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary">
                                    <option>Seating</option>
                                    <option>Tables</option>
                                    <option>Living Room</option>
                                    <option>Office Furniture</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    Tags
                                </label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium"
                                        >
                                            {tag}{' '}
                                            <button
                                                onClick={() => removeTag(tag)}
                                                className="ml-1 material-symbols-outlined text-[14px]"
                                            >
                                                close
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <input
                                    className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm focus:ring-primary focus:border-primary"
                                    placeholder="Add tag..."
                                    type="text"
                                />
                            </div>
                        </div>

                        {/* Inventory Management */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                            <h3 className="font-bold">Inventory Status</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Current Stock</span>
                                    <span className="font-bold text-slate-900 dark:text-slate-100">42 Units</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                                    <div
                                        className="bg-primary h-2 rounded-full"
                                        style={{ width: '70%' }}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase text-slate-500">
                                        Low Stock Alert
                                    </label>
                                    <input
                                        className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary"
                                        type="number"
                                        defaultValue="10"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Danger Zone */}
                        <div className="p-4 rounded-xl border border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-900/30">
                            <button className="w-full flex items-center justify-center gap-2 text-red-600 font-bold text-sm">
                                <span className="material-symbols-outlined text-lg">delete</span>
                                Archive Product
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default VendorEditProduct;
