import { Outlet } from 'solid-app-router';
import { Component } from 'solid-js';
import { SessionProvider } from '../lib/auth.jsx';
import { Footer } from '../components/content/Footer.jsx';
import { Navbar } from '../components/Navbar.jsx';

const PageWrapper: Component = () => {
  return (
    <SessionProvider>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </SessionProvider>
  );
};

export default PageWrapper;
