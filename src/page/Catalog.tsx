import { useState } from "react";
import MovieList from "../components/MovieList";
import MovieFooter from "../components/MovieFooter";
import HeaderTitle from "../components/HeaderTitle";
import useMovie, { type MovieInput } from "../hooks/useMovie";
import MovieForm from "../components/MovieForm";
import type { Movie } from "../types/Movie";

const Generos = ["Todos", "Drama", "Ciencia Ficción", "Animación"];

const Catalog = () => {
  // const [contador, setContador] = useState<number>(0);
  // const [nombre, setNombre] = useState<string>("");
  const [busqueda, setBusqueda] = useState<string>("");
  const [generoActivo, setGeneroActivo] = useState<string>("Todos");
  const [panelAbierto, setPanelAbierto] = useState<boolean>(false);
  const [peliculaEditando, setPeliculaEditando] = useState<Movie | null>(null);

  const {
    peliculas,
    cargando,
    error,
    crearPelicula,
    actualizarPelicula,
    eliminarPelicula,
  } = useMovie();

  const peliculasFiltradas =
    generoActivo === "Todos"
      ? peliculas
      : peliculas.filter(
          (p) => p.genero.toLowerCase() === generoActivo.toLowerCase(),
        );

  const handleNuevaPelicula = () => {
    setPanelAbierto(true);
  };
  const handleCancenlar = () => {
    setPanelAbierto(false);
    setPeliculaEditando(null);
  };

  const handleGuardar = async (datos: MovieInput) => {
    let exito: boolean;

    if (peliculaEditando) {
      console.log(peliculaEditando.id);
      console.log(datos);
      exito = await actualizarPelicula(peliculaEditando.id, datos);
    } else {
      exito = await crearPelicula(datos);
    }

    if (exito) {
      setPanelAbierto(false);
      setPeliculaEditando(null);
    }
  };

  const handleEditarPelicula = (pelicula: Movie) => {
    setPeliculaEditando(pelicula);
    setPanelAbierto(true);
  };

  const handleEliminar = async (id: number) => {
    if (!confirm("¿Eliminar esta película? Esta acción no se puede deshacer."))
      return;
    await eliminarPelicula(id);
  };

  if (cargando)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-gray-400">Cargando películas...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-gray-400">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <HeaderTitle
        titulo="Cine App"
        descripcion="Visualizar tus peliculas favoritas"
      />

      {/* Panel de prueba */}
      {/* <div className="mx-auto my-6 w-full max-w-sm bg-gray-800 border border-gray-700 rounded-xl p-5 flex flex-col gap-3">
        <p className="text-xs uppercase tracking-widest text-gray-400">
          Panel de prueba
        </p>

        <p className="text-3xl font-bold text-white">
          {contador}{" "}
          <span className="text-base font-normal text-gray-400">claps</span>
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setContador(contador + 1)}
            className="flex-1 py-2 bg-yellow-400 text-gray-900 rounded-lg font-semibold text-sm hover:bg-yellow-300 transition-colors"
          >
            👏 Dar Clap
          </button>
          <button
            onClick={() => setContador(0)}
            className="px-4 py-2 border border-gray-600 text-gray-400 rounded-lg text-sm hover:border-gray-400 transition-colors"
          >
            Reset
          </button>
        </div>

        <div className="border-t border-gray-700 pt-3 flex flex-col gap-1">
          <label className="text-xs text-gray-400 uppercase tracking-wide">
            Tu nombre
          </label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Escribe tu nombre..."
            className="w-full py-2 px-3 bg-gray-900 border border-gray-600 rounded-lg text-white text-sm outline-none placeholder:text-gray-600 focus:border-gray-400"
          />
          {nombre && (
            <p className="text-yellow-400 text-sm">Bienvenido, {nombre}</p>
          )}
        </div>
      </div> */}

      {/* Catálogo */}
      <div className="px-6 flex-1">
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">
          Películas destacadas
        </p>
        <button
          onClick={handleNuevaPelicula}
          className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold
             px-4 py-2 my-4 rounded-lg transition-colors"
        >
          + Nueva película
        </button>
        {panelAbierto && (
          <MovieForm
            pelicula={peliculaEditando ?? undefined}
            onGuardar={handleGuardar}
            onCancelar={handleCancenlar}
          />
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {Generos.map((genero) => (
            <button
              key={genero}
              onClick={() => setGeneroActivo(genero)}
              className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                generoActivo === genero
                  ? "bg-yellow-400 text-gray-900 border-yellow-400 font-semibold"
                  : "border-gray-600 text-gray-400 hover:border-gray-400 hover:text-white"
              }`}
            >
              {genero}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Buscar películas..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full max-w-xs py-2 px-3 mb-5 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm outline-none placeholder:text-gray-500 focus:border-gray-400"
        />

        <MovieList
          peliculas={peliculasFiltradas}
          onEditar={handleEditarPelicula}
          onEliminar={handleEliminar}
        />
      </div>

      <MovieFooter />
    </div>
  );
};

export default Catalog;
