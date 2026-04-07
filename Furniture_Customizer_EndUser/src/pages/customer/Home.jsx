import HeroSection from '../../components/home/HeroSection';
import CategoryGrid from '../../components/home/CategoryGrid';
import HowItWorks from '../../components/home/HowItWorks';
import Newsletter from '../../components/home/Newsletter';

/**
 * Home Page
 *
 * Main landing page for the FurniCustom customer application.
 * Assembles all homepage sections:
 *   - Navbar (sticky top navigation)
 *   - HeroSection (hero image + CTA)
 *   - CategoryGrid (shop by category)
 *   - HowItWorks (3-step process)
 *   - Newsletter (email subscription)
 *   - Footer (site footer)
 *
 * Route: /
 */
const Home = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-300">
            <HeroSection />
            <CategoryGrid />
            <HowItWorks />
            <Newsletter />
        </div>
    );
};

export default Home;
