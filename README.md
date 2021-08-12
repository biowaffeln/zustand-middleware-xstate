# zustand-middleware-xstate

This middleware allows you to easily put your [xstate](https://github.com/statelyai/xstate) state machines into a global [zustand](https://github.com/pmndrs/zustand) store.

## installation

```sh
npm install zustand-middleware-xstate zustand xstate
```

## usage

```tsx
import create from "zustand";
import { createMachine } from "xstate";
import xstate from "zustand-middleware-xstate";

// create your machine
const machine = createMachine({
  id: "machine",
  states: {
    // ...
  },
});

// create a hook using the xstate middleware
const useStore = create(xstate(machine));

// use the store in your components
const App = () => {
  const { state, send, service } = useStore();

  return <div>{state.value}</div>;
};
```

Or check out the [demo](https://biowaffeln.github.io/zustand-middleware-xstate/) for a working example.
