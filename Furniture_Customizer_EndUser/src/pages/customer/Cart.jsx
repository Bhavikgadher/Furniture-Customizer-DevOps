import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cartService } from '../../services/cart.service';
import toast from 'react-hot-toast';

/**
 * Cart Page
 *
 * Shopping cart with:
 * - FurniCustom branded navbar with search, cart badge, profile
 * - Cart items list (3 items) with image, details, quantity +/-, remove, favorite
 * - "Continue Shopping" link
 * - Sticky sidebar: Cart Summary (subtotal, shipping, tax, total),
 *   coupon code input, "Proceed to Checkout" CTA, trust badges
 * - Simple footer
 *
 * Route: /cart
 */

const Cart = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCart = async () => {
        try {
            const res = await cartService.getCart();
            if (res.data?.cart) {
                setCart(res.data.cart);
            } else {
                setCart({ items: [], total: 0 });
            }
        } catch (error) {
            console.error('Fetch cart error:', error);
            // Optionally set empty cart on error or toast
            if (error.response?.status !== 404) {
                toast.error('Failed to load cart');
            }
            setCart({ items: [], total: 0 });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const updateQty = async (id, currentQty, delta) => {
        const newQty = Math.max(1, currentQty + delta);
        if (newQty === currentQty) return;
        
        // Optimistic update
        setCart(prev => ({
            ...prev,
            items: prev.items.map(item => item.id === id ? { ...item, quantity: newQty } : item)
        }));

        try {
            await cartService.updateItem(id, { quantity: newQty });
            fetchCart();
        } catch (error) {
            console.error('Update qty error:', error);
            toast.error('Failed to update quantity');
            fetchCart(); // Revert
        }
    };

    const removeItem = async (id) => {
        // Optimistic update
        setCart(prev => ({
            ...prev,
            items: prev.items.filter(item => item.id !== id)
        }));

        try {
            await cartService.removeItem(id);
            toast.success('Item removed');
            fetchCart();
        } catch (error) {
            console.error('Remove item error:', error);
            toast.error('Failed to remove item');
            fetchCart(); // Revert
        }
    };

    const [wishlistedIds, setWishlistedIds] = useState(new Set()); // Kept for UI interactivity

    const toggleWishlist = (item) => {
        // Mock wishlist logic since wishlist API might be different
        setWishlistedIds(prev => {
            const next = new Set(prev);
            if (next.has(item.id)) next.delete(item.id);
            else next.add(item.id);
            return next;
        });
        toast.success(wishlistedIds.has(item.id) ? 'Removed from wishlist' : 'Added to wishlist');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
                <span className="material-symbols-outlined animate-spin text-4xl text-primary mb-4">progress_activity</span>
                <p>Loading your cart...</p>
            </div>
        );
    }

    const items = cart?.items || [];
    
    // Server returns total, but let's recompute subtotal locally from items to match UI structure easily
    const subtotal = items.reduce((acc, item) => {
        const price = parseFloat(item.SavedDesign?.calculated_price || item.SavedDesign?.calculatedPrice || 0);
        return acc + (price * item.quantity);
    }, 0);
    const tax = subtotal * 0.085;
    const shipping = items.length > 0 ? 120 : 0;
    const total = subtotal + tax + shipping;

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
            {/* Top Navigation Bar */}
            {/* Removed hardcoded header to use MainLayout */}

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Page Title */}
                <div className="mb-10">
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                        Your Shopping Cart
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Review and manage your custom furniture selections.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Items List */}
                    <div className="flex-1 space-y-6">
                        {items.length === 0 ? (
                            <div className="bg-white dark:bg-slate-900 rounded-xl p-12 text-center border border-slate-200 dark:border-slate-800">
                                <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">shopping_cart</span>
                                <h3 className="text-xl font-bold mb-2">Your cart is empty</h3>
                                <p className="text-slate-500 mb-6">Looks like you haven't added any furniture yet.</p>
                                <Link to="/products" className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:-translate-y-1 transition-transform">
                                    Start Shopping
                                </Link>
                            </div>
                        ) : items.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-6 relative group"
                            >
                                <div className="w-full sm:w-40 h-40 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800 flex-shrink-0">
                                    <img
                                        alt={item.SavedDesign?.model?.name || 'Product Image'}
                                        className="w-full h-full object-cover"
                                        src={item.SavedDesign?.model?.base_image || item.SavedDesign?.image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800'}
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2 pr-4">
                                                {item.SavedDesign?.model?.name || 'Custom Furniture Piece'}
                                            </h3>
                                            <p className="text-lg font-bold text-primary">
                                                ${parseFloat(item.SavedDesign?.calculated_price || item.SavedDesign?.calculatedPrice || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </p>
                                        </div>
                                        <div className="mt-2 space-y-1 flex flex-wrap gap-x-4 gap-y-1">
                                            {item.SavedDesign?.material?.name && (
                                                <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                                                    <span className="font-semibold text-slate-700 dark:text-slate-300">Material:</span> {item.SavedDesign.material.name}
                                                </div>
                                            )}
                                            {item.SavedDesign?.color?.name && (
                                                <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                                                    <span className="font-semibold text-slate-700 dark:text-slate-300">Color:</span> {item.SavedDesign.color.name}
                                                </div>
                                            )}
                                            {item.SavedDesign?.size?.name && (
                                                <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                                                    <span className="font-semibold text-slate-700 dark:text-slate-300">Size:</span> {item.SavedDesign.size.name}
                                                </div>
                                            )}
                                            {item.SavedDesign?.fabric?.name && (
                                                <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                                                    <span className="font-semibold text-slate-700 dark:text-slate-300">Fabric:</span> {item.SavedDesign.fabric.name}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-6 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800">
                                                <button
                                                    onClick={() => updateQty(item.id, item.quantity, -1)}
                                                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-sm">remove</span>
                                                </button>
                                                <span className="px-4 text-sm font-semibold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQty(item.id, item.quantity, 1)}
                                                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-sm">add</span>
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-xs font-semibold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-wider"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                        <div className="text-slate-400">
                                            <button onClick={() => toggleWishlist(item)} className={`transition-colors ${wishlistedIds.has(item.id) ? 'text-red-500' : 'hover:text-primary'}`} title="Add to Wishlist">
                                                <span className={`material-symbols-outlined ${wishlistedIds.has(item.id) ? 'font-variation-settings-fill-1' : ''}`} style={wishlistedIds.has(item.id) ? {fontVariationSettings: "'FILL' 1"} : {}}>favorite</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Back to Shopping */}
                        <Link
                            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                            to="/products"
                        >
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            Continue Shopping
                        </Link>
                    </div>

                    {/* Sidebar Cart Summary */}
                    <div className="lg:w-96">
                        <div className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-md border border-slate-200 dark:border-slate-800 sticky top-24">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                                Cart Summary
                            </h3>
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-slate-900 dark:text-white">
                                        ${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                </div>
                                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                    <span>Estimated Shipping</span>
                                    <span className="font-medium text-slate-900 dark:text-white">
                                        ${shipping.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                </div>
                                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                    <span>Tax (8.5%)</span>
                                    <span className="font-medium text-slate-900 dark:text-white">
                                        ${tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                </div>
                            </div>
                            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 mb-8">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-lg font-bold text-slate-900 dark:text-white">Total</span>
                                    <span className="text-2xl font-black text-primary tracking-tight">
                                        ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                </div>
                            </div>

                            {/* Promo Code */}
                            <div className="mb-8">
                                <label
                                    className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                                    htmlFor="promo"
                                >
                                    Coupon Code
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        className="block w-full px-4 py-3 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm focus:ring-primary focus:border-primary transition-all"
                                        id="promo"
                                        placeholder="Enter code"
                                        type="text"
                                    />
                                    <button className="px-4 py-2 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary/20 transition-all text-sm">
                                        Apply
                                    </button>
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <button onClick={() => navigate('/checkout')} className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
                                Proceed to Checkout
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>

                            {/* Trust Badges */}
                            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-4">
                                <div className="flex flex-col items-center text-center gap-1">
                                    <span className="material-symbols-outlined text-primary text-xl">
                                        verified_user
                                    </span>
                                    <span className="text-[10px] font-bold uppercase text-slate-500 tracking-tighter">
                                        Secure Checkout
                                    </span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-1">
                                    <span className="material-symbols-outlined text-primary text-xl">
                                        auto_awesome
                                    </span>
                                    <span className="text-[10px] font-bold uppercase text-slate-500 tracking-tighter">
                                        100% Satisfaction
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            {/* Removed hardcoded footer to use MainLayout */}
        </div>
    );
};

export default Cart;
