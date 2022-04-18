import { Link } from 'solid-app-router';
import { Component, Match, Show, Suspense, Switch } from 'solid-js';
import { createSignupFlow, HandleFlowError } from '../auth.jsx';
import { Flow } from '../components/Flow.jsx';

const Registration: Component = () => {
  const { flow, form } = createSignupFlow();

  const placeholderForm = <span>Loading form...</span>;

  return (
    <div class='hero min-h-screen bg-base-200'>
      <div class='hero-content flex-col w-full max-w-md'>
        <Link href='/'>
          <img src='/src/assets/logo.svg' alt='logo' class='w-14' />
        </Link>

        <div class='text-center'>
          <h1 class='text-2xl font-normal'>Sign In to Dtek</h1>
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
          <span>Already have an account? </span>
          <Link href='/singin' class='btn-link'>
            Signin
          </Link>
          <span>.</span>
        </div>
      </div>
    </div>
  );
};

export default Registration;
