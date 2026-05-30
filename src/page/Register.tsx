import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { supabase } from "../lib/supabaseClient";
import Navbar from "../components/Navbar";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [exito, setExito] = useState<boolean>(false);
  const [cargando, setCargando] = useState<boolean>(false);

  const handleRegistrar = async () => {
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Completá todos los campos.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setCargando(true);

    const { error: supabaseError } = await supabase.auth.signUp({ email, password });

    setCargando(false);

    if (supabaseError) {
      setError(supabaseError.message);
      return;
    }

    setExito(true);
  };

  if (exito) {
    return (
      <div className="min-h-screen bg-gray-950">
        <Navbar />
        <div className="flex items-center justify-center mt-20 px-4">
          <div className="bg-gray-800 rounded-xl p-8 w-full max-w-sm text-center">
            <div className="text-4xl mb-4">✅</div>
            <h2 className="text-white text-xl font-bold mb-2">¡Cuenta creada!</h2>
            <p className="text-gray-400 text-sm mb-6">
              Revisá tu email para confirmar la cuenta, luego iniciá sesión.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold
                         px-6 py-2 rounded-lg text-sm transition-colors"
            >
              Ir al login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="flex items-center justify-center mt-20 px-4">
        <div className="bg-gray-800 rounded-xl p-8 w-full max-w-sm">
          <h2 className="text-white text-2xl font-bold mb-6 text-center">
            Crear cuenta
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

          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm
                         border border-gray-600 focus:outline-none focus:border-blue-400"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 text-sm mb-1">
              Confirmar contraseña
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm
                         border border-gray-600 focus:outline-none focus:border-blue-400"
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={handleRegistrar}
            disabled={cargando}
            className="w-full bg-green-600 hover:bg-green-500 disabled:opacity-50
                       text-white font-semibold py-2 rounded-lg text-sm transition-colors"
          >
            {cargando ? "Registrando..." : "Crear cuenta"}
          </button>

          <p className="text-gray-400 text-xs text-center mt-4">
            ¿Ya tenés cuenta?{" "}
            <Link to="/login" className="text-blue-400 hover:text-blue-300">
              Iniciá sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
