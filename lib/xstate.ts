import { interpret } from "xstate";
import type { StateMachine, Interpreter } from "xstate";
import type { StoreApi } from "zustand";

export type Store<M> = M extends StateMachine<
  infer Context,
  infer Schema,
  infer Event,
  infer State,
  infer _A,
  infer _B,
  infer _C
>
  ? {
      state: Interpreter<Context, Schema, Event, State>["state"];
      send: Interpreter<Context, Schema, Event, State>["send"];
      service: Interpreter<Context, Schema, Event, State>;
    }
  : never;

const xstate =
  <M extends StateMachine<any, any, any, any, any, any, any>>(machine: M, interpreterOptions? : Record<any,any>) =>
  (set: StoreApi<Store<M>>["setState"]): Store<M> => {
    const service = interpret(machine, interpreterOptions)
      .onTransition((state) => {
        const initialStateChanged =
          state.changed === undefined && Object.keys(state.children).length;

        if (state.changed || initialStateChanged) {
          set({ state } as Partial<Store<M>>);
        }
      })
      .start();

    return {
      state: service.getSnapshot(),
      send: service.send,
      service,
    } as Store<M>;
  };

export default xstate;
