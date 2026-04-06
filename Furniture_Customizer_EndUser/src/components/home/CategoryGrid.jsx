import { Link } from 'react-router-dom';

/**
 * CategoryGrid Component
 *
 * "Shop by Category" section with 3 category cards (Sofas, Chairs, Tables).
 * Each card has a full-bleed image, gradient overlay, hover reveal text,
 * and an Explore button.
 */

const CATEGORIES = [
    {
        title: 'Luxurious Sofas',
        description: '140+ Custom combinations',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDeRepm4jYhd0hiorXKsTow_URCuCAkSTMzwViSWJIQIYt2oZ3sq1gzb0C09ds_AKqaGppHINu71SsZ_Ss7msWalRH-78Ds9awafB-lMIRhnnmo24OFQtCILrn33bA08GoMfPj4WBJJOACjwMbXGKjgzVvDc_jnJG_nWn8ZOyFBhEEr-DVfr0o8iBQZw8Z8_onQUn-nyCVoUu5uLDIg_RX7qg1g8tKSv-s-P4OlcQb-do1EU9n5A3kEnGUnAh4yhxIEKIBuHEuneDTp',
        alt: 'Elegant grey velvet sofa with wooden legs',
    },
    {
        title: 'Ergonomic Chairs',
        description: 'Select from 50 premium leathers',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAOjCnwMieusNnRYIdJICC65kxmVBJQL1Fi4s6vB1up3xEnmxP42SUI3D3bv-JhcsGFZcTMUHNLSX8iS7CCQxi2LHmK-TKW7TRw0cdqG2crUK370FcQR58LfnlORLGVTgyOHPl6BTXxZVPD-lg3u3COCihOxGnv0bqITq8Xz_LvLwPRknfUefXgf3umH9eAKMg2aFuXwAdWoh9CLuvePWKDZkPyeRcJiERtfQRiFMSTc3CcN9hm6DePMA9eR7Ei-ERBGYqzvkwZ4hbb',
        alt: 'Modern ergonomic wooden chair design',
    },
    {
        title: 'Handcrafted Tables',
        description: 'Live-edge and modern finishes',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAIz1QHnY38mkl1LD5Ys_tcHolvXdeYCut74zkHIOeUgxkupBWKYd0jb2Xu19p7By_o0LPlZ2N3dwp8tDssr07oCvffuufB2SRbiB9aNCoVBR9FvwY2HvifAy_KZECZXAAnpZSir-y8_TDN1axbx3yz4FCDQNNiZ2DC7INqwgOD_lepkQ6v18nETLMhTiBLJJzOpRSyteWFYSGkGfLNOivDiuGTxQOElLHseGPWRYMxiwLsNAKuVpuEi6yiiE94dpy2675LI-_3sPBu',
        alt: 'Handcrafted oak dining table in sunny room',
    },
];

const CategoryGrid = () => {
    return (
        <section className="py-24 bg-background-light dark:bg-background-dark/50">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
                            Shop by Category
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            Discover curated collections ready for your personal touch.
                        </p>
                    </div>
                    <Link
                        className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all"
                        to="/categories"
                    >
                        Explore All <span className="material-symbols-outlined">trending_flat</span>
                    </Link>
                </div>

                {/* Category Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {CATEGORIES.map((category, index) => (
                        <div
                            key={index}
                            className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-lg card-zoom"
                        >
                            <img
                                className="absolute inset-0 w-full h-full object-cover"
                                alt={category.alt}
                                src={category.image}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                                <h3 className="text-white text-2xl font-bold mb-2">{category.title}</h3>
                                <p className="text-slate-300 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {category.description}
                                </p>
                                <Link to="/categories" className="w-fit bg-white text-slate-900 px-6 py-2 rounded-lg font-bold text-sm hover:bg-primary hover:text-white transition-colors text-center">
                                    Explore
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryGrid;
