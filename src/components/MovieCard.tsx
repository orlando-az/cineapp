import type { Movie } from "../types/Movie";

interface MovieCardProps {
  pelicula: Movie;
}

const MovieCard = ({ pelicula }: MovieCardProps) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-yellow-400 transition-colors flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-white font-semibold leading-tight">{pelicula.titulo}</h3>
        <span className="text-yellow-400 text-sm whitespace-nowrap shrink-0">
          ⭐ {pelicula.calificacion}
        </span>
      </div>

      <p className="text-gray-400 text-sm">
        {pelicula.anio} · {pelicula.genero}
      </p>

      {pelicula.director && (
        <p className="text-gray-500 text-xs">
          <span className="text-gray-400">Director:</span> {pelicula.director}
        </p>
      )}

      {pelicula.sinopsis && (
        <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
          {pelicula.sinopsis}
        </p>
      )}
    </div>
  );
};

export default MovieCard;
