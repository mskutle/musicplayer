import { setup } from "xstate";
import { Track } from "./track";

export const musicPlayerMachine = setup({
  types: {} as {
    context: {
      elapsed: number;
      track: Track | null;
    };
    events: { type: "TOGGLE_PLAY" } | { type: "PLAY"; track: Track };
  },
  actions: {
    logError: ({ event }) => {
      console.log(event);
    },
  },
}).createMachine({
  id: "music-player",
  initial: "paused",
  context: {
    elapsed: 0,
    track: null,
  },
  states: {
    playing: {
      invoke: {
        src: "play",
        onError: { target: "error" },
      },
      on: {
        TOGGLE_PLAY: { target: "paused" },
      },
    },
    paused: {
      on: {
        TOGGLE_PLAY: { target: "playing" },
      },
    },
    error: {
      entry: "logError",
    },
  },
});
