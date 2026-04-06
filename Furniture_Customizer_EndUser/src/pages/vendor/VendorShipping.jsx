import { Link } from 'react-router-dom';

/**
 * Vendor Update Shipping Page
 *
 * Shipping details form for Order #ORD-8821:
 * - Header: local_shipping icon (bg-primary/10), "Vendor Dashboard", nav (Orders, Inventory,
 *   Shipping active border-b-2, Reports), person avatar, mobile menu toggle
 * - Breadcrumb: Back to Orders (arrow_back primary) / Order Management / #ORD-8821
 * - Page title: "Update Shipping Details" (3xl-4xl font-black), subtitle
 * - 12-col grid (7/5):
 *   Left (7-col):
 *     - Logistics form (border-primary/10): edit_square icon
 *       - Courier select: FedEx, UPS, DHL, USPS, Other (expand_more icon)
 *       - Tracking Number: input with paste button (content_paste), helper text
 *       - Estimated Delivery Date: date input with calendar_today icon
 *       - Actions: "Ship Order" (primary shadow-md, send icon with group-hover translate),
 *         "Save Draft" (text button)
 *   Right (5-col, sticky top-8):
 *     - Order Quick View: "Awaiting Shipment" (bg-primary/5), #ORD-8821,
 *       shopping_bag icon, "Premium Leather Tote", Midnight Black, $245,
 *       Customer (Johnathan Doe), Destination (NYC), Contact email
 *     - Map placeholder: map icon, "Shipping to New York, NY", grayscale map image
 * - Footer: © 2024 VendorHub Logistics, Privacy/Support/Carrier links
 *
 * Route: /vendor-shipping
 */

const VendorShipping = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-200">
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
                {/* Header */}
                <header className="flex items-center justify-between border-b border-primary/10 bg-white dark:bg-background-dark/50 px-6 py-4 md:px-20 lg:px-40">
                    <Link to="/" className="flex items-center gap-4 text-primary">
                        <div className="size-8 flex items-center justify-center rounded-lg bg-primary/10">
                            <span className="material-symbols-outlined text-primary">local_shipping</span>
                        </div>
                        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight">
                            Vendor Dashboard
                        </h2>
                    </Link>
                    <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
                        <nav className="flex items-center gap-8">
                            <a
                                className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm font-medium"
                                href="#"
                            >
                                Orders
                            </a>
                            <a
                                className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm font-medium"
                                href="#"
                            >
                                Inventory
                            </a>
                            <a
                                className="text-primary text-sm font-semibold border-b-2 border-primary pb-1"
                                href="#"
                            >
                                Shipping
                            </a>
                            <a
                                className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm font-medium"
                                href="#"
                            >
                                Reports
                            </a>
                        </nav>
                        <div className="flex items-center gap-3 ml-4">
                            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden border border-primary/10">
                                <span className="material-symbols-outlined text-primary">person</span>
                            </div>
                        </div>
                    </div>
                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden text-slate-900 dark:text-slate-100">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </header>

                {/* Main Content */}
                <main className="flex-1 px-4 py-8 md:px-20 lg:px-40">
                    <div className="mx-auto max-w-4xl">
                        {/* Breadcrumbs */}
                        <nav className="flex items-center gap-2 mb-6 text-sm">
                            <a className="text-primary hover:underline flex items-center" href="#">
                                <span className="material-symbols-outlined text-sm mr-1">arrow_back</span>
                                Back to Orders
                            </a>
                            <span className="text-slate-400">/</span>
                            <span className="text-slate-500">Order Management</span>
                            <span className="text-slate-400">/</span>
                            <span className="text-slate-900 dark:text-slate-100 font-semibold">#ORD-8821</span>
                        </nav>

                        {/* Page Title */}
                        <div className="mb-8">
                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                                Update Shipping Details
                            </h1>
                            <p className="mt-2 text-slate-600 dark:text-slate-400">
                                Assign a courier and tracking information to complete the shipment process.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {/* Left Column: Form */}
                            <div className="lg:col-span-7">
                                <div className="bg-white dark:bg-background-dark/30 rounded-xl border border-primary/10 shadow-sm p-6 md:p-8">
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">edit_square</span>
                                        Logistics Information
                                    </h3>
                                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                        {/* Courier Selection */}
                                        <div>
                                            <label
                                                className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                                                htmlFor="courier"
                                            >
                                                Courier Name
                                            </label>
                                            <div className="relative">
                                                <select
                                                    className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-primary focus:border-primary py-3 pl-4 pr-10 appearance-none transition-all"
                                                    id="courier"
                                                    defaultValue=""
                                                >
                                                    <option disabled value="">
                                                        Select a shipping provider
                                                    </option>
                                                    <option value="fedex">FedEx Corporation</option>
                                                    <option value="ups">UPS (United Parcel Service)</option>
                                                    <option value="dhl">DHL Express</option>
                                                    <option value="usps">USPS (United States Postal Service)</option>
                                                    <option value="other">Other / Local Carrier</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                                                    <span className="material-symbols-outlined">expand_more</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Tracking Number */}
                                        <div>
                                            <label
                                                className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                                                htmlFor="tracking"
                                            >
                                                Tracking Number
                                            </label>
                                            <div className="relative">
                                                <input
                                                    className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-primary focus:border-primary py-3 px-4 transition-all"
                                                    id="tracking"
                                                    placeholder="e.g., 1Z999AA10123456784"
                                                    type="text"
                                                />
                                                <div className="absolute inset-y-0 right-0 flex items-center px-3">
                                                    <button
                                                        className="text-primary/60 hover:text-primary transition-colors"
                                                        type="button"
                                                    >
                                                        <span className="material-symbols-outlined">content_paste</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="mt-1 text-xs text-slate-500">
                                                The customer will receive an email notification with this link.
                                            </p>
                                        </div>

                                        {/* Estimated Delivery */}
                                        <div>
                                            <label
                                                className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                                                htmlFor="delivery_date"
                                            >
                                                Estimated Delivery Date
                                            </label>
                                            <div className="relative">
                                                <input
                                                    className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-primary focus:border-primary py-3 px-4 transition-all"
                                                    id="delivery_date"
                                                    type="date"
                                                />
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                                                    <span className="material-symbols-outlined">calendar_today</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="pt-4 flex flex-col sm:flex-row gap-3">
                                            <button
                                                className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-md flex items-center justify-center gap-2 group"
                                                type="submit"
                                            >
                                                Ship Order
                                                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                                                    send
                                                </span>
                                            </button>
                                            <button
                                                className="px-6 py-3 text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                                type="button"
                                            >
                                                Save Draft
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Right Column: Order Summary */}
                            <div className="lg:col-span-5">
                                <div className="sticky top-8 space-y-6">
                                    {/* Order Quick View */}
                                    <div className="bg-white dark:bg-background-dark/30 rounded-xl border border-primary/10 shadow-sm overflow-hidden">
                                        <div className="bg-primary/5 p-4 border-b border-primary/10">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                                                    Awaiting Shipment
                                                </span>
                                                <span className="text-sm font-medium text-slate-500">#ORD-8821</span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-start gap-4 mb-6">
                                                <div className="size-16 rounded-lg bg-slate-100 dark:bg-slate-800 flex-shrink-0 flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-slate-400 text-3xl">
                                                        shopping_bag
                                                    </span>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-900 dark:text-slate-100">
                                                        Premium Leather Tote
                                                    </h4>
                                                    <p className="text-sm text-slate-500">
                                                        Color: Midnight Black • Qty: 1
                                                    </p>
                                                    <p className="text-primary font-semibold mt-1">$245.00</p>
                                                </div>
                                            </div>
                                            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                                <div className="flex items-start gap-3">
                                                    <span className="material-symbols-outlined text-slate-400 text-xl">
                                                        person
                                                    </span>
                                                    <div>
                                                        <p className="text-xs font-bold text-slate-500 uppercase">Customer</p>
                                                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                                            Johnathan Doe
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <span className="material-symbols-outlined text-slate-400 text-xl">
                                                        location_on
                                                    </span>
                                                    <div>
                                                        <p className="text-xs font-bold text-slate-500 uppercase">
                                                            Destination
                                                        </p>
                                                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
                                                            123 Manhattan Ave, Suite 402
                                                            <br />
                                                            New York, NY 10001
                                                            <br />
                                                            United States
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <span className="material-symbols-outlined text-slate-400 text-xl">
                                                        mail
                                                    </span>
                                                    <div>
                                                        <p className="text-xs font-bold text-slate-500 uppercase">Contact</p>
                                                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                                            j.doe@example.com
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Map / Location Hint */}
                                    <div className="rounded-xl overflow-hidden h-40 relative group border border-primary/10">
                                        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 flex flex-col items-center justify-center gap-2">
                                            <span className="material-symbols-outlined text-4xl text-slate-400 group-hover:scale-110 transition-transform">
                                                map
                                            </span>
                                            <p className="text-xs font-medium text-slate-500">
                                                Shipping to New York, NY
                                            </p>
                                        </div>
                                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <img
                                            className="w-full h-full object-cover grayscale opacity-50"
                                            alt="Stylized map showing shipping destination in New York"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoxpUrjoaqf78ivqtBYNThEeIK1xaVUR3rOiVFrcfnyyrvszfUFNql7g1rskousA37PDz1-mPatitZcr_dHkpl0meXwhe8ef9nIwX5VcIjBC0GMtvIfBqwB7fh78GkRmyvynIiDPTFbl7nI-OBqTiuGCLbPbhgy3TGO7pr4GbY6g2JBt099me0QcEjWSv5fgan0q0gM1iD1FoQsCpWz65R1BnuKcGAgim7t2FrIwXuKxBoog77ZAMxn1APs8c2Tqz_twgC2Rid-b07"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="mt-auto px-6 py-8 md:px-40 border-t border-primary/10 bg-white dark:bg-background-dark/50">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-slate-500">
                            © 2024 VendorHub Logistics. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm text-slate-500">
                            <a className="hover:text-primary transition-colors" href="#">
                                Privacy Policy
                            </a>
                            <a className="hover:text-primary transition-colors" href="#">
                                Support Center
                            </a>
                            <a className="hover:text-primary transition-colors" href="#">
                                Carrier Partners
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default VendorShipping;
