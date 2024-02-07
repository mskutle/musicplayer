import { Outlet } from "react-router";
import { Player } from "./Player";
import { useMachine } from "@xstate/react";
import { musicPlayerMachine } from "./player-machine";
import { Sidebar } from "./Sidebar";
import { Container } from "./Container";
import { useRef } from "react";
import { fromPromise } from "xstate";
import { getAlbums } from "./api";

export default function App() {
  const audioElement = useRef<HTMLAudioElement>(null);
  const [state, send] = useMachine(
    musicPlayerMachine.provide({
      actors: {
        play: fromPromise(async () => audioElement.current?.play()),
        pause: fromPromise(async () => audioElement.current?.pause()),
      },
    })
  );

  const albums = getAlbums();

  return (
    <Container>
      <Sidebar albums={albums} />
      <Outlet />
      <Player
        ref={audioElement}
        onTogglePlay={() => send({ type: "TOGGLE_PLAY" })}
        currentTrack={state.context.track}
        isPlaying={state.matches("playing")}
      />
    </Container>
  );
}
