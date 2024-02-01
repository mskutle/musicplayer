import { NavLink } from "react-router-dom";
import { getAlbums } from "./api";
import { Outlet } from "react-router";
import clsx from "clsx";
import { Home, Search } from "lucide-react";
import { Player } from "./Player";

function App() {
  return (
    <div className="h-full flex flex-col">
      <div className="grow grid gap-2 grid-cols-[minmax(300px,350px)_minmax(500px,auto)] p-2">
        <aside className="flex grow flex-col gap-2">
          <section className="rounded-lg bg-stone-950 p-2">
            <ul className="flex flex-col gap-2 text-white/80 text-sm font-medium">
              <li className="flex items-center gap-4 hover:text-white hover:cursor-pointer">
                <Home className="w-5 h-5" />
                <span className="mt-3">Home</span>
              </li>
              <li className="flex items-center gap-4 hover:text-white hover:cursor-pointer">
                <Search className="w-5 h-5" />
                <span className="mt-3">Search</span>
              </li>
            </ul>
          </section>
          <section className="grow rounded-lg bg-stone-950 p-2">
            <ul>
              {Object.entries(getAlbums()).map(([album, songs]) => (
                <NavLink to={`/album/${album}`} key={album}>
                  {({ isActive }) => (
                    <li
                      key={album}
                      className={clsx(
                        "rounded-md text-sm p-2 flex items-center gap-2",
                        isActive
                          ? "bg-stone-800 hover:bg-stone-700"
                          : "hover:bg-stone-800/70"
                      )}
                    >
                      <img
                        src={songs[0].image}
                        width={45}
                        height={45}
                        alt={album}
                        className="rounded-sm"
                      />
                      <div className="py-1 overflow-hidden">
                        <p className="font-medium mt-2 truncate" title={album}>
                          {album}
                        </p>
                        <p className="text-xs text-gray-400">
                          {songs[0].artist}
                        </p>
                      </div>
                    </li>
                  )}
                </NavLink>
              ))}
            </ul>
          </section>
        </aside>
        <Outlet />
      </div>
      <Player />
    </div>
  );
}

export default App;
