import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Return Request Page
 *
 * Return/refund request form with:
 * - Frosted glass navbar with chair icon, nav links, cart, person avatar
 * - Breadcrumbs: Home / My Orders / Return Request
 * - Order summary header (Order #FC-88291, placed Oct 12, Delivered)
 * - Step 1: Item selection with custom checkboxes (2 items)
 * - Step 2: Reason dropdown, comments textarea, photo upload with preview grid
 * - Sticky sidebar: Refund Summary, Return Policy, Refund Process, Submit/Cancel
 * - Help widget with support agent
 * - Footer
 *
 * Route: /return-request
 */

const RETURN_ITEMS = [
    {
        id: 1,
        name: 'Velvet Tufted Sofa',
        details: 'Royal Blue • Gold Legs • 84" Width',
        price: '$1,299.00',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuA06abPpthaSxY_ZplkNpE8WIjFRP7V9CCAHqCkiGjMfKm4ZkATiOvha_IYEV2w0IRIgdcsLR2t-Keiaafn8PT77QhyVGfpIWjj-IGx9GW7KZ51Rt7GTiEoQgVhizcKV55fZ6q8VmW_Kko7fDwP2ztAK4xacpxlRwNSEaYhNkAQaEUgqDt0Nd0oem5wFjOXQZXO4ZLkPCfxgLHOTo2ll0QnUe5vmr6xx-SzhbV2uaBb_9RKzz1msuqAeLwB0F5IUvB8a4GXfuh1wEYh',
        alt: 'Luxurious royal blue velvet tufted sofa with gold legs',
        defaultChecked: true,
    },
    {
        id: 2,
        name: 'Marble Coffee Table',
        details: 'White Carrara • Matte Black Frame',
        price: '$450.00',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBwTnRdH7BPJh2Re1bjBMo29TDOXr9xeemI9ERdIJbA5tFbG8HV7LU5iSIwPOX-IRQIXtCuLI9gH7EJOFzTWK04-wHLfoMDumEwjJ7k8BCwvV9yQO-Ae7ujl4B7OaoRjU_A6ro2pNokQTL7pTTsaeQUWN_vGuK2oLgd1BI6qBjNx6p76lNqDEe0I8BsJRqO-hEBxb-_8x6Lf8dXgUx2xpNgif8kFvc6NNkdp4IQakuLzhpkHs6fA1204KPBV0198MW6Eoj6RIzUiW46',
        alt: 'Minimalist coffee table with white marble top and black metal base',
        defaultChecked: false,
    },
];

const RETURN_REASONS = [
    { value: '', label: 'Select a reason' },
    { value: 'damaged', label: 'Item arrived damaged' },
    { value: 'wrong-size', label: "Wrong dimensions / Doesn't fit" },
    { value: 'quality', label: 'Quality not as expected' },
    { value: 'color', label: 'Color mismatch from photos' },
    { value: 'other', label: 'Other' },
];

const ReturnRequest = () => {
    const navigate = useNavigate();
    const [selectedItems, setSelectedItems] = useState([1]); // Item 1 checked by default
    const [reason, setReason] = useState('');
    const [comments, setComments] = useState('');

    const toggleItem = (id) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
            {/* Navigation */}
            {/* Removed hardcoded header to use MainLayout */}

            <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <nav className="flex mb-8 text-sm font-medium text-slate-500 dark:text-slate-400">
                    <Link className="hover:text-primary" to="/">
                        Home
                    </Link>
                    <span className="mx-2 text-slate-300">/</span>
                    <Link className="hover:text-primary" to="/orders">
                        My Orders
                    </Link>
                    <span className="mx-2 text-slate-300">/</span>
                    <span className="text-slate-900 dark:text-slate-100">Return Request</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Form Steps */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Order Summary Header */}
                        <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h1 className="text-2xl font-black tracking-tight mb-2">
                                Return / Refund Request
                            </h1>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
                                <span>Order #FC-88291</span>
                                <span className="hidden sm:inline">•</span>
                                <span>Placed on Oct 12, 2023</span>
                                <span className="hidden sm:inline">•</span>
                                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                                    Delivered
                                </span>
                            </div>
                        </section>

                        {/* Step 1: Item Selection */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">
                                    1
                                </span>
                                <h2 className="text-xl font-bold">Which items are you returning?</h2>
                            </div>
                            <div className="space-y-3">
                                {RETURN_ITEMS.map((item) => {
                                    const isChecked = selectedItems.includes(item.id);
                                    return (
                                        <label
                                            key={item.id}
                                            className={`group relative flex items-center p-4 bg-white dark:bg-slate-900 border-2 rounded-xl hover:border-primary/50 cursor-pointer transition-all ${isChecked
                                                    ? 'border-primary bg-primary/[0.02]'
                                                    : 'border-slate-200 dark:border-slate-800'
                                                }`}
                                        >
                                            <input
                                                type="checkbox"
                                                className="sr-only"
                                                checked={isChecked}
                                                onChange={() => toggleItem(item.id)}
                                            />
                                            <div className="flex flex-1 items-center gap-4">
                                                <div className="w-20 h-20 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0">
                                                    <img
                                                        alt={item.alt}
                                                        className="w-full h-full object-cover"
                                                        src={item.image}
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-lg">{item.name}</span>
                                                    <span className="text-sm text-slate-500 dark:text-slate-400">
                                                        {item.details}
                                                    </span>
                                                    <span className="mt-1 font-semibold text-primary">{item.price}</span>
                                                </div>
                                            </div>
                                            <div
                                                className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${isChecked
                                                        ? 'bg-primary border-primary'
                                                        : 'border-slate-300 dark:border-slate-700'
                                                    }`}
                                            >
                                                <span
                                                    className={`material-symbols-outlined text-white text-lg ${isChecked ? 'opacity-100' : 'opacity-0'
                                                        }`}
                                                >
                                                    check
                                                </span>
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Step 2: Reason & Details */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">
                                    2
                                </span>
                                <h2 className="text-xl font-bold">Tell us what went wrong</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-6 p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold" htmlFor="reason">
                                        Reason for return
                                    </label>
                                    <select
                                        className="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                        id="reason"
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                    >
                                        {RETURN_REASONS.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold" htmlFor="comments">
                                        Additional Comments (Optional)
                                    </label>
                                    <textarea
                                        className="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                        id="comments"
                                        placeholder="Please provide more details to help us process your request faster..."
                                        rows="4"
                                        value={comments}
                                        onChange={(e) => setComments(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-semibold">Upload Photos</label>
                                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-primary transition-colors cursor-pointer bg-slate-50/50 dark:bg-slate-950/50 group">
                                        <span className="material-symbols-outlined text-4xl text-slate-400 group-hover:text-primary mb-2 transition-colors">
                                            cloud_upload
                                        </span>
                                        <p className="text-sm font-medium">Click to upload or drag and drop</p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            PNG, JPG up to 10MB (Max 5 photos)
                                        </p>
                                    </div>
                                    {/* Preview Grid (Simulated) */}
                                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mt-4">
                                        <div className="relative group aspect-square rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
                                            <img
                                                className="w-full h-full object-cover"
                                                alt="Thumbnail of reported damaged area on sofa fabric"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuABHzph9imFR70_94KBftmkfNzq5aePe6KHGjXmwRBydGrOH_kDnQh_ZiB6QF3SXHyYv1aixkuWgo61ek-NUouTyhIz4gaMmoyIJCHAwBjJmK1Ym9k7yRqjSIn70gNKmOx9ruujn-njWxwS2h-e7MHkJPZ4EDWVEWzgXDTfYm8PjruF6QOwuF3e34Jc4dnV2b9JmkZkDsdvPOKG1lyrBPIO3yLKg7kramQB9G9G8-0rEH5tjP44rFNSn8qww18qMvNEoDoH-F73-qFT"
                                            />
                                            <button className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="material-symbols-outlined text-xs">close</span>
                                            </button>
                                        </div>
                                        <div className="aspect-square rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-300">
                                            <span className="material-symbols-outlined">add</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-6">
                        {/* Refund Summary Panel */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden sticky top-24">
                            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                                <h3 className="font-bold text-lg mb-4">Refund Summary</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">
                                            Subtotal ({selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''})
                                        </span>
                                        <span>$1,299.00</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Shipping Refund</span>
                                        <span className="text-emerald-600 font-medium">Free</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Restocking Fee</span>
                                        <span>-$0.00</span>
                                    </div>
                                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-end">
                                        <span className="font-bold">Estimated Refund</span>
                                        <span className="text-2xl font-black text-primary">$1,299.00</span>
                                    </div>
                                </div>
                            </div>
                            {/* Return Policy Note */}
                            <div className="p-6 bg-slate-50 dark:bg-slate-950/50">
                                <div className="flex gap-3 mb-4">
                                    <span className="material-symbols-outlined text-primary text-xl">
                                        verified_user
                                    </span>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-bold">Return Policy</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                            Returns must be initiated within 30 days of delivery. As this is a{' '}
                                            <strong>Custom Item</strong>, our team will review your request within 24-48
                                            hours.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <span className="material-symbols-outlined text-primary text-xl">payments</span>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-bold">Refund Process</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                            Once approved, your refund will be processed back to your original payment
                                            method within 5-7 business days.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 space-y-3">
                                <button className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 active:scale-[0.98] transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2">
                                    <span>Submit Request</span>
                                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                </button>
                                <button
                                    onClick={() => navigate(-1)}
                                    className="w-full py-3 text-slate-500 font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                >
                                    Cancel &amp; Go Back
                                </button>
                            </div>
                        </div>

                        {/* Help Widget */}
                        <div className="bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/10 p-5">
                            <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-xl">
                                    support_agent
                                </span>
                                Need help with your return?
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                                Our support team is available Mon-Fri, 9am - 6pm EST to assist with assembly or
                                damage issues.
                            </p>
                            <a className="text-xs font-bold text-primary hover:underline" href="#">
                                Chat with an Expert
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            {/* Removed hardcoded footer to use MainLayout */}
        </div>
    );
};

export default ReturnRequest;
