import React, { ComponentProps, FC } from "react";
import { createMachine } from "xstate";
import xstate from "../lib/xstate";
import create from "zustand";
import cx from "classnames";

type Context = {};

type Events = { type: "TIMER" | "DISABLE" | "ENABLE" };

type States = {
  value: "red" | "redYellow" | "yellow" | "green" | "disabled";
  context: Context;
};

const lightMachine = createMachine<Context, Events, States>({
  id: "light",
  initial: "green",
  states: {
    red: {
      on: { TIMER: "redYellow", DISABLE: "disabled" },
    },
    redYellow: {
      on: { TIMER: "green", DISABLE: "disabled" },
    },
    green: {
      on: { TIMER: "yellow", DISABLE: "disabled" },
    },
    yellow: {
      on: { TIMER: "red", DISABLE: "disabled" },
    },
    disabled: {
      on: { ENABLE: "red" },
    },
  },
});

const useStore = create(xstate(lightMachine));

export const App: FC = () => {
  const { state, send } = useStore();

  const isRed = state.matches("red") || state.matches("redYellow");
  const isYellow = state.matches("yellow") || state.matches("redYellow");
  const isGreen = state.matches("green");

  return (
    <div className="container mx-auto px-5 flex flex-col items-center">
      <h1 className="text-center font-bold text-4xl mt-10">
        xstate-zustand-middleware demo
      </h1>
      <p className="text-center text-xl mt-2">
        check out the{" "}
        <a
          href="https://github.com/biowaffeln/zustand-middleware-xstate/blob/master/src/app.tsx"
          className="text-blue-600 underline"
        >
          source code
        </a>{" "}
        for this example
      </p>
      <div className="max-w-sm mt-16 flex justify-center space-x-10">
        <div
          className="bg-gray-800 w-32
                     rounded py-6 space-y-4 shadow-xl
                     flex flex-col justify-between items-center"
        >
          <Light color="bg-red-500" on={isRed} />
          <Light color="bg-yellow-300" on={isYellow} />
          <Light color="bg-green-500" on={isGreen} />
        </div>
        <div className="w-32 py-6">
          <p className="text-gray-600 font-semibold">state</p>
          <p className="text-3xl leading-none">{state.value}</p>
          <p className="text-gray-600 font-semibold mt-6">events</p>
          <div className="mt-2.5 space-y-2">
            <Button onClick={() => send("TIMER")}>timer</Button>
            <Button onClick={() => send("DISABLE")}>disable</Button>
            <Button onClick={() => send("ENABLE")}>enable</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Button: FC<ComponentProps<"button">> = (props) => (
  <button
    className="px-3 py-1 rounded text-gray-700 border-gray-400 bg-gray-200 font-semibold
               hover:bg-gray-300 transition-colors duration-200"
    {...props}
  ></button>
);

const Light: FC<{ color: string; on: boolean }> = (props) => {
  return (
    <div
      className={cx(
        "w-20 h-20 rounded-full transition-colors duration-500",
        props.on ? props.color : "bg-gray-700"
      )}
    />
  );
};
