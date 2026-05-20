import type { Movie } from "../types/Movie";
import MovieCard from "./MovieCard";

interface MovieListProps {
  peliculas: Movie[];
}

const MovieList = ({ peliculas }: MovieListProps) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "1.25rem",
      }}
    >
      {peliculas.map((p) => (
        <MovieCard pelicula={p} />
      ))}
    </div>
  );
};

export default MovieList;
