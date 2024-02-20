import { assign, setup } from "xstate";
import { Track } from "./track";

export const musicPlayerMachine = setup({
  types: {} as {
    context: {
      currentTime: number;
      tracks: Track[];
      currentTrack: Track | null;
    };
    input: { tracks: Track[] };
    events:
      | { type: "PLAY"; track?: Track }
      | { type: "PAUSE" }
      | { type: "SEEK"; params: { time: number } }
      | { type: "UPDATE_TIME"; params: { time: number } };
  },
  actions: {
    updateTime: assign({ currentTime: ({ event }) => event.params.time }),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCusCWBjAtABwBsBDATzACcBiAZQFFaBpAbQAYBdRUPAe0wBcM3AHacQAD0QAWAEwAaECUQBGAOzSAdAFZJATh0AOSSslLpSljs0BfK-LSZchUhXV4i6SJQrlu5V8T4AM19kdXtsfGIyPzcPCAQMIQA3biwiAWFWNizRHn5BESRxRABmaQ1JEpVNEpZNVU0VfSV5RQRJADZ9dUsS02tbEHDHKJdY2E8ABQAZAEEATRyivIwMwtAJBDKKqpq6hqaWhVK+9Wq+6QG7dAinaPUJsABrRKhKCGEwdUSUp6-hyLOPyPF5CKAJZKpdIFLJLLi8VYFUSbbbqSrnfbVQ6tZT6brSPQGIwmMwWK5DG4jIEPMDPV5ecg+GIBYLkUIAu4uEGvCEpNJrWHsXIItbI0rlNG7Wr1LHNHEIZpaGzXByA+53eneXz+dKs9mUtVjKI8n5QgXsOEgFaioqbDpqdSXFh1EqSOoqDqqeVlDqOlgXckc0bM0j0yazACqdEt1qRttKmh0aJqSiMeOa+hKHXl0kVlwDyopqs5IZI9IjkwAIrMACq0AD6NYAkgBZWgxkVxjZSHS+lSuko6Jp4pSZ7PHBDSZ1nAaDITcCBwURBoHC-LCMUIHDjtrbwsr9XuCYQNeIjfxhCp7odCxuzQyxrNOQT2q+-P9fcGks0ulg0827tL3vM4lBKRozEMaRJEkfR5VUDRpA9e8YJUFgb20fRP2LYMdTLP9lk7c9AJgpR1BvHRB2HDMs29FhSNQgtBgPFxAiIDACFQcgwH-LtigVXQtCUTR7UMd1PRUeVJEadQWEOS4bBsIA */
  id: "music-player",
  context: ({ input }) => ({
    currentTime: 0,
    tracks: input.tracks,
    currentTrack: input.tracks[0],
  }),
  initial: "paused",
  on: {
    SEEK: {
      actions: assign({ currentTime: ({ event }) => event.params.time }),
      target: ".seeking",
    },
  },
  states: {
    paused: {
      invoke: {
        src: "pause",
        onError: "failure",
      },
      on: {
        PLAY: { target: "playing" },
      },
    },
    seeking: {
      invoke: {
        src: "seek",
        onDone: { target: "playing", actions: "updateTime" },
        onError: "failure",
        input: ({ context }) => ({ time: context.currentTime }),
      },
    },
    playing: {
      invoke: {
        src: "playTrack",
        onError: "failure",
      },
      on: {
        PAUSE: { target: "paused" },
        UPDATE_TIME: {
          actions: "updateTime",
        },
      },
    },
    failure: {},
  },
});
