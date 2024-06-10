import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from './shared/languages/en.json'
import esTranslation from './shared/languages/es.json'
import deTranslation from './shared/languages/de.json'
// import LanguageDetector from "i18next-browser-languagedetector";

let fallbackLanguage = "en";

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: fallbackLanguage,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: enTranslation,
    },
    es: {
      translation: esTranslation,
    },
    de: {
      translation: deTranslation,
    }
  },
});

export const changeFallbackLanguage = (language) => {
  fallbackLanguage = language;
  i18n.changeLanguage(language); // Change the current language to the selected language
  i18n.options.fallbackLng = language; // Update the fallback language
};

export default i18n;
