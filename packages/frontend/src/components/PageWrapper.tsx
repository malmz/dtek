import { Outlet } from 'solid-app-router';
import { Component, Suspense } from 'solid-js';
import { SessionProvider } from '../auth.jsx';
import { Footer } from './Footer.jsx';
import { Navbar } from './Navbar.jsx';

export const PageWrapper: Component = () => {
  return (
    <SessionProvider>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </SessionProvider>
  );
};
