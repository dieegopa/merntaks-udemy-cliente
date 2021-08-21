import React from "react";
import Proyecto from "./Proyecto";
import proyectoContext from "../../context/proyectos/proyectoContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import alertaContext from "../../context/alertas/alertaContext";

const ListadoProyectos = () => {
  //EXTRAER PROYECTOS DE STATE INICIAL
  const proyectosContext = React.useContext(proyectoContext);
  const { proyectos, obtenerProyectos, mensaje } = proyectosContext;

  const alertasContext = React.useContext(alertaContext);
  const { alerta, mostrarAlerta } = alertasContext;

  React.useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }

    obtenerProyectos();
    // eslint-disable-next-line
  }, [mensaje]);

  if (proyectos.length === 0) {
    return <p>No hay proyectos, comienza creando uno</p>;
  }

  return (
    <ul className="listado-proyectos">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <TransitionGroup>
        {proyectos.map((item) => {
          return (
            <CSSTransition key={item._id} timeout={300} classNames="proyecto">
              <Proyecto proyecto={item} />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </ul>
  );
};

export default ListadoProyectos;
