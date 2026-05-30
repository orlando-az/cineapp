import React from "react";
import Navbar from "../components/Navbar";

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-white text-3xl font-bold mb-2">
          Panel de administración
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          Solo los usuarios con sesión activa pueden ver esta página.
        </p>
        <div className="bg-green-900 text-green-200 rounded-xl p-4 text-sm">
          ✅ Ruta protegida funcionando correctamente. En D08 esto verifica
          sesión real con Supabase Auth.
        </div>
      </div>
    </div>
  );
};

export default Admin;
