import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { profileService } from '../../services/profile.service';
import toast from 'react-hot-toast';

/**
 * My Addresses Page
 *
 * Address management view with:
 * - Sticky navbar with chair logo, nav links (Account active with underline),
 *   search input, cart, person avatar
 * - Breadcrumbs: Home > Account > Saved Addresses
 * - Header: "My Addresses" (4xl font-black), description, Add New Address CTA
 * - Address grid (3 cols on xl):
 *   1) Default card: primary border-2, "Default" ribbon, home icon, Active badge
 *   2) Office card: standard border, work icon, "Set as default" toggle
 *   3) Summer Retreat: standard border, beach_access icon, toggle
 *   4) Add placeholder: dashed border, + icon, hover effects
 * - Security notification banner (verified_user icon, Privacy Policy link)
 * - Add New Address modal (toggled via state)
 * - Footer
 *
 * Route: /addresses
 */

const ADDRESSES = [
    {
        id: 1,
        icon: 'home',
        name: 'Johnathan Doe',
        line1: '123 Luxury Suite, Design District',
        line2: 'Metropolis, NY 10001',
        country: 'United States',
        phone: '+1 (234) 567-8901',
        isDefault: true,
    },
    {
        id: 2,
        icon: 'work',
        name: 'Johnathan Doe (Office)',
        line1: '550 Innovation Tower, 12th Floor',
        line2: 'Tech Park, NY 10022',
        country: 'United States',
        phone: '+1 (234) 567-0044',
        isDefault: false,
    },
    {
        id: 3,
        icon: 'beach_access',
        name: 'Summer Retreat',
        line1: '88 Ocean View Drive',
        line2: 'Hampton Bays, NY 11946',
        country: 'United States',
        phone: '+1 (234) 567-9911',
        isDefault: false,
    },
];

const Addresses = () => {
    const [showModal, setShowModal] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAddresses = async () => {
        try {
            const res = await profileService.getAddresses();
            if (res.data?.addresses) {
                setAddresses(res.data.addresses);
            }
        } catch (error) {
            console.error('Error fetching addresses:', error);
            toast.error('Failed to load your addresses');
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const handleAddAddress = async (e) => {
        e.preventDefault();
        const form = e.target;
        const isDefault = form.is_default.checked;
        const newAddress = {
            address_type: form.address_type?.value || 'Home',
            address_line1: form.address_line1.value,
            address_line2: '',
            city: form.city.value,
            state: form.state.value,
            country: form.country.value,
            postal_code: form.pincode.value,
            phone_number: form.phone.value,
            is_default: isDefault
        };

        setIsLoading(true);
        try {
            const res = await profileService.addAddress(newAddress);
            if (res.success) {
                toast.success('Address added successfully!');
                setShowModal(false);
                form.reset();
                await fetchAddresses();
            } else {
                toast.error(res.message || 'Failed to add address');
            }
        } catch (error) {
            console.error('Add address error:', error);
            toast.error(error.response?.data?.message || 'Server error adding address');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this address?')) return;
        try {
            await profileService.deleteAddress(id);
            toast.success('Address deleted successfully!');
            await fetchAddresses();
        } catch (error) {
            console.error('Delete address error:', error);
            toast.error('Failed to delete address');
        }
    };

    const toggleDefault = async (id) => {
        try {
            await profileService.setDefaultAddress(id);
            toast.success('Default address updated!');
            await fetchAddresses();
        } catch (error) {
            console.error('Set default address error:', error);
            toast.error('Failed to update default address');
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
                {/* Navigation */}
                {/* Removed hardcoded header to use MainLayout */}

                <main className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-20 py-10">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 mb-8">
                        <Link className="hover:text-primary" to="/">
                            Home
                        </Link>
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                        <Link className="hover:text-primary" to="/profile">
                            Account
                        </Link>
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                        <span className="text-slate-900 dark:text-white">Saved Addresses</span>
                    </nav>

                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                        <div className="max-w-2xl">
                            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
                                My Addresses
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400 text-lg">
                                Manage your shipping destinations for a seamless checkout experience. Set a default
                                address to save time on your next custom furniture order.
                            </p>
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all active:scale-95 whitespace-nowrap"
                        >
                            <span className="material-symbols-outlined">add_location_alt</span>
                            <span>Add New Address</span>
                        </button>
                    </div>

                    {/* Address Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {addresses.map((addr) =>
                            addr.is_default ? (
                                /* Default Address Card */
                                <div
                                    key={addr._id || addr.id}
                                    className="group bg-white dark:bg-slate-900 border-2 border-primary rounded-2xl p-6 shadow-xl shadow-primary/5 flex flex-col justify-between relative overflow-hidden transition-all hover:border-primary/60"
                                >
                                    <div className="absolute top-0 right-0">
                                        <div className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-xl">
                                            Default
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-primary">{addr.address_type?.toLowerCase() === 'work' ? 'work' : 'home'}</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white capitalize">
                                                {addr.address_type || 'Home'}
                                            </h3>
                                        </div>
                                        <div className="space-y-1 text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                            <p className="font-medium">{addr.address_line1}</p>
                                            <p>{addr.city}, {addr.state} {addr.postal_code}</p>
                                            <p>{addr.country}</p>
                                            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                                <span className="material-symbols-outlined text-sm text-slate-400">
                                                    call
                                                </span>
                                                <span className="text-sm font-medium">{addr.phone_number}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center gap-4">
                                            <button onClick={() => handleDelete(addr._id || addr.id)} className="text-sm font-semibold text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1">
                                                <span className="material-symbols-outlined text-sm">delete</span> Delete
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-primary uppercase">Active</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                /* Standard Address Card */
                                <div
                                    key={addr._id || addr.id}
                                    className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-slate-500">
                                                    {addr.address_type?.toLowerCase() === 'work' ? 'work' : 'location_on'}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white capitalize">
                                                {addr.address_type || 'Other'}
                                            </h3>
                                        </div>
                                        <div className="space-y-1 text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                            <p className="font-medium">{addr.address_line1}</p>
                                            <p>{addr.city}, {addr.state} {addr.postal_code}</p>
                                            <p>{addr.country}</p>
                                            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                                <span className="material-symbols-outlined text-sm text-slate-400">
                                                    call
                                                </span>
                                                <span className="text-sm font-medium">{addr.phone_number}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center gap-4">
                                            <button onClick={() => handleDelete(addr._id || addr.id)} className="text-sm font-semibold text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1">
                                                <span className="material-symbols-outlined text-sm">delete</span> Delete
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">
                                                Set as default
                                            </span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input className="sr-only peer" type="checkbox" onChange={() => toggleDefault(addr._id || addr.id)} checked={addr.is_default} />
                                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary" />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}

                        {/* Empty State / Add Placeholder */}
                        <button
                            onClick={() => setShowModal(true)}
                            className="group border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-primary/40 hover:bg-primary/5 transition-all min-h-[300px]"
                        >
                            <div className="size-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-3xl">add</span>
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-bold text-slate-900 dark:text-white">
                                    Add another address
                                </p>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">
                                    Shipping for a gift or a new home?
                                </p>
                            </div>
                        </button>
                    </div>

                    {/* Notification Area */}
                    <div className="mt-16 bg-primary/5 rounded-2xl p-8 border border-primary/10 flex flex-col md:flex-row items-center gap-6">
                        <div className="size-16 shrink-0 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-3xl">verified_user</span>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                                Your data is secure
                            </h4>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                FurniCustom uses industry-standard encryption to protect your personal information.
                                Your saved addresses are only used for order processing and will never be shared with
                                third-party marketers.
                            </p>
                        </div>
                        <a
                            className="md:ml-auto text-primary font-bold hover:underline whitespace-nowrap"
                            href="#"
                        >
                            Privacy Policy
                        </a>
                    </div>
                </main>

                {/* Footer */}
                {/* Removed hardcoded footer to use MainLayout */}
            </div>

            {/* Modal Overlay */}
            {showModal && (
                <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden">
                        <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                Add New Address
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="material-symbols-outlined text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                            >
                                close
                            </button>
                        </div>
                        <form
                            className="p-8 space-y-4"
                            onSubmit={handleAddAddress}
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                                        Address Type (e.g. Home, Work)
                                    </label>
                                    <input
                                        name="address_type"
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary py-3"
                                        placeholder="Home"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                                        Street Address
                                    </label>
                                    <input
                                        name="address_line1"
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary py-3"
                                        placeholder="123 Main St"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                                        City
                                    </label>
                                    <input
                                        name="city"
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary py-3"
                                        placeholder="New York"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                                        State / Province
                                    </label>
                                    <input
                                        name="state"
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary py-3"
                                        placeholder="NY"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                                        ZIP Code
                                    </label>
                                    <input
                                        name="pincode"
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary py-3"
                                        placeholder="10001"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                                        Country
                                    </label>
                                    <input
                                        name="country"
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary py-3"
                                        placeholder="United States"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        name="phone"
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary py-3"
                                        placeholder="+1 (555) 000-0000"
                                        type="tel"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-3 pt-4">
                                <input
                                    name="is_default"
                                    className="rounded text-primary focus:ring-primary"
                                    id="modal-default"
                                    type="checkbox"
                                />
                                <label
                                    className="text-sm font-medium text-slate-600 dark:text-slate-400"
                                    htmlFor="modal-default"
                                >
                                    Set as default shipping address
                                </label>
                            </div>
                            <div className="flex items-center gap-4 pt-6">
                                <button
                                    className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className={`flex-1 ${isLoading ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'} text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/25 transition-all`}
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Saving...' : 'Save Address'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Addresses;
