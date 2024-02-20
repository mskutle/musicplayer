import { assertEvent, assign, fromPromise, setup } from "xstate";
import { Track } from "./track";

const loadTrack = fromPromise(({ input }: { input: { track: Track } }) => {
  return Promise.resolve({
    audio: new Audio(input.track.source),
    track: input.track,
  });
});

const playCurrentTrack = fromPromise(
  async ({ input }: { input: { audio: HTMLAudioElement } }) => {
    return input.audio.play();
  }
);

const pause = fromPromise(
  async ({ input }: { input: { audio: HTMLAudioElement } }) => {
    return input.audio.pause();
  }
);

export const audioMachine = setup({
  types: {} as {
    context: {
      audio: HTMLAudioElement;
      tracks: Track[];
      currentTrack: Track;
      elapsed: number;
    };
    input: { tracks: Track[] };
    events:
      | { type: "PLAY"; track?: Track }
      | { type: "PAUSE" }
      | { type: "TIME_TICK"; params: { elapsed: number } };
  },
  actors: { loadTrack, playCurrentTrack, pause },
  actions: {
    updateTime: assign(({ event }) => {
      assertEvent(event, "TIME_TICK");
      return { elapsed: Math.floor(event.params.elapsed) };
    }),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuECWB7AtAW2QGMALDAOzADoMIAbMAYgAUAZAQQE0BtABgF1EoAA5ZYGAC7YygkAA9EARgBMANgA0IAJ6IlATgDMlJQv0B2Hvt0AWKwoVXTVgL5ONaTLgIlyVIWliQDGAATsFYwZRCtMjiAGbheJTu2PhEpBSR-pAI5ABuWIQxUrx8JTIiYpJY0khyispKlCo8BqYArBraCPpWukam+m26uqajNgAcCi5u6Cle6b5ZEMzs3PzlohJSMvII420KlLo8KkodWoj6CjxNx6oqNrb2jtMgyZ5pPpHRmuRQzGwAKoAZQAomVahUttUdohxrYmmdOpcVIcFHcVA8bHYHM5XG9Zh9vBkoshfmR-gAVACSAFlQQB9GkAYQA0hDhJsqjVQLsHipKBZlOcukpjJR9EoeLjRo4rJNXu9UsSqLQsMhMBTKcEiABrBgQapUPJYXVUJXzL5qjV-bV6nJkfKFbklDkgKHc2EIKx6REiy5XW48e6PHEvfEWz4Za2aqB2wj6kJhCKkuIJJKE5ULSgx206hMOp1Faqu9aQrnbWq7H19U7+hDXRo8cwysbyuwufFkLAQOAySMqjaVSu8xA4dQXBDjxWZy0ZGj0IfQnl1b1KZHdBQCmzBzGh554mYeLNfPyoAIQJeequIXRtQymSZIyeSqyUUaDYayiZTCOzqO+D8fxXiOq5DLWLRmPWkqNEoAzgd+7Yzsec6quqsbxrqIEwjeCBKGYTSQe0G56I01i7liTy4shcwAZQSbhNhK67MoKjjIKdYbvoLRBiG2IHp2ThAA */
  id: "audio-machine",
  context: ({ input }) => ({
    tracks: input.tracks,
    audio: new Audio(input.tracks[0].source),
    currentTrack: input.tracks[0],
    elapsed: 0,
  }),
  initial: "idle",
  states: {
    idle: {
      on: {
        PLAY: {
          actions: assign(({ event, context }) => ({
            currentTrack: event.track ? event.track : context.currentTrack,
            audio: event.track ? new Audio(event.track.source) : context.audio,
          })),
          target: "loadingTrack",
        },
      },
    },
    paused: {
      invoke: {
        src: "pause",
        input: ({ context }) => ({ audio: context.audio }),
        onError: { target: "error" },
      },
      on: {
        PLAY: { target: "playing" },
      },
    },
    playing: {
      invoke: {
        src: "playCurrentTrack",
        input: ({ context }) => ({ audio: context.audio }),
      },
      on: {
        PAUSE: { target: "paused" },
        TIME_TICK: { actions: "updateTime" },
      },
    },
    loadingTrack: {
      invoke: {
        src: "loadTrack",
        input: ({ event, context }) => {
          assertEvent(event, "PLAY");
          console.log(event, context.currentTrack);
          return {
            track: event.track ? event.track : context.currentTrack,
            audio: context.audio,
          };
        },
        onDone: { target: "playing" },
        onError: { target: "error" },
      },
    },
    error: {
      entry: ({ event }) => {
        console.log(event.type);
      },
    },
  },
});
