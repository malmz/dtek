import type { Component } from 'solid-js';

const Missing: Component = () => {
  return (
    <main class=''>
      <div class='hero'>
        <div class='hero-content flex-col'>
          <h1 class='text-6xl font-bold'>404</h1>
          <p>The page could not be found</p>
        </div>
      </div>
    </main>
  );
};

export default Missing;
