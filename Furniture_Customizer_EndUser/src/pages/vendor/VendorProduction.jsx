import { Link } from 'react-router-dom';

/**
 * Vendor Production Dashboard Page
 *
 * Detailed order production tracking for Order #ORD-88241:
 * - Header (sticky z-50): factory icon (bg-primary/10), "VendorPro", search orders,
 *   nav (Orders, Inventory, Analytics), notifications + help buttons, user avatar
 * - Order header: "#ORD-88241" (3xl font-black), "In Progress" badge (primary/10),
 *   customer "Sarah Jenkins", "3 Days Remaining" (orange), View Full Order + Advance to Next Stage
 * - 3-col grid (2/1):
 *   Left (2-col):
 *     - Production Timeline: 5 steps (Sourcing ✅ Oct 12, Cutting & Prep ✅ Oct 14,
 *       Assembly 🔵 In Progress with shadow-lg, Quality Check ⚪ Pending, Dispatch ⚪ Pending)
 *       60% complete, horizontal progress bar
 *     - Production Update: Internal/Public toggle, textarea, WIP Photos grid
 *       (upload button, 2 photos with hover delete overlay, "Verified" badge), Post Update CTA
 *     - Activity Feed: Stage change (today 09:45), 2 WIP photos added (yesterday 4:20) with quote
 *   Right sidebar:
 *     - Customization Specs: Material (Grade A Walnut Wood), Engraving (italic primary),
 *       Dimensions (12"x18"x2"), Finish (Semi-Gloss Varnish), reference PDF download
 *     - Vendor Note: lightbulb icon, quality check warning (bg-primary/5)
 *     - Customer Contact: Sarah Jenkins avatar, email, "Send Direct Message" button
 *
 * Route: /vendor-production
 */

const TIMELINE_STEPS = [
    {
        icon: 'check',
        label: 'Sourcing',
        date: 'Oct 12',
        status: 'completed',
    },
    {
        icon: 'check',
        label: 'Cutting & Prep',
        date: 'Oct 14',
        status: 'completed',
    },
    {
        icon: 'construction',
        label: 'Assembly',
        date: 'In Progress',
        status: 'active',
    },
    {
        icon: 'fact_check',
        label: 'Quality Check',
        date: 'Pending',
        status: 'pending',
    },
    {
        icon: 'local_shipping',
        label: 'Dispatch',
        date: 'Pending',
        status: 'pending',
    },
];

const CUSTOMIZATION_SPECS = [
    { label: 'Material', value: 'Grade A Walnut Wood', isItalic: false },
    { label: 'Engraving', value: '"Happy Anniversary Sarah & John"', isItalic: true },
    { label: 'Dimensions', value: '12" x 18" x 2"', isItalic: false },
    { label: 'Finish', value: 'Semi-Gloss Varnish', isItalic: false },
];

const VendorProduction = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
            <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    {/* Header */}
                    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 lg:px-10 py-3 sticky top-0 z-50">
                        <div className="flex items-center gap-8">
                            <Link to="/home" className="flex items-center gap-4 text-primary">
                                <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary">factory</span>
                                </div>
                                <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em]">
                                    VendorPro
                                </h2>
                            </Link>
                            <label className="hidden md:flex flex-col min-w-40 h-10 max-w-64">
                                <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-slate-100 dark:bg-slate-800">
                                    <div className="text-slate-500 flex items-center justify-center pl-4">
                                        <span className="material-symbols-outlined text-[20px]">search</span>
                                    </div>
                                    <input
                                        className="form-input flex w-full min-w-0 flex-1 border-none bg-transparent focus:ring-0 text-sm"
                                        placeholder="Search orders..."
                                    />
                                </div>
                            </label>
                        </div>
                        <div className="flex flex-1 justify-end gap-6 items-center">
                            <nav className="hidden lg:flex items-center gap-6">
                                <Link
                                    className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors"
                                    to="/vendor-orders"
                                >
                                    Orders
                                </Link>
                                <Link
                                    className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors"
                                    to="/vendor-inventory"
                                >
                                    Inventory
                                </Link>
                                <Link
                                    className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors"
                                    to="/vendor-analytics"
                                >
                                    Analytics
                                </Link>
                            </nav>
                            <div className="flex gap-2">
                                <button className="flex size-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200">
                                    <span className="material-symbols-outlined text-[20px]">notifications</span>
                                </button>
                                <button className="flex size-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200">
                                    <span className="material-symbols-outlined text-[20px]">help</span>
                                </button>
                            </div>
                            <div
                                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20"
                                style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDuz55HZEMFXehHNWUwkj85Qyw2xkLjDAHgwuv70_RpIFVa1BJBMWX8K_ehYNAXv_WqUh62aC_vtoWvUlKi3Hq9N7ve_aFdDjt8UE0Q6q7WUKW6wHx4kFrGKr0veB_hMKFFgYV1qAelEFIouddsYCKljbrDdpC3WeMZJ5evxE-69GFILnTpQv--eUQFmqU8g9rWdHklw6G2EuhYyMvdS_lLMuxKkNrw5LcIUKnlnWtE8KRZRNRQ_8x0DXsbftAXjREuXyZYw8UHUNKd")',
                                }}
                            />
                        </div>
                    </header>

                    <main className="flex-1 flex flex-col max-w-[1200px] mx-auto w-full p-4 lg:p-8 gap-8">
                        {/* Order Header */}
                        <section className="flex flex-wrap justify-between items-end gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <h1 className="text-slate-900 dark:text-slate-100 text-3xl font-black tracking-tight">
                                        Order #ORD-88241
                                    </h1>
                                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
                                        In Progress
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
                                    <span className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-sm">person</span> Sarah
                                        Jenkins
                                    </span>
                                    <span className="flex items-center gap-1.5 text-orange-600 font-medium">
                                        <span className="material-symbols-outlined text-sm">timer</span> 3 Days
                                        Remaining
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Link className="flex items-center justify-center rounded-lg px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition-colors" to="/vendor-order-details">
                                    <span className="material-symbols-outlined mr-2 text-[20px]">visibility</span>{' '}
                                    View Full Order
                                </Link>
                                <button className="flex items-center justify-center rounded-lg px-4 py-2 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors">
                                    Advance to Next Stage
                                </button>
                            </div>
                        </section>

                        {/* Grid Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column */}
                            <div className="lg:col-span-2 flex flex-col gap-8">
                                {/* Production Timeline */}
                                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-lg font-bold">Production Timeline</h3>
                                        <span className="text-sm font-medium text-primary">60% Complete</span>
                                    </div>
                                    <div className="relative">
                                        {/* Background line */}
                                        <div className="absolute top-5 left-6 right-6 h-0.5 bg-slate-100 dark:bg-slate-800" />
                                        {/* Progress line */}
                                        <div
                                            className="absolute top-5 left-6 h-0.5 bg-primary"
                                            style={{ width: '50%' }}
                                        />
                                        <div className="relative flex justify-between">
                                            {TIMELINE_STEPS.map((step) => (
                                                <div key={step.label} className="flex flex-col items-center gap-3 group">
                                                    <div
                                                        className={`size-10 rounded-full flex items-center justify-center z-10 ring-4 ring-white dark:ring-slate-900 ${step.status === 'completed'
                                                                ? 'bg-primary text-white'
                                                                : step.status === 'active'
                                                                    ? 'bg-white dark:bg-slate-900 border-2 border-primary text-primary shadow-lg shadow-primary/20'
                                                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                                                            } transition-all`}
                                                    >
                                                        <span className="material-symbols-outlined text-[20px]">
                                                            {step.icon}
                                                        </span>
                                                    </div>
                                                    <div className="text-center">
                                                        <p
                                                            className={`text-xs font-bold ${step.status === 'active'
                                                                    ? 'text-primary'
                                                                    : step.status === 'pending'
                                                                        ? 'text-slate-400'
                                                                        : 'text-slate-900 dark:text-slate-100'
                                                                }`}
                                                        >
                                                            {step.label}
                                                        </p>
                                                        <p
                                                            className={`text-[10px] uppercase ${step.status === 'active'
                                                                    ? 'text-primary/70'
                                                                    : 'text-slate-400'
                                                                }`}
                                                        >
                                                            {step.date}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Production Update */}
                                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                        <h3 className="text-lg font-bold">Production Update</h3>
                                        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                                            <button className="px-3 py-1.5 text-xs font-bold bg-white dark:bg-slate-700 rounded-md shadow-sm">
                                                Internal
                                            </button>
                                            <button className="px-3 py-1.5 text-xs font-bold text-slate-500">
                                                Public
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <textarea
                                            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4 text-sm focus:ring-2 focus:ring-primary focus:border-transparent min-h-[120px]"
                                            placeholder="Add a note about the current status or any challenges..."
                                        />
                                        <div className="mt-6">
                                            <p className="text-sm font-semibold mb-3">Work-In-Progress Photos</p>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                                {/* Upload button */}
                                                <div className="aspect-square rounded-lg bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all cursor-pointer">
                                                    <span className="material-symbols-outlined text-3xl">add_a_photo</span>
                                                    <span className="text-[10px] font-bold mt-1 uppercase">Upload WIP</span>
                                                </div>
                                                {/* Photo 1 with Verified badge */}
                                                <div className="relative aspect-square rounded-lg bg-slate-200 dark:bg-slate-800 overflow-hidden group">
                                                    <div
                                                        className="absolute inset-0 bg-center bg-cover"
                                                        style={{
                                                            backgroundImage:
                                                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDNc1QOQ61R0VS1JExPI1e8JNcbv0jxnokt-T5Gat8kE-9aXb245ZkLlLRjQthxswKxjbDaF5EUgpQSlKdM2Rr8DRRLL6gnqwMDLrH4nYZMw1nhs-UQ1zQYPv5zP1UMkhP1GIA_WJBdeKDPsAOnmOSJ-iwPjSihb6K3zGgFuOyDyeAE-EFCLQZWE1SbiMdhRYZN3bRhRgg2EtK2_7IzdjBj0Fkp1igsutZcQwMmz-8Obx-3sns2fL3vyDcCrDmKPa3b5pMyMxHkWfEd')",
                                                        }}
                                                    />
                                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <button className="size-8 rounded-full bg-white text-primary flex items-center justify-center">
                                                            <span className="material-symbols-outlined text-lg">close</span>
                                                        </button>
                                                    </div>
                                                    <span className="absolute top-1 right-1 px-1.5 py-0.5 bg-green-500 text-white text-[8px] font-bold rounded uppercase">
                                                        Verified
                                                    </span>
                                                </div>
                                                {/* Photo 2 */}
                                                <div className="relative aspect-square rounded-lg bg-slate-200 dark:bg-slate-800 overflow-hidden group">
                                                    <div
                                                        className="absolute inset-0 bg-center bg-cover"
                                                        style={{
                                                            backgroundImage:
                                                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDrL2uPmchhpO6Q7-Gu0bKuRQ_yhmxHMZC-xBbTf0RRE56N_BES6Y25EaWRhH0pDhRvQSEHyK4QrlJMWQLD9M-QP8piulOJLeUPoE4APVJ39DUuYd_16vl0PWHDWG3AZ5OR6b4RNFzyZhcEMpATjJ6AtTbUGHuv2T3RV2VDJfWsuW8yp6yIpZY4kBE3_L0AhZA0VgfpUzfbDkL4tUK5oNzzEZzXz2-LGZosoHpyO0rCmjb9j9sBqJe05TgsVD8wf80p36qXwCjtsSAo')",
                                                        }}
                                                    />
                                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <button className="size-8 rounded-full bg-white text-primary flex items-center justify-center">
                                                            <span className="material-symbols-outlined text-lg">close</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-6 flex justify-end">
                                            <button className="bg-primary text-white font-bold py-2 px-6 rounded-lg text-sm hover:bg-primary/90">
                                                Post Update
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Activity Feed */}
                                <div className="flex flex-col gap-4">
                                    <h3 className="text-lg font-bold">Activity Feed</h3>
                                    <div className="space-y-4">
                                        <div className="flex gap-4 items-start">
                                            <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                <span className="material-symbols-outlined text-primary text-[18px]">
                                                    construction
                                                </span>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold">Stage Changed to Assembly</p>
                                                <p className="text-xs text-slate-500">
                                                    By Mike Ross • Today at 09:45 AM
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 items-start">
                                            <div className="size-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                                                <span className="material-symbols-outlined text-green-500 text-[18px]">
                                                    add_a_photo
                                                </span>
                                            </div>
                                            <div className="flex-1 border-l-2 border-slate-100 dark:border-slate-800 pl-4 pb-4">
                                                <p className="text-sm font-semibold">Added 2 WIP photos</p>
                                                <p className="text-xs text-slate-500">
                                                    By Mike Ross • Yesterday at 04:20 PM
                                                </p>
                                                <div className="mt-2 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                                                    &quot;Materials have been pre-cut and sorted. Moving to joint assembly
                                                    in the morning.&quot;
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Sidebar */}
                            <aside className="flex flex-col gap-6">
                                {/* Customization Specs */}
                                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                                    <div className="p-5 border-b border-slate-100 dark:border-slate-800">
                                        <h4 className="font-bold flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary">tune</span>{' '}
                                            Customization Specs
                                        </h4>
                                    </div>
                                    <div className="p-5 space-y-4">
                                        {CUSTOMIZATION_SPECS.map((spec) => (
                                            <div key={spec.label}>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
                                                    {spec.label}
                                                </p>
                                                <p
                                                    className={`text-sm font-medium ${spec.isItalic ? 'italic text-primary' : ''
                                                        }`}
                                                >
                                                    {spec.value}
                                                </p>
                                            </div>
                                        ))}
                                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="size-12 rounded-lg bg-slate-100 dark:bg-slate-800 bg-center bg-cover"
                                                    style={{
                                                        backgroundImage:
                                                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCs-bT_VbI6tExcayyzQy8TKkzYqS475iHmIcTBfhS4BlnCe2uhqFYxg906e1hGc7alatusuDhv_CrE7gstmUGdBryDDt5-hQiTdaKJqgtN9iYTKDSbr4g7JSaQownFQvNHhpw0titxBW7zErlpf9GcM1T8tiOd0LZvut3CcOGQdFVGY609zqAi6mECYj50aBXAyVg68lbIld1fm-knEouNyRC8tk2jeKfLQeG7MS3gxQMjnBAnYjM0qT8B5JGS2pu3E5RoasbNWda3')",
                                                    }}
                                                />
                                                <div>
                                                    <p className="text-xs font-bold">Ref_Sketch_v2.pdf</p>
                                                    <a
                                                        className="text-primary text-[10px] font-bold hover:underline"
                                                        href="#"
                                                    >
                                                        DOWNLOAD REFERENCE
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Vendor Note */}
                                <div className="bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/20 p-5">
                                    <h4 className="text-sm font-bold text-primary mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[20px]">lightbulb</span>{' '}
                                        Vendor Note
                                    </h4>
                                    <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                                        Remember to flag the &quot;Quality Check&quot; stage as critical. Photos of
                                        the joint construction are required for this specific walnut series to ensure
                                        structural integrity.
                                    </p>
                                </div>

                                {/* Customer Contact */}
                                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
                                    <h4 className="text-sm font-bold mb-4">Customer Contact</h4>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div
                                            className="size-10 rounded-full bg-slate-200 bg-center bg-cover"
                                            style={{
                                                backgroundImage:
                                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCxZ_RCe4clLiUpL5nln7WX7UV2QNd-RkkOE3q_Zu1aIvibVnzosqmz020OMfY3zedxPv6Z9vuFFyI7IHRKx8FlgpiEvPjNBFoj_DjpzpLakmXIERuKxgsN3ynDNrnEdRKdfgT4GFhDbcMmSqTMjlNqKN8l5Je7ddW5r51mQlx55WgYW9fcvbbL6e9v_zmRPsNGZOJDxOUxA59y3f4mhEGCE_e_qBJnqOEzy1qluwvdQfaGISsRZfcPM_IXK7lcZZuyiuWNUvRuATa5')",
                                            }}
                                        />
                                        <div>
                                            <p className="text-xs font-bold">Sarah Jenkins</p>
                                            <p className="text-[10px] text-slate-500">sarah.j@email.com</p>
                                        </div>
                                    </div>
                                    <button className="w-full py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">
                                        Send Direct Message
                                    </button>
                                </div>
                            </aside>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default VendorProduction;
