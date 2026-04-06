import { Link } from 'react-router-dom';

/**
 * Vendor Profile Page (Public-Facing)
 *
 * Public vendor profile with hero, details, and contact sidebar:
 * - Header (sticky z-50 backdrop-blur-md): chair icon (text-primary text-3xl),
 *   "Customizer" (xl font-bold), nav (Vendors active border-b-2 border-primary),
 *   search (w-64), Sign In button (bg-primary)
 * - Hero Card: gradient banner (h-48 from-primary/20 to-primary/5),
 *   vendor logo (h-32 w-32 rounded-xl shadow-lg, carpenter icon text-5xl),
 *   "Artisan Woodworks Co." (3xl font-bold) + verified badge (text-primary),
 *   tagline italic, Message + Request a Quote buttons
 * - Left Column (lg:col-span-2):
 *   - About Our Craft: info icon, 2 paragraphs prose
 *   - Specialties & Categories: 6 tags (bg-primary/10 border-primary/20
 *     rounded-full hover:bg-primary hover:text-white)
 * - Right Column Sidebar:
 *   - Contact Info: location_on (address + View on Map link),
 *     call (phone), schedule (working hours)
 *   - Connect With Us: 4 social icons grid (Instagram, Facebook,
 *     LinkedIn SVGs + public icon)
 *   - Map placeholder (h-48 bg-slate-300, map icon, "View Showroom Location")
 * - Footer: chair icon, Privacy/Terms/Safety links, copyright
 *
 * Route: /vendor-profile
 */

const SPECIALTIES = [
    'Custom Dining Tables',
    'Sustainable Hardwood',
    'Modern Minimalist',
    'Mid-Century Restoration',
    'Luxury Office',
    'Hand-Carved Accents',
];

const VendorProfile = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-300 min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-8">
                            <Link to="/" className="flex items-center gap-2 text-primary">
                                <span className="material-symbols-outlined text-3xl">chair</span>
                                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                                    Customizer
                                </h1>
                            </Link>
                            <nav className="hidden md:flex items-center gap-6">
                                <a className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors" href="#">
                                    Browse
                                </a>
                                <a className="text-sm font-medium text-slate-900 dark:text-white border-b-2 border-primary pb-1" href="#">
                                    Vendors
                                </a>
                                <a className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors" href="#">
                                    Portfolio
                                </a>
                                <a className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors" href="#">
                                    How it Works
                                </a>
                            </nav>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative hidden sm:block">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                                    search
                                </span>
                                <input
                                    className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary w-64"
                                    placeholder="Search furniture..."
                                    type="text"
                                />
                            </div>
                            <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all">
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Hero Profile Card */}
                <div className="relative mb-8 overflow-hidden rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800">
                    <div className="h-48 w-full bg-gradient-to-r from-primary/20 to-primary/5" />
                    <div className="px-8 pb-8">
                        <div className="relative -mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                            <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                                <div className="h-32 w-32 rounded-xl bg-white dark:bg-slate-800 p-2 shadow-lg border border-slate-100 dark:border-slate-700">
                                    <div className="h-full w-full rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                                        <span className="material-symbols-outlined text-5xl text-primary">carpenter</span>
                                    </div>
                                </div>
                                <div className="text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                                            Artisan Woodworks Co.
                                        </h2>
                                        <span
                                            className="material-symbols-outlined text-primary text-xl"
                                            title="Verified Vendor"
                                        >
                                            verified
                                        </span>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium italic">
                                        "Crafting legacies, one joint at a time."
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3 w-full md:w-auto">
                                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-6 py-3 rounded-lg font-bold transition-all">
                                    <span className="material-symbols-outlined text-xl">mail</span>
                                    Message
                                </button>
                                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-lg shadow-primary/20">
                                    Request a Quote
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* About */}
                        <section className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">info</span>
                                About Our Craft
                            </h3>
                            <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
                                <p>
                                    At Artisan Woodworks Co., we specialize in creating bespoke furniture pieces that
                                    blend traditional craftsmanship with modern design aesthetics. Our team of expert
                                    woodworkers uses only the finest sustainable materials to ensure every piece is not
                                    just a furniture item, but a legacy.
                                </p>
                                <p>
                                    Founded in 1995, we have spent nearly three decades perfecting the art of joinery.
                                    Whether you&apos;re looking for a live-edge dining table that serves as a
                                    conversation starter or a minimalist office setup designed for productivity, our
                                    artisans bring your vision to life with precision and passion.
                                </p>
                            </div>
                        </section>

                        {/* Specialties */}
                        <section className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
                                Specialties &amp; Categories
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {SPECIALTIES.map((s) => (
                                    <span
                                        key={s}
                                        className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-semibold hover:bg-primary hover:text-white transition-all cursor-default"
                                    >
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column Sidebar */}
                    <div className="space-y-8">
                        {/* Contact Info */}
                        <section className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Contact Info</h3>
                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <div className="h-10 w-10 flex shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <span className="material-symbols-outlined">location_on</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">Studio Address</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            1242 Timber Creek Way,
                                            <br />
                                            Portland, OR 97201
                                        </p>
                                        <a className="text-xs text-primary font-bold hover:underline mt-1 block" href="#">
                                            View on Map
                                        </a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="h-10 w-10 flex shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <span className="material-symbols-outlined">call</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">Phone Number</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">+1 (503) 555-0192</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="h-10 w-10 flex shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <span className="material-symbols-outlined">schedule</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">Working Hours</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            Mon - Fri: 9:00 AM - 6:00 PM
                                        </p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            Sat: 10:00 AM - 2:00 PM
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </section>

                        {/* Social Links */}
                        <section className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
                                Connect With Us
                            </h3>
                            <div className="grid grid-cols-4 gap-4">
                                {/* Instagram */}
                                <a
                                    className="h-12 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary hover:bg-primary/5 text-slate-600 dark:text-slate-400 hover:text-primary transition-all group"
                                    href="#"
                                >
                                    <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.56.216.96.474 1.38.894.42.42.678.82.894 1.38.163.422.358 1.057.412 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.216.56-.474.96-.894 1.38-.42.42-.82.678-1.38.894-.422.163-1.057.358-2.227.412-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.56-.216-.96-.474-1.38-.894-.42-.42-.678-.82-.894-1.38-.163-.422-.358-1.057-.412-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.216-.56.474-.96.894-1.38.42-.42.82-.678 1.38-.894.422-.163 1.057-.358 2.227-.412 1.266-.058 1.646-.07 4.85-.07zM12 0C8.741 0 8.333.014 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.132 5.775.072 7.053.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126s1.384 1.078 2.126 1.384c.766.296 1.636.499 2.913.558C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384s1.078-1.384 1.384-2.126c.296-.765.499-1.636.558-2.913.058-1.28.072-1.687.072-4.947s-.014-3.667-.072-4.947c-.06-1.277-.262-2.148-.558-2.913-.306-.789-.718-1.459-1.384-2.126s-1.384-1.078-2.126-1.384c-.765-.296-1.636-.499-2.913-.558C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                    </svg>
                                </a>
                                {/* Facebook */}
                                <a
                                    className="h-12 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary hover:bg-primary/5 text-slate-600 dark:text-slate-400 hover:text-primary transition-all group"
                                    href="#"
                                >
                                    <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                        <path d="M24 12.01c0 3.296-2.322 6.059-5.412 6.643v-4.696h1.696l.324-1.948h-2.02v-1.264c0-.565.276-1.116 1.164-1.116h.9v-1.658s-.817-.14-1.597-.14c-1.63 0-2.693.988-2.693 2.775v1.403h-1.71v1.948h1.71v4.696c-3.09-.584-5.412-3.347-5.412-6.643 0-3.75 3.04-6.79 6.79-6.79s6.79 3.04 6.79 6.79z" />
                                    </svg>
                                </a>
                                {/* LinkedIn */}
                                <a
                                    className="h-12 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary hover:bg-primary/5 text-slate-600 dark:text-slate-400 hover:text-primary transition-all group"
                                    href="#"
                                >
                                    <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                                {/* Website */}
                                <a
                                    className="h-12 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary hover:bg-primary/5 text-slate-600 dark:text-slate-400 hover:text-primary transition-all group"
                                    href="#"
                                >
                                    <span className="material-symbols-outlined text-2xl">public</span>
                                </a>
                            </div>
                        </section>

                        {/* Map Placeholder */}
                        <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm relative h-48 bg-slate-200 dark:bg-slate-800">
                            <div className="absolute inset-0 bg-slate-300 dark:bg-slate-700 flex items-center justify-center">
                                <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-4xl">
                                    map
                                </span>
                            </div>
                            <div className="absolute bottom-4 left-4 bg-white dark:bg-slate-900 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                View Showroom Location
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-2 text-slate-400">
                            <span className="material-symbols-outlined text-2xl">chair</span>
                            <span className="font-bold text-lg tracking-tight">Furniture Customizer</span>
                        </div>
                        <div className="flex gap-8 text-sm text-slate-500 dark:text-slate-400">
                            <a className="hover:text-primary transition-colors" href="#">
                                Privacy Policy
                            </a>
                            <a className="hover:text-primary transition-colors" href="#">
                                Terms of Service
                            </a>
                            <a className="hover:text-primary transition-colors" href="#">
                                Safety Center
                            </a>
                        </div>
                        <p className="text-sm text-slate-400">
                            © 2024 Furniture Customizer Platform. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default VendorProfile;
