import type { Movie } from "../types/Movie";
import MovieCard from "./MovieCard";

interface MovieListProps {
  peliculas: Movie[];
  onEditar: (pelicula: Movie) => void;
  onEliminar: (id: number) => void;
  onVerDetalle: (id: number) => void;
}

const MovieList = ({
  onEditar,
  onVerDetalle,
  onEliminar,
  peliculas,
}: MovieListProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {peliculas.map((p) => (
        <MovieCard
          key={p.titulo}
          pelicula={p}
          onEditar={() => onEditar(p)}
          onEliminar={() => onEliminar(p.id)}
          onVerDetalle={() => onVerDetalle(p.id)}
        />
      ))}
    </div>
  );
};

export default MovieList;
