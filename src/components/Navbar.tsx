import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav
      className="bg-gray-900 border-b border-gray-700 px-6 py-3
                    flex items-center justify-between"
    >
      <Link to="/" className="text-white text-xl font-bold tracking-tight">
        🎬 CineApp
      </Link>

      <div className="flex items-center gap-6">
        <Link
          to="/"
          className="text-gray-300 hover:text-white text-sm transition-colors"
        >
          Catálogo
        </Link>

        {usuario ? (
          <>
            <Link
              to="/admin"
              className="text-gray-300 hover:text-white text-sm transition-colors"
            >
              Administración
            </Link>
            <span className="text-gray-500 text-xs hidden sm:block">
              {usuario.email}
            </span>
            <button
              onClick={handleLogout}
              className="bg-gray-700 hover:bg-gray-600 text-white text-sm
                         font-medium px-4 py-1.5 rounded-lg transition-colors"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-500 text-white text-sm
                       font-semibold px-4 py-1.5 rounded-lg transition-colors"
          >
            Iniciar sesión
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
