import MovieSocial from "./MovieSocial";

const MovieFooter = () => {
  return (
    <footer className="flex gap-6 px-8 py-5 border-t border-gray-700 mt-auto">
      <MovieSocial titulo="Facebook" />
      <MovieSocial titulo="Linkedin" />
      <MovieSocial titulo="Instagram" />
      <MovieSocial titulo="Twitter" />
    </footer>
  );
};

export default MovieFooter;
