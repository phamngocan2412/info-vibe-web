import { useState, useCallback, memo } from 'react';
import { useTheme } from '../hooks/useTheme';
import { FaMoon, FaSun, FaBars } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useActiveSection } from '../hooks/useActiveSection';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NAV_ITEMS = ['home', 'about', 'experience', 'skills', 'projects'] as const;

function Header() {
    const { theme, toggleTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const activeSection = useActiveSection(['home', 'about', 'experience', 'skills', 'projects']);
    const navigate = useNavigate();

    const toggleLang = useCallback(() => {
        i18n.changeLanguage(i18n.language === 'vi' ? 'en' : 'vi');
    }, [i18n]);

    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(prev => !prev);
    }, []);

    const closeMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    return (
        <header className="fixed top-0 w-full z-50 bg-light-card/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-light-border dark:border-dark-border transition-colors duration-300">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate('/');
                    }}
                    className="text-2xl font-bold dark:text-white tracking-tighter hover:scale-105 transition-transform flex items-center gap-2" id="nav-logo">
                    <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full" loading="lazy" />
                    <span>&lt;ANRO<span className="text-primary">/</span>&gt;</span>
                </a>

                {/* Desktop Menu - Switch to lg to prevent overlap on tablets */}
                <nav className="hidden lg:flex space-x-1 xl:space-x-2">
                    {NAV_ITEMS.map((item) => (
                        <button
                            key={item}
                            onClick={() => {
                                navigate(item === 'home' ? '/' : `/${item}`);
                            }}
                            className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${activeSection === item
                                ? 'text-primary'
                                : 'text-gray-600 dark:text-gray-300'
                                }`}
                        >
                            {activeSection === item && (
                                <motion.span
                                    layoutId="activeSection"
                                    className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-lg -z-10"
                                    transition={{
                                        type: "spring",
                                        stiffness: 380,
                                        damping: 30
                                    }}
                                />
                            )}
                            {t(`nav.${item}`)}
                        </button>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    {/* Language Switcher */}
                    <button
                        onClick={toggleLang}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-card transition-colors text-sm font-bold text-primary"
                    >
                        {i18n.language.toUpperCase()}
                    </button>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-card transition-colors text-gray-600 dark:text-yellow-400"
                    >
                        {theme === 'light' ? <FaMoon /> : <FaSun />}
                    </button>

                    {/* Mobile Menu Button - Show on lg and below */}
                    <button
                        className="lg:hidden text-gray-900 dark:text-white focus:outline-none"
                        onClick={toggleMobileMenu}
                    >
                        <FaBars className="text-xl" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-light-card dark:bg-dark-bg border-b border-light-border dark:border-dark-border">
                    <nav className="flex flex-col p-4 space-y-4">
                        {NAV_ITEMS.map((item) => (
                            <button
                                key={item}
                                className={`text-left text-sm font-medium transition-colors hover:text-primary ${activeSection === item
                                    ? 'text-primary'
                                    : 'text-gray-600 dark:text-gray-300'
                                    }`}
                                onClick={() => {
                                    navigate(item === 'home' ? '/' : `/${item}`);
                                    closeMobileMenu();
                                }}
                            >
                                {t(`nav.${item}`)}
                            </button>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}

export default memo(Header);
