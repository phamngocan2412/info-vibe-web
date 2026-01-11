import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import vi from './locales/vi.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            vi: { translation: vi },
        },
        lng: 'vi', // Default language
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
