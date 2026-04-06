import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { profileService } from '../../services/profile.service';
import { cartService } from '../../services/cart.service';
import { checkoutService } from '../../services/checkout.service';
import toast from 'react-hot-toast';

/**
 * Checkout Page
 *
 * Multi-step checkout with:
 * - Navbar with cart badge and profile
 * - Breadcrumbs: Home > Cart > Checkout
 * - Step 1: Shipping Address (Default + Office, selectable)
 * - Step 2: Delivery Method (Standard/Express/White Glove, radio)
 * - Step 3: Payment Method (Credit Card/PayPal/Bank Transfer tabs + card form)
 * - Trust indicators (SSL, Buyer Protection, 30-Day Returns)
 * - Sticky Order Summary sidebar (items, promo, pricing, "Complete Purchase")
 * - Help chat widget
 * - Footer
 *
 * Route: /checkout
 */

const INITIAL_ADDRESSES = [
    {
        id: 1,
        label: 'Default',
        name: 'Jane Doe',
        address: '123 Maple Street, Apt 4B',
        city: 'Brooklyn, NY 11201',
        phone: '+1 (555) 000-1234',
        selected: true,
    },
    {
        id: 2,
        label: 'Office',
        name: 'Jane Doe',
        address: '456 Broadway Ave, 12th Floor',
        city: 'New York, NY 10012',
        phone: '+1 (555) 000-5678',
        selected: false,
    },
];

const DELIVERY_METHODS = [
    { id: 'standard', name: 'Standard Delivery', desc: '3-5 business days', price: 'Free', checked: false },
    { id: 'express', name: 'Express Shipping', desc: 'Next-day delivery before 2 PM', price: '$24.99', checked: true },
    { id: 'whiteglove', name: 'White Glove Service', desc: 'Delivery, assembly, and packaging removal', price: '$75.00', checked: false },
];

const PAYMENT_TABS = [
    { icon: 'credit_card', label: 'Credit Card' },
    { icon: 'account_balance_wallet', label: 'PayPal' },
    { icon: 'account_balance', label: 'Bank Transfer' },
];

const ORDER_ITEMS = [
    {
        name: 'Velvet Lounge Chair',
        detail: 'Color: Midnight Blue',
        qty: 1,
        price: '$899.00',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjpu-uj5bbGN0sRlyVbmDSLe_ZB2uRk7FQACqZ-x-vzPQSM63t72Sh-xOgjCyMSxb_rmttiBzbKcSPkvv8P0gLGrrX_j99VjFR0ZFLVqL3EMQGaGF_13nGP4pt_fMn58JClCFdCpMHnpVmHyBpFqh3XIXs9AhX-erQWnvLpxMeuFZoeqLxvKcIxv6UoJq0ZqhX4HtMbk9VYRpE9uyuldBT5oq3-wl9A052eZzMQbfZD--S99PeXPEJu2nlYZED_Tzvh9VOS640cQLC',
    },
    {
        name: 'Marble Coffee Table',
        detail: 'Finish: White Carrara',
        qty: 1,
        price: '$450.00',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUl443za8m33R0xYx1Tfjxpj0rz4aVkTNW9uRV-qLZJZcbvwO5Pb0QTqBrmtzeo69nD6sBQ83Fyovogn7VBvYL3SncAD-gofWmzwknSii6qpK64EBBbbhMb7gtSxGKWgl_h3M0sm-vOcvRkwcSXpCN9okZ5ZFUBbjL5i-m6vrCvzYi8MNO0ryyn9Kmpczt34gY4vTd9cb0eRlRYIgb3ATal4ZLJ03tbe9sUFbq_xa5LHyk4V-CbhLn_MJYf0S9A4KfCABhPVCAEeKO',
    },
];

const Checkout = () => {
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([]);
    const [cart, setCart] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Form selections
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedDelivery, setSelectedDelivery] = useState('express');
    const [activePaymentTab, setActivePaymentTab] = useState(0);
    const [saveCard, setSaveCard] = useState(true);
    const [showAddressForm, setShowAddressForm] = useState(false);

    // Coupon state
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);

    useEffect(() => {
        const fetchCheckoutData = async () => {
            try {
                // Ignore API 404s since cart might be empty, etc. Run sequentially or handle catch per promise.
                let loadedAddrs = [];
                try {
                    const addrRes = await profileService.getAddresses();
                    loadedAddrs = addrRes.data?.addresses || [];
                    setAddresses(loadedAddrs);
                    if (loadedAddrs.length > 0) {
                        const defAddr = loadedAddrs.find(a => a.is_default);
                        setSelectedAddress(defAddr ? defAddr.id : loadedAddrs[0].id);
                    }
                } catch (e) { console.error('Error fetching addresses setup'); }

                try {
                    const cartRes = await cartService.getCart();
                    if (cartRes.data?.cart?.items?.length > 0) {
                        setCart(cartRes.data.cart);
                    } else {
                        toast.error('Your cart is empty');
                        navigate('/cart');
                    }
                } catch (e) {
                    console.error('Error fetching cart');
                    if (e.response?.status !== 404) toast.error('Error loading checkout');
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchCheckoutData();
    }, [navigate]);

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) return;
        try {
            const res = await checkoutService.applyCoupon({ code: couponCode, orderTotal: subtotal });
            if (res.data) {
                setAppliedCoupon(res.data);
                toast.success('Coupon applied!');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Invalid coupon');
            setAppliedCoupon(null);
        }
    };

    const handleCompletePurchase = async () => {
        if (!selectedAddress) {
            toast.error('Please select a shipping address');
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = {
                address_id: selectedAddress,
                payment_method: activePaymentTab === 0 ? 'credit_card' : activePaymentTab === 1 ? 'paypal' : 'bank_transfer',
                delivery_method: selectedDelivery
            };
            const finalCoupon = appliedCoupon?.code || (couponCode && couponCode.trim());
            if (finalCoupon) {
                payload.coupon_code = finalCoupon;
            }
            const res = await checkoutService.createOrder(payload);
            const orderData = res.data?.order || { total, orderNumber: 'FC-XXXXXX', date: new Date().toLocaleDateString() };
            
            localStorage.setItem('lastOrder', JSON.stringify({ 
                ...orderData, 
                items: cart?.items || [], 
                shippingCost, 
                subtotal 
            }));
            
            toast.success('Order placed successfully!');
            navigate('/order-confirmation');
        } catch (error) {
            console.error('Checkout failed', error);
            toast.error(error.response?.data?.message || 'Failed to complete purchase');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
                <span className="material-symbols-outlined animate-spin text-4xl text-primary mb-4">progress_activity</span>
                <p>Preparing your checkout...</p>
            </div>
        );
    }

    const items = cart?.items || [];
    const subtotal = items.reduce((acc, item) => {
        const price = parseFloat(item.SavedDesign?.calculated_price || 0);
        return acc + (price * item.quantity);
    }, 0);

    const tax = subtotal * 0.085;
    const shippingCost = selectedDelivery === 'express' ? 24.99 : selectedDelivery === 'whiteglove' ? 75.00 : 0;
    
    // Apply discount if exists
    const discount = appliedCoupon?.discount || 0;
    const total = subtotal + tax + shippingCost - discount;

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
            {/* Top Navigation Bar */}
            {/* Removed hardcoded header to use MainLayout */}

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8">
                    <Link className="hover:text-primary" to="/">Home</Link>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <Link className="hover:text-primary" to="/cart">Cart</Link>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <span className="text-slate-900 dark:text-slate-100 font-semibold">Checkout</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left Column: Checkout Process */}
                    <div className="lg:col-span-8 space-y-10">
                        {/* Section 1: Shipping Address */}
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <span className="size-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                                        1
                                    </span>
                                    <h2 className="text-xl font-bold">Shipping Address</h2>
                                </div>
                                <button onClick={() => setShowAddressForm(!showAddressForm)} className="flex items-center gap-2 text-sm font-semibold text-primary hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-colors">
                                    <span className="material-symbols-outlined text-lg">{showAddressForm ? 'close' : 'add'}</span>
                                    {showAddressForm ? 'Cancel' : 'Add New Address'}
                                </button>
                            </div>

                            {showAddressForm && (
                                <form className="mb-6 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                                    <h3 className="font-bold mb-4">New Address Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 ml-1">Address Line 1</label>
                                            <input name="address_line1" type="text" className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary" placeholder="123 Street Name" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 ml-1">City</label>
                                            <input name="city" type="text" className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 ml-1">State / Province</label>
                                            <input name="state" type="text" className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 ml-1">Pincode / ZIP</label>
                                            <input name="pincode" type="text" className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 ml-1">Country</label>
                                            <input name="country" type="text" className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary" required />
                                        </div>
                                        <div className="md:col-span-2 flex items-center gap-2 mt-2">
                                            <input name="is_default" type="checkbox" className="rounded text-primary focus:ring-primary" />
                                            <span className="text-sm font-medium">Set as default address</span>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex justify-end">
                                        <button type="button" onClick={async (e) => {
                                            const form = e.target.closest('form');
                                            if (!form.reportValidity()) return;
                                            const isDefault = form.is_default.checked;
                                            const payload = {
                                                address_line1: form.address_line1.value,
                                                city: form.city.value,
                                                state: form.state.value,
                                                pincode: form.pincode.value,
                                                country: form.country.value,
                                                is_default: isDefault
                                            };
                                            try {
                                                const res = await profileService.addAddress(payload);
                                                const newAddr = res.data?.address;
                                                if (newAddr) {
                                                    if (isDefault) {
                                                        const updated = addresses.map(a => ({ ...a, is_default: false }));
                                                        setAddresses([newAddr, ...updated]);
                                                    } else {
                                                        setAddresses([...addresses, newAddr]);
                                                    }
                                                    setShowAddressForm(false);
                                                    setSelectedAddress(newAddr.id);
                                                    toast.success('Address saved successfully');
                                                }
                                            } catch (err) {
                                                toast.error(err.response?.data?.message || 'Failed to save address');
                                            }
                                        }} className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-primary/90 transition-all">Save Address</button>
                                    </div>
                                </form>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {addresses.length === 0 && !showAddressForm && (
                                <div className="col-span-2 text-center py-8 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl">
                                    <span className="material-symbols-outlined text-4xl text-slate-300 mb-2 block">location_off</span>
                                    <p className="text-slate-500 text-sm mb-3">No saved addresses found. Please add a shipping address to continue.</p>
                                    <button onClick={() => setShowAddressForm(true)} className="text-primary font-bold text-sm hover:underline">+ Add New Address</button>
                                </div>
                            )}
                                {addresses.map((addr) => (
                                    <div
                                        key={addr.id}
                                        onClick={() => setSelectedAddress(addr.id)}
                                        className={`relative group p-4 rounded-xl cursor-pointer transition-all ${selectedAddress === addr.id
                                                ? 'border-2 border-primary bg-primary/5'
                                                : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-primary/50'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span
                                                className={`text-xs font-bold uppercase tracking-wider ${selectedAddress === addr.id ? 'text-primary' : 'text-slate-400'
                                                    }`}
                                            >
                                                {addr.is_default || addr.isDefault || addr.label === 'Default' ? 'Default' : 'Other'}
                                            </span>
                                            <span className="material-symbols-outlined text-primary">
                                                {selectedAddress === addr.id ? 'check_circle' : ''}
                                            </span>
                                            {selectedAddress !== addr.id && (
                                                <span className="material-symbols-outlined text-slate-200 dark:text-slate-700">
                                                    radio_button_unchecked
                                                </span>
                                            )}
                                        </div>
                                        <p className="font-bold text-slate-900 dark:text-slate-100">{addr.full_name || addr.name || addr.address_line1?.split(',')?.[0] || 'Saved Address'}</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                            {addr.address_line1 || addr.line1 || addr.address}
                                            <br />
                                            {(addr.state || addr.pincode) ? `${addr.city}, ${addr.state} ${addr.pincode}` : (addr.line2 || addr.city)}
                                        </p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 font-medium">
                                            {addr.phone}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <hr className="border-slate-200 dark:border-slate-800" />

                        {/* Section 2: Delivery Method */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="size-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                                    2
                                </span>
                                <h2 className="text-xl font-bold">Delivery Method</h2>
                            </div>
                            <div className="space-y-3">
                                {DELIVERY_METHODS.map((method) => (
                                    <label
                                        key={method.id}
                                        className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-colors ${selectedDelivery === method.id
                                                ? 'border-2 border-primary bg-primary/5'
                                                : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <input
                                                className="size-5 text-primary focus:ring-primary border-slate-300"
                                                name="delivery"
                                                type="radio"
                                                checked={selectedDelivery === method.id}
                                                onChange={() => setSelectedDelivery(method.id)}
                                            />
                                            <div>
                                                <p className="font-bold">{method.name}</p>
                                                <p className="text-sm text-slate-500">{method.desc}</p>
                                            </div>
                                        </div>
                                        <span className="font-bold">{method.price}</span>
                                    </label>
                                ))}
                            </div>
                        </section>

                        <hr className="border-slate-200 dark:border-slate-800" />

                        {/* Section 3: Payment Method */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="size-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                                    3
                                </span>
                                <h2 className="text-xl font-bold">Payment Method</h2>
                            </div>
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                                {/* Payment Tabs */}
                                <div className="flex border-b border-slate-200 dark:border-slate-800">
                                    {PAYMENT_TABS.map((tab, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActivePaymentTab(index)}
                                            className={`flex-1 py-4 flex items-center justify-center gap-2 transition-colors ${activePaymentTab === index
                                                    ? 'border-b-2 border-primary text-primary font-bold bg-primary/5'
                                                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
                                                }`}
                                        >
                                            <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                                {/* Card Form */}
                                <div className="p-6 space-y-4">
                                    <div className="grid grid-cols-1 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 ml-1">
                                                Cardholder Name
                                            </label>
                                            <input
                                                className="w-full bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary"
                                                placeholder="Jane Doe"
                                                type="text"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 ml-1">
                                                Card Number
                                            </label>
                                            <div className="relative">
                                                <input
                                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary pl-4 pr-12"
                                                    placeholder="0000 0000 0000 0000"
                                                    type="text"
                                                />
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                                                    <div className="w-8 h-5 bg-slate-200 dark:bg-slate-700 rounded-sm" />
                                                    <div className="w-8 h-5 bg-slate-200 dark:bg-slate-700 rounded-sm" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 ml-1">
                                                Expiry Date
                                            </label>
                                            <input
                                                className="w-full bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary"
                                                placeholder="MM / YY"
                                                type="text"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 ml-1">
                                                CVV
                                            </label>
                                            <div className="relative">
                                                <input
                                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary"
                                                    placeholder="•••"
                                                    type="password"
                                                />
                                                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg cursor-help">
                                                    help
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 pt-2">
                                        <input
                                            className="rounded text-primary focus:ring-primary"
                                            type="checkbox"
                                            checked={saveCard}
                                            onChange={(e) => setSaveCard(e.target.checked)}
                                        />
                                        <span className="text-sm text-slate-600 dark:text-slate-400">
                                            Securely save card for future purchases
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* Trust Indicators */}
                            <div className="mt-6 flex flex-wrap items-center gap-6 justify-center md:justify-start grayscale opacity-60">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">lock</span>
                                    <span className="text-xs font-bold uppercase">SSL Secured</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">verified_user</span>
                                    <span className="text-xs font-bold uppercase">Buyer Protection</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">published_with_changes</span>
                                    <span className="text-xs font-bold uppercase">30-Day Returns</span>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Order Summary */}
                    <aside className="lg:col-span-4 sticky top-24">
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                            {/* Item List */}
                            <div className="space-y-4 mb-8">
                                {items.map((item, index) => (
                                    <div key={item.id || index} className="flex gap-4">
                                        <div className="size-20 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0">
                                            <img className="w-full h-full object-cover" alt={item.SavedDesign?.model?.name || 'Product'} src={item.SavedDesign?.model?.base_image || item.SavedDesign?.image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800'} />
                                        </div>
                                        <div className="flex flex-col justify-between py-1">
                                            <div>
                                                <h4 className="font-bold text-sm line-clamp-1">{item.SavedDesign?.model?.name || 'Custom Furniture Piece'}</h4>
                                                <p className="text-xs text-slate-500 line-clamp-1">
                                                    {item.SavedDesign?.material?.name} • {item.SavedDesign?.color?.name}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-between gap-8 mt-2">
                                                <p className="text-xs font-medium">Qty: {item.quantity}</p>
                                                <p className="font-bold text-sm">
                                                    ${parseFloat(item.SavedDesign?.calculated_price || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Promo Code */}
                            <div className="mb-8">
                                <div className="flex gap-2">
                                    <input
                                        className="flex-1 text-sm bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary"
                                        placeholder="Promo code"
                                        type="text"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        disabled={!!appliedCoupon}
                                    />
                                    <button 
                                        onClick={handleApplyCoupon}
                                        disabled={!!appliedCoupon || !couponCode.trim()}
                                        className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {appliedCoupon ? 'Applied' : 'Apply'}
                                    </button>
                                </div>
                            </div>
                            {/* Pricing Breakdown */}
                            <div className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-6">
                                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                                    <span>Shipping</span>
                                    <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</span>
                                </div>
                                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                                    <span>Estimated Tax</span>
                                    <span>${tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-sm text-green-600 dark:text-green-500 font-medium">
                                        <span>Discount ({appliedCoupon?.code || 'Promo'})</span>
                                        <span>-${discount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-xl font-black pt-4 text-slate-900 dark:text-slate-100 border-t border-slate-100 dark:border-slate-800">
                                    <span>Total</span>
                                    <span>${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                            </div>
                            {/* CTA Button */}
                            <button 
                                onClick={handleCompletePurchase}
                                disabled={isSubmitting || items.length === 0}
                                className="w-full mt-8 py-4 bg-primary text-white font-black text-lg rounded-xl shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting && <span className="material-symbols-outlined animate-spin hidden">progress_activity</span>}
                                <span>{isSubmitting ? 'Processing...' : 'Complete Purchase'}</span>
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                            <p className="text-center text-[11px] text-slate-400 mt-4 leading-relaxed">
                                By clicking &quot;Complete Purchase&quot;, you agree to our{' '}
                                <a className="underline" href="#">
                                    Terms of Service
                                </a>{' '}
                                and{' '}
                                <a className="underline" href="#">
                                    Privacy Policy
                                </a>
                                .
                            </p>
                        </div>
                        {/* Help Section */}
                        <div className="mt-6 p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 flex items-center gap-4">
                            <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined">support_agent</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold">Need help?</p>
                                <p className="text-xs text-slate-500">Chat with a furniture specialist</p>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            {/* Footer */}
            {/* Removed hardcoded footer to use MainLayout */}
        </div>
    );
};

export default Checkout;
