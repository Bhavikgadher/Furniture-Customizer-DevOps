import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Preview3D Page
 *
 * Full-screen immersive 3D furniture preview with:
 * - Background 3D viewport (simulated with image)
 * - Central sofa with interactive hotspots (pulsing dots + tooltips)
 * - Glass-panel header (back, product title, share, specs)
 * - Right side view controls (zoom in/out, rotate, camera)
 * - Environment toggle (Studio, Living Room, Dark Mode)
 * - Quick Action Bar (price, lead time, Go Back, Confirm)
 * - HUD interaction helpers (mouse controls)
 * - Loading state indicator bar
 *
 * Route: /preview-3d
 */

const ENVIRONMENTS = ['Studio', 'Living Room'];

const Preview3D = () => {
    const navigate = useNavigate();
    const [activeEnv, setActiveEnv] = useState(0);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [activeHotspot, setActiveHotspot] = useState(null);

    const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 2.5));
    const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
    const handleZoomReset = () => setZoomLevel(1);

    const toggleHotspot = (id) => setActiveHotspot(prev => prev === id ? null : id);

    const handleConfirmConfig = () => {
        const selectionData = {
            id: Date.now(),
            name: "The Artisan Modular Sofa",
            config: "SECTIONAL",
            material: "Performance Velvet",
            fabricColor: "Forest Emerald",
            legFinish: "Natural Walnut",
            price: 2499,
            image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
            quantity: 1
        };
        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
        localStorage.setItem('cart', JSON.stringify([...existingCart, selectionData]));
        navigate('/cart');
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased overflow-hidden">
            {/* Main 3D Canvas Container */}
            <div className="relative h-screen w-full flex flex-col overflow-hidden">
                {/* Background 3D Viewport Simulation */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700"
                    role="img"
                    aria-label={activeEnv === 0 ? "Studio environment" : "Living Room environment"}
                    style={{
                        backgroundImage: `url('${activeEnv === 0 ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuCd3_kYIzlW-4rER8fRQ3oicV6bhWdMAQzlmtdqd_OJImd4ziUXCho0ertPb923w9trXZu2Uq6C80g2eOYgSCZyx6VkgWhu2Y7a3_1Y2I4golMpor1VxBEiiceTLfd0urRaaMLL9BjJBPO1gsB8HGZ1lLIW9YfDcjWixg-9-dvxI2jvL-i5o8BnbCFOKUFHoeIChCgCAnaZXZSJXc0V8CoWA-DEvSfxKDv9N_dKTwwWXDjm6xgB_shwWAjbZeaw6sWVMH9fGFNnEz32' : 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1600'}')`,
                    }}
                >
                    {/* Central Sofa Mockup Area */}
                    <div className="flex items-center justify-center h-full w-full transition-transform duration-300 ease-out" style={{ transform: `scale(${zoomLevel})` }}>
                        <div className="relative group">
                            {/* Sofa Image */}
                            <img
                                alt="Premium navy blue velvet sofa"
                                className="max-w-4xl w-full h-auto drop-shadow-2xl scale-110"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBd7Mye08DXj5NJ-RwfOORazfjnWBSpohtQdj5yFu-XRLx9Uojr4sKoA3vdiOV1wR9JhrxMN367HcGgox84VyHzlzV4_Mn98ubGZ4T1alyoRoDpclG2Vudrd-3akTHYRcg5qEg_iWSzP8P7qhjLHiRSqW8tatw32Ev1yk4pTWCLnKXRBc0AfLE9oJ2Z_1G_VY0vGrlvGylYjX-U1CAoUqaVS3NMsVOghnRNYkH9cSEblUvFNAg6XiYu7WUmWVhPkeqCcffxVrHmPGju"
                            />

                            {/* Hotspot 1: Material */}
                            <div className="absolute top-1/3 left-1/4 cursor-pointer z-20" onClick={() => toggleHotspot(1)}>
                                <div className="relative flex items-center justify-center">
                                    <div className={`absolute w-8 h-8 rounded-full bg-primary/40 ${activeHotspot === 1 ? 'animate-ping' : 'hotspot-pulse'}`} />
                                    <div className={`relative w-4 h-4 rounded-full border-2 shadow-lg transition-colors ${activeHotspot === 1 ? 'bg-white border-primary' : 'bg-primary border-white'}`} />
                                </div>
                                {/* Hotspot Tooltip */}
                                <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 glass-panel rounded-xl p-4 shadow-xl transition-all duration-300 pointer-events-none ${activeHotspot === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1 block">
                                        Hotspot: Material
                                    </span>
                                    <h4 className="text-sm font-bold mb-1">Premium Velvet Texture</h4>
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                        High-density weave with rub-resistant finish and spill-guard coating.
                                    </p>
                                    <div className="mt-2 h-1 w-full bg-primary/20 rounded-full overflow-hidden">
                                        <div className="bg-primary h-full w-3/4" />
                                    </div>
                                </div>
                            </div>

                            {/* Hotspot 2: Filling */}
                            <div className="absolute bottom-1/3 right-1/3 cursor-pointer z-20" onClick={() => toggleHotspot(2)}>
                                <div className="relative flex items-center justify-center">
                                    <div
                                        className={`absolute w-8 h-8 rounded-full bg-primary/40 ${activeHotspot === 2 ? 'animate-ping' : 'hotspot-pulse'}`}
                                        style={{ animationDelay: '0.5s' }}
                                    />
                                    <div className={`relative w-4 h-4 rounded-full border-2 shadow-lg transition-colors ${activeHotspot === 2 ? 'bg-white border-primary' : 'bg-primary border-white'}`} />
                                </div>
                                <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 glass-panel rounded-xl p-4 shadow-xl transition-all duration-300 pointer-events-none ${activeHotspot === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1 block">
                                        Hotspot: Core
                                    </span>
                                    <h4 className="text-sm font-bold mb-1">High-Density Foam</h4>
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                        Multi-layered memory foam core for lasting lumbar support and comfort.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Header Overlay */}
                {/* Removed hardcoded header to use MainLayout */}

                <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-4">
                    <div className="glass-panel p-1 rounded-xl flex flex-col gap-1">
                        <button onClick={handleZoomIn} className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all active:scale-95">
                            <span className="material-symbols-outlined">add</span>
                        </button>
                        <button onClick={handleZoomOut} className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all active:scale-95">
                            <span className="material-symbols-outlined">remove</span>
                        </button>
                        <div className="h-px bg-slate-200 mx-2" />
                        <button onClick={handleZoomReset} className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all active:scale-95">
                            <span className="material-symbols-outlined">sync</span>
                        </button>
                    </div>
                </div>

                {/* Bottom UI Area */}
                <div className="mt-auto relative z-10 p-8 flex flex-col gap-6 items-center">
                    {/* Environment Toggle */}
                    <div className="glass-panel p-1.5 rounded-full flex gap-1 shadow-lg">
                        {ENVIRONMENTS.map((env, index) => (
                            <button
                                key={env}
                                onClick={() => setActiveEnv(index)}
                                className={`px-6 py-2 rounded-full text-sm transition-all ${activeEnv === index
                                        ? 'font-bold bg-primary text-white shadow-md'
                                        : 'font-medium text-slate-600 hover:bg-white/50'
                                    }`}
                            >
                                {env}
                            </button>
                        ))}
                    </div>

                    {/* Quick Action Bar */}
                    <div className="w-full max-w-4xl glass-panel rounded-2xl p-4 flex items-center justify-between shadow-2xl border-white/50">
                        <div className="flex items-center gap-6 px-4">
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-tighter text-slate-400 font-bold">
                                    Total Estimate
                                </span>
                                <span className="text-xl font-bold">$2,499.00</span>
                            </div>
                            <div className="h-10 w-px bg-slate-200" />
                            <div className="hidden md:flex flex-col">
                                <span className="text-[10px] uppercase tracking-tighter text-slate-400 font-bold">
                                    Lead Time
                                </span>
                                <span className="text-sm font-semibold">4-6 Weeks</span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => { console.log('Going back to edit mode...'); navigate('/customizer'); }}
                                className="px-8 py-3 rounded-xl border border-slate-200 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                            >
                                Go Back to Edit
                            </button>
                            <button 
                                onClick={handleConfirmConfig}
                                className="px-10 py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/30 hover:brightness-110 transition-all flex items-center gap-2"
                            >
                                Confirm Configuration
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </div>



                {/* Loading State Indicator (Simulated) */}
                <div className="absolute top-0 left-0 w-full h-1 z-50">
                    <div className="bg-primary h-full w-1/3 shadow-[0_0_10px_rgba(17,82,212,0.5)]" />
                </div>
            </div>
        </div>
    );
};

export default Preview3D;
