import { useReducer } from "react";

type State = "lit" | "unlit" | "broken";

type Event = "BREAK" | "TOGGLE";

type NextStateGraph = {
  [key in State]: {
    [key in Event]?: State;
  };
};

const reducer = (state: State, event: Event) => {
  const nextState = NEXT_STATE_GRAPH[state][event] as State | undefined;
  return nextState !== undefined ? nextState : state;
};

const NON_RESPONSIVE_EVENTS: { [key in Event]: undefined } = {
  BREAK: undefined,
  TOGGLE: undefined,
};

const NEXT_STATE_GRAPH: NextStateGraph = {
  lit: {
    ...NON_RESPONSIVE_EVENTS,
    BREAK: "broken",
    TOGGLE: "unlit",
  },
  unlit: {
    ...NON_RESPONSIVE_EVENTS,
    BREAK: "broken",
    TOGGLE: "lit",
  },
  broken: {
    ...NON_RESPONSIVE_EVENTS,
  },
};

function LightBulb() {
  const [state, send] = useReducer(reducer, "unlit");

  return (
    <div>
      State: {state}
      <button type="button" onClick={() => send("TOGGLE")}>
        Toggle
      </button>
      <button type="button" onClick={() => send("BREAK")}>
        Break
      </button>
    </div>
  );
}

export default LightBulb;
