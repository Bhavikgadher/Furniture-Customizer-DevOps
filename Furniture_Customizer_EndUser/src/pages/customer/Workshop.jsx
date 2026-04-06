import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Workshop Page
 *
 * User dashboard for managing custom furniture configurations:
 * - FurnitureStudio branded navbar with active "My Workshop" link
 * - Breadcrumbs: Home > My Workshop
 * - Page header with grid/list toggle and "Create New Design" CTA
 * - Workshop grid:
 *   - "Start a New Project" dashed placeholder card
 *   - Design cards with image, status badge, price, material tags,
 *     Edit/Add buttons, Share Design, and delete icon
 * - Hidden empty state (ready to toggle)
 * - Footer with branding and links
 *
 * Route: /workshop
 */

const DESIGN_CARDS = [
    {
        id: 1,
        name: 'My Dream Sectional',
        price: '$2,450',
        status: 'In Progress',
        statusColor: 'bg-primary',
        tags: ['Emerald Velvet', 'Oak Legs', 'L-Shape'],
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBykHpoYscMhraGj6Sozh7v_xu8yBs50VX6Y8uSftCdJE8XmRSC5r6tVBwZW1rQiETqqgh6wtyjBwo4Mi__l4735QnT-DiqCaG4GC5Ke0C6jt3rdKzjbj_TMJnUrlYCShRVyx9a6712y7lBdp67hok23gLTmrOIAyHbN3m028kIoFrUjUx88JLYeGxXbm7FCphm8QL9G4tskrvOvZ0_wSivmG_m1jENKkpNeyOebQlua4b0DlNBGoXglEJW-hTO3pn1lspQQ47RG3Ka',
        alt: 'Luxury emerald green velvet sectional sofa',
    },
    {
        id: 2,
        name: 'Minimalist Armchair',
        price: '$890',
        status: 'Completed',
        statusColor: 'bg-green-600',
        tags: ['Grey Linen', 'Walnut Legs'],
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuB2mg0iD8M2RKbpnf3haiLZ2Id5XbPX0nqPcs_fWRAvUtJ6BdtDmWDdJp6iENWNI6hGZ6Bg5__wtEWpOjEIVznu8AB6LF1l6iLDIQg2xI5DOOy7C2tk8w_kRrhpvBZVCaBf5GHhVmwLGzvvl1BvRRdkF1ifbMCUogZ8MfSVbtBMD7UzJbQ9gHEHiCQ79mbJoLsflGe2ilY_ixbfSbQvRxkeHU-XKzpKAlehQBR-YyqkZtnSx-sU3I7djKLOt6L8CC-_COXcVVuVJX7z',
        alt: 'Modern minimalist grey linen armchair',
    },
    {
        id: 3,
        name: 'Solid Oak Dining',
        price: '$1,600',
        status: null,
        statusColor: null,
        tags: ['Natural Oak', '6 Seater'],
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuD1lHaTrDXrs0QK7gBXYw3Nhaqad47Zzw1TY2vHZ34T3XwBMhkSTL37ZMTWvfYFIqKhnlZkDtNdhNKMWqx4UYdppW0IqIw8bSMsgbGh5w3vUsuxKq87T2oQjeDRFCZxBPpYxRhylTI9XrWLdwCLCxsc77cHSng6x_oKOrS8PkTYdUV-8eSff-oNenXAJoANbzZqQEld_qTsM5h9lKfLd5g2pRGEJrMMc-hzelR_t9fixzbOzl7h1Zt7Eb0PuTvFBI3XTr6zPzjFZx-X',
        alt: 'Scandinavian style solid oak dining table',
    },
];

const Workshop = () => {
    const [viewMode, setViewMode] = useState('grid');

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
            {/* Top Navigation Bar */}
            {/* Removed hardcoded header to use MainLayout */}

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                    <Link className="hover:text-primary" to="/">
                        Home
                    </Link>
                    <span className="material-symbols-outlined !text-xs">chevron_right</span>
                    <span className="font-medium text-slate-900 dark:text-slate-200">My Workshop</span>
                </nav>

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                            My Workshop
                        </h2>
                        <p className="text-slate-500 mt-1">
                            Manage, edit, and order your custom furniture configurations.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex bg-white dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`px-3 py-1.5 rounded-md text-xs font-bold ${viewMode === 'grid'
                                        ? 'bg-slate-100 dark:bg-slate-700 shadow-sm'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-primary'
                                    }`}
                            >
                                <span className="material-symbols-outlined align-middle mr-1 !text-sm">
                                    grid_view
                                </span>
                                Grid
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`px-3 py-1.5 rounded-md text-xs font-bold ${viewMode === 'list'
                                        ? 'bg-slate-100 dark:bg-slate-700 shadow-sm'
                                        : 'text-slate-500 dark:text-slate-400 font-medium hover:text-primary'
                                    }`}
                            >
                                <span className="material-symbols-outlined align-middle mr-1 !text-sm">list</span>
                                List
                            </button>
                        </div>
                        <button className="bg-primary text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined">add</span>
                            Create New Design
                        </button>
                    </div>
                </div>

                {/* Workshop Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* Create New Placeholder Card */}
                    <button className="group flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 hover:border-primary hover:bg-primary/5 transition-all aspect-[4/5] text-center">
                        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all mb-4">
                            <span className="material-symbols-outlined !text-3xl">add_circle</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            Start a New Project
                        </h3>
                        <p className="text-sm text-slate-500 mt-2 max-w-[180px]">
                            Begin personalizing your next masterpiece.
                        </p>
                    </button>

                    {/* Design Cards */}
                    {DESIGN_CARDS.map((card) => (
                        <div
                            key={card.id}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col group hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
                                <div className="absolute top-3 right-3 z-10">
                                    <button className="p-2 bg-white/90 dark:bg-slate-900/90 rounded-full text-slate-600 hover:text-red-500 transition-colors shadow-sm">
                                        <span className="material-symbols-outlined !text-lg">delete</span>
                                    </button>
                                </div>
                                <img
                                    alt={card.alt}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    src={card.image}
                                />
                                {card.status && (
                                    <div className="absolute bottom-3 left-3 flex gap-2">
                                        <span
                                            className={`px-2 py-1 ${card.statusColor} text-white text-[10px] font-bold uppercase tracking-wider rounded`}
                                        >
                                            {card.status}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-slate-900 dark:text-white truncate">
                                        {card.name}
                                    </h3>
                                    <span className="text-primary font-black">{card.price}</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5 mb-6">
                                    {card.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="text-[11px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-auto grid grid-cols-2 gap-2">
                                    <button className="flex items-center justify-center gap-1 py-2 rounded-lg bg-primary/10 text-primary font-bold text-xs hover:bg-primary/20 transition-colors">
                                        <span className="material-symbols-outlined !text-sm">edit</span> Edit
                                    </button>
                                    <button className="flex items-center justify-center gap-1 py-2 rounded-lg bg-primary text-white font-bold text-xs hover:bg-primary/90 transition-colors shadow-md shadow-primary/10">
                                        <span className="material-symbols-outlined !text-sm">shopping_cart</span> Add
                                    </button>
                                </div>
                                <button className="mt-3 w-full flex items-center justify-center gap-1 py-1 text-slate-400 hover:text-slate-600 text-xs font-medium transition-colors">
                                    <span className="material-symbols-outlined !text-sm">share</span> Share Design
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Optional Empty State (Hidden when content exists) */}
                <div className="hidden flex-col items-center justify-center py-24 text-center">
                    <div className="w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 mb-6">
                        <span className="material-symbols-outlined !text-6xl">inventory_2</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Your workshop is empty
                    </h3>
                    <p className="text-slate-500 mt-2 max-w-sm">
                        Every great room starts with a single piece. Start designing your custom furniture today
                        and it will appear here.
                    </p>
                    <button className="mt-8 bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
                        Design Your First Piece
                    </button>
                </div>
            </main>

            {/* Footer */}
            {/* Removed hardcoded footer to use MainLayout */}
        </div>
    );
};

export default Workshop;
