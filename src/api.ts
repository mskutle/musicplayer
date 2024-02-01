import catalog from "./catalog.json";
import { Song as Track } from "./song";

export const getAlbums = () =>
  catalog.music.reduce((acc: Record<string, Track[]>, track) => {
    if (!acc[track.album]) {
      acc[track.album] = [];
    }
    acc[track.album].push(track);
    return acc;
  }, {});

export const getAlbumTracks = (album: string) => {
  const albums = getAlbums();
  return albums[album];
};
