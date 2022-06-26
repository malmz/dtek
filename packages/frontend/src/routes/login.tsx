import { Link } from 'solid-app-router';
import {
  Component,
  ErrorBoundary,
  Match,
  Show,
  Suspense,
  Switch,
} from 'solid-js';
import { createSigninFlow, HandleFlowError } from '../lib/auth.jsx';
import { Flow } from '../components/auth/Flow.jsx';

const Signin: Component = () => {
  const { flow, form } = createSigninFlow();

  const placeholderForm = <span>Loading form...</span>;

  return (
    <div class='hero min-h-screen bg-base-200'>
      <div class='hero-content flex-col w-full max-w-md'>
        <Link href='/'>
          <img src='/images/logo.svg' alt='logo' class='w-14' />
        </Link>

        <div class='text-center'>
          <Show
            when={!flow.error}
            fallback={<h1 class='text-2xl font-normal'>Sign In to Dtek</h1>}
          >
            <Switch
              fallback={<h1 class='text-2xl font-normal'>Sign In to Dtek</h1>}
            >
              <Match when={flow()?.refresh}>
                <h1 class='text-5xl font-bold'>Confirm Action</h1>
              </Match>
              <Match when={flow()?.requested_aal === 'aal2'}>
                <h1 class='text-5xl font-bold'>Two-Factor Authentication</h1>
              </Match>
            </Switch>
          </Show>
        </div>

        <HandleFlowError fallback={<div>Someting went wrong...</div>}>
          <div class='card w-full bg-base-100 shadow-lg'>
            <div class='card-body'>
              <Suspense fallback={placeholderForm}>
                <Flow flow={flow()} form={form}></Flow>
              </Suspense>
            </div>
          </div>
        </HandleFlowError>

        <div class='border-2 rounded-lg border-base-300 w-full p-4 text-center mt-4'>
          <span>No account? </span>
          <Link href='/singup' class='link'>
            Create an account
          </Link>
          <span>.</span>
        </div>
      </div>
    </div>
  );
};

export default Signin;
