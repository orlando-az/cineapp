import type { Movie } from "../types/Movie";
import MovieCard from "./MovieCard";

interface MovieListProps {
  peliculas: Movie[];
}

const MovieList = ({ peliculas }: MovieListProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {peliculas.map((p) => (
        <MovieCard key={p.titulo} pelicula={p} />
      ))}
    </div>
  );
};

export default MovieList;
