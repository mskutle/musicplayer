import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { Container } from "./Container";
import { Player } from "./Player";
import { MusicProvider } from "./MusicProvider";
import { useRef } from "react";

export default function App() {
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <MusicProvider ref={audioRef}>
      {(ref, albums) => (
        <Container>
          <Sidebar albums={albums} />
          <Outlet />
          <Player ref={ref} />
        </Container>
      )}
    </MusicProvider>
  );
}
