import { useState } from "react";
import MovieList from "../components/MovieList";
import MovieFooter from "../components/MovieFooter";
import HeaderTitle from "../components/HeaderTitle";
import type { Movie } from "../types/Movie";

const Peliculas: Movie[] = [
  {
    id: 1,
    titulo: "Interestelar",
    anio: 2000,
    genero: "Ciencia ficción",
    calificacion: 9.5,
  },
  {
    id: 2,
    titulo: "Spiderman",
    anio: 2010,
    genero: "Acción",
    calificacion: 9,
  },
  {
    id: 3,
    titulo: "El conjuro",
    anio: 2015,
    genero: "Terror",
    calificacion: 8.5,
  },
  {
    id: 4,
    titulo: "Interestelar",
    anio: 2000,
    genero: "Ciencia ficción",
    calificacion: 9.5,
  },
  {
    id: 5,
    titulo: "Spiderman",
    anio: 2010,
    genero: "Acción",
    calificacion: 9,
  },
  {
    id: 6,
    titulo: "El conjuro",
    anio: 2015,
    genero: "Terror",
    calificacion: 8.5,
  },
];

const Generos = ["Todos", "Drama", "Ciencia Ficción", "Animación"];

const Catalog = () => {
  const [contador, setContador] = useState<number>(0);
  const [nombre, setNombre] = useState<string>("");
  const [busqueda, setBusqueda] = useState<string>("");
  const [generoActivo, setGeneroActivo] = useState<string>("Todos");

  // const peliculasFiltradas = Peliculas.filter((p) => {
  //   return p.titulo.toLowerCase().includes(busqueda.toLowerCase());
  // });
  const peliculasFiltradas =
    generoActivo === "Todos"
      ? Peliculas
      : Peliculas.filter(
          (p) => p.genero.toLowerCase() == generoActivo.toLowerCase(),
        );
  return (
    <div
      style={{
        fontFamily: "'Georgia', 'Times New Roman', serif",
        backgroundColor: "#1e1a2e",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        color: "#e8e0d0",
      }}
    >
      <HeaderTitle
        titulo="Cine App"
        descripcion="Visualizar tus peliculas favoritas"
      />

      {/* Sección contador / nombre */}
      <div
        style={{
          margin: "2rem auto",
          width: "90%",
          maxWidth: "480px",
          backgroundColor: "#2a2540",
          border: "1px solid #3d3660",
          borderRadius: "12px",
          padding: "1.5rem 2rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#c9a84c",
          }}
        >
          Panel de prueba
        </p>

        <h2
          style={{
            margin: 0,
            fontSize: "2rem",
            fontWeight: "normal",
            color: "#f0e6cc",
          }}
        >
          {contador}{" "}
          <span style={{ fontSize: "1rem", color: "#9b92b8" }}>claps</span>
        </h2>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => setContador(contador + 1)}
            style={{
              flex: 1,
              padding: "0.5rem",
              backgroundColor: "#c9a84c",
              color: "#1e1a2e",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontFamily: "inherit",
              fontWeight: "bold",
              fontSize: "0.9rem",
            }}
          >
            👏 Dar Clap
          </button>
          <button
            onClick={() => setContador(0)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "transparent",
              color: "#9b92b8",
              border: "1px solid #3d3660",
              borderRadius: "6px",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "0.9rem",
            }}
          >
            Reset
          </button>
        </div>

        <div style={{ borderTop: "1px solid #3d3660", paddingTop: "0.75rem" }}>
          <label
            style={{
              display: "block",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#9b92b8",
              marginBottom: "0.4rem",
            }}
          >
            Tu nombre
          </label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Escribe tu nombre..."
            style={{
              width: "100%",
              padding: "0.5rem 0.75rem",
              backgroundColor: "#1e1a2e",
              border: "1px solid #3d3660",
              borderRadius: "6px",
              color: "#e8e0d0",
              fontFamily: "inherit",
              fontSize: "0.95rem",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          {nombre && (
            <p
              style={{
                margin: "0.5rem 0 0",
                color: "#c9a84c",
                fontSize: "0.9rem",
              }}
            >
              Bienvenido, {nombre}
            </p>
          )}
        </div>
      </div>

      {/* Grid de películas */}
      <div style={{ padding: "0 5%", flex: 1 }}>
        <p
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#6e678a",
            marginBottom: "1rem",
          }}
        >
          Películas destacadas
        </p>
        {Generos.map((genero) => (
          <button key={genero} onClick={() => setGeneroActivo(genero)}>
            {genero}
          </button>
        ))}
        <p>{generoActivo}</p>
        <input
          type="text"
          placeholder="Busqueda de peliculas.."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <p>{busqueda}</p>

        <MovieList peliculas={peliculasFiltradas} />
      </div>

      <div style={{ marginTop: "auto" }}>
        <MovieFooter />
      </div>
    </div>
  );
};

export default Catalog;
