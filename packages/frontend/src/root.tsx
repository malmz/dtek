/* @refresh reload */
import { Router, useRoutes } from 'solid-app-router';
import { ErrorBoundary, Suspense } from 'solid-js';
import { render } from 'solid-js/web';
import './index.css';
import dictEn from '../locales/en.json';
import { createI18nContext, I18nContext } from '@solid-primitives/i18n';
import { MetaProvider } from 'solid-meta';
import { routes } from './routes.js';

const dict = {
  en: dictEn,
};

const value = createI18nContext(dict);
const Routes = useRoutes(routes);

render(
  () => (
    <Router base={import.meta.env.BASE_URL}>
      <I18nContext.Provider value={value}>
        <MetaProvider>
          <div class='flex min-h-screen flex-col justify-between'>
            <Suspense>
              <ErrorBoundary fallback={<span>Something went wrong...</span>}>
                <Routes></Routes>
              </ErrorBoundary>
            </Suspense>
          </div>
        </MetaProvider>
      </I18nContext.Provider>
    </Router>
  ),
  document.getElementById('root') as HTMLElement
);
