import { StateMachine, SnapshotFrom, EventFromLogic, createActor, Actor } from "xstate";
import type { StoreApi } from "zustand";

export type Store<M extends StateMachine<any, any, any, any, any, any, any, any, any, any, any>> = {
  state: SnapshotFrom<M>;
  send: (event: EventFromLogic<M>) => void;
  actor: Actor<M>;
};

const xstate =
  <M extends StateMachine<any, any, any, any, any, any, any, any, any, any, any>>(
    machine: M,
    actorOptions?: Actor<M>["options"]
  ) =>
  (set: StoreApi<Store<M>>["setState"]): Store<M> => {
    const actor = createActor(machine, actorOptions).start();
    actor.subscribe((state) => {
      set({ state });
    });

    return {
      state: actor.getSnapshot(),
      send: actor.send,
      actor,
    } as Store<M>;
  };

export default xstate;
