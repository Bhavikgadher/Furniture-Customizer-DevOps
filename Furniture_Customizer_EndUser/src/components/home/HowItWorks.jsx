/**
 * HowItWorks Component
 *
 * Three-step process section explaining the customization flow:
 * 1. Pick a Base → 2. Customize → 3. Handcrafted Delivery
 * Each step has an icon, title, and description with hover animation.
 * Connecting lines between steps on desktop.
 */

const STEPS = [
    {
        icon: 'category',
        title: '1. Pick a Base',
        description:
            'Choose from our curated catalog of masterfully engineered furniture frames.',
        hasConnector: true,
    },
    {
        icon: 'palette',
        title: '2. Customize',
        description:
            'Select fabrics, leg finishes, and exact dimensions to fit your space perfectly.',
        hasConnector: true,
    },
    {
        icon: 'local_shipping',
        title: '3. Handcrafted Delivery',
        description:
            'Our artisans build your piece and ship it directly to your door in 3-4 weeks.',
        hasConnector: false,
    },
];

const HowItWorks = () => {
    return (
        <section className="py-24 bg-white dark:bg-background-dark">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        How it Works
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                        Three simple steps to bringing your unique vision to life, from our design studio to
                        your living room.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {STEPS.map((step, index) => (
                        <div key={index} className="relative text-center group">
                            <div className="w-20 h-20 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                <span className="material-symbols-outlined text-4xl">{step.icon}</span>
                            </div>
                            {step.hasConnector && (
                                <div className="absolute top-10 left-[60%] hidden md:block w-full h-[2px] bg-slate-100 dark:bg-slate-800 -z-10" />
                            )}
                            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                                {step.title}
                            </h4>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
