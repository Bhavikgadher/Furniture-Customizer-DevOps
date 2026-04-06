import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/product/ProductCard';
import { catalogService } from '../../services/catalog.service';
import toast from 'react-hot-toast';

/**
 * ProductListing Page
 *
 * Full product listing page with:
 * - Collection-style navbar with search, favorites, cart, avatar
 * - Breadcrumbs, title, sort dropdown
 * - Sidebar filters (Active Filters, Price Range, Materials, Style, Ratings)
 * - 6-product grid with ProductCard components
 * - Pagination
 * - Collection-style footer
 *
 * Route: /products
 */

const STYLES = ['All Styles', 'Sofas', 'Chairs', 'Tables', 'Beds', 'Storage'];
const MATERIALS = [
    { name: 'Oak Wood', count: 124 },
    { name: 'Walnut Wood', count: 86 },
    { name: 'Velvet Fabric', count: 215 },
    { name: 'Brushed Metal', count: 92 },
    { name: 'Top Grain Leather', count: 145 },
];

const ProductListing = () => {
    const [sortBy, setSortBy] = useState('Newest Arrivals');
    const [currentPage, setCurrentPage] = useState(1);
    const [activeStyle, setActiveStyle] = useState('All Styles');
    const [selectedMaterials, setSelectedMaterials] = useState([]);
    const [minRating, setMinRating] = useState(0);
    const [priceRange, setPriceRange] = useState([0, 100000]);

    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                let sortParam = 'newest';
                if (sortBy === 'Price: Low to High') sortParam = 'price_asc';
                if (sortBy === 'Price: High to Low') sortParam = 'price_desc';

                const params = {
                    page: currentPage,
                    limit: 6,
                    sort: sortParam
                };

                if (activeStyle !== 'All Styles') {
                    params.category = activeStyle;
                }

                const res = await catalogService.getProducts(params);
                if (res.data?.products) {
                    setProducts(res.data.products);
                    setTotalPages(res.data.pagination?.totalPages || 1);
                }
            } catch (error) {
                console.error('Failed to fetch products', error);
                toast.error('Failed to load products');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [currentPage, sortBy, activeStyle]);

    // Local filtering for price and materials (since API does not support them directly in the spec)
    // Note: Due to server pagination, local filtering only filters the CURRENT page of results.
    const currentProducts = products.filter(p => {
        const priceNum = Number(p.price);
        if (priceNum < priceRange[0] || priceNum > priceRange[1]) return false;
        if (minRating > 0 && (p.rating || 5) < minRating) return false;
        
        // Simple mock material filtering based on description or name
        if (selectedMaterials.length > 0) {
            const searchText = `${p.name} ${p.description || ''}`.toLowerCase();
            const hasMaterial = selectedMaterials.some(mat => 
                (mat === 'Oak Wood' && searchText.includes('oak')) ||
                (mat === 'Velvet Fabric' && searchText.includes('velvet')) ||
                (mat === 'Brushed Metal' && searchText.includes('steel')) ||
                (mat === 'Top Grain Leather' && searchText.includes('leather'))
            );
            if (!hasMaterial) return false;
        }
        return true;
    });

    return (
        <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
            {/* Top Navigation Bar */}
            {/* Removed hardcoded header to use MainLayout */}

            <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-6">
                {/* Breadcrumbs & Title Area */}
                <div className="mb-8">
                    <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2">
                        <Link className="hover:text-primary" to="/">
                            Home
                        </Link>
                        <span className="material-symbols-outlined !text-sm">chevron_right</span>
                        <Link className="hover:text-primary" to="/categories">
                            Furniture
                        </Link>
                        <span className="material-symbols-outlined !text-sm">chevron_right</span>
                        <span className="text-slate-900 dark:text-white">All Collections</span>
                    </nav>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                                Furniture Collection
                            </h1>
                            <p className="text-slate-500 mt-1">
                                Discover 1,240 customizable pieces designed for your lifestyle.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-slate-500">Sort by:</span>
                            <select
                                className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary py-1.5 pl-3 pr-8"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option>Newest Arrivals</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Top Rated</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-64 shrink-0 space-y-8 lg:sticky lg:top-24 h-fit">
                        {/* Active Filters */}
                        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                                    Active Filters
                                </h3>
                                <button onClick={() => { setActiveStyle('All Styles'); setSelectedMaterials([]); setMinRating(0); setPriceRange([0, 100000]); setCurrentPage(1); }} className="text-xs text-primary font-semibold hover:underline">
                                    Clear all
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-lg">
                                    {activeStyle}
                                    <button onClick={() => setActiveStyle('All Styles')} className="material-symbols-outlined !text-xs">close</button>
                                </span>
                            </div>
                        </div>

                        {/* Price Range */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Price Range</h3>
                                <span className="material-symbols-outlined text-slate-400">keyboard_arrow_up</span>
                            </div>
                            <div className="px-2">
                                <div className="relative h-4 w-full mt-4 flex items-center">
                                    <input type="range" min="0" max="100000" step="1000" value={priceRange[0] || 0} onChange={(e) => { setPriceRange([Math.min(e.target.value, (priceRange[1] || 100000) - 1000), priceRange[1] || 100000]); setCurrentPage(1); }} className="absolute w-full h-1 z-20 opacity-0 cursor-pointer" />
                                    <input type="range" min="0" max="100000" step="1000" value={priceRange[1] || 100000} onChange={(e) => { setPriceRange([priceRange[0] || 0, Math.max(e.target.value, parseInt(priceRange[0] || 0) + 1000)]); setCurrentPage(1); }} className="absolute w-full h-1 z-30 opacity-0 cursor-pointer" />
                                    <div className="absolute h-1 w-full bg-slate-200 dark:bg-slate-700 rounded-full">
                                        <div className="absolute h-full bg-primary rounded-full transition-all duration-75" style={{ left: `${((priceRange[0] || 0)/100000)*100}%`, right: `${100 - ((priceRange[1] || 100000)/100000)*100}%` }} />
                                    </div>
                                    <div className="absolute w-4 h-4 bg-white border-2 border-primary rounded-full shadow-sm pointer-events-none z-40 transition-all duration-75" style={{ left: `calc(${((priceRange[0] || 0)/100000)*100}% - 8px)` }} />
                                    <div className="absolute w-4 h-4 bg-white border-2 border-primary rounded-full shadow-sm pointer-events-none z-40 transition-all duration-75" style={{ left: `calc(${((priceRange[1] || 100000)/100000)*100}% - 8px)` }} />
                                </div>
                                <div className="flex justify-between mt-4">
                                    <div className="text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">
                                        ${priceRange[0] || 0}
                                    </div>
                                    <div className="text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">
                                        ${priceRange[1] || 100000}{(priceRange[1] || 100000) == 100000 ? '+' : ''}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Materials */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Materials</h3>
                                <span className="material-symbols-outlined text-slate-400">keyboard_arrow_up</span>
                            </div>
                            <div className="space-y-2">
                                {MATERIALS.map((material) => (
                                    <label key={material.name} className="flex items-center gap-3 group cursor-pointer">
                                        <input
                                            checked={selectedMaterials.includes(material.name)}
                                            onChange={(e) => {
                                                if (e.target.checked) setSelectedMaterials([...selectedMaterials, material.name]);
                                                else setSelectedMaterials(selectedMaterials.filter(m => m !== material.name));
                                            }}
                                            className="rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary bg-transparent"
                                            type="checkbox"
                                        />
                                        <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors">
                                            {material.name}
                                        </span>
                                        <span className="text-xs text-slate-400 ml-auto">{material.count}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Style */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Style</h3>
                                <span className="material-symbols-outlined text-slate-400">keyboard_arrow_up</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {STYLES.map((style) => (
                                    <button
                                        key={style}
                                        onClick={() => setActiveStyle(style)}
                                        className={
                                            activeStyle === style
                                                ? 'px-3 py-1.5 text-xs font-medium border border-primary text-primary bg-primary/5 rounded-full'
                                                : 'px-3 py-1.5 text-xs font-medium border border-slate-200 dark:border-slate-700 rounded-full hover:border-primary hover:text-primary transition-colors'
                                        }
                                    >
                                        {style}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Ratings */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Ratings</h3>
                                <span className="material-symbols-outlined text-slate-400">keyboard_arrow_up</span>
                            </div>
                            <div className="space-y-2">
                                {[4, 3].map(ratingValue => (
                                    <label key={ratingValue} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            className="text-primary focus:ring-primary bg-transparent"
                                            name="rating"
                                            type="radio"
                                            checked={minRating === ratingValue}
                                            onChange={() => setMinRating(ratingValue)}
                                        />
                                        <div className="flex text-amber-400">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className={`material-symbols-outlined ${i < ratingValue ? 'filled-icon ' : ''}!text-lg`}>star</span>
                                            ))}
                                        </div>
                                        <span className="text-xs text-slate-500">&amp; Up</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid Area */}
                    <section className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {isLoading ? (
                                <div className="col-span-full py-12 text-center text-slate-500">
                                    <span className="material-symbols-outlined animate-spin text-3xl text-primary">progress_activity</span>
                                    <p className="mt-2 text-sm font-medium">Loading products...</p>
                                </div>
                            ) : currentProducts.length > 0 ? currentProducts.map((product, index) => (
                                <ProductCard 
                                    key={product.id || product._id || `${product.name}-${index}`} 
                                    id={product.id || product._id}
                                    name={product.name}
                                    description={product.description || product.category?.name || product.category || 'Premium Furniture'}
                                    price={`$${product.price}`}
                                    image={
                                        (product.image && product.image !== 'null') ? product.image 
                                        : (product.images?.length > 0) ? product.images[0] 
                                        : `https://picsum.photos/seed/${product.id || product._id || index}/500/600`
                                    }
                                    rating={product.rating || 5.0}
                                    isFavorited={false}
                                    customizeLabel="Customize"
                                />
                            )) : (
                                <div className="col-span-full py-12 text-center text-slate-500">
                                    No products match your filters. Try adjusting them.
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-12 flex items-center justify-center gap-2">
                                <button
                                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-30"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                >
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>
                                {[...Array(totalPages)].map((_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={
                                            currentPage === page
                                                ? 'w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-sm'
                                                : 'w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-sm transition-colors'
                                        }
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-30"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                >
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </div>
                        )}
                    </section>
                </div>
            </main>

            {/* Footer */}
            {/* Removed hardcoded footer to use MainLayout */}
        </div>
    );
};

export default ProductListing;
