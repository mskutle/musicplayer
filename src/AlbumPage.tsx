import { Clock, Heart, Play } from "lucide-react";
import { useLoaderData } from "react-router";
import { albumLoader } from "./album-loader";

export default function AlbumPage() {
  const tracks = useLoaderData() as Awaited<ReturnType<typeof albumLoader>>;

  return (
    <div
      style={{ gridColumn: "3 / 13", gridRow: "1 / 12" }}
      className="overflow-y-auto grow"
    >
      <div className="flex shrink-0 flex-col h-full rounded-lg bg-stone-950 overflow-y-auto">
        <header className="p-6 flex flex-col rounded-t-lg h-60 bg-gradient-to-b from-fuchsia-900 to-fuchsia-950">
          <nav className="h-12"></nav>
          <div className="flex items-end gap-6">
            <img
              src={tracks[0].image}
              width={200}
              height={160}
              alt={tracks[0].album}
              className="rounded-md shadow-2xl object-cover h-40"
            />
            <div className="">
              <span className="text-xs">Album</span>
              <h1 className="-mt-2 text-7xl font-bold tracking-tight truncate">
                {tracks[0].album}
              </h1>
              <div className="flex items-center gap-1 text-xs font-medium mt-4">
                <span>{tracks[0].artist}</span>
                <span className="text-xl mt-1">⸱</span>
                <span>{new Date().getFullYear()}</span>
                <span className="text-xl mt-1">⸱</span>
                <span>{tracks[0].genre}</span>
                <span className="text-xl mt-1">⸱</span>
                <span>{tracks[0].totalTrackCount} songs</span>
              </div>
            </div>
          </div>
        </header>
        <section className="p-6 grow bg-gradient-to-b from-fuchsia-950 via-stone-950 via-25% to-stone-950">
          <div className="flex items-center gap-6">
            <button className="shadow-2xl active:opacity-80 w-14 h-14 text-black rounded-full bg-green-spotify p-3 flex items-center justify-center hover:scale-110 hover:bg-green-400">
              <Play className="ml-1 text-black fill-current" />
            </button>
            <Heart className="text-green-spotify w-7 h-7 fill-current" />
          </div>
          <table className="mt-8 w-full text-xs text-white/70">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-3 font-normal" align="right">
                  #
                </th>
                <th className="text-left font-normal">Title</th>
                <th className="text-left font-normal">Album</th>
                <th className="text-left font-normal">Date added</th>
                <th className="py-2 px-4 font-normal" align="right">
                  <Clock className="w-4 h-4" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="py-2"></td>
              </tr>
              {tracks
                .sort((a, b) => (a.trackNumber > b.trackNumber ? 1 : -1))
                .map((track) => (
                  <tr
                    key={track.id}
                    className="hover:bg-gradient-to-b hover:from-white/10 hover:to-white/15 group"
                  >
                    <td
                      className="px-4 group-hover:rounded-l-md"
                      align="right"
                      width="0.1%"
                    >
                      {track.trackNumber}
                    </td>
                    <td className="py-4 flex flex-col">
                      <span className="text-white font-medium mt-2">
                        {track.title}
                      </span>
                      <span>{track.artist}</span>
                    </td>
                    <td className="py-4">{track.album}</td>
                    <td className="py-4">
                      {Intl.DateTimeFormat("en", {
                        dateStyle: "medium",
                      }).format(new Date())}
                    </td>
                    <td className="p-4 group-hover:rounded-r-md" align="right">
                      {formatDuration(track.duration)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

function formatDuration(duration: number) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
