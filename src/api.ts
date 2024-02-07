import catalog from "./catalog.json";
import { Track as Track } from "./track";

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

export const getAllTracks = () => catalog.music;
