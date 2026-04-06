import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Vendor Registration Page (Step 3 of 5: Categories)
 *
 * Multi-step registration flow:
 * - Sticky navbar: chair logo (primary bg), FurniCustom + "Vendor Portal" label,
 *   Help Center / Contact Support nav, "Save for Later" outline button
 * - Progress stepper: Step 3 of 5, 60% bar, step labels
 *   (Company ✓, Tax & Legal ✓, Categories [active], Contact, Documents)
 * - Form container (shadow-xl):
 *   - Business Specialization heading + description
 *   - Business Details: Company Legal Name + GST / Tax ID (2-col grid)
 *   - Category Selection: 8 icon cards (4-col grid) with checkboxes
 *     (Sofas ✓, Beds ✓ selected, Dining, Office, Outdoor, Storage, Kids, Others)
 *   - Document Upload: dashed drop zone, uploaded file preview with remove
 *   - Navigation: Back (arrow_back) + Continue to Contact (primary CTA)
 * - Footer: Privacy/Terms links, social icons (GitHub, LinkedIn)
 * - Support bubble: fixed bottom-right chat FAB
 *
 * Route: /vendor-register
 */

const STEPS = [
    { label: 'Company', completed: true },
    { label: 'Tax & Legal', completed: true },
    { label: 'Categories', active: true },
    { label: 'Contact', upcoming: true },
    { label: 'Documents', upcoming: true },
];

const CATEGORIES = [
    { icon: 'weekend', label: 'Sofas', defaultChecked: true, selected: false },
    { icon: 'bed', label: 'Beds', defaultChecked: true, selected: true },
    { icon: 'table_restaurant', label: 'Dining', defaultChecked: false, selected: false },
    { icon: 'desk', label: 'Office', defaultChecked: false, selected: false },
    { icon: 'deck', label: 'Outdoor', defaultChecked: false, selected: false },
    { icon: 'shelves', label: 'Storage', defaultChecked: false, selected: false },
    { icon: 'stroller', label: 'Kids', defaultChecked: false, selected: false },
    { icon: 'add_circle', label: 'Others', defaultChecked: false, selected: false },
];

const VendorRegister = () => {
    const [categories, setCategories] = useState(
        CATEGORIES.map((c) => ({ ...c, checked: c.defaultChecked }))
    );

    const toggleCategory = (index) => {
        setCategories((prev) =>
            prev.map((cat, i) =>
                i === index ? { ...cat, checked: !cat.checked } : cat
            )
        );
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 lg:px-20 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="bg-primary p-2 rounded-lg text-white">
                            <span className="material-symbols-outlined block">chair</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight">FurniCustom</h1>
                            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                                Vendor Portal
                            </p>
                        </div>
                    </Link>
                    <div className="flex items-center gap-6">
                        <nav className="hidden md:flex items-center gap-8">
                            <a
                                className="text-sm font-medium hover:text-primary transition-colors"
                                href="#"
                            >
                                Help Center
                            </a>
                            <a
                                className="text-sm font-medium hover:text-primary transition-colors"
                                href="#"
                            >
                                Contact Support
                            </a>
                        </nav>
                        <button className="text-sm font-semibold text-primary border border-primary px-4 py-2 rounded-lg hover:bg-primary/5 transition-all">
                            Save for Later
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-12">
                {/* Progress Stepper */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold text-primary uppercase tracking-widest">
                            Step 3 of 5
                        </span>
                        <span className="text-sm font-medium text-slate-500">60% Complete</span>
                    </div>
                    <div className="relative h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="absolute top-0 left-0 h-full bg-primary rounded-full"
                            style={{ width: '60%' }}
                        />
                    </div>
                    <div className="grid grid-cols-5 gap-2 mt-4">
                        {STEPS.map((step, index) => (
                            <div
                                key={index}
                                className={`text-[10px] md:text-xs font-${step.upcoming ? 'medium' : 'bold'} text-center ${step.upcoming
                                        ? 'text-slate-400'
                                        : 'text-primary'
                                    } ${step.active ? 'underline decoration-2 underline-offset-4' : ''}`}
                            >
                                {step.label}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Container */}
                <div className="bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                    <div className="p-8 md:p-12">
                        <div className="mb-10">
                            <h2 className="text-3xl font-bold mb-2">Business Specialization</h2>
                            <p className="text-slate-500 dark:text-slate-400">
                                Select the categories of furniture your business manufactures or supplies. This
                                helps us match you with relevant customers.
                            </p>
                        </div>

                        <form
                            className="space-y-10"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            {/* Business Details Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        Company Legal Name
                                    </label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                        placeholder="e.g. Royal Woods Manufacturing"
                                        type="text"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        GST / Tax ID Number
                                    </label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                        placeholder="Enter 15-digit Tax ID"
                                        type="text"
                                    />
                                </div>
                            </div>

                            {/* Category Selection Grid */}
                            <div className="space-y-4">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    Primary Product Categories
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {categories.map((cat, index) => (
                                        <label
                                            key={index}
                                            className={`relative flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer hover:border-primary/50 transition-all ${cat.checked && cat.selected
                                                    ? 'border-primary bg-primary/5'
                                                    : cat.checked
                                                        ? 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50'
                                                        : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50'
                                                }`}
                                        >
                                            <input
                                                checked={cat.checked}
                                                onChange={() => toggleCategory(index)}
                                                className="absolute top-2 right-2 rounded text-primary focus:ring-primary h-4 w-4"
                                                type="checkbox"
                                            />
                                            <span
                                                className={`material-symbols-outlined text-3xl mb-2 ${cat.checked ? 'text-primary' : 'text-slate-400'
                                                    }`}
                                            >
                                                {cat.icon}
                                            </span>
                                            <span className="text-xs font-bold uppercase tracking-wide">
                                                {cat.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* File Upload Section */}
                            <div className="space-y-4">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    Document Upload (GST Certificate / Trade License)
                                </label>
                                <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-10 flex flex-col items-center justify-center text-center bg-slate-50/30 dark:bg-slate-800/30 hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <div className="bg-primary/10 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-primary text-3xl block">
                                            cloud_upload
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold mb-1">Click to upload or drag and drop</h3>
                                    <p className="text-sm text-slate-500">PDF, JPG or PNG (max. 10MB)</p>
                                    <input className="hidden" type="file" />
                                </div>
                                {/* File list preview */}
                                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary">description</span>
                                        <span className="text-sm font-medium">business_license_2024.pdf</span>
                                    </div>
                                    <button
                                        className="text-slate-400 hover:text-red-500"
                                        type="button"
                                    >
                                        <span className="material-symbols-outlined text-sm">close</span>
                                    </button>
                                </div>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex items-center justify-between pt-8 border-t border-slate-100 dark:border-slate-800">
                                <button
                                    className="flex items-center gap-2 px-6 py-3 font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                                    type="button"
                                >
                                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                                    Back
                                </button>
                                <button
                                    className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95"
                                    type="submit"
                                >
                                    Continue to Contact
                                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="mt-12 text-center space-y-4">
                    <p className="text-sm text-slate-500">
                        Your data is securely stored. View our{' '}
                        <a className="text-primary underline" href="#">
                            Privacy Policy
                        </a>{' '}
                        and{' '}
                        <a className="text-primary underline" href="#">
                            Vendor Terms of Service
                        </a>
                        .
                    </p>
                    <div className="flex justify-center gap-8 opacity-40 grayscale">
                        <div className="size-8">
                            <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                            </svg>
                        </div>
                        <div className="size-8">
                            <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </main>

            {/* Support Bubble */}
            <div className="fixed bottom-8 right-8 z-50">
                <button className="bg-primary text-white p-4 rounded-full shadow-2xl shadow-primary/40 hover:scale-110 transition-transform flex items-center justify-center">
                    <span className="material-symbols-outlined">chat</span>
                </button>
            </div>
        </div>
    );
};

export default VendorRegister;
