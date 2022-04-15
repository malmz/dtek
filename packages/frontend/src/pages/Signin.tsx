import { createForm } from '@felte/solid';
import type {
  SelfServiceLoginFlow,
  SubmitSelfServiceLoginFlowBody,
} from '@ory/kratos-client';
import { AxiosError } from 'axios';
import { Link, useNavigate, useSearchParams } from 'solid-app-router';
import { Component, Match, Switch } from 'solid-js';
import { Show, Suspense, createResource } from 'solid-js';
import { ory } from '../api';
import { Flow } from '../components/Flow';

function isAxiosError(error: any): error is AxiosError {
  return (error as AxiosError).isAxiosError;
}

const Login: Component = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const refresh = () => Boolean(searchParams.refresh);
  const aal = () => searchParams.aal;
  const returnTo = () => searchParams.return_to;
  const flowId = () => searchParams.flow ?? '';

  const [flow, { refetch, mutate }] = createResource<
    SelfServiceLoginFlow | undefined,
    string
  >(flowId, async (id, { value }) => {
    if (id === value?.id) {
      return value;
    }
    try {
      const res = await (id !== ''
        ? // We are in a flow already
          ory.getSelfServiceLoginFlow(id)
        : // Create a new flow
          ory.initializeSelfServiceLoginFlowForBrowsers(
            refresh(),
            aal(),
            returnTo()
          ));

      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        handleError(error);
      }
      throw error;
    }
  });

  const reset = () => {
    if (flowId() === '') {
      refetch();
    }
    setSearchParams({
      flow: undefined,
      refresh: undefined,
      aal: undefined,
      return_to: undefined,
    });
  };

  const handleError = (err: AxiosError) => {
    switch (err.response?.data.error?.id) {
      case 'session_aal2_required':
      case 'session_refresh_required':
      case 'browser_location_change_required':
        navigate(err.response.data.redirect_browser_to as string, {
          resolve: false,
        });
        return;

      case 'session_already_available':
        navigate('/');
        return;

      case 'self_service_flow_return_to_forbidden':
      case 'self_service_flow_expired':
      case 'security_csrf_violation':
      case 'security_identity_mismatch':
        reset();
        return;

      default:
        break;
    }

    switch (err.response?.status) {
      case 410:
        reset();
        break;

      case 400:
        mutate(err.response.data);
        break;

      default:
        break;
    }

    throw err;
  };

  const { form, setFields } = createForm<SubmitSelfServiceLoginFlowBody>({
    onSubmit: async (v, ctx) => {
      const flowL = flow();

      setSearchParams({ flow: flowL?.id });

      try {
        const res = await ory.submitSelfServiceLoginFlow(
          flowL?.id ?? '',
          undefined,
          v
        );
      } catch (error) {
        if (isAxiosError(error)) {
          handleError(error);
        }
        throw error;
      }

      if (flowL?.return_to) {
        navigate(flowL.return_to);
      } else {
        navigate('/');
      }
    },
  });

  const setSubmit = (name: string, value: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFields(name as any, value);
  };

  const placeholderForm = (
    <div class='flex animate-pulse'>
      <div class='bg-base-300 h-8 flex-1 rounded'></div>
    </div>
  );

  return (
    <div class='flex mx-auto max-w-lg flex-col'>
      <div class='card bg-base-200 shadow-lg'>
        <div class='card-body'>
          <h2 class='card-title justify-center'>
            <Switch fallback={'Sign In'}>
              <Match when={flow()?.refresh}>Confirm Action</Match>
              <Match when={flow()?.requested_aal === 'aal2'}>
                Two-Factor Authentication
              </Match>
            </Switch>
          </h2>
          <div class='card-actions justify-end'></div>
          <Suspense fallback={placeholderForm}>
            <Flow flow={flow()} form={form} setSubmit={setSubmit}></Flow>
          </Suspense>
        </div>
      </div>

      <Link href='/singup' class='btn btn-primary'>
        Sign up
      </Link>
    </div>
  );
};

export default Login;
