import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * SearchResults Page
 *
 * Search results page for "Modern Sofa" with:
 * - Search-centric navbar with filled search input, cart badge, nav links
 * - Breadcrumbs, result count, view toggle (grid/list), sort dropdown
 * - Sidebar filters (Price Range, Category, Material, Rating, Reset)
 * - Product grid with 6 different product cards (Quick View overlay, badges, sale prices)
 * - Pagination
 * - Hidden empty state (shown when no results)
 * - Footer
 *
 * Route: /search
 */

const SEARCH_PRODUCTS = [
    {
        id: 1,
        category: 'Living Room',
        name: 'Nordic Velvet 3-Seater',
        price: '$1,299.00',
        originalPrice: null,
        badge: 'Best Seller',
        badgeColor: 'bg-primary',
        rating: 5,
        halfStar: false,
        reviewCount: 48,
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDqETeqnHQMC5xCk7_Y8F9zroVFQ_3u4Smav7hmhCuzXNom9D-u-yso8jh_MoogfrCKoKYE4EfJMcn6TNPrpTMNlHq7Ms73ia3tuEDI1DTtZPS4jb085m3Rz5TfdoA6rTrW1s8qZ4wGhB0kARiX7Sm3bEbUQgzgbNHKjRktH2BSH6A5pdUk9o8dKC2BOLCBUJKffie1zoT8TCwU85mAkI3lMrXCLg4kXjpFhmRWeYyj3RbfO5Ke7yNxBHwgw3-qc1IAAC8XY-EVSnf6',
        alt: 'Forest green velvet modern sofa minimalist room',
    },
    {
        id: 2,
        category: 'Minimalist Collection',
        name: 'Stockholm Fabric Couch',
        price: '$899.00',
        originalPrice: '$1,100.00',
        badge: 'Sale -20%',
        badgeColor: 'bg-red-500',
        rating: 4,
        halfStar: true,
        reviewCount: 32,
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCmLdzye2pdlbNawRqezVYo2tGl5eqouv5KWDPO73BDXlaPItgDEywdo8aGUqwlz5qNpaij--N55Xvp0OlQgWCjhURczXF_SEIzMv2rDrhnimnta9x3e_ArUokMiQ4lGwOgkE0WiPFW2jOCxkrwYVUQvnUQO81RxUMfGvzJLS_h9ogSn6sp6jjunlHDzGld0CPscUAb5QNbynhr-VxOLNFvMjJDxdfkz3Wh7u8e9rKP9X_VLhEHTC9JTVnT726QsLy30bPM_odk4peB',
        alt: 'Gray fabric sofa with wooden legs',
    },
    {
        id: 3,
        category: 'Premium Series',
        name: 'Tuscany Grain Leather',
        price: '$2,450.00',
        originalPrice: null,
        badge: null,
        badgeColor: '',
        rating: 5,
        halfStar: false,
        reviewCount: 156,
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBNm873blAt4ne7aK_RtqlxX9Cm4W5q8RB6lFmIXRtI3igBJh49KnvywJ3vVn-kRLJkpmSgD3JTCQ3PTFHOwWIU06q3OLV8PWNKw9fQtaM3BhvwDMTJjlnvzj1YocABI8-vzVY-m_5SQQA-5yjR7xDS5eW2PcRGOkrJOBnCLE2ALxZWJ1vinN9g_9aT1hQI7h6uCpJfQwCC4Ns_QonNhxvUTFsnmfTATzWKM4-bRGrSA0a7Yl-q4mQ50Awm60b5PrXq-crxnQhbu3r1',
        alt: 'Cognac leather mid-century modern sofa',
    },
    {
        id: 4,
        category: 'Modernism',
        name: 'Curve White Modular',
        price: '$3,100.00',
        originalPrice: null,
        badge: null,
        badgeColor: '',
        rating: 0,
        halfStar: false,
        reviewCount: 0,
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCF-fOwR5BPJXSLLzA-B76PkhuaWQaRjrovKxEX1WIolXdIs_E57tJR68ho-nCpbCq0B0s3kmQIXyAOMycwxWDynm1pUaBn_vGxV0pCVUGbfn3yPDXfIN8MxDit9Vda3CyEixwUHDObUJS1wQibtMvVtEg9nC4Q21X7X7M13Z3lgNdTaLFvJJJhXiP_7s4BwLtPGrLjpFvTlK3CEiUmUmTkNc8YW5YDaUU-tKQoxDbFix5IWrz_ChN78ldTd8IO5MTNvdibfOh1p9QT',
        alt: 'Modern white curved sofa minimalist design',
    },
    {
        id: 5,
        category: 'Color Pop',
        name: 'Zest Lounge 2-Seater',
        price: '$750.00',
        originalPrice: null,
        badge: null,
        badgeColor: '',
        rating: 0,
        halfStar: false,
        reviewCount: 0,
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDCAtsy6JBX0SKXe9Xm7BhfoPY_-tDfFdKhNYMmLFTtSr6tqp15Fz-MRaLmB34u297QbWJttbjakjO49BRbfZ-hfOut1QHotiG6Bps5m07KxZCHyhfZt4UfgV-MMvKw28aIlmnzcFfy2UtJ5PVbNL448sluyJL9zFErecTt2tiStOtVg392A1WfHjteOJ5VmCnvWg89mK102XT-Sf0t_Xt6jbAmbEGG6Cw66nwIhcJDAb53JS1aK7nMLAzaVJhNI7fZy8Pjk7fbb2td',
        alt: 'Burnt orange modern velvet sofa',
    },
    {
        id: 6,
        category: 'Spacious Living',
        name: 'Big-Sur Sectional L-Shape',
        price: '$4,599.00',
        originalPrice: null,
        badge: null,
        badgeColor: '',
        rating: 0,
        halfStar: false,
        reviewCount: 0,
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBLpHV7vIfaAhefVIRIsyDCzuSccy6a6p8AmdmJQVvCZxfkr0h0D_c-Ty-XSRBUcPVisHBQ4kCf-mvVWrwgivh8QcdOyj6gSLrnYpfwBgNjWHuakpbhwR-n3csHcmWQPKtA-S382JrZ_fJsb4u7XHB-rSvGfat22vwCiyrceIGvEOYzyxz0YdjXQx5mxZxnz1cVv1ZgQB49yCAtxGnK_bzkjNyU6-iaFgbMKBwhaG23KiAMfJIV7QyYjeWHOSCsyyqazunlu0NJSbFf',
        alt: 'Large L-shaped charcoal sectional sofa',
    },
];

const CATEGORIES = [
    { name: 'Sofas & Sectionals', count: 84, checked: true },
    { name: 'Armchairs', count: 22, checked: false },
    { name: 'Outdoor Seating', count: 12, checked: false },
];

const FILTER_MATERIALS = [
    { name: 'Velvet', checked: false },
    { name: 'Linen', checked: true },
    { name: 'Italian Leather', checked: false },
];

const renderStars = (rating, halfStar) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
        stars.push(
            <span key={`full-${i}`} className="material-symbols-outlined text-sm fill-1">
                star
            </span>
        );
    }
    if (halfStar) {
        stars.push(
            <span key="half" className="material-symbols-outlined text-sm">
                star_half
            </span>
        );
    }
    return stars;
};

const SearchResults = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('Sort by: Popularity');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery] = useState('Modern Sofa');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedMaterials, setSelectedMaterials] = useState([]);
    const [selectedRating, setSelectedRating] = useState(0);
    const navigate = useNavigate();

    const handleCategoryToggle = (catName) => {
        setSelectedCategories(prev => prev.includes(catName) ? prev.filter(c => c !== catName) : [...prev, catName]);
    };

    const handleMaterialToggle = (matName) => {
        setSelectedMaterials(prev => prev.includes(matName) ? prev.filter(m => m !== matName) : [...prev, matName]);
    };

    const resetFilters = () => {
        setSelectedCategories([]);
        setSelectedMaterials([]);
        setSelectedRating(0);
        setSortBy('Sort by: Popularity');
    };

    const filteredAndSortedProducts = SEARCH_PRODUCTS.filter(p => {
        if (selectedRating > 0 && p.rating < selectedRating) return false;
        
        let matchesCat = true;
        if (selectedCategories.length > 0) {
            matchesCat = selectedCategories.some(cat => p.category.toLowerCase().includes(cat.toLowerCase()) || p.name.toLowerCase().includes(cat.toLowerCase()) || cat === 'Sofas & Sectionals');
        }
        
        let matchesMat = true;
        if (selectedMaterials.length > 0) {
            matchesMat = selectedMaterials.some(mat => (p.name + p.alt).toLowerCase().includes(mat.toLowerCase()));
        }

        return matchesCat && matchesMat;
    }).sort((a, b) => {
        if (sortBy === 'Price: Low to High') {
            return parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, ''));
        }
        if (sortBy === 'Price: High to Low') {
            return parseInt(b.price.replace(/\D/g, '')) - parseInt(a.price.replace(/\D/g, ''));
        }
        return 0; // Popularity / Newest
    });

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-200">
            {/* Top Navigation Bar */}
            {/* Removed hardcoded header to use MainLayout */}

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumbs */}
                <nav className="flex text-sm text-slate-500 mb-6">
                    <Link className="hover:text-primary" to="/">
                        Home
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-slate-900 dark:text-slate-200 font-medium">Search Results</span>
                </nav>

                {/* Search Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                            Search results for &apos;{searchQuery}&apos;
                        </h1>
                        <p className="text-slate-500 mt-1">Showing 128 items found in all categories</p>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* View Toggle */}
                        <div className="flex items-center bg-white dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded-md ${viewMode === 'grid'
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-slate-400 hover:text-primary'
                                    }`}
                            >
                                <span className="material-symbols-outlined text-xl">grid_view</span>
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-1.5 rounded-md ${viewMode === 'list'
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-slate-400 hover:text-primary'
                                    }`}
                            >
                                <span className="material-symbols-outlined text-xl">view_list</span>
                            </button>
                        </div>
                        <select
                            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm focus:ring-primary outline-none cursor-pointer"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option>Sort by: Popularity</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Newest Arrivals</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
                        {/* Price Range */}
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">payments</span>
                                Price Range
                            </h3>
                            <div className="space-y-4">
                                <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full relative">
                                    <div className="absolute left-1/4 right-1/4 h-full bg-primary rounded-full" />
                                    <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary border-2 border-white dark:border-slate-900 rounded-full cursor-pointer shadow-md" />
                                    <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary border-2 border-white dark:border-slate-900 rounded-full cursor-pointer shadow-md" />
                                </div>
                                <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                                    <span>$400</span>
                                    <span>$2,500</span>
                                </div>
                            </div>
                        </div>

                        {/* Categories */}
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">category</span>
                                Category
                            </h3>
                            <div className="space-y-2">
                                {CATEGORIES.map((cat) => (
                                    <label key={cat.name} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            checked={selectedCategories.includes(cat.name)}
                                            onChange={() => handleCategoryToggle(cat.name)}
                                            className="rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary h-4 w-4"
                                            type="checkbox"
                                        />
                                        <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">
                                            {cat.name}
                                        </span>
                                        <span className="ml-auto text-xs text-slate-400">{cat.count}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Materials */}
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">texture</span>
                                Material
                            </h3>
                            <div className="space-y-2">
                                {FILTER_MATERIALS.map((mat) => (
                                    <label key={mat.name} className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            checked={selectedMaterials.includes(mat.name)}
                                            onChange={() => handleMaterialToggle(mat.name)}
                                            className="rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary h-4 w-4"
                                            type="checkbox"
                                        />
                                        <span className="text-sm text-slate-700 dark:text-slate-300">{mat.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Rating */}
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">star</span>
                                Rating
                            </h3>
                            <div className="space-y-2">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        className="text-primary focus:ring-primary h-4 w-4 border-slate-300 dark:border-slate-700"
                                        name="rating"
                                        type="radio"
                                        checked={selectedRating === 4}
                                        onChange={() => setSelectedRating(4)}
                                    />
                                    <span className="flex items-center text-amber-400">
                                        <span className="material-symbols-outlined text-sm fill-1">star</span>
                                        <span className="material-symbols-outlined text-sm fill-1">star</span>
                                        <span className="material-symbols-outlined text-sm fill-1">star</span>
                                        <span className="material-symbols-outlined text-sm fill-1">star</span>
                                        <span className="text-slate-400 text-sm ml-1">&amp; Up</span>
                                    </span>
                                </label>
                            </div>
                        </div>

                        <button onClick={resetFilters} className="w-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-lg">restart_alt</span>
                            Reset Filters
                        </button>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className={viewMode === 'list' ? "flex flex-col gap-6" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"}>
                            {filteredAndSortedProducts.length > 0 ? filteredAndSortedProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className={`group bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 ${viewMode === 'list' ? 'flex flex-row items-center' : ''}`}
                                >
                                    <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-900 overflow-hidden">
                                        {product.badge && (
                                            <div className="absolute top-3 left-3 z-10">
                                                <span
                                                    className={`${product.badgeColor} text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase`}
                                                >
                                                    {product.badge}
                                                </span>
                                            </div>
                                        )}
                                        <button className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 dark:bg-slate-800/90 rounded-full flex items-center justify-center shadow-sm text-slate-400 hover:text-red-500 transition-colors">
                                            <span className="material-symbols-outlined text-xl">favorite</span>
                                        </button>
                                        <img
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            src={product.image}
                                        />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                            <button className="bg-white text-slate-900 px-4 py-2 rounded-lg text-sm font-bold shadow-lg hover:bg-primary hover:text-white transition-all">
                                                Quick View
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">
                                            {product.category}
                                        </p>
                                        <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
                                            {product.name}
                                        </h3>
                                        {product.rating > 0 && (
                                            <div className="flex items-center gap-1 mb-3">
                                                <span className="flex text-amber-400">
                                                    {renderStars(product.rating, product.halfStar)}
                                                </span>
                                                <span className="text-xs text-slate-400">({product.reviewCount})</span>
                                            </div>
                                        )}
                                        <div className="flex items-center justify-between">
                                            {product.originalPrice ? (
                                                <div className="flex flex-col">
                                                    <span className="text-xl font-black text-primary">{product.price}</span>
                                                    <span className="text-xs text-slate-400 line-through">
                                                        {product.originalPrice}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-xl font-black text-primary">{product.price}</span>
                                            )}
                                            <button onClick={() => navigate('/cart')} className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center hover:bg-primary/90 transition-colors">
                                                <span className="material-symbols-outlined">add_shopping_cart</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="col-span-full py-12 text-center">
                                    <p className="text-slate-500">No products match your filters.</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        <div className="mt-12 flex items-center justify-center gap-2">
                            <button
                                className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            >
                                <span className="material-symbols-outlined">chevron_left</span>
                            </button>
                            {[1, 2, 3].map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={
                                        currentPage === page
                                            ? 'w-10 h-10 rounded-lg flex items-center justify-center bg-primary text-white font-bold'
                                            : 'w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'
                                    }
                                >
                                    {page}
                                </button>
                            ))}
                            <span className="px-2">...</span>
                            <button
                                onClick={() => setCurrentPage(12)}
                                className={
                                    currentPage === 12
                                        ? 'w-10 h-10 rounded-lg flex items-center justify-center bg-primary text-white font-bold'
                                        : 'w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'
                                }
                            >
                                12
                            </button>
                            <button
                                className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                onClick={() => setCurrentPage((p) => Math.min(12, p + 1))}
                            >
                                <span className="material-symbols-outlined">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Empty State (Hidden by default, shown if no results) */}
                <div className="hidden py-24 text-center max-w-lg mx-auto">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                        <span className="material-symbols-outlined text-5xl">search_off</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        No results found
                    </h2>
                    <p className="text-slate-500 mb-8">
                        We couldn&apos;t find anything matching your search. Try checking your spelling or using
                        more general terms.
                    </p>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 text-left">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4">Search Tips:</h3>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li className="flex gap-2">
                                <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                Double check for typos
                            </li>
                            <li className="flex gap-2">
                                <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                Use fewer or broader keywords
                            </li>
                            <li className="flex gap-2">
                                <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                Try searching by category or style
                            </li>
                        </ul>
                    </div>
                    <div className="mt-12">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
                            Popular Suggestions
                        </h3>
                        <div className="flex flex-wrap justify-center gap-3">
                            <a
                                className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-700 hover:border-primary hover:text-primary transition-all"
                                href="#"
                            >
                                Mid-century Sofa
                            </a>
                            <a
                                className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-700 hover:border-primary hover:text-primary transition-all"
                                href="#"
                            >
                                Leather Recliner
                            </a>
                            <a
                                className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-700 hover:border-primary hover:text-primary transition-all"
                                href="#"
                            >
                                Velvet Chairs
                            </a>
                            <a
                                className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-700 hover:border-primary hover:text-primary transition-all"
                                href="#"
                            >
                                Coffee Tables
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            {/* Removed hardcoded footer to use MainLayout */}
        </div>
    );
};

export default SearchResults;
