import { Pause, Play, SkipBack, SkipForward, Volume } from "lucide-react";

import { Track } from "./track";
import React from "react";

type Props = {
  isPlaying: boolean;
  currentTrack: Track | null;
  onTogglePlay: () => void;
};

export const Player = React.forwardRef<HTMLAudioElement, Props>(
  (props, ref) => {
    return (
      <div
        style={{ gridColumn: "1 / 13", gridRow: "12 / 13" }}
        className="flex"
      >
        <div className="grow flex bg-black">
          <div className="w-fit shrink-0 grow-0  p-2 flex items-center">
            Current song
          </div>
          <div className="grow flex flex-col gap-3 items-center justify-center p-2">
            <div className="flex items-center gap-4">
              <button>
                <SkipBack className="fill-current w-5 h-5" />
              </button>
              <button
                className="rounded-full bg-white text-black w-8 h-8 flex items-center justify-center"
                onClick={props.onTogglePlay}
              >
                {props.isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="ml-1 w-4 h-4 fill-current" />
                )}
              </button>
              <button>
                <SkipForward className="fill-current w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span>0:00</span>
              <input
                type="range"
                className="h-0.5 bg-white/50 accent-white min-w-[500px] mb-2 rounded-full appearance-none"
              />
              <span>3:59</span>
            </div>
          </div>
          <div className="w-fit flex items-center justify-end p-2 gap-2 text-white/70">
            <Volume />
            <input
              type="range"
              className="appearance-none bg-green-spotify h-0.5 cursor-pointer accent-white rounded-full"
            />
          </div>
          <audio ref={ref} controls={false}>
            <source src={props.currentTrack?.source} />
          </audio>
        </div>
      </div>
    );
  }
);
