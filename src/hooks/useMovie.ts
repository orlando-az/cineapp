import { useEffect, useState } from "react";
import type { Movie } from "../types/Movie";
import { Peliculas } from "../data/peliculas";
import { supabase } from "../lib/supabaseClient";

export type MovieInput = Omit<Movie, "id">;

const useMovie = () => {
  const [peliculas, setPeliculas] = useState<Movie[]>(Peliculas);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     try {
  //       setPeliculas(peliculas);
  //     } catch {
  //       setError("Error al cargar las peliculas");
  //     } finally {
  //       setCargando(false);
  //     }
  //   }, 2000);
  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    setCargando(true);
    setError(null);
    const cargarPeliculas = async () => {
      const { data, error: supabaseError } = await supabase
        .from("peliculas")
        .select("*")
        .order("calificacion", { ascending: false });

      if (supabaseError)
        setError("Error la cargar las peliculas " + supabaseError.message);
      else setPeliculas(data ?? []);

      setCargando(false);
    };
    cargarPeliculas();
  }, []);

  const crearPelicula = async (nueva: MovieInput): Promise<boolean> => {
    setError(null);

    const { data, error: supabaseError } = await supabase
      .from("peliculas")
      .insert(nueva)
      .select()
      .single();

    if (supabaseError) {
      setError("Error al insertar: " + supabaseError.message);
      return false;
    }

    setPeliculas((prev) => [data as Movie, ...prev]);
    return true;
  };

  const actualizarPelicula = async (
    id: number,
    cambios: MovieInput,
  ): Promise<boolean> => {
    setError(null);

    const { error: supabaseError } = await supabase
      .from("peliculas")
      .update(cambios)
      .eq("id", id);

    if (supabaseError) {
      setError("Error al actualizar: " + supabaseError.message);
      return false;
    }

    setPeliculas((prev) =>
      prev.map((p) => (p.id === id ? { id, ...cambios } : p)),
    );
    return true;
  };

  const eliminarPelicula = async (id: number): Promise<boolean> => {
    setError(null);

    const { error: supabaseError } = await supabase
      .from("peliculas")
      .delete()
      .eq("id", id);

    if (supabaseError) {
      setError("Error al eliminar: " + supabaseError.message);
      return false;
    }

    setPeliculas((prev) => prev.filter((p) => p.id !== id));
    return true;
  };

  return {
    peliculas,
    cargando,
    error,
    crearPelicula,
    actualizarPelicula,
    eliminarPelicula,
  };
};

export default useMovie;
