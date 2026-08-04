import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/language-switcher.css';

const LANGUAGES = [
  { code: 'mr', label: 'मरा' },
  { code: 'hi', label: 'हिं' },
  { code: 'en', label: 'EN' }
];

export default function LanguageSwitcher({ variant = 'default' }) {
  const { i18n } = useTranslation();

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('raktamitra_lang', code);
  };

  const wrapClass = variant === 'topbar' ? 'lang-switcher-topbar' : 'lang-switcher';

  return (
    <div className={wrapClass} role="group" aria-label="Language selector">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          type="button"
          className={i18n.language === lang.code ? 'active' : ''}
          onClick={() => changeLanguage(lang.code)}
          aria-pressed={i18n.language === lang.code}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
