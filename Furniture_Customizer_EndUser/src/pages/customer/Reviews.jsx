import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { reviewService } from '../../services/review.service';
import { orderService } from '../../services/order.service';
import toast from 'react-hot-toast';

/**
 * Reviews & Ratings Page
 *
 * Fully functional review dashboard:
 * - Loads user's published reviews from /reviews/my-reviews
 * - Loads delivered orders to identify products eligible for review
 * - Write new review with interactive star rating + textarea
 * - Edit / delete existing reviews
 * - Stats: published count, pending count, average rating
 *
 * Route: /reviews
 */

const StarRatingInput = ({ value, onChange }) => {
    const [hovered, setHovered] = useState(0);
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
                <button
                    key={i}
                    type="button"
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => onChange(i)}
                    className="text-4xl transition-colors focus:outline-none"
                >
                    <span
                        className="material-symbols-outlined text-4xl"
                        style={{
                            color: i <= (hovered || value) ? '#f59e0b' : '#d1d5db',
                            fontVariationSettings: i <= (hovered || value) ? "'FILL' 1" : "'FILL' 0",
                        }}
                    >
                        star
                    </span>
                </button>
            ))}
        </div>
    );
};

const StarDisplay = ({ count }) => (
    <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
            <span
                key={i}
                className="material-symbols-outlined text-sm"
                style={{
                    color: i <= count ? '#f59e0b' : '#d1d5db',
                    fontVariationSettings: i <= count ? "'FILL' 1" : "'FILL' 0",
                }}
            >
                star
            </span>
        ))}
    </div>
);

const Reviews = () => {
    const [myReviews, setMyReviews] = useState([]);
    const [pendingProducts, setPendingProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Form state
    const [activeForm, setActiveForm] = useState(null); // { mode: 'new'|'edit', product, review? }
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            // getMyReviews() now returns a plain array directly
            const published = await reviewService.getMyReviews();
            setMyReviews(Array.isArray(published) ? published : []);

            // Fetch delivered orders to find pending review items
            try {
                const ordersRes = await orderService.getOrders();
                // Normalise: service returns response.data which may be { orders: [...] } or { data: { orders: [...] } }
                const orders = ordersRes?.orders ?? ordersRes?.data?.orders ?? ordersRes?.data ?? [];
                const deliveredOrders = (Array.isArray(orders) ? orders : []).filter(o => o.status === 'delivered');

                // Build a set of already-reviewed model IDs
                const reviewedModelIds = new Set(
                    (Array.isArray(published) ? published : []).map(r => r.FurnitureModel?.id).filter(Boolean)
                );

                // Collect products from delivered orders that haven't been reviewed
                const pending = [];
                deliveredOrders.forEach(order => {
                    (order.OrderItems || []).forEach(item => {
                        const modelId = item.SavedDesign?.model?.id || item.snapshot_data?.model_id;
                        const modelName = item.SavedDesign?.model?.name || item.snapshot_data?.name || 'Custom Furniture';
                        const modelImage = item.SavedDesign?.model?.base_image || item.snapshot_data?.image;
                        if (modelId && !reviewedModelIds.has(modelId)) {
                            reviewedModelIds.add(modelId);
                            pending.push({
                                modelId,
                                modelName,
                                modelImage,
                                orderNumber: order.orderNumber,
                                orderId: order.id,
                                createdAt: order.createdAt,
                            });
                        }
                    });
                });
                setPendingProducts(pending);
            } catch {
                setPendingProducts([]);
            }
        } catch (err) {
            console.error('fetchData error:', err);
            setMyReviews([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const openNewReview = (product) => {
        setActiveForm({ mode: 'new', product });
        setRating(0);
        setComment('');
    };

    const openEditReview = (review) => {
        setActiveForm({ mode: 'edit', review });
        setRating(review.rating);
        setComment(review.comment || '');
    };

    const closeForm = () => {
        setActiveForm(null);
        setRating(0);
        setComment('');
    };

    const handleSubmit = async () => {
        if (rating === 0) { toast.error('Please select a star rating'); return; }
        if (comment.trim().length < 10) { toast.error('Please write at least 10 characters'); return; }

        setIsSubmitting(true);
        try {
            if (activeForm.mode === 'new') {
                const res = await reviewService.createReview({
                    model_id: activeForm.product.modelId,
                    rating,
                    comment: comment.trim(),
                });
                toast.success('Review submitted successfully!');
                // Optimistically add the new review — do NOT call fetchData() here
                // because it may overwrite this state before the server syncs
                const newReview = res?.review || res?.data?.review || {
                    id: Date.now(),
                    rating,
                    comment: comment.trim(),
                    is_approved: false,
                    createdAt: new Date().toISOString(),
                    FurnitureModel: {
                        id: activeForm.product.modelId,
                        name: activeForm.product.modelName,
                        base_image: activeForm.product.modelImage,
                    },
                };
                setMyReviews(prev => [newReview, ...prev]);
                closeForm();
            } else {
                await reviewService.updateReview(activeForm.review.id, {
                    rating,
                    comment: comment.trim(),
                });
                toast.success('Review updated!');
                // Update in place immediately
                setMyReviews(prev => prev.map(r =>
                    r.id === activeForm.review.id ? { ...r, rating, comment: comment.trim() } : r
                ));
                closeForm();
                // For edits: refresh to get authoritative data from server
                fetchData();
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || err.message || 'Failed to submit review');
        } finally {
            setIsSubmitting(false);
        }
    };


    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this review?')) return;
        try {
            // Optimistically remove from state immediately
            setMyReviews(prev => prev.filter(r => r.id !== id));
            await reviewService.deleteReview(id);
            toast.success('Review deleted');
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || 'Failed to delete review');
            // Rollback — re-fetch
            fetchData();
        }
    };

    // Stats
    const avgRating = myReviews.length > 0
        ? (myReviews.reduce((acc, r) => acc + (r.rating || 0), 0) / myReviews.length).toFixed(1)
        : '—';

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
                <span className="material-symbols-outlined animate-spin text-4xl text-primary mb-4">progress_activity</span>
                <p className="font-medium text-slate-500">Loading your reviews...</p>
            </div>
        );
    }

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Your Feedback Matters
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">
                            {myReviews.length > 0
                                ? `You've shared ${myReviews.length} review${myReviews.length > 1 ? 's' : ''}.`
                                : 'Share your experience to help other shoppers.'}
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center min-w-[110px]">
                            <span className="text-2xl font-bold text-primary">{myReviews.length}</span>
                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Published</span>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center min-w-[110px]">
                            <span className="text-2xl font-bold text-amber-500">{pendingProducts.length}</span>
                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">To Review</span>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center min-w-[110px]">
                            <span className="text-2xl font-bold text-slate-900 dark:text-white">{avgRating}</span>
                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Avg Rating</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Pending Reviews Section */}
                        {pendingProducts.length > 0 && (
                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined text-amber-500">pending_actions</span>
                                    <h3 className="text-lg font-bold">Pending Reviews ({pendingProducts.length})</h3>
                                </div>
                                <div className="space-y-4">
                                    {pendingProducts.map((item) => (
                                        <div key={item.modelId} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 hover:shadow-md transition-shadow">
                                            <div className="flex flex-col sm:flex-row gap-5">
                                                <div className="w-full sm:w-28 h-28 rounded-lg bg-slate-100 dark:bg-slate-900 overflow-hidden flex-shrink-0">
                                                    {item.modelImage ? (
                                                        <img className="w-full h-full object-cover" alt={item.modelName} src={item.modelImage} />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <span className="material-symbols-outlined text-3xl text-slate-300">chair</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 flex flex-col justify-between">
                                                    <div>
                                                        <h4 className="font-bold text-lg text-slate-900 dark:text-white">{item.modelName}</h4>
                                                        <p className="text-slate-500 text-sm mt-1">Order {item.orderNumber}</p>
                                                    </div>
                                                    <div className="mt-4 flex flex-wrap items-center gap-3">
                                                        <button
                                                            onClick={() => openNewReview(item)}
                                                            className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all"
                                                        >
                                                            <span className="material-symbols-outlined text-base">edit_note</span>
                                                            Write a Review
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* No pending, no reviews: show CTA */}
                        {pendingProducts.length === 0 && myReviews.length === 0 && (
                            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-10 text-center">
                                <span className="material-symbols-outlined text-5xl text-slate-300 mb-3 block">rate_review</span>
                                <h3 className="font-bold text-lg mb-2">No reviews yet</h3>
                                <p className="text-slate-500 text-sm mb-4">Complete a delivered order to start reviewing products.</p>
                                <Link to="/orders" className="inline-block bg-primary text-white font-bold py-2.5 px-6 rounded-lg hover:bg-primary/90 transition-colors">
                                    View My Orders
                                </Link>
                            </div>
                        )}

                        {/* Review Form (New or Edit) */}
                        {activeForm && (
                            <section className="bg-white dark:bg-slate-800 rounded-2xl border border-primary/30 overflow-hidden shadow-lg">
                                <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary/10 p-2 rounded-lg">
                                            <span className="material-symbols-outlined text-primary">rate_review</span>
                                        </div>
                                        <h3 className="text-lg font-bold">
                                            {activeForm.mode === 'new'
                                                ? `Review: ${activeForm.product.modelName}`
                                                : `Edit Review: ${activeForm.review.FurnitureModel?.name || 'Product'}`}
                                        </h3>
                                    </div>
                                    <button onClick={closeForm} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                        <span className="material-symbols-outlined">close</span>
                                    </button>
                                </div>
                                <div className="p-8 space-y-6">
                                    {/* Star Rating */}
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                                            Overall Rating <span className="text-red-500">*</span>
                                        </label>
                                        <StarRatingInput value={rating} onChange={setRating} />
                                        <p className="text-xs text-slate-400 mt-2">
                                            {rating === 0 && 'Click a star to rate'}
                                            {rating === 1 && '⭐ Poor'}
                                            {rating === 2 && '⭐⭐ Fair'}
                                            {rating === 3 && '⭐⭐⭐ Good'}
                                            {rating === 4 && '⭐⭐⭐⭐ Very Good'}
                                            {rating === 5 && '⭐⭐⭐⭐⭐ Excellent!'}
                                        </p>
                                    </div>

                                    {/* Comment */}
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                            Your Review <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-slate-400 p-3 text-sm"
                                            placeholder="What did you like or dislike? How was the quality, delivery, and assembly?"
                                            rows="4"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            maxLength={1000}
                                        />
                                        <div className="flex justify-between mt-1">
                                            <p className="text-xs text-slate-400">Minimum 10 characters</p>
                                            <p className={`text-xs ${comment.length >= 900 ? 'text-red-500' : 'text-slate-400'}`}>{comment.length}/1000</p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-700">
                                        <button
                                            onClick={closeForm}
                                            className="px-6 py-2.5 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSubmit}
                                            disabled={isSubmitting || rating === 0 || comment.trim().length < 10}
                                            className="bg-primary text-white px-8 py-2.5 rounded-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
                                        >
                                            {isSubmitting && <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>}
                                            {isSubmitting ? 'Submitting...' : (activeForm.mode === 'edit' ? 'Update Review' : 'Submit Review')}
                                        </button>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* My Published Reviews (in left column too if many) */}
                        {myReviews.length > 0 && (
                            <section className="lg:hidden">
                                <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined text-primary">reviews</span>
                                    My Published Reviews
                                </h3>
                                {/* Shown in right column on desktop; here on mobile */}
                            </section>
                        )}
                    </div>

                    {/* Right Column: Published Reviews */}
                    <div className="space-y-8">
                        {myReviews.length > 0 ? (
                            <section>
                                <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined text-primary">reviews</span>
                                    Published Reviews
                                </h3>
                                <div className="space-y-4">
                                    {myReviews.map((review) => (
                                        <div key={review.id} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                                            {/* Product info */}
                                            {review.FurnitureModel && (
                                                <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-700">
                                                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 overflow-hidden flex-shrink-0">
                                                        {review.FurnitureModel.base_image ? (
                                                            <img src={review.FurnitureModel.base_image} alt={review.FurnitureModel.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center">
                                                                <span className="material-symbols-outlined text-slate-300 text-lg">chair</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">{review.FurnitureModel.name}</p>
                                                        <p className="text-xs text-slate-400">{review.createdAt ? new Date(review.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) : ''}</p>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex items-center justify-between">
                                                <StarDisplay count={review.rating} />
                                                <div className="flex items-center gap-1">
                                                    {review.is_approved ? (
                                                        <span className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                                                            <span className="material-symbols-outlined text-sm">verified</span> Approved
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs text-amber-500 font-medium">Pending approval</span>
                                                    )}
                                                </div>
                                            </div>

                                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{review.comment}</p>

                                            {/* Edit / Delete actions */}
                                            <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-700">
                                                <button
                                                    onClick={() => openEditReview(review)}
                                                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                                                >
                                                    <span className="material-symbols-outlined text-sm">edit</span> Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(review.id)}
                                                    className="text-xs font-bold text-red-500 hover:underline flex items-center gap-1"
                                                >
                                                    <span className="material-symbols-outlined text-sm">delete</span> Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ) : (
                            <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 text-center">
                                <span className="material-symbols-outlined text-4xl text-slate-300 mb-2 block">reviews</span>
                                <p className="text-slate-500 text-sm">Your published reviews will appear here.</p>
                            </section>
                        )}

                        {/* Guidelines Card */}
                        <section className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-6 border border-primary/20">
                            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                                <span className="material-symbols-outlined text-primary">info</span>
                                Review Tips
                            </h4>
                            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-4">
                                <li>Be specific about material quality</li>
                                <li>Mention assembly difficulty</li>
                                <li>Include how the product fits your space</li>
                                <li>Focus on the product experience</li>
                                <li>Reviews are approved before publishing</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Reviews;
