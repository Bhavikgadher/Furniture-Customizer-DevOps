import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Book a Master Session Page
 *
 * Three-step booking flow:
 * 1. Select your Expert — 3 expert cards with avatar, name, title, rating, reviews
 * 2. Schedule Session — Calendar (7-col grid), time slot selector, timezone info
 * 3. Session Brief — Goal input + description textarea
 * - Checkout bar: dark bg, selected expert + date, price $120.00, Confirm Booking CTA
 * - Success modal (toggled): green checkmark, "Booking Confirmed!", calendar/done buttons
 * - Footer with DesignMaster branding
 *
 * Route: /booking
 */

const EXPERTS = [
    {
        id: 1,
        name: 'Alex Rivera',
        role: 'Senior UX Lead at TechCo',
        rating: '4.9',
        reviews: '128',
        avatar:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCmlg5Z_T0iLdHOTOphyeY_j1-xPYJSfP93tvPd2o77qavQnK9tzUudFwyzJBMTpgRSsZlS6IEzc2Md004Fz3g8EIOuKjYGA4s-bAN6s-j9RxEnZCqCvszXIrbfngsM74lA1NsiuHz0J1F0AmT-AbvZ9XEKYO5Cq14cf9-F81Ku4FwUOBZk5MvWckGOs2wUpprBvzn_Qa43SaoRg_ZXII8AvcVgR0g2SLlqEPFnpHZaZbRu4HjqNJoqiCm-Bu-_oy0HhZ-ZcRuVKAkC',
        checkoutAvatar:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAl3VF7bnCkDYnLexRgi3KoTCSP6VqRLgsYwhCT9l7I5gSpHORiWGKGMJt3tqpVSIyemxKFeDtU8Hyq6f9rOy15JD6ykqMeA07ugqpUTS9MBGG8o0_sIQ5jUYuS3LKbFryJDSsxitd_rSDWVpvrQdAHE_EI6Xt4m2xiHfmfx9-FMiFA1kuD4GRoeNpL4AQXEUhzGZMiJV4CwEBFvZK8eumCR_kM_NXEFmYXkrpLK5xpr051caJ17fCiGwQKh6NClUuu4lRuDAiF8hCA',
    },
    {
        id: 2,
        name: 'Sam Chen',
        role: 'Product Design Director',
        rating: '5.0',
        reviews: '84',
        avatar:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBtOZlWRASGsohtvmFcFZXwNp2dN29zVCHLIrPQ-fULQuVSIMOicUWZBAXmFDKvTGxcf8UtuXXL3K0XR9pQSeLCS2UlBQfEft3phvZCtiOIeErp-6IihbauiohudJz0Nmnh6lgxQzxTkTm7lfprK7-zBxzZ1HGGgSeZ9X1G9gxiKrOM7oxh3enjvijfFhytTymhc0beQtvqUv0MC-YORiWit2AHn6NrT689nyM9T_g7joUGem-sOmxYzCVLs4ds0UBrFYnqFifh6vuN',
    },
    {
        id: 3,
        name: 'Jordan Smyth',
        role: 'Lead Visual Architect',
        rating: '4.8',
        reviews: '210',
        avatar:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDcsPdkG9nN6XFYe18xbKIquWBvtDxA3M2cG_d55AvFyDNEnNyntVQzC3juMdqoWCaCxkiv7HSTQCUppnFJgejjZfYETNndxGPSS6Wz7eC5w9HMpzyrn_bhNcrbPrQGZrAGo6lxqC5gXmUcXBEZCWW-gLffb147t0udqWww48fNGqRrykke-ddAdUPA48vlP05ACalpB1oD0QUVpub3LNInKcM9h2SdQ7j6Q1O7RC5Tv6ugOucpeB7OSoqjWLCjwAUVet_QMU_E5xxB',
    },
];

const TIME_SLOTS = [
    { time: '09:00 AM', disabled: false },
    { time: '10:30 AM', disabled: false },
    { time: '01:00 PM', disabled: false },
    { time: '02:30 PM', disabled: false },
    { time: '04:00 PM', disabled: false },
    { time: '05:30 PM', disabled: true },
];

const CALENDAR_DATES = [
    { day: 29, faded: true },
    { day: 30, faded: true },
    ...Array.from({ length: 20 }, (_, i) => ({ day: i + 1, faded: false })),
];

const Booking = () => {
    const [selectedExpert, setSelectedExpert] = useState(1);
    const [selectedDate, setSelectedDate] = useState(11);
    const [selectedTime, setSelectedTime] = useState('01:00 PM');
    const [showModal, setShowModal] = useState(false);

    const expert = EXPERTS.find((e) => e.id === selectedExpert);

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
            <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    {/* Top Navigation Bar */}
                    {/* Removed hardcoded header to use MainLayout */}

                    <main className="flex-1 flex flex-col items-center py-10 px-4 md:px-10 lg:px-20">
                        <div className="max-w-6xl w-full">
                            {/* Page Intro */}
                            <div className="mb-10 text-center md:text-left">
                                <h1 className="text-slate-900 dark:text-slate-100 text-4xl font-black leading-tight tracking-tight mb-2">
                                    Book a Master Session
                                </h1>
                                <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">
                                    Get one-on-one guidance from industry leaders to solve your toughest design
                                    challenges and accelerate your growth.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                {/* Left Column: Expert Selection */}
                                <div className="lg:col-span-4 flex flex-col gap-6">
                                    <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold flex items-center gap-2">
                                        <span className="bg-primary text-white text-xs rounded-full size-6 flex items-center justify-center">
                                            1
                                        </span>
                                        Select your Expert
                                    </h2>
                                    <div className="flex flex-col gap-4">
                                        {EXPERTS.map((exp) => (
                                            <div
                                                key={exp.id}
                                                onClick={() => setSelectedExpert(exp.id)}
                                                className={`bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm flex items-center gap-4 cursor-pointer transition-all ${selectedExpert === exp.id
                                                        ? 'border-2 border-primary'
                                                        : 'border border-slate-200 dark:border-slate-800 hover:border-primary/50'
                                                    }`}
                                            >
                                                <div
                                                    className="size-16 rounded-lg bg-cover bg-center shrink-0"
                                                    style={{ backgroundImage: `url("${exp.avatar}")` }}
                                                />
                                                <div className="flex-1 overflow-hidden">
                                                    <h3 className="font-bold text-slate-900 dark:text-slate-100 truncate">
                                                        {exp.name}
                                                    </h3>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                                        {exp.role}
                                                    </p>
                                                    <div className="flex items-center gap-1 mt-1">
                                                        <span className="material-symbols-outlined text-primary text-sm">
                                                            star
                                                        </span>
                                                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                                            {exp.rating}
                                                        </span>
                                                        <span className="text-[10px] text-slate-400">
                                                            ({exp.reviews} reviews)
                                                        </span>
                                                    </div>
                                                </div>
                                                {selectedExpert === exp.id && (
                                                    <span className="material-symbols-outlined text-primary">
                                                        check_circle
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Rating Breakdown */}
                                    <div className="bg-primary/5 p-5 rounded-xl border border-primary/10">
                                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">
                                            Rating distribution
                                        </p>
                                        <div className="grid grid-cols-[20px_1fr_40px] items-center gap-y-2">
                                            <p className="text-xs font-medium">5</p>
                                            <div className="flex h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                                                <div className="rounded-full bg-primary" style={{ width: '90%' }} />
                                            </div>
                                            <p className="text-slate-500 text-[10px] text-right">90%</p>
                                            <p className="text-xs font-medium">4</p>
                                            <div className="flex h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                                                <div className="rounded-full bg-primary" style={{ width: '8%' }} />
                                            </div>
                                            <p className="text-slate-500 text-[10px] text-right">8%</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Scheduler */}
                                <div className="lg:col-span-8 flex flex-col gap-8">
                                    {/* Calendar & Time Selection */}
                                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden">
                                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                            <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold flex items-center gap-2">
                                                <span className="bg-primary text-white text-xs rounded-full size-6 flex items-center justify-center">
                                                    2
                                                </span>
                                                Schedule Session
                                            </h2>
                                            <div className="flex gap-4 items-center">
                                                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400">
                                                    <span className="material-symbols-outlined">chevron_left</span>
                                                </button>
                                                <span className="font-bold text-slate-700 dark:text-slate-300">
                                                    October 2024
                                                </span>
                                                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400">
                                                    <span className="material-symbols-outlined">chevron_right</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2">
                                            {/* Calendar View */}
                                            <div className="p-6 border-r border-slate-100 dark:border-slate-800">
                                                <div className="calendar-grid text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                                                    <div>Sun</div>
                                                    <div>Mon</div>
                                                    <div>Tue</div>
                                                    <div>Wed</div>
                                                    <div>Thu</div>
                                                    <div>Fri</div>
                                                    <div>Sat</div>
                                                </div>
                                                <div className="calendar-grid gap-y-2">
                                                    {CALENDAR_DATES.map((d, i) =>
                                                        d.faded ? (
                                                            <div
                                                                key={i}
                                                                className="aspect-square flex items-center justify-center text-slate-300"
                                                            >
                                                                {d.day}
                                                            </div>
                                                        ) : (
                                                            <button
                                                                key={i}
                                                                onClick={() => setSelectedDate(d.day)}
                                                                className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium ${selectedDate === d.day
                                                                        ? 'bg-primary text-white font-bold shadow-md ring-4 ring-primary/20'
                                                                        : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                                                                    }`}
                                                            >
                                                                {d.day}
                                                            </button>
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                            {/* Time Slots */}
                                            <div className="p-6 bg-slate-50/50 dark:bg-slate-800/20">
                                                <p className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-4">
                                                    Friday, Oct {selectedDate}
                                                </p>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {TIME_SLOTS.map((slot) => (
                                                        <button
                                                            key={slot.time}
                                                            onClick={() => !slot.disabled && setSelectedTime(slot.time)}
                                                            disabled={slot.disabled}
                                                            className={`py-3 px-4 rounded-lg text-sm transition-all ${slot.disabled
                                                                    ? 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-medium opacity-40 cursor-not-allowed'
                                                                    : selectedTime === slot.time
                                                                        ? 'border-2 border-primary bg-primary/10 text-primary font-bold shadow-sm'
                                                                        : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-medium hover:border-primary'
                                                                }`}
                                                        >
                                                            {slot.time}
                                                        </button>
                                                    ))}
                                                </div>
                                                <div className="mt-6 p-4 rounded-lg bg-primary/5 flex items-start gap-3">
                                                    <span className="material-symbols-outlined text-primary text-sm mt-0.5">
                                                        info
                                                    </span>
                                                    <p className="text-[11px] text-slate-500 leading-relaxed">
                                                        Times are shown in your local timezone (PST). Session duration: 60
                                                        minutes.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Consultation Brief Form */}
                                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg p-6">
                                        <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold flex items-center gap-2 mb-6">
                                            <span className="bg-primary text-white text-xs rounded-full size-6 flex items-center justify-center">
                                                3
                                            </span>
                                            Session Brief
                                        </h2>
                                        <div className="space-y-6">
                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                    What is your primary goal for this session?
                                                </label>
                                                <input
                                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                                                    placeholder="e.g. Portfolio review, Design system feedback..."
                                                    type="text"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                    Provide a brief description of your project or challenge
                                                </label>
                                                <textarea
                                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                                                    placeholder="Share any specific questions or areas you'd like to focus on..."
                                                    rows="4"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Checkout Action Bar */}
                                    <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-slate-900 rounded-xl shadow-xl gap-4">
                                        <div className="flex items-center gap-4">
                                            <div
                                                className="size-12 rounded-full bg-cover bg-center border-2 border-white/20"
                                                style={{
                                                    backgroundImage: `url("${expert?.checkoutAvatar || expert?.avatar}")`,
                                                }}
                                            />
                                            <div>
                                                <p className="text-white font-bold">
                                                    {expert?.name}{' '}
                                                    <span className="text-white/40 font-normal ml-2">
                                                        Oct {selectedDate} @ {selectedTime}
                                                    </span>
                                                </p>
                                                <p className="text-white/60 text-sm">60-minute UX Consultation</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6 w-full md:w-auto">
                                            <div className="text-right hidden md:block">
                                                <p className="text-white/60 text-xs uppercase tracking-widest font-bold">
                                                    Total
                                                </p>
                                                <p className="text-white text-2xl font-black">$120.00</p>
                                            </div>
                                            <button
                                                onClick={() => setShowModal(true)}
                                                className="flex-1 md:flex-none px-10 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                                            >
                                                Confirm Booking
                                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* Footer */}
                    {/* Removed hardcoded footer to use MainLayout */}
                </div>
            </div>

            {/* Success Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 max-w-md w-full rounded-2xl p-8 shadow-2xl text-center">
                        <div className="size-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-4xl">
                                check_circle
                            </span>
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-2">
                            Booking Confirmed!
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-8">
                            You&apos;re all set to meet with{' '}
                            <span className="font-bold text-slate-700 dark:text-slate-300">{expert?.name}</span>{' '}
                            on{' '}
                            <span className="font-bold text-slate-700 dark:text-slate-300">
                                Oct {selectedDate}th
                            </span>
                            . A calendar invite has been sent to your email.
                        </p>
                        <div className="flex flex-col gap-3">
                            <button className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all">
                                Add to Google Calendar
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Booking;
