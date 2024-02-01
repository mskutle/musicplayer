import { LoaderFunctionArgs } from "react-router";
import { getAlbumTracks } from "./api";

export async function albumLoader({ params }: LoaderFunctionArgs) {
  const tracks = getAlbumTracks(params.name as string);
  return tracks;
}
