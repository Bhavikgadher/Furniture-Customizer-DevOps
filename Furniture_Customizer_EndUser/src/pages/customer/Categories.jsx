import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Categories Page
 *
 * "Shop by Category" page with:
 * - CustomerNavbar (with cart/profile icons)
 * - Breadcrumbs (Home > Furniture)
 * - Page header with "Consult a Designer" CTA
 * - Filter/quick-sort bar (All Categories, Indoor, Outdoor, New Arrivals)
 * - 2x2 category grid (Living Room, Bedroom, Dining, Office)
 * - Custom design CTA section
 * - CatalogFooter
 *
 * Route: /categories
 */

const FILTERS = ['All Categories', 'Indoor', 'Outdoor', 'New Arrivals'];

const CATEGORIES = [
    {
        title: 'Living Room',
        description:
            'Elevate your common spaces with modular sofas and handcrafted coffee tables designed for life.',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDST3aMjD-Q-9Az--Xrh4ENTYq3qgzdi-nbCDFl_ztKMZ60Njbl0F1FywpsmgRRUIIcwlbX4sb3ppk8M4sE4lOwP9_Z9ja988HhIXC6Q-dnaysuOJj-R_BLkU_esi_ATog6oQZLDn372y3E3eBSb3UDnvJ0Qcly7J-M0No4i2woUKYHjjucvxT9spmXkHMvb2b94-e8w4mybv90OB693uc2t54tqUfyqXQoeNYPyro_Fw5l97o-qBZp9eGI6ThKHBr2upz6LBMLqZKy',
        alt: 'Modern living room with green velvet sofa and wooden table',
        tags: ['Indoor', 'New Arrivals'],
    },
    {
        title: 'Bedroom',
        description:
            'Create a sanctuary with our bespoke bed frames and artisanal nightstands for ultimate comfort.',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBFeTK28mqNKICXfj4srO19EbgBhRp7Nz9NDzfWUSownhHkFJEUpqORGqYEp-xiVHVaYsxPCLLvFuMz_HVhdZMUARRg0cc5WKISDWarkUaPTuYkMZ9ExZtM7gz-LWdd9pM2BShXKVCHzUgwWSEzYxTIMMkx33fdRLmyrR_E-AsaNTpgT8IrpYyqwFkZlb9XsZujWPW5x0Ul-bU24dirg2o61wKxEDtUi-qXK1JVfFsk5FGv8d-61YCiznOHrdcFrfMnjzvbTlANNDIG',
        alt: 'Minimalist bedroom with warm lighting and wooden bed frame',
        tags: ['Indoor'],
    },
    {
        title: 'Dining',
        description:
            'Gather around handcrafted dining tables and upholstered chairs that turn meals into memories.',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBzUopY40yYbeZyoVA0SjUw8r4Znbxu2K_gCHePb6KLztC5qqkGg2pWy8OIFgOfiqGTLX3TlOZhfzEZeB2SqOVI0s-zQWxBS99svGD6pIpyEeP6L2N0opGPBHvwK4NxF-E4D11NuCdGOM-CHvnf5N1cDNk3BrnG3KdlF7Xe-FeyAOED96BdG8jWRi5H8HhZV3qPSHDquyB0fFfoXvg64Dr_qQXSr96eeeKWU3nqKSgmBsBMs806L1xvvazaeusM2_I45kL26ThaSxl8',
        alt: 'Elegant dining room with large oak table and chairs',
        tags: ['Indoor', 'Outdoor'],
    },
    {
        title: 'Office',
        description:
            'Inspire productivity with ergonomic yet stylish desks and modular shelving units.',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCDuUKj2UQoEyPaLaIAotrP5vzkX9fsEeVbA5mNf_LLvuXxdo-WEe9sRgXF-8_Ido5v09T19e7kQoYjYm-v4KFog9y5zCbquwc4-85ZMQYmXwEfg_EUILhL14gPfoKzEpxgEhEhFN9OjT317ObTCCUZnYldkPWpSs__1PoASioYoaImno2nmGTmMj2vT-wbBXvTwaBousGPF6Uj6TDtlQslwumiLL9xGulHLcyMKULqwPSXVJbN51Msw6ROPkiw-H4_Gc-jm-Y4aw3o',
        alt: 'Sleek home office with ergonomic chair and stylish desk',
        tags: ['Indoor', 'New Arrivals'],
    },
];

const Categories = () => {
    const [activeFilter, setActiveFilter] = useState('All Categories');

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
            {/* Navigation */}

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumbs */}
                <nav
                    aria-label="Breadcrumb"
                    className="flex mb-8 text-sm font-medium text-slate-500 dark:text-slate-400"
                >
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link className="inline-flex items-center hover:text-primary" to="/home">
                                <span className="material-symbols-outlined mr-2 text-lg">home</span>
                                Home
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <span className="material-symbols-outlined text-base">chevron_right</span>
                                <span className="ml-1 md:ml-2 text-slate-900 dark:text-slate-100">Furniture</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                {/* Page Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-4 leading-tight">
                            Shop by Category
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            Experience the pinnacle of custom craftsmanship. Explore our curated collections
                            designed to bring luxury and comfort into every corner of your home.
                        </p>
                    </div>
                    <Link to="/booking" className="group flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary hover:bg-primary hover:text-white font-bold rounded-lg transition-all">
                        <span className="material-symbols-outlined text-xl">architecture</span>
                        <span>Consult a Designer</span>
                    </Link>
                </div>

                {/* Filter/Quick-Sort Bar */}
                <div className="flex flex-wrap gap-3 mb-10 pb-2 border-b border-slate-200 dark:border-slate-800">
                    {FILTERS.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={
                                activeFilter === filter
                                    ? 'px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg shadow-md shadow-primary/20'
                                    : 'px-5 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold rounded-lg transition-colors border border-slate-200 dark:border-slate-700'
                            }
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {CATEGORIES.filter(cat => activeFilter === 'All Categories' || (cat.tags && cat.tags.includes(activeFilter))).map((category, index) => (
                        <Link
                            to="/products"
                            key={index}
                            className="category-card relative group overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 aspect-[16/9] cursor-pointer block"
                        >
                            <div
                                className="category-image absolute inset-0 transition-transform duration-700 ease-out"
                                role="img"
                                aria-label={category.alt}
                                style={{
                                    backgroundImage: `url("${category.image}")`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <h3 className="text-white text-3xl font-bold mb-2">{category.title}</h3>
                                <p className="text-slate-200 mb-6 max-w-sm line-clamp-2">
                                    {category.description}
                                </p>
                                <div className="shop-now-btn inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 font-bold rounded-lg w-fit transition-all group-hover:gap-3">
                                    <span>Shop Collection</span>
                                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA Section */}
                <section className="mt-20 rounded-2xl bg-primary/5 dark:bg-primary/10 border border-primary/10 overflow-hidden">
                    <div className="px-8 py-12 md:px-16 md:py-16 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="flex-1 space-y-4">
                            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                                Looking for something truly unique?
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400">
                                Our master designers can help you craft a piece that matches your space and style
                                perfectly. From material selection to final dimensions.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                            <Link to="/booking" className="px-8 py-4 bg-primary text-white font-bold rounded-lg text-center hover:bg-primary/90 transition-all shadow-lg shadow-primary/25">
                                Book Design Consultation
                            </Link>
                            <Link to="/customizer" className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold rounded-lg text-center border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                                View Custom Portfolio
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
        </div>
    );
};

export default Categories;
