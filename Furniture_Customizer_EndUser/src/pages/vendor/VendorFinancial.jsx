import { Link } from 'react-router-dom';

/**
 * Vendor Financial Profile Page
 *
 * Financial profile management with verification progress:
 * - Header (sticky z-50 backdrop-blur-md): account_balance icon (bg-primary),
 *   "Financial Profile" (xl font-bold), notifications, avatar
 * - Verification Progress: "Account Verification Status", "Partially Verified"
 *   (amber pill), 65% progress bar (bg-primary)
 * - Tax Information section: Verified (green badge), Legal Business Name,
 *   GST/Tax ID, Registered Address textarea
 * - Bank Account Details: Action Required (amber badge), Bank Name,
 *   Account Holder, Account Number (password + visibility toggle),
 *   SWIFT/BIC Code
 * - Verification Documents: GST Certificate (Approved green), Bank Statement
 *   (dashed upload placeholder with Upload button)
 * - Payout Preferences: Frequency (Daily/Weekly active/Monthly), Minimum
 *   Threshold ($100)
 * - Security footer: lock icon + PCI-DSS text
 * - Sticky action footer: Last updated, Cancel + Save Changes buttons
 *
 * Route: /vendor-financial
 */

const VendorFinancial = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="bg-primary p-1.5 rounded-lg text-white flex items-center justify-center">
                                <span className="material-symbols-outlined">account_balance</span>
                            </div>
                            <h1 className="text-xl font-bold tracking-tight">Financial Profile</h1>
                        </Link>
                        <div className="flex items-center gap-4">
                            <button className="p-2 text-slate-500 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined">notifications</span>
                            </button>
                            <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border border-slate-200 dark:border-slate-800">
                                <img
                                    className="h-full w-full object-cover"
                                    alt="User profile avatar"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwCafmu7pfQSHcUnoh4Tn6DEh_dm8cW_YmAdD-2G_3ihaFgMqa-INh5teaBZtSLCFZ6g9svWHKXbFz7N4jNqjxfCltE7n7ZzWA_T6CFMfbOFWQYd_lYvGsgSz3v3PUoF1Eo8wd1DDKfk-gicQIbdu9iG8aEkn_wCu5xzXvgAXF1aFjwGimWrdE7tNlLZEKOsARsACQ1zUpZG1RJ7u1YRd_EQAsdPNbKMtBs557-PmXJpcD2YYS5GXZLkQr8jaasnVh0dQ1udkf5387"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Verification Progress */}
                <div className="mb-8 p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                            <h2 className="text-lg font-semibold">Account Verification Status</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Complete your profile to enable automatic payouts.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-full text-sm font-medium">
                            <span className="material-symbols-outlined text-[18px]">info</span>
                            Partially Verified
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                            <span>Overall Progress</span>
                            <span className="text-primary">65%</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5">
                            <div className="bg-primary h-2.5 rounded-full" style={{ width: '65%' }} />
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Tax Information */}
                    <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">description</span>
                                <h3 className="text-lg font-semibold">Tax Information</h3>
                            </div>
                            <span className="inline-flex items-center rounded-full bg-green-50 dark:bg-green-900/20 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:text-green-400">
                                <span className="mr-1 h-1 w-1 rounded-full bg-green-600 dark:bg-green-400" />
                                Verified
                            </span>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Legal Business Name
                                </label>
                                <input
                                    className="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-primary focus:border-primary"
                                    type="text"
                                    defaultValue="Vertex Solutions LLC"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    GST / Tax ID Number
                                </label>
                                <input
                                    className="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-primary focus:border-primary"
                                    type="text"
                                    defaultValue="TX-98234-LLC"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Registered Address
                                </label>
                                <textarea
                                    className="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-primary focus:border-primary"
                                    rows="2"
                                    defaultValue="123 Business Way, Suite 500, Tech City, CA 94043"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Bank Account Details */}
                    <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">payments</span>
                                <h3 className="text-lg font-semibold">Bank Account Details</h3>
                            </div>
                            <span className="inline-flex items-center rounded-full bg-amber-50 dark:bg-amber-900/20 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400">
                                <span className="mr-1 h-1 w-1 rounded-full bg-amber-600 dark:bg-amber-400" />
                                Action Required
                            </span>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Bank Name
                                    </label>
                                    <input
                                        className="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:ring-primary focus:border-primary"
                                        placeholder="Global Trust Bank"
                                        type="text"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Account Holder Name
                                    </label>
                                    <input
                                        className="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:ring-primary focus:border-primary"
                                        placeholder="John Doe"
                                        type="text"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                        Account Number / IBAN
                                        <span className="material-symbols-outlined text-xs cursor-help text-slate-400">
                                            help_outline
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:ring-primary focus:border-primary pr-10"
                                            type="password"
                                            defaultValue="8827364519"
                                        />
                                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary">
                                            <span className="material-symbols-outlined text-[20px]">visibility</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        SWIFT / BIC Code
                                    </label>
                                    <input
                                        className="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:ring-primary focus:border-primary"
                                        placeholder="GTBUSA33"
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Verification Documents */}
                    <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">upload_file</span>
                                <h3 className="text-lg font-semibold">Verification Documents</h3>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            {/* Uploaded Document */}
                            <div className="flex items-center justify-between p-4 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                                        <span className="material-symbols-outlined">description</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">GST Certificate</p>
                                        <p className="text-xs text-slate-500">gst_cert_2023.pdf • 1.2 MB</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
                                        Approved
                                    </span>
                                    <button className="text-slate-400 hover:text-red-500 transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">delete</span>
                                    </button>
                                </div>
                            </div>

                            {/* Upload Placeholder */}
                            <div className="flex items-center justify-between p-4 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-primary transition-colors cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary rounded-lg">
                                        <span className="material-symbols-outlined">add_circle</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Bank Statement / Voided Check</p>
                                        <p className="text-xs text-slate-500">
                                            Missing - Required for account verification
                                        </p>
                                    </div>
                                </div>
                                <button className="px-4 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary/90 transition-all">
                                    Upload
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Payout Preferences */}
                    <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">schedule</span>
                                <h3 className="text-lg font-semibold">Payout Preferences</h3>
                            </div>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Payout Frequency
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    <button className="px-3 py-2 text-xs font-medium border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
                                        Daily
                                    </button>
                                    <button className="px-3 py-2 text-xs font-medium border-2 border-primary bg-primary/5 text-primary rounded-lg">
                                        Weekly
                                    </button>
                                    <button className="px-3 py-2 text-xs font-medium border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
                                        Monthly
                                    </button>
                                </div>
                                <p className="text-xs text-slate-500">
                                    Payouts are processed every Monday at 10:00 AM UTC.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Minimum Threshold
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                    <input
                                        className="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:ring-primary focus:border-primary pl-7"
                                        type="number"
                                        defaultValue={100}
                                    />
                                </div>
                                <p className="text-xs text-slate-500">
                                    Hold payments until balance exceeds this amount.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Security Footer Note */}
                    <div className="flex items-center gap-3 justify-center text-slate-500 py-4">
                        <span className="material-symbols-outlined text-[20px]">lock</span>
                        <p className="text-xs">
                            Your data is encrypted and stored according to PCI-DSS compliance standards.
                        </p>
                    </div>
                </div>
            </main>

            {/* Sticky Action Footer */}
            <div className="sticky bottom-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-4 px-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <div className="hidden sm:block">
                        <p className="text-sm text-slate-500">Last updated: Oct 24, 2023</p>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                            Cancel
                        </button>
                        <button className="flex-1 sm:flex-none px-8 py-2.5 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">save</span>
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorFinancial;
