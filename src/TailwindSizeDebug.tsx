import type { Component } from 'solid-js';

export const TailwindSizeDebug: Component = () => {
  return (
    <>
      <p>No size</p>
      <p class='invisible sm:visible'>Small size</p>
      <p class='invisible md:visible'>Medium size</p>
      <p class='invisible lg:visible'>Large size</p>
      <p class='invisible xl:visible'>Extra large size</p>
      <p class='invisible 2xl:visible'>Extra extra large size</p>
    </>
  );
};
