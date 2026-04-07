import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Wishlist Page
 *
 * User's saved/wishlisted custom furniture designs:
 * - FurniCustom branded navbar with user greeting, avatar, cart badge
 * - Breadcrumbs: Home / Your Wishlist
 * - Page header with count, Share List & Add All to Cart buttons
 * - Filter tabs: All Items, Living Room, Dining, Bedroom
 * - Product grid (4 cards) with:
 *   - Delete button, "Customized" badge, product name,
 *     configuration details, price, "Move to Cart" CTA
 *   - Hover: translateY(-4px) + shadow + darken cart button
 * - Pagination (single page)
 * - Footer with newsletter subscription
 *
 * Route: /wishlist
 */

const FILTER_TABS = [
    { label: 'All Items (4)', active: true },
    { label: 'Living Room', active: false },
    { label: 'Dining', active: false },
    { label: 'Bedroom', active: false },
];

const WISHLIST_ITEMS = [
    {
        id: 1,
        name: 'Custom Velvet Sofa',
        config: 'Configuration: 3-Seater, Navy Blue, Brass Legs, Premium Foam',
        price: '$1,240.00',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCM7Bcr3-r8P8dsVZK03AkuHS7RKX79VrQ-rInxQIAwQwLFtDY8moR70zwrSKg0SI0f3PHEl-vrptF6WKScQv-O32tWc5vFGdGPYz0xUUoSEc5K3BHIpZBAl-1cWe3RjsYPn4qrj1_aKHahLNlWCUd2odo7E9cip6IwuCfffJ8sxnue_0Q_9WFtQcEn-zGzLJxfIP_WWMZahRLrRg6RnTymh99eDdRWIu35Ktkpja5_vQLmacTi4grUm-dAydoAF6A1YicQIRzx_amG',
        alt: 'Modern navy blue velvet sofa with brass legs',
    },
    {
        id: 2,
        name: 'Oak Dining Table',
        config: 'Configuration: 6-Seater, Natural Oak Finish, Tapered Legs',
        price: '$850.00',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBM_TmSpWj2rqKYjAGHDzup0asskmTsCjn00bHl7YXVNmQ7wgTluDLsikWG7z3kfVKFiis1LgPRQHGq4Vg83O254jjMNX47g6pPa6ptZwKHeYTR-88M_B2vNWTmfbBv0SlheO0d3dbHbjbe6INp2tCGcxSodx3iCxa3ZbNw7kfhoatb-bmLWk8RBnN7728zygscSqibf0TNxhNIPJRZSC02rjLc6Cngrr9kptRgpMy_0yx9ycC2u2iAYO2XRIt7XIpHwu1gsZfA4eAf',
        alt: 'Elegant natural oak wood dining table for six',
    },
    {
        id: 3,
        name: 'Marble Coffee Table',
        config: 'Configuration: Carrara White, Gold Powder Frame, 36-inch Round',
        price: '$420.00',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDEiEfCnLN0kr4gbuq8vRIIOHA8gzTt3el6ObF3e2VAfW6cCU13ENzOb_jW8Q4J7GGQH8uliIXxXzanNwVUDg4vjU-W2q4MVCmbaxsiahYWd6HlC9LQvEotpSIe8kRFXsWd0QTSypxFcURoiKhauiXHRjXKVv7E5lOMGKuwDR6quCdJR0713IkcOiTSEuQ0U4qfmGqif_u4Lu6HXrAqJaYXF6sl-lv-f2rFowkbNozPYOHQlJySLzna15xSGvszJC2Adgz3ORumT00o',
        alt: 'Round white marble coffee table with gold metallic frame',
    },
    {
        id: 4,
        name: 'Ergonomic Office Chair',
        config: 'Configuration: Pro Mesh Back, Adjustable Lumbar, Slate Gray',
        price: '$310.00',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDwIs6fkZWrEcDE1xrHc76KdHXuPCnUt92V27dDaEmQMVPlW0NpHvQZFr_-4EA1EEpQczG3W4DgbLk7WbAwxOMW8zGffDoju7oBb96qHM0kTX_x4zY2wO4VmrWLh7fk34F_yxHiBvg1Xezr0tNY67LkZx90R6EfjFnpkzd0w8NQwqSn6rW17JZuGd0QYI5GTGJCw5HT6kwvAvVBLM069dCTThKK2-WOlhWaUuzqG7X18fT1cjK8E-dd4anHviO6t2yv4q-PTyxq9mLy',
        alt: 'Modern ergonomic office chair with gray mesh back',
    },
];

const Wishlist = () => {
    const [activeTab, setActiveTab] = useState(0);
    const navigate = useNavigate();
    
    // Merge mock data with dynamic localStorage wishlist data
    const [wishlistItems, setWishlistItems] = useState(() => {
        const localWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const customItems = localWishlist.map((item, index) => ({
            id: item.id || `custom-${index}`,
            name: item.name || 'Custom Design',
            config: `Configuration: ${item.config}, ${item.fabricColor}, ${item.legFinish}`,
            price: typeof item.price === 'number' ? `$${item.price.toLocaleString()}.00` : item.price,
            image: item.image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
            alt: `Saved custom design`,
            isCustom: true
        }));
        return [...customItems, ...WISHLIST_ITEMS];
    });

    const removeWishlistItem = (id) => {
        setWishlistItems(prev => {
            const nextList = prev.filter(item => item.id !== id);
            localStorage.setItem('wishlist', JSON.stringify(nextList.filter(item => item.isCustom)));
            return nextList;
        });
    };

    const handleMoveToCart = (item) => {
        const cartItemDefaults = {
            id: Date.now(),
            name: item.name,
            price: item.price,
            image: item.image,
            qty: 1,
            isCustom: true,
            specs: [
                { label: 'Details', value: item.config }
            ]
        };
        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
        localStorage.setItem('cart', JSON.stringify([...existingCart, cartItemDefaults]));
        removeWishlistItem(item.id);
        navigate('/cart');
    };

    const handleAddAllToCart = () => {
        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const newCartItems = wishlistItems.map(item => ({
            id: Date.now() + Math.random(),
            name: item.name,
            price: item.price,
            image: item.image,
            qty: 1,
            isCustom: true,
            specs: [
                { label: 'Details', value: item.config }
            ]
        }));
        localStorage.setItem('cart', JSON.stringify([...existingCart, ...newCartItems]));
        setWishlistItems([]);
        localStorage.setItem('wishlist', '[]');
        navigate('/cart');
    };

    const filteredItems = wishlistItems.filter(item => {
        if (activeTab === 0) return true;
        if (activeTab === 1) return item.name.toLowerCase().includes('sofa') || item.name.toLowerCase().includes('coffee') || item.name.toLowerCase().includes('design');
        if (activeTab === 2) return item.name.toLowerCase().includes('dining');
        if (activeTab === 3) return item.name.toLowerCase().includes('bed');
        return true;
    });

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased transition-colors duration-300">
            {/* Top Navigation Bar */}
            {/* Removed hardcoded header to use MainLayout */}

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Wishlist Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div>
                        <nav className="flex mb-4 text-xs font-medium text-slate-500 uppercase tracking-widest">
                            <Link className="hover:text-primary" to="/">
                                Home
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="text-primary">Your Wishlist</span>
                        </nav>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                            Your Saved Designs
                        </h1>
                        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
                            You have {wishlistItems.length} custom pieces waiting for a home.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={handleAddAllToCart} className="px-6 py-2.5 rounded-lg bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                            Add All to Cart
                        </button>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    {FILTER_TABS.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`px-6 py-3 border-b-2 text-sm transition-colors ${activeTab === index
                                    ? 'border-primary text-primary font-bold'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-semibold'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredItems.map((item) => (
                        <div
                            key={item.id}
                            className="product-card group relative bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col"
                        >
                            <button onClick={() => removeWishlistItem(item.id)} className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-slate-800/90 text-slate-400 hover:text-red-500 rounded-full shadow-sm transition-colors cursor-pointer">
                                <span className="material-symbols-outlined text-xl">delete</span>
                            </button>
                            <div className="aspect-[4/5] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                                <img
                                    alt={item.alt}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    src={item.image}
                                />
                            </div>
                            <div className="p-5 flex-grow flex flex-col">
                                <div className="mb-2">
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                                        Customized
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                                    {item.name}
                                </h3>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                                    {item.config}
                                </p>
                                <div className="mt-4 flex items-baseline gap-1">
                                    <span className="text-xl font-black text-slate-900 dark:text-white">
                                        {item.price}
                                    </span>
                                </div>
                                <div className="mt-6">
                                    <button onClick={() => handleMoveToCart(item)} className="move-to-cart-btn w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-bold text-sm transition-all active:scale-[0.98]">
                                        <span className="material-symbols-outlined text-lg">add_shopping_cart</span>{' '}
                                        Move to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination / Footer Info */}
                <div className="mt-16 flex flex-col items-center">
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 font-medium uppercase tracking-widest italic">
                        Free standard shipping on all custom orders over $2,000
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-primary transition-colors disabled:opacity-50"
                            disabled
                        >
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <div className="flex items-center">
                            <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
                                1
                            </span>
                        </div>
                        <button
                            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-primary transition-colors disabled:opacity-50"
                            disabled
                        >
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>
            </main>

            {/* Footer */}
            {/* Removed hardcoded footer to use MainLayout */}
        </div>
    );
};

export default Wishlist;
