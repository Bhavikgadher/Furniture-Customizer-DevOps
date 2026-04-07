import { Link } from 'react-router-dom';

/**
 * Vendor Add Product Page (Step 1: Basic Info)
 *
 * 3-column layout (3 / 6 / 3):
 * - Header: chair logo, "FurniCustom Vendor", nav (Dashboard, Inventory, Orders, Settings),
 *   notifications button, user avatar
 * - Breadcrumb: Products > Add New Product
 * - Left sidebar (sticky top-24):
 *   - Progress stepper: Step 1 active (Basic Info), Step 2 + 3 dimmed (Price & Specs, Media Assets)
 *   - Completion card: 33% progress bar (primary/5 bg)
 * - Main form (6-col):
 *   - Basic Information card: Product Name, Category select, Material, Description textarea
 *   - Form actions: Save Draft, Back (disabled), Continue to Step 2 (primary CTA)
 * - Right sidebar (sticky top-24):
 *   - Storefront Preview: placeholder image, skeleton text, NEW badge
 *   - Pro Tip: amber box about metric/imperial units
 * - Future steps (collapsed, opacity-50 grayscale pointer-events-none):
 *   - Step 2: Pricing & Dimensions (locked)
 *   - Step 3: Media Uploads (locked)
 * - Footer: © 2024 FurniCustom, Privacy/Support/API links
 *
 * Route: /vendor-add-product
 */

const VendorAddProduct = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
            <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    {/* Header */}
                    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 lg:px-10 py-3 sticky top-0 z-50">
                        <Link to="/" className="flex items-center gap-4">
                            <div className="size-8 bg-primary text-white flex items-center justify-center rounded-lg">
                                <span className="material-symbols-outlined">chair</span>
                            </div>
                            <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">
                                FurniCustom{' '}
                                <span className="font-normal text-slate-500">Vendor</span>
                            </h2>
                        </Link>
                        <div className="flex flex-1 justify-end gap-6 items-center">
                            <nav className="hidden md:flex items-center gap-8">
                                <a
                                    className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors"
                                    href="#"
                                >
                                    Dashboard
                                </a>
                                <a
                                    className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors"
                                    href="#"
                                >
                                    Inventory
                                </a>
                                <a
                                    className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors"
                                    href="#"
                                >
                                    Orders
                                </a>
                                <a
                                    className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors"
                                    href="#"
                                >
                                    Settings
                                </a>
                            </nav>
                            <div className="flex gap-2 border-l border-slate-200 dark:border-slate-800 pl-6">
                                <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary/10 hover:text-primary transition-all">
                                    <span className="material-symbols-outlined text-[20px]">notifications</span>
                                </button>
                                <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
                                    <img
                                        className="w-full h-full object-cover"
                                        alt="User profile avatar"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBViTAw9z01hwYzXo8lOngNOy_giFtihRHwSvlYspiA17nqIH-8Ze7GcIHxFt4hATlavWrEdnWM5H9XnL5rUdQW2lTHAUNfNK7wdmBUZOMlQTEIep4Kkyh-g15tMlnSQmIxYqdMxTS_BgwguEUmWgDJAYUwkfNVp5TZOh6hqALH_tF-KvCrrlvyaWTgD8CzvZPJL6RF1lSMi4bhm7-54nWnjJ8XuCtS0eSruP4ZSogjp0In_grl_o-ZaIbnU6OKUYiHxBSMBnhCPV89"
                                    />
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 lg:px-10 py-8">
                        {/* Breadcrumbs & Title */}
                        <div className="mb-8">
                            <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                                <a className="hover:text-primary transition-colors" href="#">
                                    Products
                                </a>
                                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                                <span className="text-slate-900 dark:text-slate-200 font-medium">
                                    Add New Product
                                </span>
                            </div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                New Furniture Listing
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-1">
                                Submit high-quality details to increase your visibility on the storefront.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            {/* Left Sidebar: Progress Stepper */}
                            <div className="lg:col-span-3 space-y-4 sticky top-24">
                                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <div className="relative flex flex-col gap-6">
                                        {/* Step 1 */}
                                        <div className="flex items-start gap-4">
                                            <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-bold text-sm ring-4 ring-primary/20">
                                                1
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-900 dark:text-white leading-none mb-1">
                                                    Basic Info
                                                </span>
                                                <span className="text-xs text-slate-500">Name &amp; Category</span>
                                            </div>
                                        </div>
                                        {/* Connector */}
                                        <div className="absolute left-4 top-8 -ml-px h-6 w-0.5 bg-slate-200 dark:bg-slate-800" />
                                        {/* Step 2 */}
                                        <div className="flex items-start gap-4 opacity-60">
                                            <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold text-sm">
                                                2
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-900 dark:text-white leading-none mb-1">
                                                    Price &amp; Specs
                                                </span>
                                                <span className="text-xs text-slate-500">Dimensions &amp; SKU</span>
                                            </div>
                                        </div>
                                        {/* Connector */}
                                        <div className="absolute left-4 top-22 -ml-px h-6 w-0.5 bg-slate-200 dark:bg-slate-800" />
                                        {/* Step 3 */}
                                        <div className="flex items-start gap-4 opacity-60">
                                            <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold text-sm">
                                                3
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-900 dark:text-white leading-none mb-1">
                                                    Media Assets
                                                </span>
                                                <span className="text-xs text-slate-500">Images &amp; 3D Models</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Progress Stats */}
                                <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 p-4 rounded-xl">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-bold text-primary uppercase tracking-wider">
                                            Completion
                                        </span>
                                        <span className="text-xs font-bold text-primary">33%</span>
                                    </div>
                                    <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: '33%' }} />
                                    </div>
                                </div>
                            </div>

                            {/* Main Form Area */}
                            <div className="lg:col-span-6 space-y-6">
                                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                    {/* Card: Basic Information */}
                                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                        <div className="flex items-center gap-3 mb-6">
                                            <span className="material-symbols-outlined text-primary">description</span>
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                                Basic Information
                                            </h3>
                                        </div>
                                        <div className="space-y-5">
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                                    Product Name
                                                </label>
                                                <input
                                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                                    placeholder="e.g. Minimalist Oak Dining Table"
                                                    type="text"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                                        Category
                                                    </label>
                                                    <select className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none">
                                                        <option>Dining Room</option>
                                                        <option>Living Room</option>
                                                        <option>Bedroom</option>
                                                        <option>Office</option>
                                                        <option>Outdoor</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                                        Material
                                                    </label>
                                                    <input
                                                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none"
                                                        placeholder="Solid Oak, Walnut, Steel"
                                                        type="text"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                                    Description
                                                </label>
                                                <textarea
                                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none"
                                                    placeholder="Tell customers about the craftsmanship, finish, and design inspiration..."
                                                    rows="4"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Form Actions */}
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                                        <button
                                            className="px-6 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                                            type="button"
                                        >
                                            Save Draft
                                        </button>
                                        <div className="flex gap-3">
                                            <button
                                                className="px-6 py-2.5 text-sm font-bold text-slate-400 cursor-not-allowed bg-slate-100 dark:bg-slate-800 rounded-lg"
                                                type="button"
                                            >
                                                Back
                                            </button>
                                            <button
                                                className="bg-primary hover:bg-primary/90 text-white px-8 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-primary/25 transition-all flex items-center gap-2"
                                                type="button"
                                            >
                                                Continue to Step 2
                                                <span className="material-symbols-outlined text-[18px]">
                                                    arrow_forward
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/* Right Sidebar: Live Preview */}
                            <div className="lg:col-span-3 space-y-4 sticky top-24">
                                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                                    <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                            Storefront Preview
                                        </span>
                                        <span className="material-symbols-outlined text-slate-400 text-[18px]">
                                            visibility
                                        </span>
                                    </div>
                                    <div className="p-3">
                                        <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-lg relative overflow-hidden group">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-slate-300 text-5xl">
                                                    image
                                                </span>
                                            </div>
                                            <div className="absolute top-2 left-2 px-2 py-1 bg-white/90 text-[10px] font-bold rounded text-slate-900 shadow-sm">
                                                NEW
                                            </div>
                                        </div>
                                        <div className="mt-4 space-y-1">
                                            <div className="h-4 w-2/3 bg-slate-100 dark:bg-slate-800 rounded" />
                                            <div className="h-3 w-1/3 bg-slate-50 dark:bg-slate-800 rounded" />
                                            <div className="pt-3 flex justify-between items-center">
                                                <div className="h-5 w-1/4 bg-primary/20 rounded" />
                                                <div className="h-8 w-8 bg-primary/10 rounded-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Helpful Tips */}
                                <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/20 p-4 rounded-xl">
                                    <div className="flex gap-3">
                                        <span className="material-symbols-outlined text-amber-500">lightbulb</span>
                                        <div>
                                            <h4 className="text-sm font-bold text-amber-900 dark:text-amber-200 leading-tight">
                                                Pro Tip
                                            </h4>
                                            <p className="text-xs text-amber-800 dark:text-amber-300 mt-1 leading-relaxed">
                                                Listings with dimensions in both Metric and Imperial units see 24% higher
                                                conversion rates.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Future Steps Overview (Collapsed Cards) */}
                        <div className="mt-12 space-y-4 opacity-50 grayscale pointer-events-none">
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400">
                                        <span className="material-symbols-outlined">straighten</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-none">
                                            Step 2: Pricing &amp; Dimensions
                                        </h3>
                                        <p className="text-sm text-slate-500 mt-1">
                                            Weight, Volume, and Pricing Tiers
                                        </p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-slate-400">lock</span>
                            </div>
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400">
                                        <span className="material-symbols-outlined">perm_media</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-none">
                                            Step 3: Media Uploads
                                        </h3>
                                        <p className="text-sm text-slate-500 mt-1">
                                            Photos and AR-ready 3D models
                                        </p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-slate-400">lock</span>
                            </div>
                        </div>
                    </main>

                    {/* Global Footer */}
                    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 py-8 px-10 bg-white dark:bg-slate-900">
                        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-4">
                                <div className="size-6 text-primary">
                                    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </div>
                                <p className="text-sm text-slate-500">
                                    © 2024 FurniCustom Inc. All rights reserved.
                                </p>
                            </div>
                            <div className="flex gap-6">
                                <a
                                    className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
                                    href="#"
                                >
                                    Privacy Policy
                                </a>
                                <a
                                    className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
                                    href="#"
                                >
                                    Vendor Support
                                </a>
                                <a
                                    className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
                                    href="#"
                                >
                                    API Docs
                                </a>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default VendorAddProduct;
