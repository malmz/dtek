import type { AxiosError } from 'axios';
import { Link } from 'solid-app-router';
import type { Component } from 'solid-js';
import { Show, Suspense, createResource } from 'solid-js';
import { ory } from '../../lib/api';

const Auth: Component = () => {
  const [session] = createResource(async () => {
    try {
      const data = await ory.toSession();
      const s = data.data;
      return s;
    } catch (e) {
      switch ((e as AxiosError).response?.status) {
        case 401:
          return undefined;
        default:
          throw e;
      }
    }
  });

  const fallback = (
    <div>
      <p>You are not logged in.</p>
      <Link href='/login' class='link'>
        Login
      </Link>
    </div>
  );

  return (
    <div>
      <h1>Auth Testing</h1>
      <Suspense fallback={<div>Loading session...</div>}>
        <Show when={session() != null} fallback={fallback}>
          <div>{JSON.stringify(session())}</div>
        </Show>
      </Suspense>
    </div>
  );
};

export default Auth;
