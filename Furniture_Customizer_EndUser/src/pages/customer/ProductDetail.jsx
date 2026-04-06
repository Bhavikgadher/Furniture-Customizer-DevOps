import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { catalogService } from '../../services/catalog.service';
import { customizerService } from '../../services/customizer.service';
import { cartService } from '../../services/cart.service';
import { reviewService } from '../../services/review.service';
import toast from 'react-hot-toast';

const FABRIC_COLORS = [
    { color: '#1a4332', name: 'Forest Green Velvet' },
    { color: '#1e2a4a', name: 'Midnight Blue' },
    { color: '#7c5b4d', name: 'Terracotta' },
    { color: '#e5e1da', name: 'Cream Shell' },
    { color: '#333333', name: 'Charcoal' },
];

const DIMENSIONS = [
    { label: 'Overall Width', value: '96"' },
    { label: 'Overall Depth', value: '40"' },
    { label: 'Overall Height', value: '32"' },
    { label: 'Seat Depth', value: '24"' },
];

const MATERIALS = [
    { label: 'Frame', value: 'Solid Hardwood' },
    { label: 'Upholstery', value: 'Premium Velvet' },
    { label: 'Legs', value: 'Walnut Finish' },
    { label: 'Springs', value: '8-Way Tie' },
];

const RELATED_PRODUCTS = [
    {
        name: 'Nordic Coffee Table',
        price: '$850',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkBO1FhgrU5GAibgIZINimcaTczjmjvEoBOtT7NWdTCQX-6Z9nTfF_eW6vik-TKHbycJrxdgN5p0RqINHcwDuQNeZ1bABdfCUBuhwZMnSFMxlLtlyifY8Ioeszk3fq-TPcNwOnqlee1tnHLVzjjj3dGZKTWSxxKU5KdstYkPxTLjnadbHMeLupoMEbZq5bwwuuKWJs_duCrveAq-YDstrmXbxI-wdcLZmCon_34fMAxpCVdO0HH-AHBMHD5JVUmzIRvyry1LwWXcNU',
        alt: 'Modern wooden coffee table',
    },
    {
        name: 'Elysian Velvet Armchair',
        price: '$1,299',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAO5cZGQTa7rDGuWWEMhQHOlgFMpizLWt_4gtQ2I37JIt3tLeMvzBhpCEnn-pcvPDo3oXTkTL6y_hKPR5-DtRC-NX5ZySXvhJubm_a7O6mWHHjri9wnq7GSdeetkSI8pCXg_vZOUwe6ErPWZtaxPUieUjrB9Ou7Y28V2lSfLxB20lNwxH0G0Y9sbwBMAFJP9afCgFjaZ2vitDe82-n79BShmWCVBJioh3OEea1D0biev63GbeKie3KAC87EkxuQAdQPYzYZgcPZlsFE',
        alt: 'Plush velvet armchair matching the sofa',
    },
    {
        name: 'Horizon Wool Rug',
        price: '$450',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4BoIn1viu6f9UBPujPk1cOa3N0rYuKAxyAS1Gg3t71xIxJa-trTnKRjVk7TcwbOu0MqGMDVrEh-s2_VtIaU1uv9PGHgw0YEKd6sgMZitt65z5UFCnIHq5rQbr0rP10vHcbYEc-548_50SZGIro85JhUCDaUg7xXQaqGWLfsuiSY0E4mXQyj1_uvt3L6HoFNfjSpizfxa6MCvX6RLua44h9ZlPtCU0swjnEy9EInI9n_wPdxLOBn_dgrjs8A0sC8Hcyl73uDBndXiB',
        alt: 'Abstract hand-tufted wool rug',
    },
    {
        name: 'Luna Floor Lamp',
        price: '$320',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtodj0WOJlAUY-flqndTTgiIBX_cUAggT908pdyqvhCzoEilU6tfGk7IPFtSUgxoA3rveZFetJu0RB9h_Cp9_MagzwfZc8TfwlvLEdp7lXnht7tTQNU_RRTn-0HC9jBtJ-jnTC95etFNwNma3x3paSGtAhRvs30iPJBgV1CsMkqnNBnkrpkOuDhpY-58tnta5m49mpQsX0IiA_UDCnA6ihZZUJu7lYVQo-bigotKb-oKn6d_YsgZjmEeZk_kh0vmCLgOgO2ekdfGCI',
        alt: 'Modern sculptural floor lamp',
    },
];

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // UI state
    const [selectedFabric, setSelectedFabric] = useState(0);
    const [selectedThumb, setSelectedThumb] = useState(0);
    const [isWritingReview, setIsWritingReview] = useState(false);
    const [visibleReviews, setVisibleReviews] = useState(4);

    // Product state
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    // Review form state
    const [reviewRating, setReviewRating] = useState(0);
    const [reviewComment, setReviewComment] = useState('');
    const [reviewHovered, setReviewHovered] = useState(0);
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);

    // Reviews from API
    const [productReviews, setProductReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(false);

    // ── fetch helpers ─────────────────────────────────────────────────────────

    const fetchProductReviews = async (productId) => {
        setReviewsLoading(true);
        try {
            const res = await catalogService.getProductReviews(productId);
            // res.data.reviews or res.reviews based on service return and API shape
            const reviews = res.reviews || res.data?.reviews || res.data || [];
            setProductReviews(Array.isArray(reviews) ? reviews : []);
        } catch (err) {
            console.error('Failed to fetch product reviews', err);
            setProductReviews([]);
        } finally {
            setReviewsLoading(false);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            setIsLoading(true);
            try {
                const res = await catalogService.getProductById(id);
                if (res.data?.product) {
                    setProduct(res.data.product);
                    fetchProductReviews(id);
                }
            } catch (error) {
                console.error('Failed to fetch product details', error);
                toast.error('Failed to load product details');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
        window.scrollTo(0, 0);
    }, [id]);

    // ── cart handler ──────────────────────────────────────────────────────────

    const handleAddToCartBase = async () => {
        if (!product) return;
        setIsAdding(true);
        try {
            const productId = product.id || product._id || id;
            const optsRes = await customizerService.getProductOptions(productId);
            const options = optsRes.data?.options || {};

            const payload = {
                model_id: productId,
                material_id: options.materials?.[0]?.id,
                color_id: options.colors?.[0]?.id,
                fabric_id: options.fabrics?.[0]?.id,
                size_id: options.sizes?.[0]?.id,
                addon_ids: [],
            };
            Object.keys(payload).forEach(key => { if (!payload[key]) delete payload[key]; });

            const saveRes = await customizerService.saveDesign(payload);
            const savedDesignId = saveRes.data?.design?.id;

            if (savedDesignId) {
                await cartService.addItem({ saved_design_id: savedDesignId, quantity: 1 });
                toast.success('Added to cart');
                navigate('/cart');
            } else {
                toast.error('Failed to create custom design');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to add to cart. Are you logged in?');
        } finally {
            setIsAdding(false);
        }
    };

    // ── review handler ────────────────────────────────────────────────────────

    const handleSubmitReview = async () => {
        if (reviewRating === 0) { toast.error('Please select a star rating'); return; }
        if (reviewComment.trim().length < 10) { toast.error('Please write at least 10 characters'); return; }

        setIsSubmittingReview(true);
        try {
            const productId = product.id || product._id || id;
            // createReview returns response.data from the API
            const res = await reviewService.createReview({
                model_id: productId,
                rating: reviewRating,
                comment: reviewComment.trim(),
            });
            toast.success('Review submitted! It will appear after approval.');

            // Optimistically prepend so the user sees it immediately
            const newReview = res?.review || res?.data?.review || {
                id: Date.now(),
                rating: reviewRating,
                comment: reviewComment.trim(),
                is_approved: false,
                createdAt: new Date().toISOString(),
                User: { name: 'You' },
            };
            setProductReviews(prev => [newReview, ...prev]);

            setReviewRating(0);
            setReviewComment('');
            setIsWritingReview(false);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || err.message || 'Failed to submit review. Please try again.');
        } finally {
            setIsSubmittingReview(false);
        }
    };

    // ── loading / not found states ────────────────────────────────────────────

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
                <span className="material-symbols-outlined animate-spin text-4xl text-primary mb-4">progress_activity</span>
                <p className="font-medium text-slate-500">Loading product details...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
                <span className="material-symbols-outlined text-4xl text-slate-400 mb-4">error_outline</span>
                <p className="font-medium text-slate-500 mb-4">Product not found</p>
                <Link to="/products" className="px-6 py-2 bg-primary text-white rounded-lg font-bold">Back to Products</Link>
            </div>
        );
    }

    // ── compute gallery images ────────────────────────────────────────────────

    const galleryImages = product?.images?.length > 0
        ? product.images.map((url, i) => ({ url, alt: `View ${i + 1}`, extra: i === 3 }))
        : [
            { url: product?.image || `https://picsum.photos/seed/${product?.id || 'fallback'}/800/600`, alt: 'Main View' },
            { url: `https://picsum.photos/seed/${product?.id || 'fallback'}2/800/800`, alt: 'Side Profile' },
            { url: `https://picsum.photos/seed/${product?.id || 'fallback'}3/800/800`, alt: 'Overhead View' },
            { url: `https://picsum.photos/seed/${product?.id || 'fallback'}4/800/800`, alt: 'Texture Details', extra: true },
        ];
    const heroImage = galleryImages[selectedThumb]?.url || (product?.image || `https://picsum.photos/seed/${product?.id || 'fallback'}/800/600`);

    // ── compute review stats ──────────────────────────────────────────────────

    const approvedReviews = productReviews.filter(r => r.is_approved);
    const totalReviews = approvedReviews.length;
    const avgRating = totalReviews > 0
        ? approvedReviews.reduce((s, r) => s + (r.rating || 0), 0) / totalReviews
        : 0;
    const ratingBars = [5, 4, 3, 2, 1].map(star => {
        const count = approvedReviews.filter(r => r.rating === star).length;
        return { stars: star, pct: totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0 };
    });

    // ── render ────────────────────────────────────────────────────────────────

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* ── Hero: Gallery + Purchase Controls ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
                    {/* Gallery */}
                    <div className="lg:col-span-7 space-y-4">
                        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-200 relative group">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                role="img"
                                aria-label={product.name}
                                style={{ backgroundImage: `url('${heroImage}')` }}
                            />
                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                <span className="material-symbols-outlined text-amber-400 text-sm">star</span>
                                <span className="text-xs font-bold text-slate-900">
                                    {totalReviews > 0 ? `${avgRating.toFixed(1)} (${totalReviews} Reviews)` : 'No reviews yet'}
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {galleryImages.slice(0, 4).map((img, index) => (
                                <div
                                    key={index}
                                    onClick={() => setSelectedThumb(index)}
                                    className={`aspect-square rounded-lg border-2 overflow-hidden cursor-pointer transition-colors relative ${selectedThumb === index ? 'border-primary' : 'border-transparent hover:border-primary/50'}`}
                                >
                                    <div
                                        className={`w-full h-full bg-cover bg-center ${img.extra ? 'opacity-60' : ''}`}
                                        role="img"
                                        aria-label={img.alt}
                                        style={{ backgroundImage: `url('${img.url}')` }}
                                    />
                                    {img.extra && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                            <span className="text-white font-bold">+12</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Purchase Controls */}
                    <div className="lg:col-span-5 space-y-8">
                        <div>
                            <nav className="flex mb-4 text-xs font-bold text-slate-400 uppercase tracking-widest gap-2">
                                <Link className="hover:text-primary" to="/categories">Living Room</Link>
                                <span>/</span>
                                <Link className="hover:text-primary" to="/products">{product.category?.name || product.category || 'Sofas'}</Link>
                            </nav>
                            <h1 className="text-4xl font-black text-slate-900 dark:text-white leading-tight mb-4">{product.name}</h1>
                            <p className="text-lg text-slate-600 dark:text-slate-400">
                                {product.description || 'Handcrafted luxury with premium Italian velvet upholstery and a kiln-dried European hardwood frame.'}
                            </p>
                        </div>

                        {/* Fabric Selector */}
                        <div className="space-y-4">
                            <p className="text-sm font-bold uppercase tracking-wider text-slate-500">Select Fabric</p>
                            <div className="flex flex-wrap gap-3">
                                {FABRIC_COLORS.map((fabric, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedFabric(index)}
                                        className={`w-12 h-12 rounded-full ${selectedFabric === index ? 'ring-2 ring-offset-2 ring-primary' : 'ring-1 ring-slate-200'}`}
                                        style={{ backgroundColor: fabric.color }}
                                        title={fabric.name}
                                    />
                                ))}
                            </div>
                            <p className="text-sm text-slate-500 italic">
                                Color: <span className="text-slate-900 dark:text-white font-medium">{FABRIC_COLORS[selectedFabric].name}</span>
                            </p>
                        </div>

                        {/* Price Card */}
                        <div className="p-6 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 space-y-6">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-slate-500 text-sm mb-1">Base Price</p>
                                    <p className="text-3xl font-black text-slate-900 dark:text-white leading-none">${product.price}</p>
                                </div>
                                <p className="text-primary text-sm font-bold bg-primary/10 px-3 py-1 rounded-full">Save 15% Today</p>
                            </div>
                            <div className="space-y-3">
                                <Link to={`/customizer/${product.id || product._id || id}`} className="w-full bg-primary text-white py-4 rounded-lg font-black text-lg shadow-xl shadow-primary/25 hover:-translate-y-0.5 transition-all text-center block">
                                    Start Customizing
                                </Link>
                                <button onClick={handleAddToCartBase} disabled={isAdding} className="w-full border-2 border-slate-200 dark:border-slate-700 py-4 rounded-lg font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50">
                                    {isAdding ? 'Adding...' : 'Add to Cart (Base)'}
                                </button>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                                <div className="flex items-center gap-1"><span className="material-symbols-outlined text-base">local_shipping</span> Free Shipping</div>
                                <div className="flex items-center gap-1"><span className="material-symbols-outlined text-base">verified</span> 10-Year Warranty</div>
                                <div className="flex items-center gap-1"><span className="material-symbols-outlined text-base">calendar_today</span> 30-Day Trial</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Details Section ── */}
                <section className="py-20 border-t border-slate-200 dark:border-slate-800" id="details">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Uncompromising Craftsmanship</h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                                The Elysian isn&apos;t just a sofa; it&apos;s a statement of enduring quality. Every frame is hand-built using kiln-dried European hardwood, ensuring it never warps or squeaks. Our velvet is sourced from a historic family-owned mill in Northern Italy, offering a depth of color and softness that is simply unmatched.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary bg-primary/10 p-1 rounded-md">check</span>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white text-sm">Triple-Layer Cushioning</p>
                                        <p className="text-slate-500 text-sm">High-resiliency foam core wrapped in premium down feathers.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary bg-primary/10 p-1 rounded-md">check</span>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white text-sm">Stain-Resistant Finish</p>
                                        <p className="text-slate-500 text-sm">Proprietary finish that protects fibers without sacrificing softness.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                alt="Detailed craftsmanship of wooden furniture frame"
                                className="w-full h-auto"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJ841MK0d8wk5mqnhsxYnoXnSiYN6gPPzOPKJC2-7FlFPO3lD28JWhAoWRGFSs9RJ7YPmBQh0HBHtYkoljuKoTod9EcdorJOeiMSLPP4V1yIenPpIsMEgRFfLAOgptl6hNYu6S86ktltCd2ux_-zQkhcDHXGfq2wMo2FRjuQPTk_fOH9h8i175SESC1G0U-YG8Bw0gUSP06dP-V4MT95ApmovRMeO54Wvfce8O8vFX0lg3CMuj9Wn5DfnHBgk4i9fc7d-pzkKwAd8y"
                            />
                        </div>
                    </div>
                </section>

                {/* ── Specifications Section ── */}
                <section className="py-20 bg-white dark:bg-slate-800/30 rounded-3xl px-8 md:px-12 border border-slate-100 dark:border-slate-800" id="specs">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-12 text-center">Specifications</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="space-y-6">
                            <h3 className="flex items-center gap-2 font-black text-primary text-sm uppercase tracking-widest">
                                <span className="material-symbols-outlined">straighten</span> Dimensions
                            </h3>
                            <div className="space-y-4">
                                {DIMENSIONS.map((dim, i) => (
                                    <div key={i} className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                                        <span className="text-slate-500">{dim.label}</span>
                                        <span className="font-bold">{dim.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-6">
                            <h3 className="flex items-center gap-2 font-black text-primary text-sm uppercase tracking-widest">
                                <span className="material-symbols-outlined">inventory_2</span> Materials
                            </h3>
                            <div className="space-y-4">
                                {MATERIALS.map((mat, i) => (
                                    <div key={i} className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                                        <span className="text-slate-500">{mat.label}</span>
                                        <span className="font-bold">{mat.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-6">
                            <h3 className="flex items-center gap-2 font-black text-primary text-sm uppercase tracking-widest">
                                <span className="material-symbols-outlined">info</span> Care
                            </h3>
                            <p className="text-sm text-slate-500 leading-relaxed italic">
                                Professional cleaning recommended. For minor spills, blot immediately with a clean, dry white cloth. Do not rub. Regular vacuuming with a brush attachment helps maintain the velvet&apos;s pile and luster.
                            </p>
                            <button onClick={() => alert('Downloading Care Guide...')} className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                                Download Care Guide (PDF) <span className="material-symbols-outlined text-base">download</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* ── Reviews Section — Dynamic from API ── */}
                <section className="py-20" id="reviews">
                    <div className="flex flex-col md:flex-row gap-12 items-start">

                        {/* Rating Summary + Write Review */}
                        <div className="md:w-1/3 space-y-6 sticky top-24">
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Customer Reviews</h2>
                            <div className="p-8 bg-primary/5 rounded-2xl border border-primary/10">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="text-5xl font-black text-primary">
                                        {totalReviews > 0 ? avgRating.toFixed(1) : '—'}
                                    </span>
                                    <div>
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <span
                                                    key={i}
                                                    className="material-symbols-outlined"
                                                    style={{
                                                        color: i <= Math.round(avgRating) ? '#f59e0b' : '#d1d5db',
                                                        fontVariationSettings: i <= Math.round(avgRating) ? "'FILL' 1" : "'FILL' 0",
                                                    }}
                                                >star</span>
                                            ))}
                                        </div>
                                        <p className="text-slate-500 text-sm font-medium">
                                            {reviewsLoading ? 'Loading...' : `Based on ${totalReviews} review${totalReviews !== 1 ? 's' : ''}`}
                                        </p>
                                    </div>
                                </div>

                                {/* Star distribution bars */}
                                <div className="space-y-2 mb-6">
                                    {ratingBars.map(bar => (
                                        <div key={bar.stars} className="flex items-center gap-3">
                                            <span className="text-xs font-bold w-4">{bar.stars}</span>
                                            <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-primary transition-all duration-500" style={{ width: `${bar.pct}%` }} />
                                            </div>
                                            <span className="text-xs text-slate-500 w-8">{bar.pct}%</span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setIsWritingReview(!isWritingReview)}
                                    className="w-full py-3 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-colors"
                                >
                                    {isWritingReview ? 'Cancel Review' : 'Write a Review'}
                                </button>

                                {isWritingReview && (
                                    <div className="mt-4 p-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 shadow-sm">
                                        <h4 className="font-bold mb-2 text-sm text-slate-800 dark:text-slate-200">Your Rating</h4>
                                        <div className="flex items-center gap-1 mb-3">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    onMouseEnter={() => setReviewHovered(i)}
                                                    onMouseLeave={() => setReviewHovered(0)}
                                                    onClick={() => setReviewRating(i)}
                                                    className="focus:outline-none"
                                                >
                                                    <span
                                                        className="material-symbols-outlined text-2xl"
                                                        style={{
                                                            color: i <= (reviewHovered || reviewRating) ? '#f59e0b' : '#d1d5db',
                                                            fontVariationSettings: i <= (reviewHovered || reviewRating) ? "'FILL' 1" : "'FILL' 0",
                                                        }}
                                                    >star</span>
                                                </button>
                                            ))}
                                        </div>
                                        <h4 className="font-bold mb-1 text-sm text-slate-800 dark:text-slate-200">Your Review</h4>
                                        <textarea
                                            className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-lg mb-1 bg-transparent text-sm focus:ring-primary focus:border-primary"
                                            rows="3"
                                            placeholder="What do you think about this product?"
                                            value={reviewComment}
                                            onChange={e => setReviewComment(e.target.value)}
                                            maxLength={500}
                                        />
                                        <p className="text-xs text-slate-400 mb-3">{reviewComment.length}/500</p>
                                        <button
                                            onClick={handleSubmitReview}
                                            disabled={isSubmittingReview || reviewRating === 0 || reviewComment.trim().length < 10}
                                            className="w-full py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
                                        >
                                            {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Review List */}
                        <div className="md:w-2/3 space-y-6">
                            {reviewsLoading ? (
                                <div className="flex flex-col items-center py-12 text-slate-400">
                                    <span className="material-symbols-outlined animate-spin text-3xl mb-2">progress_activity</span>
                                    <p className="text-sm">Loading reviews...</p>
                                </div>
                            ) : productReviews.length === 0 ? (
                                <div className="flex flex-col items-center py-12 text-slate-400 border border-slate-200 dark:border-slate-700 rounded-2xl">
                                    <span className="material-symbols-outlined text-5xl mb-3">rate_review</span>
                                    <p className="font-bold text-slate-500">No reviews yet</p>
                                    <p className="text-sm text-slate-400 mt-1">Be the first to share your experience!</p>
                                </div>
                            ) : (
                                productReviews.slice(0, visibleReviews).map((review, index) => {
                                    const userName = review.User?.name || review.user?.name || 'Customer';
                                    const userInitial = userName.charAt(0).toUpperCase();
                                    const reviewDate = review.createdAt
                                        ? new Date(review.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
                                        : '';
                                    return (
                                        <div key={review.id || index} className="p-6 border-b border-slate-200 dark:border-slate-800 space-y-4">
                                            <div className="flex justify-between items-start">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                                        <span className="font-bold text-primary text-sm">{userInitial}</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-900 dark:text-white">{userName}</p>
                                                        <p className="text-xs text-slate-500 font-medium">
                                                            {review.is_approved ? 'Verified Buyer' : 'Pending approval'}{reviewDate ? ` • ${reviewDate}` : ''}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex">
                                                    {[1, 2, 3, 4, 5].map(i => (
                                                        <span
                                                            key={i}
                                                            className="material-symbols-outlined text-sm"
                                                            style={{
                                                                color: i <= (review.rating || 0) ? '#f59e0b' : '#d1d5db',
                                                                fontVariationSettings: i <= (review.rating || 0) ? "'FILL' 1" : "'FILL' 0",
                                                            }}
                                                        >star</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{review.comment}</p>
                                        </div>
                                    );
                                })
                            )}

                            {!reviewsLoading && productReviews.length > visibleReviews && (
                                <button
                                    onClick={() => setVisibleReviews(v => v + 4)}
                                    className="w-full py-4 text-slate-500 font-bold flex items-center justify-center gap-2 hover:text-primary transition-colors"
                                >
                                    Load More Reviews <span className="material-symbols-outlined">expand_more</span>
                                </button>
                            )}
                        </div>
                    </div>
                </section>

                {/* ── Related Products ── */}
                <section className="py-20 border-t border-slate-200 dark:border-slate-800">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8">You May Also Like</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {RELATED_PRODUCTS.map((rp, index) => (
                            <Link key={index} className="group cursor-pointer block" to="/products" onClick={() => window.scrollTo(0, 0)}>
                                <div className="aspect-square rounded-xl overflow-hidden bg-slate-200 mb-4 relative">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                        role="img"
                                        aria-label={rp.alt}
                                        style={{ backgroundImage: `url('${rp.image}')` }}
                                    />
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{rp.name}</h3>
                                <p className="text-slate-500 text-sm">{rp.price}</p>
                            </Link>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
};

export default ProductDetail;
