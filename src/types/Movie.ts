export interface Movie {
  id: number;
  titulo: string;
  genero: string;
  calificacion: number;
  anio: number;
  sinopsis?: string;
  director?: string;
}
