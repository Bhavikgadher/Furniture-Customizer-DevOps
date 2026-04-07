import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Support Tickets Page
 *
 * Ticket dashboard with split-panel layout:
 * - Sticky navbar: support_agent logo (primary/10 bg), Dashboard / Tickets (active) / Knowledge Base,
 *   search input, notification bell (red dot), user avatar
 * - Breadcrumbs: Home > Tickets, "Create New Ticket" CTA
 * - Quick Stats: Total Tickets (24), Active Requests (05), Resolved Cases (19)
 * - Left Panel (4 cols): Ticket list with All/Open/Resolved tabs, filter input,
 *   4 ticket cards with status badges (In Progress, Open, Resolved)
 * - Right Panel (8 cols): Conversation detail with header, chat messages
 *   (user messages right-aligned primary bg, agent messages left with avatar),
 *   message input with attach/emoji/image buttons + Send Message
 * - New Ticket Modal: category selection (Order/Product/Account), subject, description
 *
 * Route: /support
 */

const TICKETS = [
    {
        id: '#TK-8821',
        subject: 'Delayed Delivery of Order #4421',
        preview: 'Our carrier is reporting a delay in your area...',
        status: 'In Progress',
        statusColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-500',
        category: 'Shipping',
        time: '2m ago',
        active: true,
    },
    {
        id: '#TK-8790',
        subject: 'Account Login Issues (2FA)',
        preview: 'I am not receiving the SMS code for my account...',
        status: 'Open',
        statusColor: 'bg-primary/10 text-primary',
        category: 'Account',
        time: '3h ago',
        active: false,
    },
    {
        id: '#TK-8655',
        subject: 'Defective Item: Wireless Earbuds',
        preview: 'Thank you for the replacement, it arrived today!',
        status: 'Resolved',
        statusColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-500',
        category: 'Product',
        time: '2d ago',
        active: false,
    },
    {
        id: '#TK-8621',
        subject: 'Bulk Refund Request',
        preview: 'Requesting a refund for the office supplies...',
        status: 'Resolved',
        statusColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-500',
        category: 'Billing',
        time: '5d ago',
        active: false,
    },
];

const MESSAGES = [
    {
        type: 'user',
        text: 'Hi support team, my order #4421 was supposed to arrive two days ago but the tracking hasn\'t updated. Can you please look into this?',
        time: '09:12 AM · Sent',
    },
    {
        type: 'agent',
        name: 'Sarah (Support)',
        avatar:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAFx5mxgVEKIHSbOjU-sdkZsNOtE-CoU9T0vyq1bqMSgdAwoezS60wx9kmaDzIKi_2PId9WWqS-yL7l92htyy7rHrrTNU5JbOWftdEsY9uQM77eVuoioKfPbuNpreXjF-T7BkSmIPSPfvaov5HGEnGGYdA7NvaNlG6vF-DV19O8bzE7KOchWmFwIayWshhfXY4b_Y7Yd3afOjc1Jvda5LYc1-64-J19E9Kv5RaEgt5ToO18Y0rqBu1OHVrVrkqKiLdgK0gkz3Pd-6IL',
        paragraphs: [
            "Hello there! I'm Sarah from the fulfillment team. I'm sorry to hear about the delay. I've just contacted our regional hub.",
        ],
        italic:
            'Update: Our carrier is reporting a delay in your area due to local weather conditions. Your package is scheduled to arrive tomorrow.',
        time: '10:45 AM',
    },
    {
        type: 'user',
        text: 'That makes sense, thank you Sarah. Is it possible to change the delivery instructions to "Leave at the back porch"?',
        time: '11:05 AM · Read',
    },
    {
        type: 'agent',
        name: 'Sarah (Support)',
        avatar:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAph1MJ2FI0vt8skQxdmJwJOKk16R4fA7UgmVoVU-n0eeH83iySaGo69cLGs3UcbsAfN7p_NE6SarLYotamOBRciJ2mhwWutlnv-Q7CtVXkt9iivI59HSCS6x8m0tv_W4dQOiVsll0eNkcqMeRA_zjf54HV9jUjygYv4smFsp6CESxTzgrO_fnI8wmfXB0cGTWtH6-Ww54RzU_QEtAnCDDXHqC9De9dpnw7wcBGbVHAuODxY6O4l4FT9CKxMhEpQGMORuT_UrCNUVRq',
        paragraphs: [
            'Absolutely. I have updated the special instructions for the driver. You should receive a final confirmation email shortly!',
        ],
        italic: null,
        time: 'Just now',
    },
];

const CATEGORIES = [
    { icon: 'shopping_cart', label: 'Order', active: true },
    { icon: 'inventory_2', label: 'Product', active: false },
    { icon: 'manage_accounts', label: 'Account', active: false },
];

const Support = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Order');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [tickets, setTickets] = useState(TICKETS);
    const [filterType, setFilterType] = useState('All');
    const [localChatLog, setLocalChatLog] = useState({});

    const totalTickets = tickets.length;
    const activeRequests = tickets.filter(t => !['Resolved', 'Closed'].includes(t.status)).length;
    const resolvedCases = tickets.filter(t => ['Resolved', 'Closed'].includes(t.status)).length;

    const filteredTickets = tickets.filter(t => {
        if (filterType === 'All') return true;
        if (filterType === 'Open') return !['Resolved', 'Closed'].includes(t.status);
        if (filterType === 'Resolved') return ['Resolved', 'Closed'].includes(t.status);
        return true;
    });

    const activeTicket = tickets.find(t => t.active) || tickets[0] || null;

    const handleTicketSelect = (id) => {
        setTickets(tickets.map(t => ({ ...t, active: t.id === id })));
    };
    
    // Auto-open and pre-fill form if directed here from TrackOrder -> Report Damage
    const location = useLocation();
    useEffect(() => {
        if (location.state && location.state.productName) {
            setShowModal(true);
            setSelectedCategory(location.state.category || 'Product');
            setSubject(`Damage Report: ${location.state.productName}`);
            setDescription(`Order Reference: ${location.state.orderId}\n\nI am reporting damage for this item: `);
        }
    }, [location]);

    const handleCreateTicket = (e) => {
        e.preventDefault();
        const newTicket = {
            id: `#TK-${Math.floor(1000 + Math.random() * 9000)}`,
            subject: subject || 'General Inquiry',
            preview: description || 'No additional details provided.',
            status: 'Open',
            statusColor: 'bg-primary/10 text-primary',
            category: selectedCategory,
            time: 'Just now',
            active: true
        };
        // Reset old actives
        const updatedList = tickets.map((t) => ({ ...t, active: false }));
        setTickets([newTicket, ...updatedList]);
        setShowModal(false);
        setSubject('');
        setDescription('');
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
            <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
                {/* Top Navigation Bar */}
                {/* Removed hardcoded header to use MainLayout */}

                <main className="flex-1 px-4 lg:px-40 py-8">
                    {/* Breadcrumbs & Action */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                                <Link className="hover:text-primary transition-colors" to="/">
                                    Home
                                </Link>
                                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                                <span className="text-slate-900 dark:text-slate-200 font-medium">Tickets</span>
                            </nav>
                            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                Support Tickets
                            </h1>
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
                        >
                            <span className="material-symbols-outlined text-[20px]">add</span>
                            Create New Ticket
                        </button>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                            <div className="size-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-600">
                                <span className="material-symbols-outlined">confirmation_number</span>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Total Tickets</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none mt-1">
                                    {totalTickets < 10 ? `0${totalTickets}` : totalTickets}
                                </p>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                            <div className="size-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined">hourglass_empty</span>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Active Requests</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none mt-1">
                                    {activeRequests < 10 ? `0${activeRequests}` : activeRequests}
                                </p>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                            <div className="size-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-green-600">
                                <span className="material-symbols-outlined">check_circle</span>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Resolved Cases</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none mt-1">
                                    {resolvedCases < 10 ? `0${resolvedCases}` : resolvedCases}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Main Workspace Interface */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[700px]">
                        {/* Left Panel: Ticket List */}
                        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
                            <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                                <div className="flex gap-2 p-1 bg-slate-50 dark:bg-slate-800/50 rounded-lg mb-4">
                                    <button onClick={() => setFilterType('All')} className={`flex-1 text-xs font-bold py-1.5 rounded-md shadow-sm transition-colors ${filterType === 'All' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700'}`}>
                                        All
                                    </button>
                                    <button onClick={() => setFilterType('Open')} className={`flex-1 text-xs font-bold py-1.5 rounded-md shadow-sm transition-colors ${filterType === 'Open' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700'}`}>
                                        Open
                                    </button>
                                    <button onClick={() => setFilterType('Resolved')} className={`flex-1 text-xs font-bold py-1.5 rounded-md shadow-sm transition-colors ${filterType === 'Resolved' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700'}`}>
                                        Resolved
                                    </button>
                                </div>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                                        filter_list
                                    </span>
                                    <input
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm pl-9 py-2 focus:ring-1 focus:ring-primary/30"
                                        placeholder="Filter by ID or Subject"
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto custom-scrollbar">
                                {filteredTickets.map((ticket) => (
                                    <div
                                        key={ticket.id}
                                        onClick={() => handleTicketSelect(ticket.id)}
                                        className={`p-4 border-b border-slate-50 dark:border-slate-800 cursor-pointer transition-colors ${ticket.active
                                                ? 'bg-primary/5 border-l-4 border-l-primary hover:bg-primary/10'
                                                : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                {ticket.id}
                                            </span>
                                            <span
                                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${ticket.statusColor}`}
                                            >
                                                {ticket.status}
                                            </span>
                                        </div>
                                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1 truncate">
                                            {ticket.subject}
                                        </h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mb-2">
                                            {ticket.preview}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1.5">
                                                <span className="material-symbols-outlined text-[14px] text-slate-400">
                                                    category
                                                </span>
                                                <span className="text-[11px] text-slate-500">{ticket.category}</span>
                                            </div>
                                            <span className="text-[11px] text-slate-400">{ticket.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Panel: Conversation Detail */}
                        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden relative">
                            {/* Detail Header */}
                            {activeTicket ? (
                                <>
                                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 z-10">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                                    {activeTicket.subject}
                                                </h3>
                                                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500">
                                                    {activeTicket.id}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-500 mt-1">
                                                Status: <span className={`font-medium ${activeTicket.statusColor}`}>{activeTicket.status}</span> · Category:{' '}
                                                <span className="font-medium text-slate-700 dark:text-slate-300">{activeTicket.category}</span>
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {activeTicket.status === 'Open' && (
                                                <button onClick={() => {
                                                    setTickets(tickets.map(t => t.id === activeTicket.id ? { ...t, status: 'Resolved', statusColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' } : t));
                                                }} className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700">
                                                    Mark Resolved
                                                </button>
                                            )}
                                            <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                                <span className="material-symbols-outlined">more_vert</span>
                                            </button>
                                        </div>
                                    </div>


                            {/* Chat Messages Body */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-50/30 dark:bg-slate-950/20">
                                {/* Timestamp Divider */}
                                <div className="flex justify-center">
                                    <span className="text-[10px] font-bold text-slate-400 bg-white dark:bg-slate-900 px-3 py-1 rounded-full border border-slate-100 dark:border-slate-800 shadow-sm uppercase tracking-widest">
                                        October 24, 2023
                                    </span>
                                </div>

                                {MESSAGES.map((msg, index) =>
                                    msg.type === 'user' ? (
                                        <div
                                            key={`user-msg-${index}`}
                                            className="flex flex-col items-end gap-1 max-w-[80%] ml-auto"
                                        >
                                            <div className="bg-primary text-white p-4 rounded-2xl rounded-tr-none shadow-md">
                                                <p className="text-sm leading-relaxed">{index === 0 && activeTicket.preview !== 'No additional details provided.' && !msg.text.includes('#') ? activeTicket.preview : msg.text}</p>
                                            </div>
                                            <span className="text-[10px] text-slate-400 font-medium mr-1">
                                                {msg.time}
                                            </span>
                                        </div>
                                    ) : (
                                        <div key={index} className="flex gap-4 max-w-[80%] mr-auto">
                                            <div className="size-8 rounded-lg bg-slate-200 dark:bg-slate-700 shrink-0 flex items-center justify-center text-slate-500 overflow-hidden">
                                                <img
                                                    alt={msg.name}
                                                    className="size-full object-cover"
                                                    src={msg.avatar}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 ml-1">
                                                    {msg.name}
                                                </span>
                                                <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-4 rounded-2xl rounded-tl-none shadow-sm">
                                                    {msg.paragraphs.map((p, idx) => (
                                                        <p
                                                            key={idx}
                                                            className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed"
                                                        >
                                                            {p}
                                                        </p>
                                                    ))}
                                                    {msg.italic && (
                                                        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed mt-2 font-medium italic">
                                                            {msg.italic}
                                                        </p>
                                                    )}
                                                </div>
                                                <span className="text-[10px] text-slate-400 font-medium ml-1">
                                                    {msg.time}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                )}

                                {/* Appended Local Messages */}
                                {(localChatLog[activeTicket.id] || []).map((msg, index) => (
                                    <div
                                        key={`local-msg-${index}`}
                                        className="flex flex-col items-end gap-1 max-w-[80%] ml-auto"
                                    >
                                        <div className="bg-primary text-white p-4 rounded-2xl rounded-tr-none shadow-md animate-fade-in">
                                            <p className="text-sm leading-relaxed">{msg.text}</p>
                                        </div>
                                        <span className="text-[10px] text-slate-400 font-medium mr-1">
                                            {msg.time}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Message Input Footer */}
                            {activeTicket.status !== 'Resolved' && activeTicket.status !== 'Closed' && (
                                <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                                    <form 
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            const text = e.target.reply.value;
                                            if(!text.trim()) return;
                                            
                                            setLocalChatLog(prev => ({
                                                ...prev,
                                                [activeTicket.id]: [
                                                    ...(prev[activeTicket.id] || []), 
                                                    { type: 'user', text: text, time: 'Just now' }
                                                ]
                                            }));
                                            
                                            e.target.reset();
                                        }}
                                        className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-2 border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/40 transition-all"
                                    >
                                        <textarea
                                            name="reply"
                                            className="w-full bg-transparent border-none focus:ring-0 text-sm resize-none placeholder:text-slate-400 px-3 custom-scrollbar"
                                            placeholder="Type your message here..."
                                            rows="2"
                                            onKeyDown={(e) => {
                                                if(e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    e.target.closest('form').requestSubmit();
                                                }
                                            }}
                                        />
                                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/50 dark:border-slate-700/50">
                                            <div className="flex items-center gap-1">
                                                <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-md transition-all">
                                                    <span className="material-symbols-outlined text-[20px]">attach_file</span>
                                                </button>
                                                <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-md transition-all">
                                                    <span className="material-symbols-outlined text-[20px]">
                                                        sentiment_satisfied
                                                    </span>
                                                </button>
                                                <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-md transition-all">
                                                    <span className="material-symbols-outlined text-[20px]">image</span>
                                                </button>
                                            </div>
                                            <button type="submit" className="bg-primary text-white px-5 py-2 rounded-lg font-bold text-sm shadow-md hover:bg-primary/90 transition-all flex items-center gap-2">
                                                Send Message
                                                <span className="material-symbols-outlined text-[18px]">send</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                                </>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 relative z-10 h-full w-full">
                                    <span className="material-symbols-outlined text-6xl mb-4 opacity-20">forum</span>
                                    <h3 className="font-bold text-lg mb-1 text-slate-500">Select a Conversation</h3>
                                    <p className="text-sm text-slate-400">Choose a ticket from the left to view details</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>

            {/* New Ticket Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/30">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                New Support Ticket
                            </h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form
                            className="p-6 space-y-5"
                            onSubmit={handleCreateTicket}
                        >
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                    Category
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {CATEGORIES.map((cat) => (
                                        <button
                                            key={cat.label}
                                            className={`flex flex-col items-center justify-center gap-2 p-3 border-2 rounded-xl font-bold transition-all ${selectedCategory === cat.label
                                                    ? 'border-primary bg-primary/5 text-primary'
                                                    : 'border-slate-100 dark:border-slate-800 text-slate-500 hover:border-slate-200'
                                                }`}
                                            type="button"
                                            onClick={() => setSelectedCategory(cat.label)}
                                        >
                                            <span className="material-symbols-outlined">{cat.icon}</span>
                                            <span className="text-xs">{cat.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                    Subject
                                </label>
                                <input
                                    className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary"
                                    placeholder="Summary of your issue"
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                    Description
                                </label>
                                <textarea
                                    className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary resize-none"
                                    placeholder="Please provide as much detail as possible..."
                                    rows="4"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <button
                                    className="flex-1 bg-slate-100 dark:bg-slate-800 py-2.5 rounded-lg font-bold text-slate-600 dark:text-slate-300 text-sm hover:bg-slate-200 transition-colors"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="flex-1 bg-primary py-2.5 rounded-lg font-bold text-white text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                                    type="submit"
                                >
                                    Submit Ticket
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Support;
