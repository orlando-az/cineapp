import { useState } from "react";
import { useNavigate, Link } from "react-router";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Completá ambos campos.");
      return;
    }

    setCargando(true);
    setError(null);

    try {
      await login(email, password);
      navigate("/admin");
    } catch (err: unknown) {
      const mensaje =
        err instanceof Error ? err.message : "Error al iniciar sesión.";
      setError(mensaje);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="flex items-center justify-center mt-20 px-4">
        <div className="bg-gray-800 rounded-xl p-8 w-full max-w-sm">
          <h2 className="text-white text-2xl font-bold mb-6 text-center">
            Iniciar sesión
          </h2>

          {error && (
            <div className="bg-red-900 text-red-200 rounded-lg px-3 py-2 text-sm mb-4">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm
                         border border-gray-600 focus:outline-none focus:border-blue-400"
              placeholder="usuario@ejemplo.com"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 text-sm mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm
                         border border-gray-600 focus:outline-none focus:border-blue-400"
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={cargando}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50
                       text-white font-semibold py-2 rounded-lg text-sm transition-colors"
          >
            {cargando ? "Ingresando..." : "Ingresar"}
          </button>

          <p className="text-gray-400 text-xs text-center mt-4">
            ¿No tenés cuenta?{" "}
            <Link to="/register" className="text-blue-400 hover:text-blue-300">
              Registrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
