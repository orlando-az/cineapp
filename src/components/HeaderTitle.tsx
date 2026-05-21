interface HeaderTitlePros {
  titulo: string;
  descripcion?: string;
}

const HeaderTitle = ({ titulo, descripcion }: HeaderTitlePros) => {
  return (
    <header className="text-white p-6 bg-blue-950">
      <h1 className="text-4xl my-2">{titulo}</h1>
      <p className="font-light text-sm text-blue-50">{descripcion}</p>
    </header>
  );
};

export default HeaderTitle;
