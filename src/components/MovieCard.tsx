import type { Movie } from "../types/Movie";

interface MovieCardProps {
  pelicula: Movie;
}

const MovieCard = ({ pelicula }: MovieCardProps) => {
  return (
    <div className="bg-white border-2 border-blue-950 p-4 shadow rounded-2xl">
      <h3 style={{ marginTop: 0, color: "#2a2540" }}>{pelicula.titulo}</h3>
      <p
        style={{
          color: "#64748b",
          fontSize: "0.9rem",
        }}
      >
        {pelicula.anio} - {pelicula.genero}
      </p>
      <p
        style={{
          color: "green",
          marginBottom: 0,
        }}
      >
        ⭐ {pelicula.calificacion} / 10
      </p>
    </div>
  );
};

export default MovieCard;
