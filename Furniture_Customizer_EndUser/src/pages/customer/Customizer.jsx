import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { catalogService } from '../../services/catalog.service';
import { customizerService } from '../../services/customizer.service';
import { cartService } from '../../services/cart.service';
import toast from 'react-hot-toast';

/**
 * Customizer Page
 *
 * Product customization page for "The Artisan Modular Sofa" with:
 * - LUXE HOME branded navbar with search, favorites, shopping bag
 * - Main image with VIEW IN 3D button, zoom/share overlays
 * - Thumbnail gallery (4 images, last is a play button)
 * - Tabs: Specifications, Material Care, Shipping & Returns, Reviews
 * - Customization panel (sticky right column):
 *   - Configuration (2-Seater, 3-Seater, Sectional)
 *   - Material (Performance Velvet, Italian Leather, Belgian Linen)
 *   - Fabric Color (6 swatches)
 *   - Leg Finish (Matte Black Steel, Natural Walnut)
 * - Price with save design, Add to Cart, Schedule Design Consult
 * - "Complete the Look" related products
 * - Footer
 *
 * Route: /customizer
 */

const GALLERY_THUMBNAILS = [
    {
        src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
        alt: 'Close up of sofa upholstery texture',
        label: 'Main',
    },
    {
        src: 'https://images.unsplash.com/photo-1540574163026-643ea20abc46?auto=format&fit=crop&q=80&w=800',
        alt: 'Side view of modular sofa configuration',
        label: 'Detail',
    },
    {
        src: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800',
        alt: 'Sofa in a naturally lit living room setting',
        label: 'Living',
    },
];

const CONFIGURATIONS = [
    { icon: 'chair', label: '2-SEATER', active: true, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800' },
    { icon: 'weekend', label: '3-SEATER', active: false, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800' },
    { icon: 'view_quilt', label: 'SECTIONAL', active: false, image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800' },
];

const MATERIALS_OPTIONS = [
    { name: 'Performance Velvet', active: true, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800' },
    { name: 'Italian Leather', active: false, image: 'https://images.unsplash.com/photo-1505693314120-0d443867ecf1?auto=format&fit=crop&q=80&w=800' },
    { name: 'Belgian Linen', active: false, image: 'https://images.unsplash.com/photo-1512400977-8d070b4c7185?auto=format&fit=crop&q=80&w=800' },
];

const FABRIC_COLORS = [
    { color: '#064e3b', name: 'Forest Emerald', selected: true, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800' },
    { color: '#1e293b', name: 'Midnight Slate', selected: false, image: 'https://images.unsplash.com/photo-1512400977-8d070b4c7185?auto=format&fit=crop&q=80&w=800' },
    { color: '#f1f5f9', name: 'Cloud White', selected: false, border: true, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800' },
    { color: '#d97706', name: 'Amber Gold', selected: false, image: 'https://images.unsplash.com/photo-1540574163026-643ea20abc46?auto=format&fit=crop&q=80&w=800' },
    { color: '#991b1b', name: 'Deep Ruby', selected: false, image: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&q=80&w=800' },
    { color: '#7c2d12', name: 'Cognac Brown', selected: false, image: 'https://images.unsplash.com/photo-1505693314120-0d443867ecf1?auto=format&fit=crop&q=80&w=800' },
];

const LEG_FINISHES = [
    { color: 'bg-slate-800', name: 'Matte Black Steel', active: false, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800' },
    { color: 'bg-[#451a03]', name: 'Natural Walnut', active: true, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800' },
];

const SPECS = [
    { label: 'Overall Dimensions', value: '108" W x 40" D x 32" H' },
    { label: 'Seat Depth', value: '26"' },
    { label: 'Frame', value: 'Kiln-dried hardwood' },
    { label: 'Assembly', value: 'White Glove Delivery included' },
];

const TABS = ['Specifications', 'Material Care', 'Shipping & Returns', 'Reviews (124)'];

const RELATED_ITEMS = [
    {
        name: 'Sienna Wool Rug',
        price: '$450.00',
        alt: 'Textured cream wool rug',
        image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80&w=800',
    },
    {
        name: 'Aria Marble Table',
        price: '$890.00',
        alt: 'Minimalist marble coffee table',
        image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=800',
    },
    {
        name: 'Beam Floor Lamp',
        price: '$225.00',
        alt: 'Modern sculptural floor lamp',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800',
    },
    {
        name: 'Velvet Pillow Set',
        price: '$115.00',
        alt: 'Set of velvet throw pillows',
        image: 'https://images.unsplash.com/photo-1584100936553-73bc4746f366?auto=format&fit=crop&q=80&w=800',
    },
];

const Customizer = () => {
    const [activeConfig, setActiveConfig] = useState(0);
    const [activeMaterial, setActiveMaterial] = useState(0);
    const [activeColor, setActiveColor] = useState(0);
    const [activeLeg, setActiveLeg] = useState(1);
    const [activeTab, setActiveTab] = useState(0);
    const [selectedThumb, setSelectedThumb] = useState(0);
    const [dynamicMainImage, setDynamicMainImage] = useState(null);
    const navigate = useNavigate();
    const { id: paramId } = useParams();
    const [isAdding, setIsAdding] = useState(false);

    const currentPrice = 2899 + 
        (activeConfig === 1 ? 500 : activeConfig === 2 ? 1000 : 0) + 
        (activeMaterial === 1 ? 1200 : activeMaterial === 2 ? -200 : 0) + 
        (activeLeg === 1 ? 150 : 0);

    const handleAddToCart = async () => {
        setIsAdding(true);
        try {
            let productId = paramId;
            if (!productId) {
                const prods = await catalogService.getProducts();
                productId = prods.data?.products?.[0]?.id || prods.data?.products?.[0]?._id;
            }
            if (!productId) {
                toast.error("No product available to customize");
                setIsAdding(false);
                return;
            }

            const optsRes = await customizerService.getProductOptions(productId);
            const options = optsRes.data?.options || {};
            
            const payload = {
                model_id: productId,
                material_id: options.materials?.[activeMaterial % (options.materials?.length || 1)]?.id || options.materials?.[0]?.id,
                color_id: options.colors?.[activeColor % (options.colors?.length || 1)]?.id || options.colors?.[0]?.id,
                fabric_id: options.fabrics?.[0]?.id,
                size_id: options.sizes?.[activeConfig % (options.sizes?.length || 1)]?.id || options.sizes?.[0]?.id,
                addon_ids: []
            };

            Object.keys(payload).forEach(key => {
                if (!payload[key]) delete payload[key];
            });

            const saveRes = await customizerService.saveDesign(payload);
            const savedDesignId = saveRes.data?.design?.id;

            if (savedDesignId) {
                await cartService.addItem({
                    saved_design_id: savedDesignId,
                    quantity: 1
                });
                toast.success('Custom design added to cart!');
                navigate('/cart');
            } else {
                toast.error('Failed to save design');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to add. Please login.');
        } finally {
            setIsAdding(false);
        }
    };

    const handleSaveDesign = () => {
        const selectionData = {
            id: Date.now(),
            name: "The Artisan Modular Sofa",
            config: CONFIGURATIONS[activeConfig].label,
            material: MATERIALS_OPTIONS[activeMaterial].name,
            fabricColor: FABRIC_COLORS[activeColor].name,
            legFinish: LEG_FINISHES[activeLeg].name,
            price: currentPrice,
            image: FABRIC_COLORS[activeColor].image
        };
        const existingSaved = JSON.parse(localStorage.getItem('wishlist') || '[]');
        localStorage.setItem('wishlist', JSON.stringify([...existingSaved, selectionData]));
        navigate('/wishlist');
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 0:
                return (
                    <div className="grid grid-cols-2 gap-y-4 text-sm mt-4">
                        {SPECS.map((spec, index) => (
                            <div key={index} className="contents">
                                <div className="text-slate-500">{spec.label}</div>
                                <div className="font-medium">{spec.value}</div>
                            </div>
                        ))}
                    </div>
                );
            case 1:
                return <p className="text-sm mt-4 text-slate-600 dark:text-slate-300">Professional cleaning recommended. Vacuum regularly to remove dust. Blot spills immediately with a clean, dry cloth.</p>;
            case 2:
                return <p className="text-sm mt-4 text-slate-600 dark:text-slate-300">White glove delivery included. Returns accepted within 30 days of delivery with original packaging. A 15% restocking fee applies.</p>;
            case 3:
                return <p className="text-sm mt-4 text-slate-600 dark:text-slate-300">⭐⭐⭐⭐⭐ "Absolutely love this sofa! The fabric is premium and comfortable." - Sarah J.</p>;
            default:
                return null;
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
            {/* Top Navigation Bar */}
            {/* Removed hardcoded header to use MainLayout */}

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
                    <Link className="hover:text-primary" to="/">
                        Home
                    </Link>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <Link className="hover:text-primary" to="/categories">
                        Living Room
                    </Link>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <Link className="hover:text-primary" to="/products">
                        Sofas
                    </Link>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <span className="text-slate-900 dark:text-slate-100 font-medium">
                        The Artisan Modular Sofa
                    </span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column: Product Showcase */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Main Image */}
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-800 group transition-all duration-300">
                            <img
                                alt="Luxury Sofa"
                                className="w-full h-full object-cover"
                                src={selectedThumb !== 0 ? GALLERY_THUMBNAILS[selectedThumb]?.src : (dynamicMainImage || FABRIC_COLORS[activeColor].image)}
                            />
                            <Link to="/preview-3d" className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-6 py-3 rounded-full shadow-xl hover:scale-105 transition-transform active:scale-95">
                                <span className="material-symbols-outlined text-primary">view_in_ar</span>
                                <span className="font-bold text-sm tracking-wide">VIEW IN 3D</span>
                            </Link>
                            <div className="absolute top-6 right-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-3 bg-white dark:bg-slate-900 rounded-full shadow-lg hover:text-primary">
                                    <span className="material-symbols-outlined">zoom_in</span>
                                </button>
                                <button className="p-3 bg-white dark:bg-slate-900 rounded-full shadow-lg hover:text-primary">
                                    <span className="material-symbols-outlined">share</span>
                                </button>
                            </div>
                        </div>

                        {/* Product Gallery Thumbnails */}
                        <div className="grid grid-cols-4 gap-4">
                            {GALLERY_THUMBNAILS.map((thumb, index) => (
                                <div
                                    key={index}
                                    onClick={() => setSelectedThumb(index)}
                                    className={`aspect-square rounded-xl overflow-hidden cursor-pointer ${selectedThumb === index
                                            ? 'ring-2 ring-primary'
                                            : 'opacity-60 hover:opacity-100 transition-opacity'
                                        }`}
                                >
                                    <img alt={thumb.label} className="w-full h-full object-cover" src={thumb.src} />
                                </div>
                            ))}
                            <div className="aspect-square rounded-xl overflow-hidden opacity-60 hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center bg-slate-200 dark:bg-slate-800">
                                <span className="material-symbols-outlined text-3xl">play_circle</span>
                            </div>
                        </div>

                        {/* Tabs Section */}
                        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
                            <div className="flex gap-8 border-b border-slate-200 dark:border-slate-800 mb-6 overflow-x-auto">
                                {TABS.map((tab, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveTab(index)}
                                        className={`pb-4 text-sm whitespace-nowrap ${activeTab === index
                                                ? 'font-bold border-b-2 border-primary text-primary'
                                                : 'font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                            <div className="prose prose-slate dark:prose-invert max-w-none">
                                {renderTabContent()}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Customization Panel */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-24 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                            {/* Header */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded tracking-wider">
                                        Premium Collection
                                    </span>
                                    <div className="flex items-center gap-1 text-amber-400">
                                        <span className="material-symbols-outlined text-sm fill-current">star</span>
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">4.9</span>
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold mb-1">The Artisan Modular Sofa</h2>
                                <p className="text-slate-500 text-sm">
                                    Design by Studio Luxe. Handcrafted in Italy.
                                </p>
                            </div>

                            <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                                {/* 1. Select Configuration */}
                                <section>
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 block">
                                        1. Select Configuration
                                    </label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {CONFIGURATIONS.map((config, index) => (
                                            <button
                                                key={index}
                                                onClick={() => { setActiveConfig(index); setSelectedThumb(0); setDynamicMainImage(config.image); }}
                                                className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 ${activeConfig === index
                                                        ? 'border-primary bg-primary/5'
                                                        : 'border-slate-100 dark:border-slate-800 hover:border-slate-300 transition-colors'
                                                    }`}
                                            >
                                                <span
                                                    className={`material-symbols-outlined ${activeConfig === index ? 'text-primary' : ''
                                                        }`}
                                                >
                                                    {config.icon}
                                                </span>
                                                <span className="text-[10px] font-bold">{config.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                {/* 2. Select Material */}
                                <section>
                                    <div className="flex justify-between items-end mb-3">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block">
                                            2. Select Material
                                        </label>
                                        <span className="text-[11px] font-medium text-primary underline cursor-pointer">
                                            Material Guide
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                        {MATERIALS_OPTIONS.map((mat, index) => (
                                            <button
                                                key={index}
                                                onClick={() => { setActiveMaterial(index); setSelectedThumb(0); setDynamicMainImage(mat.image); }}
                                                className={`px-4 py-2 rounded-full border-2 text-xs font-bold ${activeMaterial === index
                                                        ? 'border-primary bg-primary text-white'
                                                        : 'border-slate-100 dark:border-slate-800 hover:border-slate-300'
                                                    }`}
                                            >
                                                {mat.name}
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                {/* 3. Fabric Color */}
                                <section>
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 block">
                                        3. Fabric Color:{' '}
                                        <span className="text-slate-900 dark:text-white">
                                            {FABRIC_COLORS[activeColor].name}
                                        </span>
                                    </label>
                                    <div className="flex flex-wrap gap-3">
                                        {FABRIC_COLORS.map((fabric, index) => (
                                            <button
                                                key={index}
                                                onClick={() => { setActiveColor(index); setSelectedThumb(0); setDynamicMainImage(fabric.image); }}
                                                className={`w-10 h-10 rounded-full ring-2 ring-offset-2 transition-all relative ${activeColor === index
                                                        ? 'ring-primary'
                                                        : 'ring-transparent hover:ring-slate-300'
                                                    } ${fabric.border ? 'border border-slate-200' : ''}`}
                                                style={{ backgroundColor: fabric.color }}
                                            >
                                                {activeColor === index && (
                                                    <span className="absolute inset-0 flex items-center justify-center text-white text-xs material-symbols-outlined">
                                                        check
                                                    </span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                {/* 4. Leg Finish */}
                                <section>
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 block">
                                        4. Leg Finish
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {LEG_FINISHES.map((leg, index) => (
                                            <button
                                                key={index}
                                                onClick={() => { setActiveLeg(index); setSelectedThumb(0); setDynamicMainImage(leg.image); }}
                                                className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left ${activeLeg === index
                                                        ? 'border-primary bg-primary/5'
                                                        : 'border-slate-100 dark:border-slate-800 hover:border-slate-300'
                                                    }`}
                                            >
                                                <div className={`w-8 h-8 rounded ${leg.color} shadow-inner`} />
                                                <span
                                                    className={`text-xs font-bold ${activeLeg === index ? 'text-primary' : ''
                                                        }`}
                                                >
                                                    {leg.name}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </section>
                            </div>

                            {/* Price and Actions */}
                            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
                                <div className="flex items-end justify-between mb-6">
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium">
                                            Estimated Delivery: 4-6 Weeks
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-3xl font-bold">
                                                ${currentPrice.toLocaleString()}.00
                                            </span>
                                            <span className="text-sm text-slate-400 line-through">
                                                ${(currentPrice + 551).toLocaleString()}.00
                                            </span>
                                        </div>
                                    </div>
                                    <button onClick={handleSaveDesign} className="flex items-center gap-1 text-primary text-sm font-bold hover:underline">
                                        <span className="material-symbols-outlined text-sm">bookmark</span>
                                        Save Design
                                    </button>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <button onClick={handleAddToCart} disabled={isAdding} className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50">
                                        {isAdding ? 'ADDING...' : 'ADD TO CART'}
                                    </button>
                                    <button onClick={() => navigate('/booking')} className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold py-4 rounded-xl transition-all">
                                        SCHEDULE DESIGN CONSULT
                                    </button>
                                </div>
                                <div className="mt-6 flex items-center justify-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    <div className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-xs">verified</span>
                                        Lifetime Frame Warranty
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-xs">local_shipping</span>
                                        White Glove Delivery
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Complete the Look */}
                <section className="mt-20">
                    <h3 className="text-xl font-bold mb-8">Complete the Look</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {RELATED_ITEMS.map((item, index) => (
                            <Link to="/product-detail" onClick={() => window.scrollTo(0, 0)} key={index} className="group cursor-pointer block">
                                <div className="aspect-square rounded-2xl overflow-hidden bg-white mb-4">
                                    <img
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src={item.image}
                                    />
                                </div>
                                <h4 className="font-bold text-sm">{item.name}</h4>
                                <p className="text-primary font-bold mt-1 text-sm">{item.price}</p>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>

            {/* Footer */}
            {/* Removed hardcoded footer to use MainLayout */}
        </div>
    );
};

export default Customizer;
