import type { Component } from 'solid-js';

export const Welcome: Component = () => {
  return (
    <div class='hero min-h-[65vh] bg-[url(./src/assets/welcome.jpeg)]'>
      <div class='hero-overlay backdrop-blur-sm backdrop-brightness-50'></div>
      <div class='hero-content text-neutral-content'>
        <div class='max-w-lg'>
          <h2 class='text-5xl'>
            <span class='text-primary'>Welcome</span> to computer science and
            enginering at Chalmers!
          </h2>
          <p class='py-4'>
            This is the Dtek portal, containing useful links and infromation
            about studen life at chalmers. Here you can read about upcomming
            events, find out whats for lunch and much more.
          </p>
          <p class='py-4'>
            Datateknologssektionen is a non-profit organisation whos mission is
            to improve student life for all studens in the computer science and
            enginering program. We organize the opening weeks for new studens,
            thow parties, bring student feedback to Chalmers and lots more.
          </p>
        </div>
      </div>
    </div>
  );
};
