import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { FaMoon, FaSun, FaBars } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useActiveSection } from '../hooks/useActiveSection';
import { motion } from 'framer-motion';

export default function Header() {
    const { theme, toggleTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const activeSection = useActiveSection(['home', 'about', 'experience', 'skills', 'projects']);

    const toggleLang = () => {
        i18n.changeLanguage(i18n.language === 'vi' ? 'en' : 'vi');
    };

    const navItems = ['home', 'about', 'experience', 'skills', 'projects'];

    return (
        <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-gray-200 dark:border-dark-border transition-colors duration-300">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#" className="text-2xl font-bold dark:text-white tracking-tighter hover:scale-105 transition-transform flex items-center gap-2" id="nav-logo">
                    <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full" />
                    <span>&lt;ANRO<span className="text-primary">/</span>&gt;</span>
                </a>

                <div className="flex items-center gap-6">
                    {/* Desktop Menu */}
                    <nav className="hidden md:flex space-x-2">
                        {navItems.map((item) => (
                            <a
                                key={item}
                                href={`#${item}`}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors relative z-10 ${activeSection === item
                                    ? 'text-primary'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
                                    }`}
                            >
                                {activeSection === item && (
                                    <motion.span
                                        layoutId="activeSection"
                                        className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full -z-10"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    ></motion.span>
                                )}
                                {t(`nav.${item}`)}
                            </a>
                        ))}
                    </nav>

                    {/* Settings Toggles */}
                    <div className="flex items-center gap-3 border-l pl-6 border-gray-300 dark:border-dark-border">
                        {/* Language Toggle */}
                        <button
                            onClick={toggleLang}
                            className="w-8 h-8 rounded-full bg-gray-200 dark:bg-dark-card dark:border dark:border-dark-border flex items-center justify-center text-xs font-bold hover:bg-gray-300 dark:hover:border-primary transition-all text-gray-700 dark:text-white uppercase"
                        >
                            {i18n.language}
                        </button>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="w-8 h-8 rounded-full bg-gray-200 dark:bg-dark-card dark:border dark:border-dark-border flex items-center justify-center hover:bg-gray-300 dark:hover:border-yellow-500 transition-all text-yellow-500 dark:text-yellow-400"
                        >
                            {theme === 'dark' ? <FaSun /> : <FaMoon />}
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-gray-900 dark:text-white focus:outline-none"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <FaBars className="text-xl" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-dark-bg border-b border-gray-200 dark:border-dark-border">
                    <nav className="flex flex-col p-4 space-y-4">
                        {navItems.map((item) => (
                            <a
                                key={item}
                                href={`#${item}`}
                                className={`block ${activeSection === item ? 'text-primary font-bold' : 'hover:text-primary dark:text-gray-300'}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t(`nav.${item}`)}
                            </a>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
