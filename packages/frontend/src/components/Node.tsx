/* eslint-disable @typescript-eslint/no-implied-eval */
/* eslint-disable no-new-func */
import { createField } from '@felte/solid';
import type {
  UiNode,
  UiNodeInputAttributes,
  UiNodeMeta,
  UiNodeScriptAttributes,
} from '@ory/kratos-client';
import type { Component, JSX } from 'solid-js';
import { createMemo, Switch, Match } from 'solid-js';
import { Portal } from 'solid-js/web';
import { isUiNodeInputAttributes, isUiNodeScriptAttributes } from '../utils';

type CrossOrigin = 'anonymous' | 'use-credentials' | '';
type ReferrerPolicy =
  | 'no-referrer'
  | 'no-referrer-when-downgrade'
  | 'origin'
  | 'origin-when-cross-origin'
  | 'same-origin'
  | 'strict-origin'
  | 'strict-origin-when-cross-origin'
  | 'unsafe-url';

const SubmitField: Component<
  { name: string } & JSX.ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { field, onBlur, onInput } = createField(props.name);
  return (
    <div class='form-control'>
      <button
        ref={field}
        onclick={() => onInput(props.value)}
        onBlur={onBlur}
        {...props}
      >
        {props.children}
      </button>
    </div>
  );
};

const InputNode: Component<{
  meta: UiNodeMeta;
  attributes: UiNodeInputAttributes;
}> = (props) => {
  const type = () => props.attributes.type;
  const label = () =>
    props.attributes.label?.text ?? props.meta.label?.text ?? '';
  const name = () => props.attributes.name;
  const value = () => props.attributes.value as string;
  const disabled = () => props.attributes.disabled;

  const autocomplete = () => {
    switch (name()) {
      case 'identifier':
        return 'username';
      case 'password':
        return 'current-password';
      default:
        return undefined;
    }
  };

  const onClick = createMemo(() => {
    return () => {
      if (props.attributes.onclick) {
        const func = new Function(props.attributes.onclick);
        func();
      }
    };
  });

  const textenrty = (
    <div class='form-control'>
      <label class='label'>
        <span class='label-text'>{label()}</span>
      </label>
      <input
        type={type()}
        name={name()}
        value={value()}
        disabled={disabled()}
        onclick={onClick()}
        autocomplete={autocomplete()}
        class='input input-bordered input-primary'
      ></input>
    </div>
  );

  return (
    <Switch fallback={textenrty}>
      <Match when={type() === 'hidden'}>
        <input type='hidden' name={name()} value={value() ?? 'true'}></input>
      </Match>
      <Match when={type() === 'checkbox'}>
        <div class='form-control'>
          <label class='label cursor-pointer'>
            <span>{label()}</span>
            <input
              type='checkbox'
              name={name()}
              disabled={disabled()}
              checked={value() === 'true'}
            ></input>
          </label>
        </div>
      </Match>
      <Match when={type() === 'button'}>
        <div class='form-control'>
          <input
            type='button'
            name={name()}
            value={value()}
            disabled={disabled()}
            class='btn'
            onclick={onClick()}
          >
            {label()}
          </input>
        </div>
      </Match>
      <Match when={type() === 'submit'}>
        <SubmitField
          type='submit'
          class='btn btn-primary text-primary-content'
          name={name()}
          disabled={disabled()}
          value={value()}
        >
          {label()}
        </SubmitField>
      </Match>
    </Switch>
  );
};

const ScriptNode: Component<{ attributes: UiNodeScriptAttributes }> = (
  props
) => {
  return (
    <Portal mount={document.body}>
      <script
        src={props.attributes.src}
        async={props.attributes.async}
        crossorigin={props.attributes.crossorigin as CrossOrigin}
        integrity={props.attributes.integrity}
        referrerpolicy={props.attributes.referrerpolicy as ReferrerPolicy}
        type={props.attributes.type}
      ></script>
    </Portal>
  );
};

// eslint-disable-next-line no-shadow
export const Node: Component<{ node: UiNode }> = (props) => {
  return (
    <Switch>
      <Match when={isUiNodeInputAttributes(props.node.attributes)}>
        <InputNode
          attributes={props.node.attributes as UiNodeInputAttributes}
          meta={props.node.meta}
        />
      </Match>
      <Match when={isUiNodeScriptAttributes(props.node.attributes)}>
        <ScriptNode
          attributes={props.node.attributes as UiNodeScriptAttributes}
        ></ScriptNode>
      </Match>
    </Switch>
  );
};
