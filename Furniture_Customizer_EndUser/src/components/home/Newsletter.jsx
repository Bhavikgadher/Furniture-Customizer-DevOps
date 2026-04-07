import { useState } from 'react';

/**
 * Newsletter Component
 *
 * Newsletter subscription section with:
 * - Primary-colored rounded card with decorative blur circles
 * - Headline, description, email input, and subscribe button
 * - Legal disclaimer text
 */
const Newsletter = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Integrate with newsletter API
        console.log('Newsletter subscription:', email);
    };

    return (
        <section className="py-24 bg-slate-50 dark:bg-background-dark">
            <div className="max-w-5xl mx-auto px-6">
                <div className="bg-primary rounded-[2.5rem] p-12 md:p-20 relative overflow-hidden text-center">
                    {/* Decorative backgrounds */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
                            Join the Inner Circle
                        </h2>
                        <p className="text-white/80 text-lg mb-12 max-w-xl mx-auto">
                            Get design tips, early access to new collections, and exclusive customizer presets
                            delivered to your inbox.
                        </p>
                        <form
                            className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
                            onSubmit={handleSubmit}
                        >
                            <input
                                className="flex-1 px-6 py-4 rounded-xl border-none focus:ring-2 focus:ring-white/50 text-slate-900 font-medium placeholder:text-slate-400"
                                placeholder="Enter your email address"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button
                                className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition-all active:scale-95"
                                type="submit"
                            >
                                Subscribe
                            </button>
                        </form>
                        <p className="text-white/60 text-xs mt-6">
                            By subscribing, you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
