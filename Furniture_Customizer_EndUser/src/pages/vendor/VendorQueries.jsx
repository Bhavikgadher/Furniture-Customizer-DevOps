import { Link } from 'react-router-dom';

/**
 * Vendor Query Portal Page
 *
 * Three-pane messaging layout for customer support:
 * - Header (h-16): storefront icon (size-8 bg-primary), "Vendor Portal",
 *   nav (Queries active text-primary font-bold border-b-2 border-primary),
 *   search (w-48), notifications (red dot), avatar
 * - Left Sidebar (w-80): Messages header + "12 Unread" badge,
 *   All/Pending/Closed filter pills, 4 conversation items:
 *   Alex Johnson (active bg-primary/5 border-l-4 border-primary),
 *   Marcus Chen (online green dot), David Smith, Sarah Miller
 * - Center Chat: Chat header (Alex Johnson, Online green dot,
 *   Mark Resolved button), "Today" divider, 3 messages
 *   (customer white, vendor bg-primary, customer white),
 *   textarea input with attach/image/emoji + Send Message button
 * - Right Panel (w-80): Customer Details (avatar size-20, 4 stars,
 *   email, location), Active Order (#12345 Delayed yellow badge,
 *   product thumbnail), Quick Actions (2x2 grid: Track Link,
 *   Issue Refund, Edit Order, Escalate)
 *
 * Route: /vendor-queries
 */

const CONVERSATIONS = [
    {
        name: 'Alex Johnson',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMiGnMeJGmhdG_QTik3s026wNKglY8ZNj_6nHvF12yuLcm7aG68hDGP_p8Zlr4ZBC2KunodzVjPPlBymUVYWzL__sHQlrDrd66iUn_6O1tZYlOLT3T-YakR5iel0MGozuZz3-Xg909rgsAgFM2W5BGr1MG-FKjUwzsJkl2eXJXhg_naIiDDSP7L9rtx-FMyTHijc6f8sMnYag5TohFDUQ0YVSdpEngEutaNaruGYMF_KDq4b-f9Q2iDJVinpiqoVdD4gWiWZK_ozec',
        time: '2m ago',
        subject: 'Shipping Delay - #12345',
        subjectColor: 'text-primary',
        preview: "When will my order arrive? It's been...",
        active: true,
        online: false,
    },
    {
        name: 'Marcus Chen',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSotbdc-LMv7fnx2QU-gm5nyhwVxfxNqlsVNjCtg35kjSUINGQl5WHO0fRqWuLEOYbrVgaZkmNKJ4gChkNmctnJRCwFyQvn6Iz9vH_bMOtCYHyEwPf-SBWgzW2OuJiQgpC6O9wkd3iD93qlHQHw2lJxl4hpanbhWJ5uByxgPdWiD6OMuKeNlqz6Ne5qgsRzb1IBQNB9depgHyExPZqFlipjOgrdLOgxKTmsOKqa01OB4W5QMDINdcq5AQyZ1rHXt_sDCTyws4Roue8',
        time: '1h ago',
        subject: 'Product Inquiry: Headphones',
        subjectColor: 'text-slate-700 dark:text-slate-300',
        preview: 'Do these support multi-point Bluetooth?',
        active: false,
        online: true,
    },
    {
        name: 'David Smith',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBE8TGEYQNvyemmDaiQj2XiHO0X_PlSm5p8cw7-ytwFKWzMVSpSWozn1Cy-ocTJExIiOOY4GNZnKDaFCbNnULQUvSh8bFBDRiOFKFgwawA4NIKdqA1_7b9Ea1VoHwrLYGJHM6jKC0VbfcsR4okEQW6Eqfru4fyO3y-l-a1-Mt5pGA9jyqAp5qQZVAwbaEDGFJPt1w91KgAhm-XcH87Er5Spf8N8niiMhUpuCevCZLgmE6oO1F6V9Zsp3wq6sqX6wQ0KgAuwJZ9UZYsU',
        time: '3h ago',
        subject: 'Return Request - #12311',
        subjectColor: 'text-slate-700 dark:text-slate-300',
        preview: 'The size is too large. How do I return...',
        active: false,
        online: false,
    },
    {
        name: 'Sarah Miller',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdABw_TnRC38gHFiTJ0KK_Anl_jWIBOXjGz9DFoUNfZQsYqYvSrBtMLyOifcIexaJlW98D6d_gnmNKFwhTDJs_dKfXXZNt0s5TSDcY4FzwfMLzQn8rEfqrQt2W_H5hbXYoQoXhQP7wFNdWWhtDIE09wgfL2qSfrRlU8JVzpLUrHf810r48D0pZ_G90H3EE1yfIiTidlg6dEBjJzNv_fAowkagbvzq6jziw0FApdbvhwl-2-vlGMjpc0dt1s7pGlKre8QuG1MYdNayT',
        time: 'Yesterday',
        subject: 'Payment Issue',
        subjectColor: 'text-slate-700 dark:text-slate-300',
        preview: 'I was charged twice for my last order.',
        active: false,
        online: false,
    },
];

const MESSAGES = [
    {
        sender: 'customer',
        name: 'Alex Johnson',
        time: '09:42 AM',
        text: "Hello, I'm checking on the status of my order #12345. It was supposed to arrive two days ago but the tracking hasn't updated. Could you please check this for me?",
    },
    {
        sender: 'vendor',
        name: 'Support Team',
        time: '09:45 AM',
        text: "Hi Alex, I'm sorry for the delay. Let me check the system immediately. It seems there was a weather delay at the regional hub.",
    },
    {
        sender: 'customer',
        name: 'Alex Johnson',
        time: '09:48 AM',
        text: 'Thank you for checking. Do you have a new estimated delivery date? I need this item for a gift by Friday.',
    },
];

const QUICK_ACTIONS = [
    { icon: 'local_shipping', label: 'Track Link' },
    { icon: 'payments', label: 'Issue Refund' },
    { icon: 'edit', label: 'Edit Order' },
    { icon: 'support_agent', label: 'Escalate' },
];

const VendorQueries = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display">
            {/* Header */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 h-16 shrink-0">
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-3 text-primary">
                        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                            <span className="material-symbols-outlined">storefront</span>
                        </div>
                        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">
                            Vendor Portal
                        </h2>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                        <a className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" href="#">
                            Dashboard
                        </a>
                        <a className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" href="#">
                            Orders
                        </a>
                        <a className="text-primary text-sm font-bold border-b-2 border-primary py-5 -mb-5" href="#">
                            Queries
                        </a>
                        <a className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" href="#">
                            Products
                        </a>
                        <a className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" href="#">
                            Settings
                        </a>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-1.5 border border-slate-200 dark:border-slate-700">
                        <span className="material-symbols-outlined text-slate-400 text-sm mr-2">search</span>
                        <input
                            className="bg-transparent border-none focus:ring-0 text-sm p-0 w-48 placeholder:text-slate-400"
                            placeholder="Search orders..."
                            type="text"
                        />
                    </div>
                    <button className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
                    </button>
                    <div className="h-8 w-8 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
                        <img
                            className="w-full h-full object-cover"
                            alt="Vendor profile"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnVpz70bB56B7GfPlCVEmRhIWLe27mfJQkBiwcex9xsqWA4Yu4szBysJ66zLI5-ZLZfWnZ0ZWaz3N5wI3CqqI95TagiMsXV4MQtpTusCsaVsKkeHijJHSPFQBLYUT1a-FZrnmcRgB4_2_ZoN1MKS3_yhf9Bc7YG-aOo735iDz4KFJr4S66nDCw1xgE4iVvsJklxkGJkp0WKZES7QpTNMAqNSGF_43VMJh1Yjft3uCPEItlASzEoPR7KIPIHtm0ySmmf-P4sSXjhwgf"
                        />
                    </div>
                </div>
            </header>

            {/* Three-Pane Layout */}
            <main className="flex-1 flex overflow-hidden">
                {/* Left Sidebar: Conversations */}
                <aside className="w-80 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0">
                    <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-slate-900 dark:text-white">Messages</h3>
                            <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full">
                                12 Unread
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex-1 text-xs font-bold py-1.5 px-3 bg-primary text-white rounded-lg">
                                All
                            </button>
                            <button className="flex-1 text-xs font-bold py-1.5 px-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 transition-colors">
                                Pending
                            </button>
                            <button className="flex-1 text-xs font-bold py-1.5 px-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 transition-colors">
                                Closed
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {CONVERSATIONS.map((conv) => (
                            <div
                                key={conv.name}
                                className={
                                    conv.active
                                        ? 'p-4 bg-primary/5 border-l-4 border-primary cursor-pointer'
                                        : 'p-4 border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors'
                                }
                            >
                                <div className="flex gap-3">
                                    <div className="size-10 rounded-full overflow-hidden shrink-0 relative">
                                        <img className="w-full h-full object-cover" alt={conv.name} src={conv.avatar} />
                                        {conv.online && (
                                            <span className="absolute bottom-0 right-0 size-2.5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                                                {conv.name}
                                            </p>
                                            <p className="text-[10px] text-slate-400 font-medium">{conv.time}</p>
                                        </div>
                                        <p className={`text-xs font-semibold truncate mt-0.5 ${conv.subjectColor}`}>
                                            {conv.subject}
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-1">
                                            {conv.preview}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Center: Chat Window */}
                <section className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950">
                    {/* Chat Header */}
                    <div className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full overflow-hidden">
                                <img
                                    className="w-full h-full object-cover"
                                    alt="Alex Johnson"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy7B8vwEXvumH80KfHN7LjNPYU9tWaehEOIbCi7GxO7cIieG0lz2q_oEgAx30rO_NXSKtqTwNSx4BwdEPfNCzufa4MfyPpu7AI7gn_080MG8x1f-h9UgPxsduX5tOC7kxkY0OBtCM2rSyYdBQVm8up0lnINVQa87Gvs8zaW0jkRqoOdC_VMR04nt_nddUEDF9QVpnMUHm9Si8LsFVpV0gw6laBJ53xU7wOdsAinX1yvbQ7QKj1X9DM7ogvusMNAIDP6o_aqxEE9ri0"
                                />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Alex Johnson</h4>
                                <div className="flex items-center gap-1.5">
                                    <span className="size-2 bg-green-500 rounded-full" />
                                    <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">
                                        Online
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors">
                                <span className="material-symbols-outlined text-sm">assignment_turned_in</span>
                                Mark Resolved
                            </button>
                            <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
                                <span className="material-symbols-outlined">more_vert</span>
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                        {/* Today Divider */}
                        <div className="flex items-center justify-center">
                            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                            <span className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                Today
                            </span>
                            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                        </div>

                        {MESSAGES.map((msg, idx) =>
                            msg.sender === 'customer' ? (
                                <div key={idx} className="flex flex-col items-start max-w-[80%]">
                                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl rounded-tl-none shadow-sm">
                                        <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                                            {msg.text}
                                        </p>
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-medium mt-1 ml-1">
                                        {msg.name} • {msg.time}
                                    </span>
                                </div>
                            ) : (
                                <div key={idx} className="flex flex-col items-end self-end max-w-[80%]">
                                    <div className="bg-primary text-white p-4 rounded-xl rounded-tr-none shadow-sm">
                                        <p className="text-sm leading-relaxed">{msg.text}</p>
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-medium mt-1 mr-1">
                                        {msg.name} • {msg.time}
                                    </span>
                                </div>
                            )
                        )}
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                        <div className="flex flex-col gap-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-2 border border-slate-200 dark:border-slate-700 focus-within:border-primary/50 transition-colors">
                            <textarea
                                className="bg-transparent border-none focus:ring-0 text-sm resize-none h-20 placeholder:text-slate-400"
                                placeholder="Type your response..."
                                rows="3"
                            />
                            <div className="flex items-center justify-between px-2 pb-1">
                                <div className="flex gap-2">
                                    <button className="p-1.5 text-slate-500 hover:text-primary rounded-lg transition-colors">
                                        <span className="material-symbols-outlined text-xl">attach_file</span>
                                    </button>
                                    <button className="p-1.5 text-slate-500 hover:text-primary rounded-lg transition-colors">
                                        <span className="material-symbols-outlined text-xl">image</span>
                                    </button>
                                    <button className="p-1.5 text-slate-500 hover:text-primary rounded-lg transition-colors">
                                        <span className="material-symbols-outlined text-xl">sentiment_satisfied</span>
                                    </button>
                                </div>
                                <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-md shadow-primary/20 transition-all">
                                    Send Message
                                    <span className="material-symbols-outlined text-sm">send</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Right Panel: Context */}
                <aside className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0 overflow-y-auto">
                    {/* Customer Profile */}
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                        <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                            Customer Details
                        </h5>
                        <div className="flex flex-col items-center text-center">
                            <div className="size-20 rounded-full overflow-hidden mb-3 border-4 border-slate-50 dark:border-slate-800">
                                <img
                                    className="w-full h-full object-cover"
                                    alt="Customer profile"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_MwmbMo2eQwR-0ighWg1VG_AUaVGGM1slaOxSq1igfb8F14p0N7n0PK8OEjoCEcMu7cRIUNSJ3Plotb8sn4S6lAtpoOI70SULNuE0JGAgm-9aS8woR7CT85P1TERERowRa0_x4GGCBBPRyGN6MojhD9wEmwsHhYq3RK1nGXfgPNW452sCbuofA8fC7QaZONyolwMngLgrbeC-scSsreqvBB8s1D06PK33_02ER3PSaOL0Sx4NUEL7YkHKsQZYlJcieQwhJ6d6JXPa"
                                />
                            </div>
                            <h4 className="text-base font-bold text-slate-900 dark:text-white">Alex Johnson</h4>
                            <p className="text-xs text-slate-500 mb-1">Customer since Jan 2023</p>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4].map((i) => (
                                    <span key={i} className="material-symbols-outlined text-yellow-400 text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
                                        star
                                    </span>
                                ))}
                                <span className="material-symbols-outlined text-slate-300 text-xs">star</span>
                            </div>
                        </div>
                        <div className="mt-6 space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-slate-400 text-lg">mail</span>
                                <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                                    alex.j@example.com
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-slate-400 text-lg">location_on</span>
                                <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                                    San Francisco, CA
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Active Order */}
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex justify-between items-center mb-4">
                            <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                Active Order
                            </h5>
                            <a className="text-[10px] font-bold text-primary hover:underline" href="#">
                                View All
                            </a>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
                            <div className="flex justify-between mb-2">
                                <span className="text-xs font-bold text-slate-900 dark:text-white">
                                    Order #12345
                                </span>
                                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-[10px] font-bold rounded-full">
                                    Delayed
                                </span>
                            </div>
                            <p className="text-[11px] text-slate-500 mb-3">Placed on Oct 24, 2023</p>
                            <div className="flex gap-3 items-center">
                                <div className="size-12 bg-white dark:bg-slate-700 rounded-lg p-1 border border-slate-200 dark:border-slate-600 shrink-0">
                                    <img
                                        className="w-full h-full object-contain"
                                        alt="Product thumbnail"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAp4ce5Fqs87mdUpo7BU4FHaYOdsY48o1YAwuptnkS2-wuHuZnYBhXLwobF07ZF-mjvPW18Djo0VnI_XbvyCsO3Vbaicc4T8lHgodPTE50pSspJs61ZPbWhRj8BrgupoG64_FOEKv1o0BluPrEfzZ5rNcWom6N1S5Vx8Sqc3Noz3vQHyDFDil55UfnoCyW-pM3Igu2SsDg-oFgQenAToQV58Sar0n7o-DY1uTsBOUxaNHNENU8d9ADHIZzGNFdy1Bk4cw3I0F6FOM_g"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">
                                        Pro Wireless Headphones
                                    </p>
                                    <p className="text-xs text-slate-500">$299.00</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="p-6">
                        <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                            Quick Actions
                        </h5>
                        <div className="grid grid-cols-2 gap-2">
                            {QUICK_ACTIONS.map((action) => (
                                <button
                                    key={action.label}
                                    className="flex flex-col items-center justify-center p-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-primary hover:text-primary transition-colors gap-2"
                                >
                                    <span className="material-symbols-outlined">{action.icon}</span>
                                    <span className="text-[10px] font-bold">{action.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
};

export default VendorQueries;
