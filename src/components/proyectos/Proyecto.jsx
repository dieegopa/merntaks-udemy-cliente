import React from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const Proyecto = ({ proyecto }) => {
  const proyectosContext = React.useContext(proyectoContext);
  const { proyectoActual } = proyectosContext;

  const tareasContext = React.useContext(tareaContext);
  const { obtenerTareas } = tareasContext;

  const seleccionarProyecto = (id) => {
    proyectoActual(id);
    obtenerTareas(id);
  };

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => seleccionarProyecto(proyecto._id)}
      >
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
