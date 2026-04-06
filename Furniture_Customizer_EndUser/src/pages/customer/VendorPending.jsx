import { Link } from 'react-router-dom';

/**
 * Vendor Application Pending Page
 *
 * Status page shown after vendor registration submission:
 * - Navbar: chair logo (primary bg), "FurniCustom", Help Center link, "JD" initials avatar
 * - Hero: find_in_page icon (primary/10 circle), "Welcome to the FurniCustom Family!"
 * - Status Card (shadow-xl, primary accent bar):
 *   - Header: "Application Status" + Ref ID #FC-99281-VEN + amber "In Progress" badge
 *   - Timeline (3 steps):
 *     1. Registration Complete ✅ (green-500) — Oct 24, 2023
 *     2. Admin Review 🔵 (active, animate-pulse dot) — 24-48 hours
 *     3. Store Live ⚪ (pending, slate-200 border)
 *   - Info box: "What you can prepare" — 3 bullet points
 *   - Footer: "Go Back to Home" CTA + "Contact Support" link
 * - Promo cards: Seller Handbook + Community Forum (hover scale-110 bg images)
 * - Footer: © 2023 FurniCustom
 *
 * Route: /vendor-pending
 */

const TIMELINE_STEPS = [
    {
        icon: 'check',
        iconClass: 'w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center',
        title: 'Registration Complete',
        titleClass: 'font-semibold text-slate-900 dark:text-slate-100',
        subtitle: 'Form submitted on October 24, 2023',
        subtitleClass: 'text-sm text-slate-500',
        showLine: true,
        pulse: false,
    },
    {
        icon: 'manage_search',
        iconClass:
            'w-8 h-8 rounded-full border-2 border-primary bg-primary/5 text-primary flex items-center justify-center relative',
        title: 'Admin Review',
        titleClass: 'font-bold text-primary',
        subtitle: (
            <>
                Our team is verifying your business documents. This usually takes{' '}
                <span className="font-bold text-slate-700 dark:text-slate-300">24-48 hours</span>.
            </>
        ),
        subtitleClass: 'text-sm text-slate-500',
        showLine: true,
        pulse: true,
    },
    {
        icon: 'storefront',
        iconClass:
            'w-8 h-8 rounded-full border-2 border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600 flex items-center justify-center',
        title: 'Store Live',
        titleClass: 'font-semibold text-slate-400 dark:text-slate-600',
        subtitle: 'Start listing your unique furniture pieces',
        subtitleClass: 'text-sm text-slate-400 dark:text-slate-600',
        showLine: false,
        pulse: false,
    },
];

const PROMO_CARDS = [
    {
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuD_eFKqW4TpsSatwW7fdJcd6Vjho52Yw-ky0kImy-oVD_zB6f8n4bUpv6ia9lBEFRDwHzfkLVBtAqhkh4Z_38k-6Hs_g874o-QBUHLWjzrZn4Q4snpEHh243Yw_8IAoaFcV2N93A0otjJRu5JPDat9lSQOEHr8EyjrU3vR-aRjVozIgHEawctUVF9h0e8-S_9orw-g6uCXkJ3mhUIAKy-oKEDdPvW12TCYr1BzPqZIBF1CPp_wbP6iMDFwnUSFqypqqc-QyvS3JSmMG',
        title: 'Seller Handbook',
        subtitle: 'Read tips on maximizing sales',
    },
    {
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCBF9JM98xLtYvIeh8W_g3IvUlPoKhIWPgDjRbQJkLMuCghtmZR4PyhRCqbvprlV3pE0-XTZNBA2tFNA2YMitB6Xkitnvc5j7lwrK_bYXb4d3ki_dot-rxi3cVEpoyHaEiSU9dB-JoG7lbJU4ybY3A7EDYuhhzG1w9GxG7OV_8vfn4yq7tb-d7yj6HUwIhdM9sF0bCElADJsn-jBj4XHq7y9RpF3hNXSAmgnFT_IinrNy0_2KZipsjJP68nqazvTGPn02p7QTufg9So',
        title: 'Community Forum',
        subtitle: 'Connect with other artisans',
    },
];

const VendorPending = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display">
            {/* Top Navigation Bar */}
            <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-4 lg:px-10">
                <Link to="/" className="flex items-center gap-3">
                    <div className="bg-primary text-white p-1.5 rounded-lg flex items-center justify-center">
                        <span className="material-symbols-outlined text-2xl">chair</span>
                    </div>
                    <h2 className="text-xl font-bold tracking-tight">FurniCustom</h2>
                </Link>
                <div className="flex items-center gap-4">
                    <button className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">
                        Help Center
                    </button>
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs border border-primary/20">
                        JD
                    </div>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center p-6 lg:p-10">
                <div className="max-w-2xl w-full">
                    {/* Hero Status Illustration */}
                    <div className="mb-8 text-center">
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6">
                            <span className="material-symbols-outlined text-5xl text-primary">find_in_page</span>
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-black mb-4 tracking-tight">
                            Welcome to the FurniCustom Family!
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-lg mx-auto leading-relaxed">
                            Your vendor application is currently under review by our admin team to ensure the
                            highest marketplace quality.
                        </p>
                    </div>

                    {/* Status Card */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden mb-8">
                        {/* Card Header Accent */}
                        <div className="h-1.5 w-full bg-primary" />

                        <div className="p-8">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                                <div>
                                    <h3 className="text-lg font-bold">Application Status</h3>
                                    <p className="text-sm text-slate-400">Reference ID: #FC-99281-VEN</p>
                                </div>
                                <div className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">schedule</span>
                                    In Progress
                                </div>
                            </div>

                            {/* Visual Timeline */}
                            <div className="relative flex flex-col gap-8">
                                {TIMELINE_STEPS.map((step, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className={step.iconClass}>
                                                <span className="material-symbols-outlined text-xl">{step.icon}</span>
                                                {step.pulse && (
                                                    <span className="absolute -right-1 -top-1 block h-3 w-3 rounded-full bg-primary ring-2 ring-white dark:ring-slate-900 animate-pulse" />
                                                )}
                                            </div>
                                            {step.showLine && (
                                                <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-700 min-h-[2rem]" />
                                            )}
                                        </div>
                                        <div className="pb-2">
                                            <p className={step.titleClass}>{step.title}</p>
                                            <p className={step.subtitleClass}>{step.subtitle}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                                <p className="text-sm font-medium mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-lg">info</span>
                                    What you can prepare in the meantime:
                                </p>
                                <ul className="text-sm text-slate-500 dark:text-slate-400 space-y-2 ml-7 list-disc">
                                    <li>High-quality photos of your top 5 furniture products.</li>
                                    <li>Clear descriptions and shipping dimensions for each item.</li>
                                    <li>Your primary bank account details for payouts.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Card Footer Actions */}
                        <div className="px-8 py-6 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <Link
                                to="/"
                                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-blue-700 transition-all"
                            >
                                Go Back to Home
                            </Link>
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                Need help?{' '}
                                <a
                                    className="text-primary font-semibold hover:underline flex items-center"
                                    href="#"
                                >
                                    Contact Support{' '}
                                    <span className="material-symbols-outlined text-sm ml-0.5">open_in_new</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Promotion / Feature Area */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {PROMO_CARDS.map((card, index) => (
                            <div key={index} className="relative h-48 rounded-xl overflow-hidden group">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                    style={{ backgroundImage: `url('${card.image}')` }}
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                                    <div>
                                        <p className="text-white font-bold">{card.title}</p>
                                        <p className="text-white/80 text-xs">{card.subtitle}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <footer className="p-6 text-center text-slate-400 text-xs mt-auto">
                © 2023 FurniCustom Marketplace. All rights reserved.
            </footer>
        </div>
    );
};

export default VendorPending;
