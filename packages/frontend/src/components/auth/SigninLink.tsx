import { Link, useLocation } from 'solid-app-router';
import type { Component } from 'solid-js';

export const SigninLink: Component = () => {
  const location = useLocation();
  const link = () => {
    return `/signin?return_to=${location.pathname}`;
  };
  return (
    <Link href={link()} class='btn btn-ghost hidden lg:inline-flex'>
      Sign in
    </Link>
  );
};
