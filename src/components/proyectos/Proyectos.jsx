import React from "react";
import Barra from "../layout/Barra";
import Sidebar from "../layout/Sidebar";
import FormularioTarea from "../tareas/FormularioTarea";
import ListadoTareas from "../tareas/ListadoTareas";
import authContext from "../../context/autenticacion/authContext";

const Proyectos = () => {
  const authsContext = React.useContext(authContext);
  const { usuarioAutenticado } = authsContext;

  React.useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="contenedor-app">
      <Sidebar />

      <div className="seccion-principal">
        <Barra />
        <main>
          <FormularioTarea />
          <div className="contenedor-tareas">
            <ListadoTareas />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Proyectos;
