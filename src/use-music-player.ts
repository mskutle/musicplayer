import { useContext } from "react";
import { Context, MusicContext } from "./MusicProvider";

export function useMusicPlayer(): Context {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusicPlayer must be used within a MusicProvider");
  }
  return context;
}
