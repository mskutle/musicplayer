import { createBrowserRouter } from "react-router-dom";
import AlbumPage from "./AlbumPage";
import App from "./App";
import { albumLoader } from "./album-loader";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "album/:name",
        Component: AlbumPage,
        loader: albumLoader,
      },
    ],
  },
]);
