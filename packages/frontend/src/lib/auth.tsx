import { createForm } from '@felte/solid';
import {
  SelfServiceLoginFlow,
  SelfServiceRegistrationFlow,
  Session,
  SubmitSelfServiceLoginFlowBody,
  SubmitSelfServiceRegistrationFlowBody,
} from '@ory/kratos-client';
import { AxiosError } from 'axios';
import {
  Navigator,
  SetParams,
  useNavigate,
  useSearchParams,
} from 'solid-app-router';
import {
  Component,
  createContext,
  createEffect,
  createMemo,
  createResource,
  createSignal,
  ErrorBoundary,
  JSX,
  onMount,
  Resource,
  ResourceReturn,
  untrack,
  useContext,
} from 'solid-js';
import { ory } from './api.js';

function isAxiosError(error: any): error is AxiosError {
  return (error as AxiosError).isAxiosError;
}

function createReset(
  setFlowId: (id: string | undefined) => void,
  setParams: (p: SetParams) => void
): () => void {
  return () => {
    setParams({
      flow: undefined,
      refresh: undefined,
      aal: undefined,
      return_to: undefined,
    });
    setFlowId(undefined);
  };
}

function handleCommonError(error: any, reset: () => void) {
  if (isAxiosError(error)) {
    const navigate = useNavigate();
    switch (error.response?.data.error?.id) {
      case 'session_aal2_required':
      case 'session_refresh_required':
      case 'browser_location_change_required':
        navigate(error.response.data.redirect_browser_to as string, {
          resolve: false,
        });
        return;

      case 'session_already_available':
        navigate('/');
        return;

      case 'self_service_flow_return_to_forbidden':
        //setErrorMsg('The return_to address is not allowed.');
        reset();
        return;
      case 'self_service_flow_expired':
        /* setErrorMsg(
          'Your interaction expired, please fill out the form again.'
        ); */
        reset();
        return;

      case 'security_csrf_violation':
        /* setErrorMsg(
          'A security violation was detected, please fill out the form again.'
        ); */
        reset();
        return;
      case 'security_identity_mismatch':
        reset();
        return;

      default:
        break;
    }

    switch (error.response?.status) {
      case 410:
        reset();
        return;

      default:
        break;
    }
  }

  return false;
}

export const HandleFlowError: Component<{ fallback: JSX.Element }> = (
  props
) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <ErrorBoundary
      fallback={(err, reset) => {
        const r = () => {
          setSearchParams({
            flow: undefined,
            refresh: undefined,
            aal: undefined,
            return_to: undefined,
          });
          reset();
        };

        handleCommonError(err, r);
        return props.fallback;
      }}
    >
      {props.children}
    </ErrorBoundary>
  );
};

export function createSigninFlow(): {
  flow: Resource<SelfServiceLoginFlow | undefined>;
  form: (node: HTMLFormElement) => { destroy: () => void };
} {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [flow, { mutate }] = createResource(
    () => untrack(() => searchParams.flow ?? ''),
    async (id) => {
      if (id !== '') {
        return (await ory.getSelfServiceLoginFlow(id)).data;
      } else {
        return (
          await ory.initializeSelfServiceLoginFlowForBrowsers(
            Boolean(searchParams.refresh),
            searchParams.aal,
            searchParams.return_to
          )
        ).data;
      }
    }
  );

  const { form } = createForm<SubmitSelfServiceLoginFlowBody>({
    onSubmit: async (v, ctx) => {
      setSearchParams({ flow: flow()?.id });
      try {
        await ory.submitSelfServiceLoginFlow(flow()?.id ?? '', undefined, v);
      } catch (error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 400) {
            mutate(error.response?.data);
            return;
          }
        }
        throw error;
      }
      navigate(flow()?.return_to ?? '/');
      refetchSession();
    },
  });

  return {
    flow,
    form,
  };
}

export function createSignupFlow(): {
  flow: Resource<SelfServiceRegistrationFlow | undefined>;
  form: (node: HTMLFormElement) => { destroy: () => void };
} {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [flow, { mutate }] = createResource(
    () => untrack(() => searchParams.flow ?? ''),
    async (id) => {
      if (id !== '') {
        return (await ory.getSelfServiceRegistrationFlow(id)).data;
      } else {
        return (
          await ory.initializeSelfServiceRegistrationFlowForBrowsers(
            searchParams.return_to
          )
        ).data;
      }
    }
  );

  const { form } = createForm<SubmitSelfServiceRegistrationFlowBody>({
    onSubmit: async (v, ctx) => {
      setSearchParams({ flow: flow()?.id });
      try {
        await ory.submitSelfServiceRegistrationFlow(flow()?.id ?? '', v);
      } catch (error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 400) {
            mutate(error.response?.data);
            return;
          }
        }
        throw error;
      }
      navigate(flow()?.return_to ?? '/');
      refetchSession();
    },
  });

  return {
    flow,
    form,
  };
}

export function createSession(): ResourceReturn<Session | undefined> {
  const navigate = useNavigate();
  const res = createResource(async () => {
    try {
      const session = await ory.toSession();
      return session.data;
    } catch (error) {
      if (isAxiosError(error)) {
        switch (error.response?.status) {
          case 403:
          // This is a legacy error code thrown. See code 422 for
          // more details.
          // eslint-disable-next-line no-fallthrough
          case 422:
            // This status code is returned when we are trying to
            // validate a session which has not yet completed
            // it's second factor
            navigate('/login?aal=aal2');
            return;
          case 401:
            // do nothing, the user is not logged in
            return;
        }
      }
      throw error;
    }
  });
  return res;
}

export function createLogoutHandler() {
  const navigate = useNavigate();
  const [logout] = createResource(async () => {
    try {
      const response = await ory.createSelfServiceLogoutFlowUrlForBrowsers();
      return async () => {
        try {
          await ory.submitSelfServiceLogoutFlow(response.data.logout_token);
        } catch (error) {
          if (isAxiosError(error)) {
            if (error.response?.status === 401) {
              return;
            }
          }
          throw error;
        } finally {
          navigate('/');
          refetchSession();
        }
      };
    } catch (error) {
      if (isAxiosError(error)) {
        switch (error.response?.status) {
          case 401:
            // do nothing, the user is not logged in
            return;
        }
      }
      throw error;
    }
  });
  return logout;
}

export interface SessionCtx {
  session: Resource<Session | undefined>;
  logout: Resource<(() => Promise<void>) | undefined>;
}

const [defaultRes] = createResource(async () => undefined);
const SessionContext = createContext<SessionCtx>({
  session: defaultRes,
  logout: defaultRes,
});

let refetchSession: () => void = () => undefined;

export const SessionProvider: Component = (props) => {
  const [session, { refetch }] = createSession();
  refetchSession = refetch;
  const logout = createLogoutHandler();

  return (
    <SessionContext.Provider value={{ session, logout }}>
      {props.children}
    </SessionContext.Provider>
  );
};

export function useSession(): SessionCtx {
  return useContext<SessionCtx>(SessionContext);
}
