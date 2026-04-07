import Logo from './Logo';

/**
 * AuthShowcase Component
 * 
 * Left-side visual panel used on auth pages (Login, Signup, Forgot Password).
 * Displays a full-bleed background image with gradient overlay, brand logo,
 * headline, description, and footer links.
 * 
 * Hidden on screens smaller than lg breakpoint.
 * 
 * @param {string} heading - Main headline text (supports line breaks via JSX)
 * @param {string} description - Subheadline description paragraph
 * @param {string} backgroundImage - URL of the background image
 */
const AuthShowcase = ({
    heading = <>Design your dream <br />home with us.</>,
    description = "Experience bespoke craftsmanship and modern aesthetics tailored precisely to your living space.",
    backgroundImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuCuQDPPB3V8Uy4-R4OU0XiCFE0cMiterbCQphnFr1Cpqvd7K6Gr0QcpVMLxWDEO54hDqy-yj1ncq82fdgnwmr0oT5KQUFzYvW9nbOagaMloc0kpc3lCyrTPLmNxuiVIkQqvrU0zquHDk8rfUOZTpnzfYO_pfK1JD4e9uubUxfDZqG1ZIf6LERPFUMxIeGb0Ni2VIRg6mwnh8GOmxcIsgCjf78ZLQUhaK8WqsFSCMH0r3CsrYAJjqfFitfBA9eTvavZM9eLY7vNtUdzv",
}) => {
    return (
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary/10">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: `url('${backgroundImage}')` }}
                role="img"
                aria-label="Modern green velvet sofa in minimalist living room"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />

            {/* Content */}
            <div className="relative z-20 flex flex-col justify-between p-12 h-full text-white">
                {/* Top: Logo */}
                <Logo variant="light" />

                {/* Center / Bottom: Headline */}
                <div>
                    <h2 className="text-5xl font-bold leading-tight mb-4">{heading}</h2>
                    <p className="text-lg text-slate-200 max-w-md">{description}</p>
                </div>

                {/* Footer */}
                <div className="flex items-center gap-4 text-sm text-slate-300">
                    <span>© 2024 FurniCustom Inc.</span>
                    <span className="w-1 h-1 bg-slate-500 rounded-full" />
                    <span>Privacy Policy</span>
                </div>
            </div>
        </div>
    );
};

export default AuthShowcase;
