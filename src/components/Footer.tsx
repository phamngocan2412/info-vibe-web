import { useState } from 'react';
import { FaPaperPlane, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

import { useTranslation } from 'react-i18next';

export function Contact() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { name, email, message } = formData;
        const subject = encodeURIComponent(`Contact from ${name} - Info Vibe Web`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        window.location.href = `mailto:itisfuture2412@gmail.com?subject=${subject}&body=${body}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <section id="contact" className="py-20 bg-white dark:bg-transparent transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{t('contact.title')}</h2>
                    <p className="text-gray-500 dark:text-dark-muted">{t('contact.subtitle')}</p>
                    <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-4"></div>
                </div>
                {/* Contact Form */}
                <div className="max-w-2xl mx-auto bg-gray-50 dark:bg-dark-card rounded-2xl p-8 border border-gray-200 dark:border-dark-border shadow-2xl dark:shadow-none glow-effect">
                    <form onSubmit={handleSubmit}>
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{t('contact.name')}</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder-gray-400 dark:placeholder-gray-600"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{t('contact.email')}</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder-gray-400 dark:placeholder-gray-600"
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{t('contact.message')}</label>
                            <textarea
                                id="message"
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="w-full bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder-gray-400 dark:placeholder-gray-600"
                            ></textarea>
                        </div>
                        <button type="submit" className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-blue-500/20 transform hover:-translate-y-1 flex items-center justify-center">
                            <span>{t('contact.send')}</span> <FaPaperPlane className="ml-2" />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export function Footer() {
    const { t } = useTranslation();
    return (
        <footer className="bg-white dark:bg-transparent border-t border-gray-200 dark:border-dark-border py-10 transition-colors duration-300">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
                {/* Left Side */}
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Phạm Ngọc An</h3>
                    <p className="text-gray-500 dark:text-dark-muted text-sm">
                        {t('footer.copyright')}
                    </p>
                </div>

                {/* Right Side */}
                <div className="flex flex-col items-center md:items-end gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                        <FaPhoneAlt className="text-primary" />
                        <span>0896467610</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaEnvelope className="text-primary" />
                        <span>itisfuture2412@gmail.com</span>
                    </div>
                    <div className="mt-2 text-xs text-gray-400">
                        {t('footer.created_by')} <span className="font-bold text-primary">ANRO</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
