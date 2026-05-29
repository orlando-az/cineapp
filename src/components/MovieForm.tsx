import { useState } from "react";
import type { MovieInput } from "../hooks/useMovie";

interface MovieFormProps {
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

const MovieForm = ({ onGuardar, onCancelar }: MovieFormProps) => {
  const [form, setForm] = useState<MovieInput>(FORMULARIO_VACIO);

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
    <div>
      <h1>Nueva Pelicula</h1>
      <div>
        <label>Título</label>
        <input
          type="text"
          value={form.titulo}
          onChange={(e) => handleCampo("titulo", e.target.value)}
        />
      </div>
      <div>
        <label>Genero</label>
        <input
          type="text"
          value={form.genero}
          onChange={(e) => handleCampo("genero", e.target.value)}
        />
      </div>
      <div>
        <label>Año</label>
        <input
          type="number"
          value={form.anio}
          onChange={(e) => handleCampo("anio", parseInt(e.target.value))}
        />
      </div>
      <div>
        <label>Director</label>
        <input
          type="text"
          value={form.director}
          onChange={(e) => handleCampo("director", e.target.value)}
        />
      </div>
      <div>
        <label>Sinopsis</label>
        <textarea
          rows={3}
          value={form.sinopsis}
          onChange={(e) => handleCampo("sinopsis", e.target.value)}
        />
      </div>
      <div>
        <label>Calificación</label>
        <input
          type="number"
          value={form.calificacion}
          onChange={(e) =>
            handleCampo("calificacion", parseInt(e.target.value))
          }
        />
      </div>

      <button onClick={handleEnviar}>Guardar</button>
      <button onClick={() => onCancelar()}>Carcelar</button>
    </div>
  );
};

export default MovieForm;
