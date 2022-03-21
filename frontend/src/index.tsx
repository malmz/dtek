/* @refresh reload */
import { I18nProvider } from '@amoutonbrady/solid-i18n';
import { Router } from 'solid-app-router';
import { render } from 'solid-js/web';
import './index.css';
import dictEn from '../locales/en.json';
import { App } from './App';

const dict = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  en: dictEn,
};

render(
  () => (
    <Router base={import.meta.env.BASE_URL}>
      <I18nProvider dict={dict}>
        <App />
      </I18nProvider>
    </Router>
  ),
  document.getElementById('root') as HTMLElement
);
