import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { supabase } from "../lib/supabaseClient";
import type { Movie } from "../types/Movie";
import Navbar from "../components/Navbar";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pelicula, setPelicula] = useState<Movie | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarPelicula = async () => {
      if (!id) return;

      setCargando(true);
      setError(null);

      const { data, error: supabaseError } = await supabase
        .from("peliculas")
        .select("*")
        .eq("id", parseInt(id))
        .single();

      if (supabaseError) {
        setError("Película no encontrada.");
      } else {
        setPelicula(data as Movie);
      }

      setCargando(false);
    };

    cargarPelicula();
  }, [id]); // se re-ejecuta si el id cambia en la URL

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 py-10">
        {cargando && <p className="text-gray-400 text-center">Cargando...</p>}

        {error && (
          <div className="bg-red-900 text-red-200 rounded-xl p-4 text-sm">
            {error}
          </div>
        )}

        {pelicula && (
          <div className="bg-gray-800 rounded-xl p-8">
            <h1 className="text-white text-3xl font-bold mb-2">
              {pelicula.titulo}
            </h1>
            <p className="text-gray-400 mb-1">
              {pelicula.anio} · {pelicula.genero}
            </p>
            {pelicula.director && (
              <p className="text-gray-500 text-sm mb-4">
                Dirección: {pelicula.director}
              </p>
            )}
            {pelicula.sinopsis && (
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {pelicula.sinopsis}
              </p>
            )}
            <p className="text-yellow-400 text-lg font-semibold">
              ⭐ {pelicula.calificacion?.toFixed(1) ?? "—"} / 10
            </p>

            <button
              onClick={() => navigate(-1)}
              className="mt-6 text-sm text-gray-400 hover:text-white transition-colors"
            >
              ← Volver
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
