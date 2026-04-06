import { Link } from 'react-router-dom';

/**
 * HeroSection Component
 *
 * Full-width hero with:
 * - Left: Badge, headline, description, CTA buttons, customer avatars + rating
 * - Right: Featured product image with overlay card
 * - Decorative gradient blur circles
 */

const CUSTOMER_AVATARS = [
    {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDF2ubzqwHeObZQjxw4dw1h4tojc4ix2absI7XUKN5xT9SBqCCw6XTuPG3gRmF7Xebv3wS4wsbbQMcs8hbqDeaZ4y2qpY6AiSbni_HAcG5fEXYCmW3NuEEPEews9m20ICZbWgFYCBSm5HdIliIDwE7vqc3Ey5BWFjmtml71fn5wX-VVLxUNSHKCjnB3NZvznHedqrtQxOXLf7QgV1uC19kvWk5FvGw1Apzl8Q1YmNMlkEFI7glb1GfruCLF8iwRCVyB5K-zJtWqGQHt',
        alt: 'Satisfied customer avatar 1',
    },
    {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBipp4kGi2dod4GQHo_vDJv9xLTe4H2PzElfhO1hPNXrpn_P-2jFSFKDKBBa-Ivibe1bBXb58ybGFpGun1yZmYyZY69YjDz-DpEwyUHXnM601a_Z2ALuys2cvYPJnF04wez6favffdX_0sb6FR-rdlXbZsufG5d9ATi_dBJXE8OA_TDUqy2UDagL_oBKaU2g3eSBosmvZjy86AhV3ByN7BQZxzNCADRtJJl6rAtrikpA8ZBkbIP4jujqIKWEiMbrQHk62pBFBCl1_ky',
        alt: 'Satisfied customer avatar 2',
    },
    {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7iycVhNz-AkPH_LpLg_3jMfhiSoImGxrZmNSUC1GiNjKrgIrMEqetUWmfv43TMK0Uk78TEWItS1YxbcxlLohWaLr7Z1a5IcGvEfHAHjJYuuXwdeRGPr9J4jbMnDWmGgBvjMWCEFbqHkrDX4ITKuy_ObKhh1dW38ng0vfFUu9zQ_-0NlW6CyFqehEa75XQeBdhT2Ioyc4vIeT4PWScE5dP_t6eb5dXPx9X_JUXRZcCsFYi7O1vITF3zjC0M7ZOxSe9_5Ig_9bNblig',
        alt: 'Satisfied customer avatar 3',
    },
];

const HERO_IMAGE =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB9kkqhfvS-A3hZj2GVPLUo8UAbA-2oM0SbtmXXYFZmi2G0uoSjODpvqdhbqy2HIvRIKexHixJzi1rMFWkmprxp5UQjplrC2bnUNS2aW5XqQ0ANtUrcALaKLdpgEIPWSiOLyIrqINVSh7n5TcwMbPvJcZrvPhc92PdAoHJ5FgKAsQAyyyEaScy0i740IMavqiZJ7G-jcs4FU7EzrObRoGc_Y1_LIvOT7I3m11P6V_CzLRjns1l2LNwnvao4AQXmmpZFK2paVgWpAo4_';

const HeroSection = () => {
    return (
        <header className="relative overflow-hidden bg-white dark:bg-background-dark pt-12 pb-24">
            <div className="max-w-7xl mx-auto px-6 lg:flex items-center gap-16">
                {/* Left Content */}
                <div className="lg:w-1/2 mb-16 lg:mb-0">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                        <span className="material-symbols-outlined text-sm">verified</span>
                        Premium Handcrafted Furniture
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] mb-8 tracking-tighter">
                        Your Space, <br />
                        Your Way. <br />
                        <span className="text-primary">Customize Your Comfort.</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-lg leading-relaxed">
                        Experience luxury redefined. Create furniture that perfectly matches your lifestyle,
                        dimensions, and aesthetic preferences. Handcrafted with passion, tailored by you.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link to="/customizer" className="bg-primary hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-base font-bold transition-all flex items-center gap-3 shadow-xl shadow-primary/25">
                            Customize Your Comfort
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                        <Link to="/products" className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-8 py-4 rounded-xl text-base font-bold transition-all">
                            View Lookbook
                        </Link>
                    </div>
                    <div className="mt-12 flex items-center gap-6">
                        <div className="flex -space-x-3">
                            {CUSTOMER_AVATARS.map((avatar, index) => (
                                <img
                                    key={index}
                                    className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 object-cover"
                                    alt={avatar.alt}
                                    src={avatar.src}
                                />
                            ))}
                        </div>
                        <div className="text-sm">
                            <p className="font-bold text-slate-900 dark:text-white">12k+ Happy Customers</p>
                            <p className="text-slate-500 text-xs">Rated 4.9/5 stars globally</p>
                        </div>
                    </div>
                </div>

                {/* Right: Hero Image */}
                <div className="lg:w-1/2 relative">
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                        <img
                            className="w-full h-[600px] object-cover"
                            alt="Minimalist green velvet sofa in modern living room"
                            src={HERO_IMAGE}
                        />
                        <div className="absolute bottom-6 left-6 right-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur px-6 py-4 rounded-xl flex justify-between items-center border border-white/20">
                            <div>
                                <p className="text-xs uppercase font-bold tracking-widest text-primary mb-1">
                                    Featured Design
                                </p>
                                <h4 className="font-bold text-slate-900 dark:text-white">Nordic Sky Sectional</h4>
                            </div>
                            <p className="text-lg font-black text-primary">$2,499</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeroSection;
