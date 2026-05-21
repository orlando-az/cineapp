const MovieSocial = ({ titulo }: { titulo: string }) => {
  return (
    <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">
      {titulo}
    </a>
  );
};

export default MovieSocial;
