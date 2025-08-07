import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { enTranslations } from './translations/en';
import { roTranslations } from './translations/ro';
import { ruTranslations } from './translations/ru';
i18n
    .use(initReactI18next)
    .init({
    resources: {
        en: {
            translation: enTranslations,
        },
        ro: {
            translation: roTranslations,
        },
        ru: {
            translation: ruTranslations,
        },
    },
    lng: 'ro',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});
export default i18n;
