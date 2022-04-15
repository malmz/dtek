/* @refresh reload */
import { Router } from 'solid-app-router';
import { render } from 'solid-js/web';
import './index.css';
import dictEn from '../locales/en.json';
import { App } from './App';
import { createI18nContext, I18nContext } from '@solid-primitives/i18n';

const dict = {
  en: dictEn,
};

const value = createI18nContext(dict);

render(
  () => (
    <Router base={import.meta.env.BASE_URL}>
      <I18nContext.Provider value={value}>
        <App />
      </I18nContext.Provider>
    </Router>
  ),
  document.getElementById('root') as HTMLElement
);
