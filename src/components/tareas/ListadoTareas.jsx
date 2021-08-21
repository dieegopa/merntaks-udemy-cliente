import React from "react";
import Tarea from "./Tarea";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListadoTareas = () => {
  const proyectosContext = React.useContext(proyectoContext);
  const { proyecto, eliminarProyecto } = proyectosContext;

  const tareasContext = React.useContext(tareaContext);
  const { tareasProyecto } = tareasContext;

  if (!proyecto) {
    return <h2>Selecciona un proyecto</h2>;
  }

  const [proyectoActual] = proyecto;

  return (
    <>
      <h2>Proyecto: {proyectoActual.nombre}</h2>
      <ul className="listado-tareas">
        {tareasProyecto.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) : (
          <TransitionGroup>
            {tareasProyecto.map((item) => {
              return (
                <CSSTransition key={item._id} timeout={300} classNames="tarea">
                  <Tarea tarea={item} />
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        )}
      </ul>
      <button
        type="button"
        className="btn btn-eliminar"
        onClick={() => eliminarProyecto(proyectoActual._id)}
      >
        Eliminar Proyecto &times;
      </button>
    </>
  );
};

export default ListadoTareas;
