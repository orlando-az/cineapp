import type { Movie } from "../types/Movie";

interface MovieCardProps {
  pelicula: Movie;
  onEditar: (pelicula: Movie) => void;
  onEliminar: (id: number) => void;
  onVerDetalle: (id: number) => void;
}

const MovieCard = ({
  onEditar,
  onEliminar,
  onVerDetalle,
  pelicula,
}: MovieCardProps) => {
  const colorCalificacion =
    (pelicula.calificacion ?? 0) >= 8
      ? "text-green-400"
      : (pelicula.calificacion ?? 0) >= 6
        ? "text-yellow-400"
        : "text-red-400";
  return (
    <div
      className="bg-gray-800 rounded-xl p-4 flex flex-col gap-2
                    border border-gray-700 hover:border-blue-500 transition-colors"
    >
      {/* Encabezado */}
      <div className="flex justify-between items-start gap-2">
        <h3 className="text-white font-semibold text-base leading-tight">
          {pelicula.titulo}
        </h3>
        <span
          className={`text-sm font-bold whitespace-nowrap ${colorCalificacion}`}
        >
          ⭐ {pelicula.calificacion?.toFixed(1) ?? "—"}
        </span>
      </div>

      <p className="text-gray-400 text-xs">
        {pelicula.anio} · {pelicula.genero}
      </p>

      {pelicula.director && (
        <p className="text-gray-500 text-xs">Dir. {pelicula.director}</p>
      )}

      {pelicula.sinopsis && (
        <p className="text-gray-400 text-xs line-clamp-2">
          {pelicula.sinopsis}
        </p>
      )}

      {/* Botones */}
      <div className="flex gap-2 mt-auto pt-2">
        <button
          onClick={() => onEditar(pelicula)}
          className="flex-1 py-1.5 rounded-lg text-xs font-medium
                     bg-gray-700 text-gray-200 hover:bg-blue-700 hover:text-white
                     transition-colors"
        >
          ✏️ Editar
        </button>
        <button
          onClick={() => onEliminar(pelicula.id)}
          className="flex-1 py-1.5 rounded-lg text-xs font-medium
                     bg-gray-700 text-gray-200 hover:bg-red-700 hover:text-white
                     transition-colors"
        >
          🗑️ Eliminar
        </button>
        <button
          onClick={() => onVerDetalle(pelicula.id)}
          className="w-full py-1.5 rounded-lg text-xs font-medium
             bg-blue-900 text-blue-200 hover:bg-blue-700 hover:text-white
             transition-colors"
        >
          👁 Ver detalle
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
