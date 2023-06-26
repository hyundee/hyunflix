import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./routes/Home";
import Series from "./routes/Series";
import Movie from "./routes/Movie";
import Search from "./routes/Search";
import Error from "./Error";
import MovieDetails from "./routes/MovieDetails";
import TvDetails from "./routes/TvDetails";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "",
          element: <Home />,
          children: [
            {
              path: "movie/:movieId",
              element: <MovieDetails />,
            },
            {
              path: "tv/:seriesId",
              element: <TvDetails />,
            },
          ],
        },
        {
          path: "tv",
          element: <Series />,
          children: [
            {
              path: "detail/:seriesId",
              element: <TvDetails />,
            },
          ],
        },
        {
          path: "movie",
          element: <Movie />,
          children: [
            {
              path: "detail/:movieId",
              element: <MovieDetails />,
            },
          ],
        },
        {
          path: "search",
          element: <Search />,
          children: [
            {
              path: "movie/:movieId",
              element: <MovieDetails />,
            },
            {
              path: "tv/:seriesId",
              element: <TvDetails />,
            },
          ],
        },
      ],
      errorElement: <Error />,
    },
  ],
  {
    basename: "/",
  }
);

export default router;
