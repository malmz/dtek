import type { Component } from 'solid-js';

export const Footer: Component = () => {
  return (
    <footer class='footer mt-auto bg-base-200 p-10 text-base-content'>
      <div>
        <img
          class='aspect-square h-14 grayscale'
          src='https://dtek.se/static/datalogo.svg'
          alt='Datas logo'
        />
        <p>Developed by Cral</p>
      </div>
      <div>
        <span class='footer-title'>Contact</span>
        <a href='mailto:styret@dtek.se' class='link link-hover'>
          Styret
        </a>
      </div>
      <div>
        <span class='footer-title'>Services</span>
        <a href='https://wiki.dtek.se' class='link link-hover'>
          Wiki
        </a>
      </div>
    </footer>
  );
};
