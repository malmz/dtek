import { useI18n } from '@solid-primitives/i18n';
import type { Component } from 'solid-js';

export const Welcome: Component = () => {
  const [t] = useI18n();

  return (
    <div class='hero min-h-[65vh] bg-[url(./src/assets/welcome.jpeg)]'>
      <div class='hero-overlay backdrop-blur-sm backdrop-brightness-50'></div>
      <div class='hero-content text-neutral-content py-16'>
        <div class='max-w-lg'>
          <h2 class='text-3xl sm:text-5xl'>
            <span class='text-primary'>{t('welcome.bang')}</span>{' '}
            {t('welcome.title')}
          </h2>
          <p class='py-4'>{t('welcome.portal')}</p>
          <p class='py-4'>{t('welcome.division')}</p>
        </div>
      </div>
    </div>
  );
};
