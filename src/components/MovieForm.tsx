import { useState } from "react";
import type { MovieInput } from "../hooks/useMovie";
import type { Movie } from "../types/Movie";

interface MovieFormProps {
  pelicula?: Movie;
  onGuardar: (datos: MovieInput) => void;
  onCancelar: () => void;
}

const FORMULARIO_VACIO: MovieInput = {
  titulo: "",
  anio: new Date().getFullYear(),
  genero: "",
  director: "",
  sinopsis: "",
  calificacion: 0,
};

const MovieForm = ({ pelicula, onGuardar, onCancelar }: MovieFormProps) => {
  const [form, setForm] = useState<MovieInput>(
    pelicula
      ? {
          titulo: pelicula.titulo,
          anio: pelicula.anio,
          genero: pelicula.genero,
          director: pelicula.director ?? "",
          sinopsis: pelicula.sinopsis ?? "",
          calificacion: pelicula.calificacion ?? 0,
        }
      : FORMULARIO_VACIO,
  );

  const esModoEdicion = pelicula !== undefined;

  const handleCampo = (campo: keyof MovieInput, valor: string | number) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleEnviar = () => {
    if (!form.titulo.trim() || !form.genero.trim()) {
      alert("Título y género son obligatorios.");
      return;
    }
    onGuardar(form);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 w-full max-w-lg mx-auto my-4">
      <h2 className="text-white text-xl font-bold mb-5">
        {esModoEdicion ? "Editar película" : "Nueva película"}{" "}
      </h2>

      {/* Título */}
      <div className="mb-4">
        <label className="block text-gray-300 text-sm mb-1">
          Título <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={form.titulo}
          onChange={(e) => handleCampo("titulo", e.target.value)}
          className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm
                     border border-gray-600 focus:outline-none focus:border-blue-400"
          placeholder="Ej: Interstellar"
        />
      </div>

      {/* Año y Género */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1">
          <label className="block text-gray-300 text-sm mb-1">Año</label>
          <input
            type="number"
            value={form.anio}
            onChange={(e) => handleCampo("anio", parseInt(e.target.value))}
            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm
                       border border-gray-600 focus:outline-none focus:border-blue-400"
            min={1888}
            max={new Date().getFullYear() + 2}
          />
        </div>
        <div className="flex-1">
          <label className="block text-gray-300 text-sm mb-1">
            Género <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={form.genero}
            onChange={(e) => handleCampo("genero", e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm
                       border border-gray-600 focus:outline-none focus:border-blue-400"
            placeholder="Ej: Drama"
          />
        </div>
      </div>

      {/* Director */}
      <div className="mb-4">
        <label className="block text-gray-300 text-sm mb-1">Director</label>
        <input
          type="text"
          value={form.director ?? ""}
          onChange={(e) => handleCampo("director", e.target.value)}
          className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm
                     border border-gray-600 focus:outline-none focus:border-blue-400"
          placeholder="Ej: Christopher Nolan"
        />
      </div>

      {/* Calificación */}
      <div className="mb-4">
        <label className="block text-gray-300 text-sm mb-1">
          Calificación (0–10)
        </label>
        <input
          type="number"
          value={form.calificacion ?? 0}
          onChange={(e) =>
            handleCampo("calificacion", parseFloat(e.target.value))
          }
          className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm
                     border border-gray-600 focus:outline-none focus:border-blue-400"
          min={0}
          max={10}
          step={0.1}
        />
      </div>

      {/* Sinopsis */}
      <div className="mb-6">
        <label className="block text-gray-300 text-sm mb-1">Sinopsis</label>
        <textarea
          value={form.sinopsis ?? ""}
          onChange={(e) => handleCampo("sinopsis", e.target.value)}
          rows={3}
          className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm
                     border border-gray-600 focus:outline-none focus:border-blue-400
                     resize-none"
          placeholder="Breve descripción de la película..."
        />
      </div>

      {/* Botones */}
      <div className="flex gap-3 justify-end">
        <button
          onClick={onCancelar}
          className="px-4 py-2 rounded-lg text-sm text-gray-300 bg-gray-700
                     hover:bg-gray-600 transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={handleEnviar}
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white
                     bg-blue-600 hover:bg-blue-500 transition-colors"
        >
          {esModoEdicion ? "Guardar cambios" : "Agregar"}
        </button>
      </div>
    </div>
  );
};

export default MovieForm;
