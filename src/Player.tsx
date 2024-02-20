import { Pause, Play, SkipBack, SkipForward, Volume } from "lucide-react";

import React from "react";
import { formatDuration } from "./utils";
import { useMusicPlayer } from "./use-music-player";

export const Player = React.forwardRef<HTMLAudioElement>((_, ref) => {
  const {
    currentTrack,
    skipBack,
    skipForward,
    play,
    pause,
    elapsed,
    seek,
    isPlaying,
    updateTime,
    setVolume,
    volume,
  } = useMusicPlayer();

  return (
    <div
      style={{ gridColumn: "1 / 13", gridRow: "12 / 13" }}
      className="flex shrink-0 gap-4"
    >
      <div className="grow flex bg-black">
        <div className="w-1/3 shrink-0 grow-0 p-2 gap-4 flex items-center">
          <img
            src={currentTrack.image}
            width={45}
            height={45}
            className="rounded-sm"
          />
          <div className="flex flex-col mt-2">
            <span className="text-xs">{currentTrack.title}</span>
            <span className="text-[10px] font-medium text-white/70">
              {currentTrack.artist}
            </span>
          </div>
        </div>
        <div className="grow shrink-0 flex flex-col gap-3 items-center justify-center p-2">
          <div className="flex items-center gap-4">
            <button onClick={skipBack}>
              <SkipBack className="fill-current w-5 h-5" />
            </button>
            <button
              className="rounded-full bg-white text-black w-8 h-8 flex items-center justify-center"
              onClick={() => (isPlaying ? pause() : play())}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="ml-1 w-4 h-4 fill-current" />
              )}
            </button>
            <button onClick={skipForward}>
              <SkipForward className="fill-current w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span>{formatDuration(elapsed)}</span>
            <input
              type="range"
              step={1}
              min={0}
              max={currentTrack.duration}
              className="h-0.5 bg-white/50 accent-white min-w-[500px] mb-2 rounded-full appearance-none"
              value={elapsed}
              onChange={(e) => seek(Number(e.currentTarget.value))}
            />
            <span>
              {currentTrack?.duration
                ? formatDuration(currentTrack.duration)
                : "-"}
            </span>
          </div>
        </div>
        <div className="w-1/3 flex items-center justify-end p-2 gap-2 text-white/70">
          <Volume />
          <input
            type="range"
            min={0.0}
            step={0.05}
            max={1.0}
            value={volume}
            onChange={(e) => setVolume(Number(e.currentTarget.value))}
            className="appearance-none bg-green-spotify h-0.5 cursor-pointer accent-white rounded-full"
          />
        </div>
        <audio
          ref={ref}
          src={currentTrack?.source}
          controls={false}
          onTimeUpdate={(e) => updateTime(e.currentTarget.currentTime)}
        />
      </div>
    </div>
  );
});
