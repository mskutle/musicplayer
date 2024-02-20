import React, {
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { getAlbums, getAllTracks } from "./api";
import { Track } from "./track";

export type Context = {
  isPlaying: boolean;
  isPaused: boolean;
  play: (track?: Track) => void;
  pause: () => void;
  albums: Albums;
  tracks: Track[];
  currentTrack: State["currentTrack"];
  elapsed: State["elapsed"];
  seek: (time: number) => void;
  updateTime: (time: number) => void;
  skipBack: () => void;
  skipForward: () => void;
  volume: number;
  setVolume: (volume: number) => void;
};

type Albums = ReturnType<typeof getAlbums>;
type Props = {
  children: (
    ref: React.RefObject<HTMLAudioElement>,
    albums: Albums
  ) => ReactNode;
};
type State =
  | { status: "playing"; elapsed: number; currentTrack: Track; volume: number }
  | { status: "paused"; elapsed: number; currentTrack: Track; volume: number };

const tracks = getAllTracks();
export const MusicContext = React.createContext<Context | null>(null);

export const MusicProvider = React.forwardRef<HTMLAudioElement, Props>(
  (props, forwardedRef) => {
    const albums = getAlbums();
    const audioRef = useRef<HTMLAudioElement>(null);

    useImperativeHandle(
      forwardedRef,
      () => audioRef.current as HTMLAudioElement
    );

    const [state, setState] = useState<State>({
      status: "paused",
      currentTrack: tracks[0],
      elapsed: 0,
      volume: 1.0,
    });

    const play = (track?: Track) => {
      if (!audioRef.current) return;
      if (track) {
        audioRef.current.src = track.source;
      }
      audioRef.current.play().then(() => {
        setState((prev) => ({
          ...prev,
          currentTrack: track ?? prev.currentTrack,
          status: "playing",
        }));
      });
    };

    const pause = () => {
      if (!audioRef.current) return;

      audioRef.current.pause();
      setState((prev) => ({
        ...prev,
        status: "paused",
      }));
    };

    const updateTime = (time: number) => {
      if (!audioRef.current) return;
      setState((prev) => ({ ...prev, elapsed: Math.floor(time) }));
    };

    const seek = (time: number) => {
      if (!audioRef.current) return;

      audioRef.current.currentTime = time;
      setState((prev) => ({ ...prev, elapsed: Math.floor(time) }));
    };

    const restart = () => {
      if (!audioRef.current) return;
      console.log("Restarting!");
      audioRef.current.currentTime = 0;
      setState((prev) => ({
        ...prev,
        elapsed: 0,
      }));
    };

    const skipBack = () => {
      if (state.status === "playing" && state.elapsed >= 2) {
        restart();
        return;
      }
      const currentTrackIndex = tracks.findIndex(
        (x) => x.id === state.currentTrack.id
      );
      const prevIndex = currentTrackIndex - 1;
      const lastIndex = tracks.length - 1;

      const index = prevIndex < 0 ? lastIndex : prevIndex;

      setState((prev) => ({
        ...prev,
        currentTrack: tracks[index],
        elapsed: 0,
      }));
    };

    const setVolume = (volume: number) => {
      setState((prev) => ({ ...prev, volume }));
    };

    const skipForward = useCallback(() => {
      const currentTrackIndex = tracks.findIndex(
        (x) => x.id === state.currentTrack.id
      );
      const nextIndex = currentTrackIndex + 1;
      const lastIndex = tracks.length - 1;

      const index = nextIndex > lastIndex ? 0 : nextIndex;

      setState((prev) => ({
        ...prev,
        currentTrack: tracks[index],
        elapsed: 0,
      }));
    }, [state.currentTrack.id]);

    useEffect(() => {
      if (!audioRef.current) return;
      audioRef.current.src = state.currentTrack.source;
      if (state.status === "playing") {
        play();
      }
    }, [state.currentTrack.source, state.status]);

    useEffect(() => {
      if (!audioRef.current) return;
      if (state.elapsed === Math.floor(audioRef.current.duration)) {
        skipForward();
      }
    }, [skipForward, state.elapsed]);

    useEffect(() => {
      if (!audioRef.current) return;
      audioRef.current.volume = state.volume;
    }, [state.volume]);

    return (
      <MusicContext.Provider
        value={{
          volume: state.volume,
          setVolume,
          albums,
          tracks,
          currentTrack: state.currentTrack,
          elapsed: state.elapsed,
          isPlaying: state.status === "playing",
          isPaused: state.status === "paused",
          skipForward,
          skipBack,
          pause,
          play,
          seek,
          updateTime,
        }}
      >
        {props.children(audioRef, albums)}
      </MusicContext.Provider>
    );
  }
);
