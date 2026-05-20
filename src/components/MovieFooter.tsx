import MovieSocial from "./MovieSocial";

const MovieFooter = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "2rem",
      }}
    >
      <MovieSocial titulo="Facebook" />
      <MovieSocial titulo="Linkedin" />
      <MovieSocial titulo="Instagram" />
      <MovieSocial titulo="Twitter" />
    </div>
  );
};

export default MovieFooter;
