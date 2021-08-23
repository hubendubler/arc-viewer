import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';

import de from './de.json';
import en from './en.json';

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: true,

        resources: {
            de,
            en,
        },

        interpolation: {
            escapeValue: false,
        },
    })
    .catch((error) => {
        console.warn('Could not initialise translation services:', error);
    });

// eslint-disable-next-line import/no-default-export
export default i18n;
