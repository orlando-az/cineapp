import { useEffect } from "react";
import Catalog from "./page/Catalog";
import { supabase } from "./lib/supabaseClient";

const App = () => {
  useEffect(() => {
    const probar = async () => {
      const { data, error } = await supabase.from("peliculas").select("*");

      console.log(data);
      console.log(error);
    };

    probar();
  }, []);

  return <Catalog />;
};

export default App;
