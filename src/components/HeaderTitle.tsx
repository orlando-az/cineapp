interface HeaderTitlePros {
  titulo: string;
  descripcion?: string;
}

const HeaderTitle = ({ titulo, descripcion }: HeaderTitlePros) => {
  return (
    <header className="p-6 bg-gray-800">
      <h1 className="text-3xl font-bold text-white">{titulo}</h1>
      <p className="text-sm text-gray-400 mt-1">{descripcion}</p>
    </header>
  );
};

export default HeaderTitle;
