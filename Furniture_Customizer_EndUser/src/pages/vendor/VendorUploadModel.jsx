import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Vendor Upload 3D Model Page
 *
 * Asset management page for uploading and previewing 3D furniture models:
 * - Header: SVG logo + "FurniCustom", nav (Dashboard, Inventory active with border-b-2,
 *   Catalog), notifications + settings buttons, user avatar
 * - Breadcrumb: Inventory > Upload 3D Model
 * - Page header: "Asset Management" (3xl font-black), subtitle, Discard + Publish to Catalog CTA
 * - 12-col grid (5/7):
 *   Left column (5-col):
 *     - File Upload: dashed drop zone (cloud_upload), uploaded file status
 *       (Modern_Armchair_V2.glb, 14.2MB, 100% processed, green checkmark)
 *     - Model Details form: Asset Name, SKU, Scale Units select
 *     - Technical Specs: File Size ✅, Triangle Count ✅, Texture Resolution ⚠️ (4K/2K),
 *       Material Count ✅, Pro Tip box
 *   Right column (7-col, min-h-600px):
 *     - 3D Preview canvas: toolbar (orbit/pan/zoom + wireframe/lighting),
 *       right actions (reset/fullscreen), dot-grid background, chair placeholder,
 *       view selector (Front/Side/Top/ISO), processing indicator bar
 *     - Scene settings: environment circles (Studio/Outdoor/Dark), ground grid toggle,
 *       "AR Preview Active" label
 * - Footer: © 2024, Guidelines / Support / API Documentation
 *
 * Route: /vendor-upload-model
 */

const TECH_SPECS = [
    {
        icon: 'check_circle',
        iconColor: 'text-green-500',
        label: 'File Size',
        value: '14.2MB',
        limit: '/ 50MB',
    },
    {
        icon: 'check_circle',
        iconColor: 'text-green-500',
        label: 'Triangle Count',
        value: '84,200',
        limit: '/ 100k',
    },
    {
        icon: 'info',
        iconColor: 'text-amber-500',
        label: 'Texture Resolution',
        value: '4K',
        limit: '/ 2K Rec.',
    },
    {
        icon: 'check_circle',
        iconColor: 'text-green-500',
        label: 'Material Count',
        value: '3',
        limit: '/ 5 Max',
    },
];

const VIEW_BUTTONS = ['Front', 'Side', 'Top', 'ISO'];

const VendorUploadModel = () => {
    const [showGrid, setShowGrid] = useState(true);

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
            <div className="layout-container flex h-full grow flex-col">
                {/* Top Navigation Bar */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 lg:px-10">
                    <Link to="/" className="flex items-center gap-4 text-primary">
                        <div className="size-6">
                            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    clipRule="evenodd"
                                    d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
                                    fillRule="evenodd"
                                />
                            </svg>
                        </div>
                        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">
                            FurniCustom
                        </h2>
                    </Link>
                    <div className="flex flex-1 justify-end gap-6 items-center">
                        <nav className="hidden md:flex items-center gap-8">
                            <a
                                className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors"
                                href="#"
                            >
                                Dashboard
                            </a>
                            <a
                                className="text-slate-900 dark:text-white text-sm font-bold border-b-2 border-primary py-1"
                                href="#"
                            >
                                Inventory
                            </a>
                            <a
                                className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors"
                                href="#"
                            >
                                Catalog
                            </a>
                        </nav>
                        <div className="flex gap-2">
                            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                <span className="material-symbols-outlined">notifications</span>
                            </button>
                            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                <span className="material-symbols-outlined">settings</span>
                            </button>
                        </div>
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-slate-200 dark:border-slate-700"
                            style={{
                                backgroundImage:
                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAaVA1NtAQma15fcT4jmwJBaJEBRIvv9hVb8Fjy_0ftDN6ylgPCrz3OqGqmGTtnvorw8Q3a47hmgq-y3-iS2i8WgNNwonLSNTwD6eKeZ1eXXhwOr5J-a0H28EdctQRW5JSRxqPCKo96fbfnKudPYEE5TAefgdA7cfiqDWFvTllqBqM0j3cRHdZUchgV5LsIYPXypmnqzwYPNoBZloVH4Y7RLkgCteoaii_ZQdImW4fS7tSSB_HE0M5XBu9A_o0s_WnYEDVill-91q8n")',
                            }}
                        />
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 flex flex-col p-4 lg:p-10 max-w-[1600px] mx-auto w-full gap-6">
                    {/* Breadcrumbs & Header */}
                    <div className="flex flex-col gap-2">
                        <nav className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                            <a className="hover:text-primary" href="#">
                                Inventory
                            </a>
                            <span className="material-symbols-outlined text-xs">chevron_right</span>
                            <span className="text-slate-900 dark:text-slate-100">Upload 3D Model</span>
                        </nav>
                        <div className="flex flex-wrap justify-between items-end gap-4 mt-2">
                            <div className="flex flex-col gap-1">
                                <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                                    Asset Management
                                </h1>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Validate and optimize your 3D assets for AR-ready furniture commerce.
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <button className="px-6 h-10 rounded-lg border border-slate-300 dark:border-slate-700 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    Discard
                                </button>
                                <button className="px-6 h-10 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary/90 shadow-md shadow-primary/20 transition-all">
                                    Publish to Catalog
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Left Column: Upload & Metadata (5 cols) */}
                        <div className="lg:col-span-5 flex flex-col gap-6">
                            {/* File Upload Section */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4">
                                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">upload_file</span>
                                    File Upload
                                </h3>
                                <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl py-12 px-6 flex flex-col items-center justify-center text-center gap-4 bg-slate-50/50 dark:bg-slate-800/20 hover:border-primary/50 transition-colors cursor-pointer group">
                                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-3xl">cloud_upload</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                                            Click to upload or drag and drop
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            GLB, GLTF, or OBJ (Max. 50MB)
                                        </p>
                                    </div>
                                </div>
                                {/* File Status */}
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                    <span className="material-symbols-outlined text-primary">deployed_code</span>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold truncate">Modern_Armchair_V2.glb</p>
                                        <p className="text-[10px] text-slate-500">14.2 MB • Processing 100%</p>
                                    </div>
                                    <span className="material-symbols-outlined text-green-500 text-sm">
                                        check_circle
                                    </span>
                                </div>
                            </div>

                            {/* Metadata Form */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-5">
                                <h3 className="font-bold text-slate-900 dark:text-white">Model Details</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                                            Asset Name
                                        </label>
                                        <input
                                            className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary"
                                            type="text"
                                            defaultValue="Modern Armchair V2"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                                                SKU
                                            </label>
                                            <input
                                                className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary"
                                                placeholder="FUR-ARM-002"
                                                type="text"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                                                Scale Units
                                            </label>
                                            <select className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary">
                                                <option>Centimeters (cm)</option>
                                                <option>Meters (m)</option>
                                                <option>Millimeters (mm)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Technical Specifications Validation */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold text-slate-900 dark:text-white">Technical Specs</h3>
                                    <span className="px-2 py-0.5 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-[10px] font-bold uppercase">
                                        Ready
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    {TECH_SPECS.map((spec, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`material-symbols-outlined ${spec.iconColor} text-sm`}
                                                >
                                                    {spec.icon}
                                                </span>
                                                <span className="text-xs text-slate-600 dark:text-slate-300">
                                                    {spec.label}
                                                </span>
                                            </div>
                                            <span className="text-xs font-bold">
                                                {spec.value}{' '}
                                                <span className="text-slate-400 font-normal">{spec.limit}</span>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
                                    <p className="text-[11px] text-primary font-medium leading-relaxed">
                                        <span className="font-bold">Pro Tip:</span> Models under 100k polygons and
                                        using 2K textures perform 40% better on mobile AR sessions.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: 3D Previewer (7 cols) */}
                        <div className="lg:col-span-7 flex flex-col gap-4 min-h-[600px]">
                            <div className="relative flex-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm group">
                                {/* Toolbar Overlay */}
                                <div className="absolute top-4 left-4 z-10 flex gap-2">
                                    <div className="flex items-center bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-1">
                                        <button
                                            className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-primary"
                                            title="Orbit Mode"
                                        >
                                            <span className="material-symbols-outlined text-lg">orbit</span>
                                        </button>
                                        <button
                                            className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                                            title="Pan Mode"
                                        >
                                            <span className="material-symbols-outlined text-lg">pan_tool</span>
                                        </button>
                                        <button
                                            className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                                            title="Zoom Mode"
                                        >
                                            <span className="material-symbols-outlined text-lg">zoom_in</span>
                                        </button>
                                    </div>
                                    <div className="flex items-center bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-1">
                                        <button
                                            className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                                            title="Wireframe"
                                        >
                                            <span className="material-symbols-outlined text-lg">grid_4x4</span>
                                        </button>
                                        <button
                                            className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                                            title="Lighting Settings"
                                        >
                                            <span className="material-symbols-outlined text-lg">light_mode</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Right Actions Overlay */}
                                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                                    <button className="w-10 h-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined">restart_alt</span>
                                    </button>
                                    <button className="w-10 h-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined">fullscreen</span>
                                    </button>
                                </div>

                                {/* 3D Canvas Mockup */}
                                <div className="w-full h-full bg-slate-50 dark:bg-slate-950 flex items-center justify-center relative overflow-hidden">
                                    {/* Background Grid Pattern */}
                                    <div
                                        className="absolute inset-0 opacity-10 dark:opacity-20"
                                        style={{
                                            backgroundImage:
                                                'radial-gradient(#1152d4 0.5px, transparent 0.5px)',
                                            backgroundSize: '20px 20px',
                                        }}
                                    />
                                    {/* Placeholder 3D Content */}
                                    <div className="relative z-0 group-hover:scale-105 transition-transform duration-700">
                                        <div className="w-72 h-72 lg:w-96 lg:h-96 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-2xl shadow-2xl relative">
                                            {/* Shadow */}
                                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-12 bg-slate-800 dark:bg-black/40 rounded-full blur-xl opacity-30" />
                                            <div className="absolute inset-4 border-2 border-white/20 rounded-xl flex items-center justify-center overflow-hidden">
                                                <div className="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-2">
                                                    <span className="material-symbols-outlined text-6xl opacity-50">
                                                        chair
                                                    </span>
                                                    <span className="text-xs font-bold tracking-widest uppercase opacity-40">
                                                        Preview Active
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom View Selector */}
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur px-4 py-2 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 z-10">
                                        <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">
                                            Views
                                        </span>
                                        <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1" />
                                        {VIEW_BUTTONS.map((view, index) => (
                                            <button
                                                key={view}
                                                className={`text-[11px] font-bold ${index === 0 ? 'text-primary' : 'text-slate-500 hover:text-primary'
                                                    }`}
                                            >
                                                {view}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Processing Indicator Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-800">
                                    <div className="h-full bg-primary w-full animate-pulse" />
                                </div>
                            </div>

                            {/* Scene Settings */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-bold text-slate-500 uppercase">Environment</span>
                                        <div className="flex gap-1.5">
                                            <button
                                                className="w-8 h-8 rounded-full border-2 border-primary bg-slate-100 shadow-inner"
                                                title="Studio"
                                            />
                                            <button
                                                className="w-8 h-8 rounded-full border-2 border-transparent bg-slate-400"
                                                title="Outdoor"
                                            />
                                            <button
                                                className="w-8 h-8 rounded-full border-2 border-transparent bg-slate-800"
                                                title="Dark Room"
                                            />
                                        </div>
                                    </div>
                                    <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <div className="relative inline-flex items-center">
                                            <input
                                                checked={showGrid}
                                                onChange={() => setShowGrid(!showGrid)}
                                                className="sr-only peer"
                                                type="checkbox"
                                            />
                                            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary" />
                                        </div>
                                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">
                                            Show Ground Grid
                                        </span>
                                    </label>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                                    <span className="material-symbols-outlined text-sm">visibility</span>
                                    <span>AR Preview Active</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="mt-auto px-6 lg:px-10 py-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                    <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            © 2024 FurniCustom Asset Management System. All models are automatically scanned for
                            compliance.
                        </p>
                        <div className="flex gap-6">
                            <a
                                className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-primary"
                                href="#"
                            >
                                Guidelines
                            </a>
                            <a
                                className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-primary"
                                href="#"
                            >
                                Support
                            </a>
                            <a
                                className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-primary"
                                href="#"
                            >
                                API Documentation
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default VendorUploadModel;
