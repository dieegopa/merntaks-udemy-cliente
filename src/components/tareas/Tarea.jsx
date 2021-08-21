import React from "react";
import tareaContext from "../../context/tareas/tareaContext";
import proyectoContext from "../../context/proyectos/proyectoContext";

const Tarea = ({ tarea }) => {
  const proyectosContext = React.useContext(proyectoContext);
  const { proyectos } = proyectosContext;
  const [proyectoActual] = proyectos;

  const tareasContext = React.useContext(tareaContext);
  const {
    eliminarTarea,
    obtenerTareas,
    actualizarTarea,
    obtenerTareaActual,
  } = tareasContext;

  const handleDelete = (id) => {
    eliminarTarea(id, proyectoActual._id);
    obtenerTareas(proyectoActual._id);
  };

  const cambiarEstado = (tarea) => {
    if (tarea.estado) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }
    actualizarTarea(tarea);
  };

  const seleccionarTarea = (tarea) => {
    obtenerTareaActual(tarea);
  };

  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>
      <div className="estado">
        {tarea.estado ? (
          <button
            className="completo"
            type="button"
            onClick={() => cambiarEstado(tarea)}
          >
            Completo
          </button>
        ) : (
          <button
            className="incompleto"
            type="button"
            onClick={() => cambiarEstado(tarea)}
          >
            Incompleto
          </button>
        )}
      </div>
      <div className="acciones">
        <button
          className="btn btn-primario"
          type="button"
          onClick={() => seleccionarTarea(tarea)}
        >
          Editar
        </button>
        <button
          className="btn btn-secundario"
          type="button"
          onClick={() => handleDelete(tarea._id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;
