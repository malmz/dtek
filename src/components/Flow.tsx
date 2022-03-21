import type {
  SelfServiceLoginFlow,
  SubmitSelfServiceLoginFlowBody,
  UiContainer,
} from '@ory/kratos-client';
import type { Component } from 'solid-js';
import { For } from 'solid-js';
import { directive } from '../utils';
import { Node } from './Node';

type Method = 'post' | 'get' | 'dialog';

export type FormDirective = (node: HTMLFormElement) => { destroy: () => void };

export const Flow: Component<{
  flow: { ui: UiContainer };
  form: FormDirective;
  setSubmit: (name: string, value: string) => void;
}> = (props) => {
  const nodes = () => props.flow.ui.nodes;

  return (
    <form
      action={props.flow.ui.action}
      method={props.flow.ui.method as Method}
      ref={props.form}
      class='form-control gap-2'
    >
      <For each={nodes()}>
        {(node) => {
          return <Node node={node}></Node>;
        }}
      </For>
    </form>
  );
};
