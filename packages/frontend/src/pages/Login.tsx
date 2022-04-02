/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createForm } from '@felte/solid';
import type {
  SelfServiceLoginFlow,
  SubmitSelfServiceLoginFlowBody,
} from '@ory/kratos-client';
import type { AxiosError } from 'axios';
import { useNavigate, useSearchParams } from 'solid-app-router';
import type { Component } from 'solid-js';
import {
  createSignal,
  onMount,
  untrack,
  Show,
  Suspense,
  createResource,
} from 'solid-js';
import { ory } from '../api';
import { Flow } from '../components/Flow';

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
      const fetcher =
        id !== ''
          ? // We are in a flow already
            ory.getSelfServiceLoginFlow(id)
          : // Create a new flow
            ory.initializeSelfServiceLoginFlowForBrowsers(
              refresh(),
              aal(),
              returnTo()
            );

      const res = await fetcher;

      return res.data;
    } catch (error) {
      /* console.error(error);
      if (id !== '') {
        setSearchParams({
          flow: undefined,
          refresh: undefined,
          aal: undefined,
          // eslint-disable-next-line camelcase
          return_to: undefined,
        });
      } */
      // eslint-disable-next-line no-use-before-define
      handleError(error as AxiosError);
      return undefined;
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
      // eslint-disable-next-line camelcase
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
        return;

      default:
        break;
    }

    throw err;
  };

  const fallback = (
    <div>
      <p>Error no flow</p>
    </div>
  );

  const { form, setFields } = createForm<SubmitSelfServiceLoginFlowBody>({
    onSubmit: async (v, ctx) => {
      const flowL = flow()!;

      setSearchParams({ flow: flow()!.id });

      try {
        const res = await ory.submitSelfServiceLoginFlow(
          flowL.id,
          undefined,
          v
        );
      } catch (error) {
        handleError(error as AxiosError);
      }

      if (flowL.return_to) {
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

  return (
    <div>
      <Suspense fallback={<div>Loading session...</div>}>
        <Show when={flow() != null} fallback={fallback}>
          <div class='card m-8 mx-auto max-w-lg bg-base-200 shadow-lg'>
            <div class='card-body'>
              <Flow flow={flow()!} form={form} setSubmit={setSubmit}></Flow>
            </div>
          </div>
          <pre>{JSON.stringify(flow(), undefined, 2)}</pre>
        </Show>
      </Suspense>
    </div>
  );
};

export default Login;
