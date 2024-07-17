# zustand-middleware-xstate

This middleware allows you to easily put your [XState](https://github.com/statelyai/xstate) state machines into a global [zustand](https://github.com/pmndrs/zustand) store.

## installation

```sh
npm install zustand-middleware-xstate zustand xstate
```

## usage

```tsx
import create from "zustand";
import { setup } from "xstate";
import xstate from "zustand-middleware-xstate";

type Events = {
  // ...
};

// create your machine
const machine = setup({
  types: {
    events: {} as Events,
  },
}).createMachine({
  id: "machine",
  states: {
    // ...
  },
});

// create a hook using the xstate middleware
const useStore = create(xstate(machine));

// use the store in your components
const App = () => {
  const { state, send, actor } = useStore();

  return <div>{state.value}</div>;
};
```

Or check out the [demo](https://biowaffeln.github.io/zustand-middleware-xstate/) for a working example.

## selectors

You can also use zustand's selector feature to get slices of the state and avoid unnecessary re-renders. For example:

```tsx
const context = useStore((s) => s.state.context);
```

This hook will only re-render when the context changes. See the [zustand docs](https://github.com/pmndrs/zustand#selecting-multiple-state-slices) for more details.

## actor options

You can hand over a second argument to `xstate` function (from this library). This is forwarded to the actor of xstate, thus, things like `devTools` can be enabled.
