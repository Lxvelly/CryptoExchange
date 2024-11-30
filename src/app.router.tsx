import { createBrowserRouter, redirect } from "react-router-dom";
import { MainView } from "./views/main";
import { WatchlistView } from "./views/watchlist";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainView />,
    loader: () => redirect("/main"),
  },
  {
    path: "/",
    children: [
      {
        path: "main",
        element: <MainView />,
      },
    ],
  },
  {
    path: "/",
    children: [
      {
        path: "watchlist",
        element: <WatchlistView />,
      },
    ],
  },
]);
