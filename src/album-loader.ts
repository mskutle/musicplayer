import { LoaderFunctionArgs } from "react-router";
import { getAlbumTracks } from "./api";

export async function albumLoader({ params }: LoaderFunctionArgs) {
  try {
    const tracks = getAlbumTracks(params.name as string);
    return tracks;
  } catch (err) {
    throw new Response("Not found", { status: 404 });
  }
}
