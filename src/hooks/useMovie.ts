import { useEffect, useState } from "react";
import type { Movie } from "../types/Movie";
import { Peliculas } from "../data/peliculas";

const useMovie = () => {
  const [peliculas, setPeliculas] = useState<Movie[]>(Peliculas);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setPeliculas(peliculas);
      } catch {
        setError("Error al cargar las peliculas");
      } finally {
        setCargando(false);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return { peliculas, cargando, error };
};

export default useMovie;
