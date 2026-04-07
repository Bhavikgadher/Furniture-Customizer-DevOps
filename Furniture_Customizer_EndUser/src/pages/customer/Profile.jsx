import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { profileService } from '../../services/profile.service';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const ACTIVITIES = [
    {
        icon: 'favorite',
        color: 'bg-primary',
        title: 'Design Saved',
        detail: '"Oak & Steel Lounge Chair"',
        time: '2h ago',
    },
    {
        icon: 'package_2',
        color: 'bg-green-500',
        title: 'Order #3490 Delivered',
        detail: 'Confirmed at 10:45 AM',
        time: '1d ago',
    },
    {
        icon: 'edit',
        color: 'bg-slate-200 dark:bg-slate-700',
        textColor: 'text-slate-500',
        title: 'Profile Updated',
        detail: 'Changed contact phone',
        time: '3d ago',
    },
];

const Profile = () => {
    const { updateUserCtx } = useAuth();
    const navigate = useNavigate();

    // Setup Local Storage bindings
    const [orderUpdates, setOrderUpdates] = useState(() => localStorage.getItem('orderUpdates') === 'true');
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const [personalInfo, setPersonalInfo] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: 'Fetching primary address...'
    });

    const profileSectionRef = useRef(null);
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const res = await profileService.getProfile();
                if (res?.data?.user) {
                    const usr = res.data.user;
                    setPersonalInfo(prev => ({
                        ...prev,
                        fullName: usr.full_name || '',
                        email: usr.email || '',
                        phone: usr.phone || ''
                    }));
                }
                
                // try to fetch address
                const addrRes = await profileService.getAddresses();
                if (addrRes?.data?.addresses) {
                    const addresses = addrRes.data.addresses;
                    const defaultAddress = addresses.find(a => a.is_default) || addresses[0];
                    if (defaultAddress) {
                        setPersonalInfo(prev => ({
                            ...prev,
                            address: `${defaultAddress.address_line1}, ${defaultAddress.city}`
                        }));
                    } else {
                        setPersonalInfo(prev => ({ ...prev, address: 'No address set' }));
                    }
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                toast.error('Could not load profile data');
            }
        };

        fetchProfileData();
    }, []);

    const handleToggleOrderUpdates = () => {
        const newVal = !orderUpdates;
        setOrderUpdates(newVal);
        localStorage.setItem('orderUpdates', String(newVal));
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const res = await profileService.updateProfile({
                full_name: personalInfo.fullName,
                phone: personalInfo.phone
            });
            if (res.success) {
                setIsEditing(false);
                toast.success('Profile changes saved successfully!');
                
                // Update local Context
                if (res.data?.user) {
                   updateUserCtx(res.data.user);
                }
            } else {
                toast.error(res.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error(error.response?.data?.message || 'Server error saving profile.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen pb-16 pt-8">
            <main className="w-full max-w-5xl mx-auto px-8 flex flex-col space-y-8" ref={profileSectionRef}>
                        {/* Profile Header Card */}
                        <section className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center md:items-start gap-8 shadow-sm">
                            <div className="relative group">
                                <div
                                    className="size-32 rounded-full overflow-hidden border-4 border-slate-50 dark:border-slate-800 shadow-xl bg-slate-200 bg-cover bg-center"
                                    style={{
                                        backgroundImage:
                                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDvvr0LKOAuKogYOCglGobjfj5xgecRyZ3245pmfiFkanH4jDmXX3UmzNyvLSEcNNc7rKEqBAmyhJ2RTJhNL-xFsu1en_duqolaI9svg9ofikk02xFtesdf5mlTIROCPAeUfoUIiz-qlkXYDhEWV_-ebgonIasqdKYENz1qBTqlsiVZMtU1aN6etz9J9xr-yI2mz76LGdKeBQ9C-bUeM2U7j6iRtr-13QNlydTj7EcCE1ofImLFp0Y5ra-EbdiMM-xiNwwMFstd21kj')",
                                    }}
                                />
                                <label className="absolute inset-0 bg-black/40 text-white flex flex-col items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <span className="material-symbols-outlined">photo_camera</span>
                                    <span className="text-[10px] font-bold uppercase mt-1">Change</span>
                                    <input className="hidden" type="file" />
                                </label>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                            {personalInfo.fullName}
                                        </h3>
                                        <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                                            <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                Premium Member
                                            </span>
                                            <span className="text-slate-400 text-sm">• Joined October 2023</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 justify-center">
                                        {isEditing ? (
                                            <button onClick={handleSave} disabled={isLoading} className={`px-6 py-2 ${isLoading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'} text-white rounded-lg text-sm font-bold transition-all shadow-md flex items-center gap-2`}>
                                                <span className="material-symbols-outlined text-sm">save</span> {isLoading ? 'Saving...' : 'Save'}
                                            </button>
                                        ) : (
                                            <button onClick={() => setIsEditing(true)} className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-primary/20 flex items-center gap-2">
                                                <span className="material-symbols-outlined text-sm">edit</span> Edit Details
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Personal Information Grid */}
                            <div className="lg:col-span-2 space-y-6">
                                <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                        <h4 className="font-bold">Personal Information</h4>
                                        <button onClick={() => setIsEditing(!isEditing)} className="text-primary text-sm font-medium hover:underline">
                                            {isEditing ? 'Cancel Edit' : 'Edit All'}
                                        </button>
                                    </div>
                                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                        <div className="px-6 py-5 flex items-center justify-between focus-within:bg-slate-50/50 dark:focus-within:bg-slate-800/30 transition-colors group">
                                            <div className="flex flex-col gap-1 w-full">
                                                <p className="text-xs text-slate-400 font-medium flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">badge</span> Full Name</p>
                                                {isEditing ? (
                                                    <input type="text" value={personalInfo.fullName} onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-sm font-semibold outline-none focus:border-primary transition-all" />
                                                ) : <p className="text-sm font-semibold py-2 px-3">{personalInfo.fullName}</p>}
                                            </div>
                                        </div>
                                        <div className="px-6 py-5 flex items-center justify-between focus-within:bg-slate-50/50 dark:focus-within:bg-slate-800/30 transition-colors group">
                                            <div className="flex flex-col gap-1 w-full">
                                                <p className="text-xs text-slate-400 font-medium flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">mail</span> Email Address</p>
                                                {isEditing ? (
                                                    <input type="email" value={personalInfo.email} onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-sm font-semibold outline-none focus:border-primary transition-all" />
                                                ) : <p className="text-sm font-semibold py-2 px-3">{personalInfo.email}</p>}
                                            </div>
                                        </div>
                                        <div className="px-6 py-5 flex items-center justify-between focus-within:bg-slate-50/50 dark:focus-within:bg-slate-800/30 transition-colors group">
                                            <div className="flex flex-col gap-1 w-full">
                                                <p className="text-xs text-slate-400 font-medium flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">call</span> Phone Number</p>
                                                {isEditing ? (
                                                    <input type="tel" value={personalInfo.phone} onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-sm font-semibold outline-none focus:border-primary transition-all" />
                                                ) : <p className="text-sm font-semibold py-2 px-3">{personalInfo.phone}</p>}
                                            </div>
                                        </div>
                                        <div className="px-6 py-5 flex items-center justify-between focus-within:bg-slate-50/50 dark:focus-within:bg-slate-800/30 transition-colors group">
                                            <div className="flex flex-col gap-1 w-full">
                                                <p className="text-xs text-slate-400 font-medium flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">location_on</span> Primary Address</p>
                                                {isEditing ? (
                                                    <input type="text" value={personalInfo.address} onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-sm font-semibold outline-none focus:border-primary transition-all" />
                                                ) : <p className="text-sm font-semibold py-2 px-3">{personalInfo.address}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Notification Preference */}
                                <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex items-center justify-between shadow-sm">
                                    <div className="flex gap-4">
                                        <div className="size-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">
                                            <span className="material-symbols-outlined">local_shipping</span>
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-sm">Order Status Updates</h5>
                                            <p className="text-xs text-slate-500">
                                                Receive SMS alerts for shipping and delivery progress.
                                            </p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={orderUpdates}
                                            onChange={handleToggleOrderUpdates}
                                        />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                                    </label>
                                </section>

                                {/* Change Password Navigation */}
                                <section 
                                    onClick={() => navigate('/change-password')}
                                    className="mt-6 flex items-center justify-between bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm cursor-pointer hover:border-primary/50 transition-colors"
                                >
                                    <div className="flex gap-4 items-center">
                                        <div className="size-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
                                            <span className="material-symbols-outlined text-lg">lock_reset</span>
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-sm">Change Password</h5>
                                            <p className="text-xs text-slate-500">
                                                Update account credentials and security
                                            </p>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                                </section>
                            </div>

                            {/* Recent Activity Column */}
                            <div className="space-y-6">
                                <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                                        <h4 className="font-bold">Recent Activity</h4>
                                    </div>
                                    <div className="p-6">
                                        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-slate-200 before:to-transparent">
                                            {ACTIVITIES.map((activity, index) => (
                                                <div
                                                    key={index}
                                                    className="relative flex items-center justify-between group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 p-3 -mx-3 rounded-xl transition-colors"
                                                    onClick={() => alert(`Activity selected: ${activity.title}`)}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div
                                                            className={`size-10 rounded-full ${activity.color} flex items-center justify-center ${activity.textColor || 'text-white'
                                                                } ring-4 ring-white dark:ring-slate-900 z-10 transition-transform group-hover:scale-110`}
                                                        >
                                                            <span className="material-symbols-outlined text-base">
                                                                {activity.icon}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">
                                                                {activity.title}
                                                            </p>
                                                            <p className="text-[10px] text-slate-500 mt-1">{activity.detail}</p>
                                                        </div>
                                                    </div>
                                                    <span className="text-[10px] text-slate-400 font-medium">
                                                        {activity.time}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        <button className="w-full mt-8 py-2 text-xs font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-widest border border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
                                            View All History
                                        </button>
                                    </div>
                                </section>

                                {/* Summary Card */}
                                <div className="bg-gradient-to-br from-primary to-blue-800 rounded-xl p-6 text-white shadow-lg shadow-primary/20 hover-lift cursor-default">
                                    <h5 className="text-xs font-bold uppercase tracking-widest opacity-80">
                                        Furniture Credits
                                    </h5>
                                    <div className="flex items-end gap-2 mt-2">
                                        <span className="text-3xl font-black">$450.00</span>
                                        <span className="text-xs font-medium mb-1 opacity-80">Available</span>
                                    </div>
                                    <p className="text-xs mt-4 leading-relaxed opacity-90">
                                        Refer a friend and earn $50 for your next custom piece.
                                    </p>
                                    <button className="w-full mt-6 py-2.5 bg-white text-primary rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">
                                        Refer Friends
                                    </button>
                                </div>
                            </div>
                        </div>

                    {/* Toast Notification */}
                    <div className={`fixed bottom-8 right-8 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 transition-all duration-300 z-50 ${toastMessage ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-24 opacity-0 pointer-events-none'}`}>
                        <div className="bg-green-500 size-6 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-sm">check</span>
                        </div>
                        <p className="text-sm font-bold">{toastMessage}</p>
                    </div>
                </main>
        </div>
    );
};

export default Profile;
