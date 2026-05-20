interface HeaderTitlePros {
  titulo: string;
  descripcion?: string;
}

const HeaderTitle = ({ titulo, descripcion }: HeaderTitlePros) => {
  return (
    <header
      style={{
        backgroundColor: "#003A61",
        color: "white",
        padding: "1rem",
        marginBottom: "1.5rem",
      }}
    >
      <h1 style={{ margin: 0 }}>{titulo}</h1>
      <p
        style={{
          marginTop: "0.25rem",
          fontSize: "0.9rem",
        }}
      >
        {descripcion}
      </p>
    </header>
  );
};

export default HeaderTitle;
